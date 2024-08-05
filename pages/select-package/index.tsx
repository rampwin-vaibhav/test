import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  CrossIcon,
  NextIcon,
  PrevIcon,
  SuccessIcon,
} from '../../components/icons';
import { ListingService, PackageSubscription } from '../../helpers/services';
import { CommonUtils, formatNumber } from '../../helpers/utilities';
import {
  Locales,
  ProductReferenceType,
  ServiceParameterValue,
} from '../../types/enums';
import SignInModal from '../../components/common/SignInModal';
import { SessionUtils } from '../../helpers/utilities';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import {
  B2CPackages,
  RemoveCartPayload,
  RemoveCartResponse,
  Services,
  UpgradePackage,
} from '../../types/models';
import { toast } from 'react-toastify';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../../components/common/MessageBox';
import useDisclaimerText from '../../hooks/useDisclaimerText';
import { Modal, ModalBody, ModalSize } from '../../components/common/Modal';

const Packages: NextPage = ({}: InferGetStaticPropsType<
  typeof getStaticProps
>) => {
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const [b2cPackages, setB2CPackages] = useState<Array<B2CPackages>>([]);
  const [slideLeft, setSlideLeft] = useState(0);
  const [displayIcons, setDisplayIcons] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [eligiblePackage, setEligiblePackage] = useState<UpgradePackage[]>([]);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [packageId, setPackageId] = useState<number | null>(null);
  const [disclaimerText] = useDisclaimerText();
  const tableRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const initialLoad = async () => {
      let packagesData = await ListingService.fetchB2CPackages(router.locale);
      setB2CPackages(packagesData);
      if (router.query.CurrentPackageId) {
        const newArr = packagesData.filter(
          (x) =>
            x.B2CPackageId === parseInt(router.query.CurrentPackageId as any)
        )[0].UpgradePackage;
        setEligiblePackage(newArr);
      }
    };
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale, router.query.CurrentPackageId]);

  const services: Array<Services> =
    b2cPackages[0] && b2cPackages[0].Service.length > 0
      ? b2cPackages[0].Service
      : [];

  const sortedServices = [...services]
    .filter((x) => !x.IsVAS)
    .sort((a, b) => a.ServiceSequenceNumber - b.ServiceSequenceNumber);

  const sortedPackages = [...b2cPackages].sort(
    (x, y) => x.SequenceNumber - y.SequenceNumber
  );

  const handleSelect = async (id: number) => {
    setPackageId(id);
    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      setBtnDisabled(true);
      const cartData = await PackageSubscription.getShoppingCart(router.locale);
      const packageData = cartData?.Data?.CartItems.filter((x) => {
        return x.CartItemType === ProductReferenceType.B2CPackage; // write package logic
      });
      setBtnDisabled(false);
      // if user is upgrading the package
      if (router.query.IsUpgradePackage) {
        const payload = {
          ProductReferenceType: ProductReferenceType.B2CPackage,
          ProductReferenceId: id,
          CurrentPackageId: router.query.CurrentPackageId,
          IsUpgradePackage: true,
          OrderItemId: router.query.OrderItemId,
        };
        if (packageData?.length > 0) {
          const result = await MessageBox.open({
            content: (
              <div className="text-lg">
                {t(LabelConstants.DO_YOU_WISH_MESSAGE)}
              </div>
            ),
            type: MessageBoxType.Confirmation,
          });
          if (result === MessageBoxResult.Yes) {
            const deletePayload: RemoveCartPayload = {
              ShoppingCartId: packageData[0].ShoppingCartId,
              ShoppingCartItemId: packageData[0].ShoppingCartItemId,
              LanguageId: CommonUtils.getLanguageId(router.locale!),
            };
            const deleteRes: RemoveCartResponse =
              await PackageSubscription.removeCart(deletePayload);
            if (deleteRes.IsSuccess) {
              const res = await ListingService.addToCart(payload);
              if (res.MessageCode === 'DUPLICATE_ITEM_FOUND') {
                return await MessageBox.open({
                  content: `${t(
                    LabelConstants.ERR_DUPLICATE_SHOPPING_CART_ITEM
                  )}`,
                  type: MessageBoxType.Message,
                });
              }
              if (res.MessageCode === 'SHOPPIONG_CARD_CONTAINS_ANOTHER_ITEM') {
                return setShowValidationModal(true);
              }
              if (res.MessageCode === 'NOT_ABLE_TO_ADD_ITEM') {
                return await MessageBox.open({
                  content: `${t(
                    LabelConstants.ERR_ZERO_PRICE_SHOPPING_CART_ITEM
                  )}`,
                  type: MessageBoxType.Message,
                });
              }
              if (res.IsSuccess) {
                router.push('/cart');
              } else {
                toast.warning(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
              }
            }
          }
        } else {
          const res = await ListingService.addToCart(payload);
          if (res.MessageCode === 'DUPLICATE_ITEM_FOUND') {
            return await MessageBox.open({
              content: `${t(LabelConstants.ERR_DUPLICATE_SHOPPING_CART_ITEM)}`,
              type: MessageBoxType.Message,
            });
          }
          if (res.MessageCode === 'SHOPPIONG_CARD_CONTAINS_ANOTHER_ITEM') {
            return setShowValidationModal(true);
          }
          if (res.MessageCode === 'NOT_ABLE_TO_ADD_ITEM') {
            return await MessageBox.open({
              content: `${t(LabelConstants.ERR_ZERO_PRICE_SHOPPING_CART_ITEM)}`,
              type: MessageBoxType.Message,
            });
          }
          if (res.IsSuccess) {
            router.push('/cart');
          } else {
            toast.warning(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
          }
        }
      } else {
        if (packageData?.length > 0) {
          const result = await MessageBox.open({
            content: (
              <div className="text-lg">
                {t(LabelConstants.VISIT_SHOPPING_CART)}
              </div>
            ),
            type: MessageBoxType.Confirmation,
          });
          if (result === MessageBoxResult.Yes) {
            router.push('/cart');
          }
        } else {
          const payload = {
            ProductReferenceType: ProductReferenceType.B2CPackage,
            ProductReferenceId: id,
          };
          //As per urgent requirement from GGM we have removed purchase eligibility check
          // const response =
          //   await ListingService.getValidatePurchaseEligibility();
          // if (response) {
          const res = await ListingService.addToCart(payload);
          if (res.MessageCode === 'DUPLICATE_ITEM_FOUND') {
            return await MessageBox.open({
              content: `${t(LabelConstants.ERR_DUPLICATE_SHOPPING_CART_ITEM)}`,
              type: MessageBoxType.Message,
            });
          }
          if (res.MessageCode === 'SHOPPIONG_CARD_CONTAINS_ANOTHER_ITEM') {
            return setShowValidationModal(true);
          }
          if (res.MessageCode === 'NOT_ABLE_TO_ADD_ITEM') {
            return await MessageBox.open({
              content: `${t(LabelConstants.ERR_ZERO_PRICE_SHOPPING_CART_ITEM)}`,
              type: MessageBoxType.Message,
            });
          }
          if (res.IsSuccess) {
            router.push('/cart');
          } else {
            toast.warning(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
          }
        }
        // } else {
        //   const result = await MessageBox.open({
        //     content: (
        //       <div className="text-lg">
        //         {t(LabelConstants.ELIGIBILITY_TEXT)}
        //       </div>
        //     ),
        //     type: MessageBoxType.Confirmation,
        //   });
        //   if (result === MessageBoxResult.Yes) {
        //     router.push('/my-orders');
        //   }
        // }
      }

      setBtnDisabled(false);
    }
  };

  const getConfigurationName = (displayText: string, isDisabled: boolean) => {
    if (
      displayText.toUpperCase() === ServiceParameterValue.Full ||
      displayText.toUpperCase() === ''
    ) {
      return (
        <div className="flex items-center justify-center h-full py-2">
          <SuccessIcon
            className={`w-5 h-5 ${
              isDisabled ? 'text-dark-gray2' : ' text-green-500'
            }`}
          />
        </div>
      );
    } else if (displayText === null) {
      return (
        <div className="flex items-center justify-center h-full py-2">
          <CrossIcon className="w-5 h-5 " />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-full text-center py-2">
          {displayText}
        </div>
      );
    }
  };

  const handleNext = (offset: any) => {
    if (tableRef.current) {
      tableRef.current.scrollLeft += offset;
      setSlideLeft((tableRef.current.scrollLeft += offset));
    }
  };

  const handlePrev = (offset: any) => {
    if (tableRef.current) {
      tableRef.current.scrollLeft += offset;
      setSlideLeft((tableRef.current.scrollLeft += offset));
    }
  };

  useEffect(() => {
    if (tableRef?.current) {
      if (tableRef.current?.scrollWidth > tableRef.current?.clientWidth) {
        setDisplayIcons(true);
      } else {
        setDisplayIcons(false);
      }
    }
  }, [tableRef, sortedPackages]);
  const handleReplaceItem = async () => {
    //if user is upgrading the package
    if (router.query.IsUpgradePackage) {
      const payload = {
        ProductReferenceType: ProductReferenceType.B2CPackage,
        ProductReferenceId: packageId,
        CurrentPackageId: router.query.CurrentPackageId,
        IsUpgradePackage: true,
        OrderItemId: router.query.OrderItemId,
        IsAllowToProceed: true,
      };
      const res = await ListingService.addToCart(payload);
      if (res.IsSuccess) {
        router.push('/cart');
      } else {
        toast.warning(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
      }
    } else {
      const payload = {
        ProductReferenceType: ProductReferenceType.B2CPackage,
        ProductReferenceId: packageId,
        IsAllowToProceed: true,
      };
      const res = await ListingService.addToCart(payload);
      if (res.IsSuccess) {
        router.push('/cart');
      } else {
        toast.warning(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
      }
    }
  };

  return (
    <>
      <div className="ltr:pl-[1.25rem] ltr:lg:pl-[6.25rem] rtl:pr-[1.25rem] rtl:lg:pr-[6.25rem] pt-[2.75rem] pb-[5.438rem] gogo-packages">
        {sortedPackages && sortedPackages.length > 0 && (
          <>
            <div className="flex items-center justify-between text-3xl gap-2 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-11 w-11 border-[0.25rem]  border-primary rounded-full text-heading6 font-bold text-selection">
                  {t(LabelConstants.NUM_1)}
                </div>
                <div className="text-primary">
                  {t(LabelConstants.SELECT_PACKAGE)}
                </div>
              </div>
            </div>
            <div className="relative show-buttons">
              {displayIcons && (
                <div
                  onClick={() => {
                    if (window.innerWidth < 768 && window.innerWidth > 640) {
                      handlePrev(-200);
                    } else if (window.innerWidth < 640) {
                      handlePrev(-150);
                    } else {
                      handlePrev(-500);
                    }
                  }}
                  className={`${
                    slideLeft > 0 ? 'ltr:block ' : 'ltr:!hidden'
                  } hide-button absolute top-[45%] ltr:left-[16rem] ltr:md:left-[19rem] ltr:lg:left-[23rem] rtl:left-[0rem] z-10`}
                >
                  <div>
                    <PrevIcon className="icon cursor-pointer h-10 w-10" />
                  </div>
                </div>
              )}
              <div
                className="flex flex-row mt-10  overflow-x-auto scroll-smooth hide-scroll relative "
                ref={tableRef}
              >
                <div className={`flex flex-col relative`}>
                  <div className={`flex flex-row w-full`}>
                    <div className="sticky-col flex justify-start ">
                      <div className="flex flex-col text-heading6 font-bold border-b ltr:border-r rtl:border-l  md:w-[17rem] lg:w-[20.25rem] min-w-[12.5rem]">
                        <div className="h-[1.875rem]"></div>
                        <div className="h-full">
                          <div className="h-[3.75rem]"></div>
                          <div className="text-[1.625rem] font-bold py-8 gap-2">
                            {t(LabelConstants.PACKAGE_BENEFIT)}
                          </div>
                        </div>
                      </div>
                      <div className="w-[1.5rem] md:left-[17rem] lg:left-[20.25rem] sticky"></div>
                    </div>

                    {sortedPackages &&
                      sortedPackages.map((data, index) => {
                        let isDisabled = null;
                        let currentID = parseInt(
                          router.query.CurrentPackageId as any
                        );
                        if (eligiblePackage.length > 0) {
                          if (data.B2CPackageId === currentID) {
                            isDisabled = true;
                          } else {
                            isDisabled = false;
                          }
                        }

                        return (
                          <>
                            <div
                              key={index}
                              className={`flex flex-col md:w-[17rem] lg:w-[20.25rem] min-w-[12.5rem]`}
                            >
                              {data.IsRecommended ? (
                                <div className="h-[1.875rem] bg-gradient-recommended !border-0 flex justify-center items-center">
                                  {t(LabelConstants.MOST_RECOMMENDED)}
                                </div>
                              ) : (
                                <div className="h-[1.875rem] "></div>
                              )}
                              <div
                                className={`md:w-[17rem] lg:w-[20.25rem] min-w-[12.5rem] h-full 
                                 
                                `}
                              >
                                <div
                                  className={`border border-t-0 border-b-0 h-full ${
                                    data.IsRecommended && 'border-x-selection'
                                  }`}
                                >
                                  <div className="relative">
                                    <div
                                      style={{
                                        backgroundColor: isDisabled
                                          ? '#D3D3D3'
                                          : data.PackageColor
                                          ? data.PackageColor
                                          : '#a9a9a9',
                                      }}
                                      className={`${
                                        data.IsRecommended && 'package-shadow'
                                      } text-3xl  flex items-center justify-center h-[3.75rem] ${
                                        isDisabled
                                          ? 'text-dark-gray2'
                                          : 'text-white'
                                      }`}
                                    >
                                      {data.DisplayName}
                                    </div>
                                    {data.IsRecommended && (
                                      <div className="flex justify-center absolute top-0 w-full">
                                        <span className="triangle"></span>
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    className={`text-3xl font-bold py-6 gap-2 ${
                                      isDisabled ? 'text-dark-gray2' : ''
                                    }`}
                                  >
                                    {Number(data.DisplayPrice) === 0 ||
                                    data.DisplayPrice === null ? (
                                      <div className="flex justify-center items-center text-center">
                                        {t(LabelConstants.COMING_SOON)}
                                      </div>
                                    ) : (
                                      <>
                                        <div
                                          className="flex justify-center items-center text-center flex-wrap gap-1 px-1"
                                          dir="ltr"
                                        >
                                          <div>{t(LabelConstants.SAR)}</div>
                                          <div>
                                            {formatNumber(data.DisplayPrice)}
                                          </div>
                                        </div>
                                        <div className="flex justify-center items-center text-base mt-1">
                                          {t(LabelConstants.INCLUSIVE_VAT)}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                  {sortedServices &&
                    sortedServices.map((data, index) => {
                      return (
                        <>
                          <div className="flex">
                            <div className="flex sticky-col">
                              <div
                                className={`${
                                  sortedServices.length == index + 1 &&
                                  '!border-b-0'
                                } w-[12.5rem] md:w-[17rem] lg:w-[20.25rem] min-w-[12.5rem]  border-b-2 ltr:border-r rtl:border-l min-h-[3.125rem] flex items-center `}
                              >
                                <div className="font-bold py-2">
                                  {data.DisplayName}
                                </div>
                              </div>
                              <div className="w-[1.5rem] md:left-[17rem] lg:left-[20.25rem] sticky"></div>
                            </div>
                            <div
                              className={`flex flex-row min-h-[3.125rem]`}
                              key={index}
                            >
                              {sortedPackages &&
                                sortedPackages.map((i, r) => {
                                  let isDisabled: any = null;
                                  let currentID = parseInt(
                                    router.query.CurrentPackageId as any
                                  );
                                  if (eligiblePackage.length > 0) {
                                    if (i.B2CPackageId === currentID) {
                                      isDisabled = true;
                                    } else {
                                      isDisabled = false;
                                    }
                                  }
                                  return (
                                    <>
                                      <div
                                        className={`flex flex-col md:w-[17rem] lg:w-[20.25rem] min-w-[12.5rem] ${
                                          isDisabled ? 'text-dark-gray2' : ''
                                        }`}
                                        key={i.B2CPackageId}
                                      >
                                        <div
                                          className={`font-bold h-full ${
                                            i.IsRecommended
                                              ? 'border !border-x-selection'
                                              : 'border'
                                          } ${
                                            index + 1 ==
                                              sortedServices.length &&
                                            i.IsRecommended &&
                                            'border-b-selection'
                                          }`}
                                        >
                                          {i.Service &&
                                            i.Service.filter(
                                              (x) =>
                                                x.ReferenceCode ===
                                                data.ReferenceCode
                                            ).map((y, s) => {
                                              return (
                                                <>
                                                  {y?.ServiceAttribute[0] ? (
                                                    getConfigurationName(
                                                      y.ServiceAttribute[0]
                                                        .ServiceAttributeDisplayText,
                                                      isDisabled
                                                    )
                                                  ) : (
                                                    <div
                                                      className="flex items-center justify-center h-full py-2"
                                                      key={y.ServiceId}
                                                    >
                                                      <CrossIcon className="w-5 h-5" />
                                                    </div>
                                                  )}
                                                </>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                            </div>
                          </div>
                        </>
                      );
                    })}

                  <div className="flex flex-row">
                    <div className="flex sticky-col">
                      <div className="md:w-[17rem] lg:w-[20.25rem] min-w-[12.5rem] h-[4rem] sm:min-h-[3.125rem] ltr:border-r rtl:border-l"></div>
                      <div className="w-[1.5rem] md:left-[17rem] lg:left-[20.25rem] sticky"></div>
                    </div>
                    {sortedPackages &&
                      sortedPackages.map((i, r) => {
                        let isDisabled = null;
                        let isUpgraded = null;
                        let currentID = parseInt(
                          router.query.CurrentPackageId as any
                        );

                        if (eligiblePackage.length > 0) {
                          if (i.B2CPackageId === currentID) {
                            isDisabled = true;
                          } else {
                            if (
                              eligiblePackage?.filter(
                                (x) => x.B2CPackageId === i.B2CPackageId
                              ).length > 0
                            ) {
                              isUpgraded = true;
                            } else {
                              isUpgraded = false;
                              isDisabled = true;
                            }
                          }
                        }

                        return (
                          <>
                            <div
                              className={`flex items-center justify-center md:w-[17rem] lg:w-[20.25rem] min-w-[12.5rem]  mt-6 `}
                            >
                              <button
                                className={`btn ${
                                  i.IsRecommended
                                    ? ' diamond-select'
                                    : 'platinum-select'
                                } uppercase`}
                                onClick={() => handleSelect(i.B2CPackageId)}
                                disabled={
                                  isDisabled || isUpgraded === false
                                    ? true
                                    : Number(i.DisplayPrice) === 0 ||
                                      i.DisplayPrice === null
                                    ? true
                                    : btnDisabled
                                    ? true
                                    : false
                                }
                              >
                                {router.query.CurrentPackageId
                                  ? t(LabelConstants.SELECT_DROPDOWN_LITERAL)
                                  : t(LabelConstants.GO_GET_STARTED)}
                              </button>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
              {displayIcons && (
                <div
                  onClick={() => {
                    if (window.innerWidth < 768 && window.innerWidth > 640) {
                      handleNext(200);
                    } else if (window.innerWidth < 640) {
                      handleNext(150);
                    } else {
                      handleNext(500);
                    }
                  }}
                  className={`${
                    slideLeft < 0 ? 'rtl:block' : 'rtl:!hidden'
                  } hide-button absolute top-[45%] ltr:right-0 rtl:right-[16rem] rtl:md:right-[19rem] rtl:lg:right-[23rem] z-10`}
                >
                  <div>
                    <NextIcon className="icon cursor-pointer h-10 w-10" />
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex flex-col gap-y-4 py-3 px-5 mt-[3.125rem]">
              <h1 className="mt-16 mb-4 text-base text-primary leading-5">
                {`${t(LabelConstants.DISCLAIMER)}: ${
                  disclaimerText[CMSConstants.ONBOARD_VEHICLE]
                }`}
              </h1>

              <div className="font-bold text-xl">{`${t(
                LabelConstants.NOTES
              )}: `}</div>
              <div>
                <h1 className="text-base">
                  1. {t(LabelConstants.VEHICLE_PICKUP_DROP)}
                </h1>
                <h1 className="text-base">
                  2. {t(LabelConstants.PHOTO_SHOOT_TEXT)}
                </h1>
                <h1 className="text-base">
                  3. {t(LabelConstants.VEHICLE_LISTING_QUALITY_CONTROL)}
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Sign In Modal */}
      <SignInModal
        show={openSignInModal}
        onClose={() => {
          setOpenSignInModal(false);
          router.push('/');
        }}
      />
      <Modal
        show={showValidationModal}
        onClose={() => {
          setShowValidationModal(false);
        }}
        size={ModalSize.MEDIUM}
      >
        <ModalBody>
          <div className="flex flex-col flex-wrap gap-8">
            <h1 className="text-large leading-7">{`${t(
              LabelConstants.EXISTING_ITEM_MESSAGE
            )}`}</h1>
            <div className="flex items-center justify-center gap-4">
              <button
                className="btn btn-secondary uppercase btn-modal"
                onClick={() => setShowValidationModal(false)}
              >
                {t(LabelConstants.NO)}
              </button>
              <button
                className="btn btn-primary uppercase btn-modal"
                onClick={() => handleReplaceItem()}
              >
                {t(LabelConstants.REPLACE)}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Packages;
export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
