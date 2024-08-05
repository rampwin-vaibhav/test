import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { Modal, ModalBody } from '../common/Modal';
import FileUpload from '../common/Form/FileUpload';
import { CommonUtils } from '../../helpers/utilities';
import { VehicleService } from '../../helpers/services';
import { LabelConstants } from '../../types/i18n.labels';
import { UploadMojazPayload } from '../../types/models';
import MojazReportPreview from './MojazReportPreview';

type DocumentUploadModalProps = {
  show: boolean;
  hide: Function;
  listingId: number;
  loadVehicleData: () => Promise<void>;
};

type IFormInput = {
  [x: string]: string;
};

const UploadMojazModal = ({
  show,
  hide,
  listingId,
  loadVehicleData,
}: DocumentUploadModalProps) => {
  const { t } = useTranslation();
  const { control } = useForm<IFormInput>({});
  const [isUploaded, setIsUploaded] = useState<string>('');

  const handleMojazUpload = async (e: File) => {
    const imageName = e.name;
    const imageBase = await CommonUtils.convertBase64(e);
    const mediaType = e && e.type.toLowerCase();
    if (
      mediaType !== 'image/jpeg' &&
      mediaType !== 'image/png' &&
      mediaType !== 'image/jpg' &&
      mediaType !== 'application/pdf'
    ) {
      toast.warning(t(LabelConstants.IMAGE_SELECTION_FORMAT));
    } else {
      const data = {
        VehicleListingId: listingId,
        FileName: imageName,
        FileData: imageBase,
      };
      await uploadDocument(data);
      return isUploaded;
    }
  };

  const uploadDocument = async (data: UploadMojazPayload) => {
    try {
      const res = await VehicleService.uploadMojazDocument(data);
      if (res?.IsSuccess) {
        toast.success(t(LabelConstants.FILE_UPLOADED_SUCCESSFULLY));
        setIsUploaded('TRUE');
        hide(false);
        loadVehicleData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      backdrop="static"
      onClose={() => hide(false)}
      show={show}
      containerClassName="w-[30rem]"
    >
      <ModalBody>
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {t(LabelConstants.UPLOAD_MOJAZ_REPORT)}
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <FileUpload
              control={control}
              name="UploadMojazReport"
              disabled={false}
              defaultValue={isUploaded}
              onChange={async (status, files) => {
                let url: string | undefined = '';
                if (files && status === 'UPLOADED') {
                  url = await handleMojazUpload(files[0]);
                }
                return url ? url : '';
              }}
            >
              {(fileProps) => {
                return (
                  <div className="relative w-full">
                    <MojazReportPreview {...fileProps} />
                  </div>
                );
              }}
            </FileUpload>
          </div>
        </>
      </ModalBody>
    </Modal>
  );
};

export default UploadMojazModal;
