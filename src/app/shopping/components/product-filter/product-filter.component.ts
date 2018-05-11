import { CategoryService } from '../../../shared/services/category.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<any>;
  @Input('category') category;
  
  constructor(private categoryService:CategoryService) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

}
