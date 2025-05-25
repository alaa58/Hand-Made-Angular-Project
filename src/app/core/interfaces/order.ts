export interface OrderItemDTO {
  productId: number;
  quantity: number;
}

export interface AddOrderDTO {
  customerID: string;
  shipmentId: number;
  items: OrderItemDTO[];
   customerName: string;
}

