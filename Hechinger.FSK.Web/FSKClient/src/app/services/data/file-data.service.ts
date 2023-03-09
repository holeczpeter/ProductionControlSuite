import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class FileDataService {

  constructor(private readonly httpClient: HttpClient, private readonly documentDataService: DocumentService) { }

  open(observable: Observable<Blob>) {
    observable.subscribe(
      response => {
        const objectUrl = URL.createObjectURL(response);
        if (window.navigator && window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(response, "a");
        }
        else {
          window.open(objectUrl);
        }
      },
      error => {
        console.error(`Error: ${error.message}`);
      }
    );
  }

  download(observable: Observable<Blob>) {
    return observable.pipe(tap((response) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(response);
      a.href = objectUrl;
      a.download = "a";
      a.click();
      if (window.navigator && window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(response, "a");
      }
      URL.revokeObjectURL(objectUrl);
    },
      error => {
        console.error(`Error: ${error.message}`);
      }
    ));
  }
}
