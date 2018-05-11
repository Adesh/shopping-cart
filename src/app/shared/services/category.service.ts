import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().map(actions => {
      return actions.map(action => ({
        key: action.key, 
        name: action.payload.val().name
      }));
    });
    
  }
}
