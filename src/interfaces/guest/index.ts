import { FormSubmissionInterface } from 'interfaces/form-submission';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GuestInterface {
  id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  form_submission?: FormSubmissionInterface[];
  user?: UserInterface;
  _count?: {
    form_submission?: number;
  };
}

export interface GuestGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
