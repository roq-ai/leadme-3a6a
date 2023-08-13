import * as yup from 'yup';

export const formSubmissionValidationSchema = yup.object().shape({
  guest_id: yup.string().nullable(),
  lead_form_id: yup.string().nullable(),
});
