import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFormSubmission } from 'apiSdk/form-submissions';
import { formSubmissionValidationSchema } from 'validationSchema/form-submissions';
import { GuestInterface } from 'interfaces/guest';
import { LeadFormInterface } from 'interfaces/lead-form';
import { getGuests } from 'apiSdk/guests';
import { getLeadForms } from 'apiSdk/lead-forms';
import { FormSubmissionInterface } from 'interfaces/form-submission';

function FormSubmissionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FormSubmissionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFormSubmission(values);
      resetForm();
      router.push('/form-submissions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FormSubmissionInterface>({
    initialValues: {
      guest_id: (router.query.guest_id as string) ?? null,
      lead_form_id: (router.query.lead_form_id as string) ?? null,
    },
    validationSchema: formSubmissionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Form Submissions',
              link: '/form-submissions',
            },
            {
              label: 'Create Form Submission',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Form Submission
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<GuestInterface>
            formik={formik}
            name={'guest_id'}
            label={'Select Guest'}
            placeholder={'Select Guest'}
            fetcher={getGuests}
            labelField={'id'}
          />
          <AsyncSelect<LeadFormInterface>
            formik={formik}
            name={'lead_form_id'}
            label={'Select Lead Form'}
            placeholder={'Select Lead Form'}
            fetcher={getLeadForms}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/form-submissions')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'form_submission',
    operation: AccessOperationEnum.CREATE,
  }),
)(FormSubmissionCreatePage);