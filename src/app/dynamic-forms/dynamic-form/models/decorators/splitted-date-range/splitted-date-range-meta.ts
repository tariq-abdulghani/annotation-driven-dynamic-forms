export interface SplittedDateRangeMeta {
  startDate: {
    name: string;
    id: string;
    placeHolder?: string;
    label?: string;
  };
  endDate: {
    name: string;
    id: string;
    placeHolder?: string;
    label?: string;
  };
  minDate: Date;
  maxDate: Date;
  optional?: boolean;
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}
