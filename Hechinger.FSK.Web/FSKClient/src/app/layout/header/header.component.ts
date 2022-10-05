import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  companyName = "Hechinger Hungary Kft.";
  imageSrc = 'assets/images/logo.png';
  name = 'Holecz Péter'
  constructor() { }

  ngOnInit(): void {
  }
  setLanguage(key: string, $event : Event) {
    //$event.stopPropagation();
    //$event.preventDefault();
    //this.translateService.use(key);
  }
}
