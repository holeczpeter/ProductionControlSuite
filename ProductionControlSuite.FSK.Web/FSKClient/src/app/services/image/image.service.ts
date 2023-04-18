import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  constructor(private readonly httpClient: HttpClient) { }

  upload(image: File, defectId: number): Observable<any> {
    let formDataToSend = new FormData();
    formDataToSend.set('id', defectId.toString());
    formDataToSend.set('file', image);
    return this.httpClient.post('Image/Upload', formDataToSend);
  }
}
