
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';
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
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { TitleComponent } from './title/title.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TitleComponent,
    DialogHeaderComponent
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
    TranslateModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    CommonModule,
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
    TitleComponent,
    DialogHeaderComponent
   
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    MatDatepickerModule,
    //SnackBarService,
    //HttpCancelService,
    //{ provide: DateAdapter, useClass: LocaleDateAdapterService },
    //{ provide: HTTP_INTERCEPTORS, useClass: MainHttpInterceptor, multi: true },

  ],
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
