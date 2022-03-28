import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/classes/customer';
import { FormatUtils } from 'src/app/shared/utils/format.util';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    'actions',
    'name',
    'document',
    'phone',
    'email',
    'address',
  ];
  customers: Customer[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly customerService: CustomerService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  public formatDocument(document: string): string {
    return FormatUtils.formatDocument(document);
  }

  private getCustomers(): void {
    this.customerService
      .getCustomers()
      .subscribe((customers) => (this.customers = customers));
  }

  openCustomerForm(document?: string): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '550px',
      data: {
        document: document,
      },
    });

    dialogRef.afterClosed().subscribe(() => this.getCustomers());
  }
}
