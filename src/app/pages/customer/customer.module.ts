import { CustomerListComponent } from './customer-list/customer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from './customer.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CustomerRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    CommonModule,
    FormsModule,
  ],
  providers: [CustomerService],
})
export class CustomerModule {}
