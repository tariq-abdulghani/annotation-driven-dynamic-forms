export class MessageStringInterpolation{
  // private readonly  interpolation_pattern = /\${([^\${}]*)}/g;
  public static  interpolate(message: string, obj: Object): string{
   // @ts-ignore
    return  message.replace(/\${([^\${}]*)}/g, (a,b)=>{
      // @ts-ignore
     let r = obj[b];
     // console.log("interpolate", a, b, obj);
      return typeof r === 'string' || typeof r === 'number' ? r :  r.toString();//a;
    });
  }
}
