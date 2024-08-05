import { FieldError } from 'react-hook-form';
import { PlusIcon, DeleteIcon } from '../icons';

type ImagePreviewProps = {
  fileData?: string | null;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
  error?: FieldError;
  handleFileUpload: () => void;
  handleRemoveFile: () => void;
  disabled: boolean;
  inValidImage: boolean;
  wireFrameUrl?: string;
};

const ImagePreview = ({
  handleFileUpload,
  handleRemoveFile,
  fileData,
  disabled,
  inValidImage,
  wireFrameUrl,
}: ImagePreviewProps) => {
  const getImageIcons = () => {
    return (
      <picture className="">
        <img
          src={wireFrameUrl}
          alt="img"
          className="aspect-[16/9] !object-fill"
        />
      </picture>
    );
  };
  return (
    <div className="form-group file-area">
      {fileData ? (
        <div className="file-preview !border-none aspect-[16/9] w-full">
          {!disabled && (
            <div className="absolute w-full flex flex-row-reverse pt-[1px] pr-[4px]">
              <div
                className="w-[15px] h-[15px] m-1 cursor-pointer"
                onClick={handleRemoveFile}
              >
                <DeleteIcon className="w-full h-full" />
              </div>
            </div>
          )}

          <picture className="w-full">
            <img
              src={String(fileData)}
              alt=""
              className={`w-full aspect-[16/9] object-fill rounded-md ${
                inValidImage ? 'border-dashed border-selection border-2' : ''
              }`}
            />
          </picture>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleFileUpload}
          className="file-dummy aspect-[16/9] flex items-center justify-center rounded-md"
          disabled={disabled}
        >
          <div className="flex flex-col px-4 justify-between items-center w-full text-xs text-gray-600">
            {wireFrameUrl ? (
              getImageIcons()
            ) : (
              <PlusIcon className="w-14 h-14" />
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default ImagePreview;
