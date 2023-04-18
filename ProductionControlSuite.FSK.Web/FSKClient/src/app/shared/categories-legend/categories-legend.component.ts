import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/categories/category.service';

@Component({
  selector: 'app-categories-legend',
  templateUrl: './categories-legend.component.html',
  styleUrls: ['./categories-legend.component.scss']
})
export class CategoriesLegendComponent implements OnInit {

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
  }

}
