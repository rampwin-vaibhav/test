import { yupResolver } from '@hookform/resolvers/yup';
import FileSaver from 'file-saver';
import moment from 'moment';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import DocumentPreview from '../../components/common/DocumentPreview';
import { FormDropdown } from '../../components/common/Form';
import FormInputWithLabel from '../../components/common/Form/FormInputWithLabel/FormInputWithLable';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../../components/common/MessageBox';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '../../components/common/Modal';
import Ribbon from '../../components/common/Ribbon';
import ShowRestrictUserDropdown from '../../components/common/ShowRestrictUserDropdown';
import SignInModal from '../../components/common/SignInModal';
import {
  Slider,
  SliderItem,
  SliderServices,
} from '../../components/common/Slider';
import DeleteVehicleModal from '../../components/dashboard/DeleteVehicleModal';
import {
  BackIcon,
  BookmarkIcon,
  CircularOrangeTickMarkIcon,
  DamageImageIcon,
  DownloadIcon,
  FilledBookmarkIcon,
  FinanceItCarIcon,
  FinanceItCashIcon,
  MojazReportIcon,
  NextIcon,
  OutletCarIcon,
  PrevIcon,
  ShareIcon,
  SpinIcon,
  SupportIcon,
} from '../../components/icons';
import { MojazFlipReportIcon } from '../../components/icons/MojazFlipReportIcon';
import SellerDetailsModal from '../../components/used-cars/SellerDetailsModal';
import ShareModal from '../../components/used-cars/ShareModal';
import DocumentUploadModal from '../../components/vehicle-details/DocumentUploadModal';
import MojazReportDisplayModal from '../../components/vehicle-details/MojazReportDisplayModal';
import SpinCarPopUp from '../../components/vehicle-details/SpinCarPopUp';
import VehicleImage from '../../components/vehicle-details/VehicleImage';
import VehicleImagePopUp from '../../components/vehicle-details/VehicleImagePopUp';
import {
  GlobalService,
  InspectionService,
  InvoiceService,
  ListingService,
  ProfileService,
  VehicleService,
} from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import MojazService from '../../helpers/services/mojaz.service';
import {
  CommonUtils,
  formatNumber,
  SessionUtils,
} from '../../helpers/utilities';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import { useAppContext } from '../../provider/AppProvider';
import {
  CMSPageKey,
  SignInRedirectType,
  SpinCar360Parameters,
} from '../../types/constants';
import {
  ArtifactCategory,
  ConfigurationKey,
  ImageArtifactKey,
  Locales,
  Privileges,
  ProductReferenceType,
  UserProfileStatus,
  VehicleListingStatus,
  VehicleListingWorkflowNumber,
} from '../../types/enums';
import { GTMEvents } from '../../types/gtm';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import {
  EMICalculator,
  EMITerm,
  EMITermPayload,
  InspectionReportData,
  ListingImageArtifact,
  LoanTerm,
  MojazLiteResponse,
  SocialMediaPlatformItem,
  VehicleListingData,
} from '../../types/models';
import SearchSpecification from '../../components/used-cars/SearchSpecification';
import SpecificationAndFeatures from '../../components/used-cars/SpecificationAndFeatures';
import Image from 'next/image';
import MetaDataComponent from '../../components/PagesMetaData/MetaDataComponent';

type UsedCarDetailsPageProps = {
  platforms: SocialMediaPlatformItem[];
  vehicleId: number;
  defaultMetaData: { title: string; description: string };
};

interface IFormInput {
  askingPrice: string;
  downPayment: string;
  interestRate: string;
  term: LoanTerm;
}

