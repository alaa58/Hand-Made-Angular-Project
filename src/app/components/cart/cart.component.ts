// import { ResponceGetAll } from './../../models/ResponceGetAll.model';
// import { Responce } from './../../models/Responce.model';
// import { CartService } from './../../core/services/cart.service';
// import { Component, OnInit, inject } from '@angular/core';
// import { ICart } from '../../core/interfaces/icart';
// import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import Swal from 'sweetalert2';

// @Component({  
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css'
// })
// export class CartComponent implements OnInit {

//   private readonly _CartService = inject(CartService);
  
//    cartItems$!: Observable<ICart[]>;
//   totalPrice: number = 0;
//   quantity: number = 1;

//   ngOnInit(): void {
//     this.cartItems$ = this._CartService.cartItems$;

//     this._CartService.cartTotalPrice$.subscribe(price => {
//       this.totalPrice = price;
//     });

//     this._CartService.getCart().subscribe();
//   }

//   removeItem(cartItemId: number) {
//     this._CartService.deleteCartItem(cartItemId).subscribe();
//   }

// incrementProduct(item: Responce<ICart>): void {
//   if (item.data.quantity < item.data.stock) {
//     this._CartService.updateProductQuantity(item.data.id, item.data.quantity + 1).subscribe(() => {
//       this._CartService.getCart().subscribe(() => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Quantity Updated',
//           text: 'The quantity has been increased successfully.',
//           timer: 1500,
//           showConfirmButton: false
//         });
//       });
//     });
//   } else {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Cannot Increase Quantity',
//       text: `Only ${item.data.stock} item(s) available in stock.`,
//       confirmButtonText: 'OK'
//     });
//   }
// }

// decrementProduct(item: Responce<ICart>): void {
//   if (item.data.quantity > 1) {
//     this._CartService.updateProductQuantity(item.data.id, item.data.quantity - 1).subscribe(() => {
//       this._CartService.getCart().subscribe(() => {
//         Swal.fire({
//           icon: 'info',
//           title: 'Quantity Updated',
//           text: 'The quantity has been decreased successfully.',
//           timer: 1500,
//           showConfirmButton: false
//         });
//       });
//     });
//   } else {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Cannot Decrease Quantity',
//       text: 'Quantity cannot be less than 1.',
//       confirmButtonText: 'OK'
//     });
//   }
// }



// }
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);
  cartItems: ICart[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this._CartService.getCart().subscribe(res => {
      if (res.isSuccess) {
        this.cartItems = res.data;
        this.updateTotal();
      }
    });
  }

  updateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  removeItem(cartItemId: number) {
    this._CartService.deleteCartItem(cartItemId).subscribe(() => {
      this.refreshCart();
    });
  }

  incrementProduct(item: ICart): void {
    if (item.quantity < item.stock) {
      this._CartService.updateProductQuantity(item.id, item.quantity + 1).subscribe(() => {
        this.refreshCart('Quantity increased successfully.');
      });
    } else {
      Swal.fire('Stock limit', `Only ${item.stock} item(s) available.`, 'warning');
    }
  }

  decrementProduct(item: ICart): void {
    if (item.quantity > 1) {
      this._CartService.updateProductQuantity(item.id, item.quantity - 1).subscribe(() => {
        this.refreshCart('Quantity decreased successfully.');
      });
    } else {
      Swal.fire('Minimum quantity', 'Cannot be less than 1.', 'warning');
    }
  }

  refreshCart(message?: string) {
    this._CartService.getCart().subscribe(res => {
      if (res.isSuccess) {
        this.cartItems = res.data;
        this.updateTotal();
        if (message) {
          Swal.fire('Updated', message, 'success');
        }
      }
    });
  }
}

