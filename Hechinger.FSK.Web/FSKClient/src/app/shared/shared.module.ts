
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { OverlayLoadingDirective } from '../directives/overlay-loading.directive';
import { CategorySplitPipe } from '../pipes/category-split.pipe';
import { DateWithNamePipe } from '../pipes/date-with-name.pipe';
import { EnumPipe } from '../pipes/enum.pipe';
import { ShiftNamePipe } from '../pipes/shift-name.pipe';
import { SumCategoryPipe } from '../pipes/sum-category.pipe';
import { HttpCancelService } from '../services/http-cancel.service';
import { AuthInterceptor } from '../services/interceptors/auth.interceptor';
import { SpinnerInterceptor } from '../services/interceptors/spinner.interceptor';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { IntervalViewComponent } from './interval-view/interval-view.component';
import { LoaderComponent } from './loader/loader.component';
import { TitleComponent } from './title/title.component';
import { NgxPrintModule } from 'ngx-print';
import { SummaryCardHeaderComponent } from './summary-card-header/summary-card-header.component';
import { OperationSearchComponent } from './operation-search/operation-search.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { DefectSearchComponent } from './defect-search/defect-search.component';
import { CategoriesLegendComponent } from './categories-legend/categories-legend.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductMultiSelectSearchComponent } from './product-multi-select-search/product-multi-select-search.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { CategoryPipe } from '../pipes/category.pipe';
import { WorkshopSearchComponent } from './workshop-search/workshop-search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfoCardComponent } from './info-card/info-card.component';
@NgModule({
  declarations: [
    
    TitleComponent,
    DialogHeaderComponent,
    OverlayLoadingDirective,
    LoaderComponent,
    IntervalViewComponent,
    EnumPipe,
    ShiftNamePipe,
    CategorySplitPipe,
    DateWithNamePipe,
    SumCategoryPipe,
    SummaryCardHeaderComponent,
    OperationSearchComponent,
    ProductSearchComponent,
    DefectSearchComponent,
    CategoriesLegendComponent,
    FileUploadComponent,
    ImageUploadComponent,
    ProductMultiSelectSearchComponent,
    TableToolbarComponent,
    CategoryPipe,
    WorkshopSearchComponent,
    InfoCardComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    FormsModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatRadioModule,
    MatStepperModule,
    MatTreeModule,
    DragDropModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    OverlayModule,
    CdkTableModule,
    MatGridListModule,
    MatSlideToggleModule,
    TranslateModule,
    NgxMaskModule.forRoot(),
    NgxMatSelectSearchModule,
    NgxPrintModule,
    NgApexchartsModule,
    InfiniteScrollModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    FormsModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatRadioModule,
    MatStepperModule,
    MatTreeModule,
    DragDropModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    OverlayModule,
    CdkTableModule,
    MatGridListModule,
    MatSlideToggleModule,
    NgxMaskModule,
    TitleComponent,
    DialogHeaderComponent,
    OverlayLoadingDirective,
    NgxMatSelectSearchModule,
    IntervalViewComponent,
    NgxEchartsModule,
    EnumPipe,
    ShiftNamePipe,
    CategorySplitPipe,
    DateWithNamePipe,
    SumCategoryPipe,
    NgxPrintModule,
    NgApexchartsModule,
    SummaryCardHeaderComponent,
    OperationSearchComponent,
    ProductSearchComponent,
    DefectSearchComponent,
    CategoriesLegendComponent,
    FileUploadComponent,
    ImageUploadComponent,
    ProductMultiSelectSearchComponent,
    TableToolbarComponent,
    CategoryPipe,
    WorkshopSearchComponent,
    InfiniteScrollModule,
    InfoCardComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    MatDatepickerModule,
    SnackbarService,
    HttpCancelService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents: [
    LoaderComponent,
    IntervalViewComponent
  ]
})
export class SharedModule { }
export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Találatok oldalanként:';
  customPaginatorIntl.firstPageLabel = 'Első';
  customPaginatorIntl.lastPageLabel = 'Utolsó';
  customPaginatorIntl.nextPageLabel = 'Következő oldal';
  customPaginatorIntl.previousPageLabel = 'Előző oldal';

  return customPaginatorIntl;
}
