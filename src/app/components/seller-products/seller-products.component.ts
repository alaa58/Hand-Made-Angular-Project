import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetsellersService } from '../../core/services/getsellers.service';
import { IProduct, ISeller } from '../../core/interfaces/iseller';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css'],
  imports:[CommonModule,FormsModule]
})
export class SellerProductsComponent implements OnInit {
  products:ISeller={ 
    sellerId: '',
    storeName: '',
    email: '',
    phoneNumber: '',
    createdAt: '',
    products: []
  };

  constructor(
    private route: ActivatedRoute,
    private sellerService: GetsellersService
  ) {}

  ngOnInit(): void {
    const sellerId = this.route.snapshot.paramMap.get('id');
    if (sellerId) {
        this.sellerService.getSellerWithItsProducts(sellerId).subscribe({next:(res)=>
        {
          this.products=res;
          console.log(res);
        },
        error:(error)=>{
          console.log(error)
        }
        });
    }
  }
}