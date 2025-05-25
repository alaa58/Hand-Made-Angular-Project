import { IProduct } from "./product.model";

export interface ResponceGetAll<T>{
     isSuccess:boolean,
    data:T[],
    errorcode:number,
    message:string
}

