import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AddressService {
  protected url = `https://viacep.com.br/ws`;

  constructor(public http: HttpClient) {}

  public getAddress(zipCode: string): Observable<any> {
    return this.http.get(`${this.url}/${zipCode}/json/`).pipe(
      catchError(this.handleError),
      map((json) => json as any)
    );
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
