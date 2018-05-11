import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().map(actions => {
      return actions.map(action => ({
        key: action.key, 
        title: action.payload.val().title,
        imageUrl: action.payload.val().imageUrl,
        price: action.payload.val().price,
        category: action.payload.val().category
      }));
    });
  }

  get(productId) {
    return this.db.object('/products/'+productId).snapshotChanges().map(action => {
      return {
        key: action.key, 
        title: action.payload.val().title,
        imageUrl: action.payload.val().imageUrl,
        price: action.payload.val().price,
        category: action.payload.val().category
      }
    });
  }

  update(productId, product) {
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/'+productId).remove();
  }
}
