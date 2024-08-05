import Link from 'next/link';
import { NextImageWithFallback } from '../NextImageWithFallback';
import { VehicleBrand } from '../../types/models';

const NewCarBrandLink = ({
  brand,
  useOriginalLogo,
}: {
  brand: VehicleBrand;
  useOriginalLogo: boolean;
}) => {
  return (
    <Link
      prefetch={false}
      href={
        brand.IsAssociatedWithGGMDealer
          ? encodeURI(`/newcars/new?m=${brand.MakeKey.toLowerCase()}`)
          : encodeURI(`/newcars/new/${brand.MakeKey.toLowerCase()}`)
      }
      as={
        brand.IsAssociatedWithGGMDealer
          ? encodeURI(`/newcars/new?m=${brand.MakeKey.toLowerCase()}`)
          : encodeURI(`/newcars/new/${brand.MakeKey.toLowerCase()}`)
      }
    >
      <a className="h-36 object-[228/158] w-full bg-white rounded border cursor-pointer transition-all duration-500 shadow hover:shadow-md p-2">
        <NextImageWithFallback
          src={
            useOriginalLogo
              ? brand.LogoURL
                ? `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${brand.LogoURL}`
                : ''
              : brand.BlackAndWhiteLogo
              ? `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${brand.BlackAndWhiteLogo}`
              : ''
          }
          alt={brand.MakeDisplayName}
          className="w-full h-full object-contain"
          onErrorRender={() => (
            <div
              className={`uppercase font-bold text-xl ${
                useOriginalLogo ? 'text-primary' : 'text-dark-gray1'
              }`}
            >
              {brand.MakeDisplayName}
            </div>
          )}
          containerClassName="relative flex justify-center items-center h-full"
          loading="lazy"
          unoptimized={true}
          layout="fill"
        />
      </a>
    </Link>
  );
};

export default NewCarBrandLink;
