import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  subtotal: number = 0;
  deliveryFee: number = 20; 
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  paymentMethod: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['cartItems']) {
      this.cartItems = navigation.extras.state['cartItems'];
    } else {
     
      this.cartItems = [
        { name: 'Product 1', quantity: 2, price: 100 },
        { name: 'Product 2', quantity: 1, price: 150 }
      ];
    }

    this.calculateSubtotal();
    this.calculateTotal();
  }

  calculateSubtotal(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  calculateTotal(): void {
    this.total = this.subtotal + this.deliveryFee;
  }

  confirmOrder(): void {
    if (!this.fullName || !this.email || !this.phone || !this.address || !this.paymentMethod) {
      alert('Please complete all required fields.');
      return;
    }

    const orderData = {
      customer: {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        address: this.address
      },
      paymentMethod: this.paymentMethod,
      items: this.cartItems,
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      total: this.total
    };

    console.log('Order confirmed:', orderData);
    alert('Order placed successfully!');
    
  }
}
