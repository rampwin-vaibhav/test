import { useRouter } from 'next/router';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { VehicleService } from '../../helpers/services';
import { SessionUtils } from '../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { SelfListingConstants } from '../../types/i18n.labels';
import { Spec, Trim, VehicleTrimsResponse } from '../../types/models';
import List from './components/List';
import SearchResultsNotFound from './components/SearchResultsNotFound';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/TabsV1';

type Props = {};

const SelectVariant = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentFlowData = useAppSelector(({ selfListing }) => selfListing.data);
  const [variants, setVariants] = useState<Array<Trim>>([]);
  const [initialLoadDone, setInitialLoadDone] = useState<boolean>(false);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);

  useEffect(() => {
    if (currentFlowData.model.modelId >= 0) {
      const getVariantsBySpec = async () => {
        dispatch(setLoader(true));
        const variants: VehicleTrimsResponse =
          await VehicleService.fetchVehicleTrims(currentFlowData.model.modelId);

        dispatch(setLoader(false));
        setVariants(variants.data.trims);
        setInitialLoadDone(true);
      };
      getVariantsBySpec();
    }
  }, [currentFlowData.brand.brandId, currentFlowData.model.modelId, dispatch]);

  const handleVariantSelection = (value: {
    value: number | string;
    label: string | null;
  }) => {
    const selectedVariant = variants.find(
      (item) => item.TrimId === value.value
    );
    if (!selectedVariant) return;

    dispatch(
      updateSelfListingFlow({
        variant: { variantId: value.value, variantName: value.label },
        fuel_type: selectedVariant.FuelType,
        transmission: selectedVariant.Transmission,
      })
    );
    dispatch(updateSelfListingStep(SelfListingConstants.SelfListingSelectCity));
    if (cleverTap) {
      cleverTap.event?.push('sl_variant_selected');
    }
  };

  const getUniqueFuelTypes = useCallback(() => {
    const uniqueFuelTypeIds = new Set();

    const uniqueFuelTypes: Array<{ FuelTypeId: number; FuelType: string }> = [];

    variants.forEach((variant) => {
      const { FuelTypeId, FuelType } = variant;
      if (!uniqueFuelTypeIds.has(FuelTypeId)) {
        uniqueFuelTypeIds.add(FuelTypeId);
        uniqueFuelTypes.push({ FuelTypeId, FuelType });
      }
    });

    if (uniqueFuelTypes.length > 0) {
      setTabValue(`${uniqueFuelTypes[0].FuelTypeId}`);
    }
    return uniqueFuelTypes;
  }, [variants]);
  const [tabValue, setTabValue] = useState('1');

  const varientTypes = useMemo(
    () => getUniqueFuelTypes(),
    [getUniqueFuelTypes]
  );

  const varientTypeRefs = useRef([
    React.createRef<HTMLParagraphElement>(),
    React.createRef<HTMLParagraphElement>(),
    React.createRef<HTMLParagraphElement>(),
    React.createRef<HTMLParagraphElement>(),
  ]);
  const variantsContainerRef = useRef<HTMLDivElement>(null);

  function scrollParentToChild(
    parent: HTMLDivElement | null,
    child: HTMLParagraphElement | null
  ) {
    if (!parent || !child) {
      return;
    }
    var parentRect = parent.getBoundingClientRect();
    var childRect = child.getBoundingClientRect();
    parent.scrollTop += childRect.top - parentRect.top + 10;
  }

  const handleDivScroll = () => {
    const scrollTop = variantsContainerRef.current!.scrollTop;
    // console.log(scrollTop);

    varientTypeRefs.current.forEach((headingRef, index) => {
      if (headingRef.current) {
        const headingTop =
          headingRef.current.offsetTop -
          variantsContainerRef.current!.offsetTop;
        const headingHeight = headingRef.current!.clientHeight;

        if (
          scrollTop >= headingTop &&
          scrollTop + variantsContainerRef.current?.clientHeight! >=
            headingTop + headingHeight
        ) {
          setTabValue(`${varientTypes[index].FuelTypeId}`);
          return;
        }
      }
    });
  };
  return (
    <Fragment>
      <div className="mx-[26px] mt-[4px] h-[82vh] md:h-[460px]">
        {variants.length > 0 ? (
          <>
            <Tabs
              value={`${tabValue}`}
              className="w-full flex items-center justify-center"
            >
              <TabsList
                aria-orientation="vertical"
                className="bg-[#F0F0F0] rounded-[60px] px-[10px] py-[6px] items-center "
              >
                {varientTypes.map((item, index) => (
                  <TabsTrigger
                    onClick={() => {
                      setTabValue(`${item.FuelTypeId}`);
                      scrollParentToChild(
                        variantsContainerRef.current,
                        varientTypeRefs.current[index].current
                      );
                    }}
                    key={item.FuelTypeId}
                    value={`${item.FuelTypeId}`}
                  >
                    {item.FuelType}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div
              className="h-[90%] overflow-y-auto scroll-smooth"
              ref={variantsContainerRef}
              onScroll={handleDivScroll}
            >
              {varientTypes.map((item, index) => (
                <div key={item.FuelTypeId}>
                  <p
                    ref={varientTypeRefs.current[index]}
                    className="text-[13px] text-[#757575] py-[8px] "
                  >
                    {item.FuelType}
                  </p>
                  {initialLoadDone && (
                    <List
                      itemsClasses="text-[15px] text-[#000000] py-[20px] border-b border-[#E0E0E0] "
                      selectedId={currentFlowData.variant.variantId}
                      items={variants
                        .filter(
                          (varItem) => varItem.FuelTypeId === item.FuelTypeId
                        )
                        .map((eachVariant) => ({
                          label: eachVariant.Trim,
                          value: eachVariant.TrimCode,
                          chipText:
                            eachVariant.TransmissionTypeId === 1
                              ? eachVariant.Transmission
                              : null,
                        }))}
                      onClick={(value) => handleVariantSelection(value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <SearchResultsNotFound />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SelectVariant;
