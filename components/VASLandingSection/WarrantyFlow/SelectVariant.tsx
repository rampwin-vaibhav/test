import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { VehicleService } from '../../../helpers/services';
import { SessionUtils } from '../../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setLoader,
  updateWarrantyFlow,
  updateWarrantyStep,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import { WarrantyConstants } from '../../../types/i18n.labels';
import { Spec } from '../../../types/models';
import List from './components/List';

type Props = {};

const SelectVariant = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentFlowData = useAppSelector(({ warranty }) => warranty.data);
  const [variants, setVariants] = useState<Array<Spec>>([]);

  useEffect(() => {
    if (currentFlowData.model.modelId >= 0) {
      const getVariantsBySpec = async () => {
        dispatch(setLoader(true));
        const variants = await VehicleService.fetchVehicleSpecs(
          currentFlowData.brand.brandId,
          currentFlowData.model.modelId
        );

        dispatch(setLoader(false));
        setVariants(variants);
      };
      getVariantsBySpec();
    }
  }, [currentFlowData.brand.brandId, currentFlowData.model.modelId, dispatch]);

  const handleVariantSelection = (value: {
    value: number | string;
    label: string | null;
  }) => {
    const isAuthenticated = SessionUtils.isValidSession();
    dispatch(
      updateWarrantyFlow({
        variant: { variantId: value.value, variantName: value.label },
      })
    );
    if (!isAuthenticated) {
      dispatch(updateWarrantyStep(WarrantyConstants.Authentication));
      return;
    }
  };

  return (
    <Fragment>
      <div className="mx-[26px] mt-[4px] h-[82vh] md:h-[460px]">
        <List
          items={variants.map((eachVariant) => ({
            label: eachVariant.Trim,
            value: eachVariant.TrimCode,
          }))}
          onClick={(value) => handleVariantSelection(value)}
        />
      </div>
    </Fragment>
  );
};

export default SelectVariant;
