import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from '../../../../../../components/icons';
import NewVehicleImageSlider from '../../../../../../components/newcars/NewVehicleImageSlider';
import ProductCatalogueInformation from '../../../../../../components/newcars/ProductCatalogueInformation';
import ProductCatalogueOverview from '../../../../../../components/newcars/ProductCatalogueOverview';
import SearchFeaturesAndSpecifications from '../../../../../../components/newcars/SearchFeaturesAndSpecifications';
import VehicleDocuments from '../../../../../../components/newcars/VehicleDocuments';
import VehicleFeaturesAndSpecifications from '../../../../../../components/newcars/VehicleFeaturesAndSpecifications';
import VehicleInformation from '../../../../../../components/newcars/VehicleInformation';
import VehicleOverview from '../../../../../../components/newcars/VehicleOverview';
import VehicleVideos from '../../../../../../components/newcars/VehicleVideos';
import {
  NewCarService,
  VehicleService,
} from '../../../../../../helpers/services';
import { CommonUtils, SessionUtils } from '../../../../../../helpers/utilities';
import {
  ProfileArtifactType,
  SpinCar360Parameters,
} from '../../../../../../types/constants';
import {
  ImageArtifactKey,
  Locales,
  MfgImageArtifactKey,
  PageKey,
  VehicleListingWorkflowNumber,
} from '../../../../../../types/enums';
import { LabelConstants } from '../../../../../../types/i18n.labels';
import {
  Breadcrumb,
  Features,
  ListingImageArtifact,
  ProductCatalogueData,
  ProductType,
  ProfileArtifact,
  SpecificationItem,
  VehicleBrand,
  VehicleListingData,
} from '../../../../../../types/models';

type NewCarPageProps = {
  skewId: number;
  makes: VehicleBrand | null;
};

