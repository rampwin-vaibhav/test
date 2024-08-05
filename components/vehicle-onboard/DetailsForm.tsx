import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import React, {
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ProfileService, VehicleService } from '../../helpers/services';
import { LabelConstants } from '../../types/i18n.labels';
import {
  Feature,
  FeaturesData,
  Make,
  Model,
  ModelYearData,
  PackageResponse,
  Spec,
  VehicleDescriptionData,
  VehicleListingData,
  VinNumberData,
} from '../../types/models';
import FormDropdown from '../common/Form/FormDropdown';
import { useRouter } from 'next/router';
import { FormInput } from '../common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ConfigurationKey,
  Locales,
  VehicleListingSource,
  VehicleListingWorkflowNumber,
} from '../../types/enums';
import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { toast } from 'react-toastify';
import MessageBox, { MessageBoxType } from '../common/MessageBox';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import ConfigurationService from '../../helpers/services/configuration.service';

type FeaturesProps = {
  vin: string;
  vehicleDetails: VinNumberData[];
  listingId: number | null;
  setListingId: (value: SetStateAction<number | null>) => void;
  listingData: VehicleListingData | null;
  setIsDirty: (value: SetStateAction<boolean>) => void;
  p_id: string;
  order_id: string;
  setOpenSignInModal: (value: SetStateAction<boolean>) => void;
  setIsTabValid: (value: SetStateAction<boolean>) => void;
  setIsVin: (value: SetStateAction<boolean>) => void;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  packageDetails: PackageResponse;
};

interface IFormInput {
  vinNumber: string;
  year: ModelYearData;
  make: Make;
  model: Model;
  spec: Spec;
  sequenceNumber: string;
  ownerId: string;
  plateNumber: string;
}

