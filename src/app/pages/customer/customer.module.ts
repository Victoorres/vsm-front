import { CustomerListComponent } from './customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from './customer.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddressService } from './address.service';
@NgModule({
  declarations: [CustomerListComponent, CustomerFormComponent],
  imports: [
    CustomerRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatGridListModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    FormsModule,
  ],
  providers: [CustomerService, AddressService],
})
export class CustomerModule {}
