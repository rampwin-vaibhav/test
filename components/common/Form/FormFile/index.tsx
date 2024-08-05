import { useTranslation } from 'next-i18next';
import { ReactElement, useEffect, useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { LabelConstants } from '../../../../types/i18n.labels';
import {
  WindowCloseIcon,
  ImageIcon,
  RightTickIcon,
  UploadIcon,
} from '../../../icons';

type FormFileProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;

  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;

  /**
   * Label text for file control.
   */
  label?: string;

  /**
   * This property is use to specify custom filter options for file types.
   */
  accept?: string;

  /**
   * This property is use to disabled the user input.
   */
  disabled?: boolean;

  /**
   * This property is use to specify default layout for clickable area.
   */
  children?: ReactElement;

  /**
   * This property is use to set multiple file selection
   */
  multiple?: boolean;

  /**
   * This property is use to set max file selection
   */
  max?: number;

  /**
   * This property is use to set preview option.
   */
  preview?: 'inline' | 'specific';

  /**
   * This property is use to set image preview.
   */
  isImage?: boolean;

  /**
   * This Property is use to hide/show validation error message.
   */
  showError?: boolean;
};

/**
 * It is wrapper of form file HTML element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormFile = <T extends FieldValues>({
  name,
  control,
  label,
  accept = '*',
  disabled = false,
  children,
  multiple = false,
  max = 1,
  preview = 'inline',
  isImage = true,
  showError = true,
}: FormFileProps<T>) => {
  const { t } = useTranslation();
  const [selectedPreview, setSelectedPreview] = useState<'inline' | 'specific'>(
    preview
  );

  useEffect(() => {
    if (multiple) {
      setSelectedPreview('specific');
    }
  }, [multiple, max, preview]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { isDirty, error },
        formState: { isSubmitted, isValid },
      }) => {
        const fileData: Array<File> | File | null | undefined = field.value;

        const handleRemoveFile = (index: number) => {
          (fileData as Array<File>)?.splice(index, 1);
          if (fileData && (fileData as Array<File>).length > 0) {
            field.onChange(fileData);
          } else {
            field.onChange(null);
          }
        };

        return (
          <div className="w-full">
            {label && <label htmlFor={name}>{label}</label>}
            <div className="form-group file-area">
              <input
                type="file"
                name="images"
                id="images"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    if (multiple) {
                      let selectedFile: Array<File> = field.value || [];
                      selectedFile.push(e.target.files[0]);
                      field.onChange(selectedFile);
                    } else {
                      field.onChange(e.target.files[0]);
                    }
                  } else {
                    field.onChange(null);
                  }
                }}
                disabled={
                  disabled || (multiple && (field.value || []).length === max)
                }
                accept={accept}
                multiple={false}
              />

              {fileData && selectedPreview === 'inline' ? (
                <div className="file-preview h-[125px] w-full">
                  <div className="absolute w-full flex flex-row-reverse pt-[1px] pr-[4px]">
                    <div
                      className="w-[15px] h-[15px] m-1 cursor-pointer"
                      onClick={() => {
                        field.onChange(null);
                      }}
                    >
                      <WindowCloseIcon className="w-full h-full" />
                    </div>
                  </div>
                  {isImage ? (
                    <picture className="h-[125px] w-full">
                      <img
                        src={URL.createObjectURL(fileData as File)}
                        alt=""
                        className="h-[125px] w-full aspect-[4/3] object-fill"
                      />
                    </picture>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-lime-400 rounded-md">
                      <RightTickIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="file-dummy h-[125px] flex items-center justify-center">
                  {children ? (
                    children
                  ) : (
                    <div className="flex flex-col justify-between items-center w-full text-xs text-gray-600">
                      <UploadIcon className="h-[20px] w-[20px]" />
                      <label>{t(LabelConstants.UPLOAD_FILE)}</label>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="error">
              {showError &&
              (isDirty || isSubmitted) &&
              !isValid &&
              error?.message
                ? t(error?.message)
                : ''}
            </p>

            <div className="flex flex-wrap gap-2 w-full my-1">
              {fileData && selectedPreview === 'specific' && multiple && (
                <>
                  {(fileData as Array<File>).map((x, i) => {
                    return (
                      <div
                        className="h-[75px] flex gap-2 items-center justify-between w-full m-2"
                        key={i}
                      >
                        <div className="flex gap-4 items-center">
                          <ImageIcon className="h-4 w-4" />
                          <div className="flex flex-col lg:w-36 sm:w-24 w-12">
                            <h1>{x.name}</h1>
                            <h1>
                              {(x.size / (1024 * 1024)).toFixed(2)}
                              mb
                            </h1>
                          </div>
                        </div>
                        <div
                          className="w-[15px] h-[15px] m-1 cursor-pointer"
                          onClick={() => handleRemoveFile(i)}
                        >
                          <WindowCloseIcon className="w-full h-full" />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="flex gap-2 w-full">
              {fileData && selectedPreview === 'specific' && !multiple && (
                <div className="h-[75px] flex gap-2 items-center justify-between w-full m-2">
                  <div className="flex gap-4 items-center">
                    <ImageIcon className="h-4 w-4" />
                    <div className="flex flex-col lg:w-36 sm:w-24 w-12">
                      <h1>{(fileData as File).name}</h1>
                      <h1>
                        {((fileData as File).size / (1024 * 1024)).toFixed(2)}mb
                      </h1>
                    </div>
                  </div>
                  <div
                    className="w-[15px] h-[15px] m-1 cursor-pointer"
                    onClick={() => field.onChange(null)}
                  >
                    <WindowCloseIcon className="w-full h-full" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default FormFile;
