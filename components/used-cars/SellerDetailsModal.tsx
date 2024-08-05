import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, ModalBody, ModalSize } from '../common/Modal';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import {
  BuyerTestDriveDatesResponse,
  SellerTestDriveDatesResponse,
  VehicleSeller,
} from '../../types/models';
import { VehicleService } from '../../helpers/services';
import FormCalendar from '../common/Form/FormCalendar';
import { FormInput, FormPhoneInputV1, FormRadio } from '../common/Form';
import { LabelConstants } from '../../types/i18n.labels';
import { DateObject } from 'react-multi-date-picker';
import moment, { min } from 'moment';
import MessageBox, { MessageBoxResult } from '../common/MessageBox';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import { GTMEvents } from '../../types/gtm';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import { apiDateFormat } from '../../types/constants';

interface IFormInput {
  dates: Array<string>;
  sellerName: string;
  mobile: string;
  isChoiceByBuyer: 'Seller' | 'Buyer';
}

//const schema = yup
// .object({
//   dates: yup
//     .array()
//     .nullable()
//     .min(1, LabelConstants.REQUIRED_TEST_DRIVE_DATES),
// })
// .required();

type SellerDetailsModalProps = {
  show: boolean;
  listingId: string | number;
  onClose: () => void;
};

/**
 * This modal component open a window with vehicle seller details and provide options to select test drive dates.
 * @returns JSX.Element
 */
