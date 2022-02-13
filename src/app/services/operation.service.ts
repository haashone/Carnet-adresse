import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Contact } from '../model/contact';
import { Address } from '../model/address';
@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private apiURL = 'api/contacts/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURL).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getContact(id: any): Observable<any> {
    return this.http.get<Contact>(this.apiURL + id).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiURL, contact).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editContact(contact: Contact): Observable<any> {
    return this.http.put(this.apiURL + contact.id, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(this.apiURL + id);

  }
}
