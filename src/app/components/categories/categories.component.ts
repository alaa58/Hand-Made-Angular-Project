// import { Component, inject, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { Observable } from 'rxjs';
// import { CartService } from '../../core/services/cart.service';
// import { ResponceGetAll } from '../../models/ResponceGetAll.model';
// // import { ICategory } from '../../models/category.model';
// import { ICategory } from '../../models/category.model';
// import { IProduct } from '../../models/product.model';

// @Component({
//   selector: 'app-category',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.css']
// })
// // <<<<<<< HEAD
// // export class CategoriesComponent  {
// //   categories:ICategory= {}as ICategory ;
// //   selectedCategoryProducts: any[] = [];
// // =======
// export class CategoriesComponent implements OnInit {
//   categories: ResponceGetAll<ICategory> = {
//     isSuccess: false,
//     data: [],
//     errorcode: 0,
//     message: ''
//   };

//   selectedCategoryProducts: IProduct[] = []; // ✅ Correct type
//   selectedCategoryId: number = 0;

//   constructor(private http: HttpClient) { }
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   private readonly _CartService = inject(CartService);

//   // ngOnInit(): void {
//   //   this.getCategories();
//   // }

//   // getCategories(): void {
//   //   this.http.get<ResponceGetAll<ICategory>>('https://handmademarket.runasp.net/api/Catecory')
//   //     .subscribe({
//   //       next: (data) => {
//   //         this.categories = data.data;
//   //       },
//   //       error: (err) => {
//   //         console.error('Failed to load categories', err);
//   //       }
//   //     });
//   // }

//   // onCategoryChange(): void {
//   //   const selectedCategory = this.categories.data.find(
//   //     cat => cat.categoryId === this.selectedCategoryId
//   //   );
//   //   this.selectedCategoryProducts = selectedCategory ? selectedCategory.products : [];
//   // }
//   getCategories(): void {
//     this.http.get<ResponceGetAll<ICategory>>('https://handmademarket.runasp.net/api/Category')
//       .subscribe({
//         next: (data) => {
//           console.log("Categories loaded:", data.data);
//           this.categories.data = data.data;
//         },
//         error: (err) => {
//           console.error('Failed to load categories', err);
//         }
//       });
//   }

//  onCategoryChange(): void {
//   console.log('Selected category ID:', this.selectedCategoryId);
  
//   if(this.selectedCategoryId === 0) {
//     this.selectedCategoryProducts = [];
//     return;
//   }

//   this.http.get<ResponceGetAll<IProduct>>(`https://handmademarket.runasp.net/api/Category/${this.selectedCategoryId}`)
//     .subscribe({
//       next: (data) => {
//         console.log('Products loaded:', data.data);
//         this.selectedCategoryProducts = (data.data as any).products || [];

//   // AddToCart(id:number,quentity:number){
//   //      this._CartService.addProductToCart(id,quentity).subscribe({
//   //     next:(res)=>{
//   //       console.log(res)
//   //     },
//   //     error:(err)=>{
//   //       console.log(err)
//   //     }
//   //   })
//   // }
//       },
//       error: (err) => {
//         console.error('Failed to load products for category', err);
//         this.selectedCategoryProducts = [];
//       }
//     });
// }
//   AddToCart(productId: number, quantity: number) {
//   if (quantity > 0) {
//     this._CartService.addProductToCart(productId, quantity).subscribe({
//       next: (res) => console.log('Added to cart:', res),
//       error: (err) => console.error('Failed to add to cart:', err)
//     });
//   } else {
//     alert("Product is out of stock.");
//   }
// }

//   }


import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ResponceGetAll } from '../../models/ResponceGetAll.model';
import { ICategory } from '../../models/category.model';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: ResponceGetAll<ICategory> = {
    isSuccess: false,
    data: [],
    errorcode: 0,
    message: ''
  };

  selectedCategoryProducts: IProduct[] = []; // ✅ Correct type
  selectedCategoryId: number = 0;

  constructor(private http: HttpClient) { }

  private readonly _CartService = inject(CartService);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.http.get<ResponceGetAll<ICategory>>('https://handmademarket.runasp.net/api/Category')
      .subscribe({
        next: (data) => {
          console.log("Categories loaded:", data.data);
          this.categories.data = data.data;
        },
        error: (err) => {
          console.error('Failed to load categories', err);
        }
      });
  }

 onCategoryChange(): void {
  console.log('Selected category ID:', this.selectedCategoryId);
  
  if(this.selectedCategoryId === 0) {
    this.selectedCategoryProducts = [];
    return;
  }

  this.http.get<ResponceGetAll<IProduct>>(`https://handmademarket.runasp.net/api/Category/${this.selectedCategoryId}`)
    .subscribe({
      next: (data) => {
        console.log('Products loaded:', data.data);
        this.selectedCategoryProducts = (data.data as any).products || [];

      },
      error: (err) => {
        console.error('Failed to load products for category', err);
        this.selectedCategoryProducts = [];
      }
    });
}
  AddToCart(productId: number, quantity: number) {
  if (quantity > 0) {
    this._CartService.addProductToCart(productId, quantity).subscribe({
      next: (res) => console.log('Added to cart:', res),
      error: (err) => console.error('Failed to add to cart:', err)
    });
  } else {
    alert("Product is out of stock.");
  }
}

  }