const NewCarDetailsPage: NextPage<NewCarPageProps> = ({
  skewId,
  makes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { t } = useTranslation();
  const [vehicleListingData, setVehicleListingData] =
    useState<VehicleListingData>();
  const [productListingData, setProductListingData] = useState<
    ProductCatalogueData | undefined
  >();
  const [showSliderData, setShowSliderData] = useState<
    Array<ListingImageArtifact | ProfileArtifact>
  >([]);
  const [spinArtifactURL, setSpinArtifactURL] = useState<string>();
  const [showMoreDataModal, setShowMoreDataModal] = useState<boolean>(false);
  const [vehicleBrochureData, setVehicleBrochureData] = useState<
    Array<ListingImageArtifact | ProfileArtifact>
  >([]);
  const [externalVideoArtifacts, setExternalVideoArtifacts] = useState<
    Array<ListingImageArtifact | ProfileArtifact>
  >([]);
  const [vehicleItemType, setVehicleItemType] = useState<ProductType>();

  const [featuresData, setFeaturesData] = useState<Array<Features> | []>([]);
  const [specificationData, setSpecificationData] = useState<
    Array<SpecificationItem> | []
  >([]);
  const [breadcrumbData, setBreadcrumbData] = useState<Array<Breadcrumb>>([]);
  const [VehicleListingId, setVehicleListingId] = useState<number | null>();
  const [loading, setIsLoading] = useState<boolean | null>(null);
  useEffect(() => {
    const isAuthenticated = SessionUtils.isValidSession();

    const initialLoad = async () => {
      if (router.query.v) {
        //fetch vehicle information
        setIsLoading(true);
        const vehicleListingData = await VehicleService.fetchVehicleListingData(
          skewId,
          router.locale,
          isAuthenticated
        );

        if (vehicleListingData) {
          setVehicleListingData(vehicleListingData);
        } else {
          if (String(router.query.tab).toLowerCase() !== 'doc') {
            router.replace('/404');
          }
        }

        if (
          vehicleListingData?.Overview?.IsGGMDigitalDealerVehicle &&
          vehicleListingData?.Overview?.VehicleProfileId
        ) {
          /* prepare features and specification data */
          const featureList = await NewCarService.fetchFeatures(
            router.locale,
            vehicleListingData?.Overview?.VehicleProfileId!,
            ProfileArtifactType.VehicleProfile
          );
          setFeaturesData(featureList);
          const specificationsList = await NewCarService.fetchSpecification(
            router.locale,
            vehicleListingData?.Overview?.VehicleProfileId!,
            ProfileArtifactType.VehicleProfile
          );
          setSpecificationData(specificationsList);

          const profileArtifactType =
            await NewCarService.fetchProfileArtifactData(
              router.locale,
              vehicleListingData?.Overview?.VehicleProfileId!,
              ProfileArtifactType.VehicleProfile
            );

          // prepare explore more videos / external video links
          const externalVideos = profileArtifactType.filter((img) => {
            return img.ArtifactTypeKey === MfgImageArtifactKey.MfgVideo;
          });
          if (externalVideos && externalVideos.length > 0) {
            setExternalVideoArtifacts(externalVideos);
          }

          /* prepare sliderImages start */
          const sliderImages = profileArtifactType.filter((x) => {
            return (
              x.ArtifactUrlPath !== null &&
              x.ArtifactTypeKey !== MfgImageArtifactKey.MfgVideo &&
              x.ArtifactTypeKey !== MfgImageArtifactKey.MfgDocument
            );
          });
          setShowSliderData(sliderImages);

          //Fetch Vehicle Document(E-brochure)
          const eBrochureData = profileArtifactType.filter((img) => {
            return img.ArtifactTypeKey === MfgImageArtifactKey.MfgDocument;
          });
          if (eBrochureData && eBrochureData.length > 0) {
            setExternalVideoArtifacts(externalVideos);
          }
          setVehicleBrochureData(eBrochureData);
        } else {
          /* prepare features and specification data */
          setFeaturesData(vehicleListingData?.Features);
          setSpecificationData(vehicleListingData?.Specifications);

          const listingImages = await VehicleService.fetchListingImageArtifacts(
            skewId,
            router.locale
          );
          // prepare spin car images
          const spinArtifact = listingImages.find((img) => {
            return img.ArtifactTypeKey === ImageArtifactKey.Spin360View;
          });
          if (spinArtifact) {
            setSpinArtifactURL(
              spinArtifact.ArtifactUrlPath + SpinCar360Parameters
            );
          }

          // prepare explore more videos / external video links
          const externalVideos = listingImages.filter((img) => {
            return img.ArtifactTypeKey === ImageArtifactKey.VehicleVideo;
          });
          if (externalVideos && externalVideos.length > 0) {
            setExternalVideoArtifacts(externalVideos);
          }

          /* sliderImages start */
          const sliderImages = listingImages.filter((x) => {
            if (
              vehicleListingData?.Overview &&
              vehicleListingData?.Overview.VehicleListingWorkflowNumber >=
                VehicleListingWorkflowNumber.Listed
            ) {
              return (
                x.ArtifactUrlPath !== null &&
                x.ArtifactType !== ImageArtifactKey.Spin360View &&
                x.ArtifactType !== ImageArtifactKey.VehicleVideo &&
                x.IsVisibleOnPortal
              );
            } else {
              return (
                x.ArtifactUrlPath !== null &&
                x.ArtifactType !== ImageArtifactKey.Spin360View
              );
            }
          });
          setShowSliderData(sliderImages);
          /* sliderImages end */

          //Fetch Vehicle Document(E-brochure)
          const eBrochureData = await VehicleService.fetchVehicleDocuments(
            skewId,
            router.locale
          );
          setVehicleBrochureData(eBrochureData);
        }
        setVehicleItemType(ProductType.VehicleListing);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        //fetch product catalogue information
        const productCatalogueData =
          await VehicleService.fetchProductCatalogueData(skewId, router.locale);

        setProductListingData(productCatalogueData);
        const stockAvailability = await VehicleService.stockAvailability(
          productCatalogueData?.ProductCatalogueId
        );
        setVehicleListingId(stockAvailability?.VehicleListingId);
        if (productCatalogueData?.VehicleProfileId) {
          /* prepare features and specification data */
          const featureList = await NewCarService.fetchFeatures(
            router.locale,
            productCatalogueData?.VehicleProfileId!,
            ProfileArtifactType.VehicleProfile
          );
          setFeaturesData(featureList);
          const specificationsList = await NewCarService.fetchSpecification(
            router.locale,
            productCatalogueData?.VehicleProfileId!,
            ProfileArtifactType.VehicleProfile
          );
          setSpecificationData(specificationsList);

          const profileArtifactType =
            await NewCarService.fetchProfileArtifactData(
              router.locale,
              productCatalogueData?.VehicleProfileId!,
              ProfileArtifactType.VehicleProfile
            );

          // prepare explore more videos / external video links
          const externalVideos = profileArtifactType.filter((img) => {
            return img.ArtifactTypeKey === MfgImageArtifactKey.MfgVideo;
          });
          if (externalVideos && externalVideos.length > 0) {
            setExternalVideoArtifacts(externalVideos);
          }

          /* prepare sliderImages start */
          const sliderImages = profileArtifactType.filter((x) => {
            return (
              x.ArtifactUrlPath !== null &&
              x.ArtifactTypeKey !== MfgImageArtifactKey.MfgVideo &&
              x.ArtifactTypeKey !== MfgImageArtifactKey.MfgDocument
            );
          });
          setShowSliderData(sliderImages);

          //Fetch Vehicle Document(E-brochure)
          const eBrochureData = profileArtifactType.filter((img) => {
            return img.ArtifactTypeKey === MfgImageArtifactKey.MfgDocument;
          });
          if (eBrochureData && eBrochureData.length > 0) {
            setExternalVideoArtifacts(externalVideos);
          }
          setVehicleBrochureData(eBrochureData);
        }
        setVehicleItemType(ProductType.ProductCatalogue);
        setIsLoading(false);
      }
    };

    initialLoad();
    return () => {
      setVehicleItemType(undefined);
    };
  }, [router, router.locale, skewId]);

  useEffect(() => {
    if (makes?.IsAssociatedWithGGMDealer) {
      const data = CommonUtils.GetPageBreadcrumbs(PageKey.NewDetails, {
        make: vehicleListingData?.Overview?.Make || productListingData?.Make,
        model: vehicleListingData?.Overview?.Model || productListingData?.Model,
        makeKey: decodeURIComponent(String(router.query.makeKey)),
        modelKey: decodeURIComponent(String(router.query.modelKey)),
      });
      setBreadcrumbData(data);
    } else {
      const data = CommonUtils.GetPageBreadcrumbs(PageKey.NewDetailsV1, {
        make: vehicleListingData?.Overview?.Make || productListingData?.Make,
        model: vehicleListingData?.Overview?.Model || productListingData?.Model,
        makeKey: decodeURIComponent(String(router.query.makeKey)),
        modelKey: decodeURIComponent(String(router.query.modelKey)),
      });
      setBreadcrumbData(data);
    }
  }, [
    makes?.IsAssociatedWithGGMDealer,
    productListingData?.Make,
    productListingData?.Model,
    router.query.makeKey,
    router.query.modelKey,
    vehicleListingData?.Overview?.Make,
    vehicleListingData?.Overview?.Model,
    router.query,
  ]);

  if (vehicleItemType && !loading) {
    return (
      <div className="container my-6 ">
        <div>
          {(vehicleListingData || productListingData) && breadcrumbData ? (
            <div className="flex uppercase items-center gap-2 mb-4">
              <div className="flex gap-2 items-center">
                {breadcrumbData.map((x, i) => (
                  <React.Fragment key={i}>
                    <div
                      className="cursor-pointer text-primary  "
                      onClick={() => router.push(x.route)}
                    >
                      {x.label}
                    </div>
                    <div>
                      <ArrowRightIcon className="w-3 h-3 !text-primary" />
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="dark-gray1">{`${
                vehicleListingData?.Overview?.Make || productListingData?.Make
              } ${
                vehicleListingData?.Overview?.Model || productListingData?.Model
              } ${
                vehicleListingData?.Overview?.Spec || productListingData?.Trim
              } ${
                vehicleListingData?.Overview?.ModelYear ||
                productListingData?.Year
              }`}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex lg:flex-row flex-col gap-2 lg:gap-4 text-dark-gray1">
          <div className="lg:w-2/3 w-full" id={`${skewId}`}>
            {(vehicleListingData || productListingData) && (
              <>
                {showSliderData.length > 0 && (
                  <div className="pb-8">
                    <NewVehicleImageSlider
                      images={showSliderData}
                      dir={router.locale === Locales.AR ? 'rtl' : 'ltr'}
                      spinArtifactURL={spinArtifactURL}
                      type={
                        vehicleListingData?.Overview?.IsGGMDigitalDealerVehicle
                          ? 'Digital'
                          : 'IIR'
                      }
                      idDigitalDealer={
                        vehicleItemType === ProductType.ProductCatalogue
                          ? true
                          : vehicleListingData?.Overview
                              ?.IsGGMDigitalDealerVehicle || false
                      }
                      isNew={
                        vehicleItemType === ProductType.ProductCatalogue
                          ? true
                          : vehicleListingData?.Overview?.IsNew || false
                      }
                    />
                  </div>
                )}

                <div className="lg:hidden block">
                  {vehicleListingData && (
                    <VehicleInformation
                      vehicleListingData={vehicleListingData}
                    />
                  )}
                  {vehicleItemType === ProductType.ProductCatalogue && (
                    <ProductCatalogueInformation
                      productCatalogueData={productListingData}
                      VehicleListingId={VehicleListingId!}
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  {vehicleItemType === ProductType.ProductCatalogue && (
                    <ProductCatalogueOverview vehicle={productListingData!} />
                  )}
                  {vehicleListingData && (
                    <VehicleOverview vehicle={vehicleListingData} />
                  )}
                  <VehicleFeaturesAndSpecifications
                    specifications={specificationData}
                    features={featuresData}
                    setShowMoreDataModal={setShowMoreDataModal}
                  />
                  {/* VEHICLE JOURNEY */}
                  {vehicleListingData?.Overview &&
                    vehicleListingData?.Overview?.VehicleJourney && (
                      <div className="border rounded p-4 lg:p-6 mt-4 lg:mt-8">
                        <p className="text-3xl font-semibold uppercase text-primary">
                          {t(LabelConstants.VEHICLE_JOURNEY)}
                        </p>
                        <div className="flex justify-between pt-4 lg:pt-6 flex-wrap text-dark-gray1">
                          {vehicleListingData?.Overview?.VehicleJourney}
                        </div>
                      </div>
                    )}

                  {/* VEHICLE MODEL SUMMARY */}
                  {vehicleListingData?.Overview &&
                    vehicleListingData?.Overview?.ModelSummary && (
                      <div className="border rounded p-4 lg:p-6 mt-4 lg:mt-8">
                        <p className="text-3xl font-semibold uppercase text-primary">
                          {`${vehicleListingData.Overview.Make} ${t(
                            LabelConstants.SUMMARY
                          )}`}
                        </p>
                        <div className="text-dark-gray2 pt-4 lg:pt-6">
                          <span>
                            {' '}
                            {vehicleListingData?.Overview?.ModelSummary}
                          </span>
                        </div>
                      </div>
                    )}

                  {/* VEHICLE MODEL SUMMARY PRODUCT CATALOGUE */}
                  {productListingData && productListingData?.Summary && (
                    <div className="border rounded p-4 lg:p-6 mt-4 lg:mt-8">
                      <p className="text-3xl font-semibold uppercase text-primary">
                        {`${productListingData?.Make} ${t(
                          LabelConstants.SUMMARY
                        )}`}
                      </p>
                      <div className="text-dark-gray2 pt-4 lg:pt-6">
                        <span> {productListingData?.Summary}</span>
                      </div>
                    </div>
                  )}
                </div>
                <SearchFeaturesAndSpecifications
                  show={showMoreDataModal}
                  onClose={() => setShowMoreDataModal(false)}
                  features={featuresData}
                  specifications={specificationData}
                />
              </>
            )}
          </div>
          <div className="lg:w-1/3 w-full">
            <div className="lg:block hidden">
              {vehicleListingData && (
                <VehicleInformation vehicleListingData={vehicleListingData} />
              )}
              {vehicleItemType === ProductType.ProductCatalogue && (
                <ProductCatalogueInformation
                  productCatalogueData={productListingData}
                  VehicleListingId={VehicleListingId!}
                />
              )}
            </div>
            <div className="mt-8">
              {externalVideoArtifacts && externalVideoArtifacts?.length > 0 && (
                <VehicleVideos
                  externalVideoArtifacts={externalVideoArtifacts}
                />
              )}
            </div>
            <div className="mt-8">
              {vehicleBrochureData && vehicleBrochureData?.length > 0 && (
                <VehicleDocuments vehicleBrochureData={vehicleBrochureData} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default NewCarDetailsPage;

export const getServerSideProps: GetServerSideProps<NewCarPageProps> = async ({
  locale,
  query,
}: GetServerSidePropsContext) => {
  const id = query.v
    ? CommonUtils.decode<number>(String(query.v))
    : CommonUtils.decode<number>(String(query.p));

  let make: VehicleBrand | null | undefined = null;
  // fetch makes
  const makes = await NewCarService.fetchNewCarsMake(locale);
  make = makes.find(
    (x) => x.MakeKey.toLowerCase() === (query.makeKey as string)?.toLowerCase()
  );

  if (id) {
    return {
      props: {
        ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
        skewId: id,
        makes: make || null,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {
        ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      },
    };
  }
};
