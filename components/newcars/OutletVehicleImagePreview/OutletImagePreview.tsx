import React, { useEffect, useState } from 'react';
import { ListingImageArtifact } from '../../../types/models';
import { ImageWithFallback } from '../../common/ImageWithFallback';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../../types/i18n.labels';

type OutletImagePreviewPropType = {
  selected: boolean;
  index: number;
  image: ListingImageArtifact;
  beforeImage?: ListingImageArtifact | null;
};

export const OutletImagePreview: React.FC<OutletImagePreviewPropType> = ({
  selected,
  index,
  image,
  beforeImage,
}) => {
  const { t } = useTranslation();
  const [showBefore, setShowBefore] = useState<boolean>(false);

  useEffect(() => {
    return () => setShowBefore(false);
  }, []);

  return (
    <div className="embla__slide relative" key={index}>
      <TransformWrapper>
        <TransformComponent
          wrapperClass="!w-full aspect-video"
          contentClass="!w-full"
        >
          <ImageWithFallback
            src={
              showBefore
                ? `${beforeImage?.ArtifactUrlPath}`
                : `${image?.ArtifactUrlPath}`
            }
            key={index}
            onErrorRender={() => (
              <div className="bg-slate-100 h-full w-full"></div>
            )}
            onError={(event: any) => {
              event.target.src = '/images/default-car.jpg';
              event.onerror = null;
            }}
            className="w-full aspect-video object-cover px-2 lg:px-0"
            containerClassName="w-full aspect-video object-cover"
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Before Image Description */}
      {beforeImage && beforeImage.Description ? (
        <div className="bg-white p-3">
          <span className="break-normal text-primary font-bold">
            {beforeImage?.Description}
          </span>
        </div>
      ) : (
        <></>
      )}

      {/* Toggle button for Before & After Image */}
      {beforeImage ? (
        <div className="absolute top-5 left-0 w-full h-16 flex justify-center">
          <div>
            <button
              type="button"
              className={`ltr:rounded-l-full rtl:rounded-r-full h-10 w-24 text-center shadow font-medium text-base ${
                showBefore ? 'bg-primary text-white' : 'bg-white text-primary'
              }`}
              onClick={() => setShowBefore(true)}
            >
              {t(LabelConstants.BEFORE)}
            </button>
            <button
              type="button"
              className={`ltr:rounded-r-full rtl:rounded-l-full h-10 w-24 text-center shadow font-medium text-base ${
                showBefore ? 'bg-white text-primary' : 'bg-primary text-white'
              }`}
              onClick={() => setShowBefore(false)}
            >
              {t(LabelConstants.AFTER)}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
