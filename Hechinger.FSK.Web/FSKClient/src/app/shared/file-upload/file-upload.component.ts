import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileSnippet } from '../../models/file-snippet';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  selectedFile: FileSnippet | null;
  @Output() upload = new EventEmitter<FileSnippet>();
  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    this.processFile(fileUpload);
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new FileSnippet(event.target.result, file);

    });
    reader.readAsDataURL(file);
  }
  onUpload() {
    if (this.selectedFile) this.upload.emit(this.selectedFile);
    this.selectedFile = null;
  }
}
