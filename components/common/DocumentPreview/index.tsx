import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ExternalService } from '../../../helpers/services';
import { CloseIcon, DownloadIcon } from '../../icons';
import { CommonUtils } from '../../../helpers/utilities';
import { MimeTypes } from '../../../types/constants';

type DocumentPreviewProps = {
  showPopUp: boolean;
  documentUrl: string;
  closeModal: Function;
  mimeType: string;
  documentName: string;
  showPreviewInNewTab?: boolean;
  setShowDocumentPreviewInNewTab?: (value: SetStateAction<boolean>) => void;
  showDocumentPreviewInNewTab?: boolean;
};
const DocumentPreview = ({
  showPopUp,
  documentUrl,
  closeModal,
  mimeType,
  documentName,
  showPreviewInNewTab = false,
  setShowDocumentPreviewInNewTab,
  showDocumentPreviewInNewTab = false,
}: DocumentPreviewProps) => {
  const [documentType, setDocumentType] = useState({
    isImage: false,
    isVideo: false,
    isDoc: false,
  });
  const [url, setUrl] = useState<any>(null);

  const downloadDocument = useCallback(
    (close = false) => {
      if (documentUrl) {
        const a = document.createElement('a');
        a.href = documentUrl;
        a.setAttribute('download', documentName);
        a.click();
      }
      if (close) {
        closeModal(false);
      }
    },
    [closeModal, documentName, documentUrl]
  );

  useEffect(() => {
    if (showPopUp) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return function () {
      document.body.style.overflow = 'unset';
    };
  }, [showPopUp]);

  useEffect(() => {
    const prepareData = async () => {
      const type = { isImage: false, isVideo: false, isDoc: false };
      if (
        [
          MimeTypes.ImageJPEG,
          MimeTypes.ImageJPG,
          MimeTypes.ImagePNG,
          MimeTypes.ImageBMP,
          MimeTypes.ImageWebP,
        ].includes(mimeType.toLowerCase())
      ) {
        setDocumentType({ ...type, isImage: true });
        setUrl(documentUrl);
      } else if ([MimeTypes.VideoMP4].includes(mimeType.toLowerCase())) {
        setDocumentType({ ...type, isVideo: true });
        setUrl(documentUrl);
      } else if ([MimeTypes.ApplicationPDF].includes(mimeType.toLowerCase())) {
        if (CommonUtils.isValidUrl(documentUrl)) {
          const blob: Blob = await ExternalService.getFileData(documentUrl!);
          const newBlob = new Blob([blob], { type: mimeType });
          const urlObject = URL.createObjectURL(newBlob);
          setUrl(urlObject);
        } else {
          setUrl(documentUrl);
        }
        setDocumentType({ ...type, isDoc: true });
      } else {
        downloadDocument(true);
      }
    };
    if (documentUrl && mimeType) {
      prepareData();
    }
  }, [mimeType, documentUrl, downloadDocument]);

  //this useEffect open the document preview in new tab
  useEffect(() => {
    if (
      showPreviewInNewTab &&
      [MimeTypes.ApplicationPDF].includes(mimeType.toLowerCase())
    ) {
      const formData = async () => {
        if (CommonUtils.isValidUrl(documentUrl)) {
          const blob: Blob = await ExternalService.getFileData(documentUrl!);
          const newBlob = new Blob([blob], { type: mimeType });
          const urlObject = URL.createObjectURL(newBlob);
          if (showDocumentPreviewInNewTab) {
            window.open(urlObject, '_blank');
            setShowDocumentPreviewInNewTab?.(false);
          }
        } else {
          setUrl(documentUrl);
        }
      };
      formData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDocumentPreviewInNewTab]);

  return (
    <>
      {showPopUp && (
        <div className="spin-car fixed z-30 top-0 left-0 h-full w-full bg-gray-800 bg-opacity-80">
          <div className="w-full h-full top-0 left-0 flex flex-col justify-center items-center">
            <div className="h-full w-full flex justify-center items-center opacity-100">
              <div className="max-w-[80%] max-h-[90%] w-full relative aspect-[16/9] flex flex-col-reverse lg:flex-row md:justify-center gap-5">
                {documentType.isImage && url && (
                  <div className="w-full">
                    <TransformWrapper>
                      <TransformComponent
                        wrapperClass="!w-full aspect-[16/9]"
                        contentClass="!w-full"
                      >
                        <picture className="w-full aspect-[16/9]">
                          <img
                            src={url}
                            alt="used-cars"
                            onError={(event: any) => {
                              event.target.src = '/images/default-car.jpg';
                              event.onerror = null;
                            }}
                            className="w-full vehicle !object-contain"
                          ></img>
                        </picture>
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                )}
                {documentType.isVideo && url && (
                  <div className="w-full">
                    <video className="w-full" controls>
                      <source src={url} type={mimeType} />
                      Your browser does not support HTML video.
                    </video>
                  </div>
                )}
                {documentType.isDoc && url && !showPreviewInNewTab && (
                  <iframe
                    className="w-full h-auto"
                    src={url}
                    title={documentName}
                  />
                )}
                <div className="flex flex-col gap-6">
                  <div
                    onClick={() => {
                      closeModal(false);
                    }}
                  >
                    <CloseIcon className="cursor-pointer w-10 h-10 text-white hover:bg-gray-500 p-2 bg-opacity-5" />
                  </div>
                  {!documentType.isDoc && (
                    <div
                      onClick={() => {
                        downloadDocument();
                      }}
                    >
                      <DownloadIcon className="cursor-pointer w-10 h-10 text-white hover:bg-gray-500 p-2 bg-opacity-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentPreview;
