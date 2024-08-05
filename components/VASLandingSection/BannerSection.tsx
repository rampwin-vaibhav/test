import { useRouter } from 'next/router';
import { useAppDispatch } from '../../lib/hooks';
import { setOpenWarrantyFlow } from '../../lib/vas/warranty-flow/warranty.slice';
import { MediaPageSectionKeys } from '../../types/constants';
import { Locales } from '../../types/enums';
import {
  BannerImage,
  MediaPageArtifactDetailsData,
  MediaPageCTADetailsData,
  MediaPageRibbonDetailsData,
  MediaPageSectionDetailsData,
} from '../../types/models';
import { BackArrowIcon } from '../icons';
import BannerSlider from '../newcars/BannerSlider';
import RibbonSection from './RibbonSection';

type BannerSectionProps = {
  mediaPageRibbonDetails?: Array<MediaPageRibbonDetailsData>;
  mediaPageArtifactDetails?: Array<MediaPageArtifactDetailsData>;
  mediaPageCTADetails?: Array<MediaPageCTADetailsData>;
  mediaPageSectionDetails?: Array<MediaPageSectionDetailsData>;
};
const BannerSection = ({
  mediaPageRibbonDetails,
  mediaPageSectionDetails,
  mediaPageCTADetails,
  mediaPageArtifactDetails,
}: BannerSectionProps) => {
  const router = useRouter();
  const bannerTitleData = mediaPageSectionDetails?.filter(
    (x: MediaPageSectionDetailsData) =>
      x.MediaPageSectionKey === MediaPageSectionKeys.BannerImageWarranty
  );
  const bannerCTAData = mediaPageCTADetails?.filter(
    (x: MediaPageCTADetailsData) =>
      x.MediaPageSectionKey === MediaPageSectionKeys.BannerImageWarranty
  );
  const bannerArtifacts: Array<BannerImage> | undefined =
    mediaPageArtifactDetails
      ?.filter(
        (x: MediaPageArtifactDetailsData) =>
          x.MediaPageSectionKey === MediaPageSectionKeys.BannerImageWarranty &&
          x.MediaPageArtifactType === 'BannerImages'
      )
      ?.map(({ MediaPageArtifactId, URL }) => ({
        MakeArtifactId: MediaPageArtifactId,
        Platform: 'Web',
        URL: `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${URL}`,
      }));

  const bannerLogo: Array<MediaPageArtifactDetailsData> | undefined =
    mediaPageArtifactDetails?.filter(
      (x: MediaPageArtifactDetailsData) =>
        x.MediaPageSectionKey === MediaPageSectionKeys.BannerImageWarranty &&
        x.MediaPageArtifactType === 'LogoURL'
    );

  const dispatch = useAppDispatch();
  const handleOpenWarrantyFlow = () => {
    dispatch(setOpenWarrantyFlow(true));
  };

  return (
    <div>
      {bannerArtifacts && bannerLogo && (
        <section className="relative w-full">
          <BannerSlider
            bannerImages={bannerArtifacts || []}
            dir={router.locale === Locales.AR ? 'rtl' : 'ltr'}
            bannerStyleForVAS="w-full aspect-[960/1100] md:aspect-[960/527] lg:aspect-[960/427] object-cover h-1/4 rtl:scale-x-[-1]"
          />
          <section className="absolute top-5 md:top-10 lg:top-24 md:w-full">
            <div
              className={`relative md:flex justify-between w-full md:w-[80%] ${
                router.locale === Locales.AR
                  ? 'md:left-[-7rem] lg:left-[-10rem]'
                  : 'md:left-[7rem] lg:left-[10rem]'
              }`}
            >
              <div className="pt-4 px-[3rem] md:px-0 w-full md:w-3/5">
                {/* <picture className="w-full flex justify-center md:justify-start">
                  <img
                    src={
                      bannerLogo &&
                      `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${bannerLogo[0]?.URL}`
                    }
                    alt="gogo motor"
                    className="rounded-full w-[6.5rem] h-[6.5rem] object-cover"
                    onError={(event: any) => {
                      event.target.src = '/images/default-car.jpg';
                      event.onerror = null;
                    }}
                  />
                </picture> */}
                <p className="text-4xl lg:text-[3.5rem] font-bold pt-8 md:pt-6 w-[90%] tracking-wide !leading-snug	!md:leading-tight">
                  {(bannerTitleData && bannerTitleData[0]?.Title) || ''}
                </p>

                <button
                  className="bg-primary rounded-full text-white w-52 p-4 text-xl font-semibold mt-6 md:mt-16 tracking-wider flex gap-1 justify-center items-center"
                  onClick={handleOpenWarrantyFlow}
                >
                  {(bannerCTAData && bannerCTAData[0]?.CTAText) || ''}
                  <BackArrowIcon className="w-8 h-8" />
                </button>
              </div>
              {/* <div className="hidden md:block bg-white h-[20rem] lg:h-[30rem] md:w-[35%] rounded-3xl">
                <picture className="w-full flex justify-center md:justify-start">
                  <img
                    src="/images/wizard.png"
                    alt="Wizard"
                    className="w-full h-full rounded-xl"
                    onError={(event: any) => {
                      event.target.src = '/images/default-car.jpg';
                      event.onerror = null;
                    }}
                  />
                </picture>
              </div> */}
            </div>
          </section>
          <section className="absolute bottom-[-10rem] lg:bottom-[-5.3rem] w-full">
            <RibbonSection mediaPageRibbonDetails={mediaPageRibbonDetails} />
          </section>
        </section>
      )}
    </div>
  );
};

export default BannerSection;
