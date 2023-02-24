export class TableColumnModel {
  displayName: string;
  name: string;
  exportable: boolean;
  columnDef: string;
  type: ColumnTypes;
  width?: string;
}
export enum ColumnTypes {
  Text = 0,
  Date = 1,
  Select = 2,
  Number = 3,
}
