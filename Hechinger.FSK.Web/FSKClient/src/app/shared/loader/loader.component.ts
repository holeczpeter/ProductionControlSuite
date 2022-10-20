import { Component, OnInit } from '@angular/core';
import { SpinnerData } from '../../models/spinner-data';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  constructor(public data: SpinnerData) {
  console.log(data)}
  get isSpinner(): boolean {
    return this.data.type === 'Spinner';
  }

  get isProgressBar(): boolean {
    return this.data.type === 'ProgressBar';
  }
  ngOnInit() {
  }
}

