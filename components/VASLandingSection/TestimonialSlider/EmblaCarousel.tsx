import React from 'react';
import { useRouter } from 'next/router';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { TestimonialsDataResponse } from '../../../types/models';
import { BackArrowIcon, StarIcon } from '../../icons';
import { Locales } from '../../../types/enums';

type PropType = {
  ratings: TestimonialsDataResponse;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const router = useRouter();
  const { ratings, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="w-full flex justify-center md:justify-end">
        <div className="w-full md:w-[90%] h-full p-4 md:p-0">
          <section className="vas_embla">
            <div className="vas_embla__viewport" ref={emblaRef}>
              <div className="vas_embla__container">
                {ratings?.MediaPageTestimonials?.map((x, index) => (
                  <div
                    className="vas_embla__slide p-4 md:p-8 bg-gray-300 bg-opacity-25 rounded-3xl border w-full md:w-[27rem]"
                    key={index}
                  >
                    <div className="flex gap-4">
                      <picture>
                        <img
                          src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/${x.AutherImagePath}`}
                          alt={x.From}
                          className="w-16 h-16 bg-yellow-200 rounded-full"
                          onError={(event: any) => {
                            event.target.src = '/images/default-car.jpg';
                            event.onerror = null;
                          }}
                        />
                      </picture>
                      <div className="flex flex-col gap-2">
                        <p className="text-2xl font-semibold tracking-normal ltr:text-left rtl:text-right">
                          {x.From || ''}
                        </p>
                        <p className="flex">
                          {[...Array(x.Rating)].map((x) => (
                            <StarIcon
                              className="w-7 h-7"
                              fillColor="#FF8300"
                              key={x}
                            />
                          ))}
                        </p>
                      </div>
                    </div>
                    <p className="pt-5 text-xl line-clamp-5 ltr:text-left rtl:text-right">
                      {x.Description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="hidden md:block">
        <div
          className={`flex gap-10 justify-center items-center pt-8 ${
            router.locale === Locales.AR ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="vas_embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'vas_embla__dot'.concat(
                  index === selectedIndex ? ' vas_embla__dot--selected' : ''
                )}
              />
            ))}
          </div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="block md:hidden pt-4 pl-6">
        <a
          href="#"
          className="text-primary text-xl font-semibold underline tracking-wide flex gap-2 items-center"
        >
          <p>View all customer reviews</p>
          <BackArrowIcon className="w-6 h-6" fill="#4c0055" />
        </a>
      </div>
    </>
  );
};

export default EmblaCarousel;
