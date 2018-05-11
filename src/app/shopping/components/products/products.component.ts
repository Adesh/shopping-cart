import { ShoppingCart } from '../../../../app/shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../../app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../../../app/shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../../../../app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: String;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { 
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }).subscribe(params => {
        this.category = params.get('category') || '';
        this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category && this.category!='') ? 
    this.products.filter(p => p.category === this.category) :
    this.products; 
  }
}
