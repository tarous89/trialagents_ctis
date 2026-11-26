// TrialAgents CTIS Team: €49 per month per owner account, through Stripe. Adapted from Pipeline's billing.mjs.
// stripeRequest(path, init) calls the Stripe API with the shared service's key; stripeMode() is 'test' or 'live'.
import {check} from './rules.mjs'

export const TEAM_PRICE={currency:'eur',amount:4900,lookupKey:'trialagents_ctis_team_eur_49_monthly_v1',product:'TrialAgents CTIS Team'}
export const paidAccount=a=>a.plan==='team'&&(!a.paid_until||new Date(a.paid_until)>new Date())

export function stripeBilling({stripeRequest,stripeMode,priceId=()=>null,origin='https://ctis.trialagents.com'}){
  async function api(path,form,idempotency){
    const headers=form?{'Content-Type':'application/x-www-form-urlencoded'}:{}
    if(idempotency)headers['Idempotency-Key']=idempotency
    const response=await stripeRequest(path,{method:form?'POST':'GET',headers,body:form?new URLSearchParams(form):undefined})
    check(response.ok,'Billing is unavailable just now. Try again in a moment.',503);return response.json()
  }
  // Checkout and webhook reconciliation must resolve the same recurring price.
  async function teamPriceId(mode,createIfMissing=false){
    const configured=priceId(mode);if(configured)return configured
    const prices=await api('/prices?lookup_keys[]='+TEAM_PRICE.lookupKey+'&limit=1')
    if(prices.data?.[0]?.id)return prices.data[0].id
    check(createIfMissing,'The Team price is unavailable',503)
    const price=await api('/prices',{lookup_key:TEAM_PRICE.lookupKey,currency:TEAM_PRICE.currency,unit_amount:String(TEAM_PRICE.amount),'recurring[interval]':'month','product_data[name]':TEAM_PRICE.product},TEAM_PRICE.lookupKey)
    check(price.id,'The Team price is unavailable',503)
    return price.id
  }
  const returnUrl=section=>origin+'/?tab=settings&section='+section
  async function checkout(q,a,user){
    const mode=stripeMode()
    check(['test','live'].includes(mode),'Billing is unavailable',503)
    check(!a.stripe_mode||a.stripe_mode===mode,'Billing environment mismatch',409)
    check(!(a.subscription&&paidAccount(a)),'The Team plan is already active',409)
    const price=await teamPriceId(mode,true),p=await api('/prices/'+encodeURIComponent(price))
    check(p.active&&p.currency===TEAM_PRICE.currency&&p.unit_amount===TEAM_PRICE.amount&&p.recurring?.interval==='month'&&p.recurring?.interval_count===1,'The Team price must be €49 monthly',503)
    let customer=a.customer
    if(!customer){
      customer=(await api('/customers',{email:user.email,name:a.display_name,'metadata[ctis_account]':a.user_id},'ctis-customer-'+mode+'-'+a.user_id)).id
      await q('UPDATE ctis.account SET customer=$2,stripe_mode=$3 WHERE user_id=$1',[a.user_id,customer,mode])
    }
    if(a.checkout){
      const current=await api('/checkout/sessions/'+encodeURIComponent(a.checkout))
      if(current.status==='open')return {url:current.url}
      if(current.status==='complete'&&!paidAccount(a))check(false,'Payment is being confirmed. Refresh Billing shortly.',409)
    }
    const existing=await api('/subscriptions?customer='+encodeURIComponent(customer)+'&status=all&limit=100')
    check(!existing.data.some(s=>s.metadata?.ctis_account===a.user_id&&!['canceled','incomplete_expired'].includes(s.status)),'Manage the existing subscription in Billing',409)
    const session=await api('/checkout/sessions',{mode:'subscription',customer,'line_items[0][price]':price,'line_items[0][quantity]':'1',
      'metadata[ctis_account]':a.user_id,'subscription_data[metadata][ctis_account]':a.user_id,
      success_url:returnUrl('Billing')+'&checkout=done',cancel_url:returnUrl('Billing')},
      'ctis-checkout-'+mode+'-'+a.user_id+'-'+(a.checkout??'first'))
    await q('UPDATE ctis.account SET checkout=$2 WHERE user_id=$1',[a.user_id,session.id])
    return {url:session.url}
  }
  async function portal(q,a){
    check(a.customer,'No billing account yet',409)
    return {url:(await api('/billing_portal/sessions',{customer:a.customer,return_url:returnUrl('Billing')})).url}
  }
  // Called only after the shared web service verified the raw Stripe signature.
  // Returns false when the event is not about TrialAgents CTIS, so other products can handle it.
  async function webhook(db,event){
    const object=event.data?.object,owner=object?.metadata?.ctis_account
    if(!owner)return false
    const mode=event.livemode?'live':'test'
    if(mode!==stripeMode())return true
    if(!['customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','checkout.session.completed'].includes(event.type))return true
    await db.transaction(async q=>{
      const [row]=await q('SELECT * FROM ctis.account WHERE user_id=$1 FOR UPDATE',[owner])
      check(row&&row.customer===object.customer&&row.stripe_mode===mode,'Billing mapping unavailable',503)
      const seen=await q('INSERT INTO ctis.stripe_event VALUES($1,$2) ON CONFLICT DO NOTHING RETURNING id',[mode,event.id])
      if(!seen.length)return
      // Never trust the event body for the state: read the subscriptions back from Stripe.
      const price=await teamPriceId(mode)
      const list=await api('/subscriptions?customer='+encodeURIComponent(row.customer)+'&status=all&limit=100')
      const match=list.data.filter(s=>s.metadata?.ctis_account===owner&&s.items?.data?.some(i=>i.price?.id===price&&i.quantity===1))
      const current=match.find(s=>s.status==='active')??match[0]
      const expiry=current?.items.data.find(i=>i.price.id===price)?.current_period_end??current?.current_period_end
      // A late event about an older subscription cannot shorten a newer paid period.
      const prepaid=Boolean(current?.id&&current.id===row.subscription&&row.paid_until&&new Date(row.paid_until)>new Date())
      const until=current?.status==='active'&&expiry?new Date(expiry*1000):prepaid?row.paid_until:null
      const active=Boolean(until&&new Date(until)>new Date())
      await q("UPDATE ctis.account SET subscription=$2,paid_until=$3,plan=$4,access_version=access_version+1 WHERE user_id=$1",[owner,current?.id??null,until??new Date(0),active?'team':'individual'])
      await q("INSERT INTO ctis.audit(owner_id,actor,actor_name,source,action,details) VALUES($1,'stripe','Stripe','system','billing.updated',$2)",[owner,JSON.stringify({active,status:current?.status??'none',paid_until:until})])
    })
    return true
  }
  return {checkout,portal,webhook}
}
