
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product.model';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: 'app-product',
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  products:IProduct[]=[];
  saledProductList:IProduct[]=[];
  pageNumber:number=1;
  pageSize:number=4;
  totalPages:number=0;
  filtered:IProduct[]=this.products;
  constructor(private productService:ProductService){
  }

ngOnInit(): void {
  if (this.pageNumber < 1) this.pageNumber = 1;
  this.loadProducts();
  this.filtered=this.products;
}
goToNextPage() {
  this.pageNumber++;
  this.loadProducts();this.filtered=this.products;
  this.filtered=this.products;
}

goToPreviousPage() {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    this.loadProducts();
    this.filtered=this.products;
  }
}

loadProducts() {
  this.productService.getAllProducts(this.pageNumber, this.pageSize).subscribe(response => {
    this.products = response.data.data; 
    this.totalPages=response.totalPages;
    this.filtered=this.products;
  });
}
addToCart(product:IProduct){

}
search(e:any){
  const searched = e.target.value.toLowerCase();
    this.filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(searched)
    );
}
}
