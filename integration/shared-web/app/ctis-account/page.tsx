// Settings → Personal and Support inside the TrialAgents CTIS app: the shared TrialAgents account settings,
// embedded in a frame (as Pipeline's pipeline-account page). Requires ctis-account.patch for the product wording.
import SettingsWorkspace from '@/app/components/AccountSettings';
import './settings.css';
export default async function CtisAccount({searchParams}:{searchParams:Promise<{tab?:string}>}){
  const {tab}=await searchParams;
  return <div className="intel-app ctis-account"><SettingsWorkspace embedded product="ctis" pipelineSection={tab==='support'?'support':'account'}/></div>;
}
