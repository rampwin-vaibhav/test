import { useTranslation } from 'next-i18next';
import { FC, SetStateAction, useState } from 'react';
import * as yup from 'yup';
import { LabelConstants } from '../../types/i18n.labels';
import { DetailsForm } from './DetailsForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../common/Form';
import { VehicleService } from '../../helpers/services';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import { useRouter } from 'next/router';
import {
  PackageResponse,
  VehicleListingData,
  VinNumberData,
} from '../../types/models';
import { Locales, VehicleListingWorkflowNumber } from '../../types/enums';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../common/Modal';
import {
  StatusIDsAllowedForUpgrade,
  VinNumberLength,
} from '../../types/constants';

interface IFormInput {
  vinNumber: string;
}
type VehicleDetailsProps = {
  listingId: number | null;
  setListingId: (value: SetStateAction<number | null>) => void;
  listingData: VehicleListingData | null;
  setIsDirty: (value: SetStateAction<boolean>) => void;
  packageName: string | undefined;
  p_id: string;
  order_id: string;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  setIsTabValid: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
  setVehicleDetails: (value: SetStateAction<Array<VinNumberData>>) => void;
  vehicleDetails: Array<VinNumberData>;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  packageId: string | string[] | number | undefined;
  orderId: string | string[] | number | undefined;
};

export const VehicleDetails: FC<VehicleDetailsProps> = ({
  listingId,
  setListingId,
  listingData,
  setIsDirty,
  packageName,
  p_id,
  order_id,
  setOpenSignInModal,
  setIsTabValid,
  packageDetails,
  setVehicleDetails,
  vehicleDetails,
  setIsLoading,
  packageId,
  orderId,
}) => {
  const [dataForm, showDataForm] = useState(false);
  const [isVin, setIsVin] = useState(false);
  const [showVin, setShowVin] = useState(false);
  const [vin, setVin] = useState<string | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const schema = yup
    .object({
      vinNumber: yup
        .string()
        .required(LabelConstants.REQUIRED_FIELD)
        .test(
          'max-digit',
          t(LabelConstants.VIN_NUMBER_VALIDATION, {
            value: VinNumberLength,
          }),
          (vin) => vin?.length === VinNumberLength
        ),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const showVinBox = () => {
    setIsVin(true);
    showDataForm(false);
  };

  const clearVinData = () => {
    setIsVin(false);
    showDataForm(true);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    setVin(data.vinNumber);
    const vehicleDetails = await VehicleService.fetchVehicleDetailsByVinNumber(
      data.vinNumber
    );
    if (vehicleDetails.length === 0) {
      // const result = await MessageBox.open({
      //   content: (
      //     <div className="flex flex-col gap-6">
      //       {/* {t(LabelConstants.NO_VIN_DETAILS)} */}
      //       <p className="text-large font-semibold">
      //         {t(LabelConstants.VIN_NUMBER_FAILURE)}
      //       </p>
      //       <p className="text-large">
      //         {t(LabelConstants.VIN_NUMBER_CONFIRMATION)}
      //       </p>
      //     </div>
      //   ),
      //   type: MessageBoxType.Confirmation,
      // });
      // if (result === MessageBoxResult.OK) {
      //   clearVinData();
      // }
      setVehicleDetails([]);
      setShowVin(true);
    } else {
      setVehicleDetails(vehicleDetails);
      setIsVin(false);
      showDataForm(true);
    }
  };

  return (
    <div className="container lg:!px-52">
      {/* {packageDetails?.DisplayName && (
        <div className="flex items-center justify-between">
          <div className="text-gradient text-2xl font-bold">
            {router.locale === Locales.EN
              ? `${packageDetails?.DisplayName} ${t(LabelConstants.PACKAGE)}`
              : `${t(LabelConstants.PACKAGE)} ${packageDetails?.DisplayName}`}
          </div>
          {(listingId
            ? listingData?.Overview.IsEligibleForUpgrade &&
              listingData?.Overview.VehicleListingStatusID &&
              StatusIDsAllowedForUpgrade.includes(
                listingData?.Overview.VehicleListingStatusID
              )
            : packageDetails.IsSelfListedPackage) && (
            <button
              type="button"
              className="bg-gradient rounded-[0.375rem] text-xl h-[3.125rem] w-[15rem] uppercase"
              onClick={() =>
                router.push(
                  `/select-package?CurrentPackageId=${packageId}&IsUpgradePackage=true&OrderItemId=${orderId}`
                )
              }
            >
              {t(LabelConstants.UPGRADE_PACKAGE)}
            </button>
          )}
        </div>
      )} */}

      <DetailsForm
        vin={vin!}
        vehicleDetails={vehicleDetails}
        listingId={listingId}
        setListingId={setListingId}
        listingData={listingData}
        setIsDirty={setIsDirty}
        p_id={p_id}
        order_id={order_id}
        setOpenSignInModal={setOpenSignInModal}
        setIsTabValid={setIsTabValid}
        setIsVin={setIsVin}
        setIsLoading={setIsLoading}
        packageDetails={packageDetails}
      />

      <Modal
        show={showVin}
        onClose={() => setShowVin(false)}
        containerClassName="max-w-[45rem]"
      >
        <>
          <ModalBody>
            <div className="flex flex-col gap-6 mt-6">
              <p className="text-large text-center font-semibold leading-7">
                {t(LabelConstants.VIN_NUMBER_FAILURE)}
              </p>
              <p className="text-large text-center leading-7">
                {t(LabelConstants.VIN_NUMBER_CONFIRMATION)}
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-center gap-3">
              <button
                className="btn btn-secondary btn-modal px-5 text-center"
                onClick={() => setShowVin(false)}
              >
                {t(LabelConstants.CANCEL)}
              </button>
              <button
                className="btn btn-primary btn-modal px-5 text-center"
                onClick={() => {
                  clearVinData();
                  setShowVin(false);
                }}
              >
                {t(LabelConstants.CONTINUE)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>
    </div>
  );
};

export default VehicleDetails;
