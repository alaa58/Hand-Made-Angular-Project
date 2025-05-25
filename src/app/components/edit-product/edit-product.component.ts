import { Responce } from './../../models/Responce.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ICategory } from '../../models/category.model';
import { AddProductService } from '../../core/services/add-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports:[ReactiveFormsModule,HttpClientModule]
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    private addProductService : AddProductService
  ) {}
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.loadCategories();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = parseInt(idParam,10);

      // 1. Get product by ID
      this.productService.getProductById(this.productId).subscribe({
        next: (response) => {
          // 2. Populate form with product data
          const product = response.data;
          this.productForm = this.fb.group({
            name: [product.name],
            description: [product.description],
            price: [product.price],
            stock: [product.stock],
            image: [product.image],
            categoryId: [product.categoryId],
            hasSale: [product.hasSale],
            salePercentage: [product.salePercentage]
          });
        },
        error: (err) => {
          console.error('Failed to load product', err);
        }
      });
    }
  }

  onSubmit(): void {
  if (this.productForm.valid) {
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('stock', this.productForm.get('stock')?.value);
    formData.append('categoryId', this.productForm.get('categoryId')?.value);
    formData.append('hasSale', this.productForm.get('hasSale')?.value);

    const salePercentage = this.productForm.get('salePercentage')?.value;
    if (salePercentage !== null && salePercentage !== undefined) {
      formData.append('salePercentage', salePercentage);
    }

    // Optional: If you're editing the image (File upload)
    const imageControl = this.productForm.get('image')?.value;
    if (imageControl instanceof File) {
      formData.append('image', imageControl);
    }

    this.productService.EditProduct(this.productId, formData).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.router.navigate(['/Seller']);
      },
      error: (err) => {
        console.error('Error updating product', err);
      }
    });
  }
}

 loadCategories() {
    this.addProductService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.productForm.patchValue({ image: file });
  }
}



}
