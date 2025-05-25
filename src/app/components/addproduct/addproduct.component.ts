import { AddProductService } from './../../core/services/add-product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ICategory } from '../../models/category.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  categories: ICategory[] = [];

  constructor(private fb: FormBuilder, private addProductService: AddProductService,private route: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.setSellerId();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(1)]],
      image: [null, Validators.required],
      categoryId: [null, [Validators.required, Validators.min(1)]],
      hasSale: [false],
      salePercentage: [0],
      sellerId: [''] 
    });
  }

  loadCategories() {
    this.addProductService.getCategories().subscribe(data => {
      this.categories = data.data;
    });
  }

  setSellerId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const sellerId =
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
        decoded['sub'] ||
        decoded['sellerId'];

      if (sellerId) {
        this.productForm.patchValue({ sellerId });
      } else {
        console.error('Seller ID not found in token!');
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }

  submitForm() {
    if (this.productForm.valid) {
      const values = this.productForm.value;

      if (values.hasSale && (!values.salePercentage || values.salePercentage <= 0)) {
        alert('يجب تحديد نسبة الخصم إذا تم تفعيل الخصم.');
        return;
      }

      const formData = new FormData();
      formData.append('Name', values.name);
      formData.append('Description', values.description);
      formData.append('Price', values.price.toString());
      formData.append('Stock', values.stock.toString());
      formData.append('Image', values.image);
      formData.append('CategoryId', values.categoryId.toString());
      formData.append('HasSale', values.hasSale.toString());
      formData.append('SalePercentage', values.salePercentage.toString());
      formData.append('SellerId', values.sellerId); 

      this.addProductService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('✅ Product Added:', response.data);
          this.productForm.reset();
          alert("✅ Product added successfully");
          this.route.navigate(["/Seller/dashboard"])
          
        },
        error: error => {
          console.error('❌ Failed to add product:', error);
          if (error.error && error.error.errors) {
            console.error('Validation Errors:', error.error.errors);
          }
        }
      });
    } else {
      console.warn('❌ Form is invalid');

      // طباعة تفاصيل الأخطاء لتسهيل التصحيح
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        if (control && control.invalid) {
          console.warn(`❌ Field '${key}' is invalid. Errors:`, control.errors);
        }
      });

      alert("⚠️ تأكد من ملء كل الحقول بشكل صحيح.");
    }
  }
}
