import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  FormCheckBox,
  FormInput,
  FormPhoneInputV1,
  FormRadio,
  FormTextarea,
} from '../common/Form';
import PrivatePageLayout from '../layout/PrivatePageLayout';
import { ProfileService, VehicleService } from '../../helpers/services';
import { LabelConstants } from '../../types/i18n.labels';
import {
  ConciergeFilterPayload,
  ConciergeParams,
  ConciergeRequest,
} from '../../types/models';
import MessageBox from '../common/MessageBox';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { ConciergeFrequency } from '../../types/enums';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { Modal, ModalBody, ModalFooter, ModalSize } from '../common/Modal';
import Link from 'next/link';

type summaryProps = {
  queryData: ConciergeParams;
  setIsSummaryPage: (value: SetStateAction<boolean>) => void;
  conciergeRequest: ConciergeRequest | undefined;
  conciergeID: number | null;
};

interface IFormInput {
  bodyType: string;
  budget: string;
  transmission: string;
  fuelType: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNumber: string;
  conciergeName: string;
  preferredCommunication: {
    isPreferredWhatsapp: boolean;
    isPreferredSms: boolean;
    isPreferredEmail: boolean;
  };
  communicationFrequency: string;
}
const schema = yup
  .object({
    // communicationFrequency: yup
    //   .string()
    //   .nullable()
    //   .required(LabelConstants.SELECT_ONE_COMMUNICATION_FREQUENCY),
    conciergeName: yup
      .string()
      .trim()
      .nullable()
      .required(LabelConstants.ENTER_CONCIERGE_NAME),
    // preferredCommunication: yup
    //   .object({
    //     isPreferredWhatsapp: yup.boolean(),
    //     isPreferredSms: yup.boolean(),
    //     isPreferredEmail: yup.boolean(),
    //   })
    //   .test('preferredCommunicationTest', 'null', (obj) => {
    //     if (
    //       obj.isPreferredWhatsapp ||
    //       obj.isPreferredSms ||
    //       obj.isPreferredEmail
    //     ) {
    //       return true;
    //     }
    //     return new yup.ValidationError(
    //       LabelConstants.SELECT_ATLEAST_ONE_MODE_OF_COMMUNICATION,
    //       null,
    //       'preferredCommunication'
    //     );
    //   }),
  })
  .required();

