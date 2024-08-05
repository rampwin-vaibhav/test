import { useTranslation } from 'next-i18next';
import { ReactElement } from 'react';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { LabelConstants } from '../../../../types/i18n.labels';
import { WindowCloseIcon, UploadIcon, CircleSuccessIcon } from '../../../icons';

type FormFileUploadProps<T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;
  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;
  /**
   * Label test for file upload control.
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
   * This property is use to set image preview.
   */
  isImage?: boolean;
  /**
   * This Property is use to hide/show validation error message.
   */
  showError?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  /**
   * This property gives File details which we want to upload asynchronously, and will return Image Url Path.
   */
  onChange: (event: File | null) => Promise<string>;
  /**
   * This property validate File content asynchronously and if validation returns true then only it will trigger onChange event to upload it.
   */
  validate?: (event: File | null) => Promise<boolean>;
  invalidImage?: boolean;
  /**
   * This property will show the file name which is uploaded while hovering the mouse on it.
   */
  title?: string;
};
/**
 * It is wrapper of form file HTML element, which internally managed React form hooks for validation.
 * @returns JSX.Element
 */
const FormFileUpload = <T extends FieldValues>({
  name,
  control,
  label,
  accept = '*',
  disabled = false,
  children,
  isImage = true,
  showError = true,
  defaultValue,
  onChange,
  validate,
  invalidImage = false,
  title = '',
}: FormFileUploadProps<T>) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue!}
      control={control}
      render={({
        field,
        fieldState: { isDirty, error },
        formState: { isSubmitted, isValid },
      }) => {
        const fileData: string | null | undefined = defaultValue
          ? defaultValue
          : '';

        return (
          <div className="w-full">
            {label && <label htmlFor={name}>{label}</label>}
            <div className="form-group file-area">
              <input
                className={`${fileData ? 'cursor-default' : 'cursor-pointer'}`}
                type="file"
                name="images"
                id="images"
                onClick={(event: any) => {
                  event.target.value = null;
                  if (fileData) {
                    event.preventDefault();
                  }
                }}
                onChange={async (e) => {
                  let artifactUrl;

                  if (e.target.files && e.target.files.length > 0) {
                    if (validate) {
                      const isValid =
                        validate && (await validate(e.target.files[0]));
                      if (isValid) {
                        artifactUrl = await onChange(e.target.files[0]);
                      }
                    } else {
                      artifactUrl = await onChange(e.target.files[0]);
                    }
                  } else {
                    artifactUrl = null;
                  }

                  field.onChange(artifactUrl);
                }}
                disabled={disabled}
                accept={accept}
                multiple={false}
                title={title || 'No file chosen'}
              />
              {fileData ? (
                <div className="file-preview !border-none aspect-[16/9] w-full">
                  <div className="absolute w-full flex flex-row-reverse pt-[1px] pr-[4px]">
                    {!disabled && (
                      <div
                        className="w-[15px] h-[15px] m-1 cursor-pointer"
                        onClick={async () => {
                          await onChange(null);
                          field.onChange(null);
                        }}
                      >
                        <WindowCloseIcon className="w-full h-full" />
                      </div>
                    )}
                  </div>
                  {isImage ? (
                    <picture className="w-full">
                      <img
                        src={String(fileData)}
                        alt=""
                        className={`w-full aspect-[16/9] object-fill rounded-md ${
                          invalidImage
                            ? 'border-dashed border-selection border-2'
                            : ''
                        }`}
                      />
                    </picture>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center  rounded-md">
                      <CircleSuccessIcon className="h-12 w-12" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="file-dummy aspect-[16/9] flex items-center justify-center rounded-md">
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
          </div>
        );
      }}
    />
  );
};
export default FormFileUpload;
