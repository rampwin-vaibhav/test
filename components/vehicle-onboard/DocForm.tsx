import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ListingService, VehicleService } from '../../helpers/services';
import {
  InsuranceArtifacts,
  VehicleRequiredDocs,
  StatusIDsAllowedForUpgrade,
} from '../../types/constants';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import {
  ListingImageArtifact,
  PackageResponse,
  UploadImagePayload,
  VehicleListingData,
} from '../../types/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import {
  ConfigurationKey,
  Locales,
  VehicleListingWorkflowNumber,
} from '../../types/enums';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import DocPreview from './DocPreview';
import FileUpload from '../common/Form/FileUpload';
import useDisclaimerText from '../../hooks/useDisclaimerText';
import ConfigurationService from '../../helpers/services/configuration.service';
import MessageBox, { MessageBoxType } from '../common/MessageBox';
type IFormInput = {
  [x: string]: string;
};

type DocFormProps = {
  listingId: number | null;
  listingData: VehicleListingData | null;
  vehicleDoc: Array<ListingImageArtifact>;
  setVehicleDoc: (value: SetStateAction<Array<ListingImageArtifact>>) => void;
  packageName: string | undefined;
  p_id: string;
  order_id: string;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  setIsTabValid: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  packageId: string | string[] | number | undefined;
  orderId: string | string[] | number | undefined;
};
export const DocForm: FC<DocFormProps> = ({
  listingId,
  listingData,
  vehicleDoc = [],
  setVehicleDoc,
  p_id,
  order_id,
  setOpenSignInModal,
  setIsTabValid,
  packageDetails,
  setIsLoading,
  packageId,
  orderId,
}) => {
  const { control, handleSubmit } = useForm<IFormInput>({});
  const { t } = useTranslation();
  const router = useRouter();
  const [fileSize, setFileSize] = useState<number>(10);
  const [disclaimerText] = useDisclaimerText();
  const [documents, setDocuments] = useState<
    Array<{
      hasMultipleChoice: boolean;
      artifacts: Array<ListingImageArtifact>;
      displaySequence: number | null;
    }>
  >([]);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string>(
    InsuranceArtifacts[0]
  );

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
    let filterData: any = [];
    if (listingData?.Overview.OutstandingFinance) {
      filterData = vehicleDoc?.filter((itm) =>
        VehicleRequiredDocs.includes(itm.ArtifactTypeKey)
      );
    } else {
      filterData = vehicleDoc?.filter(
        (itm) => itm.ArtifactTypeKey === VehicleRequiredDocs[0]
      );
    }
    var check = filterData?.every(
      (data: any) =>
        data.VehicleListingArtifactId !== 0 &&
        data.VehicleListingArtifactId !== null
    );
    if (check) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [listingData, vehicleDoc, setIsTabValid]);

  useEffect(() => {
    const docs = vehicleDoc.reduce(
      (
        r: Array<{
          hasMultipleChoice: boolean;
          artifacts: Array<ListingImageArtifact>;
          displaySequence: number | null;
        }>,
        c
      ) => {
        if (InsuranceArtifacts.includes(c.ArtifactTypeKey)) {
          const index = r.findIndex((x) =>
            x.artifacts.some((y) =>
              InsuranceArtifacts.includes(y.ArtifactTypeKey)
            )
          );
          if (index !== -1) {
            r[index].artifacts.push(c);
          } else {
            r.push({
              hasMultipleChoice: true,
              artifacts: [c],
              displaySequence: c.DisplaySequence!,
            });
          }
        } else {
          r.push({
            hasMultipleChoice: false,
            artifacts: [c],
            displaySequence: c.DisplaySequence!,
          });
        }

        return r;
      },
      []
    );
    const uploadedInsuranceArtifact = vehicleDoc.find(
      (x) =>
        InsuranceArtifacts.includes(x.ArtifactTypeKey) &&
        x.VehicleListingArtifactId !== 0
    );
    if (uploadedInsuranceArtifact) {
      setSelectedInsuranceType(uploadedInsuranceArtifact.ArtifactTypeKey);
    } else {
      setSelectedInsuranceType(selectedInsuranceType);
    }
    setDocuments(docs);
  }, [selectedInsuranceType, vehicleDoc]);

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Upload Docs Initiated
    PushDataToGTMWithSubEvents(GTMEvents.ListMyCar, GTMSubEvents.UploadDocs, {
      userId: user?.UserId
        ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
        : null,
      languageId: router.locale,
    });
  }, [router.locale]);

  const removeImage = async (id: number, vehicleArtifactId: number) => {
    const data = {
      VehicleListingArtifactId: vehicleArtifactId,
      VehicleListingId: listingId,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      ArtifactTypeId: id,
    };

    const res = await VehicleService.deleteImage(data);
    if (res) {
      const imageData = await ListingService.fetchListingDocuments(
        listingId,
        router.locale
      );
      setVehicleDoc(imageData);
    } else {
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
    }
  };

  const handleImageUpload = async (
    e: File,
    id: number,
    vehicleListingArtifactId: number
  ) => {
    const imageName = e.name;
    const imageBase = await CommonUtils.convertBase64(e);
    const mediaType = e && e.type.toLowerCase();
    const allowedImageSize = fileSize * 1048576;
    if (e.size > allowedImageSize) {
      toast.warning(
        t(LabelConstants.FILE_SIZE_EXCEEDS, {
          FileSize: fileSize,
        })
      );
    } else if (
      mediaType !== 'image/jpeg' &&
      mediaType !== 'image/png' &&
      mediaType !== 'image/jpg' &&
      mediaType !== 'application/pdf'
    ) {
      toast.warning(t(LabelConstants.IMAGE_SELECTION_FORMAT));
    } else {
      const data = {
        VehicleListingId: listingId,
        ArtifactTypeId: id,
        FileName: imageName,
        FileData: imageBase,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        VehicleListingArtifactId:
          vehicleListingArtifactId > 0 ? vehicleListingArtifactId : undefined,
        IsDocumentAvailable: true,
      };
      return await uploadDocument(data, id);
    }
  };

  const uploadDocument = async (data: UploadImagePayload, id: number) => {
    try {
      const res = await VehicleService.uploadImage(data);
      if (res) {
        const imageData = await ListingService.fetchListingDocuments(
          listingId,
          router.locale
        );
        setVehicleDoc(imageData);
        const imageObject = imageData.find((x) => {
          if (x.ArtifactTypeId === id) {
            return x.ArtifactUrlPath;
          }
        });
        return imageObject?.ArtifactUrlPath ? imageObject?.ArtifactUrlPath : '';
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
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      setIsLoading(true);
      let filterData: any = [];
      if (listingData?.Overview.OutstandingFinance) {
        filterData = vehicleDoc?.filter((itm) =>
          VehicleRequiredDocs.includes(itm.ArtifactTypeKey)
        );
      } else {
        filterData = vehicleDoc?.filter(
          (itm) => itm.ArtifactTypeKey === VehicleRequiredDocs[0]
        );
      }
      var check = filterData?.every(
        (data: any) =>
          data.VehicleListingArtifactId !== 0 &&
          data.VehicleListingArtifactId !== null
      );
      const isQcRejectedDoc = vehicleDoc.filter(
        (itm) => itm.IsQCApproved === false
      );
      if (!check) {
        toast.warning(t(LabelConstants.UPLOAD_REQUIRED_DOCUMENTS));
      } else if (isQcRejectedDoc.length > 0) {
        await MessageBox.open({
          content: `${t(LabelConstants.UPDATE_QC_REJECTED_DOCUMENT)}`,
          type: MessageBoxType.Alert,
        });
      } else {
        setIsTabValid(true);
        router.push(
          `/vehicle-onboard/${listingId}?tab=Confirm Details`,
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

  return (
    <div className="mb-10 doc-form-tab container lg:!px-52">
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
      <h1 className="mt-10 mb-20 text-base text-primary leading-5">
        {disclaimerText[CMSConstants.UploadDocumentNote]}
      </h1>
      <form id="image-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-12 sm:gap-8">
          {documents &&
            documents.length > 0 &&
            documents
              .sort((i, j) => i?.displaySequence! - j?.displaySequence!)
              .map((itm, index) => {
                let artifact = itm.artifacts[0];
                let hasUploadChoice = itm.hasMultipleChoice;
                let hideCheckBox: boolean = false;
                if (hasUploadChoice) {
                  const b = itm.artifacts.find(
                    (x) => x.VehicleListingArtifactId !== 0
                  );
                  if (b) artifact = b;
                }
                if (artifact.ArtifactTypeKey === VehicleRequiredDocs[1]) {
                  hideCheckBox = listingData?.Overview.OutstandingFinance!;
                } else {
                  hideCheckBox = VehicleRequiredDocs.includes(
                    artifact.ArtifactTypeKey
                  );
                }
                return (
                  <div
                    key={artifact.ArtifactTypeId}
                    className="flex flex-col items-center justify-end gap-2"
                  >
                    <FileUpload
                      control={control}
                      name={`vehicleImage${artifact.ArtifactTypeId}`}
                      defaultValue={
                        artifact.ArtifactUrlPath ? artifact.ArtifactUrlPath : ''
                      }
                      onChange={async (status, files) => {
                        let url: string | undefined = '';
                        let docArtifact: ListingImageArtifact | undefined =
                          artifact;
                        if (itm.hasMultipleChoice) {
                          const a = itm.artifacts.find(
                            (x) => x.ArtifactTypeKey === selectedInsuranceType
                          );
                          if (a) docArtifact = a;
                        }
                        if (files && status === 'UPLOADED') {
                          url = await handleImageUpload(
                            files[0],
                            docArtifact.ArtifactTypeId,
                            docArtifact.VehicleListingArtifactId
                          );
                        } else if (status === 'REMOVED') {
                          docArtifact = itm.artifacts.find(
                            (x) => x.VehicleListingArtifactId !== 0
                          );
                          if (docArtifact)
                            await removeImage(
                              docArtifact.ArtifactTypeId,
                              docArtifact.VehicleListingArtifactId
                            );
                        }

                        return url ? url : '';
                      }}
                      disabled={
                        artifact.VehicleListingArtifactId > 0 || hasUploadChoice
                          ? false
                          : hideCheckBox
                          ? false
                          : true
                      }
                    >
                      {(fileProps) => {
                        return (
                          <div className="w-full">
                            <DocPreview
                              {...fileProps}
                              disabled={
                                listingData?.Overview
                                  .VehicleListingWorkflowNumber! >
                                  VehicleListingWorkflowNumber.InspectionReady &&
                                !(
                                  // packageDetails?.IsSelfListedPackage &&
                                  (
                                    listingData?.Overview
                                      .VehicleListingWorkflowNumber! ===
                                    VehicleListingWorkflowNumber.QCRequestForAChange
                                  )
                                )
                                // ||
                                // packageDetails?.IsSelfListedPackage
                              }
                              artifact={artifact}
                              hasUploadChoice={hasUploadChoice}
                              hideCheckBox={hideCheckBox}
                              listingId={listingId}
                              listingData={listingData}
                              uploadDocument={uploadDocument}
                              removeImage={removeImage}
                              setSelectedInsuranceType={
                                setSelectedInsuranceType
                              }
                              selectedInsuranceType={selectedInsuranceType}
                              documentData={itm}
                              allowEdit={packageDetails?.IsSelfListedPackage}
                            />
                          </div>
                        );
                      }}
                    </FileUpload>
                  </div>
                );
              })}
        </div>
        <div className="flex justify-end">
          <p className="mt-20 tracking-wide text-center text-sm">
            {t(LabelConstants.JPEG_PNG_JPG_PDF_FILES_ALLOWED, {
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
      </form>
    </div>
  );
};
