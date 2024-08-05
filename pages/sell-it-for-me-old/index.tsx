import moment from 'moment';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter } from '../../components/common/Modal';
import SignInModal from '../../components/common/SignInModal';
import { SuccessIcon } from '../../components/icons';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import {
  ListingService,
  PackageSubscription,
  ProfileService,
} from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import {
  ConfigurationKey,
  Locales,
  Privileges,
  ProductReferenceType,
} from '../../types/enums';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import { ProfileData } from '../../types/models';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../../components/common/MessageBox';
import { AppTheme, SignInRedirectType } from '../../types/constants';
import { useAppSelector } from '../../lib/hooks';
import { useDispatch } from 'react-redux';
import {
  rehydrateSelfListingState,
  SelfListingState,
  setOpenSelfListingFlow,
} from '../../lib/self-listing/selfListing.slice';
import BaseMobileCard from '../../components/SelfListingV1/components/BaseMobileCard';

type SellerProcessProps = {};

const SellerProcess: NextPage<
  SellerProcessProps
> = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isSelfListingFlowOpen = useAppSelector(
    ({ selfListing }) => selfListing.isOpen
  );
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openProfileModal, setOpenProfileModel] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inspectionAmount, setInspectionAmount] = useState<string>('');
  const [launchDate, setLaunchDate] = useState<string>('');

  useEffect(() => {
    const initialLoad = async () => {
      /* Check User Session */
      const isAuthenticated = SessionUtils.isValidSession();
      setIsAuthenticated(isAuthenticated);

      const [inspectionFees, launchDate] = await Promise.all([
        ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.InspectionFees,
          router.locale
        ),
        ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.LaunchOfferValidDate,
          router.locale
        ),
      ]);
      setInspectionAmount(inspectionFees.ConfigurationValue);
      setLaunchDate(launchDate.ConfigurationValue);

      if (isAuthenticated) {
        /* To fetch user data */
        const profile = await ProfileService.fetchUserData(router.locale);
        setProfileData(profile);
      }
    };

    initialLoad();
  }, [router.locale]);

  const query = router.query;
  useEffect(() => {
    if (query.p) {
      const rehydratedData = CommonUtils.decodeB64<SelfListingState>(
        query.p as string
      );
      dispatch(rehydrateSelfListingState(rehydratedData));
    }
  }, [query, dispatch]);

  const handleProfileModel = () => {
    setOpenProfileModel(true);
    !profileData?.IsActive
      ? setErrorMessage(LabelConstants.PROFILE_INACTIVE_ACTIVATE_TO_PROCEED)
      : setErrorMessage(LabelConstants.PROFILE_VALIDATION_REMINDER);
    localStorage.removeItem('SignInRedirectOperation');
  };

  const openSignInSignUpModel = () => {
    setOpenSignInModal(true);
    const SignInRedirectOperationObj = {
      RedirectOperationType: SignInRedirectType.ListACar,
    };
    localStorage.setItem(
      'SignInRedirectOperation',
      JSON.stringify(SignInRedirectOperationObj)
    );
  };

  const handleGetStarted = async () => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for List My Car Completed
    PushDataToGTMWithSubEvents(
      GTMEvents.ListMyCar,
      GTMSubEvents.ProcessInitiated,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
    // if (SessionUtils.hasPrivileges(Privileges.SellItForMe)) {
    // const cartData = await PackageSubscription.getShoppingCart(router.locale);
    // const packageData = cartData?.Data?.CartItems.filter((x) => {
    //   return x.CartItemType === ProductReferenceType.B2CPackage; // write package logic
    // });
    // if (packageData?.length > 0) {
    //   const result = await MessageBox.open({
    //     content: (
    //       <div className="text-lg">
    //         {t(LabelConstants.VISIT_SHOPPING_CART)}
    //       </div>
    //     ),
    //     type: MessageBoxType.Confirmation,
    //   });
    //   if (result === MessageBoxResult.Yes) {
    //     Router.push('/cart');
    //   }
    // } else {
    //   //As per urgent requirement from GGM we have removed purchase eligibility check
    //   // const response = await ListingService.getValidatePurchaseEligibility();
    //   // if (response) {
    //   Router.push('/select-package');
    //   // } else {
    //   //   const result = await MessageBox.open({
    //   //     content: (
    //   //       <div className="text-lg">
    //   //         {t(LabelConstants.ELIGIBILITY_TEXT)}
    //   //       </div>
    //   //     ),
    //   //     type: MessageBoxType.Confirmation,
    //   //   });
    //   //   if (result === MessageBoxResult.Yes) {
    //   //     Router.push('/my-orders');
    //   //   }
    //   // }
    // }
    // router.push('/vehicle-onboard');
    dispatch(setOpenSelfListingFlow(true));
    // } else {
    // toast.error(t(LabelConstants.NOT_AUTHORIZED));
    // }
    localStorage.removeItem('SignInRedirectOperation');
  };

  useEffect(() => {
    const redirectType = localStorage.getItem('SignInRedirectOperation');
    const redirectJSON = JSON.parse(redirectType!);
    if (
      redirectJSON?.RedirectOperationType === SignInRedirectType.ListACar &&
      isAuthenticated
    ) {
      if (profileData && profileData?.UserProfileStatusKey !== 'Validated') {
        handleProfileModel();
      } else if (profileData && !profileData.IsActive) {
        handleProfileModel();
      } else if (
        profileData &&
        profileData?.UserProfileStatusKey === 'Validated'
      ) {
        handleGetStarted();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, profileData]);

  const handleListVehicle = () => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for List My Car Completed
    PushDataToGTMWithSubEvents(
      GTMEvents.ListMyCar,
      GTMSubEvents.ProcessInitiated,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
    if (SessionUtils.hasPrivileges(Privileges.SellItForMe)) {
      router.push('/vehicle-onboard');
    } else {
      toast.error(t(LabelConstants.NOT_AUTHORIZED));
    }
  };

  return (
    <>
      <PrivatePageLayout>
        <>
          <div className="sell-it-for-me-page mb-24 mt-7">
            <div>
              <div className={`flex items-center justify-center`}>
                <div className="flex flex-col gap-7 items-center">
                  <div className="bg-primary rounded-full text-white sm:px-24 px-4 py-2 text-3xl font-bold my-4 ">
                    {t(LabelConstants.SELLER_PROCESS)}
                  </div>
                  <div className="flex items-center">
                    <picture>
                      <source srcSet="/images/sell-car.png" type="image/png" />
                      <img
                        src="/images/sell-car.png"
                        alt="gogo motor"
                        className="w-96"
                      />
                    </picture>
                  </div>
                  <div className="text-color text-heading5 font-bold mb-1 sm:mb-6">
                    {t(LabelConstants.FIVE_STEPS_AWAY_MSG)}
                  </div>
                </div>
              </div>
            </div>
            <div className="reverse-process">
              <div className="flex w-full flex-col my-16">
                <div className="flex w-full flex-col md:flex-row">
                  <div className="flex w-full">
                    <div className="flex md:w-full flex-col md:flex-row">
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full"></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center h-20 w-20 border-[0.375rem] border-primary rounded-full text-heading4 font-bold text-selection">
                          {t(LabelConstants.NUM_1)}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:mt-3 text-primary">
                            {t(LabelConstants.VEHICLE_DETAILS)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="flex md:w-full flex-col md:flex-row">
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center h-20 w-20 border-[0.375rem] border-primary rounded-full text-heading4 font-bold text-selection">
                          {t(LabelConstants.NUM_2)}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:mt-3 text-primary">
                            {t(LabelConstants.ENTER_ADDITIONAL_INFORMATION)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="flex md:w-full flex-col md:flex-row">
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center h-20 w-20 border-[0.375rem] border-primary rounded-full text-heading4 font-bold text-selection">
                          {t(LabelConstants.NUM_3)}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:mt-3 text-primary">
                            {t(LabelConstants.IMAGES)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Task 12448: Remove 4th Step from landing page for List car */}
                  {/* <div className="flex w-full">
                  
                    <div className="flex md:w-full flex-col md:flex-row">
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center h-20 w-20 border-[0.375rem] border-primary rounded-full text-heading4 font-bold text-selection">
                          {t(LabelConstants.NUM_4)}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:mt-3 text-primary">
                            {t(LabelConstants.IMAGES)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="flex w-full">
                    <div className="flex md:w-full flex-col md:flex-row">
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center h-20 w-20 border-[0.375rem] border-primary rounded-full text-heading4 font-bold text-selection">
                          {t(LabelConstants.NUM_4)}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:mt-3 text-primary">
                            {t(LabelConstants.DOCUMENTS)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="flex md:w-full flex-col md:flex-row">
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center h-20 w-20 border-[0.375rem] border-primary rounded-full text-heading4 font-bold text-selection">
                          {t(LabelConstants.NUM_5)}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          {/* <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:mt-3 text-primary">
                            {t(LabelConstants.CONFIRM_DETAILS)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex w-full">
                    <div className="flex md:w-full flex-col md:flex-row">
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full">
                          <div className="w-[0.375rem] lg:mt-4 h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center h-20 w-20 border-[0.375rem] border-primary rounded-full text-[2.625rem] font-bold text-selection">
                          {t(LabelConstants.NUM_6)}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center items-center h-6 lg:h-16 md:h-20 w-20 md:w-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:mt-3 text-primary">
                            {t(LabelConstants.INSPECTION_APPOINTMENT)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* this section visible in desktop version */}
                <div className="hidden md:flex w-full flex-col md:flex-row">
                  <div className="flex flex-col items-center justify-center w-full h-fit">
                    <div className="text-center">
                      <div className="font-bold text-xl sm:mt-3 text-primary">
                        {t(LabelConstants.VEHICLE_DETAILS)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-fit">
                    <div className="text-center">
                      <div className="font-bold text-xl sm:mt-3 text-primary">
                        {t(LabelConstants.ENTER_ADDITIONAL_INFORMATION)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-fit">
                    <div className="text-center">
                      <div className="font-bold text-xl sm:mt-3 text-primary">
                        {t(LabelConstants.IMAGES)}
                      </div>
                    </div>
                  </div>
                  {/* Task 12448: Remove 4th Step from landing page for List car */}
                  {/* <div className="flex flex-col items-center justify-center w-full h-fit">
                    <div className="text-center">
                      <div className="font-bold text-xl sm:mt-3 text-primary">
                        {t(LabelConstants.IMAGES)}
                      </div>
                    </div>
                  </div> */}
                  <div className="flex flex-col items-center justify-center w-full h-fit">
                    <div className="text-center">
                      <div className="font-bold text-xl sm:mt-3 text-primary">
                        {t(LabelConstants.DOCUMENTS)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-fit">
                    <div className="text-center">
                      <div className="font-bold text-xl sm:mt-3 text-primary">
                        {t(LabelConstants.CONFIRM_DETAILS)}
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-col items-center justify-center w-full h-fit">
                    <div className="text-center">
                      <div className="font-bold text-xl sm:mt-3 text-primary">
                        {t(LabelConstants.INSPECTION_APPOINTMENT)}
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              {/*  */}

              <div className="flex w-full justify-center items-center gap-5 sm:space-x-16 text-base">
                <button
                  className="font-bold btn btn-primary text-white rounded-full text-xl sm:px-8 px-12 sm:py-1.5 py-1.5 uppercase"
                  // onClick={() =>
                  //   !isAuthenticated
                  //     ? openSignInSignUpModel()
                  //     : profileData &&
                  //       profileData?.UserProfileStatusKey !== 'Validated'
                  //     ? handleProfileModel()
                  //     : profileData && !profileData.IsActive
                  //     ? handleProfileModel()
                  //     : handleGetStarted()
                  // }
                  onClick={() => handleGetStarted()}
                >
                  {t(LabelConstants.LIST_CAR)}
                </button>
                {/* <button
                  className="font-bold btn btn-primary text-white rounded-full text-xl sm:px-8 px-12 sm:py-1.5 py-1.5 uppercase"
                  onClick={() =>
                    !isAuthenticated
                      ? openSignInSignUpModel()
                      : profileData &&
                        profileData?.UserProfileStatusKey !== 'Validated'
                      ? handleProfileModel()
                      : profileData && !profileData.IsActive
                      ? handleProfileModel()
                      : handleListVehicle()
                  }
                >
                  {t(LabelConstants.LIST_CAR)}
                </button> */}
              </div>
            </div>
          </div>

          {/* SignIn/SignUp Modal */}
          <SignInModal
            show={openSignInModal}
            onClose={() => {
              setOpenSignInModal(false);
              localStorage.removeItem('SignInRedirectOperation');
            }}
          />

          {/* Profile Modal */}
          <Modal
            show={openProfileModal}
            onClose={() => setOpenProfileModel(false)}
          >
            <>
              <ModalBody>
                <div className="mt-4">
                  <div className="flex flex-col items-center justify-center">
                    <SuccessIcon className="h-7 w-7" />
                    <h1 className="mt-3 text-center">{t(errorMessage!)}</h1>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-center items-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setOpenProfileModel(false);
                      Router.push(`/profile?redirectUrl=${router.asPath}`);
                    }}
                  >
                    {t(LabelConstants.OK)}
                  </button>
                </div>
              </ModalFooter>
            </>
          </Modal>
          {isSelfListingFlowOpen && <BaseMobileCard />}
        </>
      </PrivatePageLayout>
    </>
  );
};

export default SellerProcess;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      applyTheme: AppTheme.V1,
    },
  };
};
