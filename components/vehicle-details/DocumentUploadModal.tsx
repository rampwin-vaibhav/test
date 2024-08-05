import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { VehicleService } from '../../helpers/services';
import { LabelConstants } from '../../types/i18n.labels';
import { BuyerDocumentResponse } from '../../types/models';
import { FormFileUpload } from '../common/Form';
import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';

type DocumentUploadModalProps = {
  show: boolean;
  listingId: number;
  hide: Function;
};

const DocumentUploadModal = ({
  show,
  listingId,
  hide,
}: DocumentUploadModalProps) => {
  const [buyerDocument, setBuyerDocument] = useState<
    Array<BuyerDocumentResponse>
  >([]);
  const { t } = useTranslation();
  const router = useRouter();
  const { control } = useForm();

  useEffect(() => {
    const init = async () => {
      if (SessionUtils.isValidSession()) {
        const imageData = await VehicleService.getBuyerDocuments(
          listingId,
          router.locale
        );
        setBuyerDocument(imageData);
      }
    };
    init();
  }, [router.locale, listingId]);

  const handleDocumentUpload = async (e: File, id: number) => {
    const imageName = e.name;
    const mediaType = e && e.type.toLowerCase();
    const allowedImageSize = 51208 * 100;
    const imageBase = await CommonUtils.convertBase64(e);
    if (e.size > allowedImageSize) {
      toast.warning(t(LabelConstants.FILE_SIZE_EXCEEDS_5_MB));
    } else if (
      mediaType !== 'image/jpeg' &&
      mediaType !== 'image/png' &&
      mediaType !== 'image/jpg' &&
      mediaType !== 'application/pdf'
    ) {
      toast.warning(t(LabelConstants.IMAGE_SELECTION_FORMAT));
    } else {
      const data = {
        VehicleListingId: listingId,
        ArtifactTypeId: id,
        FileName: imageName,
        FileData: imageBase,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
      };
      const res = await VehicleService.uploadImage(data);

      if (res) {
        const imageData = await VehicleService.getBuyerDocuments(
          listingId,
          router.locale
        );
        setBuyerDocument(imageData);
        const imageObject = imageData.find((x) => {
          if (x.ArtifactTypeId === id) {
            return x;
          }
        });
        return await imageObject?.ArtifactUrl;
      }
    }
  };

  const removeDocument = async (id: number, vehicleArtifactId: number) => {
    const data = {
      VehicleListingArtifactId: vehicleArtifactId,
      VehicleListingId: listingId,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      ArtifactTypeId: id,
    };
    const res = await VehicleService.deleteImage(data);
    if (res) {
      const imageData = await VehicleService.getBuyerDocuments(
        listingId,
        router.locale
      );
    } else {
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
    }
  };

  return (
    <Modal backdrop="static" show={show} onClose={() => hide(false)}>
      <ModalBody>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-2 w-full">
            {buyerDocument.map((x) => (
              <div key={x.ArtifactTypeId} className="w-full">
                <FormFileUpload
                  control={control}
                  name={x.ArtifactTypeKey}
                  defaultValue={x.ArtifactUrl}
                  accept=".pdf"
                  isImage={false}
                  onChange={async (e) => {
                    let url: string | undefined = '';
                    if (e) {
                      url = await handleDocumentUpload(e, x.ArtifactTypeId);
                    } else {
                      await removeDocument(
                        x.ArtifactTypeId,
                        x.VehicleListingArtifactId
                      );
                    }
                    return url ? url : '';
                  }}
                />
                <label className="flex justify-center w-full text-center">
                  {x.ArtifactType}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <p className="mt-20 tracking-wide text-center text-sm">
              {t(LabelConstants.JPEG_PNG_JPG_PDF_FILES_ALLOWED)}
            </p>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DocumentUploadModal;
