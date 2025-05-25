
import { ProductComponent } from "../product/product.component";
import { Component, inject, OnInit } from '@angular/core';
import { SaledProductComponent } from "../saled-product/saled-product.component";

@Component({
  selector: 'app-home',
  imports: [ProductComponent, SaledProductComponent,ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {


}
