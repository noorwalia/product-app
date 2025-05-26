import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Define the Product interface (describes the shape of a product)
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root' // Makes the service available app-wide
})
export class ProductService {
  constructor(private http: HttpClient) {} // HttpClient fetches data

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json').pipe(
      delay(1000) // Simulate a 1-second network delay
    );
  }

  // Fetch a single product by ID
  getProduct(id: number): Observable<Product | null> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.id === id) || null)
    );
  }
}