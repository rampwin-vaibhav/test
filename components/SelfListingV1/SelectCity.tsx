import { useTranslation } from 'next-i18next';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalService, VehicleService } from '../../helpers/services';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { Cities, City } from '../../types/models';
import { FadeUp } from '../common/Animations';
import FormInputV1 from '../common/Form/FormInputV1';
import { SearchIcon } from '../icons';
import List from './components/List';
import Image from 'next/image';
import { ClearSearchIcon } from './components/ClearSearchIcon';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import SearchResultsNotFound from './components/SearchResultsNotFound';
import { VehicleListingSource } from '../../types/enums';
import { toast } from 'react-toastify';

const SelectCity = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, watch, setValue } = useForm();
  const router = useRouter();

  const [cities, setCities] = useState<Array<City>>([]);
  const [popularCities, setPopularCities] = useState<Array<City>>([]);
  const [filteredCities, setFilteredCities] = useState<Array<City>>([]);
  useEffect(() => {
    const fetchAllCities = async () => {
      dispatch(setLoader(true));
      const cities = await VehicleService.fetchAllCities(router.locale);
      const popCities = await VehicleService.fetchTopCities(router.locale);
      setCities(cities);
      setPopularCities(popCities.slice(0, 6));
      dispatch(setLoader(false));
    };
    fetchAllCities();
  }, [dispatch, router.locale]);

  const cleverTap = useAppSelector(({ global }) => global.clevertap);

  const handleCitySelection = async (selectedCity: City | number) => {
    if (typeof selectedCity === 'number') {
      let tempSelectedCity = cities.find(
        (item) => item.CityId === selectedCity
      );
      if (!tempSelectedCity) {
        return;
      }
      dispatch(
        updateSelfListingFlow({
          city: {
            cityId: tempSelectedCity.CityId,
            cityName: tempSelectedCity.City,
          },
        })
      );
    } else {
      dispatch(
        updateSelfListingFlow({
          city: {
            cityId: selectedCity.CityId,
            cityName: selectedCity.City,
          },
        })
      );
    }

    const isAuthenticated = SessionUtils.isValidSession();
    if (cleverTap) {
      cleverTap.event?.push('sl_city_selected');
    }
    if (!isAuthenticated) {
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingAuthentication)
      );
    } else {
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingEnterKmDriven)
      );
    }
  };

  const { searchCity } = watch();

  useEffect(() => {
    if (searchCity?.length) {
      setFilteredCities(
        cities
          .filter((eachCity) => {
            if (searchCity) {
              if (
                eachCity.City.toLowerCase().includes(searchCity.toLowerCase())
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
  }, [cities, searchCity]);

  const handleGetCurrentLocation: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        dispatch(setLoader(true));
        let cityRes = await GlobalService.getAutoDetectCity(
          CommonUtils.getLanguageId(router.locale!),
          position.coords.latitude,
          position.coords.longitude
        );
        dispatch(setLoader(false));
        const detectedCity = cities.find((item) => item.City === cityRes);
        if (detectedCity) {
          handleCitySelection(detectedCity);
        } else {
          toast.error(`We are not available in your city yet!`, {
            position: 'bottom-right',
          });
        }
      });
    }
  };

  return (
    <div className="flex flex-col h-[82vh] md:h-[460px]">
      <FadeUp duration={0.5 * 1.5}>
        <div className="pl-[26px] pr-[22px]">
          <FormInputV1
            control={control}
            name="searchCity"
            label={t(LabelConstants.SEARCH_CITY)}
            placeholder={t(LabelConstants.SEARCH)}
            endIcon={
              searchCity?.length ? (
                <ClearSearchIcon
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(control);
                    setValue('searchCity', '');
                  }}
                />
              ) : (
                <SearchIcon className="h-[20px] w-[20px] !text-[#484E50] p-[3px] opacity-[60%]" />
              )
            }
          />
        </div>
        <div className="w-full">
          <button
            onClick={handleGetCurrentLocation}
            className="px-[24px] w-full py-[12px] flex items-center gap-[9px] text-primary text-[15px] "
          >
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.83331 11.1074H4.58331"
                stroke="#4C0055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.4167 11.1074H20.1667"
                stroke="#4C0055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 1.94067V4.69067"
                stroke="#4C0055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 17.5242V20.2742"
                stroke="#4C0055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 17.524C14.5438 17.524 17.4166 14.6512 17.4166 11.1073C17.4166 7.56351 14.5438 4.69067 11 4.69067C7.45615 4.69067 4.58331 7.56351 4.58331 11.1073C4.58331 14.6512 7.45615 17.524 11 17.524Z"
                stroke="#4C0055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 13.8574C12.5188 13.8574 13.75 12.6262 13.75 11.1074C13.75 9.58864 12.5188 8.35742 11 8.35742C9.48122 8.35742 8.25 9.58864 8.25 11.1074C8.25 12.6262 9.48122 13.8574 11 13.8574Z"
                stroke="#4C0055"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t(LabelConstants.USE_MY_CURRENT_LOCATION)}
          </button>
        </div>
      </FadeUp>

      {!searchCity || (searchCity && filteredCities.length > 0) ? (
        <div className="overflow-y-auto">
          {!searchCity && (
            <div className="pl-[26px] pr-[22px] mt-[21px] w-auto grid grid-cols-3 gap-2 flex-1">
              {popularCities.map((eachCity, index) => (
                <div
                  key={eachCity.CityId}
                  onClick={() => handleCitySelection(eachCity)}
                >
                  <CityImage city={eachCity} />
                </div>
              ))}
            </div>
          )}

          <div className="mx-[26px] mt-[12px] overflow-x-hidden">
            {!searchCity && (
              <p className="text-[#757575] mt-[12px] text-[13px] ">
                {t(LabelConstants.ALL_CITIES)}
              </p>
            )}
            <List
              itemsClasses="text-[15px] text-[#000000] py-[20px] border-b border-[#E0E0E0] "
              items={[...(searchCity ? filteredCities : cities)]
                .sort((a, b) =>
                  a.City.toLowerCase().localeCompare(b.City.toLowerCase())
                )
                .map((eachCity) => ({
                  label: eachCity.City,
                  value: eachCity.CityId,
                }))}
              onClick={(val) =>
                handleCitySelection(
                  typeof val.value === 'number'
                    ? val.value
                    : parseInt(val.value)
                )
              }
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <SearchResultsNotFound />
        </div>
      )}
    </div>
  );
};

export default SelectCity;

export const CityImage = ({ city }: { city: City }) => {
  return (
    <div className="w-[94px] cursor-pointer">
      <div className="relative w-[94px] h-[78px] rounded-[8px] overflow-hidden ">
        <Image
          src={city.ImageUrlPath || '/images/Tristar-table.png'}
          layout="fill"
          alt={city.City}
        />
      </div>
      <p className="text-[13px] text-[#212121] font-normal ">{city.City}</p>
    </div>
  );
};
