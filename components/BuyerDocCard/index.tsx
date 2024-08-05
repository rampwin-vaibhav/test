import { useState } from 'react';
import { BuyerDocumentResponse } from '../../types/models';
import { DeleteCartIcon, UploadFileIcon } from '../icons';
import { VehicleService } from '../../helpers/services';
import { CommonUtils } from '../../helpers/utilities';
import DocumentPreview from '../common/DocumentPreview';

type DocCardProps = {
  handleFileUpload: () => void;
  handleRemoveFile: () => void;
  fileData?: string | null;
  artifact: BuyerDocumentResponse;
};

const BuyerDocCard = ({
  handleFileUpload,
  handleRemoveFile,
  fileData,
  artifact,
}: DocCardProps) => {
  const [showDocumentPreview, setShowDocumentPreview] =
    useState<boolean>(false);
  const [previewArtifact, setPreviewArtifact] =
    useState<BuyerDocumentResponse>();
  const [base64, setBase64] = useState<any>();

  const handleFileDownload = async () => {
    const blob = await VehicleService.downloadDocument(
      artifact.VehicleListingId,
      artifact.VehicleListingArtifactId!
    );
    const base64 = await CommonUtils.blobConvertBase64(blob, artifact.MimeType);
    setShowDocumentPreview(true);
    setPreviewArtifact(artifact);
    setBase64(base64);
  };

  return (
    <>
      <div
        className={`border rounded cursor-pointer w-full  ${
          fileData ? 'border-primary' : 'border-light-gray'
        }`}
      >
        {fileData ? (
          <div className="h-16 w-full">
            <div className="flex justify-between w-full h-full items-center px-3">
              <div
                className="cursor-pointer w-[70%] text-start text-lg text-primary"
                onClick={() => handleFileDownload()}
              >
                {artifact.ArtifactUrl}
              </div>
              <div className="w-[30%] flex flex-row-reverse pt-[1px] pr-[4px]">
                <div
                  className="w-[15px] h-[15px] m-1 cursor-pointer"
                  onClick={handleRemoveFile}
                >
                  <DeleteCartIcon className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="file-dummy h-16 flex items-center justify-center rounded-md"
            onClick={() => handleFileUpload()}
          >
            <div className="flex justify-between items-center w-full h-full px-3">
              <div className="flex gap-3 items-center">
                {artifact.ArtifactType}
              </div>
              <div className="image-upload-icon">
                <UploadFileIcon className="h-6 w-6 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
      {previewArtifact && (
        <DocumentPreview
          showPopUp={showDocumentPreview}
          closeModal={setShowDocumentPreview}
          documentUrl={base64 || ''}
          mimeType={previewArtifact.MimeType}
          documentName={previewArtifact.ArtifactUrl!}
        />
      )}
    </>
  );
};

export default BuyerDocCard;
