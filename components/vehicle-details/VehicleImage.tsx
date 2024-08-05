import { FC, MouseEventHandler, ReactElement } from 'react';
import { ListingImageArtifact } from '../../types/models';
import Image from 'next/image';

type VehicleImageProps = {
  imageData: ListingImageArtifact;
  onClick: MouseEventHandler<HTMLImageElement> | undefined;
};
const VehicleImage: FC<VehicleImageProps> = ({
  imageData,
  onClick,
}): ReactElement => {
  return (
    <div className="sm:w-[32.858rem] w-[15.625rem] aspect-[16/9]">
      <Image
        className="w-full aspect-[16/9] cursor-pointer object-cover"
        src={imageData?.ArtifactUrlPath!}
        alt={imageData.ArtifactType}
        onClick={onClick}
        width={1920}
        height={1080}
        loading="lazy"
        unoptimized={true}
        onError={(event: any) => {
          event.target.src = '/images/default-car.jpg';
          event.onerror = null;
        }}
      />
    </div>
  );
};
export default VehicleImage;
