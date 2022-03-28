import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
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
  public filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search', { static: false })
  private searchInput: ElementRef;

  constructor(
    private readonly customerService: CustomerService,
    public readonly builder: FormBuilder,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCustomers();

    this.filterForm = this.builder.group({
      search: [null],
    });
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

  filterSearch() {
    const document: string = this.filterForm.get('search').value;

    if (document?.length > 10) {
      this.customerService
        .getCustomerByDocument(document)
        .subscribe((customers) => {
          this.customers = [];
          this.customers.push(customers);
        });
    }
    if (document === null || document === '') {
      this.getCustomers();
    }
  }
}
