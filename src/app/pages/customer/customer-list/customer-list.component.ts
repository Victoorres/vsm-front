import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/classes/customer';
import { FormatUtils } from 'src/app/shared/utils/format.util';

/** Constants */
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  displayedColumns: string[] = [
    'actions',
    'name',
    'document',
    'phone',
    'email',
    'address',
  ];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 customers
    const customers = Array.from({ length: 50 }, (_, k) =>
      createNewCustomer(k + 1)
    );

    this.dataSource = new MatTableDataSource(customers);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public formatDocument(document: string): string {
    return FormatUtils.formatDocument(document);
  }
}

/** Returns a new Customer. */
function createNewCustomer(id: number): Customer {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    document: Math.round(Math.random() * 100000000000).toString(),
    email: 'teste.com',
    phone: '62 9 9999-9999',
    address: {
      city: 'Goiânia',
      district: 'St Leste Universitário',
      id: 'JFOIEWHOI242309U2',
      uf: 'GO',
      zipCode: 76450000,
    },
  };
}
