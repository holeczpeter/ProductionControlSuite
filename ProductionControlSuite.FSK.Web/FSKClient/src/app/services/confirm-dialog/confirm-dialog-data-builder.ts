import { ConfirmationTypes, ConfirmDialogData, ConfirmDialogResult } from "../../models/generated/generated";


export class ConfirmDialogDataBuilder {
  private readonly confirmDialogData: ConfirmDialogData;

  constructor() {
    this.confirmDialogData = {
      title: '',
      buttons: new Array<ConfirmDialogResult>(),
      content: '',
      type: ConfirmationTypes.Information
    };
  }
  setTitle(title: string): ConfirmDialogDataBuilder {
    this.confirmDialogData.title = title;
    return this;
  }
  setContent(content: string): ConfirmDialogDataBuilder {
    this.confirmDialogData.content = content;
    return this;
  }
  setButtons(buttons: Array<ConfirmDialogResult>): ConfirmDialogDataBuilder {
    this.confirmDialogData.buttons = buttons;
    return this;
  }
  setType(type: ConfirmationTypes): ConfirmDialogDataBuilder {
    this.confirmDialogData.type = type;
    return this;
  }
  build(): ConfirmDialogData {
    return this.confirmDialogData;
  }
}
