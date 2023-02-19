import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private readonly httpClient: HttpClient) { }

  getUserManual(): Observable<any> {
    return this.httpClient.get('Document/GetUserManual', { observe: 'response', responseType: 'blob' });
  }
}
