import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../../components/common/MessageBox';
import SignInModal from '../../components/common/SignInModal';
import Spinner from '../../components/common/Spinner/spinner';
import { Tabs } from '../../components/common/Tabs';
import { ProgressPendingIcon, SuccessIcon } from '../../components/icons';
import { AdditionalForm } from '../../components/vehicle-onboard/AdditionalForm';
import { Appointment } from '../../components/vehicle-onboard/Appointment';
import { ConfirmDetails } from '../../components/vehicle-onboard/ConfirmDetails';

import VehicleDetails from '../../components/vehicle-onboard/VehicleDetails';
import {
  ListingService,
  PackageSubscription,
  VehicleService,
} from '../../helpers/services';
import { SessionUtils } from '../../helpers/utilities';
import {
  VehicleRequiredDocs,
  // VehicleRequiredImages,
} from '../../types/constants';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import {
  GetAppointmentDetailsPayload,
  ListingImageArtifact,
  Locations,
  PackageResponse,
  PackageSubscriptionDetailsResponse,
  TestDriveAvailableDetails,
  VehicleListingData,
  VinNumberData,
} from '../../types/models';
import NewAppointment from '../../components/vehicle-onboard/NewAppointment';
import { ImagesForm } from '../../components/vehicle-onboard/ImagesForm';
import { DocForm } from '../../components/vehicle-onboard/DocForm';
type VehicleOnboardProps = {
  listingId: number | null;
};

