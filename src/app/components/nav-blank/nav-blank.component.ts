
import { CartComponent } from './../cart/cart.component';
import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive, CartComponent, CommonModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {
  cartCount: number = 0;
  cartItems: any[] = [];
  cartSidebarOpen: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.loadCartCount();
  }

  toggleCartSidebar() {
    this.cartSidebarOpen = !this.cartSidebarOpen;

    if (this.cartSidebarOpen) {
      this.cartService.getCart().subscribe(cart => {
        this.cartItems = cart.data;
      });
    }
  }

  signOut() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}

