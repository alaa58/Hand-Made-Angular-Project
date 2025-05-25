import { Data } from './../../../../node_modules/memfs/lib/fsa/types.d';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../models/product.model';
import { CartService } from '../../core/services/cart.service';

import { ReviewsComponent } from '../reviews/reviews.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,ReviewsComponent],
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements  OnInit{

  private readonly  _ActivatedRoute = inject(ActivatedRoute)
  private readonly  _ProductService= inject(ProductService)
  private readonly _CartService=inject(CartService)
  productId!: number;
quantity: number = 1;
totalPrice: number = 0;
originalTotalPrice: number = 0; 
finalTotalPrice: number = 0;   

  detailsProductObj:IProduct ={} as IProduct;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p);
        let product_id= p.get('id');
        this.productId=Number(product_id)
        this._ProductService.getProductById(Number(product_id)).subscribe({
          next:(res)=>{
            console.log(res);
            this.detailsProductObj= res.data;
this.calculatePrices();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    })
  }

  calculatePrices(): void {
  this.originalTotalPrice = this.detailsProductObj.price * this.quantity;
  this.finalTotalPrice = this.detailsProductObj.priceAfterSale * this.quantity;
}
AddToCart(quentity:number){
  this._CartService.addProductToCart(this.productId,quentity).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
}
incrementproduct():void{
  if(this.detailsProductObj.stock>this.quantity){
  this.quantity++;
this.calculatePrices();
  }
  else{
  Swal.fire({
  icon: 'warning',
  title: 'Cannot Increase Quantity',
  text: `Only ${this.detailsProductObj.stock} item(s) available in stock.`,
  confirmButtonText: 'OK'
});
  }
}
decrementProduct():void{
  if(this.detailsProductObj.stock>this.quantity && this.quantity>1){
  this.quantity--;
this.calculatePrices();
  }
}
}
