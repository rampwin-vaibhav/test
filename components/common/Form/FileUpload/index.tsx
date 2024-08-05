import { RefObject, useCallback, useRef } from 'react';
import { ListingImageArtifact } from '../../../../types/models';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

type FileUploadChildProps<T> = {
  fileData?: string | null;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
  error?: FieldError;
  handleFileUpload: () => void;
  handleRemoveFile: () => void;
};

type PropsWithChildren<P, T extends FieldValues> = {
  /**
   * This is the name property for form data.
   */
  name: Path<T>;
  /**
   * Object of `react-hook-form` Control, to manage form state and validation.
   */
  control: Control<T, any>;
  /**
   * This property is use to specify custom filter options for file types.
   */
  accept?: string;
  /**
   * This property is use to disabled the user input.
   */
  disabled?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  onChange: (
    status: 'UPLOADED' | 'REMOVED',
    files: FileList | null
  ) => Promise<string | null>;
  children?: (obj: FileUploadChildProps<P>) => React.ReactNode;
};

const openFileDialog = (inputRef: RefObject<HTMLInputElement>): void => {
  if (inputRef.current) inputRef.current.click();
};

const FileUpload = <T extends FieldValues>(
  props: PropsWithChildren<ListingImageArtifact, T>
): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const removeButtonRef = useRef<HTMLButtonElement>(null);

  const handleFileUpload = useCallback((): void => {
    if (inputRef.current) inputRef.current.click();
  }, [inputRef]);

  const onInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<string | null> => {
    const response = await handleChange('UPLOADED', e.target.files);
    if (inputRef.current) inputRef.current.value = '';
    return response;
  };

  const handleChange = async (
    status: 'UPLOADED' | 'REMOVED',
    files: FileList | null
  ) => {
    return await props.onChange?.(status, files);
  };

  const handleDeleteClickButton = useCallback(() => {
    if (removeButtonRef.current) removeButtonRef.current.click();
  }, [removeButtonRef]);

  const handleRemoveFile = useCallback((): void => {
    handleDeleteClickButton();
  }, [handleDeleteClickButton]);

  if (!props.children || typeof props.children !== 'function') {
    return <></>;
  } else {
    return (
      <>
        <Controller
          name={props.name}
          defaultValue={props.defaultValue!}
          control={props.control}
          render={({
            field,
            fieldState: { isDirty, error },
            formState: { isSubmitted, isValid },
          }) => {
            const fileData: string | null | undefined = props.defaultValue!
              ? props.defaultValue!
              : '';
            return (
              <>
                <input
                  type="file"
                  accept="*"
                  ref={inputRef}
                  multiple={false}
                  onChange={async (e) => {
                    const data = await onInputChange(e);
                    field.onChange(data);
                  }}
                  style={{ display: 'none' }}
                  disabled={props.disabled || fileData ? true : false}
                />
                <button
                  type="button"
                  ref={removeButtonRef}
                  style={{ display: 'none' }}
                  onClick={async () => {
                    const data = await handleChange('REMOVED', null);
                    field.onChange(data);
                  }}
                  disabled={!fileData ? true : false}
                />
                {props.children &&
                  props.children({
                    fileData,
                    handleFileUpload,
                    handleRemoveFile,
                    isDirty,
                    isValid,
                    isSubmitted,
                    error,
                  })}
              </>
            );
          }}
        />
      </>
    );
  }
};

export default FileUpload;
