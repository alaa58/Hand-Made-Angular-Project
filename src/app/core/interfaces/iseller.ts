export interface ISeller {
  sellerId: string;
  storeName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  products: IProduct[];
}

export interface IProduct {
  productId: number;
  description: string;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  salePercentage: number | null;
  priceAfterSale: number | null;
}
