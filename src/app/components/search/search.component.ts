import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchResult: undefined | product[];
  private product = inject(ProductService);
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query &&
      this.product.searchProducts(query).subscribe((result) => {
        this.searchResult = result;
      });
  }
}