const schema = yup
  .object({
    year: yup.object().required(LabelConstants.REQUIRED_FIELD),
    make: yup.object().required(LabelConstants.REQUIRED_FIELD),
    model: yup.object().required(LabelConstants.REQUIRED_FIELD),
    spec: yup.object().required(LabelConstants.REQUIRED_FIELD),
    sequenceNumber: yup
      .string()
      .nullable()
      .required(LabelConstants.REQUIRED_FIELD)
      .test(
        'maxDigit',
        LabelConstants.INVALID_SEQUENCE_NUMBER,
        (data) => data?.trim().length === 9
      ),
    ownerId: yup
      .string()
      .nullable()
      .required(LabelConstants.REQUIRED_FIELD)
      .test(
        'maxDigit',
        LabelConstants.INVALID_OWNER_ID,
        (data) => data?.trim().length === 10
      ),
    plateNumber: yup
      .string()
      .nullable()
      .test(
        'maxDigit',
        LabelConstants.INVALID_PLATE_NUMBER,
        (number) =>
          String(number).trim().length === 7 ||
          !number ||
          String(number).trim().length === 0
      )
      .matches(/^[a-zA-Z]{3}[0-9]{4}$/, LabelConstants.INVALID_PLATE_NUMBER)
      .required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

export const DetailsForm: FC<FeaturesProps> = ({
  vin,
  vehicleDetails,
  listingId,
  setListingId,
  listingData,
  setIsDirty,
  p_id,
  order_id,
  setOpenSignInModal,
  setIsTabValid,
  setIsVin,
  setIsLoading,
  packageDetails,
}): ReactElement => {
  const { t } = useTranslation();
  const [disableInput, setDisableInput] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { year, make, model } = watch();

  const [featureList, setFeatureList] = useState<Array<Feature>>();
  const [makeData, setMakeData] = useState<Array<Make>>([]);
  const [modelData, setModelData] = useState<Array<Model>>([]);
  const [spec, setSpec] = useState<Array<Spec>>([]);
  const [yearData, setYearData] = useState<Array<ModelYearData>>([]);
  const [features, setFeatures] = useState<Array<FeaturesData>>([]);
  const [formData, setFormData] = useState<IFormInput>();
  const [selected, setSelected] = useState<number>(0);

  const [existsPopup, showExistsPopup] = useState(false);
  const [check, showCheck] = useState(false);

  useEffect(() => {
    if (make && make.MakeCode) {
      // To fetch model dropdown data
      const loadModelData = async () => {
        const modelData = await VehicleService.fetchModelByMake(
          make.MakeCode,
          router.locale
        );
        setModelData(modelData);
      };
      loadModelData();
    }

    if (model && model.MakeCode && model.ModelCode) {
      // To fetch spec dropdown data
      const loadSpecData = async () => {
        const specData = await VehicleService.fetchVehicleSpecs(
          model.MakeCode,
          model.ModelCode
        );
        setSpec(specData);
      };
      loadSpecData();
    }
  }, [year, make, model, router]);

  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty, setIsDirty]);

  // This useEffect handle the edit case
  useEffect(() => {
    if (listingData) {
      setIsTabValid(true);
      reset({
        vinNumber: listingData?.Overview.Vin!,
        year: {
          ModelYear: listingData.Overview.ModelYear,
          ModelYearCode: listingData.Overview.ModelYearCode,
        },
        make: {
          Make: listingData.Overview.Make,
          MakeCode: listingData.Overview.MakeCode,
        },
        model: {
          MakeCode: listingData.Overview.MakeCode,
          Model: listingData.Overview.Model,
          ModelCode: listingData.Overview.ModelCode,
        },
        spec: {
          MakeCode: listingData.Overview.MakeCode,
          ModelCode: listingData.Overview.ModelCode,
          Trim: listingData.Overview.Spec,
          TrimCode: listingData.Overview.SpecCode,
        },
        sequenceNumber: listingData.Overview.ELMSequenceNumber!,
        ownerId: listingData.Overview.ELMOwnerId
          ? String(listingData.Overview.ELMOwnerId)
          : '',

        plateNumber: listingData.Overview.LicensePlateNumber!,
      });
      let newObj: any = [];
      listingData.Features.forEach((x) => {
        x.FeatureList.forEach((y) => {
          const newObj1 = {
            FeatureId: y.FeatureId,
            IsAvailable: true,
          };
          newObj.push(newObj1);
        });
      });
      setFeatures(newObj);

      const initialLoad = async () => {
        const profileData = await ProfileService.fetchUserData(router.locale);
        const IsVehicleExistenceWithMojazRequired =
          await ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.IsVehicleExistenceWithMojazRequired,
            router.locale
          );
        const IsVehicleOwnershipVerificationWithYakeenRequired =
          await ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.IsVehicleOwnershipVerificationWithYakeenRequired,
            router.locale
          );

        if (
          (IsVehicleExistenceWithMojazRequired.ConfigurationValue === 'true' &&
            profileData.IsVehicleVerificationRequired &&
            listingData.Overview.IsELMMojazVerified) ||
          (IsVehicleOwnershipVerificationWithYakeenRequired.ConfigurationValue ===
            'true' &&
            profileData.IsVehicleOwnershipVerificationRequired &&
            listingData.Overview.IsELMYakeenVerified)
        ) {
          setDisableInput(true);
        } else {
          setDisableInput(false);
        }
      };
      initialLoad();

      if (listingId) {
        setValue('sequenceNumber', '*********');
        setValue('ownerId', '**********');
      }
    }
  }, [listingData, reset]);

  useEffect(() => {
    if (vin && vehicleDetails.length > 0) {
      reset({
        vinNumber: vin,
        year: {
          ModelYear: vehicleDetails[0].ModelYear,
          ModelYearCode: vehicleDetails[0].ModelYearCode,
        },
        make: {
          Make: vehicleDetails[0].Make,
          MakeCode: vehicleDetails[0].MakeCode,
        },
        model: {
          MakeCode: vehicleDetails[0].MakeCode,
          Model: vehicleDetails[0].Model,
          ModelCode: vehicleDetails[0].ModelCode,
        },
        spec: {
          MakeCode: vehicleDetails[0].MakeCode,
          ModelCode: vehicleDetails[0].ModelCode,
          Trim: vehicleDetails[0].Spec,
          TrimCode: vehicleDetails[0].SpecCode,
        },
      });
    }
  }, [vehicleDetails, vin, reset]);

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Vehicle Details Initiated
    PushDataToGTMWithSubEvents(
      GTMEvents.ListMyCar,
      GTMSubEvents.VehicleDetails,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
  }, [router.locale]);

  useEffect(() => {
    const initialLoad = async () => {
      const res = await VehicleService.fetchFilterMetadata(router.locale);
      setFeatureList(res.Features);
      const modelYearData = await VehicleService.fetchModelYearAutoData();
      setYearData(modelYearData);
      const makeData = await VehicleService.fetchAllMake(router.locale);
      setMakeData(makeData);
    };
    initialLoad();
  }, [router]);

  const handleNextData = async (formData: IFormInput | undefined) => {
    setIsLoading(true);
    const data = {
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      Vin: vin ? vin : null,
      ModelYearCode: vin ? null : formData?.year.ModelYearCode,
      ModelYear: formData?.year.ModelYear,
      MakeCode: vin ? null : formData?.make.MakeCode,
      Make: formData?.make.Make,
      MakeAr: null,
      ModelCode: vin ? null : formData?.model.ModelCode,
      Model: formData?.model.Model,
      ModelAr: null,
      SpecCode: vin ? null : formData?.spec.TrimCode,
      Spec: formData?.spec.Trim,
      SpecAr: null,
      SpecRegionId: 1,
      VehicleListingSourceType: VehicleListingSource.SellItForMe,
      VehicleListingId: listingId ? listingId : 0,
      IgnoreWarning: check ? check : false,
      ELMSequenceNumber: listingId ? null : formData?.sequenceNumber,
      ELMPlate1: formData?.plateNumber[0],
      ELMPlate2: formData?.plateNumber[1],
      ELMPlate3: formData?.plateNumber[2],
      ELMPlateNumber: formData?.plateNumber.substring(3),
      ELMOwnerId: listingId ? null : formData?.ownerId,
      VendorModelYearCode: vin ? formData?.year.ModelYearCode : 0,
      VendorMakeCode: vin ? formData?.make.MakeCode : 0,
      VendorModelCode: vin ? formData?.model.ModelCode : 0,
      VendorSpecCode: vin ? formData?.spec.TrimCode : 0,
      PackageReferenceId:
        p_id == 'undefined'
          ? listingData?.Overview && listingData?.Overview.PackageReferenceId
          : p_id,
      OrderItemId:
        order_id == 'undefined'
          ? listingData?.Overview && listingData?.Overview.OrderItemId
          : order_id,
      IsVinDecoded: listingId
        ? listingData?.Overview.IsVinDecoded
        : vehicleDetails.length > 0
        ? vehicleDetails[0].IsVinDecoded
        : false,
    };

    try {
      const vehicleDetailsResponseData = await VehicleService.addVehicleDetails(
        data
      );
      if (vehicleDetailsResponseData.IsSuccess) {
        const featurePayload = {
          Features: features,
          VehicleListingId: vehicleDetailsResponseData.VehicleListingId,
        };
        VehicleService.addFeatures(featurePayload);
        setIsTabValid(true);
        router.replace(
          `/vehicle-onboard/${vehicleDetailsResponseData.VehicleListingId}?tab=Additional Information`,
          // ${
          //   p_id != 'undefined' ? `&p_id=${p_id}&OrderItemId=${order_id}` : ''
          // }
          undefined
        );
        setIsDirty(false);
        setListingId(vehicleDetailsResponseData.VehicleListingId);
      } else {
        if (
          vehicleDetailsResponseData.MessageCode ===
          'SAVEVEHICLE_MODELYEAR_NOTALLOWED'
        ) {
          setIsLoading(false);
          return toast.warning(t(LabelConstants.VEHICLE_OLDER_AGE_ERROR));
        }
        if (
          vehicleDetailsResponseData.MessageCode === 'VEHICLE_ALREADY_EXISTS'
        ) {
          setIsLoading(false);
          return showExistsPopup(true);
        }
        if (
          vehicleDetailsResponseData.MessageCode === 'VEHICLE_ALREADY_UPLOADED'
        ) {
          setIsLoading(false);
          return toast.warning(t(LabelConstants.VEHICLE_ALREADY_UPLOADED));
        }
        if (
          vehicleDetailsResponseData.MessageCode ===
          'VEHICLE_OWNERSHIP_DETAILS_ALREADY_EXISTS'
        ) {
          setIsLoading(false);
          return MessageBox.open({
            content: t(LabelConstants.VEHICLE_OWNERSHIP_DETAILS_ALREADY_EXISTS),
            type: MessageBoxType.Message,
          });
        }
        if (
          vehicleDetailsResponseData.MessageCode ===
            'INVALID_VEHICLE_INFORMATION' ||
          vehicleDetailsResponseData.MessageCode ===
            'INVALID_SEQUENCENUMBER_OWNERID_COMBINATION'
        ) {
          setIsLoading(false);
          return MessageBox.open({
            content: t(LabelConstants.INVALID_VEHICLE_INFORMATION),
            type: MessageBoxType.Message,
          });
        }
        if (
          vehicleDetailsResponseData.MessageCode ===
          'SAVEVEHICLE_SOMETHING_WENT_WRONG'
        ) {
          setIsLoading(false);
          return MessageBox.open({
            content: t(LabelConstants.SAVE_VEHICLE_SOMETHING_WENT_WRONG),
            type: MessageBoxType.Message,
          });
        }
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
    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      setFormData(data);

      if (listingData?.Overview.VehicleListingWorkflowNumber) {
        if (
          listingData?.Overview.VehicleListingWorkflowNumber! <=
          VehicleListingWorkflowNumber.Saved
        ) {
          handleNextData(data);
        } else {
          router.push(
            `/vehicle-onboard/${listingId}?tab=Additional Information`,
            // ${
            //   p_id !== 'undefined'
            //     ? `&p_id=${p_id}&OrderItemId=${order_id}`
            //     : ''
            // }
            undefined,
            { shallow: true }
          );
        }
      } else {
        handleNextData(data);
      }
    }
  };

  const handleFilterChange = (id: any) => {
    if (listingData?.Overview.VehicleListingWorkflowNumber) {
      if (
        listingData?.Overview.VehicleListingWorkflowNumber! <=
        VehicleListingWorkflowNumber.Saved
      ) {
        if (features.some((x) => x.FeatureId === id)) {
          setFeatures(features.filter((item) => item.FeatureId != id));
        } else {
          setFeatures([...features, { FeatureId: id, IsAvailable: true }]);
        }
      }
    } else {
      if (features.some((x) => x.FeatureId === id)) {
        setFeatures(features.filter((item) => item.FeatureId != id));
      } else {
        setFeatures([...features, { FeatureId: id, IsAvailable: true }]);
      }
    }
  };

  const handleValidation = (check: any) => {
    if (check) {
      showCheck(true);
    }
    showExistsPopup(false);
  };

  return (
    <>
      <div className="flex justify-between mt-8 mb-2">
        {packageDetails?.IsSelfListedPackage && !listingId ? (
          <div
            className="text-base underline text-error cursor-pointer"
            onClick={() => {
              setIsVin(true);
            }}
          >
            {t(LabelConstants.UPDATE_VIN_NUMBER)}
          </div>
        ) : (
          <div></div>
        )}
        <button
          type="button"
          className="btn btn-primary btn-auto btn-link"
          onClick={() => {
            router.push('/vehicle-not-found');
          }}
        >
          {t(LabelConstants.CANNOT_FIND_MY_VEHICLE)}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row w-full justify-between  gap-x-28 vehicle-details-tab">
        <form
          id="details-form"
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[1.875rem] w-full">
            {/* {((vin && vehicleDetails.length > 0) ||
              listingData?.Overview.Vin) && (
              <div className="flex flex-col w-full">
                <FormInput
                  control={control}
                  name="vinNumber"
                  label={t(LabelConstants.VIN_NUMBER)}
                  disabled={vin || listingData?.Overview.Vin ? true : false}
                />
              </div>
            )} */}
            <div className="w-full flex flex-col gap-[1.875rem]">
              <div className="w-full">
                {(vin && vehicleDetails.length > 0) ||
                listingData?.Overview.VehicleListingWorkflowNumber! >=
                  VehicleListingWorkflowNumber.Saved ? (
                  <div className="flex flex-col">
                    <label>{`${t(LabelConstants.YEAR)}*`}</label>
                    <input
                      value={
                        vehicleDetails && vehicleDetails.length > 0
                          ? vehicleDetails[0].ModelYear
                          : listingData?.Overview.ModelYear
                      }
                      disabled
                    />
                  </div>
                ) : (
                  <FormDropdown
                    options={yearData}
                    labelAccessor="ModelYear"
                    valueAccessor="ModelYearCode"
                    labelText={`${t(LabelConstants.YEAR)}*`}
                    placeHolderText={t(LabelConstants.SELECT_YEAR)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="year"
                  />
                )}
              </div>
              <div className="w-full">
                {(vin && vehicleDetails.length > 0) ||
                listingData?.Overview.VehicleListingWorkflowNumber! >=
                  VehicleListingWorkflowNumber.Saved ? (
                  <div className="flex flex-col">
                    <label>{`${t(LabelConstants.MAKE)}*`}</label>
                    <input
                      value={
                        vehicleDetails && vehicleDetails.length > 0
                          ? vehicleDetails[0].Make
                          : listingData?.Overview.Make
                      }
                      disabled
                    />
                  </div>
                ) : (
                  <FormDropdown
                    options={(makeData || []).sort((a, b) =>
                      a.MakeKey.toLowerCase() > b.MakeKey.toLowerCase() ? 1 : -1
                    )}
                    labelAccessor="Make"
                    valueAccessor="MakeCode"
                    labelText={`${t(LabelConstants.MAKE)}*`}
                    placeHolderText={t(LabelConstants.SELECT_MAKE)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="make"
                  />
                )}
              </div>
              <div className=" w-full">
                {(vin && vehicleDetails.length > 0) ||
                listingData?.Overview.VehicleListingWorkflowNumber! >=
                  VehicleListingWorkflowNumber.Saved ? (
                  <div className="flex flex-col">
                    <label>{`${t(LabelConstants.MODEL)}*`}</label>
                    <input
                      value={
                        vehicleDetails && vehicleDetails.length > 0
                          ? vehicleDetails[0].Model
                          : listingData?.Overview.Model
                      }
                      disabled
                    />
                  </div>
                ) : (
                  <FormDropdown
                    options={(modelData || []).sort((a, b) =>
                      a.ModelKey.toLowerCase() > b.ModelKey.toLowerCase()
                        ? 1
                        : -1
                    )}
                    labelAccessor="Model"
                    valueAccessor="ModelCode"
                    labelText={`${t(LabelConstants.MODEL)}*`}
                    placeHolderText={t(LabelConstants.SELECT_MODEL)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="model"
                  />
                )}
              </div>
              <div className="w-full">
                {(vin && vehicleDetails.length > 0) ||
                listingData?.Overview.VehicleListingWorkflowNumber! >=
                  VehicleListingWorkflowNumber.Saved ? (
                  <div className="flex flex-col">
                    <label>{`${t(LabelConstants.TRIM)}*`}</label>
                    <input
                      value={
                        vehicleDetails && vehicleDetails.length > 0
                          ? vehicleDetails[0].Spec
                          : listingData?.Overview.Spec
                      }
                      disabled
                    />
                  </div>
                ) : (
                  <FormDropdown
                    options={(spec || []).sort((a, b) =>
                      a.TrimKey.toLowerCase() > b.TrimKey.toLowerCase() ? 1 : -1
                    )}
                    labelAccessor="Trim"
                    valueAccessor="TrimCode"
                    labelText={`${t(LabelConstants.TRIM)}*`}
                    placeHolderText={t(LabelConstants.SELECT_STYLE)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="spec"
                  />
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-[1.875rem]">
              <div className="flex flex-col w-full md:flex-row">
                <div className="flex w-full gap-[1.875rem]">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col">
                      <FormInput
                        control={control}
                        name="sequenceNumber"
                        label={`${t(LabelConstants.SEQUENCE_NUMBER)}*`}
                        disabled={listingId ? true : false}
                        placeholder={listingId ? '*********' : ''}
                        maxLength={9}
                        pattern={/[^0-9]+/}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full md:pt-0">
                    <div className="flex flex-col">
                      <FormInput
                        control={control}
                        name="ownerId"
                        label={`${t(LabelConstants.OWNER_ID)}*`}
                        disabled={listingId ? true : false}
                        placeholder={listingId ? '**********' : ''}
                        maxLength={10}
                        pattern={/[^0-9]+/}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="flex w-full flex-col lg:flex-row gap-[1.875rem]">
                  <div className="flex flex-col w-full">
                    <label>{`${t(LabelConstants.PLATE_NUMBER)}*`}</label>
                    <div className="flex flex-col w-full">
                      <FormInput
                        control={control}
                        name="plateNumber"
                        disabled={disableInput}
                        showError={false}
                      />
                      {errors.plateNumber && errors.plateNumber?.message && (
                        <p className="error rtl:text-end" dir="ltr">
                          {t(errors.plateNumber.message)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col w-full md:pt-0"></div>
                </div>
              </div>
              <span
                className={`text-dark-gray2 text-base ${
                  router.locale === Locales.AR ? 'text-end' : ''
                }`}
                dir="ltr"
              >
                {t(LabelConstants.PLATE_NUMBER_HELP_TEXT)}
              </span>
            </div>
          </div>
        </form>
        <div className="flex flex-col w-full gap-[1.875rem]">
          {featureList &&
            featureList.length > 0 &&
            featureList.map((itm) => (
              <fieldset
                className="border rounded p-2"
                key={itm.FeatureCategoryId}
              >
                <legend className="text-base capitalize font-bold text-dark-gray1 px-4">
                  {itm.Featurecategory}
                </legend>
                <div className="flex flex-wrap gap-4 p-[1.5625rem] pt-5">
                  {itm.FeatureList.map((data) => (
                    <button
                      key={data.FeatureId}
                      className={`!text-base btn btn-auto rounded !min-h-[2rem] !p-2 !font-normal
                        ${
                          features.some((x) => x.FeatureId === data.FeatureId)
                            ? 'btn-primary'
                            : 'btn-secondary'
                        }
                      `}
                      onClick={() => {
                        handleFilterChange(data.FeatureId);
                      }}
                      type="button"
                    >
                      {data.Feature}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
        </div>
      </div>
      <div className="mt-20 flex justify-end">
        <button
          type="submit"
          className="btn btn-primary uppercase"
          form="details-form"
        >
          {t(LabelConstants.NEXT)}
        </button>
      </div>

      {/* Show Exist Pop up */}
      <Modal show={existsPopup} onClose={() => showExistsPopup(false)}>
        <>
          <ModalBody>
            <div className="mt-4">
              <div className="flex flex-col items-center justify-center">
                <h1 className="mt-3 text-center">
                  {t(LabelConstants.SAME_VEHICLE_DETAILS_FOUND)}
                </h1>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => handleValidation(true)}
                className="btn btn-primary btn-modal uppercase"
              >
                {t(LabelConstants.YES)}
              </button>
              <button
                onClick={() => handleValidation(false)}
                className="btn btn-secondary btn-modal uppercase"
              >
                {t(LabelConstants.NO)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>
    </>
  );
};
