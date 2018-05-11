import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService:ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order); 
    await this.shoppingCartService.clearCart(); 
    
    return result 
  }

  getOrders() { 
    return this.db.list('/orders').snapshotChanges().map(actions => {
      return actions.map(action => ({
        ...action.payload.val()
      }));
    });
  }
    
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().map(actions => {
      return actions.map(action => ({
        ...action.payload.val()
      }));
    });
  }
}
