import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MediaConfigurationDataResponse } from '../../types/models';
import { SupportService } from '../../helpers/services';
import { MediaPageKey } from '../../types/constants';
import { Locales } from '../../types/enums';

type DownloadDetailsProps = {};
const DownloadSection = ({}: DownloadDetailsProps) => {
  const router = useRouter();
  const [playStoreUrl, setPlayStoreUrl] = useState<string>('');
  const [appStoreUrl, setAppStoreUrl] = useState<string>('');

  useEffect(() => {
    const initialLoad = async () => {
      const res = await SupportService.fetchMediaPageConfiguration(
        MediaPageKey.WarrantyVAS
      );
      if (res) {
        const getAppStorLink = res.filter(
          (type) => type.MediaPageConfigurationKey === MediaPageKey.AppStore
        );
        const getPlayStoreLink = res.filter(
          (type) =>
            type.MediaPageConfigurationKey === MediaPageKey.GooglePlayStore
        );
        setAppStoreUrl(getAppStorLink[0]?.MediaPageConfigurationValue || '');
        setPlayStoreUrl(getPlayStoreLink[0]?.MediaPageConfigurationValue || '');
      }
    };
    initialLoad();
  }, [router]);
  return (
    <div className="bg-[#FDF4FF] pt-0 md:pt-[4.5rem] mt-16 relative">
      <div className="flex flex-col md:flex-row md:gap-6 justify-center p-6 md:p-0">
        <picture>
          <img
            src={'/images/app-mobile.png'}
            alt="Mobile"
            className={`absolute md:relative w-48 h-48 md:w-auto md:h-auto bottom-0 ${
              router.locale === Locales.AR
                ? 'left-10 md:left-0'
                : 'right-10 md:right-0'
            }`}
          />
        </picture>
        <div className="flex flex-col gap-6 pt-16">
          <h1 className="text-4xl w-[24rem] break-words font-bold tracking-wider md:tracking-wide !leading-snug	!md:leading-tight">
            Download the app for iOS & Android
          </h1>
          <p className="break-words w-full md:w-[36rem] tracking-wide text-lg pt-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <div className="flex flex-col md:flex-row gap-4 relative pt-4">
            <a
              href={playStoreUrl}
              rel="noreferrer"
              target="_blank"
              className="flex items-center"
            >
              <picture>
                <source
                  srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/google_play.png`}
                  type="image/png"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/google_play.png`}
                  alt="gogo motor"
                  className="w-[10.3rem] aspect-[16/5] cursor-pointer"
                />
              </picture>
            </a>
            <a
              href={appStoreUrl}
              rel="noreferrer"
              target="_blank"
              className="flex items-center"
            >
              <picture>
                <source
                  srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_store.png`}
                  type="image/png"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_store.png`}
                  alt="gogo motor"
                  className="w-[10.3rem] aspect-[16/5] cursor-pointer"
                />
              </picture>
            </a>
            <picture>
              <img
                src={'/images/arrow-curve.png'}
                alt="Mobile"
                className={`hidden md:block absolute -top-10 transform ${
                  router.locale === Locales.AR ? '-scale-x-100' : ''
                }`}
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
