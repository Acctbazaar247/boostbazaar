'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import AppButton from '../ui/AppButton';
import AppFormInput from '../ui/AppFormInput';
import AppFormTextArea from '../ui/AppFormTextArea';
import { toast } from 'react-toastify';
import { useCreateTicketMutation } from '@/redux/features/dashboard/dashboardApi';
import AppInfo from '../ui/AppInfo';
import AppFormSelect from '../ui/AppFormSelect';
import Swal from 'sweetalert2';
interface FormData {
  subject: string;
  message: string;
}

const ComplainForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>();

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const onSubmit: SubmitHandler<FormData> = async data => {
    await createTicket(data)
      .unwrap()
      .then(res => {
        Swal.fire(
          'Success',
          'Your ticket has been successfully submitted. We will be in touch with you shortly via email.',
          'success',
        );
        reset();
      })
      .catch(res => {
        toast.error(res?.data?.message);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary/80 rounded-lg p-4 md:p-8 space-y-4 md:space-y-8"
      >
        <AppFormSelect
          name="subject"
          options={[
            { label: 'SMS service issues', value: 'SMS service issues' },
            { label: 'Boost Service issues', value: 'Boost Service issues' },
            { label: 'Payment issues', value: 'Payment issues' },
            { label: 'Something Else', value: 'Something Else' },
          ]}
          label="Subject"
          required
          placeholder="Enter subject"
          control={control}
        />

        <AppFormTextArea
          name="message"
          register={register}
          required
          label="Write a message"
          placeholder="Write your message here..."
          error={errors.message}
        />

        <AppButton
          disabled={isLoading}
          type="submit"
          className="w-full py-3"
          label="Confirm"
        />
      </form>

      <AppInfo>
        <p>
          If you encounter any issues with the ticket system or haven&apos;t
          received a response, please reach out to us via email at{' '}
          <a
            className="text-primary underline "
            href="mailto:support@acctpanel.com"
          >
            support@acctpanel.com
          </a>{' '}
          Our technical support is available in English.
        </p>
      </AppInfo>
    </>
  );
};

export default ComplainForm;
