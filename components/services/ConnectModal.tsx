import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import { City } from '../../types/models';
import { VehicleService } from '../../helpers/services';
import { SessionUtils } from '../../helpers/utilities';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LabelConstants } from '../../types/i18n.labels';
import {
  FormDropdown,
  FormInput,
  FormPhoneInputV1,
  FormTextarea,
  IsPhoneNumberValid,
} from '../common/Form';
import { Modal, ModalSize, ModalBody, ModalFooter } from '../common/Modal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ServiceRequest from '../../helpers/services/servicerequest.service';
import { Locales, ServiceType } from '../../types/enums';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';

type ConnectModalProps = {
  closeModal: Function;
  route: string;
  isModalOpen: boolean;
};

interface IFormInput {
  mobile: string;
  email: string;
  comment: string;
  city: City;
  captcha?: string | null;
}

const ConnectModal = ({
  closeModal,
  route,
  isModalOpen,
}: ConnectModalProps) => {
  const { t } = useTranslation();

  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
  const userDetails = SessionUtils.getUserDetails();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [cityList, setCityList] = useState<City[]>([]);
  const onChange = (recaptchaValue: string | null) => {
    setValue('captcha', recaptchaValue);
    trigger('captcha');
  };

  const schema = yup.object({
    mobile: yup
      .string()
      .typeError(LabelConstants.INVALID_MOBILE_NUMBER)
      .required(LabelConstants.MOBILE_NUMBER_REQUIRED)
      .nullable()
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
    comment: yup.string().required(LabelConstants.COMMENT_REQUIRED),
    email: yup
      .string()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .nullable()
      .test(
        'maxDigit',
        LabelConstants.ALLOWED_MAX_150_CHAR,
        (number) => String(number).length <= 150
      ),
    city: yup.object().required(LabelConstants.CITY_IS_REQUIRED),
    captcha: yup
      .string()
      .test('captchaRequired', LabelConstants.CAPTCHA_REQUIRED, (value) =>
        !SessionUtils.isValidSession() && !value ? false : true
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isModalOpen) {
      setIsAuthenticated(SessionUtils.isValidSession());
      const fetchCity = async () => {
        const cityList = await VehicleService.fetchAllCities(router.locale);
        setCityList(cityList);
      };
      fetchCity();
      reset({
        email: userDetails?.EmailAddress,
        mobile: userDetails?.MobileNumber,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const user = SessionUtils.getUserDetails();

    const dataPost = {
      MobileNumber: String(data?.mobile),
      EmailAddress: data?.email,
      CityId: String(data?.city.CityId),
      QueryText: data?.comment,
      RecaptchaToken: !isAuthenticated ? data?.captcha : null,
    };

    let type: ServiceType | null = null;

    if (route === 'autoCare') {
      //Added GTM event for AutoCare Book Now Submit
      PushDataToGTMWithSubEvents(
        GTMEvents.AutoCare,
        GTMSubEvents.BookServiceSubmitted,
        {
          userId: user?.UserId
            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
            : null,
          languageId: router.locale,
        }
      );
    } else if (route === 'bodyPaint') {
      //Added GTM event for BodyPaint Book Now Submit
      PushDataToGTMWithSubEvents(
        GTMEvents.BodyPaint,
        GTMSubEvents.BookServiceSubmitted,
        {
          userId: user?.UserId
            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
            : null,
          languageId: router.locale,
        }
      );
    } else if (route === 'triStar') {
      //Added GTM event for Tristar Book Now Submit
      PushDataToGTMWithSubEvents(
        GTMEvents.Tristar,
        GTMSubEvents.BookServiceSubmitted,
        {
          userId: user?.UserId
            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
            : null,
          languageId: router.locale,
        }
      );
    }

    switch (route) {
      case 'autoCare':
        type = ServiceType.AutoCare;
        break;
      case 'bodyPaint':
        type = ServiceType.AutoPaint;
        break;
      case 'triStar':
        type = ServiceType.Tristar;
        break;
    }

    if (type) {
      ServiceRequest.connect(dataPost, type).then((res) => {
        closeModal(false);
        if (res) {
          if (res.IsSuccess) {
            toast.success(t(LabelConstants.SERVICE_QUERY_SUBMISSION));
          } else {
            if (res.MessageCode === LabelConstants.CAPTCHAINVALID_MSG) {
              toast.error(t(LabelConstants.CAPTCHAINVALID_MSG));
            }
          }
        }
      });
    }
  };

  return (
    <Modal
      show={isModalOpen}
      size={ModalSize.DEFAULT}
      onClose={() => closeModal(false)}
    >
      <>
        <ModalBody>
          <form
            id="service-form"
            className="pt-10 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="justify-center">
              <FormPhoneInputV1
                control={control}
                name="mobile"
                label={`${t(LabelConstants.MOBILE_NUMBER)}*`}
                showError={true}
              />
            </div>
            <div className="justify-center">
              <FormInput
                control={control}
                name="email"
                label={`${t(LabelConstants.EMAIL_ADDRESS)}*`}
                showError={true}
              />
            </div>
            <div className="justify-center">
              <FormDropdown
                options={cityList}
                labelAccessor="City"
                valueAccessor="CityId"
                labelText={`${t(LabelConstants.CITY)}*`}
                placeHolderText={t(LabelConstants.SELECT_CITY)}
                searchPlaceHolderText={t(LabelConstants.SEARCH)}
                control={control}
                name="city"
              />
            </div>
            <div className="justify-center">
              <FormTextarea
                control={control}
                label={`${t(LabelConstants.TELL_US_ABOUT)}*`}
                name="comment"
              />
            </div>
            {!isAuthenticated && (
              <div className="mt-6">
                <div className={router.locale === Locales.EN ? '' : 'hidden'}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={CAPTCHA_SITE_KEY || ''}
                    onChange={(e) => onChange(e!)}
                    hl="en"
                  />
                </div>
                <div className={router.locale === Locales.AR ? '' : 'hidden'}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={CAPTCHA_SITE_KEY || ''}
                    onChange={(e) => onChange(e!)}
                    hl="ar"
                  />
                </div>
                {errors.captcha && errors.captcha.message && (
                  <p className="error">{t(errors.captcha.message)}</p>
                )}
              </div>
            )}
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center gap-5">
            <button
              className="btn btn-primary-outline px-5 text-center btn-modal"
              onClick={() => closeModal(false)}
            >
              {t(LabelConstants.CANCEL)}
            </button>
            <button
              className="btn btn-primary px-5 text-center btn-modal"
              type="submit"
              form="service-form"
            >
              {t(LabelConstants.SUBMIT)}
            </button>
          </div>
        </ModalFooter>
      </>
    </Modal>
  );
};

export default ConnectModal;
