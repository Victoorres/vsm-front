import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  protected url = `${environment.api.url}/customers`;

  constructor(public http: HttpClient) {}
}
