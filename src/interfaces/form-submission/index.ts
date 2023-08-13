import { GuestInterface } from 'interfaces/guest';
import { LeadFormInterface } from 'interfaces/lead-form';
import { GetQueryInterface } from 'interfaces';

export interface FormSubmissionInterface {
  id?: string;
  guest_id?: string;
  lead_form_id?: string;
  created_at?: any;
  updated_at?: any;

  guest?: GuestInterface;
  lead_form?: LeadFormInterface;
  _count?: {};
}

export interface FormSubmissionGetQueryInterface extends GetQueryInterface {
  id?: string;
  guest_id?: string;
  lead_form_id?: string;
}
