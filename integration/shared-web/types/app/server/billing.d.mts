import type {CtisDb} from './types.mjs';
export function stripeBilling(options:{stripeRequest:Function;stripeMode:Function;priceId?:(mode:string)=>string|null|undefined;origin?:string}):{checkout:Function;portal:Function;webhook:(db:CtisDb,event:unknown)=>Promise<boolean>};
