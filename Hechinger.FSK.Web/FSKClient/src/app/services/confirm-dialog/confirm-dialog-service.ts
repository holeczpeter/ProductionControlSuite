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
      .setTitle('confirmDialog.ready')
      .setContent(message)
      .setType(ConfirmationTypes.Success)
      .setButtons([{ text: 'ok', value: true }])
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
      .setTitle('confirmDialog.information')
      .setContent(message)
      .setType(ConfirmationTypes.Information)
      .setButtons([{ text: 'ok', value: true }])
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
      .setTitle('confirmDialog.warning')
      .setContent(message)
      .setType(ConfirmationTypes.Warning)
      .setButtons([{ text: 'yes', value: true }, { text: 'cancel', value: false }])
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
      .setTitle('confirmDialog.warning')
      .setContent(message)
      .setType(ConfirmationTypes.Warning)
      .setButtons([{ text: 'yes', value: true }, { text: 'cancel', value: false }])
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
      .setTitle('confirmDialog.error')
      .setContent(message)
      .setType(ConfirmationTypes.Error)
      .setButtons([{ text: 'ok', value: true }])
      .build();
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  openDeleteConfirm(subject: string) {
    const buttons: Array<ConfirmDialogResult> = [{ text: 'confirmDialog.delete', value: true }, { text: 'cancel', value: false }]
    let data = new ConfirmDialogDataBuilder()
      .setTitle('confirmDialog.delete')
      .setContent(subject)
      .setType(ConfirmationTypes.Delete)
      .setButtons(buttons)
      .build();
    console.log(data)
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      data: data,
      disableClose: true,
      panelClass: 'confirm-dialog'
    }).afterClosed();
  }

  confirmClose(ref: MatDialogRef<any>) {
    this.openConfirmWarning("confirmDialog.confirmCanDeactivate").subscribe(result => {
      if (result) {
        sessionStorage.removeItem("originalForm");
        ref.close();
      }
    });
  }

  confirmUnsavedChanges() {
    return this.openConfirmWarning("confirmDialog.confirmCanDeactivate");
  }
}
