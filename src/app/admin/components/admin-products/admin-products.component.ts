import { Product } from 'shared/models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  subscripcion: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
 
  constructor(private productService: ProductService) { 
    this.subscripcion = this.productService.getAll()      
      .subscribe(products => {
      this.products = products; 
      this.initializeTable(this.products);     
    });
  }
 
  private initializeTable(p: Product[]) {
    this.tableResource = new DataTableResource(p);
    this.tableResource.query({ offset: 0, limit: 10 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
 
  reloadItems(params) {
    if (!this.tableResource) return;
 
    this.tableResource.query(params).then(items => this.items = items);
  }
 
  filter(query: string) {
    let filteredProducts = (query) ?
     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
       this.products;
    this.initializeTable(filteredProducts);
  }
 
  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
}