const WishListSummary: NextPage<summaryProps> = ({
  queryData,
  setIsSummaryPage,
  conciergeRequest,
  conciergeID,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const {
    control,
    trigger,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (queryData) {
      setValue(
        'bodyType',
        queryData.bodyType.map((x) => x.BodyType).join(', ')
      );
      setValue(
        'budget',
        `${queryData.budget && queryData.budget.min} - ${
          queryData.budget && queryData.budget.max
        }`
      );
      setValue(
        'transmission',
        queryData.transmission.map((x) => x.Transmission).join(', ')
      );
      setValue(
        'fuelType',
        queryData.fuelType.map((x) => x.FuelType).join(', ')
      );
    }
  }, [queryData, setValue]);

  useEffect(() => {
    const initialLoad = async () => {
      /* To fetch user data */
      const profile = await ProfileService.fetchUserData(router.locale);
      setValue('firstName', profile.FirstName);
      setValue('lastName', profile.LastName);
      setValue('emailId', profile.EmailAddress);
      setValue('mobileNumber', profile.MobileNumber);
    };
    initialLoad();
  }, [router, setValue]);

  useEffect(() => {
    if (conciergeRequest) {
      setValue(
        'preferredCommunication.isPreferredWhatsapp',
        conciergeRequest.IsWhatsApp
      );
      setValue('preferredCommunication.isPreferredSms', conciergeRequest.IsSMS);
      setValue(
        'preferredCommunication.isPreferredEmail',
        conciergeRequest.IsEmail
      );
      setValue(
        'communicationFrequency',
        conciergeRequest.ConciergeCommunicationFrequencyKey
      );
      setValue('conciergeName', conciergeRequest.Name);
    }
  }, [conciergeRequest, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const selectedData: ConciergeFilterPayload = {
      VehicleTypeId: [],
      BodyTypeId: queryData.bodyType.map((x) => x.BodyTypeId),
      AskingPriceRange: {
        MaxBudget: queryData && queryData.budget && queryData.budget.max,
        MinBudget: queryData && queryData.budget && queryData.budget.min,
      },
      TransmissionId: queryData.transmission.map((x) => x.TransmissionId),
      FuelTypeId: queryData.fuelType.map((x) => x.FuelTypeId),
    };

    const user = SessionUtils.getUserDetails();

    const payload = {
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      ConciergeRequestId: conciergeID ? conciergeID : 0,
      VehicleJson: JSON.stringify(selectedData),
      IsSMS: false,
      IsWhatsApp: false,
      IsEmailId: false,
      EmailId: null,
      SMSNumber: null,
      WhatsAppNumber: null,
      ConciergeCommunicationFrequency: ConciergeFrequency.DAILY,
      Name: data.conciergeName,
    };

    /**
     * It will call submit concierge API
     */
    const result = await VehicleService.submitConcierge(payload);

    if (result.IsSuccess) {
      //Added GTM event for Concierge Submit Click
      PushDataToGTMWithSubEvents(
        GTMEvents.ConciergeServiceRequest,
        GTMSubEvents.Submitted,
        {
          userId: user?.UserId
            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
            : null,
          languageId: router.locale,
        }
      );
      setShowModal(true);
      setMessage(LabelConstants.SUBMIT_CONCIERGE);
      /**
       * It redirect to my concierge page if IsSuccess is true
       */
    } else {
      MessageBox.open({
        content: `${t(LabelConstants.MAX_LIMIT_REACHED)}`,
      });
    }
  };

  /**
   * This method redirect to TransmissionFuel tab when we click back button
   */
  const handleBack = () => {
    router.push(
      `${
        conciergeID
          ? `/vehicle-wizard/${conciergeID}?tab=TransmissionFuel`
          : '/vehicle-wizard?tab=TransmissionFuel'
      }`,
      undefined,
      {
        shallow: true,
      }
    );
    setIsSummaryPage(false);
  };

  return (
    <PrivatePageLayout
      title={t(LabelConstants.PETROMIN_DIGITAL_CONCIERGE_SUMMARY)}
    >
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-8">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-[1.875rem]">
              <FormInput
                name="conciergeName"
                label={`${t(LabelConstants.CONCIERGE_NAME)}*`}
                maxLength={50}
                control={control}
                pattern={/[^\u0621-\u064Aa-zA-Z0-9 ]/}
              />
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-[1.875rem]">
              <FormTextarea
                name="bodyType"
                label={t(LabelConstants.BODY_TYPE)}
                control={control}
                disabled
              />
              <FormTextarea
                name="fuelType"
                label={t(LabelConstants.FUEL_TYPE)}
                control={control}
                disabled
              />

              <FormInput
                name="budget"
                label={t(LabelConstants.BUDGET)}
                control={control}
                disabled
              />
              <FormInput
                name="transmission"
                label={t(LabelConstants.TRANSMISSION)}
                control={control}
                disabled
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-gray-700 text-xl font-semibold">
                {t(LabelConstants.USER_DETAILS)}
              </h1>
              <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-[1.875rem]">
                <FormInput
                  name="firstName"
                  label={t(LabelConstants.FIRST_NAME)}
                  control={control}
                  disabled
                />
                <FormInput
                  name="lastName"
                  label={t(LabelConstants.LAST_NAME)}
                  control={control}
                  disabled
                />
                <FormInput
                  name="emailId"
                  label={t(LabelConstants.EMAIL)}
                  control={control}
                  disabled
                />
                <FormPhoneInputV1
                  name="mobileNumber"
                  label={t(LabelConstants.MOBILE_NUMBER)}
                  control={control}
                  disabled
                />
              </div>
            </div>
            {/* <div className="flex flex-col gap-4">
              <h1 className="text-gray-700 text-xl font-semibold">
                {`${t(LabelConstants.PREFERRED_MODE_OF_COMMUNICATION)}*`}
              </h1>
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-[1.875rem]">
                <div className="flex flex-col">
                  <FormCheckBox
                    control={control}
                    name="preferredCommunication.isPreferredWhatsapp"
                    label={t(LabelConstants.WHATSAPP)}
                    reValidate={() => {
                      trigger('preferredCommunication');
                    }}
                  />
                  <FormPhoneInputV1
                    name="mobileNumber"
                    control={control}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <FormCheckBox
                    control={control}
                    name="preferredCommunication.isPreferredEmail"
                    label={t(LabelConstants.EMAIL)}
                    reValidate={() => {
                      trigger('preferredCommunication');
                    }}
                  />
                  <FormInput name="emailId" control={control} disabled />
                </div>
                <div className="flex flex-col">
                  <FormCheckBox
                    control={control}
                    name="preferredCommunication.isPreferredSms"
                    label={t(LabelConstants.SMS)}
                    reValidate={() => {
                      trigger('preferredCommunication');
                    }}
                  />
                  <FormPhoneInputV1
                    name="mobileNumber"
                    control={control}
                    disabled
                  />
                </div>
              </div>
              {errors.preferredCommunication &&
                errors.preferredCommunication?.message && (
                  <p className="text-red-500 text-base font-light">
                    {t(errors.preferredCommunication?.message)}
                  </p>
                )}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-gray-700 text-xl font-semibold">
                {`${t(LabelConstants.COMMUNICATION_FREQUENCY)}*`}
              </h1>
              <div className="flex gap-6">
                <FormRadio
                  control={control}
                  name="communicationFrequency"
                  value={ConciergeFrequency.DAILY}
                  label={t(LabelConstants.DAILY)}
                />
                <FormRadio
                  control={control}
                  name="communicationFrequency"
                  value={ConciergeFrequency.WEEKLY}
                  label={t(LabelConstants.WEEKLY)}
                />
              </div>
              {errors.communicationFrequency &&
                errors.communicationFrequency?.message && (
                  <p className="text-red-500 text-base font-light">
                    {t(errors.communicationFrequency?.message)}
                  </p>
                )}
            </div> */}
            <div className="flex min-[460px]:flex-row flex-col justify-center sm:justify-start gap-4">
              <button
                className="btn btn-secondary text-lg font-semibold uppercase"
                onClick={() => handleBack()}
              >
                {t(LabelConstants.BACK)}
              </button>
              <button
                className="btn btn-primary text-lg font-semibold uppercase"
                type="submit"
              >
                {t(LabelConstants.SUBMIT)}
              </button>
            </div>
          </div>
        </form>
        {/* Concierge submit Success Modal */}
        <Modal
          show={showModal}
          size={ModalSize.EXTRA_LARGE}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <>
            <ModalBody>
              <div className="justify-center" dir="ltr">
                <h1 className="mt-8 text-center text-base ">{t(message)}</h1>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="text-center">
                <Link href="/my-wishlist">
                  <button className="btn btn-primary btn-modal px-5 text-center">
                    {t(LabelConstants.OK)}
                  </button>
                </Link>
              </div>
            </ModalFooter>
          </>
        </Modal>
      </>
    </PrivatePageLayout>
  );
};

export default WishListSummary;
