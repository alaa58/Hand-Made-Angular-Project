import { Component } from '@angular/core';

import { GetsellersService } from '../../core/services/getsellers.service';
import { IProduct, ISeller } from '../../core/interfaces/iseller';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { ResponceGetAll } from '../../models/ResponceGetAll.model';
@Component({
  selector: 'app-sellerdashboard',
  imports: [CommonModule,RouterLink],
  templateUrl: './sellerdashboard.component.html',
  styleUrl: './sellerdashboard.component.css'
})
export class SellerdashboardComponent {
  productsList:IProduct[]= [];

  constructor(private sellerService: GetsellersService,private productService:ProductService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const sellerId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      if (sellerId) {
        this.sellerService.getSellerWithItsProducts(sellerId).subscribe({
          next: (res) => {
            this.productsList = res.data.products;
            console.log("Seller with products:", res);
          },
          error: (error) => {
            console.log("Error fetching seller:", error);
          }
        });
      } else {
        console.error("Seller ID not found in token");
      }
    }
  }
deleteProduct(id: any) {
  this.productService.deleteProductById(id).subscribe({
    next: (res) => {
      console.log(res)
   
      this.productsList = this.productsList.filter(product => product.productId !== id); // Reload the updated list from the server
 
      console.log("Product deleted:", res);
    },
    error: (error) => {
      console.log("Error deleting product:", error);
    }
  });
}
}



