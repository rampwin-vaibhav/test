import React from 'react';
import { ListingImageArtifact } from '../../../types/models';
import { ImageWithFallback } from '../../common/ImageWithFallback';

type OutletImagePreviewThumbPropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: ListingImageArtifact;
  beforeImage?: ListingImageArtifact | null;
};

export const OutletImagePreviewThumb: React.FC<
  OutletImagePreviewThumbPropType
> = ({ selected, index, onClick, image, beforeImage }) => {
  return (
    <div
      className={`pl-[0.8rem] rlt:pr-[0.8rem] min-w-0 flex-grow-0 flex-shrink-0 rounded ${
        selected ? 'basis-[22%] lg:basis-[12%]' : 'basis-[18%] lg:basis-[10%]'
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        className="relative touch-manipulation no-underline cursor-pointer border-0 p-0 m-0 flex justify-center items-center w-full"
      >
        <ImageWithFallback
          src={`${image?.ArtifactUrlPath}`}
          key={index}
          onErrorRender={() => (
            <div className="bg-slate-100 h-full w-full rounded"></div>
          )}
          onError={(event: any) => {
            event.target.src = '/images/default-car.jpg';
            event.onerror = null;
          }}
          className={`w-full aspect-video object-cover rounded bg-gray-50 ${
            selected ? 'border-white border-4' : ''
          }`}
          containerClassName="w-full aspect-video"
        />
      </button>
    </div>
  );
};
