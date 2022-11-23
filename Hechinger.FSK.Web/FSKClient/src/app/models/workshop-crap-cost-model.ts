import { DashboardCrapCost, IntervalModel } from "./generated/generated";

export interface WorkshopCrapCostModel {
  items: Array<DashboardCrapCost>;
  interval: IntervalModel;
}
