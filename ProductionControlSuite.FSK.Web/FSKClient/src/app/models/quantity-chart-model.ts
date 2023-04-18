import { DefectCategories } from "./generated/generated";

export interface QuantityChartModel {
  id: number;
  code: string;
  name: string;
  translatedName: string;
  value: number;
  category: DefectCategories;
}
