import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VehicleService } from '../../helpers/services';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { Model } from '../../types/models';
import { FadeUp } from '../common/Animations';
import FormInputV1 from '../common/Form/FormInputV1';
import List from './components/List';
import { ClearSearchIcon } from './components/ClearSearchIcon';
import { SearchIcon } from '../icons';
import { useRouter } from 'next/router';
import SearchResultsNotFound from './components/SearchResultsNotFound';

const SelectModel = () => {
  const dispatch = useAppDispatch();
  const currentFlowData = useAppSelector(({ selfListing }) => selfListing.data);
  const [models, setModels] = useState<Array<Model>>([]);
  const router = useRouter();
  const cleverTap = useAppSelector(({ global }) => global.clevertap);

  useEffect(() => {
    if (currentFlowData.brand.brandId >= 0) {
      const getModelsByMake = async () => {
        dispatch(setLoader(true));
        const models = await VehicleService.fetchModelByMake(
          currentFlowData.brand.brandId,
          router.locale
        );
        dispatch(setLoader(false));
        setModels(models);
      };
      getModelsByMake();
    }
  }, [currentFlowData.brand.brandId, dispatch, router.locale]);

  const { control, watch, setValue } = useForm();

  const { searchModel } = watch();
  const [filteredModels, setFilteredModels] = useState<Array<Model>>([]);

  useEffect(() => {
    if (searchModel?.length) {
      setFilteredModels(
        models
          .filter((eachModel) => {
            if (searchModel) {
              if (
                eachModel.Model.toLowerCase().includes(
                  searchModel.toLowerCase()
                )
              ) {
                return true;
              }
            } else {
              return true;
            }
          })
          .filter((x) => x)
      );
    }
  }, [models, searchModel]);

  const { t } = useTranslation();

  const handleModelSelection = (value: {
    value: number | string;
    label: string | null;
  }) => {
    dispatch(
      updateSelfListingFlow({
        model: {
          modelId: value.value,
          modelName: value.label,
        },
      })
    );
    dispatch(
      updateSelfListingStep(SelfListingConstants.SelfListingSelectVariant)
    );
    if (cleverTap) {
      cleverTap.event?.push('sl_model_selected');
    }
  };

  return (
    <div className="flex flex-col h-[82vh] md:h-[460px]">
      <FadeUp duration={0.2 * 1.5}>
        <div className="mx-[26px]">
          <FormInputV1
            control={control}
            name="searchModel"
            label={`${t(LabelConstants.SEARCH)} ${t(LabelConstants.MODEL)}`}
            placeholder={t(LabelConstants.SEARCH_MODEL_PLACEHOLDER)}
            endIcon={
              searchModel?.length ? (
                <ClearSearchIcon
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(control);
                    setValue('searchModel', '');
                  }}
                />
              ) : (
                <SearchIcon className="h-[20px] w-[20px] !text-[#484E50] p-[3px] opacity-[60%]" />
              )
            }
          />
        </div>
      </FadeUp>
      {searchModel && filteredModels.length == 0 && (
        <div className="w-full h-1/2 flex items-center justify-center">
          <SearchResultsNotFound />
        </div>
      )}
      <div className="mx-[26px] mt-[4px] flex-1 overflow-auto overflow-x-hidden">
        <p className="py-[8px] text-[13px] text-[#757575] ">
          {`${t(LabelConstants.OTHER_POPULAR_MODELS)} ${
            currentFlowData.brand.brandName
          }`}
        </p>
        <List
          itemsClasses="text-[15px] text-[#000000] py-[20px] border-b border-[#E0E0E0] "
          selectedId={currentFlowData.model.modelId}
          items={(searchModel && filteredModels.length > 0
            ? filteredModels
            : models
          ).map((eachModel) => ({
            label: eachModel.Model,
            value: eachModel.ModelId,
          }))}
          onClick={(value) => {
            handleModelSelection(value);
          }}
        />
      </div>
    </div>
  );
};

export default SelectModel;
