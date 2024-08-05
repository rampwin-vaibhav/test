import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { OutletImagePreviewThumb } from './OutletImagePreviewThumb';
import { ListingImageArtifact } from '../../../types/models';
import { ImageArtifactKey } from '../../../types/enums';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '../../icons';
import { usePrevNextButtons } from '../../../hooks/usePrevNextButtons';
import { OutletImagePreview } from './OutletImagePreview';

type OutletVehicleImagePreviewPropType = {
  images: Array<ListingImageArtifact>;
  dir: 'ltr' | 'rtl';
  show: boolean;
  onClose: () => void;
  index: number;
};

const OutletVehicleImagePreview: React.FC<
  OutletVehicleImagePreviewPropType
> = ({ images, dir, show, onClose, index }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
    direction: dir,
    watchDrag: false,
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

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return function () {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  useEffect(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    emblaMainApi.scrollTo(index);
  }, [index, emblaMainApi, emblaThumbsApi]);

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

  if (!show) {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 h-full w-full z-50 bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto">
      <button
        type="button"
        className="w-full flex justify-end text-white outline-none bg-transparent"
        onClick={() => onClose()}
      >
        <CloseIcon className="w-8 h-8 text-white m-4" />
      </button>
      <div className="w-full flex justify-between items-center">
        <div className="hidden lg:block">
          <button
            type="button"
            className="bg-lighter-gray p-4 opacity-70 hover:opacity-90 outline-none"
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
        <div
          className="embla relative w-full max-w-[800px] rounded flex flex-col justify-between"
          dir={dir}
        >
          <div className="embla__viewport m-auto" ref={emblaMainRef}>
            <div className="embla__container">
              {images
                .filter(
                  (x) =>
                    x.ArtifactTypeKey !== ImageArtifactKey.DmgEvidenceBefore
                )
                .map((image, index) => {
                  let beforeImage: ListingImageArtifact | null | undefined =
                    null;
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
                    <OutletImagePreview
                      image={image}
                      index={index}
                      key={index}
                      selected={index === selectedIndex}
                      beforeImage={beforeImage}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <button
            type="button"
            className="bg-lighter-gray p-4 opacity-70 hover:opacity-90 outline-none"
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
      <div className="my-[0.8rem]">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex ml-[-0.8rem] rtl:ml-[-0.8rem] items-center">
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
                  <OutletImagePreviewThumb
                    key={index}
                    onClick={() => onThumbClick(index)}
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
    </div>
  );
};

export default OutletVehicleImagePreview;
