import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGaurdService } from '../shared/services/auth-gaurd.service';
import { SharedModule } from '../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGaurdService } from './services/admin-auth-gaurd.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGaurdService, AdminAuthGaurdService] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGaurdService, AdminAuthGaurdService] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGaurdService, AdminAuthGaurdService] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGaurdService, AdminAuthGaurdService] },
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGaurdService
  ],
})
export class AdminModule { }
