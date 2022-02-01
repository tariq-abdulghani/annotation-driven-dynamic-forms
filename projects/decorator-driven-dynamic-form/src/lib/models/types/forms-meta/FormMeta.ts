import { FormLayout } from '../form-layout-enum';
import {FormUpdateStrategy} from "./form-update-strategy";

export interface FormMeta {
  updateStrategy: FormUpdateStrategy,
  layout: FormLayout;
}
