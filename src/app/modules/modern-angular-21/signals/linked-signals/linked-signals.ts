import { Component, linkedSignal, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PRODUCTS } from './products';

@Component({
  selector: 'app-linked-signals',
  imports: [JsonPipe],
  templateUrl: './linked-signals.html',
  styleUrl: './linked-signals.scss',
})
export class LinkedSignals {
  readonly products = signal(['Apple', 'Banana', 'Cherry']);

  readonly selectedProduct = linkedSignal<string[], string>({
    source: this.products,
    computation: (products, previus) => {
      if (!previus) return products[0];

      if (products.includes(previus.value)) return previus.value;
      return products[0];
    },
  });

  addProduct() {
    this.products.update((prods) => [...prods, PRODUCTS[prods.length]]);
  }

  removeProduct() {
    this.products.update((prods) => prods.slice(0, -1));
  }

  nextProduct() {
    this.selectedProduct.update((selected) => {
      const index = this.products().indexOf(selected);
      return this.products()[(index + 1) % this.products().length];
    });
  }

  prevProduct() {
    this.selectedProduct.update((selected) => {
      const index = this.products().indexOf(selected);
      return this.products()[(index - 1 + this.products().length) % this.products().length];
    });
  }
}
