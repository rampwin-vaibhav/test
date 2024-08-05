import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../types/i18n.labels';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDropdown } from '../components/common/Form';
import { useEffect, useState } from 'react';
import { Cities, PetrominLocationData } from '../types/models';
import { useRouter } from 'next/router';
import { GlobalService, VehicleService } from '../helpers/services';
import { AddressType } from '../types/constants';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';

interface IFormInput {
  city: Cities | null;
  location: PetrominLocationData | null;
}

const schema = yup
  .object({
    city: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    location: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

const PetrominLocation = () => {
  const { control, watch, getFieldState, trigger } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { city, location } = watch();
  const { t } = useTranslation();
  const router = useRouter();
  const [cities, setCities] = useState<Array<Cities>>([]);
  const [petrominData, setPetrominData] = useState<Array<PetrominLocationData>>(
    []
  );
  const [mapUrl, setMapUrl] = useState<string>('');

  useEffect(() => {
    const initialLoad = async () => {
      const citiesData = await GlobalService.fetchInspectionCities(
        router.locale
      );
      setCities(citiesData.cities);
    };
    initialLoad();
  }, [router]);

  useEffect(() => {
    // To fetch location dropdown data

    if (city && city.CityId) {
      const loadLocationData = async () => {
        const allPetrominLocation = await VehicleService.fetchPetrominLocation(
          city.CityId,
          AddressType.PETROMIN_LOCATION,
          router.locale
        );
        setPetrominData(allPetrominLocation);
      };

      loadLocationData();
    }
  }, [router.locale, city]);

  useEffect(() => {
    if (location && location.LocationId) {
      const url: PetrominLocationData | undefined = petrominData?.find(
        (x) => x.LocationId === location.LocationId
      );
      setMapUrl(url?.EmbedMapHtml!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const field = getFieldState('city');
    if (city && field.isDirty) {
      setMapUrl('');
    }
  }, [city, getFieldState, trigger]);

  return (
    <PrivatePageLayout title={'Petromin Location'}>
      <form>
        <div>
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full flex flex-row gap-10">
              <div className="w-full">
                <FormDropdown
                  options={cities}
                  labelAccessor="City"
                  valueAccessor="CityId"
                  labelText={`${t(LabelConstants.CITY)}*`}
                  placeHolderText={t(LabelConstants.SELECT_CITY)}
                  searchPlaceHolderText={t(LabelConstants.SEARCH)}
                  control={control}
                  name="city"
                />
              </div>
              <div className="w-full">
                <FormDropdown
                  options={petrominData}
                  labelAccessor="LocationName"
                  valueAccessor="LocationId"
                  labelText={`${t(LabelConstants.LOCATION)}*`}
                  placeHolderText={t(LabelConstants.SELECT_DROPDOWN_LITERAL)}
                  searchPlaceHolderText={t(LabelConstants.SEARCH)}
                  control={control}
                  name="location"
                />
              </div>
            </div>
            <div>
              {mapUrl && (
                <div className="mt-2 flex gap-2">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: mapUrl,
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </PrivatePageLayout>
  );
};

export default PetrominLocation;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
