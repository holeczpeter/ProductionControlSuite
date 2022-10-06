import { DoCheck } from '@angular/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemModel } from '../../models/generated';
import { MenuDataService } from '../../services/data/menu-data.service';
export type AccordionConfig = {
  multi?: boolean
};
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, DoCheck {
  @Input() sidebarMenuItems!: Array<MenuItemModel>;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _differ!: IterableDiffer<any>;
  submenucount!: number;
  config: AccordionConfig = { multi: false };
  constructor(private readonly menudataService: MenuDataService,
    private differs: IterableDiffers,
    private readonly router: Router,
    private cdr: ChangeDetectorRef) {
    this._differ = this.differs.find([]).create();
  }

  ngOnInit(): void {
   
  }
  ngDoCheck(): void {
    var changes = this._differ.diff(this.sidebarMenuItems);
    if (changes) this.setCollapsedAll(false);
    this.cdr.detectChanges();
  }

  close(): void {
    this.onClose.emit(true);
  }

  setCollapsedAll(isCollapsed: boolean) {
    this.sidebarMenuItems.forEach(menu => {
      menu.collapsed = menu.children?.some(child => child.path == this.router.url) ? true : isCollapsed;
    });
  }

  toggle(index: number) {
    if (!this.config.multi) {
      this.sidebarMenuItems
        .filter((menu, i) => i !== index && menu.collapsed)
        .forEach(menu => (menu.collapsed = !menu.collapsed));
    }
    this.sidebarMenuItems[index].collapsed = !this.sidebarMenuItems[index].collapsed;
  }
}
