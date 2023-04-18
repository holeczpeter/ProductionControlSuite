
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateParser, TranslateService } from "@ngx-translate/core";
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class TranslatedPaginatorService extends MatPaginatorIntl implements OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  private translatedRangeLabel: string = '';

  constructor(private translateService: TranslateService, private translateParser: TranslateParser) {
    super();
    this.translateService.onLangChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getAndInitTranslations();
      });

    this.getAndInitTranslations();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translateService.stream([
      'paginator.firstpage',
      'paginator.itemsperpage',
      'paginator.lastpage',
      'paginator.nextpage',
      'paginator.previouspage',
      'paginator.range'
    ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(translation => {
        this.firstPageLabel = translation['paginator.firstpage'];
        this.itemsPerPageLabel = translation['paginator.itemsperpage'];
        this.lastPageLabel = translation['paginator.lastpage'];
        this.nextPageLabel = translation['paginator.nextpage'];
        this.previousPageLabel = translation['paginator.previouspage'];
        this.translatedRangeLabel = translation['paginator.range'];
        this.changes.next();
      });
  }

  
}
