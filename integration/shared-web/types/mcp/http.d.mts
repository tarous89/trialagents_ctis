export function ctisHttp(options:{authorize:(token:string,audience:string)=>Promise<unknown>;run:(user:any,request:any,source?:string)=>Promise<any>;readWidget?:()=>Promise<string>;audience?:string;version?:string}):(request:Request)=>Promise<Response>;
export function protectedResource(issuer?:string,audience?:string):Response;
