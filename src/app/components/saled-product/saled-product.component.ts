import { Component } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-saled-product',
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './saled-product.component.html',
  styleUrl: './saled-product.component.css'
})
export class SaledProductComponent {
  products: IProduct[] = []; 
  saledProductList: IProduct[] = []; 
  pageNumber: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getSaledProducts().subscribe(response => {
      this.products = response.data;

      this.totalPages = Math.ceil(this.products.length / this.pageSize);   
      this.updatePageData();
    });
  }

  updatePageData() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.saledProductList = this.products.slice(startIndex, endIndex);
  }

  goToNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.updatePageData();
    }
  }

  goToPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.updatePageData();
    }
  }

  addToCart(product: IProduct) {

    
  }
}
