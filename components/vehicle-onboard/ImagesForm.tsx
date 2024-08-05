import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ListingService, VehicleService } from '../../helpers/services';
import {
  ConfigurationKey,
  Locales,
  VehicleListingWorkflowNumber,
} from '../../types/enums';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import {
  ListingImageArtifact,
  VehicleListingData,
  PackageResponse,
  AllVehicleImageType,
  VinNumberData,
} from '../../types/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CircleSuccessIcon, TimeIcon, WarningIcon } from '../icons';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import {
  // VehicleRequiredImages,
  // StatusIDsAllowedForUpgrade,
  ImageCategoryKey,
} from '../../types/constants';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import MessageBox, { MessageBoxType } from '../common/MessageBox';
import FileUpload from '../common/Form/FileUpload';
import ImagePreview from './ImagePreview';
import useDisclaimerText from '../../hooks/useDisclaimerText';
import ConfigurationService from '../../helpers/services/configuration.service';

type IFormInput = {
  [x: string]: string;
};

type ImagesFormProps = {
  listingId: number | null;
  vehicleImages: Array<ListingImageArtifact>;
  setVehicleImages: (
    value: SetStateAction<Array<ListingImageArtifact>>
  ) => void;
  packageName: string | undefined;
  p_id: string;
  order_id: string;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  setIsTabValid: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
  listingData: VehicleListingData | null;
  vehicleDetails: Array<VinNumberData>;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  packageId: string | string[] | number | undefined;
  orderId: string | string[] | number | undefined;
};
const newObj = {
  ArtifactThumbnailUrl: '',
  ArtifactType: '',
  ArtifactTypeId: 0,
  ArtifactTypeKey: '',
  ArtifactUrl: null,
  ArtifactUrlPath: null,
  IsProfileImage: false,
  IsQCApproved: null,
  IsVisibleOnPortal: false,
  QCComments: null,
  VehicleListingArtifactId: 0,
  VehicleListingId: 0,
  DisplaySequence: 0,
  IsMandatoryForSelfInspection: false,
  BeforeImageReferenceId: null,
  Description: null,
  ArtifactCategory: '',
  ArtifactSubCategoryKey: 'Other',
  BodyTypeArtifactURL: null,
};