const UsedCarDetailsPage: NextPage<UsedCarDetailsPageProps> = ({
  platforms,
  vehicleId,
  defaultMetaData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [listingImages, setListingImages] = useState<
    Array<ListingImageArtifact>
  >([]);
  const [vehicleListingData, setVehicleListingData] =
    useState<VehicleListingData>();
  const [showBorder, setShowBorder] = useState(false);
  const [profileImage, setProfileImage] = useState<string>();
  const [inspectionData, setInspectionData] = useState<InspectionReportData>();
  const [EMITerm, setEMITerm] = useState<EMITerm>();
  const [EMIAmount, setEMIAmount] = useState('');
  const [AskingPrice, setAskingPrice] = useState(0);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [openBuyerDocumentModal, setOpenBuyerDocumentModal] =
    useState<boolean>(false);
  const [showUploadButton, setShowUploadButton] = useState<boolean>(false);
  const [showSpinCarPopUp, setShowSpinCarPopUp] = useState(false);
  const [spinArtifactURL, setSpinArtifactURL] = useState<string>();
  const [isFav, setIsFav] = useState<boolean>(false);
  const [financePopUp, setFinancePopUp] = useState<boolean>(false);
  const [showMojazReportModal, setShowMojazReportModal] =
    useState<boolean>(false);
  const [disclaimerText, setDisclaimerText] = useState<{
    [x: string]: string;
  }>({});
  const [noInspectionDisclaimerText, setNoInspectionDisclaimerText] = useState<{
    [x: string]: string;
  }>({});
  const [showRestrictUserDropdown, setShowRestrictUserDropdown] =
    useState<boolean>(false);
  const [showRestrictUserText, setShowRestrictUserText] = useState<string>('');
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [disclaimerMessage, setDisclaimerMessage] = useState<{
    [x: string]: string;
  }>({});
  const [vehicleBrochureData, setVehicleBrochureData] = useState<
    Array<ListingImageArtifact>
  >([]);
  const [reportData, setReportData] = useState<MojazLiteResponse | null>();

  const sliderRef = useRef<SliderServices>(null);
  const EMICalculatorRef = useRef(null);
  const DetailsRef = useRef(null);
  const OverViewRef = useRef(null);
  const SpecificationRef = useRef(null);
  const VehicleJourneyRef = useRef(null);
  const FeaturesRef = useRef(null);
  const [visibleSection, setVisibleSection] = useState('');
  const headerRef = useRef(null);
  const wrapperRef = useRef(null) as any;
  const [elmConfiguration, setELMConfiguration] = useState<{
    userConfig: {
      absherVerification: boolean;
      addressVerification: boolean;
      isAbsherVerified: boolean;
      isYakeenVerified: boolean;
      status: UserProfileStatus;
      isActive: boolean;
    };
    globalConfig: { absherVerification: boolean; addressVerification: boolean };
  }>();
  const [openSellerDetailsModal, setOpenSellerDetailsModal] =
    useState<boolean>(false);
  const decimalPlaces: number = 0;
  const [userID, setUserId] = useState<string>();
  const [showEditLink, setShowEditLink] = useState<boolean>(false);
  const [showDeleteLink, setShowDeleteLink] = useState<boolean>(false);
  const [showVehicleImagePopUp, setShowVehicleImagePopUp] =
    useState<boolean>(false);
  const [popUpBeforeImage, setPopUpBeforeImage] =
    useState<ListingImageArtifact | null>();
  const [vehiclePopUpImage, setVehiclePopUpImage] = useState<string>('');
  const [openDeleteVehicleModal, setOpenDeleteVehicleModal] = useState(false);
  const [inspectionDate, setInspectionDate] = useState('');
  const [MojazDocumentFetchDate, setMojazDocumentFetchDate] = useState('');
  const [showSliderData, setShowSliderData] = useState<
    Array<ListingImageArtifact>
  >([]);
  const [showDescriptionText, setShowDescriptionText] = useState<
    string | undefined
  >();
  const [showDocumentPreview, setShowDocumentPreview] =
    useState<boolean>(false);
  const [previewArtifact, setPreviewArtifact] =
    useState<ListingImageArtifact>();
  const [minimumFinanceRateForUsedCars, setMinimumFinanceRateForUsedCars] =
    useState<number>();
  const { dateTimeFormat } = useAppContext();
  const schema = yup.object({
    askingPrice: yup.string().required(),
    downPayment: yup.string().test('downPaymentTest', 'null', (obj) => {
      const val = 0.2 * AskingPrice;
      const dpValueWithoutSymbol = obj?.replaceAll(',', '');
      const dpValue = Number(dpValueWithoutSymbol);
      if (isNaN(dpValue)) {
        return new yup.ValidationError(
          LabelConstants.ERR_MSG_NUMBER,
          null,
          'downPayment'
        );
      }
      if (dpValue) {
        if (dpValue < 0) {
          return new yup.ValidationError(
            LabelConstants.DOWN_PAYMENT_NOT_NEGATIVE,
            null,
            'downPayment'
          );
        }
        if (dpValue < val) {
          return new yup.ValidationError(
            LabelConstants.DOWN_PAYMENT_MORE_ERROR,
            null,
            'downPayment'
          );
        } else if (dpValue >= AskingPrice) {
          return new yup.ValidationError(
            LabelConstants.DOWN_PAYMENT_LESS_ERROR,
            null,
            'downPayment'
          );
        } else {
          return true;
        }
      }
      return new yup.ValidationError(
        LabelConstants.DOWN_PAYMENT_REQUIRED,
        null,
        'downPayment'
      );
    }),
    interestRate: yup.string().test('interestRateValidation', 'null', (obj) => {
      const fixedRate = 100;
      const valWithoutSymbol = obj?.replaceAll('%', '');
      const val = Number(valWithoutSymbol);
      if (valWithoutSymbol === '' || val === 0) {
        return new yup.ValidationError(
          LabelConstants.INTEREST_RATE_REQUIRED,
          null,
          'interestRate'
        );
      }
      if (isNaN(val)) {
        return new yup.ValidationError(
          LabelConstants.ERR_MSG_NUMBER,
          null,
          'interestRate'
        );
      }
      if (val < 0) {
        return new yup.ValidationError(
          LabelConstants.INTEREST_RATE_NEGATIVE,
          null,
          'interestRate'
        );
      }
      if (val && val > fixedRate) {
        return new yup.ValidationError(
          LabelConstants.INTEREST_RATE_MORE_THAN_100,
          null,
          'interestRate'
        );
      }
      if (val && val < minimumFinanceRateForUsedCars!) {
        return new yup.ValidationError(
          t(LabelConstants.INTEREST_RATE_LESS_THAN_CONFIGURATION, {
            MinimumInterestRate: minimumFinanceRateForUsedCars,
          }),
          null,
          'interestRate'
        );
      }
      return true;
    }),
    term: yup.object().required(),
  });
  const { control, setValue, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const getEMI: EMICalculator = {
      Price: Number(data?.askingPrice.replaceAll(',', '')),
      ProfitRate: Number(data?.interestRate.replaceAll('%', '')),
      Duration: Number(data?.term.LoanTermValue),
      DownPayment: Number(data?.downPayment.replaceAll(',', '')),
      IsNew: vehicleListingData?.Overview.IsNew || false,
    };
    const getEMIAmount = await VehicleService.calculateEMIAmount(getEMI);
    setEMIAmount(formatNumber(getEMIAmount));
  };

  /**Get vehicle history */
  const handleDownloadVehicleHistory = async () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      if (vehicleListingData) {
        const fileData = await VehicleService.downloadMojazVehicleReport(
          vehicleListingData.Overview.VehicleListingId
        );
        FileSaver.saveAs(fileData, 'VehicleHistory');
      }
    }
  };

  /**Sticky header scroll section */
  const scrollTo = (ele: HTMLElement) => {
    let element = ele;
    let headerOffset = 70;
    let elementPosition = element.getBoundingClientRect().top;
    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      behavior: 'smooth',
      top: offsetPosition,
    });
  };

  const getDimensions = (ele: any) => {
    if (ele) {
      const { height } = ele.getBoundingClientRect();
      const offsetTop = ele.offsetTop + height;
      const offsetBottom = offsetTop + height;

      return {
        height,
        offsetTop,
        offsetBottom,
      };
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (getDimensions(headerRef.current)) {
        const { height: headerHeight } = getDimensions(headerRef.current)!;
        const scrollPosition = window.scrollY + headerHeight + 450;
        const sectionRef = [
          {
            section: 'emi-calculator',
            ref: EMICalculatorRef,
          },
          {
            section: 'details',
            ref: DetailsRef,
          },
          {
            section: 'overview',
            ref: OverViewRef,
          },
          {
            section: 'specifications',
            ref: SpecificationRef,
          },
          {
            section: 'features',
            ref: FeaturesRef,
          },
          {
            section: 'vehicle-journey',
            ref: VehicleJourneyRef,
          },
        ];

        const selected = sectionRef.find(({ section, ref }) => {
          const ele: any = ref.current;
          if (ele) {
            const { offsetBottom, offsetTop } = getDimensions(ele)!;
            return scrollPosition > offsetTop && scrollPosition < offsetBottom;
          }
        });

        if (selected && selected.section !== visibleSection) {
          setVisibleSection(selected.section);
          setShowBorder(true);
        } else if (!selected && visibleSection) {
          setShowBorder(false);
          setVisibleSection('');
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleSection, showBorder]);
  /**Sticky header scroll section end*/

  useEffect(() => {
    const isAuthenticated = SessionUtils.isValidSession();
    const user = SessionUtils.getUserDetails();
    setIsAuthenticated(isAuthenticated);
    setUserId(user?.UserId);

    const initialLoad = async () => {
      //fetch vehicle information
      const [vehicleListingData, listingImages] = await Promise.all([
        VehicleService.fetchVehicleListingData(
          vehicleId,
          router.locale,
          isAuthenticated
        ),
        VehicleService.fetchListingImageArtifacts(vehicleId, router.locale),
      ]);

      const minimumFinanceRateForUsedCars =
        await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.MinimumFinanceRateForUsedCars,
          router.locale
        );
      setMinimumFinanceRateForUsedCars(
        parseInt(minimumFinanceRateForUsedCars.ConfigurationValue)
      );

      //Added GTM event for View Car Click
      PushDataToGTM(GTMEvents.ViewedCar, {
        vehicleListingId:
          process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + vehicleId,
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        make: vehicleListingData?.Overview.Make,
        model: vehicleListingData?.Overview.Model,
        languageId: router.locale,
      });

      //Added GTM event for View Car Click GA
      PushDataToGTM(GTMEvents.ViewedCarGA, {
        vehicleListingId:
          process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + vehicleId,
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        make: vehicleListingData?.Overview.Make,
        model: vehicleListingData?.Overview.Model,
        languageId: router.locale,
      });

      if (vehicleListingData && listingImages) {
        setVehicleListingData(vehicleListingData);
        setListingImages(listingImages);
        let emiAmt = vehicleListingData.Overview?.MonthlyEMI
          ? formatNumber(vehicleListingData.Overview.MonthlyEMI)
          : '';
        setEMIAmount(emiAmt);

        // prepare spin car images
        const spinArtifact = listingImages.find((img) => {
          return img.ArtifactTypeKey === ImageArtifactKey.Spin360View;
        });
        if (spinArtifact) {
          setSpinArtifactURL(
            spinArtifact.ArtifactUrlPath + SpinCar360Parameters
          );
        }

        // fetch bookmark data
        if (isAuthenticated) {
          const [bookmark] = await Promise.all([
            VehicleService.fetchBookmark(),
          ]);
          setIsFav(
            bookmark?.VehicleListingIds?.some(
              (x) => String(x) === String(vehicleId)
            )
          );
        } else {
          setIsFav(false);
        }

        //Fetch Vehicle Document(E-brochure)
        const eBrochureData = await VehicleService.fetchVehicleDocuments(
          vehicleId,
          router.locale
        );
        setVehicleBrochureData(eBrochureData);

        //MojazDocumentFetchDate

        const MojazDocumentFetchDateFormatted = moment(
          CommonUtils.convertUTCToLocal(
            vehicleListingData.Overview.MojazDocumentFetchDate
          )
        ).format(dateTimeFormat);

        setMojazDocumentFetchDate(MojazDocumentFetchDateFormatted);
      } else {
        if (String(router.query.tab).toLowerCase() !== 'doc') {
          router.replace('/404');
        }
      }

      // fetch ELM details
      if (isAuthenticated && user?.UserId) {
        const [profile, absherVerification, addressVerification] =
          await Promise.all([
            ProfileService.fetchUserData(router.locale),
            ConfigurationService.fetchConfigurationValue(
              ConfigurationKey.IsAbsherVerificationRequired,
              router.locale
            ),
            ConfigurationService.fetchConfigurationValue(
              ConfigurationKey.IsUserAddressVerificationRequired,
              router.locale
            ),
          ]);

        setELMConfiguration({
          userConfig: {
            isAbsherVerified: profile.IsAbsherVerified,
            isYakeenVerified: profile.IsYakeenVerified,
            absherVerification: profile.IsAbsherVerificationRequired,
            addressVerification: profile.IsAddressVerificationRequired,
            status: profile.UserProfileStatusKey as UserProfileStatus,
            isActive: profile.IsActive,
          },
          globalConfig: {
            absherVerification:
              absherVerification.ConfigurationValue === 'true',
            addressVerification:
              addressVerification.ConfigurationValue === 'true',
          },
        });

        // allow user to edit/delete vehicles, check sellerId and userId.
        if (
          SessionUtils.hasPrivileges(Privileges.EditVehicle) &&
          String(vehicleListingData?.Overview?.SellerId) ===
            String(user.UserId) &&
          vehicleListingData.Overview.VehicleListingStatusKey !==
            VehicleListingStatus.Deleted
        ) {
          setShowEditLink(true);
        }

        if (
          SessionUtils.hasPrivileges(Privileges.DeleteVehicle) &&
          String(vehicleListingData?.Overview?.SellerId) === String(user.UserId)
        ) {
          setShowDeleteLink(true);
        }
      }
      const discData = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Disclaimer,
        null,
        router.locale
      );
      setDisclaimerText(discData);

      setNoInspectionDisclaimerText(discData);

      const configurationValue =
        await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.IsRestrictOnBoardingFromWebForSelfListed,
          router.locale
        );
      setShowRestrictUserText(configurationValue.ConfigurationValue);

      const data = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Disclaimer,
        ConfigurationKey.OutletVehiclePurchaseDisclaimer,
        router.locale
      );
      setDisclaimerMessage(data);
    };

    initialLoad();

    // To avoid multiple api calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  /**Used to set profile image and inspection data */
  useEffect(() => {
    /**
     * This function set the profile image
     */

    let profileImage = listingImages.find((x) => x.IsProfileImage);
    if (profileImage) {
      setProfileImage(profileImage?.ArtifactUrlPath!);
    } else {
      profileImage = listingImages.find(
        (x) => x.ArtifactTypeKey === ImageArtifactKey.ProfileView
      );
      if (profileImage) {
        setProfileImage(profileImage?.ArtifactUrlPath!);
      }
    }

    /**
     * This function the inspection data
     */
    const fetchInspectionData = async () => {
      const inspectionReportData =
        await InspectionService.fetchInspectionReport(vehicleId);
      setInspectionData(inspectionReportData);

      const inspectionDateFormatted = moment(
        CommonUtils.convertUTCToLocal(
          String(inspectionReportData?.InspectedDateTime!)
        )
      ).format(dateTimeFormat);

      setInspectionDate(inspectionDateFormatted);
    };
    fetchInspectionData();
    const sliderImages = listingImages.filter((x) => {
      if (
        vehicleListingData?.Overview &&
        vehicleListingData?.Overview.VehicleListingWorkflowNumber >=
          VehicleListingWorkflowNumber.Listed
      ) {
        return (
          x.ArtifactUrlPath !== null &&
          x.ArtifactType !== ImageArtifactKey.Spin360View &&
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
  }, [listingImages, vehicleId, vehicleListingData?.Overview]);

  /**Used to set EMI data and amount */
  useEffect(() => {
    if (vehicleListingData) {
      setAskingPrice(vehicleListingData.Overview.AskingPrice);
      let obj: EMITermPayload = {
        LanguageID: CommonUtils.getLanguageId(router.locale!),
        VehiclePrice: vehicleListingData.Overview.AskingPrice,
      };

      const fetchEMITerm = async () => {
        const emiTerms = await VehicleService.fetchEmiTerms(obj);
        setValue(
          'downPayment',
          String(
            formatNumber(
              Math.ceil(emiTerms.DefaultMinimumDownpayment || 0),
              decimalPlaces
            )
          )
        );
        setValue('interestRate', String(emiTerms.DefaultInterestRate + '%'));
        let temp = emiTerms.LoanTerm.find(
          (itm) => itm.LoanTermValue === emiTerms.ActualLoanTerm
        );
        setValue('term', temp!);
        emiTerms.LoanTerm.sort(
          (a, b) => Number(a.LoanTermValue) - Number(b.LoanTermValue)
        );
        setEMITerm(emiTerms);
      };
      fetchEMITerm();
      setValue(
        'askingPrice',
        vehicleListingData.Overview.AskingPrice
          ? formatNumber(
              Math.ceil(vehicleListingData.Overview.AskingPrice || 0)
            )
          : '-'
      );
    }
  }, [setValue, vehicleListingData, router.locale]);

  useEffect(() => {
    if (String(router.query.tab).toLowerCase() === 'doc') {
      if (SessionUtils.isValidSession()) {
        if (vehicleListingData) {
          if (parseInt(userID!) === vehicleListingData?.Overview.SoldToId) {
            // NOTE: Hide Buyer Document selection options
            // setOpenBuyerDocumentModal(true);
            // setShowUploadButton(true);
          } else {
            router.replace('/404');
          }
        }
      } else {
        setShowLogin(true);
      }
    }
  }, [router, vehicleListingData, userID]);

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (openSellerDetailsModal && !isAuthenticated) {
          setShowLogin(true);
          setOpenSellerDetailsModal(false);
        } else {
          setShowLogin(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, [openSellerDetailsModal]);

  /**This function will handle seller details button click
   * according to profile verification details will be displayed
   * otherwise user will be redirected to profile
   */
  const sellerDetailsClickHandler = async () => {
    if (SessionUtils.isValidSession() && elmConfiguration) {
      const identityVerificationCheckData =
        await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.BypassIdentityVerificationCheckToViewSellerDetails,
          router.locale
        );
      if (
        identityVerificationCheckData.ConfigurationValue.toLowerCase() ===
        'true'
      ) {
        localStorage.removeItem('SignInRedirectOperation');
        return setOpenSellerDetailsModal(true);
      }
      if (!elmConfiguration.userConfig.isActive) {
        /**
         * check user identity verification with global and user level validation
         */
        await MessageBox.open({
          content: `${t(LabelConstants.PROFILE_INACTIVE_ACTIVATE_TO_PROCEED)}`,
        });
        router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status == UserProfileStatus.YetToCreate
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        const result = await MessageBox.open({
          content: `${t(LabelConstants.PROFILE_TO_CONTACT_SELLER)}`,
          type: MessageBoxType.Confirmation,
        });
        if (result === MessageBoxResult.Yes) router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status === UserProfileStatus.Draft
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        const result = await MessageBox.open({
          content: `${t(LabelConstants.VERIFY_PROFILE)}`,
          type: MessageBoxType.Confirmation,
        });
        if (result === MessageBoxResult.Yes) router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status === UserProfileStatus.Validated
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        if (
          (!(
            !elmConfiguration.globalConfig.absherVerification ||
            !elmConfiguration.userConfig.absherVerification
          ) &&
            !elmConfiguration.userConfig.isAbsherVerified) ||
          (!(
            !elmConfiguration.globalConfig.addressVerification ||
            !elmConfiguration.userConfig.addressVerification
          ) &&
            !elmConfiguration.userConfig.isYakeenVerified)
        ) {
          /**
           * Show message to complete identity verification to view seller details.
           */
          const result = await MessageBox.open({
            content: `${t(
              LabelConstants.PLEASE_COMPLETE_IDENTITY_VERIFICATION
            )}`,
          });
          if (result === MessageBoxResult.OK) {
            router.push(
              `/identity-verification?redirectUrl=${router.asPath}`,
              undefined,
              {
                shallow: true,
              }
            );
          }
        } else {
          if (
            vehicleListingData?.Overview.IsOutletAcknowledged ||
            !vehicleListingData?.Overview.IsOutlet
          ) {
            setOpenSellerDetailsModal(true);
          } else {
            setOpenConfirmationModal(true);
          }
        }
        localStorage.removeItem('SignInRedirectOperation');
      } else {
        setShowLogin(true);
        const SignInRedirectOperationObj = {
          RedirectOperationType: SignInRedirectType.ClickedSellerDetails,
          OperationDetails: { vehicleId: vehicleId },
        };
        localStorage.setItem(
          'SignInRedirectOperation',
          JSON.stringify(SignInRedirectOperationObj)
        );
      }
    } else {
      setShowLogin(true);
      const SignInRedirectOperationObj = {
        RedirectOperationType: SignInRedirectType.ClickedSellerDetails,
        OperationDetails: { vehicleId: vehicleId },
      };
      localStorage.setItem(
        'SignInRedirectOperation',
        JSON.stringify(SignInRedirectOperationObj)
      );
    }
  };

  useEffect(() => {
    const redirectType = localStorage.getItem('SignInRedirectOperation');
    const redirectJSON = JSON.parse(redirectType!);
    const localStorageVehicleId = redirectJSON?.OperationDetails?.vehicleId;
    const isAuthenticated = SessionUtils.isValidSession();
    if (
      redirectJSON?.RedirectOperationType ===
        SignInRedirectType.ClickedSellerDetails &&
      isAuthenticated
    ) {
      if (vehicleId === localStorageVehicleId && elmConfiguration) {
        sellerDetailsClickHandler();
      }
    }
  }, [router, elmConfiguration]);

  /**This function will handle FINANCE IT button click
   * according to profile verification details will be displayed
   * otherwise user will be redirected to profile
   */
  const financeItClickHandler = async () => {
    if (SessionUtils.isValidSession() && elmConfiguration) {
      if (!elmConfiguration.userConfig.isActive) {
        /**
         * check user identity verification with global and user level validation
         */
        await MessageBox.open({
          content: `${t(LabelConstants.PROFILE_INACTIVE_ACTIVATE_TO_PROCEED)}`,
        });
        router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status == UserProfileStatus.YetToCreate
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        const result = await MessageBox.open({
          content: `${t(LabelConstants.PROFILE_TO_CONTACT_SELLER)}`,
          type: MessageBoxType.Confirmation,
        });
        if (result === MessageBoxResult.Yes) router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status === UserProfileStatus.Draft
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        const result = await MessageBox.open({
          content: `${t(LabelConstants.VERIFY_PROFILE)}`,
          type: MessageBoxType.Confirmation,
        });
        if (result === MessageBoxResult.Yes) router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status === UserProfileStatus.Validated
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        if (
          (!(
            !elmConfiguration.globalConfig.absherVerification ||
            !elmConfiguration.userConfig.absherVerification
          ) &&
            !elmConfiguration.userConfig.isAbsherVerified) ||
          (!(
            !elmConfiguration.globalConfig.addressVerification ||
            !elmConfiguration.userConfig.addressVerification
          ) &&
            !elmConfiguration.userConfig.isYakeenVerified)
        ) {
          /**
           * Show message to complete identity verification to view seller details.
           */
          const result = await MessageBox.open({
            content: `${t(
              LabelConstants.PLEASE_COMPLETE_IDENTITY_VERIFICATION
            )}`,
          });
          if (result === MessageBoxResult.OK) {
            router.push(
              `/identity-verification?redirectUrl=${router.asPath}`,
              undefined,
              {
                shallow: true,
              }
            );
          }
        } else {
          const quotations = await InvoiceService.getQuotations(router.locale!);
          const quotation = quotations.Records.find(
            (x) =>
              x.VehicleDetails?.VehicleListingId ===
              vehicleListingData?.Overview.VehicleListingId
          );
          if (quotation) {
            await MessageBox.open({
              content: `${t(LabelConstants.ALREADY_FINANCE_AVAILED_MESSAGE)}`,
              type: MessageBoxType.Message,
            });
          } else {
            if (
              vehicleListingData &&
              vehicleListingData.Overview &&
              vehicleListingData.Overview.IsFinanceable
            ) {
              setFinancePopUp(true);
            } else {
              handleCash();
            }
          }
        }
      } else {
        setShowLogin(true);
      }
    } else {
      setShowLogin(true);
    }
  };

  /**This will handle interest rate validation */
  const onFieldBur = (
    e: React.FocusEvent<HTMLInputElement>,
    elementName: any
  ) => {
    let val = e.target.value;
    if (val !== '') {
      if (e.target.name === 'interestRate') {
        setValue(elementName, val + '%');
      } else {
        setValue(
          elementName,
          formatNumber(Math.ceil(Number(val) || 0), decimalPlaces)
        );
      }
    }
  };

  /**This will handle interest rate validation */
  const onFieldFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    elementName: any
  ) => {
    let val = e.target.value;
    if (val !== '') {
      if (e.target.name === 'interestRate') {
        setValue(elementName, val.replaceAll('%', ''));
      } else {
        setValue(elementName, val.replaceAll(',', ''));
      }
    }
  };

  /*This function will handle image */
  const onVehicleImageClick = (
    imageUrl: string,
    beforeImage?: ListingImageArtifact | null
  ) => {
    setVehiclePopUpImage(imageUrl);
    setShowVehicleImagePopUp(true);
    setPopUpBeforeImage(beforeImage);
  };

  /**This function will handle delete vehicle confirmation click */
  const deleteVehicleHandler = async () => {
    const response = await MessageBox.open({
      content: t(LabelConstants.DELETION_CONFIRMATION),
      type: MessageBoxType.Confirmation,
    });
    if (response === MessageBoxResult.Yes) {
      setOpenDeleteVehicleModal(true);
    }
  };

  /**This function will handle edit vehicle click */
  const editVehicleHandler = () => {
    if (
      vehicleListingData?.Overview.IsSelfListedVehicle &&
      showRestrictUserText === 'true'
    ) {
      setShowRestrictUserDropdown(true);
    } else {
      router.push(
        `/vehicle-onboard/${vehicleListingData?.Overview.VehicleListingId}?Vehicle%20Details`
      );
    }
  };

  const bookmarkHandler = async () => {
    if (SessionUtils.isValidSession()) {
      if (isFav) {
        await VehicleService.deleteBookmark({
          VehicleListingID: String(vehicleId),
        });
        //Added GTM event for Removed BookMark Click
        PushDataToGTM(GTMEvents.RemovedBookmark, {
          vehicleListingId:
            process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + vehicleId,
          userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userID,
          languageId: router.locale,
        });
      } else {
        //Added GTM event for Add BookMark Click
        PushDataToGTM(GTMEvents.AddBookmark, {
          vehicleListingId:
            process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + vehicleId,
          userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userID,
          languageId: router.locale,
        });
        await VehicleService.addBookmark({
          VehicleListingID: String(vehicleId),
        });
      }
      const [vehicleListingData, bookmark] = await Promise.all([
        VehicleService.fetchVehicleListingData(
          vehicleId,
          router.locale,
          isAuthenticated
        ),
        VehicleService.fetchBookmark(),
      ]);
      setVehicleListingData(vehicleListingData);
      let emiAmt = vehicleListingData.Overview?.MonthlyEMI
        ? formatNumber(vehicleListingData.Overview.MonthlyEMI)
        : '';
      setEMIAmount(emiAmt);
      setIsFav(
        bookmark?.VehicleListingIds?.some(
          (x) => String(x) === String(vehicleId)
        )
      );
      localStorage.removeItem('SignInRedirectOperation');
    } else {
      setShowLogin(true);
      const SignInRedirectOperationObj = {
        RedirectOperationType: SignInRedirectType.BookMark,
        OperationDetails: { vehicleId: vehicleId },
      };
      localStorage.setItem(
        'SignInRedirectOperation',
        JSON.stringify(SignInRedirectOperationObj)
      );
    }
  };

  useEffect(() => {
    const redirectType = localStorage.getItem('SignInRedirectOperation');
    const redirectJSON = JSON.parse(redirectType!);
    const localStorageVehicleId = redirectJSON?.OperationDetails?.vehicleId;
    const isAuthenticated = SessionUtils.isValidSession();
    if (
      redirectJSON?.RedirectOperationType === SignInRedirectType.BookMark &&
      isAuthenticated
    ) {
      if (vehicleId === localStorageVehicleId) {
        bookmarkHandler();
      }
    }
  }, [router]);

  const handleFinanceIt = async () => {
    const payload = {
      ProductReferenceType: ProductReferenceType.Vehicle,
      ProductReferenceId: vehicleId,
      MarkedForFinance: true,
      VehicleListingId: vehicleId,
    };
    const res = await ListingService.addToCart(payload);
    if (res.MessageCode === 'DUPLICATE_ITEM_FOUND') {
      await MessageBox.open({
        content: `${t(LabelConstants.ERR_DUPLICATE_SHOPPING_CART_ITEM)}`,
        type: MessageBoxType.Message,
      });
    }
    if (res.MessageCode === 'NOT_ABLE_TO_ADD_ITEM') {
      await MessageBox.open({
        content: `${t(LabelConstants.ERR_ZERO_PRICE_SHOPPING_CART_ITEM)}`,
        type: MessageBoxType.Message,
      });
    }
    if (res.IsSuccess) {
      router.push('/cart');
    }
  };

  const handleCash = async () => {
    const payload = {
      ProductReferenceType: ProductReferenceType.Vehicle,
      ProductReferenceId: vehicleId,
      MarkedForFinance: false,
      VehicleListingId: vehicleId,
    };
    const res = await ListingService.addToCart(payload);
    if (res.MessageCode === 'DUPLICATE_ITEM_FOUND') {
      await MessageBox.open({
        content: `${t(LabelConstants.ERR_DUPLICATE_SHOPPING_CART_ITEM)}`,
        type: MessageBoxType.Message,
      });
    }
    if (res.MessageCode === 'NOT_ABLE_TO_ADD_ITEM') {
      await MessageBox.open({
        content: `${t(LabelConstants.ERR_ZERO_PRICE_SHOPPING_CART_ITEM)}`,
        type: MessageBoxType.Message,
      });
    }
    if (res.IsSuccess) {
      //router.push('/cart');
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      const redirectType = localStorage.getItem('SignInRedirectOperation');
      const redirectJSON = JSON.parse(redirectType!);
      if (
        redirectJSON?.RedirectOperationType ===
          SignInRedirectType.ViewedInspectionReport &&
        isAuthenticated
      ) {
        if (inspectionData?.ReportUrl) {
          const success = window.open(inspectionData?.ReportUrl);
          if (success) {
            localStorage.removeItem('SignInRedirectOperation');
          }
        }
      }
    };
    initialLoad();
  }, [inspectionData?.ReportUrl, isAuthenticated]);

  const handleCheckBox = (event: any) => {
    setIsSelected(event.target.checked);

    setShowWarning(false);
  };

  const handleSave = async () => {
    try {
      await VehicleService.saveUserAcknowledgement({
        UserID: userID,
        VehicleListingID: vehicleId,
        IsAccepted: isSelected,
      });
      const listingData = await VehicleService.fetchVehicleListingData(
        vehicleId,
        router.locale,
        isAuthenticated
      );
      setVehicleListingData(listingData);
      let emiAmt = listingData.Overview?.MonthlyEMI
        ? formatNumber(listingData.Overview.MonthlyEMI)
        : '';
      setEMIAmount(emiAmt);
    } catch (error) {
      console.error('Error while saving user acknowledgement:', error);
    }
  };

  const handleDocPreview = (fileData: ListingImageArtifact) => {
    setShowDocumentPreview(true);
    setPreviewArtifact(fileData);
  };
  const handleMojazReport = async () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      let reportData = null;
      if (vehicleListingData?.Overview.VerifiedVin) {
        reportData = await MojazService.mojazLiteReport(
          vehicleListingData?.Overview.VerifiedVin!,
          router.locale
        );
      }
      setReportData(reportData);
      setShowMojazReportModal(true);
    }
  };
  let seller = '';
  if (vehicleListingData) {
    seller =
      vehicleListingData?.Overview.DealerId > 0 &&
      vehicleListingData?.Overview.DealerName
        ? vehicleListingData?.Overview.DealerName || ''
        : `${vehicleListingData?.Overview.SellerFirstName || ''} ${
            vehicleListingData?.Overview.SellerLastName || ''
          }`.trim();
  }

  const componentMetadata: any = useMemo(() => {
    const defaultMetaData: { title?: string; description?: string } = {
      title: undefined,
      description: undefined,
    };
    if (vehicleListingData?.Overview?.Model) {
      const currentYear = vehicleListingData?.Overview?.ModelYear ?? '';
      defaultMetaData.title = t('META_TITLE_USED_MODEL_DETAIL')
        .replaceAll('{brand}', vehicleListingData?.Overview?.Make ?? '')
        .replaceAll('{year}', currentYear)
        .replaceAll('{model}', vehicleListingData.Overview.Model);

      defaultMetaData.description = t('META_DESCRIPTION_USED_MODEL_DETAIL')
        .replaceAll('{brand}', vehicleListingData?.Overview?.Make ?? '')
        .replaceAll('{year}', currentYear)
        .replaceAll('{model}', vehicleListingData.Overview.Model);
    }

    return defaultMetaData;
  }, [
    t,
    vehicleListingData?.Overview?.Make,
    vehicleListingData?.Overview.Model,
    vehicleListingData?.Overview?.ModelYear,
  ]);

  return (
    <div
      className="gogo-car-details-page w-full"
      id={`${vehicleId}`}
      ref={wrapperRef}
    >
      <MetaDataComponent
        title={componentMetadata?.title ?? defaultMetaData.title}
        description={
          componentMetadata?.description ?? defaultMetaData.description
        }
      />
      {vehicleListingData ? (
        <>
          <div className="w-full">
            <div className="min-h-[11.6875rem] container flex flex-col gap-[0.809rem]">
              <div className="flex flex-col sm:flex-row justify-between gap-[1.875rem] pt-10 sm:items-center font-bold">
                <div onClick={() => router.back()}>
                  <BackIcon className="h-10 w-10 cursor-pointer rtl:rotate-180" />
                </div>
                <div className="flex  gap-[1.875rem] items-center justify-end">
                  <div
                    className={`text-lg ${
                      router.locale === Locales.EN
                        ? ' pr-[1.875rem] border-r'
                        : ' pl-[1.875rem] border-l'
                    }`}
                  >
                    {vehicleListingData.BookmarkCount &&
                    vehicleListingData.BookmarkCount !== 0
                      ? `${vehicleListingData.BookmarkCount} ${t(
                          LabelConstants.BOOKMARKED
                        )}`
                      : ''}
                  </div>

                  {/* Seller Detail Link */}

                  {!(
                    String(vehicleListingData.Overview?.SellerId) ===
                    String(userID!)
                  ) &&
                    vehicleListingData.Overview?.VehicleListingStatusKey !==
                      VehicleListingStatus.Sold &&
                    vehicleListingData.Overview?.VehicleListingStatusKey !==
                      VehicleListingStatus.Booked && (
                      <button
                        className="cursor-pointer px-[0.875rem] py-[0.675rem] text-white bg-gradient rounded-md uppercase"
                        onClick={() => {
                          sellerDetailsClickHandler();
                        }}
                      >
                        {t(LabelConstants.SELLER_DETAILS)}
                      </button>
                    )}
                  <Link
                    href={`/support/${vehicleListingData.Overview.VehicleListingId}`}
                  >
                    <a
                      href={`/support/${vehicleListingData.Overview.VehicleListingId}`}
                      title={t(LabelConstants.CUSTOMER_SUPPORT)}
                    >
                      <SupportIcon className="w-[2.02rem] h-[1.8913rem]" />
                    </a>
                  </Link>
                  <span
                    className="cursor-pointer"
                    title={t(LabelConstants.SHARE_WITH)}
                    onClick={() => setOpenShareModal(true)}
                  >
                    <ShareIcon className="w-[1.5956rem] h-[1.8913rem]" />
                  </span>
                  <span
                    title={isFav ? '' : t(LabelConstants.BOOKMARK_NOW)}
                    onClick={() => bookmarkHandler()}
                    className="cursor-pointer"
                  >
                    {isFav ? (
                      <FilledBookmarkIcon className="w-[2.0381rem] h-[1.8913rem]" />
                    ) : (
                      <BookmarkIcon className="w-[2.0381rem] h-[1.8913rem]" />
                    )}
                  </span>
                  {showEditLink && (
                    <div className="pl-[1.875rem] border-l">
                      <button
                        className="bg-gradient uppercase py-1 px-2 text-md rounded"
                        onClick={() => {
                          editVehicleHandler();
                        }}
                      >
                        {t(LabelConstants.EDIT)}
                      </button>
                    </div>
                  )}
                  {showDeleteLink && (
                    <div>
                      <button
                        className="bg-gradient uppercase py-1 px-2 text-md rounded"
                        onClick={() => {
                          deleteVehicleHandler();
                        }}
                      >
                        {t(LabelConstants.DELETE)}
                      </button>
                    </div>
                  )}
                  {showUploadButton && (
                    <button
                      className="bg-gradient uppercase py-1 px-2 text-md rounded"
                      onClick={() => setOpenBuyerDocumentModal(true)}
                    >
                      {t(LabelConstants.UPLOAD_BTN)}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center flex-wrap pb-5 lg:pb-0">
                <div className="text-heading2 leading-[4.125rem] font-bold">
                  {`${vehicleListingData.Overview.Make} ${
                    vehicleListingData.Overview.Model
                  } ${vehicleListingData.Overview.Spec} ${
                    vehicleListingData.Overview.ModelYear
                      ? vehicleListingData.Overview.ModelYear
                      : ''
                  }`}
                </div>
                <div className="flex gap-10 items-center flex-wrap justify-end w-full lg:w-auto">
                  <div className="flex items-center gap-1">
                    <div
                      className="text-5xl flex whitespace-nowrap gap-2 leading-[3.6875rem] font-bold justify-end"
                      dir="ltr"
                    >
                      <span>{t(LabelConstants.SAR)} </span>
                      <span>{`${
                        vehicleListingData.Overview.AskingPrice !== 0
                          ? formatNumber(
                              vehicleListingData.Overview.AskingPrice
                            )
                          : '-'
                      }`}</span>
                    </div>
                    <div className="text-lg text-dark-gray2">
                      {t(LabelConstants.INCLUSIVE_VAT)}
                    </div>
                  </div>
                  {/* Finance It Button */}
                  {/* Task 12336: Hide Buy button on Vehicle details page */}
                  {/* {!(
                    String(vehicleListingData.Overview?.SellerId) ===
                    String(userID!)
                  ) &&
                    vehicleListingData.Overview?.IsOutlet && (
                      <button
                        className="btn btn-primary btn-sm uppercase"
                        onClick={() => {
                          if (SessionUtils.isValidSession()) {
                            setOpenConfirmationModal(true);
                          } else {
                            setShowLogin(true);
                          }
                          // financeItClickHandler();
                        }}
                        disabled={vehicleListingData.Overview.AskingPrice === 0}
                      >
                        {t(LabelConstants.LBL_BUY)}
                      </button>
                    )} */}
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src={profileImage || '/images/default-car.jpg'}
                alt="gogo motor"
                height={1080}
                width={1920}
                className="w-full aspect-[16/9] object-cover"
                onError={(event: any) => {
                  event.target.src = '/images/default-car.jpg';
                  event.onerror = null;
                }}
                priority={true}
                loading="eager"
                unoptimized={true}
              />
              {vehicleListingData.Overview?.IsOutlet ||
              vehicleListingData.Overview?.IsNew ? (
                <></>
              ) : router.locale === Locales.EN ? (
                <div
                  className="absolute cursor-pointer right-0 bottom-[22rem]"
                  onClick={() => handleMojazReport()}
                >
                  <MojazReportIcon className="w-[5rem] h-[5rem]" />
                </div>
              ) : (
                <div
                  className="absolute cursor-pointer left-0 bottom-[22rem]"
                  onClick={() => handleMojazReport()}
                >
                  <MojazFlipReportIcon className="w-[5rem] h-[5rem]" />
                </div>
              )}
              {vehicleListingData.Overview?.IsOutlet && (
                <div className="absolute flex cursor-pointer left-0 bottom-[1rem] ">
                  <OutletCarIcon className="w-[10rem] h-[5rem]" />
                </div>
              )}
              {vehicleListingData.Overview?.VehicleListingStatusKey ===
                VehicleListingStatus.Sold && (
                <div className="absolute top-0">
                  <Ribbon type="Sold" isLarge={true} />
                </div>
              )}
              {inspectionData?.ReportUrl && (
                <div className="bg-primary absolute bottom-0 left-0 flex items-center justify-center rtl:gap-2 ltr:gap-1 py-[0.25rem] px-[0.7rem] rounded-tr-sm">
                  <CircularOrangeTickMarkIcon className="h-8 w-4" />
                  <span className="text-white text-xl">
                    {t(LabelConstants.INSPECTED_LBL)}
                  </span>
                </div>
              )}
              {/* {vehicleListingData.Overview.IsFeatured > 0 && (
                <div className="absolute top-0 left-0 container mt-6">
                  <div className="sm:flex hidden w-[13.4375rem] bg-sea-green text-3xl font-bold text-white items-center px-[0.8444rem] gap-[0.7819rem] rounded uppercase py-[0.3125rem]">
                    <StarIcon className="h-[1.3331rem] w-[1.4994rem]" />
                    {t(LabelConstants.FEATURED)}
                  </div>

                  <div
                    className="sm:hidden w-[3.125rem] mt-5 flex bg-sea-green items-center justify-center p-1 rounded-[0.25rem] font-semibold text-white"
                    title={t(LabelConstants.FEATURED)}
                  >
                    <StarIcon className="h-[1.563rem] w-[1.563rem]" />
                  </div>
                </div>
              )} */}
              {spinArtifactURL && (
                <div className="absolute sm:bottom-[3.125rem] bottom-[0.8125rem] left-0 container flex justify-center">
                  <div className="flex flex-col items-center gap-3 sm:gap-5">
                    <div
                      className="cursor-pointer flex items-center justify-center"
                      onClick={() => setShowSpinCarPopUp(true)}
                    >
                      <SpinIcon className="w-20 h-20 sm:h-24 sm:w-24  cursor-pointer" />
                    </div>
                    <div className="font-bold text-xl sm:text-3xl text-white uppercase items-center">
                      {t(LabelConstants.SPIN_TO_EXPLORE)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="h-[3.125rem]" />
          <div
            className={`flex flex-wrap container flex-row items-center h-[4.375rem] w-full justify-center gap-4 sm:sticky left-0 right-0 top-0 z-10 py-4 bg-white ${
              showBorder ? 'shadow-lg' : ''
            }`}
            ref={headerRef}
          >
            <div className="font-bold sm:flex sm:gap-[2.875rem] grid grid-cols-2  gap-x-4 text-2xl headerElem">
              {!vehicleListingData.Overview.IsSelfListedVehicle && (
                <div
                  className={`border-b-4 font-bold cursor-pointer ${
                    visibleSection === 'emi-calculator'
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => {
                    scrollTo(EMICalculatorRef.current!);
                  }}
                >
                  <span>{t(LabelConstants.EMI_CALCULATOR)}</span>
                </div>
              )}
              {vehicleListingData.Overview && (
                <div
                  className={`border-b-4 font-bold cursor-pointer ${
                    visibleSection === 'details'
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => {
                    scrollTo(DetailsRef.current!);
                  }}
                >
                  <span className="flex justify-start headerElem">
                    {t(LabelConstants.DETAILS)}
                  </span>
                </div>
              )}
              {vehicleListingData.Overview && (
                <div
                  className={`border-b-4 font-bold cursor-pointer ${
                    visibleSection === 'overview'
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => {
                    scrollTo(OverViewRef.current!);
                  }}
                >
                  <span>{t(LabelConstants.OVERVIEW)}</span>
                </div>
              )}
              {vehicleListingData.Specification && (
                <div
                  className={`border-b-4 font-bold cursor-pointer ${
                    visibleSection === 'specifications'
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => {
                    scrollTo(SpecificationRef.current!);
                  }}
                >
                  <span className="flex justify-start headerElem">
                    {t(LabelConstants.SPECIFICATION)}
                  </span>
                </div>
              )}
              {vehicleListingData.Features &&
                vehicleListingData.Features.length > 0 &&
                vehicleListingData.Features.some(
                  (feature) => feature.FeatureList.length > 0
                ) && (
                  <div
                    className={`border-b-4 font-bold cursor-pointer ${
                      visibleSection === 'features'
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                    onClick={() => {
                      scrollTo(FeaturesRef.current!);
                    }}
                  >
                    <span className="flex justify-start headerElem">
                      {t(LabelConstants.FEATURES)}
                    </span>
                  </div>
                )}
              {/* VEHICLE JOURNEY */}
              {vehicleListingData.Overview?.IsOutlet &&
                vehicleListingData.Overview?.VehicleJourney && (
                  <div
                    className={`border-b-4 font-bold cursor-pointer ${
                      visibleSection === 'vehicle-journey'
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                    onClick={() => {
                      scrollTo(VehicleJourneyRef.current!);
                    }}
                  >
                    <span className="flex justify-start headerElem">
                      {t(LabelConstants.VEHICLE_JOURNEY)}
                    </span>
                  </div>
                )}
            </div>
          </div>
          {/* Slider */}
          {showSliderData.length > 0 && (
            <>
              <div className="h-[3.125rem]"></div>
              <div className="">
                <div className="relative bg-lighter-gray">
                  {showSliderData.length > 3 && (
                    <>
                      <div
                        className="absolute m-auto top-0 bottom-0 z-10 left-10 bg-white lg:w-[5.438rem] lg:h-[5.438rem] md:w-[4.438rem] md:h-[4.438rem] w-[3.438rem] h-[3.438rem] rounded-full flex items-center justify-center shadow-md cursor-pointer"
                        onClick={() => {
                          if (sliderRef && sliderRef.current) {
                            router.locale === Locales.AR
                              ? sliderRef.current.loadNext()
                              : sliderRef.current.loadPrev();
                          }
                        }}
                      >
                        <button className=" text-princeton-orange w-[1.158rem] text-center disabled:opacity-95 disabled:cursor-not-allowed">
                          <PrevIcon className="w-[1.158rem]" />
                        </button>
                      </div>
                      <div
                        className="absolute m-auto top-0 bottom-0 z-10 right-10 bg-white lg:w-[5.438rem] lg:h-[5.438rem] md:w-[4.438rem] md:h-[4.438rem] w-[3.438rem] h-[3.438rem] rounded-full flex items-center justify-center shadow-md cursor-pointer"
                        onClick={() => {
                          if (sliderRef && sliderRef.current) {
                            router.locale === Locales.AR
                              ? sliderRef.current.loadPrev()
                              : sliderRef.current.loadNext();
                          }
                        }}
                      >
                        <button className="left-0 text-princeton-orange text-center disabled:opacity-95 disabled:cursor-not-allowed">
                          <NextIcon className="h-8 w-5" />
                        </button>
                      </div>
                    </>
                  )}

                  <div className="w-full">
                    <div className="w-full h-full py-[2.438rem]">
                      <>
                        <Slider showNavControl={false} ref={sliderRef}>
                          {showSliderData.map((resource, index) => {
                            let beforeImage:
                              | ListingImageArtifact
                              | null
                              | undefined = null;
                            if (
                              resource.ArtifactTypeKey ===
                              ImageArtifactKey.DmgEvidenceAfter
                            ) {
                              beforeImage = listingImages.find(
                                (x) =>
                                  x.VehicleListingArtifactId ===
                                  resource.BeforeImageReferenceId
                              );
                            }
                            return (
                              <div key={index}>
                                {resource.ArtifactTypeKey ===
                                ImageArtifactKey.DmgEvidenceBefore ? (
                                  <></>
                                ) : (
                                  <SliderItem key={index} item={resource}>
                                    <>
                                      <VehicleImage
                                        key={index}
                                        imageData={resource}
                                        onClick={() => {
                                          setShowDescriptionText(undefined);
                                          onVehicleImageClick(
                                            resource?.ArtifactUrlPath!,
                                            beforeImage
                                          );
                                        }}
                                      />
                                      {beforeImage && (
                                        <div className="absolute top-0 ltr:right-0 rtl:left-0 p-3 z-10 cursor-pointer">
                                          <div className="flex flex-row-reverse gap-3">
                                            <div
                                              className="compare-icon"
                                              onClick={() => {
                                                beforeImage &&
                                                  onVehicleImageClick(
                                                    beforeImage?.ArtifactUrlPath!
                                                  );
                                                setShowDescriptionText(
                                                  beforeImage?.Description!
                                                );
                                              }}
                                            >
                                              <DamageImageIcon className="h-8 w-8" />
                                            </div>
                                            {beforeImage.Description && (
                                              <div className="bg-primary text-white p-2 text-start rounded-sm">
                                                {beforeImage.Description}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  </SliderItem>
                                )}
                              </div>
                            );
                          })}
                        </Slider>
                      </>
                    </div>
                  </div>
                </div>
                {listingImages.findIndex(
                  (x) =>
                    x.ArtifactCategory === ArtifactCategory.VehicleSupplierImage
                ) !== -1 && (
                  <div className="flex flex-col text-xl font-normal container text-dark-gray2 mt-2">
                    <p>
                      {`*${
                        disclaimerText[
                          CMSConstants.ManufactureVehicleImageDisclaimer
                        ]
                      }`}
                    </p>
                  </div>
                )}
                {vehicleListingData.Overview.IsSelfListedVehicle && (
                  <div className="flex flex-col text-xl font-normal container text-dark-gray2 mt-2">
                    <p>
                      {`*${
                        disclaimerText[
                          CMSConstants.VehicleImagesNotShotByGoGoMotor
                        ]
                      }`}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="container flex flex-col pt-8">
            {vehicleListingData.Overview?.IsOutlet &&
            vehicleBrochureData.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-8 items-center cursor-pointer">
                {vehicleBrochureData.map(
                  (fileData: ListingImageArtifact, index: number) => {
                    if (!fileData.ArtifactUrl) {
                      return <></>;
                    }
                    return (
                      <span
                        key={index}
                        onClick={() => handleDocPreview(fileData)}
                        className="flex flex-row gap-2 underline underline-offset-4"
                      >
                        <p className="text-xl text-primary">
                          {fileData.Description
                            ? fileData.Description
                            : fileData.ArtifactType}
                        </p>
                        <DownloadIcon className="h-6 w-6 text-primary" />
                      </span>
                    );
                  }
                )}
              </div>
            ) : (
              <></>
            )}
            {!vehicleListingData.Overview.IsSelfListedVehicle && (
              <div
                id="emi-calculator"
                ref={EMICalculatorRef}
                className="pb-20 pt-20"
              >
                {/* EMI calculator */}
                <div>
                  <form
                    id="emi-form"
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex flex-col gap-[1.063rem] items-center justify-center">
                      <div className="bg-primary w-[2.997rem] h-2"></div>
                      <div>
                        <h1 className="text-dark-gray1 font-bold uppercase sm:text-5xl text-3xl">
                          {t(LabelConstants.EMI_CALCULATOR)}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 grid-cols-1 gap-4 text-sm">
                        <div
                          className="col-span-1 md:col-span-4
                    md:grid md:grid-cols-2 lg:flex lg:flex-row gap-3 md:justify-center pt-[0.5rem]"
                        >
                          <div className="md:grid md:grid-cols-2 lg:flex lg:flex-row flex flex-row w-full gap-2 justify-between md:justify-start">
                            <div className="whitespace-nowrap text-xl pt-[0.625rem] w-[40%]">
                              <span>{`${t(
                                LabelConstants.VEHICLE_PRICE
                              )} `}</span>
                            </div>
                            <div className="3xl:w-[11.25rem] w-full mb-1 whitespace-nowrap">
                              <FormInputWithLabel
                                name="askingPrice"
                                control={control}
                                disabled={true}
                                className="text-xl"
                                labelPlaceHolder={t(LabelConstants.SAR)}
                                isStartLabel={
                                  router.locale === Locales.EN ? true : false
                                }
                              />
                            </div>
                          </div>
                          <div className="md:grid md:grid-cols-2 lg:flex lg:flex-row flex flex-row w-full gap-2 justify-between md:justify-start">
                            <div className="whitespace-nowrap text-xl pt-[0.625rem] w-[40%]">
                              <span>{`${t(
                                LabelConstants.DOWN_PAYMENT
                              )} `}</span>
                            </div>
                            <div className="3xl:w-[11.25rem] w-full relative mb-1 whitespace-nowrap">
                              <FormInputWithLabel
                                name="downPayment"
                                control={control}
                                className="text-xl"
                                labelPlaceHolder={t(LabelConstants.SAR)}
                                isStartLabel={
                                  router.locale === Locales.EN ? true : false
                                }
                                onBlur={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => onFieldBur(e, 'downPayment')}
                                onFocus={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => onFieldFocus(e, 'downPayment')}
                              />
                            </div>
                          </div>
                          <div className="md:grid md:grid-cols-2 lg:flex lg:flex-row flex flex-row w-full gap-2 justify-between md:justify-start">
                            <div className="whitespace-nowrap text-xl pt-[0.625rem] w-[40%]">
                              {t(LabelConstants.INTEREST_RATE)}
                            </div>
                            <div className="3xl:w-[11.25rem] w-full mb-1">
                              <FormInputWithLabel
                                name="interestRate"
                                className="text-xl font-bold w-full"
                                control={control}
                                isStartLabel={false}
                                onBlur={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => onFieldBur(e, 'interestRate')}
                                onFocus={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => onFieldFocus(e, 'interestRate')}
                              />
                            </div>
                          </div>
                          <div className="md:grid md:grid-cols-2 lg:flex lg:flex-row flex flex-row w-full gap-2 justify-between md:justify-start">
                            <div className="whitespace-nowrap text-xl pt-[0.625rem] w-[40%]">
                              {t(LabelConstants.LOAN_TERM)}
                            </div>
                            <div className="3xl:w-[11.25rem] mb-1 w-full">
                              <FormDropdown
                                options={EMITerm?.LoanTerm!}
                                labelAccessor="LoanTerm"
                                valueAccessor="LoanTermValue"
                                isSearchable={false}
                                control={control}
                                className="text-xl font-bold"
                                name="term"
                                asOption={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-full gap-2 lg:col-span-1 col-span-2 3xl:justify-center sm:justify-center lg:justify-start items-center justify-center text-sm">
                          <button className="btn btn-secondary btn-sm uppercase xl:!min-w-[13rem] min-[1540px]:!min-w-[15rem]">
                            {t(LabelConstants.CALCULATE)}
                          </button>
                        </div>
                      </div>
                      <p className="text-dark-gray1 font-bold text-3xl">
                        {`${t(LabelConstants.INDICATIVE_MONTHLY_EMI)} : `}
                        <span dir="ltr">
                          {parseInt(EMIAmount) > 0 && (
                            <span className="font-bold inline-block mr-1">{`${t(
                              LabelConstants.SAR
                            )} `}</span>
                          )}
                          <span className="font-bold">
                            {parseInt(EMIAmount) > 0 ? EMIAmount : '-'}
                          </span>
                        </span>
                      </p>
                    </div>
                  </form>
                </div>
                <div className="flex flex-col text-xl font-normal text-dark-gray2 mt-3">
                  <p>{`*${t(LabelConstants.EMI_CALCULATOR_DISCLAIMER)}`}</p>
                </div>
              </div>
            )}
            <hr />
            {/* DETAILS */}
            <div ref={DetailsRef} id="details" className="pb-20 pt-20 ">
              {vehicleListingData.Overview && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-[1.063rem] items-center justify-center">
                    <div className="bg-primary w-[2.997rem] h-2"></div>
                    <div>
                      <h1 className="text-dark-gray1 font-bold sm:text-5xl text-3xl uppercase">
                        {t(LabelConstants.DETAILS)}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="text-dark-gray1 font-bold text-3xl">
                      <h1>{`${vehicleListingData.Overview.Make} ${vehicleListingData.Overview.Model} ${vehicleListingData.Overview.Spec}`}</h1>
                    </div>
                    <div className="grid grid-cols-2 md:flex md:justify-between sm:grid-cols-2 ml-4 w-full text-2xl flex-wrap">
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.ID)}: `}
                              <span className="font-bold">
                                {`${
                                  vehicleListingData.Overview.VehicleListingId
                                    ? String(
                                        vehicleListingData.Overview
                                          .VehicleListingId
                                      ).padStart(8, '0')
                                    : '-'
                                }`}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        {vehicleListingData.Overview.ListingSummary && (
                          <ul className="list-disc">
                            <li>
                              <p className="font-bold">
                                {vehicleListingData.Overview.ListingSummary}
                              </p>
                            </li>
                          </ul>
                        )}
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p dir="ltr">
                              <span className="inline-block mr-1">
                                {`${t(LabelConstants.SAR)} `}
                              </span>
                              <span className="font-bold">
                                {vehicleListingData.Overview.AskingPrice
                                  ? formatNumber(
                                      vehicleListingData.Overview.AskingPrice
                                    )
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {vehicleListingData.Overview.ResidualValue &&
                      !vehicleListingData.Overview.IsNew && (
                        <div className="text-2xl ml-4">
                          <ul className="list-disc">
                            <li>
                              <p dir="ltr">
                                {`${t(LabelConstants.RESIDUAL_VALUE)}: `}
                                <span className="inline-block mr-1">
                                  {`${t(LabelConstants.SAR)} `}
                                </span>
                                <span className="font-bold">
                                  {formatNumber(
                                    vehicleListingData.Overview.ResidualValue
                                  )}
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                    <div className="flex flex-col">
                      <div className="mt-2">
                        {isAuthenticated
                          ? inspectionData?.ReportUrl && (
                              <a
                                className="text-primary text-2xl font-bold underline cursor-pointer"
                                href={inspectionData.ReportUrl}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {t(
                                  LabelConstants.DOWNLOAD_VIEW_INSPECTION_REPORT
                                )}
                              </a>
                            )
                          : inspectionData?.ReportUrl && (
                              <a
                                className="text-primary text-2xl font-bold underline cursor-pointer"
                                onClick={() => {
                                  setShowLogin(true);
                                  const SignInRedirectOperationObj = {
                                    RedirectOperationType:
                                      SignInRedirectType.ViewedInspectionReport,
                                  };
                                  localStorage.setItem(
                                    'SignInRedirectOperation',
                                    JSON.stringify(SignInRedirectOperationObj)
                                  );
                                }}
                                rel="noreferrer"
                              >
                                {t(
                                  LabelConstants.DOWNLOAD_VIEW_INSPECTION_REPORT
                                )}
                              </a>
                            )}
                      </div>
                      {inspectionData?.ReportUrl && (
                        <div>
                          <p className="text-2xl">
                            {`${t(LabelConstants.VEHICLE_DISCLAIMER)} `}
                            <span className="inline-block">
                              {`"${inspectionDate}"`}
                            </span>
                            {` ${t(LabelConstants.NOT_RESPONSIBLE)}`}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      {vehicleListingData.Overview?.MojazDocumentUrl !==
                        null && (
                        <>
                          <div
                            className="cursor-pointer"
                            onClick={handleDownloadVehicleHistory}
                          >
                            <a className="text-primary text-2xl font-bold underline cursor-pointer">
                              {t(LabelConstants.MOJAZ_FULL_REPORT)}
                            </a>
                          </div>
                          <div className="text-2xl">
                            <p>
                              {`${t(LabelConstants.DISCLAIMER)}: ${
                                noInspectionDisclaimerText[
                                  CMSConstants.MojazFullReportDisclaimer
                                ]
                              }`}
                            </p>
                          </div>
                          {/* <div>
                              <p>
                                {`${t(LabelConstants.VEHICLE_DISCLAIMER)} `}
                                <span className="inline-block">
                                  {`"${MojazDocumentFetchDate}"`}
                                </span>
                                {` ${t(LabelConstants.NOT_RESPONSIBLE)}`}
                              </p>
                            </div> */}
                        </>
                      )}
                    </div>
                    <div>
                      {vehicleListingData.Overview.IsSelfListedVehicle && (
                        <div className="text-primary">
                          <p>
                            {`${t(LabelConstants.DISCLAIMER)}: ${
                              noInspectionDisclaimerText[
                                CMSConstants.NoInspectionDisclaimer
                              ]
                            }`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <hr />
            {/* OVERVIEW */}
            {vehicleListingData.Overview && (
              <div ref={OverViewRef} id="overview" className="pb-20 pt-20 ">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-[1.063rem] items-center justify-center">
                    <div className="bg-primary w-[2.997rem] h-2"></div>
                    <div>
                      <h1 className="text-dark-gray1 font-bold sm:text-5xl text-3xl uppercase">
                        {t(LabelConstants.OVERVIEW)}
                      </h1>
                    </div>
                  </div>
                  <div className="">
                    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-20 sm:grid-cols-3 gap-4 ml-4 w-full text-2xl">
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.MANUFACTURING_YEAR)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.ModelYear
                                  ? vehicleListingData.Overview.ModelYear
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.MODEL)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.Model
                                  ? vehicleListingData.Overview.Model
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.SELLER)}: `}
                              <span className="font-bold">
                                {seller ? seller : '**** ****'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      {!(
                        vehicleListingData.Overview.IsNew ||
                        vehicleListingData.Overview.IsOutlet
                      ) && (
                        <div>
                          <ul className="list-disc">
                            <li>
                              <p>
                                {`${t(LabelConstants.KILOMETERS)}: `}
                                <span className="font-bold">
                                  {vehicleListingData.Overview
                                    .OdometerReading >= 0
                                    ? formatNumber(
                                        vehicleListingData.Overview
                                          .OdometerReading
                                      )
                                    : '-'}
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                      {!(
                        vehicleListingData.Overview.IsNew ||
                        vehicleListingData.Overview.IsOutlet
                      ) && (
                        <div>
                          <ul className="list-disc">
                            <li>
                              <p>
                                {`${t(LabelConstants.OWNER)}: `}
                                <span className="font-bold">
                                  {vehicleListingData.Overview.OwnershipId
                                    ? vehicleListingData.Overview.OwnershipId
                                    : '-'}
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                      )}
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.FUEL)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.FuelType
                                  ? vehicleListingData.Overview.FuelType
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.TRANSMISSION)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.Transmission
                                  ? vehicleListingData.Overview.Transmission
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.BODY_STYLE)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.BodyType
                                  ? vehicleListingData.Overview.BodyType
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.LOCATION)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.City
                                  ? vehicleListingData.Overview.City
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.EXTERIOR_COLOR)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.ExteriorColor
                                  ? vehicleListingData.Overview.ExteriorColor
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="list-disc">
                          <li>
                            <p>
                              {`${t(LabelConstants.INTERIOR_COLOR)}: `}
                              <span className="font-bold">
                                {vehicleListingData.Overview.InteriorColor
                                  ? vehicleListingData.Overview.InteriorColor
                                  : '-'}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <hr />
            {/* SPECIFICATION */}
            {vehicleListingData.Specification && (
              <div
                ref={SpecificationRef}
                id="specifications"
                className="pb-20 pt-20 "
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-[1.063rem] items-center justify-center">
                    <div className="bg-primary w-[2.997rem] h-2"></div>
                    <div>
                      <h1 className="text-dark-gray1 font-bold sm:text-5xl text-3xl uppercase">
                        {t(LabelConstants.SPECIFICATION)}
                      </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-x-20 gap-4 ml-4 w-full text-2xl">
                    <div>
                      <ul className="list-disc">
                        <li>
                          <p>
                            {`${t(LabelConstants.ENGINE)}: `}
                            <span className="font-bold">
                              {vehicleListingData.Specification.EngineSize
                                ? vehicleListingData.Specification.EngineSize
                                : '-'}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc">
                        <li>
                          <p>
                            {`${t(LabelConstants.MAX_POWER)}: `}
                            <span className="font-bold">
                              {vehicleListingData.Specification.Horsepower
                                ? vehicleListingData.Specification.Horsepower
                                : '-'}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc">
                        <li>
                          <p>
                            {`${t(LabelConstants.DRIVE_TYPE)}: `}
                            <span className="font-bold">
                              {vehicleListingData.Specification.FinalDrive
                                ? vehicleListingData.Specification.FinalDrive
                                : '-'}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc">
                        <li>
                          <p>
                            {`${t(LabelConstants.DOORS)}: `}
                            <span className="font-bold">
                              {vehicleListingData.Specification.Doors
                                ? vehicleListingData.Specification.Doors
                                : '-'}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc">
                        <li>
                          <p>
                            {`${t(LabelConstants.SEATS)}: `}
                            <span className="font-bold">
                              {vehicleListingData.Specification.Seats
                                ? vehicleListingData.Specification.Seats
                                : '-'}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc">
                        <li>
                          <p>
                            {`${t(LabelConstants.CYLINDERS)}: `}
                            <span className="font-bold">
                              {vehicleListingData.Specification.NoOfCycles
                                ? vehicleListingData.Specification.NoOfCycles
                                : '-'}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FEATURES */}
            {vehicleListingData.Features &&
              vehicleListingData.Features.length > 0 &&
              vehicleListingData.Features.some(
                (feature) => feature.FeatureList.length > 0
              ) && (
                <>
                  <hr />
                  <div ref={FeaturesRef} id="features" className="pb-20 pt-20">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-[1.063rem] items-center justify-center">
                        <div className="bg-primary w-[2.997rem] h-2"></div>
                        <div>
                          <h1 className="text-dark-gray1 font-bold sm:text-5xl text-3xl uppercase">
                            {t(LabelConstants.FEATURES)}
                          </h1>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-2xl">
                        {vehicleListingData.Features.filter(
                          (x) => x.FeatureList && x.FeatureList.length > 0
                        ).map((feature, index) => {
                          return (
                            <div key={index}>
                              <div className="font-bold pb-5 break-words">
                                {feature.FeatureCategory}
                              </div>
                              <div>
                                <ul className="list-disc list-inside flex flex-wrap gap-x-4">
                                  {feature.FeatureList &&
                                    feature.FeatureList.length > 0 &&
                                    feature.FeatureList.map((item, id) => {
                                      return (
                                        <li key={id}>
                                          <span className="relative ltr:-left-3 rtl:left-2">
                                            {item.Feature}
                                          </span>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            <hr />
            {/* VEHICLE JOURNEY */}
            {vehicleListingData.Overview?.IsOutlet &&
              vehicleListingData.Overview?.VehicleJourney && (
                <div
                  ref={VehicleJourneyRef}
                  id="vehicle-journey"
                  className="pb-20 pt-20 "
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-[1.063rem] items-center justify-center">
                      <div className="bg-primary w-[2.997rem] h-2"></div>
                      <div>
                        <h1 className="text-dark-gray1 font-bold sm:text-5xl text-3xl uppercase">
                          {t(LabelConstants.VEHICLE_JOURNEY)}
                        </h1>
                      </div>
                    </div>
                    <div className="text-2xl text-center">
                      <p>
                        {
                          vehicleListingData.Overview[
                            CMSConstants.VehicleJourney
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Finance It Modal */}
          <Modal
            show={financePopUp}
            onClose={() => setFinancePopUp(false)}
            containerClassName="w-[40rem]"
          >
            <>
              <ModalHeader>
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold text-primary">
                    {t(LabelConstants.HOW_TO_BUY)}
                  </h1>
                  <span className="text-base font-normal">
                    {t(LabelConstants.BUY_OPTION_HEADING)}
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 justify-center ">
                  <hr className="mb-5 border-t border-light-gray" />

                  <div
                    className="flex cursor-pointer flex-row items-center gap-9 p-5 hover:border-selection  rounded-sm border border-light-gray"
                    onClick={() => handleFinanceIt()}
                  >
                    <div className="w-16">
                      <FinanceItCarIcon className="w-20 h-20" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-2xl font-bold text-dark-gray1">
                        {t(LabelConstants.FINANCE_IT)}
                      </h1>
                      <span className="text-sm">
                        {t(LabelConstants.FINANCE_BUY_OPTION)}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex cursor-pointer flex-row items-center gap-9 p-5 hover:border-selection  rounded-sm border border-light-gray"
                    onClick={() => handleCash()}
                  >
                    <div className="w-16 flex justify-center">
                      <FinanceItCashIcon className="w-12 h-12" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-2xl font-bold text-dark-gray1">
                        {t(LabelConstants.CASH)}
                      </h1>
                      <span className="text-sm">
                        {t(LabelConstants.CASH_BUY_OPTION)}
                      </span>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          </Modal>

          <ShareModal
            show={openShareModal}
            listingId={vehicleListingData.Overview.VehicleListingId}
            sharingPlatform={platforms}
            onClose={() => setOpenShareModal(false)}
            shareUrl={
              router.locale === Locales.EN
                ? `${window.location.origin}/car-details/${vehicleListingData.Overview.VehicleListingId}`
                : `${window.location.origin}/ar/car-details/${vehicleListingData.Overview.VehicleListingId}`
            }
          />

          <SellerDetailsModal
            show={openSellerDetailsModal}
            onClose={() => setOpenSellerDetailsModal(false)}
            listingId={vehicleListingData.Overview.VehicleListingId}
          />

          <SpinCarPopUp
            showPopUp={showSpinCarPopUp}
            closeModal={setShowSpinCarPopUp}
            artifactURL={spinArtifactURL!}
          ></SpinCarPopUp>

          <VehicleImagePopUp
            showPopUp={showVehicleImagePopUp}
            closeModal={setShowVehicleImagePopUp}
            imageUrl={vehiclePopUpImage}
            popUpBeforeImage={popUpBeforeImage}
            showDescriptionText={showDescriptionText}
            openBeforeImage={() => {
              setShowDescriptionText(popUpBeforeImage?.Description!);
              popUpBeforeImage &&
                onVehicleImageClick(popUpBeforeImage?.ArtifactUrlPath!);
            }}
            showSliderData={showSliderData}
          ></VehicleImagePopUp>

          {previewArtifact && (
            <DocumentPreview
              showPopUp={showDocumentPreview}
              closeModal={setShowDocumentPreview}
              documentUrl={previewArtifact.ArtifactUrlPath || ''}
              mimeType={previewArtifact.MimeType}
              documentName={
                previewArtifact.Description
                  ? previewArtifact.Description!
                  : previewArtifact.ArtifactUrl!
              }
            />
          )}

          {/* Delete Vehicle Modal */}
          <DeleteVehicleModal
            show={openDeleteVehicleModal}
            listingId={vehicleListingData.Overview.VehicleListingId}
            onClose={(isDeleted: boolean) => {
              if (isDeleted) router.push('/');
              setOpenDeleteVehicleModal(false);
            }}
          />
          <DocumentUploadModal
            show={openBuyerDocumentModal}
            listingId={vehicleListingData.Overview.VehicleListingId}
            hide={setOpenBuyerDocumentModal}
          />
          <MojazReportDisplayModal
            show={showMojazReportModal}
            hide={setShowMojazReportModal}
            reportData={reportData}
          />
          {showRestrictUserDropdown && (
            <ShowRestrictUserDropdown
              showDropdown={showRestrictUserDropdown}
              setShowDropdown={setShowRestrictUserDropdown}
            />
          )}

          {/* Confirmation Modal */}
          <Modal
            show={openConfirmationModal}
            onClose={() => setOpenConfirmationModal(false)}
            size={ModalSize.MEDIUM}
          >
            <>
              <ModalHeader>
                <div className="justify-start border-b-2 pb-4">
                  <h1 className="text-2xl text-gray-700 font-bold">
                    {t(LabelConstants.DISCLAIMER)}
                  </h1>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <div className="justify-center text-md flex flex-col gap-3 text-start font-normal">
                    <p>
                      {
                        disclaimerMessage[
                          CMSConstants.OutletVehiclePurchaseDisclaimer
                        ]
                      }
                    </p>
                  </div>
                  <div className="mt-20">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 cursor-pointer"
                        checked={isSelected}
                        onChange={handleCheckBox}
                      />
                      <span className="font-normal">
                        {t(LabelConstants.I_ACKNOWLEDGE)}
                      </span>
                    </label>
                  </div>
                  {showWarning && (
                    <>
                      <p className=" pt-4 text-red-500">
                        {t(LabelConstants.PLEASE_SELECT_THE_CHECKBOX)}
                      </p>
                    </>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-end gap-1 !text-sm sm:gap-5 border-t-2 pt-6 items-center ">
                  <button
                    className="btn btn-secondary btn-auto !w-32 text-center uppercase !min-h-[3.4rem]"
                    onClick={() => setOpenConfirmationModal(false)}
                  >
                    {t(LabelConstants.CANCEL)}
                  </button>
                  <button
                    className="btn btn-primary btn-auto !w-32 text-center uppercase !min-h-[3.4rem]"
                    onClick={() => {
                      //fianceItClickHandler();
                      if (!isSelected) {
                        setShowWarning(true);
                      } else if (isSelected) {
                        handleSave();
                        setOpenConfirmationModal(false);
                        setOpenSellerDetailsModal(true);
                      }
                    }}
                  >
                    {t(LabelConstants.PROCEED)}
                  </button>
                </div>
              </ModalFooter>
            </>
          </Modal>
        </>
      ) : (
        <></>
      )}
      <SignInModal
        show={showLogin}
        onClose={() => {
          if (String(router.query.tab).toLowerCase() === 'doc') {
            router.replace('/');
          }
          setShowLogin(false);
          localStorage.removeItem('SignInRedirectOperation');
        }}
      />
    </div>
  );
};

export default UsedCarDetailsPage;

export const getServerSideProps: GetServerSideProps<
  UsedCarDetailsPageProps
> = async ({ locale, params, query }: GetServerSidePropsContext) => {
  const { slug } = params as {
    slug: Array<string>;
  };
  const translations = await serverSideTranslations(locale || Locales.EN, [
    'common',
  ]);
  if (slug && slug.length > 0 && Number(slug[slug.length - 1])) {
    const [platforms] = await Promise.all([
      GlobalService.fetchSocialMediaPlatform(locale),
    ]);

    const brand = slug.length > 1 ? slug[0] : '';
    const model = slug.length > 2 ? slug[1] : '';
    const year = query.y ?? '';
    const defaultMetaData = { title: '', description: '' };
    const title =
      translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
        .META_TITLE_USED_MODEL_DETAIL ?? '';
    const description =
      translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
        .META_DESCRIPTION_USED_MODEL_DETAIL ?? '';
    defaultMetaData.title = title
      .replaceAll('{brand}', brand)
      .replaceAll('{year}', year)
      .replaceAll('{model}', model);

    defaultMetaData.description = description
      .replaceAll('{brand}', brand)
      .replaceAll('{year}', year)
      .replaceAll('{model}', model);

    return {
      props: {
        ...translations,
        defaultMetaData,
        platforms,
        vehicleId: Number(slug[slug.length - 1]),
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {
        ...translations,
      },
    };
  }
};
