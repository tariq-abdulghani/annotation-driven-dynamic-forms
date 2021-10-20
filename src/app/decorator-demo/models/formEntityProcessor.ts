


export class FormEntityProcessor{

    public static generateFormDescriptor(formEntity: any):{[x:string]: any, controlsMeta: any[]}{
        const obj = {controlsMeta:[]} as {[x: string]: any, controlsMeta: any[]};
        
        Object.entries(formEntity).forEach(keyValue =>{
            obj[keyValue[0]] = keyValue[1];
        });

        for (const key in formEntity) {
            const metaData = Reflect.getMetadata(key, formEntity, key);
            if(metaData){
                obj.controlsMeta.push(metaData)
            }
        }
    return obj;
    }
}
