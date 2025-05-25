import { IProduct } from './product.model';

export interface ICategory {
  categoryId: number;
  name: string;
  products: IProduct[]; 
}
