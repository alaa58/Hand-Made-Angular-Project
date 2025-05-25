// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
// import { NotfoundComponent } from './components/notfound/notfound.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { CartComponent } from './components/cart/cart.component';
// import { CategoriesComponent } from './components/categories/categories.component';
// import { HomeComponent } from './components/home/home.component';
// import { ProductComponent } from './components/product/product.component';
// import { SellersComponent } from './components/sellers/sellers.component';
// import { SellerProductsComponent } from './components/seller-products/seller-products.component';
// import { ProductDetailsComponent } from './components/product-details/product-details.component';
// import { SellerLayoutComponent } from './layout/seller-layout/seller-layout.component';
// import { SellerdashboardComponent } from './components/sellerdashboard/sellerdashboard.component';
// import { CheckoutComponent } from './components/checkout/checkout.component';
// import { AddproductComponent } from './components/addproduct/addproduct.component';

// export const routes: Routes = [
//   {
//     path: '', component: AuthLayoutComponent, children: [
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//       { path: 'login', component: LoginComponent },
//       { path: 'register', component: RegisterComponent }
//     ]
//   },
//   {
//     path: '', component: BlankLayoutComponent, children: [
//       { path: 'home', component: HomeComponent, pathMatch: 'full' },
//       { path: 'cart', component: CartComponent },
//       { path: 'categories', component: CategoriesComponent },
//       { path: 'home', component: HomeComponent },
//       { path: 'product', component: ProductComponent },
//       { path: 'sellers', component: SellersComponent },
//       { path: 'seller/:id', component: SellerProductsComponent },
//       { path: 'product-details/:id', component: ProductDetailsComponent },
//       { path: 'checkout', component: CheckoutComponent },

//     ]
//   },
//   {
//     path: 'Seller',
//     component: SellerLayoutComponent,
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', component: SellerdashboardComponent },
//       {path: 'addproduct', component: AddproductComponent}
//     ]
//   },

//   { path: '**', component: NotfoundComponent }]


import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { SellerProductsComponent } from './components/seller-products/seller-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SellerLayoutComponent } from './layout/seller-layout/seller-layout.component';
import { SellerdashboardComponent } from './components/sellerdashboard/sellerdashboard.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ProductDetailsSellerComponent } from './components/product-detailsSeller/product-details.component';

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '', component: BlankLayoutComponent, children: [
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'cart', component: CartComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'sellers', component: SellersComponent },
      { path: 'seller/:id', component: SellerProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'checkout', component: CheckoutComponent },

    ]
  },
  {
    path: 'Seller',
    component: SellerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'product-details/:id', component: ProductDetailsSellerComponent },
      { path: 'dashboard', component: SellerdashboardComponent },
      {path: 'addproduct', component: AddproductComponent}
    ]
  },

  { path: '**', component: NotfoundComponent }]