import { ShoppingCart } from '../../../../app/shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../../app/shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$:Observable<ShoppingCart>

  constructor(private shoppingCartService:ShoppingCartService) { }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