const VehicleOnboard: NextPage<VehicleOnboardProps> = ({
  listingId: vehicleListingId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [listingId, setListingId] = useState<number | null>(vehicleListingId);
  const [vehicleImages, setVehicleImages] = useState<
    Array<ListingImageArtifact>
  >([]);
  const [vehicleDoc, setVehicleDoc] = useState<Array<ListingImageArtifact>>([]);
  const [listingData, setListingData] = useState<{
    data: VehicleListingData | null;
    testDriveDates: TestDriveAvailableDetails | null;
    inspectionDetails: GetAppointmentDetailsPayload | null;
  } | null>(null);
  const [packageSubscriptionDetails, setPackageSubscriptionDetails] =
    useState<PackageSubscriptionDetailsResponse>();
  const [packageReferenceId, setPackageReferenceId] = useState<string>('');
  const [orderItemId, setOrderItemId] = useState<string>('');
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [isVehicleDetailsTabValid, setIsVehicleDetailsTabValid] =
    useState<boolean>(false);
  const [isAdditionInfoTabValid, setIsAdditionInfoTabValid] =
    useState<boolean>(false);
  const [isUploadImageTabValid, setIsUploadImageTabValid] =
    useState<boolean>(false);
  const [isUploadDocumentTabValid, setIsUploadDocumentTabValid] =
    useState<boolean>(false);
  const [isConfirmDetailsTabValid, setIsConfirmDetailsTabValid] =
    useState<boolean>(false);
  const [packageDetails, setPackageDetails] = useState<PackageResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTestDriveDates, setSelectedTestDriveDates] =
    useState<TestDriveAvailableDetails>();
  const [vehicleDetails, setVehicleDetails] = useState<Array<VinNumberData>>(
    []
  );
  useEffect(() => {
    const initialLoad = async () => {
      const listingData = await VehicleService.fetchVehicleListingData(
        listingId,
        router.locale
      );
      const testDriveAvailableDetails =
        await VehicleService.fetchTestDriveAvailableDetails(
          listingId,
          router.locale
        );
      setSelectedTestDriveDates(testDriveAvailableDetails);
      const inspectionDetailsData =
        await VehicleService.getInspectionAppointmentDetails(
          listingId,
          router.locale
        );
      setListingData({
        data: listingData,
        testDriveDates: testDriveAvailableDetails,
        inspectionDetails: inspectionDetailsData,
      });
      const res = await ListingService.fetchListingImages(
        listingId,
        router.locale,
        listingData.Overview.BodyTypeCode
      );
      setVehicleImages(res);
      const listingDocument = await ListingService.fetchListingDocuments(
        listingId,
        router.locale
      );

      setVehicleDoc(listingDocument);
      setLoaded(true);
    };
    if (listingId) {
      initialLoad();
    } else {
      setLoaded(true);
    }
  }, [listingId, router, vehicleDetails]);

  // useEffect(() => {
  //   const initialLoad = async () => {
  //     if (
  //       (router.query.p_id && router.query.OrderItemId) ||
  //       !listingId ||
  //       listingData
  //     ) {
  //       const packageId: any =
  //         router.query.p_id ||
  //         (listingData &&
  //           listingData.data &&
  //           listingData.data.Overview.PackageReferenceId);

  //       const orderItemId: any =
  //         router.query.OrderItemId ||
  //         (listingData &&
  //           listingData.data &&
  //           listingData.data.Overview.OrderItemId);

  //       if (packageId && orderItemId) {
  //         setPackageReferenceId(packageId);
  //         setOrderItemId(orderItemId);
  //         if (router.query.p_id) {
  //           const res = await ListingService.getPackageSubscription(
  //             router.locale,
  //             router.query.p_id
  //           );

  //           setPackageSubscriptionDetails(res);
  //         }

  //         const res1: PackageResponse =
  //           await PackageSubscription.getPackageByPackageId(
  //             router.locale,
  //             router.query.OrderItemId! ||
  //               listingData?.data?.Overview.OrderItemId!
  //           );
  //         setLoadedPackageData(true);
  //         setPackageDetails(res1);
  //       } else {
  //         const result = await MessageBox.open({
  //           content: t(LabelConstants.LISTING_PAGE_ERROR_MESSAGE),
  //           type: MessageBoxType.Message,
  //           showClose: false,
  //           backdrop: 'static',
  //         });
  //         if (result === MessageBoxResult.OK) {
  //           router.push('/my-orders');
  //         }
  //       }
  //     }
  //   };
  //   initialLoad();
  // }, [
  //   router,
  //   router.locale,
  //   router.query.p_id,
  //   router.query.OrderItemId,
  //   listingData?.data?.Overview.OrderItemId,
  //   listingData?.data?.Overview.PackageReferenceId,
  //   listingData,
  //   listingId,
  //   t,
  // ]);

  // this useEffect is to check required condition of images
  useEffect(() => {
    // const check =
    //   vehicleImages.length > 0 &&
    //   vehicleImages
    //     ?.filter((itm) => VehicleRequiredImages.includes(itm.ArtifactTypeKey))
    //     .every((data) => data.ArtifactUrlPath !== null);
    const selfInspectionRequiredImages = vehicleImages
      .filter((itm) => itm.IsMandatoryForSelfInspection)
      .map((x) => {
        return x.ArtifactTypeKey;
      });

    if (vehicleImages && vehicleImages.length > 0) {
      const checkImages = vehicleImages
        ?.filter((itm) =>
          selfInspectionRequiredImages.includes(itm.ArtifactTypeKey)
        )
        .every((data) => data.ArtifactUrlPath !== null);

      // if (packageDetails?.IsSelfListedPackage) {
      if (checkImages) {
        setIsUploadImageTabValid(true);
      } else {
        setIsUploadImageTabValid(false);
      }
      // } else {
      //   // if (check) {
      //   //   setIsUploadImageTabValid(true);
      //   // }
      //   // else {
      //   setIsUploadImageTabValid(true);
      //   // }
      // }
    }
  }, [packageDetails?.IsSelfListedPackage, vehicleImages]);

  // this useEffect is to check required condition of documents
  useEffect(() => {
    let filterData: any = [];
    if (listingData?.data?.Overview.OutstandingFinance) {
      filterData = vehicleDoc?.filter((itm) =>
        VehicleRequiredDocs.includes(itm.ArtifactTypeKey)
      );
    } else {
      filterData = vehicleDoc?.filter(
        (itm) => itm.ArtifactTypeKey === VehicleRequiredDocs[0]
      );
    }
    var check =
      filterData.length > 0 &&
      filterData?.every(
        (data: any) =>
          data.VehicleListingArtifactId !== 0 &&
          data.VehicleListingArtifactId !== null
      );
    if (check) {
      setIsUploadDocumentTabValid(true);
    } else {
      setIsUploadDocumentTabValid(false);
    }
    if (listingData && listingData?.data?.Overview.City !== null) {
      setIsAdditionInfoTabValid(true);
    }
    if (
      (selectedTestDriveDates &&
        selectedTestDriveDates?.TestDriveAvailability) ||
      listingData?.data?.Overview.Signature
    ) {
      setIsConfirmDetailsTabValid(true);
    }
  }, [listingData, selectedTestDriveDates, vehicleDoc]);

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

  return (
    <>
      {loaded ? (
        <div
          className={`go-onboard-vehicle-page bg-white w-full h-full mx-auto ${
            isLoading ? 'relative' : ''
          }`}
        >
          {isLoading && (
            <div className="absolute bg-lighter-gray opacity-50 top-0 left-0 !h-full w-full flex justify-center items-center z-50">
              <Spinner />
            </div>
          )}
          <Tabs
            default="Vehicle Details"
            isBlocking={async () => {
              if (isDirty) {
                const userChoice = await MessageBox.open({
                  content: t(LabelConstants.UNSAVED_CHANGES),
                  type: MessageBoxType.Confirmation,
                });
                if (userChoice === MessageBoxResult.Yes) {
                  setIsDirty(false);
                }
                return (
                  userChoice === MessageBoxResult.No ||
                  userChoice === MessageBoxResult.Nope
                );
              }
              return false;
            }}
          >
            <Tabs.Item id="Vehicle Details">
              <span className="cursor-pointer text-xl md:text-base lg:text-xl font-bold flex items-center justify-center w-full gap-2.5 uppercase">
                <div>
                  {isVehicleDetailsTabValid ? (
                    <SuccessIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ProgressPendingIcon className="w-5 h-5" />
                  )}
                </div>
                {t(LabelConstants.VEHICLE_DETAILS)}
              </span>
            </Tabs.Item>
            <Tabs.Item
              id="Additional Information"
              disabled={!isVehicleDetailsTabValid}
            >
              <span className="cursor-pointer text-xl md:text-base lg:text-xl font-bold flex items-center justify-center w-full gap-2.5 uppercase">
                <div>
                  {isAdditionInfoTabValid ? (
                    <SuccessIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ProgressPendingIcon className="w-5 h-5" />
                  )}
                </div>
                {t(LabelConstants.ADDITIONAL_INFORMATION)}
              </span>
            </Tabs.Item>
            <Tabs.Item
              id="Images"
              disabled={!isAdditionInfoTabValid}
              // hide={!packageDetails?.IsSelfListedPackage}
            >
              <span className="cursor-pointer text-xl md:text-base lg:text-xl font-bold flex items-center justify-center w-full gap-2.5 uppercase">
                <div>
                  {isUploadImageTabValid ? (
                    <SuccessIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ProgressPendingIcon className="w-5 h-5" />
                  )}
                </div>
                {t(LabelConstants.IMAGES)}
              </span>
            </Tabs.Item>
            <Tabs.Item
              id="Documents"
              disabled={
                // !packageDetails?.IsSelfListedPackage && isAdditionInfoTabValid
                //   ? false
                //   :

                !isUploadImageTabValid ||
                vehicleImages.filter((itm) => itm.IsQCApproved === false)
                  .length > 0
              }
            >
              <span className="cursor-pointer text-xl md:text-base lg:text-xl font-bold flex items-center justify-center w-full gap-2.5 uppercase">
                <div>
                  {isUploadDocumentTabValid ? (
                    <SuccessIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ProgressPendingIcon className="w-5 h-5" />
                  )}
                </div>
                {t(LabelConstants.DOCUMENTS)}
              </span>
            </Tabs.Item>
            <Tabs.Item
              id="Confirm Details"
              disabled={
                // !packageDetails?.IsSelfListedPackage
                //   ? isUploadDocumentTabValid
                //     ? false
                //     : true
                //   :
                vehicleDoc.filter((itm) => itm.IsQCApproved === false).length >
                0
                  ? true
                  : isUploadDocumentTabValid && isUploadImageTabValid
                  ? false
                  : true
              }
            >
              <span className="cursor-pointer flex text-xl md:text-base lg:text-xl font-bold items-center justify-center w-full gap-2.5 uppercase">
                <div>
                  {isConfirmDetailsTabValid ? (
                    <SuccessIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ProgressPendingIcon className="w-5 h-5" />
                  )}
                </div>
                {t(LabelConstants.CONFIRM_DETAILS)}
              </span>
            </Tabs.Item>
            <Tabs.Item
              id="Inspection Appointment"
              disabled={
                // !packageDetails?.IsSelfListedPackage
                //   ? isConfirmDetailsTabValid && isUploadDocumentTabValid
                //     ? false
                //     : true
                //   :

                isConfirmDetailsTabValid &&
                isUploadDocumentTabValid &&
                isUploadImageTabValid
                  ? false
                  : true
              }
              hide={
                // packageDetails?.IsSelfListedPackage
                true
              }
            >
              <span className="cursor-pointer flex text-xl md:text-base lg:text-xl  font-bold items-center justify-center gap-2.5 w-full uppercase">
                <div>
                  {listingData?.inspectionDetails?.LocationId ? (
                    <SuccessIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ProgressPendingIcon className="w-5 h-5" />
                  )}
                </div>

                {packageDetails?.InspectionType.IsInspectionAtPEPAC
                  ? t(LabelConstants.INSPECTION_APPOINTMENT)
                  : t(LabelConstants.SCHEDULE_INSPECTION)}
                {}
              </span>
            </Tabs.Item>
            <Tabs.Page id="Vehicle Details">
              <div className="py-4">
                <VehicleDetails
                  listingId={listingId}
                  setListingId={setListingId}
                  listingData={listingData?.data!}
                  setIsDirty={setIsDirty}
                  packageName={packageSubscriptionDetails?.PackageDisplayName}
                  p_id={packageReferenceId}
                  order_id={orderItemId}
                  setOpenSignInModal={setOpenSignInModal}
                  setIsTabValid={setIsVehicleDetailsTabValid}
                  packageDetails={packageDetails!}
                  setVehicleDetails={setVehicleDetails}
                  vehicleDetails={vehicleDetails}
                  setIsLoading={setIsLoading}
                  packageId={
                    router.query.p_id ||
                    listingData?.data?.Overview.PackageReferenceId
                  }
                  orderId={
                    router.query.OrderItemId ||
                    listingData?.data?.Overview.OrderItemId
                  }
                />
              </div>
            </Tabs.Page>
            <Tabs.Page id="Additional Information">
              <div className="py-4">
                <AdditionalForm
                  listingId={listingId}
                  listingData={listingData}
                  setIsDirty={setIsDirty}
                  packageName={packageSubscriptionDetails?.PackageDisplayName}
                  p_id={packageReferenceId}
                  order_id={orderItemId}
                  setOpenSignInModal={setOpenSignInModal}
                  setIsTabValid={setIsAdditionInfoTabValid}
                  packageDetails={packageDetails!}
                  setIsLoading={setIsLoading}
                  packageId={
                    router.query.p_id ||
                    listingData?.data?.Overview.PackageReferenceId
                  }
                  orderId={
                    router.query.OrderItemId ||
                    listingData?.data?.Overview.OrderItemId
                  }
                ></AdditionalForm>
              </div>
            </Tabs.Page>
            <Tabs.Page
              id="Images"

              // hide={!packageDetails?.IsSelfListedPackage}
            >
              <div className="py-4">
                <ImagesForm
                  listingId={listingId}
                  listingData={listingData?.data!}
                  vehicleImages={vehicleImages!}
                  setVehicleImages={setVehicleImages}
                  packageName={packageSubscriptionDetails?.PackageDisplayName}
                  p_id={packageReferenceId}
                  order_id={orderItemId}
                  setOpenSignInModal={setOpenSignInModal}
                  setIsTabValid={setIsUploadImageTabValid}
                  packageDetails={packageDetails!}
                  vehicleDetails={vehicleDetails}
                  setIsLoading={setIsLoading}
                  packageId={
                    router.query.p_id ||
                    listingData?.data?.Overview.PackageReferenceId
                  }
                  orderId={
                    router.query.OrderItemId ||
                    listingData?.data?.Overview.OrderItemId
                  }
                />
              </div>
            </Tabs.Page>
            <Tabs.Page id="Documents">
              <div className="py-4">
                <DocForm
                  listingId={listingId}
                  listingData={listingData?.data!}
                  vehicleDoc={vehicleDoc}
                  setVehicleDoc={setVehicleDoc}
                  packageName={packageSubscriptionDetails?.PackageDisplayName}
                  p_id={packageReferenceId}
                  order_id={orderItemId}
                  setOpenSignInModal={setOpenSignInModal}
                  setIsTabValid={setIsUploadDocumentTabValid}
                  packageDetails={packageDetails!}
                  setIsLoading={setIsLoading}
                  packageId={
                    router.query.p_id ||
                    listingData?.data?.Overview.PackageReferenceId
                  }
                  orderId={
                    router.query.OrderItemId ||
                    listingData?.data?.Overview.OrderItemId
                  }
                />
              </div>
            </Tabs.Page>
            <Tabs.Page id="Confirm Details">
              <div className="py-4">
                <ConfirmDetails
                  listingId={listingId}
                  listingData={listingData}
                  setIsDirty={setIsDirty}
                  p_id={packageReferenceId}
                  order_id={orderItemId}
                  setOpenSignInModal={setOpenSignInModal}
                  setIsTabValid={setIsConfirmDetailsTabValid}
                  packageDetails={packageDetails!}
                  setIsLoading={setIsLoading}
                  packageId={
                    router.query.p_id ||
                    listingData?.data?.Overview.PackageReferenceId
                  }
                  orderId={
                    router.query.OrderItemId ||
                    listingData?.data?.Overview.OrderItemId
                  }
                />
              </div>
            </Tabs.Page>
            <Tabs.Page
              id="Inspection Appointment"
              hide={
                // packageDetails?.IsSelfListedPackage
                true
              }
            >
              {packageDetails?.InspectionType.IsInspectionAtPEPAC ? (
                <div className=" py-4">
                  <Appointment
                    listingId={listingId}
                    inspectionDetails={listingData?.inspectionDetails!}
                    listingData={listingData?.data!}
                    packageName={packageSubscriptionDetails?.PackageDisplayName}
                    setOpenSignInModal={setOpenSignInModal}
                    packageDetails={packageDetails!}
                  />
                </div>
              ) : (
                <div className=" py-4">
                  <NewAppointment
                    listingId={listingId}
                    inspectionDetails={listingData?.inspectionDetails!}
                    listingData={listingData?.data!}
                    packageName={packageSubscriptionDetails?.PackageDisplayName}
                    setOpenSignInModal={setOpenSignInModal}
                    packageDetails={packageDetails!}
                  />
                </div>
              )}
            </Tabs.Page>
          </Tabs>
        </div>
      ) : (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {/* Sign In Modal */}
      <SignInModal
        show={openSignInModal}
        onClose={() => {
          setOpenSignInModal(false);
          router.push('/');
        }}
      />
    </>
  );
};

export default VehicleOnboard;

export const getServerSideProps: GetServerSideProps<
  VehicleOnboardProps
> = async ({ locale, query, params }: GetServerSidePropsContext) => {
  const { tab } = query;
  const { vehicleId } = params as { vehicleId?: Array<number> };
  let id: number | null = null;
  if ((!vehicleId || vehicleId.length === 0) && tab) {
    return {
      redirect: {
        permanent: false,
        destination: `${
          locale === 'en' ? '/vehicle-onboard' : '/ar/vehicle-onboard'
        }`,
      },
      props: {
        ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      },
    };
  } else if (vehicleId && (vehicleId.length > 1 || isNaN(vehicleId[0]))) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {
        ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      },
    };
  } else if (vehicleId && vehicleId.length === 1) {
    id = Number(vehicleId[0]);
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      listingId: id,
    },
  };
};
