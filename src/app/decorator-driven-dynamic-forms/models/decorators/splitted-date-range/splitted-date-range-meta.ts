export interface SplittedDateRangeMeta {
  startDate: {
    name: string;
    id: string;
    placeHolder?: string;
    label?: string;
    notNull?: { message: string };
  };
  endDate: {
    name: string;
    id: string;
    placeHolder?: string;
    label?: string;
  };
  from: Date;
  to: Date;
  optional?: boolean;
  width?: number;
  style?: string;
  class?: string;
  [x: string]: any;
}
