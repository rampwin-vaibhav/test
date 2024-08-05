import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { FileIcon, DownloadIcon } from '../icons';
import { LabelConstants } from '../../types/i18n.labels';
import { ListingImageArtifact, ProfileArtifact } from '../../types/models';
import DocumentPreview from '../common/DocumentPreview';
import { MimeTypes } from '../../types/constants';

type InformationProps = {
  vehicleBrochureData: Array<ListingImageArtifact | ProfileArtifact>;
};

const VehicleDocuments = ({ vehicleBrochureData }: InformationProps) => {
  const { t } = useTranslation();
  const [showDocumentPreview, setShowDocumentPreview] =
    useState<boolean>(false);
  const [previewArtifact, setPreviewArtifact] = useState<
    ListingImageArtifact | ProfileArtifact
  >();
  const [showDocumentPreviewInNewTab, setShowDocumentPreviewInNewTab] =
    useState<boolean>(false);

  const previewDocument = async (
    doc: ListingImageArtifact | ProfileArtifact
  ) => {
    if ([MimeTypes.ApplicationPDF].includes(doc?.MimeType!.toLowerCase())) {
      setShowDocumentPreviewInNewTab(true);
    } else {
      setShowDocumentPreview(true);
    }
    setPreviewArtifact(doc);
  };

  // const downloadDocument = (doc: ListingImageArtifact | ProfileArtifact) => {
  //   if (doc?.ArtifactUrlPath) {
  //     const a = document.createElement('a');
  //     a.href = doc?.ArtifactUrlPath;
  //     a.setAttribute(
  //       'download',
  //       (doc as ListingImageArtifact)?.Description || ''
  //     );
  //     a.click();
  //   }
  // };

  if (
    vehicleBrochureData &&
    (vehicleBrochureData?.length == 0 ||
      vehicleBrochureData.filter((x) => x.ArtifactUrl).length == 0)
  )
    return <></>;

  return (
    <>
      <h3 className="text-2xl mb-4">{t(LabelConstants.BROCHURES)}</h3>

      <div className="sm:w-[30rem]  grid grid-cols-2 gap-4 w-auto	">
        {vehicleBrochureData &&
          vehicleBrochureData?.length > 0 &&
          vehicleBrochureData?.map(
            (doc: ListingImageArtifact | ProfileArtifact, index: number) => {
              if (!doc.ArtifactUrl) {
                return <React.Fragment key={index}></React.Fragment>;
              } else {
                return (
                  <div
                    className="bg-red gap-5 bg-[#eee] h-32 cursor-pointer"
                    key={index}
                    onClick={() => {
                      previewDocument(doc);
                    }}
                  >
                    <div className="flex justify-center items-center mt-4">
                      <span className="cursor-pointer">
                        <FileIcon className="" />
                      </span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <span>
                        {doc?.ArtifactType
                          ? doc?.ArtifactType
                          : (doc as ListingImageArtifact)?.Description}
                      </span>
                      <span
                      // onClick={() => {
                      //   downloadDocument(doc);
                      // }}
                      >
                        <DownloadIcon className="w-5 h-5 cursor-pointer text-primary hover:text-selection" />
                      </span>
                    </div>
                  </div>
                );
              }
            }
          )}
      </div>
      {previewArtifact && (
        <DocumentPreview
          showPopUp={showDocumentPreview}
          closeModal={setShowDocumentPreview}
          documentUrl={previewArtifact.ArtifactUrlPath || ''}
          mimeType={previewArtifact.MimeType!}
          documentName={previewArtifact.ArtifactUrlPath!}
          showPreviewInNewTab={true}
          setShowDocumentPreviewInNewTab={setShowDocumentPreviewInNewTab}
          showDocumentPreviewInNewTab={showDocumentPreviewInNewTab}
        />
      )}
    </>
  );
};

export default VehicleDocuments;
