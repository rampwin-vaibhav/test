import { FieldError } from 'react-hook-form';
import { DeleteCartIcon, UploadFileIcon, WarningIcon } from '../icons';
import {
  ListingImageArtifact,
  UploadImagePayload,
  VehicleListingData,
} from '../../types/models';
import { VehicleService } from '../../helpers/services';
import { CommonUtils } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import { VehicleRequiredDocs } from '../../types/constants';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { SetStateAction, useState } from 'react';
import DocumentPreview from '../common/DocumentPreview';

type DocPreviewProps = {
  fileData?: string | null;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
  error?: FieldError;
  handleFileUpload: () => void;
  handleRemoveFile: () => void;
  disabled: boolean;
  artifact: ListingImageArtifact;
  hideCheckBox: boolean;
  hasUploadChoice: boolean;
  listingId: number | null;
  listingData: VehicleListingData | null;
  uploadDocument: (
    data: UploadImagePayload,
    id: number
  ) => Promise<string | undefined>;
  removeImage: (id: number, vehicleArtifactId: number) => Promise<void>;
  setSelectedInsuranceType: (value: SetStateAction<string>) => void;
  selectedInsuranceType: string;
  documentData: {
    hasMultipleChoice: boolean;
    artifacts: Array<ListingImageArtifact>;
  };
  allowEdit: boolean;
};

const DocPreview = ({
  handleFileUpload,
  handleRemoveFile,
  fileData,
  disabled,
  artifact,
  hideCheckBox,
  hasUploadChoice,
  listingId,
  listingData,
  uploadDocument,
  removeImage,
  setSelectedInsuranceType,
  selectedInsuranceType,
  documentData,
  allowEdit,
}: DocPreviewProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [showDocumentPreview, setShowDocumentPreview] =
    useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewArtifact, setPreviewArtifact] =
    useState<ListingImageArtifact>();
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
    <div className="flex flex-col gap-4">
      {hasUploadChoice && (
        <div className="flex gap-3">
          {documentData.artifacts.map((x, i) => (
            <div className="flex gap-1 justify-between items-center" key={i}>
              <input
                type="radio"
                name="insurance"
                value={x.ArtifactTypeKey}
                onChange={(e) => setSelectedInsuranceType(e.target.value)}
                disabled={artifact.ArtifactUrlPath || disabled ? true : false}
                checked={selectedInsuranceType === x.ArtifactTypeKey}
              />
              <p className="text-sm text-dark-gray1">{x.ArtifactType}</p>
            </div>
          ))}
        </div>
      )}
      <div
        className={`border rounded cursor-pointer w-full ${
          fileData && (artifact.IsQCApproved === null || artifact.IsQCApproved)
            ? 'border-primary'
            : artifact.IsQCApproved !== null &&
              !artifact.IsQCApproved &&
              !allowEdit
            ? '!border-error'
            : 'border-light-gray'
        }`}
      >
        {fileData ? (
          <div className="h-16 w-full">
            <div className="flex justify-between w-full h-full items-center px-3">
              <div
                onClick={() => handleFileDownload()}
                className={`cursor-pointer w-[70%] text-start text-lg ${
                  (fileData &&
                    (artifact.IsQCApproved === null ||
                      artifact.IsQCApproved)) ||
                  allowEdit
                    ? 'text-primary'
                    : 'text-error'
                }`}
              >
                {artifact.ArtifactUrl}
              </div>
              {!disabled && (
                <div className="w-[30%] flex flex-row-reverse pt-[1px] pr-[4px]">
                  <div
                    className="w-[15px] h-[15px] m-1 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <DeleteCartIcon className="w-full h-full" />
                  </div>
                </div>
              )}
            </div>
            {artifact.QCComments && !allowEdit && (
              <div className="flex flex-wrap items-center justify-center pt-1">
                <div className="flex flex-wrap items-center justify-center w-44">
                  <WarningIcon className="h-3 w-3" />
                  <p
                    className="pl-1 text-error whitespace-nowrap overflow-hidden text-ellipsis"
                    title={artifact.QCComments}
                  >
                    {artifact.QCComments}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="file-dummy  h-16 flex items-center justify-center rounded-md">
            <div className="flex gap-3 items-center w-full h-full px-3">
              <div className="ml-[0.125rem]">
                {artifact.ArtifactUrlPath === null &&
                  !hideCheckBox &&
                  !hasUploadChoice && (
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={artifact.VehicleListingArtifactId ? true : false}
                      onChange={async (e) => {
                        if (e.target.checked) {
                          const data = {
                            VehicleListingId: listingId,
                            ArtifactTypeId: artifact.ArtifactTypeId,
                            FileName: null,
                            FileData: null,
                            LanguageId: CommonUtils.getLanguageId(
                              router.locale!
                            ),
                            IsDocumentAvailable: true,
                          };
                          setIsUploading(true);
                          await uploadDocument(data, artifact.ArtifactTypeId);
                          setIsUploading(false);
                        } else {
                          setIsUploading(true);
                          await removeImage(
                            artifact.ArtifactTypeId,
                            artifact.VehicleListingArtifactId
                          );
                          setIsUploading(false);
                        }
                      }}
                      disabled={disabled || isUploading}
                    />
                  )}
              </div>
              <div
                className="flex justify-between w-full items-center"
                onClick={() => {
                  !disabled && handleFileUpload();
                }}
              >
                <div className="text-lg text-start">
                  {artifact.ArtifactType}
                  {artifact.ArtifactTypeKey === VehicleRequiredDocs[1] ? (
                    listingData?.Overview.OutstandingFinance ? (
                      <span title={t(LabelConstants.REQUIRED_FIELD)}>*</span>
                    ) : null
                  ) : (
                    VehicleRequiredDocs.includes(artifact.ArtifactTypeKey) && (
                      <span title={t(LabelConstants.REQUIRED_FIELD)}>*</span>
                    )
                  )}
                </div>

                <div className="image-upload-icon">
                  <UploadFileIcon className="h-6 w-6 cursor-pointer" />
                </div>
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
          documentName={
            previewArtifact.Description
              ? previewArtifact.Description!
              : previewArtifact.ArtifactUrl!
          }
        />
      )}
    </div>
  );
};

export default DocPreview;
