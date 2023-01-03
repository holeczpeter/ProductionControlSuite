import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AddSummaryCardComponent } from './add-summary-card/add-summary-card.component';
import { SummaryCardEditorComponent } from './summary-card-editor/summary-card-editor.component';
import { SummaryCardPrintComponent } from './summary-card-print/summary-card-print.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddSummaryCardComponent,
    canDeactivate: [AuthGuard],
  },
  {
    path: 'summary-cards',
    component: SummaryCardsComponent,

  },
  {
    path: 'print',
    component: SummaryCardPrintComponent,

  },
  {
    path: '**',
    redirectTo: 'add'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryCardRoutingModule { }
