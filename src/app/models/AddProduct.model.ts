export interface AddProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: File;
  categoryId: number;
  hasSale: boolean;
  salePercentage: number;
}