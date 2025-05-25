export interface ICart {
  id: number;
  quantity: number;
  productId: number;
  productName: string;
  price: number;
  image: string | null;
  stock:number;
}
