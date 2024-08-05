import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  LabelConstants,
  SelfListingConstants,
  WarrantyConstants,
} from '../../../types/i18n.labels';
import { translationsLang } from '../../../utilities/constants';
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { NewCarService, VehicleService } from '../../../helpers/services';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../../lib/self-listing/selfListing.slice';
import { Model, VehicleBrand } from '../../../types/models';
import autoTranslate from '../../../utilities/translations/autoTranslate';
import FormDropdownV1 from '../../common/Form/FormDropdownV1';

type IFormInput = {
  brand: { MakeDisplayName: string; MakeId: number };
  model: { Model: string; ModelId: number };
};

const VehicleConfirmation = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const carData = useAppSelector(({ selfListing }) => selfListing.data);

  const { t } = useTranslation();

  const schema = yup.object({
    brand: yup
      .object({ MakeDisplayName: yup.string(), MakeId: yup.number() })
      .required(LabelConstants.REQUIRED_FIELD),
    model: yup
      .object({ Model: yup.string(), ModelId: yup.number() })
      .required(LabelConstants.REQUIRED_FIELD),
  });

  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      brand: {
        MakeDisplayName: '',
        MakeId: carData?.brand?.brandId || 0,
      },
      model: {
        Model: '',
        ModelId: carData?.model?.modelId || 0,
      },
    },
  });

  const getTranslatedText = async (text: string) => {
    const res = await autoTranslate(
      text,
      translationsLang.Arabic,
      router.locale === translationsLang.Arabic
        ? translationsLang.Arabic
        : translationsLang.English
    );
    return res[0]?.translations[0]?.text;
  };

  const [brands, setBrands] = useState<Array<VehicleBrand>>([]);
  useEffect(() => {
    const fetchPopularBrands = async () => {
      dispatch(setLoader(true));
      const brands = await NewCarService.fetchNewCarsMake();

      setBrands([
        ...brands
          .filter((x) => x.SequenceNumber !== null)
          ?.sort((a, b) => a.SequenceNumber - b.SequenceNumber),
        ...brands.filter((x) => x.SequenceNumber === null),
      ]);
      dispatch(setLoader(false));
    };
    fetchPopularBrands();
  }, [dispatch]);

  useEffect(() => {
    if (carData?.brand?.brandName) {
      const foundBrand = brands.find(
        (eachBrand) =>
          eachBrand.MakeDisplayName === carData?.brand?.brandName.toUpperCase()
      );
      setValue('brand', {
        MakeDisplayName: foundBrand?.MakeDisplayName || '',
        MakeId: foundBrand?.MakeId || 0,
      });
    }
  }, [dispatch, carData?.brand?.brandName, setValue, brands]);

  const [models, setModels] = useState<Array<Model>>([]);

  const { brand, model } = watch();
  useEffect(() => {
    if (brand.MakeId > 0) {
      const getModelsByMake = async () => {
        setLoader(true);
        dispatch(setLoader(true));
        const models = await VehicleService.fetchModelByMake(brand.MakeId);
        dispatch(setLoader(false));
        setModels(models);

        setLoader(false);
      };
      getModelsByMake();
    }
  }, [brand?.MakeId, dispatch]);

  useEffect(() => {
    if (carData?.model?.modelName) {
      const foundModel = models.find(
        (eachModel) =>
          eachModel.Model === carData?.model?.modelName.toUpperCase()
      );
      console.log(foundModel?.Model);
      setValue('model', {
        Model: foundModel?.Model || '',
        ModelId: foundModel?.ModelId || 0,
      });
    }
  }, [dispatch, carData?.model?.modelName, setValue, models]);

  const handleConfirmCarDetails = async (data: IFormInput) => {
    try {
      setLoader(true);
      dispatch(
        updateSelfListingFlow({
          brand: {
            brandId: data.brand.MakeId,
            brandName: data.brand.MakeDisplayName,
          },
          model: {
            modelId: data.model.ModelId,
            modelName: data.model.Model,
            modelYear: carData.model.modelYear,
          },
        })
      );
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingSelectVariant)
      );
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  return (
    <div className="mx-[25px] mt-[15px]">
      <form className="space-y-[30px]">
        <FormDropdownV1
          control={control}
          name="brand"
          labelText={t(LabelConstants.SELECT_MAKE)}
          placeHolderText={t(LabelConstants.SELECT_MODEL)}
          labelAccessor="MakeDisplayName"
          valueAccessor="MakeId"
          options={brands}
        />
        <FormDropdownV1
          control={control}
          name="model"
          labelText={t(LabelConstants.SELECT_MODEL)}
          options={models}
          placeHolderText={t(LabelConstants.SELECT_MODEL)}
          labelAccessor="Model"
          valueAccessor="ModelId"
          disabled={!models?.length}
        />

        <button
          className="bg-black text-white px-[44px] py-[16px] rounded-[40px] flex items-center text-[13px]"
          onClick={handleSubmit(handleConfirmCarDetails)}
          disabled={!brand?.MakeId || !model?.ModelId}
        >
          {t(LabelConstants.CONTINUE)}{' '}
          {router.locale === translationsLang.Arabic ? (
            <ArrowLeftIcon className="!text-white  h-[5px] mx-[12.5px]" />
          ) : (
            <ArrowRightIcon className="!text-white  h-[5px] mx-[12.5px]" />
          )}
        </button>
      </form>
    </div>
  );
};

export default VehicleConfirmation;
