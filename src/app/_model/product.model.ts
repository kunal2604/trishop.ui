import { FileHandle } from "./file-handle.model";

export interface Product {
    productId: number,
    productName: string,
    productDescription: string,
    price: number,
    discount: number,
    productImages: FileHandle[]
}