export const ImagesForm: FC<ImagesFormProps> = ({
  listingId,
  vehicleImages = [],
  setVehicleImages,
  p_id,
  order_id,
  setOpenSignInModal,
  setIsTabValid,
  packageDetails,
  listingData,
  setIsLoading,

  packageId,
  orderId,
}) => {
  const [disableValue, setDisableValue] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(10);
  const { control, handleSubmit } = useForm<IFormInput>({});
  const { t } = useTranslation();
  const router = useRouter();
  const [allVehicleImages, setAllVehicleImages] =
    useState<Array<AllVehicleImageType>>();
  const [disclaimerText] = useDisclaimerText();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initData = async () => {
      const res = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.MaxImageSizeInMB
      );
      if (parseInt(res.ConfigurationValue, 10)) {
        setFileSize(parseInt(res.ConfigurationValue, 10));
      }
    };
    initData();
  }, []);

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Upload Image Initiated
    PushDataToGTMWithSubEvents(GTMEvents.ListMyCar, GTMSubEvents.UploadImages, {
      userId: user?.UserId
        ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
        : null,
      languageId: router.locale,
    });
  }, [allVehicleImages, router.locale, setVehicleImages, vehicleImages]);

  const groupImages = (images: Array<ListingImageArtifact>) => {
    const groupByImages = images
      .filter((x) => x.ArtifactSubCategoryKey !== null)
      .reduce(
        (
          result: Array<{
            categoryKey: string;
            category: string;
            SubCategoryDisplaySequence: number | null;
            artifacts: Array<ListingImageArtifact>;
          }>,
          currentValue: ListingImageArtifact
        ) => {
          const index = result.findIndex(
            (x) => x.categoryKey === currentValue.ArtifactSubCategoryKey
          );
          if (index != -1) {
            result[index].artifacts.push(currentValue);
          } else {
            result.push({
              categoryKey: currentValue.ArtifactSubCategoryKey,
              category: currentValue.ArtifactSubCategory,
              SubCategoryDisplaySequence:
                currentValue.SubCategoryDisplaySequence,
              artifacts: [currentValue],
            });
          }
          return result;
        },

        []
      );
    const otherImagesIndex = groupByImages.findIndex(
      (x) => x.categoryKey === 'Other'
    );
    if (
      otherImagesIndex !== -1 &&
      groupByImages[otherImagesIndex].artifacts.length < 8
    ) {
      const artifacts = groupByImages[otherImagesIndex].artifacts;
      const newArtifacts = artifacts.concat(
        Array(8 - artifacts.length).fill(newObj)
      );
      groupByImages[otherImagesIndex].artifacts = newArtifacts;
    }

    return groupByImages;
  };

  useEffect(() => {
    const groupByData = groupImages(vehicleImages);
    setAllVehicleImages(JSON.parse(JSON.stringify(groupByData)));
  }, [vehicleImages]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const isQcRejectedImages = vehicleImages.filter(
      (itm) => itm.IsQCApproved === false
    );
    const selfInspectionRequiredImages = vehicleImages
      .filter((itm) => itm.IsMandatoryForSelfInspection)
      .map((x) => {
        return x.ArtifactTypeKey;
      });
    const checkImages = vehicleImages
      ?.filter((itm) =>
        selfInspectionRequiredImages.includes(itm.ArtifactTypeKey)
      )
      .every((data) => data.ArtifactUrlPath !== null);

    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      setIsLoading(true);
      // const check = vehicleImages
      //   ?.filter((itm) => VehicleRequiredImages.includes(itm.ArtifactTypeKey))
      //   .every((data) => data.ArtifactUrlPath !== null);
      if (
        // packageDetails.IsSelfListedPackage &&
        !checkImages
      ) {
        toast.warning(t(LabelConstants.UPLOAD_REQUIRED_IMAGES));
      }
      // else if (!check) {
      //   toast.warning(t(LabelConstants.UPLOAD_REQUIRED_IMAGES));
      // }
      else if (
        // packageDetails?.IsSelfListedPackage &&
        isQcRejectedImages.length > 0
      ) {
        await MessageBox.open({
          content: `${t(LabelConstants.UPDATE_QC_REJECTED_IMAGES)}`,
          type: MessageBoxType.Alert,
        });
      } else {
        router.push(
          `/vehicle-onboard/${listingId}?tab=Documents`,
          // ${
          //   p_id !== 'undefined' ? `&p_id=${p_id}&OrderItemId=${order_id}` : ''
          // }
          undefined,
          {
            shallow: true,
          }
        );
      }
    }
    setIsLoading(false);
  };

  const removeImage = async (id: number, vehicleArtifactId: number) => {
    const data = {
      VehicleListingArtifactId: vehicleArtifactId,
      VehicleListingId: listingId,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      ArtifactTypeId: id,
    };

    const res = await VehicleService.deleteImage(data);
    if (res) {
      const imageData = await ListingService.fetchListingImages(
        listingId,
        router.locale,
        listingData?.Overview.BodyTypeCode!
      );

      setVehicleImages(imageData);
      const selfInspectionRequiredImages = imageData
        .filter((itm) => itm.IsMandatoryForSelfInspection)
        .map((x) => {
          return x.ArtifactTypeKey;
        });
      const checkImages = imageData
        ?.filter((itm) =>
          selfInspectionRequiredImages.includes(itm.ArtifactTypeKey)
        )
        .every((data) => data.ArtifactUrlPath !== null);

      // const check = imageData
      //   ?.filter((itm) => VehicleRequiredImages.includes(itm.ArtifactTypeKey))
      //   .every((data) => data.ArtifactUrlPath !== null);
      if (
        // packageDetails.IsSelfListedPackage &&
        checkImages
      ) {
        setIsTabValid(true);
      }
      // else if (check) {
      //   setIsTabValid(true);
      // }
      else {
        setIsTabValid(false);
      }
    } else {
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
    }
  };

  const handleImageUpload = async (
    e: File,
    id: number,
    vehicleListingArtifactId: number,
    artifactKey: string
  ) => {
    setDisableValue(true);
    const imageName = e.name;
    const imageBase = await CommonUtils.convertBase64(e);
    const mediaType = e && e.type.toLowerCase();
    const allowedImageSize = fileSize * 1048576;
    // if (
    //   listingData?.Overview.VehicleListingWorkflowNumber! ===
    //   VehicleListingWorkflowNumber.QCRequestForAChange
    //   // &&
    //   // !packageDetails.IsSelfListedPackage
    // ) {
    //   toast.error(t(LabelConstants.YOU_CANNOT_PERFORM_ACTION_MSG));
    // } else {
    if (e.size > allowedImageSize) {
      toast.warning(
        t(LabelConstants.FILE_SIZE_EXCEEDS, {
          FileSize: fileSize,
        })
      );
      setDisableValue(false);
    } else if (
      mediaType !== 'image/jpeg' &&
      mediaType !== 'image/png' &&
      mediaType !== 'image/jpg'
    ) {
      toast.warning(t(LabelConstants.SELECT_JPEG_OR_PNG_IMAGE));
      setDisableValue(false);
    } else {
      const data = {
        VehicleListingId: listingId,
        ArtifactTypeId: id,
        FileName: imageName,
        FileData: imageBase,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        VehicleListingArtifactId:
          vehicleListingArtifactId !== 0 ? vehicleListingArtifactId : 0,
      };
      try {
        const res = await VehicleService.uploadImage(data);
        if (res) {
          const imageData = await ListingService.fetchListingImages(
            listingId,
            router.locale,
            listingData?.Overview.BodyTypeCode!
          );
          setVehicleImages(imageData);
          const selfInspectionRequiredImages = imageData
            .filter((itm) => itm.IsMandatoryForSelfInspection)
            .map((x) => {
              return x.ArtifactTypeKey;
            });
          const checkImages = imageData
            ?.filter((itm) =>
              selfInspectionRequiredImages.includes(itm.ArtifactTypeKey)
            )
            .every((data) => data.ArtifactUrlPath !== null);
          // const check = imageData
          //   ?.filter((itm) =>
          //     VehicleRequiredImages.includes(itm.ArtifactTypeKey)
          //   )
          //   .every((data) => data.ArtifactUrlPath !== null);
          if (
            // packageDetails.IsSelfListedPackage &&

            checkImages
          ) {
            setIsTabValid(true);
          }
          //  else if (check) {
          //   setIsTabValid(true);
          // }
          else {
            setIsTabValid(false);
          }
          let imageObject: ListingImageArtifact | undefined;
          if (artifactKey === 'Other') {
            imageObject = imageData.find((x) => {
              if (x.VehicleListingArtifactId === res) {
                return x.ArtifactUrlPath;
              }
            });
          } else {
            imageObject = imageData.find((x) => {
              if (x.ArtifactTypeId === id) {
                return x.ArtifactUrlPath;
              }
            });
          }

          setDisableValue(false);
          return imageObject?.ArtifactUrlPath
            ? imageObject?.ArtifactUrlPath
            : '';
        } else {
          setDisableValue(false);
        }
      } catch (err) {
        const user = SessionUtils.getUserDetails();

        //Added GTM event for List My Car Error
        PushDataToGTMWithSubEvents(
          GTMEvents.ListMyCar,
          GTMSubEvents.ListMyCarError,
          {
            userId: user?.UserId
              ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
              : null,
            languageId: router.locale,
          }
        );
        setDisableValue(false);
      }
    }
    // }
  };

  return (
    <div className="mb-10 image-form-tab container lg:!px-52">
      {/* {packageDetails?.DisplayName && (
        <div className="flex items-center justify-between">
          <div className="text-gradient text-2xl font-bold">
            {router.locale === Locales.EN
              ? `${packageDetails?.DisplayName} ${t(LabelConstants.PACKAGE)}`
              : `${t(LabelConstants.PACKAGE)} ${packageDetails?.DisplayName}`}
          </div>
          {(listingId
            ? listingData?.Overview.IsEligibleForUpgrade
            : packageDetails.IsSelfListedPackage) &&
            listingData?.Overview.VehicleListingStatusID &&
            StatusIDsAllowedForUpgrade.includes(
              listingData?.Overview.VehicleListingStatusID
            ) && (
              <button
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
      {/* <h1 className="mt-16 mb-4 text-base text-primary leading-5">
        {disclaimerText[CMSConstants.UploadImageNote]}
      </h1> */}
      <form id="image-form" onSubmit={handleSubmit(onSubmit)}>
        {allVehicleImages
          ?.sort(
            (y, z) =>
              y.SubCategoryDisplaySequence! - z.SubCategoryDisplaySequence!
          )
          .map((x, index) => (
            <div key={index}>
              <div className="flex gap-2 items-center font-bold text-xl text-dark-gray1 mt-12 mb-4">
                {x.categoryKey === ImageCategoryKey.Other ? (
                  <CircleSuccessIcon className="h-8 w-8" />
                ) : x.artifacts.filter((x) => x.ArtifactUrlPath === null)
                    .length > 0 ? (
                  <TimeIcon className="h-8 w-8" />
                ) : (
                  <CircleSuccessIcon className="h-8 w-8" />
                )}
                <h1>{x.category}</h1>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-16">
                {x.artifacts &&
                  x.artifacts.length > 0 &&
                  x.artifacts
                    .sort((p, q) => p.DisplaySequence! - q.DisplaySequence!)
                    .map((itm: any, index: number) => {
                      let loadFileUpload = false;
                      let showArtifactTypeLabel;
                      if (x.categoryKey === 'Other') {
                        showArtifactTypeLabel = itm.ArtifactUrlPath
                          ? true
                          : false;
                      } else {
                        showArtifactTypeLabel = true;
                      }

                      if (x.categoryKey === 'Other') {
                        loadFileUpload =
                          index === 0 ||
                          itm.ArtifactUrlPath ||
                          (index > 0 && x.artifacts[index - 1].ArtifactUrlPath);
                      } else {
                        loadFileUpload =
                          itm.DisplaySequence !== null ||
                          itm.VehicleListingArtifactId !== 0;
                      }

                      if (!loadFileUpload) return null;
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center gap-2"
                        >
                          <label className="image-upload-box">
                            <FileUpload
                              control={control}
                              name={`vehicleImage${itm.ArtifactTypeId}`}
                              defaultValue={
                                itm.ArtifactUrlPath ? itm.ArtifactUrlPath : ''
                              }
                              onChange={async (status, files) => {
                                let url: string | undefined = '';
                                if (files && status === 'UPLOADED') {
                                  url = await handleImageUpload(
                                    files[0],
                                    itm.ArtifactTypeId,
                                    itm.VehicleListingArtifactId,
                                    itm.ArtifactSubCategoryKey
                                  );
                                } else if (status === 'REMOVED') {
                                  await removeImage(
                                    itm.ArtifactTypeId,
                                    itm.VehicleListingArtifactId
                                  );
                                }

                                return url ? url : '';
                              }}
                            >
                              {(fileProps) => {
                                return (
                                  <ImagePreview
                                    {...fileProps}
                                    disabled={
                                      (listingData?.Overview
                                        .VehicleListingWorkflowNumber! >
                                        VehicleListingWorkflowNumber.InspectionReady &&
                                        !(
                                          // packageDetails?.IsSelfListedPackage &&
                                          (
                                            listingData?.Overview
                                              .VehicleListingWorkflowNumber! ===
                                            VehicleListingWorkflowNumber.QCRequestForAChange
                                          )
                                        )) ||
                                      disableValue
                                      //  ||
                                      //  packageDetails?.IsSelfListedPackage
                                    }
                                    wireFrameUrl={itm.BodyTypeArtifactURL}
                                    inValidImage={
                                      itm?.IsQCApproved === false
                                      // &&
                                      // !packageDetails?.IsSelfListedPackage
                                    }
                                  />
                                );
                              }}
                            </FileUpload>
                          </label>
                          <p className="text-xl text-center">
                            {showArtifactTypeLabel && itm.ArtifactType}
                            {
                              // packageDetails?.IsSelfListedPackage &&
                              itm?.IsMandatoryForSelfInspection ? (
                                <span title={t(LabelConstants.REQUIRED_FIELD)}>
                                  *
                                </span>
                              ) : (
                                ''
                              )
                            }
                          </p>
                          {itm.QCComments && (
                            // !packageDetails?.IsSelfListedPackage &&
                            <div className="flex flex-wrap justify-center w-44 items-center">
                              <WarningIcon className="h-3 w-3" />
                              <p
                                className="pl-1 text-error whitespace-nowrap overflow-hidden text-ellipsis"
                                title={itm.QCComments}
                              >
                                {itm.QCComments}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
              </div>
            </div>
          ))}
      </form>
      <div className="flex justify-end">
        <p className="mt-20 tracking-wide text-sm text-center">
          {t(LabelConstants.JPEG_PNG_JPG_FILES_ALLOWED, {
            FileSize: fileSize,
          })}
        </p>
      </div>
      <div className="flex justify-end mt-20">
        <button
          type="submit"
          className="btn btn-primary uppercase"
          form="image-form"
        >
          {t(LabelConstants.NEXT)}
        </button>
      </div>
    </div>
  );
};
