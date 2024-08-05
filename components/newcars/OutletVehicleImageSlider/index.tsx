import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { OutletImageThumb } from './OutletImageThumb';
import { ListingImageArtifact } from '../../../types/models';
import { ImageWithFallback } from '../../common/ImageWithFallback';
import { ImageArtifactKey } from '../../../types/enums';
import { ArrowLeftIcon, ArrowRightIcon, SpinIcon, TickIcon } from '../../icons';
import { usePrevNextButtons } from '../../../hooks/usePrevNextButtons';
import OutletVehicleImagePreview from '../OutletVehicleImagePreview';
import { LabelConstants } from '../../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import SpinCarPopUp from '../../vehicle-details/SpinCarPopUp';
import Head from 'next/head';

type OutletVehicleImageSliderPropType = {
  images: Array<ListingImageArtifact>;
  dir: 'ltr' | 'rtl';
  spinArtifactURL?: string;
  isOutlet: boolean;
};

const OutletVehicleImageSlider: React.FC<OutletVehicleImageSliderPropType> = ({
  images,
  dir,
  spinArtifactURL,
  isOutlet,
}) => {
  const { t } = useTranslation();
  const [showSpinCarPopUp, setShowSpinCarPopUp] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
    direction: dir,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    direction: dir,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla relative bg-slate-50 w-full rounded" dir={dir}>
      <Head>
        {images.map((image, index) => (
          <link
            key={index}
            rel="preload"
            href={image?.ArtifactUrlPath || ''}
            as="image"
          />
        ))}
      </Head>
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {images
            .filter(
              (x) => x.ArtifactTypeKey !== ImageArtifactKey.DmgEvidenceBefore
            )
            .map((image, index) => {
              return (
                <div className="embla__slide" key={index}>
                  <>
                    <ImageWithFallback
                      src={`${image?.ArtifactUrlPath}`}
                      key={index}
                      onErrorRender={() => (
                        <div className="bg-slate-100 h-full w-full rounded">{`${image?.ArtifactUrlPath}`}</div>
                      )}
                      onError={(event: any) => {
                        event.target.src = '/images/default-car.jpg';
                        event.onerror = null;
                      }}
                      className="w-full aspect-video object-cover rounded cursor-pointer"
                      onClick={() => {
                        setShowPreview(true);
                      }}
                    />
                    {spinArtifactURL ? (
                      <div className="absolute flex bottom-0 items-center gap-3 flex-col w-full justify-center mb-4">
                        <button
                          type="button"
                          className="flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            setShowSpinCarPopUp(true);
                          }}
                        >
                          <SpinIcon className="w-16 h-16 cursor-pointer" />
                        </button>
                        <div className="text-lg text-white uppercase items-center">
                          {t(LabelConstants.SPIN_TO_EXPLORE)}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {isOutlet && (
                      <div className="absolute bottom-0 bg-gradient px-1">
                        <div className="flex gap-1 items-center justify-center px-2 py-1">
                          <TickIcon className="w-5 h-5" />
                          <div>
                            <span className="text-white font-bold text-base">
                              {t(LabelConstants.OUTLET)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              );
            })}
        </div>
        <div className="absolute flex top-0 left-0 justify-between h-full items-center">
          <button
            type="button"
            className="bg-lighter-gray p-4 opacity-70 hover:opacity-90 outline-none mb-28"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            {dir === 'ltr' ? (
              <ArrowLeftIcon className="h-5 w-5 text-black" />
            ) : (
              <ArrowRightIcon className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
        <div className="absolute flex top-0 right-0 justify-between h-full items-center">
          <button
            type="button"
            className="bg-lighter-gray p-4 opacity-70 hover:opacity-90 outline-none mb-28"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            {dir === 'ltr' ? (
              <ArrowRightIcon className="h-5 w-5 text-black" />
            ) : (
              <ArrowLeftIcon className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-[0.8rem]">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex ml-[-0.8rem] rtl:ml-[-0.8rem]">
            {images
              .filter(
                (x) => x.ArtifactTypeKey !== ImageArtifactKey.DmgEvidenceBefore
              )
              .map((image, index) => {
                let beforeImage: ListingImageArtifact | null | undefined = null;
                if (
                  image.ArtifactTypeKey === ImageArtifactKey.DmgEvidenceAfter
                ) {
                  beforeImage = images.find(
                    (x) =>
                      x.VehicleListingArtifactId ===
                      image.BeforeImageReferenceId
                  );
                }

                return (
                  <OutletImageThumb
                    key={index}
                    onClick={() => {
                      onThumbClick(index);
                    }}
                    selected={index === selectedIndex}
                    index={index}
                    image={image}
                    beforeImage={beforeImage}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <OutletVehicleImagePreview
        images={images}
        dir={dir}
        show={showPreview}
        onClose={() => setShowPreview(false)}
        index={selectedIndex}
      />

      <SpinCarPopUp
        showPopUp={showSpinCarPopUp}
        closeModal={setShowSpinCarPopUp}
        artifactURL={spinArtifactURL!}
      ></SpinCarPopUp>
    </div>
  );
};

export default OutletVehicleImageSlider;
