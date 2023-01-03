import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationTypes, ConfirmDialogData, ConfirmDialogResult } from '../../models/generated/generated';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogDataBuilder } from './confirm-dialog-data-builder';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(public readonly dialog: MatDialog) { }

  openCustom(data: ConfirmDialogData) {
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  openSuccess(message: string) {
    let data = new ConfirmDialogDataBuilder()
      .setTitle('Kész!')
      .setContent(message)
      .setType(ConfirmationTypes.Success)
      .setButtons([{ text: 'Rendben', value: true }])
      .build();
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }
  openInformation(message: string) {
    let data = new ConfirmDialogDataBuilder()
      .setTitle('Információ')
      .setContent(message)
      .setType(ConfirmationTypes.Information)
      .setButtons([{ text: 'Rendben', value: true }])
      .build();
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  openConfirmWarning(message: string) {
    let data = new ConfirmDialogDataBuilder()
      .setTitle('Figyelmeztetés!')
      .setContent(message)
      .setType(ConfirmationTypes.Warning)
      .setButtons([{ text: 'Igen', value: true }, { text: 'Mégsem', value: false }])
      .build();
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  openWarning(message: string) {
    let data = new ConfirmDialogDataBuilder()
      .setTitle('Figyelmeztetés!')
      .setContent(message)
      .setType(ConfirmationTypes.Warning)
      .setButtons([{ text: 'Rendben', value: true }, { text: 'Mégsem', value: false }])
      .build();
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  openError(message: string) {
    let data = new ConfirmDialogDataBuilder()
      .setTitle('Hiba!')
      .setContent(message)
      .setType(ConfirmationTypes.Error)
      .setButtons([{ text: 'Rendben', value: true }])
      .build();
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  openDeleteConfirm(subject: string, description?: string) {
    const content: string = `Valóban törölni szeretné a kiválasztott ${subject}? ${description ? description : ""}`
    const buttons: Array<ConfirmDialogResult> = [{ text: 'Törlés', value: true }, { text: 'Mégsem', value: false }]
    let data = new ConfirmDialogDataBuilder()
      .setTitle('Törlés')
      .setContent(content)
      .setType(ConfirmationTypes.Delete)
      .setButtons(buttons)
      .build();

    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  confirmClose(ref: MatDialogRef<any>) {
    this.openConfirmWarning('Biztosan elnavigál? Önnek nem mentett módosításai vannak. A módosításai elvesznek').subscribe(result => {
      if (result) {
        sessionStorage.removeItem("originalForm");
        ref.close();
      }
    });
  }

  confirmUnsavedChanges() {
    return this.openConfirmWarning('Biztosan elnavigál? Önnek nem mentett módosításai vannak. A módosításai elvesznek');
  }
}
