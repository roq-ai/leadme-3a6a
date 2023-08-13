import axios from 'axios';
import queryString from 'query-string';
import { FormSubmissionInterface, FormSubmissionGetQueryInterface } from 'interfaces/form-submission';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFormSubmissions = async (
  query?: FormSubmissionGetQueryInterface,
): Promise<PaginatedInterface<FormSubmissionInterface>> => {
  const response = await axios.get('/api/form-submissions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFormSubmission = async (formSubmission: FormSubmissionInterface) => {
  const response = await axios.post('/api/form-submissions', formSubmission);
  return response.data;
};

export const updateFormSubmissionById = async (id: string, formSubmission: FormSubmissionInterface) => {
  const response = await axios.put(`/api/form-submissions/${id}`, formSubmission);
  return response.data;
};

export const getFormSubmissionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/form-submissions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFormSubmissionById = async (id: string) => {
  const response = await axios.delete(`/api/form-submissions/${id}`);
  return response.data;
};
