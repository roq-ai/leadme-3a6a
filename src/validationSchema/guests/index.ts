import * as yup from 'yup';

export const guestValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
