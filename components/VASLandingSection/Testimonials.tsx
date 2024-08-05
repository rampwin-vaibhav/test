import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TestimonialsDataResponse } from '../../types/models';
import { SupportService } from '../../helpers/services';
import { MediaPageKey, WebsitePlatform } from '../../types/constants';
import { isMobile } from 'react-device-detect';
import EmblaCarousel from './TestimonialSlider/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { Locales } from '../../types/enums';

type TestimonialsProps = {};
const Testimonials = ({}: TestimonialsProps) => {
  const router = useRouter();
  const [ratingDetails, setRatingDetails] =
    useState<TestimonialsDataResponse>();

  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: 'auto',
    direction: router.locale === Locales.AR ? 'rtl' : 'ltr',
  };

  useEffect(() => {
    const initialLoad = async () => {
      const res = await SupportService.fetchTestimonials(
        MediaPageKey.TestimonialWarranty,
        router.locale,
        isMobile ? WebsitePlatform.Mobile : WebsitePlatform.Web
      );
      setRatingDetails(res);
    };
    initialLoad();
  }, [router]);
  return (
    <Fragment>
      {ratingDetails && ratingDetails.MediaPageTestimonials.length > 0 ? (
        <div className="pt-12">
          <h1 className="landing-page-title font-bold pl-8 md:pl-0 md:p-8 text-left md:text-center">
            {ratingDetails?.Title || ''}
          </h1>
          <div className="pt-8">
            <EmblaCarousel ratings={ratingDetails} options={OPTIONS} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default Testimonials;
