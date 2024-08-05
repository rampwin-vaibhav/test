import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VehicleService } from '../../../helpers/services';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setLoader,
  updateWarrantyFlow,
  updateWarrantyStep,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import { LabelConstants, WarrantyConstants } from '../../../types/i18n.labels';
import { Model } from '../../../types/models';
import { FadeUp } from '../../common/Animations';
import FormInputV1 from '../../common/Form/FormInputV1';
import List from './components/List';

const SelectModel = () => {
  const dispatch = useAppDispatch();
  const currentFlowData = useAppSelector(({ warranty }) => warranty.data);
  const [models, setModels] = useState<Array<Model>>([]);

  useEffect(() => {
    if (currentFlowData.brand.brandId >= 0) {
      const getModelsByMake = async () => {
        dispatch(setLoader(true));
        const models = await VehicleService.fetchModelByMake(
          currentFlowData.brand.brandId
        );
        dispatch(setLoader(false));
        setModels(models);
      };
      getModelsByMake();
    }
  }, [currentFlowData.brand.brandId, dispatch]);

  const { control, watch } = useForm();

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
      updateWarrantyFlow({
        model: {
          modelId: value.value,
          modelName: value.label,
        },
      })
    );
    dispatch(updateWarrantyStep(WarrantyConstants.SelectVariant));
  };

  return (
    <div className="flex flex-col h-[82vh] md:h-[460px]">
      <FadeUp duration={0.2 * 1.5}>
        <div className="mx-[26px]">
          <FormInputV1
            control={control}
            name="searchModel"
            label={`${t(LabelConstants.SEARCH)} ${t(LabelConstants.MODEL)}`}
            placeholder="eg. M5"
          />
        </div>
      </FadeUp>
      <div className="mx-[26px] mt-[4px] flex-1 overflow-scroll overflow-x-hidden">
        <List
          items={(searchModel ? filteredModels : models).map((eachModel) => ({
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
