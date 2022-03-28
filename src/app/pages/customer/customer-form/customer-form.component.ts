import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DOCUMENT } from '@angular/common';
import { CustomerService } from '../customer.service';
import { AddressService } from '../address.service';
import { Customer } from 'src/app/classes/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  private _dialogAddStructure: any;

  active: boolean = true;
  customerForm: FormGroup;
  customer: Customer;

  constructor(
    public readonly dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { document: string },
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    protected readonly builder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dialogAdd = {
      title: 'Adicionar novo cliente',
      option: {
        yes: 'Salvar',
        no: 'Cancelar',
      },
    };

    this.customerForm = this.builder.group({
      id: null,
      name: [null, Validators.required],
      document: [null, Validators.required],
      phone: null,
      email: null,
      inactive: false,
      address: this.builder.group({
        id: null,
        zipCode: [null, Validators.required],
        district: [null, Validators.required],
        street: [null, Validators.required],
        number: null,
        complement: null,
        city: [null, Validators.required],
        uf: [null, Validators.required],
      }),
    });

    if (this.data.document) {
      const document = this.data.document;
      this.customerService
        .getCustomerByDocument(document)
        .subscribe((customer) => {
          this.customerForm.patchValue(customer);
          this.dialogAdd.title = customer.name;
          this.active = !customer.inactive;
          this.customer = customer;
        });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.customerForm.get('inactive').setValue(!this.active);

    if (this.customerForm.valid) {
      if (this.customer?.id) {
        this.customerService.update(this.customerForm.value).subscribe(() => {
          this.openSnackBar('Atualizado', '');
          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);
        });
      } else {
        this.customerService.save(this.customerForm.value).subscribe(() => {
          this.openSnackBar('Created', '');
          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);
        });
      }
    } else {
      this.openSnackBar('Formulário invalido', 'OK');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }

  public get dialogAdd(): any {
    return this._dialogAddStructure;
  }

  public set dialogAdd(value: any) {
    this._dialogAddStructure = value;
  }

  public getAddressByZip() {
    const zip = this.customerForm.get('address').get('zipCode').value;

    if (zip.length === 8) {
      this.addressService.getAddress(zip).subscribe((endereco) => {
        this.customerForm.get('address').patchValue({
          district: endereco.bairro,
          street: endereco.logradouro,
          number: endereco.numero,
          complement: endereco.complemento,
          city: endereco.localidade,
          uf: endereco.uf,
        });
      });
    }
  }
}
