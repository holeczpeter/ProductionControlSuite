import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from '../../models/menu-item-model';
import { MenuDataService } from '../../services/data/menu-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  menu: Array<MenuItemModel> | undefined;


  constructor(private readonly menudataService: MenuDataService) {
  }

  ngOnInit(): void {
    this.menudataService.getAll().subscribe(x => {
      this.menu = x;

    });
  }

}
