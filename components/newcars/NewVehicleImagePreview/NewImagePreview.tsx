import React from 'react';
import { ListingImageArtifact, ProfileArtifact } from '../../../types/models';
import { ImageWithFallback } from '../../common/ImageWithFallback';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useTranslation } from 'next-i18next';

type NewImagePreviewPropType = {
  selected: boolean;
  index: number;
  image: ListingImageArtifact | ProfileArtifact;
};

export const NewImagePreview: React.FC<NewImagePreviewPropType> = ({
  selected,
  index,
  image,
}) => {
  const { t } = useTranslation();

  return (
    <div className="embla__slide relative" key={index}>
      <TransformWrapper>
        <TransformComponent
          wrapperClass="!w-full aspect-video"
          contentClass="!w-full"
        >
          <ImageWithFallback
            src={image?.ArtifactUrlPath || ''}
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
    </div>
  );
};