const SellerDetailsModal = ({
  show,
  listingId,
  onClose,
}: SellerDetailsModalProps) => {
  const { t } = useTranslation();

  const currenDate = moment().format(apiDateFormat);
  const [data, setData] = useState<{
    seller: VehicleSeller;
    buyerTestDriveDates: Array<BuyerTestDriveDatesResponse>;
    sellerTestDriveDates: Array<SellerTestDriveDatesResponse>;
  }>();
  const [chooseTestDriveDates, setChooseTestDriveDates] =
    useState<boolean>(false);
  const [isTestDriveBooked, setIsTestDriveBooked] = useState<boolean>(false);
  const [hasSellerDates, setHasSellerDates] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<'Seller' | 'Buyer'>();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    resetField,
    formState,
  } = useForm<IFormInput>({
    //resolver: yupResolver(schema),
  });
  const { isChoiceByBuyer, dates } = watch();

  /**
   * This effect will execute to load initial data for available test drive dates.
   */
  useEffect(() => {
    const init = async () => {
      const [sellerDetails, buyerTestDriveDates, sellerTestDriveDates] =
        await Promise.all([
          VehicleService.fetchSellerDetails(listingId),
          VehicleService.fetchBuyerTestDriveDates(listingId),
          VehicleService.fetchSellerTestDriveDates(listingId),
        ]);
      const user = SessionUtils.getUserDetails();

      //Added GTM event for View Seller Details Click
      PushDataToGTM(GTMEvents.ViewedSellerDetails, {
        dealerId:
          process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + sellerDetails?.DealerId,
        sellerId:
          process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + sellerDetails?.UserId,
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
        vehicleListingId:
          process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + listingId,
      });

      //Added GTM event for View Seller Details Click GA
      PushDataToGTM(GTMEvents.ViewedSellerDetailsGA, {
        dealerId:
          process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + sellerDetails?.DealerId,
        sellerId:
          process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + sellerDetails?.UserId,
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
        vehicleListingId:
          process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + listingId,
      });

      const sellerName: string =
        sellerDetails?.DealerId > 0 && !sellerDetails?.IsSellerContact
          ? sellerDetails?.DealerName
            ? sellerDetails?.DealerName
            : ''
          : `${sellerDetails?.FirstName ? sellerDetails?.FirstName : ''} ${
              sellerDetails?.LastName ? sellerDetails?.LastName : ''
            }`.trim();
      const mobile: string = sellerDetails?.MobileNumber;
      let preferredTestDriveDates: Array<string> = [];
      let calendar: 'Seller' | 'Buyer';

      if (buyerTestDriveDates && buyerTestDriveDates.length > 0) {
        preferredTestDriveDates = buyerTestDriveDates.map(
          (x) => x.PreferredDate
        );
        calendar = buyerTestDriveDates[0].IsChoiceByBuyer ? 'Buyer' : 'Seller';
        setIsTestDriveBooked(true);
        setChooseTestDriveDates(true);
        setShowCalendar(calendar);
      }

      // set form data
      setValue('sellerName', sellerName ? sellerName : '**** ****');
      setValue('mobile', mobile);
      setValue('isChoiceByBuyer', calendar!);
      setValue('dates', preferredTestDriveDates);

      // set modal data
      setData({
        seller: sellerDetails,
        buyerTestDriveDates: buyerTestDriveDates || [],
        sellerTestDriveDates: sellerTestDriveDates || [],
      });

      // Checking Test Drive dates are available or not
      setHasSellerDates(
        (sellerTestDriveDates || []).some((date) => date.ToDate >= currenDate)
      );
    };

    if (show) {
      init();
    } else {
      setData(undefined);
      setChooseTestDriveDates(false);
      reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, listingId]);

  useEffect(() => {
    const handleDateChange = async () => {
      if (!isTestDriveBooked && dates && dates.length > 0) {
        resetField('dates');
      }
      setShowCalendar(isChoiceByBuyer);
    };
    handleDateChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChoiceByBuyer]);

  /**
   * This function will execute at the time of form submit event.
   */
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    // if (data.dates && data.dates.length > 5) {
    //   await MessageBox.open({
    //     content: `${t(LabelConstants.MAXIMUM_5_DATES)}`,
    //   });
    // } else {
    //   const result = await VehicleService.saveBuyerTestDriveDates({
    //     vehicleListingId: listingId,
    //     IsChoiceByBuyer: data.isChoiceByBuyer === 'Buyer',
    //     PreferredDates: data.dates,
    //   });
    //   if (result) {
    //     await MessageBox.open({
    //       content: `${t(LabelConstants.THANKS_FOR_TEST_DRIVE_SELECTION)}`,
    //     });
    //   } else {
    //     await MessageBox.open({
    //       content: `${t(LabelConstants.VEHICLE_ALREADY_SOLD_DELISTED)}`,
    //     });
    //   }
    onClose();
    // }
  };

  useEffect(() => {
    moment.locale('en');
  }, [router.locale]);

  /**
   * This function is use to map dates on calendar control as per seller choice or 60 days from current date.
   */
  const mapDays = ({
    date,
  }: {
    date: DateObject;
    selectedDate: DateObject | DateObject[];
    currentMonth: object;
    isSameDate(arg1: DateObject, arg2: DateObject): boolean;
  }) => {
    if (data && isChoiceByBuyer === 'Seller') {
      const dateStr = date.format(apiDateFormat);
      const { sellerTestDriveDates } = data;
      const isValidDate = sellerTestDriveDates.some(
        (date) =>
          date.ToDate >= dateStr &&
          date.FromDate <= dateStr &&
          currenDate <= dateStr
      );
      return isValidDate
        ? { className: 'rmdp-days rmdp-selected-seller text-xs' }
        : { disabled: true };
    } else if (data && isChoiceByBuyer === 'Buyer') {
      const toDate = moment().add(60, 'days').format(apiDateFormat);
      const dateStr = date.format(apiDateFormat);

      const isValidDate = toDate >= dateStr && currenDate <= dateStr;
      return isValidDate
        ? { className: 'rmdp-days rmdp-selected-seller text-xs' }
        : { disabled: true };
    }

    return { disabled: true };
  };

  const handleChooseTestDriveDates = async () => {
    let modalResponse = null;
    if (!hasSellerDates) {
      modalResponse = await MessageBox.open({
        content: `${t(LabelConstants.SELLER_DATES_ARE_NOT_AVAILABLE)}`,
      });

      setValue('isChoiceByBuyer', 'Buyer');
    } else {
      setValue('isChoiceByBuyer', 'Seller');
    }
    if (modalResponse === MessageBoxResult.Nope) {
      onClose();
    } else {
      setChooseTestDriveDates(true);
    }
  };

  return data && data.seller ? (
    <Modal
      backdrop="static"
      show={show}
      onClose={onClose}
      size={ModalSize.LARGE}
    >
      <ModalBody>
        <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <FormInput
                  control={control}
                  name="sellerName"
                  label={t(LabelConstants.SELLER_NAME)}
                  disabled
                />
              </div>
              <div>
                <FormPhoneInputV1
                  control={control}
                  name="mobile"
                  label={t(LabelConstants.CONTACT_NUMBER)}
                  disabled
                />
              </div>
            </div>
            {/* <hr />
            <div className="flex flex-col gap-2">
              <label>{t(LabelConstants.SELECT_DRIVE_DATE_CONFIRMATION)}</label>
              <div className="flex gap-2">
                <button
                  className="btn btn-primary btn-sm btn-auto uppercase"
                  type="button"
                  onClick={() => handleChooseTestDriveDates()}
                  disabled={isTestDriveBooked}
                >
                  {t(LabelConstants.YES)}
                </button>
                <button
                  className="btn btn-secondary btn-sm btn-auto uppercase"
                  type="button"
                  onClick={onClose}
                  disabled={isTestDriveBooked}
                >
                  {t(LabelConstants.NO)}
                </button>
              </div>
            </div> */}
            {/* {chooseTestDriveDates && ( */}
            <>
              {/* <hr /> */}
              <div className="flex flex-col gap-3">
                {/* <div>
                    <FormRadio
                      control={control}
                      name="isChoiceByBuyer"
                      value="Seller"
                      label={`${t(
                        LabelConstants.PREFERRED_TEST_DRIVE_DATE_OF_SELLER
                      )}`}
                      disabled={isTestDriveBooked || !hasSellerDates}
                    />
                    {showCalendar === 'Seller' && (
                      <div className="flex flex-col gap-3">
                        <FormCalendar
                          control={control}
                          name="dates"
                          mapDays={mapDays}
                          disabled={isTestDriveBooked}
                        />
                        {!isTestDriveBooked && (
                          <label>{t(LabelConstants.SELECT_DATE_MSG)}</label>
                        )}
                      </div>
                    )}
                  </div> */}
                {/* <div>
                    <FormRadio
                      control={control}
                      name="isChoiceByBuyer"
                      value="Buyer"
                      label={`${t(
                        LabelConstants.PREFERRED_DATE_OF_TEST_DRIVE
                      )}`}
                      disabled={isTestDriveBooked}
                    />
                    {showCalendar === 'Buyer' && (
                      <div className="flex flex-col gap-3">
                        <FormCalendar
                          control={control}
                          name="dates"
                          mapDays={mapDays}
                          disabled={isTestDriveBooked}
                        />
                        {!isTestDriveBooked && (
                          <label>{t(LabelConstants.SELECT_DATE_MSG)}</label>
                        )}
                      </div>
                    )}
                  </div> */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    //disabled={!!formState.errors.dates || isTestDriveBooked}
                  >
                    {t(LabelConstants.OK)}
                  </button>
                </div>
              </div>
            </>
            {/* )} */}
          </div>
        </form>
      </ModalBody>
    </Modal>
  ) : (
    <></>
  );
};

export default SellerDetailsModal;
