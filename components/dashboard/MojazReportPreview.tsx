import { CircleSuccessIcon, UploadIcon } from '../icons';

type MojazPreviewProps = {
  fileData?: string | null;
  handleFileUpload: () => void;
};

const MojazReportPreview = ({fileData, handleFileUpload}: MojazPreviewProps) => {
  return (
    <div className="form-group file-area">
      {fileData ? (
        <div className="file-preview !border-none aspect-[16/9] w-full">
          <div className="w-full h-full flex items-center justify-center  rounded-md">
            <CircleSuccessIcon className="h-12 w-12" />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleFileUpload}
          className="file-dummy aspect-[16/9] flex items-center justify-center rounded-md"
        >
          <div className="flex flex-col justify-between items-center w-full text-xs text-gray-600">
            <div className="image-upload-icon">
              <UploadIcon className="h-6 w-6 cursor-pointer" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default MojazReportPreview;
