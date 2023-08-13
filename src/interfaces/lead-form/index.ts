import { FormSubmissionInterface } from 'interfaces/form-submission';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface LeadFormInterface {
  id?: string;
  name: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  form_submission?: FormSubmissionInterface[];
  organization?: OrganizationInterface;
  _count?: {
    form_submission?: number;
  };
}

export interface LeadFormGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
