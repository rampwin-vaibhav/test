import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import { LabelConstants } from '../types/i18n.labels';
import { VehicleService } from '../helpers/services';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';
import MessageBox from '../components/common/MessageBox';
import { CircleSuccessIcon } from '../components/icons';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInput } from '../components/common/Form';
import { SessionUtils } from '../helpers/utilities';
import { useEffect, useState } from 'react';
import SignInModal from '../components/common/SignInModal';

interface IFormInput {
  year: string;
  make: string;
  model: string;
  body: string;
}

const vehicleNotFoundSchema = Yup.object().shape({
  year: Yup.string()
    .required(LabelConstants.REQUIRED_FIELD)
    .matches(/^[0-9]+$/, LabelConstants.FRM_ERR_MSG_ONLY_DIGITS),
  make: Yup.string().trim().required(LabelConstants.REQUIRED_FIELD),
  model: Yup.string().trim().required(LabelConstants.REQUIRED_FIELD),
  body: Yup.string().trim().required(LabelConstants.REQUIRED_FIELD),
});

const VehicleNotFound: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { control, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(vehicleNotFoundSchema),
  });

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated) {
          setOpenSignInModal(true);
        } else {
          setOpenSignInModal(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const user = SessionUtils.getUserDetails();
    const payload = {
      UserID: user ? user.UserId : '',
      ManufactureYear: parseInt(data.year),
      VehicleMake: data.make,
      VehicleModel: data.model,
      Spec: data.body,
    };
    const result = await VehicleService.findCarSupport(payload);
    if (result) {
      await MessageBox.open({
        content: (
          <div className="title mt-4">
            <div className="flex flex-col gap-3 items-center justify-center">
              <CircleSuccessIcon className="h-12 w-12" />
              <h1 className="mt-3 text-center">
                {t(LabelConstants.SUBMIT_THANK_YOU_MESSAGE)}
              </h1>
            </div>
          </div>
        ),
      });
      router.back();
    }
  };

  return (
    <PrivatePageLayout title={t(LabelConstants.PLEASE_ENTER_YOUR_CAR_DETAILS)}>
      <div>
        <div className="w-full md:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 w-full">
              <FormInput
                control={control}
                name="year"
                label={`${t(LabelConstants.YEAR)}*`}
              />
              <FormInput
                control={control}
                name="make"
                label={`${t(LabelConstants.MAKE)}*`}
              />
              <FormInput
                control={control}
                name="model"
                label={`${t(LabelConstants.MODEL)}*`}
              />
              <FormInput
                control={control}
                name="body"
                label={`${t(LabelConstants.TRIM)}*`}
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap justify-center md:justify-start">
              <button
                className="btn btn-secondary btn-sm p-2 mt-8 uppercase"
                type="button"
                onClick={() => router.back()}
              >
                {t(LabelConstants.CANCEL)}
              </button>
              <button
                className="btn btn-primary btn-sm p-2 mt-8 uppercase"
                type="submit"
              >
                {t(LabelConstants.SUBMIT)}
              </button>
            </div>
          </form>
        </div>
        {/* Sign In Modal */}
        <SignInModal
          show={openSignInModal}
          onClose={() => {
            setOpenSignInModal(false);
            router.push('/');
          }}
        />
      </div>
    </PrivatePageLayout>
  );
};

export default VehicleNotFound;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  res,
  req,
}: GetServerSidePropsContext) => {
  if (!SessionUtils.isValidServerSession(req, res)) {
    return {
      redirect: {
        permanent: false,
        destination: '/401',
      },
      props: {
        ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
