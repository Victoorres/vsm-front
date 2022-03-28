import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/classes/customer';

@Injectable()
export class CustomerService {
  protected url = `${environment.api.url}/customers`;

  constructor(public http: HttpClient) {}

  public getCustomers(): Observable<any> {
    return this.http.get(`${this.url}`).pipe(
      catchError(this.handleError),
      map((json) => json as any)
    );
  }

  public getCustomerByDocument(document: string): Observable<any> {
    return this.http.get(`${this.url}/${document}`).pipe(
      catchError(this.handleError),
      map((json) => json as any)
    );
  }

  save(data: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Customer>(
      `${this.url}`,
      JSON.stringify(data),
      httpOptions
    );
  }

  update(data: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Customer>(
      `${this.url}/${data.id}`,
      JSON.stringify(data),
      httpOptions
    );
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
