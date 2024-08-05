import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  FormFileUpload,
  FormInput,
  FormPhoneInputV1,
  IsPhoneNumberValidNotRequired,
} from '../common/Form';
import { VehicleService } from '../../helpers/services';
import { useRouter } from 'next/router';
import { Buyer, SellerDocumentArtifactType } from '../../types/models';
import { LabelConstants } from '../../types/i18n.labels';
import MessageBox from '../common/MessageBox';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../helpers/utilities';
import { Locales } from '../../types/enums';

type MarkAsSoldVehicleModalProps = {
  show: boolean;
  listingId: number;
  onClose: (isDeleted: boolean) => void;
};

type IFormInput = {
  askingPrice: number;
  mobileNumber: string;
  buyer: Buyer | undefined;
} & { [x: string]: string };

const schema = yup
  .object({
    askingPrice: yup.number().typeError(LabelConstants.ERR_MSG_NUMBER),
    mobileNumber: yup
      .string()
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValidNotRequired(number)
      ),
    buyer: yup.object().nullable(),
  })
  .required();

/**
 * This modal component open a window with vehicle deletion form.
 * @returns JSX.Element
 */
const MarkAsSoldVehicleModal = ({
  show,
  listingId,
  onClose,
}: MarkAsSoldVehicleModalProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { buyer, mobileNumber } = watch();
  const [artifactTypes, setArtifactTypes] = useState<
    Array<SellerDocumentArtifactType>
  >([]);
  const [showFileUploadForm, setFileUploadForm] = useState(false);
  const [fileData, setFileData] = useState<Array<{ file: File; id: number }>>(
    []
  );

  useEffect(() => {
    const init = async () => {
      // fetch list of seller document artifacts.
      const documentArtifacts =
        await VehicleService.fetchSellerDocumentArtifactTypes(router.locale);
      setArtifactTypes(documentArtifacts);
    };

    if (show) {
      // reset form data

      // NOTE: Hide Seller Document selection options
      // setFileUploadForm(true);
      setFileData([]);
      if (artifactTypes && artifactTypes.length > 0) {
        let artifacts: { [x: string]: string } = {};
        artifactTypes.forEach((x) => {
          (artifacts as any)[x.ArtifactTypeKey] = '';
        });
        reset(
          { mobileNumber: '', ...(artifacts as any) },
          { keepDefaultValues: true }
        );
      } else {
        reset({ mobileNumber: '' }, { keepDefaultValues: true });
      }

      // fetch artifact data
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, router.locale, reset]);

  useEffect(() => {
    if (mobileNumber) {
      trigger('mobileNumber');
    }
  }, [mobileNumber, trigger]);

  const handleSearch = async () => {
    const { mobileNumber } = getValues();
    if (mobileNumber && !(errors.mobileNumber && errors.mobileNumber.message)) {
      const searchResult = await VehicleService.userSearch(mobileNumber);
      if (searchResult && searchResult.IsSucess) {
        setValue('buyer', searchResult.Buyer!);
        trigger();
      } else if (searchResult && !searchResult.IsSucess) {
        setValue('buyer', undefined);
        if (
          searchResult.MessageCode ===
          LabelConstants.SELLVEHICLE_SELLER_TO_SELLER_SELL_NOTALLOWED
        ) {
          toast.warning(
            t(LabelConstants.SELLVEHICLE_SELLER_TO_SELLER_SELL_NOTALLOWED)
          );
        } else if (
          searchResult.MessageCode ===
          LabelConstants.SELLVEHICLE_SELLERBUYERSEARCH_BUYER_NOTFOUND
        ) {
          toast.warning(
            t(LabelConstants.SELLVEHICLE_SELLERBUYERSEARCH_BUYER_NOTFOUND)
          );
        }
      }
    } else {
      trigger('mobileNumber');
    }
  };

  /**
   * This method handles submit request for deletion request.
   */
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (data) {
      // upload images
      await Promise.all(
        Array(fileData.length)
          .fill('')
          .map((_, index: number) => {
            uploadDocument(fileData[index].file, fileData[index].id);
          })
      );

      // update mark as sold
      const response = await VehicleService.updateMarkAsSold({
        BuyerId: data.buyer?.UserId ? data.buyer?.UserId : null,
        VehicleListingId: listingId,
        SoldPrice: data.askingPrice
          ? data.askingPrice
          : data.askingPrice === 0
          ? 0
          : null,
      });
      if (response) {
        await MessageBox.open({
          content: t(LabelConstants.VEHICLE_SUCCESSFULLY_MARKED_AS_SOLD),
        });
        onClose(true);
      }
    }
  };

  const uploadDocument = async (e: File, id: number) => {
    const imageName = e.name;
    const imageBase = await CommonUtils.convertBase64(e);
    const data = {
      VehicleListingId: listingId,
      ArtifactTypeId: id,
      FileName: imageName,
      FileData: imageBase,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
    };
    await VehicleService.uploadImage(data);
  };

  const handleDocumentUpload = async (e: File, id: number) => {
    const mediaType = e && e.type.toLowerCase();
    const allowedImageSize = 51208 * 100;
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
      setFileData([...fileData, { file: e, id }]);
      return e.name;
    }
  };

  const deleteDocument = async (id: number) => {
    setFileData(fileData.filter((x) => x.id !== id));
    return null;
  };

  return (
    <Modal backdrop="static" show={show} onClose={() => onClose(false)}>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 p-2">
            {showFileUploadForm ? (
              <>
                <div className="font-bold text-xl text-gray-600">
                  {t(LabelConstants.DOCUMENT_SELLER)}
                </div>
                <div className="flex gap-2 w-full">
                  {artifactTypes.map((x) => (
                    <div key={x.ArtifactTypeId} className="w-full">
                      <FormFileUpload
                        control={control}
                        name={x.ArtifactTypeKey}
                        accept=".pdf"
                        isImage={false}
                        onChange={async (e) => {
                          let fileName: string | undefined = '';
                          if (e) {
                            fileName = await handleDocumentUpload(
                              e,
                              x.ArtifactTypeId
                            );
                          } else {
                            await deleteDocument(x.ArtifactTypeId);
                          }
                          return fileName ? fileName : '';
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
              </>
            ) : (
              <>
                <FormInput
                  control={control}
                  name="askingPrice"
                  label={t(LabelConstants.SOLD_PRICE)}
                  unitText={t(LabelConstants.SAR)}
                  isStartLabel={router.locale === Locales.EN ? true : false}
                  showUnit={true}
                />
                <div className="flex gap-2 items-center justify-between">
                  <FormPhoneInputV1
                    control={control}
                    name="mobileNumber"
                    label={t(LabelConstants.SOLD_TO)}
                  />
                  <button
                    onClick={handleSearch}
                    type="button"
                    className="pt-8 uppercase"
                  >
                    {t(LabelConstants.SEARCH)}
                  </button>
                </div>
                <div>
                  {buyer && (
                    <div>{`${buyer.FirstName} ${buyer.LastName} (${buyer.EmailAddress})`}</div>
                  )}
                  {errors.buyer && errors.buyer.message && (
                    <p className="error">{t(errors.buyer.message)}</p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="p-6 flex justify-center gap-2">
            <button
              type="button"
              className={`btn btn-secondary btn-modal uppercase ${
                showFileUploadForm ? 'visible' : 'hidden'
              }`}
              onClick={() => onClose(false)}
            >
              {t(LabelConstants.CANCEL)}
            </button>
            <button
              type="button"
              className={`btn btn-primary btn-modal uppercase ${
                showFileUploadForm ? 'visible' : 'hidden'
              }`}
              onClick={() => setFileUploadForm(false)}
            >
              {t(LabelConstants.NEXT)}
            </button>

            <button
              type="button"
              className={`btn btn-secondary btn-modal uppercase ${
                showFileUploadForm ? 'hidden' : 'visible'
              }`}
              // onClick={() => setFileUploadForm(true)}
              onClick={() => onClose(false)}
            >
              {t(LabelConstants.CANCEL)}
            </button>
            <button
              type="submit"
              className={`btn btn-primary btn-modal uppercase ${
                showFileUploadForm ? 'hidden' : 'visible'
              }`}
            >
              {t(LabelConstants.CONFIRM)}
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default MarkAsSoldVehicleModal;
