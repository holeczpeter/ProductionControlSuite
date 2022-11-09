import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { AddSummaryCardComponent } from './add-summary-card/add-summary-card.component';
import { SummaryCardEditorDialogComponent } from './summary-card-editor-dialog/summary-card-editor-dialog.component';
import { SummaryCardEditorComponent } from './summary-card-editor/summary-card-editor.component';
import { SummaryCardRoutingModule } from './summary-card-routing.module';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';
import { SummaryCardPrintComponent } from './summary-card-print/summary-card-print.component';
import { SummaryCardPrintViewComponent } from './summary-card-print/summary-card-print-view/summary-card-print-view.component';


@NgModule({
  declarations: [
    SummaryCardsComponent,
    SummaryCardEditorComponent,
    AddSummaryCardComponent,
    SummaryCardEditorDialogComponent,
    SummaryCardPrintComponent,
    SummaryCardPrintViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    SummaryCardRoutingModule
  ]
})
export class SummaryCardModule { }
