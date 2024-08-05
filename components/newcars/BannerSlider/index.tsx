import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Head from 'next/head';
import { BannerImage } from '../../../types/models';
import { ImageWithFallback } from '../../common/ImageWithFallback';
import { DotButton, useDotButton } from './DotButton';

const BannerSlider = ({
  bannerImages,
  title,
  subTitle,
  dir,
  bannerStyleForVAS,
}: {
  bannerImages: Array<BannerImage>;
  title?: string | null;
  subTitle?: string | null;
  dir: 'ltr' | 'rtl';
  bannerStyleForVAS?: string | undefined;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: dir },
    [Autoplay()]
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  if (bannerImages && bannerImages.length > 0) {
    return (
      <section className="embla relative bg-slate-50 shadow w-full aspect-[4/1]">
        <Head>
          {bannerImages.map((bannerImage, index) => (
            <link
              key={index}
              rel="preload"
              href={bannerImage?.URL}
              as="image"
            />
          ))}
        </Head>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {bannerImages.map((bannerImage, index) => (
              <div className="embla__slide relative" key={index}>
                <ImageWithFallback
                  src={bannerImage?.URL}
                  key={index}
                  onErrorRender={() => (
                    <div className="bg-slate-100 h-full w-full"></div>
                  )}
                  className={
                    bannerStyleForVAS
                      ? bannerStyleForVAS
                      : 'w-full aspect-[4/1] object-cover object-left'
                  }
                />
                <div
                  className={`absolute top-0 left-0 flex w-full flex-col gap-2 h-full items-start justify-center lg:px-44 px-32 text-white ${
                    bannerStyleForVAS
                      ? ''
                      : 'ltr:bg-[linear-gradient(120deg,_rgb(0_0_0_/_80%),_rgb(0_0_0_/_0%))] rtl:bg-[linear-gradient(120deg,_rgb(0_0_0_/_0%),_rgb(0_0_0_/_80%))]'
                  }`}
                >
                  {title && (
                    <span className="md:text-5xl text-2xl uppercase">
                      {title}
                    </span>
                  )}
                  {subTitle && (
                    <span className="text-xl font-bold uppercase">
                      {subTitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {bannerImages.length > 1 ? (
          <div
            className={`absolute flex justify-center w-full ${
              bannerStyleForVAS
                ? 'hidden md:flex md:bottom-[8rem] lg:bottom-8 z-5'
                : 'bottom-0'
            }`}
          >
            <div className="grid-cols-[auto_1fr] justify-between gap-2 m-4">
              <div className="flex flex-wrap justify-end items-center gap-2">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={
                      bannerStyleForVAS
                        ? 'embla__dot__banner'.concat(
                            index === selectedIndex
                              ? '  embla__dot__banner--selected'
                              : ''
                          )
                        : 'embla__dot'.concat(
                            index === selectedIndex
                              ? '  embla__dot--selected'
                              : ''
                          )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </section>
    );
  }

  return <></>;
};

export default BannerSlider;
