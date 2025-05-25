import { Component, inject, OnInit } from '@angular/core';
import { ISeller } from '../../core/interfaces/iseller';
import { GetsellersService } from '../../core/services/getsellers.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sellers',
  imports: [RouterLink],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent implements OnInit {
  

private readonly _SellerService = inject(GetsellersService)

Sellers:ISeller[] = []
selectedSellerProducts:any=[]

ngOnInit(): void {
  this._SellerService.getAllSellers().subscribe({
    next:(res)=>
    {
      console.log(res);
      this.Sellers = res.data;
    },
    error:(error)=>{
      console.log(error)
    }
  })
}

showSellerProducts(sellerid:string)
{
  this._SellerService.getSellerWithItsProducts(sellerid).subscribe(res => {
      this.selectedSellerProducts = res.products;
      console.log(this.selectedSellerProducts);
    })
}
}

