export class MapUtil{
    public static formObject(obj:any){
        const map = new Map();
        Object.entries(obj).forEach( keyValue=>{
            map.set(keyValue[0], keyValue[1])
        })
        return map; 
    }
}