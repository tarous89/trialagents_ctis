import type {CtisDb} from './types.mjs';
export function ctis(db:CtisDb,services?:{billing?:unknown}):(user:unknown,request:unknown,source?:string)=>Promise<any>;
