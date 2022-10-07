import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSummaryCardComponent } from './add-summary-card/add-summary-card.component';
import { SummaryCardEditorComponent } from './summary-card-editor/summary-card-editor.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddSummaryCardComponent,

  },
  {
    path: 'summary-cards',
    component: SummaryCardsComponent,

  },
 
  {
    path: '**',
    redirectTo: 'edit'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryCardRoutingModule { }
