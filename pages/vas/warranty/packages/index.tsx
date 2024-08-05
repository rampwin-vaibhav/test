import { AnimatePresence } from 'framer-motion';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FadeIn } from '../../../../components/common/Animations';
import { Modal, ModalBody } from '../../../../components/common/Modal';
import Spinner from '../../../../components/common/Spinner/spinner';
import { RightTickIcon, SuccessIcon } from '../../../../components/icons';
import CarIcon from '../../../../components/icons/CarIcon';
import ChevronLeftIcon from '../../../../components/icons/ChevronLeftIcon';
import EmptyPackages from '../../../../components/icons/EmptyPackages';
import GreenTickIconV2 from '../../../../components/icons/GreenTickIconV2';
import RedCrossIcon from '../../../../components/icons/RedCrossIcon';
import FilterDropDown from '../../../../components/newcars/FilterDropDown';
import AdditionalDetails from '../../../../components/VASLandingSection/WarrantyFlow/components/AdditionalDetails';
import VasService from '../../../../helpers/services/vas.service';
import { CommonUtils } from '../../../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import {
  rehydrateWarrantyState,
  setShowAdditionalInfoModal,
  updateWarrantyPackageState,
  updateWarrantyStep,
  warrantyInitialState,
  WarrantyState,
} from '../../../../lib/vas/warranty-flow/warranty.slice';
import { AppTheme } from '../../../../types/constants';
import { Locales } from '../../../../types/enums';
import {
  LabelConstants,
  WarrantyConstants,
} from '../../../../types/i18n.labels';
import { translationsLang } from '../../../../utilities/constants';

export type PackageType = {
  WarrantyPackageId: number;
  WarrantyPackageKey: string;
  DisplayName: string;
  Description: string;
  Premium: boolean;
  CoverageTypeCode: string;
  AddedBy: string;
  DecommissionedBy: string;
  SequenceNumber: string;
  StartDate: string; // Assuming ISO date string
  EndDate: string; // Assuming ISO date string
  IsPopular: boolean;
  CountryId: number;
  RegionId: number;
  CityId: number;
  StatusId: number;
  CurrencyId: number;
  CurrencyKey: string;
  Currency: string;
  WarrantyVASPackageSpecifications: {
    WarrantyPackageSpecificationId: number;
    WarrantyPackageSpecificationKey: string;
    WarrantyPackageSpecification: string;
    SortOrder: number;
    IsEnabled: boolean;
  }[];
  WarrantyVASPackageAdditionalDetails: {
    ReferenceNo: string;
    CoverageType: string;
    ExtensionName: string;
    Premium: number;
    Duration: number;
  }[];
};

const PackageSelection = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<any>();
  const [vasData, setVasData] = useState<PackageType[]>();
  const [loader, setLoader] = useState(false);
  const [alreadyWarrantyPurchased, setAlreadyWarrantyPurchased] =
    useState(false);

  const dispatch = useAppDispatch();
  const warrantySelector = useAppSelector(({ warranty }) => warranty);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('VAS Package Selection');
    }
  }, [cleverTap]);

  const query = router.query;
  useEffect(() => {
    if (query.p) {
      const rehydratedData = CommonUtils.decodeB64<WarrantyState>(
        query.p as string
      );
      dispatch(rehydrateWarrantyState(rehydratedData));
    } else {
      router.push('/vas/warranty');
    }
  }, [query, dispatch, router]);

  useEffect(() => {
    const vasData = async () => {
      setLoader(true);
      try {
        const vasPackages = await VasService.getWarrantyVASPackages({
          warrantySnapshotId: warrantySelector?.snapshotId,
          languageId: CommonUtils.getLanguageId(router.locale!),
        });
        const sortOrder: any = { Silver: 1, Platinum: 3, Gold: 2 };
        setVasData(
          vasPackages?.WarrantyVASPackages.sort(
            (a: any, b: any) =>
              sortOrder[a.WarrantyPackageKey] - sortOrder[b.WarrantyPackageKey]
          ) || []
        );
      } catch (err) {
        setVasData([]);
        toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR), {
          position: 'bottom-right',
        });
      }
      setLoader(false);
    };
    if (warrantySelector.snapshotId > 0) vasData();
  }, [dispatch, router, warrantySelector.snapshotId, t]);

  /* Vas Data and WarrantySnapshotId */

  const handleBack = () => {
    updateWarrantyStep(WarrantyConstants.EnterKmDriven);
    router.push(
      `/vas/warranty?p=${CommonUtils.encode({
        ...warrantySelector,
        showAdditionalInfoModal: false,
      })}`,
      '',
      { shallow: true }
    );
  };

  const handlePackageSelection = (chosenPackage: PackageType) => {
    dispatch(
      updateWarrantyPackageState({
        ...chosenPackage,
        WarrantyVASPackageAdditionalDetails: [
          selectedPackage ||
            chosenPackage.WarrantyVASPackageAdditionalDetails[0],
        ],
      })
    );
    dispatch(setShowAdditionalInfoModal(true));
  };

  const handleAlreadyPurchase = () => {
    router.push(
      `/vas/warranty?p=${CommonUtils.encode({
        ...warrantyInitialState,
      })}`,
      '',
      { shallow: true }
    );
  };

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{
          background:
            'linear-gradient(104.66deg, #FFFFFF 13.45%, rgba(215, 224, 255, 0.5) 44.67%, rgba(214, 75, 226, 0) 95.57%)',
        }}
      >
        <div className="lg:w-[1440px]">
          <div className="h-screen flex flex-col">
            <div className="py-6 flex items-start px-[26px]">
              {!loader && (
                <div
                  className="relative h-[20px] w-[20px] cursor-pointer mr-[12px] mt-1.5 md:mt-2.5"
                  onClick={handleBack}
                >
                  {router.locale === translationsLang.Arabic ? (
                    <ChevronLeftIcon className="" />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </div>
              )}
              {!!vasData?.length && (
                <p className="text-[20px] md:text-[36px] font-semibold">
                  {t('WarrantyPackageHeading')}
                </p>
              )}
            </div>
            {loader ? (
              <AnimatePresence>
                <FadeIn className="h-full w-full flex justify-center items-center bg-black bg-opacity-10 absolute top-0 left-0 backdrop-blur-[2px] z-10">
                  <Spinner className="!w-8 !h-8" />
                </FadeIn>
              </AnimatePresence>
            ) : (
              <div className="w-screen md:w-auto overflow-y-auto py-6 flex gap-[18px] px-[26px]">
                {!loader && (
                  <>
                    {vasData?.length ? (
                      vasData?.map((eachPackage, i: number) => (
                        <div
                          key={i}
                          className="relative flex flex-col border rounded-xl slider bg-white border-white package-shadow min-w-[300px] md:min-w-[23.31rem]"
                        >
                          {eachPackage.IsPopular ? (
                            <div className="absolute flex justify-center top-0 left-0 w-full uppercase bg-[#04AA7D] rounded-t-[12px] min-h-[24px] !text-white py-[4px]">
                              <div className="flex items-center gap-1">
                                <RightTickIcon className="w-[12px] h-[12px]" />
                                <span className="text-[12px] font-bold">
                                  {t(LabelConstants.BankApproved)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="flex items-center px-[34px] py-6 relative shadow-xl mt-[30px] gap-10">
                            <div className="flex flex-col items-start gap-1 w-full">
                              <div className="flex justify-between items-center w-full mb-[12px]">
                                <div className="flex flex-col items-start gap-1">
                                  <span className="text-dark-gray4 text-large font-bold">
                                    {eachPackage?.DisplayName}
                                  </span>
                                  <span className="text-black font-semibold">
                                    {t('SAR')}{' '}
                                    {selectedPackage?.Premium
                                      ? eachPackage.WarrantyVASPackageAdditionalDetails.find(
                                          (eachAdditionalPackage) =>
                                            eachAdditionalPackage.ExtensionName ===
                                            selectedPackage.ExtensionName
                                        )?.Premium
                                      : eachPackage
                                          .WarrantyVASPackageAdditionalDetails[0]
                                          ?.Premium}
                                    <span className="text-xs">
                                      {' '}
                                      {/* {'(' + t('INCLUSIVE_VAT') + ')'} */}
                                    </span>
                                  </span>
                                </div>
                                <div>
                                  <button
                                    className="bg-primary text-white ml-[20px] w-[114px] h-[48px] rounded-[38px] py-12px px-33px"
                                    onClick={() =>
                                      handlePackageSelection(eachPackage)
                                    }
                                  >
                                    {t('SELECT')}
                                  </button>
                                </div>
                              </div>
                              <FilterDropDown
                                optionValues={
                                  eachPackage.WarrantyVASPackageAdditionalDetails
                                }
                                selectedValue={
                                  selectedPackage
                                    ? eachPackage.WarrantyVASPackageAdditionalDetails.find(
                                        (packageDetails) =>
                                          packageDetails.ExtensionName ===
                                          selectedPackage?.ExtensionName
                                      )
                                    : eachPackage
                                        .WarrantyVASPackageAdditionalDetails[0]
                                }
                                onChange={setSelectedPackage}
                                label="ExtensionName"
                                value="ReferenceNo"
                              />
                            </div>
                          </div>
                          <div className="h-[65vh] md: flex flex-col gap-9 mx-4 pt-2 pb-36 overflow-y-scroll">
                            {eachPackage.WarrantyVASPackageSpecifications.map(
                              (eachSpecification, i: number) => (
                                <div className="flex gap-3" key={i}>
                                  <div>
                                    {eachSpecification.IsEnabled ? (
                                      <GreenTickIconV2 />
                                    ) : (
                                      <RedCrossIcon />
                                    )}
                                  </div>
                                  <div>
                                    {
                                      eachSpecification?.WarrantyPackageSpecification
                                    }
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyWarrantyPackages />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {warrantySelector.showAdditionalInfoModal && (
        <Modal
          onClose={() => dispatch(setShowAdditionalInfoModal(false))}
          show={warrantySelector.showAdditionalInfoModal}
        >
          <ModalBody>
            <AdditionalDetails
              setAlreadyWarrantyPurchased={setAlreadyWarrantyPurchased}
            />
          </ModalBody>
        </Modal>
      )}
      {alreadyWarrantyPurchased && (
        <Modal
          onClose={() => handleAlreadyPurchase()}
          show={alreadyWarrantyPurchased}
        >
          <ModalBody>
            <AlreadyWarrantyInReview />
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default PackageSelection;

const EmptyWarrantyPackages = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('No VAS Packages');
    }
  }, [cleverTap]);

  const handleSelectNewCar = () => {
    router.push(
      `/vas/warranty?p=${CommonUtils.encode({
        ...warrantyInitialState,
        isOpen: true,
      })}`,
      '',
      { shallow: true }
    );
  };
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <EmptyPackages />
        <p className="mt-[18px] text-[1.5rem] leading-8 opacity-[70%] w-[15.9rem] text-center">
          {t('NO_WARRANTY_PACKAGES')}
        </p>
        <button
          className="mt-[32px] flex items-center justify-center w-[16rem] py-[15px] px-[31px] rounded-[40px] bg-[#272727] text-white"
          onClick={handleSelectNewCar}
        >
          <CarIcon />
          <p className="ml-[8px]"> {t('SELECT_ANOTHER_CAR')}</p>
        </button>
      </div>
    </div>
  );
};

const AlreadyWarrantyInReview = () => {
  const { t } = useTranslation();
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('Already Warranty In Review');
    }
  }, [cleverTap]);
  return (
    <div className="flex flex-col justify-center items-center">
      <SuccessIcon className="!w-8 !h-8" />
      <p className="mt-[18px] text-[1.5rem] leading-8 opacity-[70%] w-[25rem] md:w-[30.9rem] text-center">
        {t('THANK_YOU_MESSAGE_FOR_WARRANTY_PURCHASE')}
      </p>
    </div>
  );
};

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
