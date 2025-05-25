


import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { IRating } from '../../core/interfaces/irating';
import { ActivatedRoute } from '@angular/router';
import { GetReviewsForEachProductService } from '../../core/services/get-reviews-for-each-product.service'; // Import the service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviewsSeller',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsSellerComponent implements OnInit {
  @Input() productId: number | undefined;
  reviews: IRating[] = [];
  newRating: number = 0;
  newComment: string = '';
  @Output() ratingAdded = new EventEmitter<IRating>();
  private reviewsService = inject(GetReviewsForEachProductService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    if (this.productId) {
      this.reviewsService.GetReviewsForEachProduct(this.productId).subscribe({
        next: (res) => {
          this.reviews = res.data;
          console.log(res);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else if (this.route.snapshot.paramMap.get('id')) {
      const productIdFromRoute = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      if (!isNaN(productIdFromRoute)) {
        this.productId = productIdFromRoute;
        this.reviewsService.GetReviewsForEachProduct(productIdFromRoute).subscribe({
          next: (res) => {
            this.reviews = res.data;
            console.log(res);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    }
  }

  getStarArray(score: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => index < score);
  }
 setRating(rating: number): void {
    this.newRating = rating;
  }
addRating(): void {
  const userId = this.getUserIdFromToken();

  if (!userId) {
    alert('User ID not found. Please log in again.');
    return;
  }

  if (this.newRating > 0 && this.newRating <= 5 && this.newComment.trim() !== '' && this.productId) {
    const ratingToAdd: IRating = {
      customerId: userId,
      score: this.newRating,
      comment: this.newComment,
    };

    this.ratingAdded.emit(ratingToAdd);
    this.reviews = [...this.reviews, ratingToAdd];
    this.newRating = 0;
    this.newComment = '';

    this.reviewsService.addReview(this.productId, ratingToAdd).subscribe({
      next: (response) => {
        console.log('Rating added successfully', response);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error adding rating:', error);
      }
    });
  } else {
    alert('Please enter a valid rating (1-5) and comment.');
  }
}





  getUserIdFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded: { [key: string]: any } = jwtDecode(token);
    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
  } catch (error) {
    console.error('Token decoding failed:', error);
    return null;
  }
}

}
