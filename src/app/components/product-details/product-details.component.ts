import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  standalone: true
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Get ID from URL
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.error = !product;
      },
      error: () => {
        this.error = true;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(): void {
    console.log(`Added ${this.product?.name} to cart`);
  }
}