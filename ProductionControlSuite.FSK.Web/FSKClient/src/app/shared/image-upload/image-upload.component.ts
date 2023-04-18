import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileSnippet } from '../../models/file-snippet';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements  OnChanges, OnDestroy {
  @Input() imageModel!: any;
  @Input() defectId!: number;
  currentPicture!: any;
  selectedFile!: FileSnippet;
  constructor(private imageService: ImageService,
    private readonly domSanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageModel'] && this.imageModel) {
      this.currentPicture = this.imageModel != null ? this.domSanitizer.bypassSecurityTrustUrl('data:image/png; base64,' + this.imageModel.image) : null;
    }
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new FileSnippet(event.target.result, file);
      this.imageService.upload(this.selectedFile.file, this.defectId).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
  }
}


