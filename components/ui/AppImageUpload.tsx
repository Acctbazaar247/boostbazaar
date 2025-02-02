import { useUploadImageMutation } from '@/redux/features/user/userApi';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgFileAdd } from 'react-icons/cg';
import { toast } from 'react-toastify';

type Props = {
  name: string;
  placeholder?: string;
  onChange: (value: string) => void;
  imageUrl?: string;
  setImageLoading: (value: boolean) => void;
};

const AppImageUpload = ({
  name,
  placeholder,
  onChange,
  imageUrl,
  setImageLoading,
}: Props) => {
  // const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string>('');

  const handleFileUpload = async (
    file: File,
    onChange: (value: string) => void,
  ) => {
    const formData = new FormData();
    const maxSizeInBytes = 2 * 1024 * 1024;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    // Validate file type and size
    if (!validTypes.includes(file.type)) {
      return toast.error('Only JPEG and PNG formats are allowed', {
        toastId: 'formatError',
      });
    }
    if (file.size > maxSizeInBytes) {
      return toast.error('File size must be under 2 MB', {
        toastId: 'sizeError',
      });
    }

    formData.append('image', file);
    setImageLoading(true);
    const loadingToast = toast.loading('Uploading...🚀');

    try {
      // Perform the fetch request
      const response = await fetch(
        'https://acct-media-server.onrender.com/api/v1/uploadImg',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Something went wrong during the upload');
      }

      const data = await response.json();
      if (data.data) {
        setImage(data.data.url);
        onChange(data.data.url);
      }
      toast.dismiss(loadingToast);
      toast.success('Image updated successfully 👍');
      setImageLoading(false);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.message || 'Something went wrong');
      setImageLoading(false);
    }
  };
  return (
    <form>
      <div>
        <input
          type="file"
          id={'imageUploader'}
          className="hidden"
          accept=".jpg,.jpeg,.png"
          onChange={e => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              handleFileUpload(file, onChange);
            }
          }}
        />

        <label
          htmlFor={'imageUploader'}
          className="cursor-pointer border border-borderColor rounded hover:bg-zinc/20 border-dashed flex items-center gap-1 justify-between"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
          ) : (
            <>
              {image === '' ? (
                <div className="flex items-center justify-between p-3 w-full">
                  <h2 className="text-darkishGrey flex items-center gap-1 text-sm">
                    <CgFileAdd />
                    {placeholder}
                  </h2>
                  <p className="text-primary text-xs font-medium">
                    Select File
                  </p>
                </div>
              ) : (
                <Image
                  width={600}
                  height={200}
                  src={image}
                  alt="identity image"
                  className="w-full rounded min-h-40 max-h-44 object-cover"
                />
              )}
            </>
          )}
        </label>

        <h2 className="text-darkishGrey pt-1 text-xs">
          JPEG, PNG, Max file size: 2 MB
        </h2>
      </div>
    </form>
  );
};

export default AppImageUpload;
