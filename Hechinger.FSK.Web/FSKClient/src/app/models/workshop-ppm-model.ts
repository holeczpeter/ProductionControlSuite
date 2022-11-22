import { IntervalModel, WorkshopPpmData } from "./generated/generated";

export interface WorkshopPpmModel {
  items: Array<WorkshopPpmData>;
  interval: IntervalModel;
}
