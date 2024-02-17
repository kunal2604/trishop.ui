import { OrderQuantity } from "./order-quantity.model";
import { Product } from "./product.model";

export interface OrderDetails {
    orderName: string;
    orderAddress: string;
    orderContact: string;
    orderAlternateContact: string;
    orderProductQuantityList: OrderQuantity[];
}