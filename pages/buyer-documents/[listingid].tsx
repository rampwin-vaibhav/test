import { useEffect, useState } from 'react';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { VehicleService } from '../../helpers/services';
import { BuyerDocumentResponse, VehicleListingData } from '../../types/models';
import { useRouter } from 'next/router';
import FileUpload from '../../components/common/Form/FileUpload';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import BuyerDocCard from '../../components/BuyerDocCard';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ConfigurationKey, Locales } from '../../types/enums';
import ConfigurationService from '../../helpers/services/configuration.service';
import SignInModal from '../../components/common/SignInModal';
import { DocMimeTypes, SignInRedirectType } from '../../types/constants';

type BuyerUploadDocProps = {};

const BuyerDocumentUpload: NextPage<
  BuyerUploadDocProps
> = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { control } = useForm();
  const [buyerDocument, setBuyerDocument] = useState<
    Array<BuyerDocumentResponse>
  >([]);
  const [vehicleListingData, setVehicleListingData] =
    useState<VehicleListingData>();
  const [fileSize, setFileSize] = useState<number>(10);
  const [userId, setUserId] = useState<string>();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const listingId = Number(router?.query?.listingid);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const SignInRedirectOperationObj = {
      RedirectOperationType: SignInRedirectType.BuyerUploadDoc,
    };
    localStorage.setItem(
      'SignInRedirectOperation',
      JSON.stringify(SignInRedirectOperationObj)
    );
    setIsAuthenticated(SessionUtils.isValidSession());

    const user = SessionUtils.getUserDetails();

    setUserId(user?.UserId);
    const initData = async () => {
      const [vehicleListingData, fileSize] = await Promise.all([
        VehicleService.fetchVehicleListingData(
          listingId,
          router.locale,
          isAuthenticated
        ),
        ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.MaxImageSizeInMB
        ),
      ]);
      setVehicleListingData(vehicleListingData);

      if (parseInt(fileSize.ConfigurationValue, 10)) {
        setFileSize(parseInt(fileSize.ConfigurationValue, 10));
      }
    };
    initData();
  }, [listingId, router.locale]);

  useEffect(() => {
    const init = async () => {
      if (isAuthenticated) {
        if (vehicleListingData) {
          if (parseInt(userId!) === vehicleListingData?.Overview.SoldToId) {
            const imageData = await VehicleService.getBuyerDocuments(
              listingId,
              router.locale
            );
            setBuyerDocument(imageData);
            localStorage.removeItem('SignInRedirectOperation');
          } else {
            router.replace('/');
          }
        }
      } else {
        setShowLogin(true);
      }
    };
    init();
  }, [
    isAuthenticated,
    listingId,
    router,
    router.locale,
    userId,
    vehicleListingData,
  ]);

  const handleDocumentUpload = async (e: File, id: number) => {
    const isValidData = await CommonUtils.IsFileValid(e, {
      fileSize: fileSize,
      fileType: DocMimeTypes,
    });
    const imageName = e.name;
    const imageBase = await CommonUtils.convertBase64(e);
    if (!isValidData.isFileSizeValid) {
      toast.warning(
        t(LabelConstants.FILE_SIZE_EXCEEDS, {
          FileSize: fileSize,
        })
      );
    } else if (!isValidData.isFileTypeValid) {
      const fileType = await CommonUtils.getFileTypeMessageString(DocMimeTypes);
      toast.warning(
        t(LabelConstants.FILE_TYPE_ERROR_MSG, {
          fileTypes: fileType,
        })
      );
    } else {
      const data = {
        VehicleListingId: listingId,
        ArtifactTypeId: id,
        FileName: imageName,
        FileData: imageBase,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
      };
      const res = await VehicleService.uploadImage(data);

      if (res) {
        const imageData = await VehicleService.getBuyerDocuments(
          listingId,
          router.locale
        );
        setBuyerDocument(imageData);
        const imageObject = imageData.find((x) => {
          if (x.ArtifactTypeId === id) {
            return x;
          }
        });
        return await imageObject?.ArtifactUrl;
      }
    }
  };

  const removeDocument = async (id: number, vehicleArtifactId: number) => {
    const data = {
      VehicleListingArtifactId: vehicleArtifactId,
      VehicleListingId: listingId,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      ArtifactTypeId: id,
    };
    const res = await VehicleService.deleteImage(data);
    if (res) {
      const imageData = await VehicleService.getBuyerDocuments(
        listingId,
        router.locale
      );
      setBuyerDocument(imageData);
    } else {
      toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <SignInModal
          show={showLogin}
          onClose={() => {
            setShowLogin(false);
            localStorage.removeItem('SignInRedirectOperation');
            router.replace('/');
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="flex flex-col gap-10 mt-10">
            <div className="text-2xl font-bold text-primary">
              {t(LabelConstants.BUYER_UPLOAD_DOC_LABEL)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {buyerDocument &&
                buyerDocument.length > 0 &&
                buyerDocument.map((itm, index) => {
                  return (
                    <div
                      key={itm.ArtifactTypeId}
                      className="flex flex-col items-center justify-end gap-2"
                    >
                      <FileUpload
                        control={control}
                        name={`vehicleImage${itm.ArtifactTypeId}`}
                        defaultValue={itm.ArtifactUrl ? itm.ArtifactUrl : ''}
                        onChange={async (status, files) => {
                          let url: string | undefined = '';
                          if (files) {
                            url = await handleDocumentUpload(
                              files[0],
                              itm.ArtifactTypeId
                            );
                          } else {
                            await removeDocument(
                              itm.ArtifactTypeId,
                              itm.VehicleListingArtifactId
                            );
                          }
                          return url ? url : '';
                        }}
                      >
                        {(fileProps) => {
                          return (
                            <div className="w-full">
                              <BuyerDocCard {...fileProps} artifact={itm} />
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
          </div>
        </div>
      </>
    );
  }
};

export default BuyerDocumentUpload;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps<BuyerUploadDocProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
