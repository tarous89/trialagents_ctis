export type CtisQuery=(sql:string,params?:unknown[])=>Promise<unknown[]>;
export type CtisDb={transaction:<T>(fn:(q:CtisQuery)=>Promise<T>)=>Promise<T>};
