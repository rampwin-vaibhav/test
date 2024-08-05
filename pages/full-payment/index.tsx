import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ConfigurationKey, Locales, SocialMedia } from '../../types/enums';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { BackIcon, CrossRedIcon, PlusIcon } from '../../components/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GlobalService, VehicleService } from '../../helpers/services';
import FileUpload from '../../components/common/Form/FileUpload';
import { useForm } from 'react-hook-form';
import ConfigurationService from '../../helpers/services/configuration.service';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { DocMimeTypes, VehicleDealStatusKey } from '../../types/constants';
import { toast } from 'react-toastify';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../../components/common/MessageBox';
import { DealsResponse } from '../../types/models';
import SignInModal from '../../components/common/SignInModal';
import Spinner from '../../components/common/Spinner/spinner';

type IFormInput = {
  [x: string]: string;
};
const PayFullAmount = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mail, setMail] = useState<string | null>();
  const [comment, setComment] = useState<string | null>('');
  const [vehicleDealData, setVehicleDealData] = useState<DealsResponse>();
  const [fileSize, setFileSize] = useState<number>(10);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [documentArtifacts, setDocumentArtifacts] = useState<
    Array<{ FileName: string; Content: string | ArrayBuffer | null }>
  >([]);
  const { control } = useForm<IFormInput>({});

  useEffect(() => {
    const init = async () => {
      if (!router.query.id) {
        return router.push('/');
      }
      const user = SessionUtils.getUserDetails();
      const res = await GlobalService.fetchSocialMedia();
      setMail(
        res.SocialMedia.find((x) => x.SocialMediaType === SocialMedia.Email)
          ?.MediaEmail
      );
      const fileSize = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.MaxImageSizeInMB
      );
      setFileSize(parseInt(fileSize?.ConfigurationValue, 10));
      const dealResponse = await VehicleService.getVehicleDeal(
        CommonUtils.decode(router.query.id as string),
        router.locale
      );
      setVehicleDealData(dealResponse);
      if (user?.UserId !== String(dealResponse?.UserId)) {
        return router.push('/');
      }
      setIsLoading(false);
    };
    if (SessionUtils.isValidSession()) {
      init();
    } else {
      setIsLoading(false);
      setShowLogin(true);
    }
  }, [router]);

  const handleUploadDocuments = async (file: any) => {
    const isValidData = await CommonUtils.IsFileValid(file, {
      fileSize: fileSize,
      fileType: DocMimeTypes,
    });
    const imageName = file.name;
    const imageBase = await CommonUtils.convertBase64(file);
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
        FileName: imageName,
        Content: imageBase,
      };
      setDocumentArtifacts([...documentArtifacts, data]);
      return await file.name;
    }
  };

  const removeDocument = async (index: any) => {
    let array = [...documentArtifacts];
    array.splice(index, 1);
    setDocumentArtifacts(array);
  };

  const handleSubmit = async () => {
    setIsDisabled(true);
    const payload = {
      VehicleDealId: Number(CommonUtils.decode(router.query.id as string)),
      VehicleDealStatusKey: VehicleDealStatusKey.BalanceDoneByCustomer,
      Comment: comment,
      VehicleDealArtifacts: documentArtifacts,
    };
    const res = await VehicleService.updateDealStatus(payload);
    setIsDisabled(false);
    if (res.IsSuccess) {
      toast.success(t(LabelConstants.DOCUMENT_UPLOADED_SUCCESSFULLY));
      router.push('/');
    }
  };

  return isLoading ? (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="container py-10">
      <div className="flex gap-4 items-center mb-10">
        <span onClick={() => router.back()}>
          <BackIcon className="h-8 w-8 cursor-pointer rtl:rotate-180" />
        </span>
        <p className="uppercase text-2xl text-primary">
          {t(LabelConstants.PAY_FULL_AMOUNT)}
        </p>
      </div>
      <div
        className="text-lg"
        dangerouslySetInnerHTML={{
          __html: t(LabelConstants.PAY_FULL_AMOUNT_TEXT, {
            value: {
              mail: mail,
              amount: vehicleDealData?.VehicleDetails?.BalanceAmount,
            },
          }),
        }}
      ></div>
      <div className="flex flex-col gap-10 bg-gray-100 mt-7 p-4">
        <div className="flex flex-col gap-4">
          <label className="text-primary">{t(LabelConstants.COMMENTS)}</label>
          <textarea
            defaultValue={comment!}
            onChange={(e) => setComment(e.target.value)}
            className="h-20"
          />
        </div>
        <div className="flex w-full h-full items-end">
          <div className="w-[80%]">
            <span className="text-primary">{t(LabelConstants.DOCUMENTS)}</span>
            <div className="flex mt-4 gap-3 items-center flex-wrap">
              {documentArtifacts?.map((x, i) => (
                <div
                  className="w-56 aspect-[16/4] border border-dashed flex items-center justify-center"
                  key={i}
                >
                  <div className="flex flex-col w-full gap-4 items-center justify-center px-3">
                    <div className="flex w-full gap-1 justify-between items-center">
                      <span className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
                        {x.FileName}
                      </span>
                      <button
                        onClick={async () => {
                          const result = await MessageBox.open({
                            content: t('DELETE_DOC_CONFIRM_MESSAGE'),
                            type: MessageBoxType.Confirmation,
                          });
                          if (result === MessageBoxResult.Yes) {
                            removeDocument(i);
                          }
                        }}
                      >
                        <CrossRedIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <FileUpload
                control={control}
                name="UploadMojazReport"
                onChange={async (status, files) => {
                  let url: string | undefined = '';
                  if (files && status === 'UPLOADED') {
                    url = await handleUploadDocuments(files[0]);
                  }
                  return url ? url : '';
                }}
              >
                {(props) => {
                  return (
                    <div
                      className=" rounded-none flex items-center justify-center"
                      onClick={() => props.handleFileUpload()}
                    >
                      <PlusIcon className="h-16 w-16 cursor-pointer" />
                    </div>
                  );
                }}
              </FileUpload>
            </div>
          </div>
          <div className="w-[20%] flex justify-end items-end">
            <button
              className="btn btn-primary uppercase !w-48 btn-sm"
              onClick={handleSubmit}
              disabled={documentArtifacts.length === 0 ? true : isDisabled}
            >
              {t(LabelConstants.SUBMIT)}
            </button>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        show={showLogin}
        onClose={() => {
          setShowLogin(false);
          router.push('/');
        }}
      />
    </div>
  );
};

export default PayFullAmount;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
