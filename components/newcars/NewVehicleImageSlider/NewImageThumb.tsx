import React from 'react';
import { ListingImageArtifact, ProfileArtifact } from '../../../types/models';
import { ImageWithFallback } from '../../common/ImageWithFallback';

type NewImageThumbPropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: ListingImageArtifact | ProfileArtifact;
};

export const NewImageThumb: React.FC<NewImageThumbPropType> = ({
  selected,
  index,
  onClick,
  image,
}) => {
  return (
    <div className="pl-[0.8rem] rlt:pr-[0.8rem] min-w-0 flex-grow-0 flex-shrink-0 basis-[25%] rounded">
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
          className="w-full aspect-video object-cover rounded"
        />
      </button>
    </div>
  );
};
