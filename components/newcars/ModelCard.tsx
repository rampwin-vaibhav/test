import { Model, VehicleBrand } from '../../types/models';
import { NextImageWithFallback } from '../NextImageWithFallback';
import { useState } from 'react';
import Link from 'next/link';

const ModelCard = ({ model, make }: { model: Model; make: VehicleBrand }) => {
  const [src] = useState(
    model.ProfileImageUrl
      ? `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${model.ProfileImageUrl}`
      : '/images/default-car.jpg'
  );

  return (
    <Link
      prefetch={false}
      href={`/newcars/new/${make.MakeKey.toLowerCase()}/${model.ModelKey.toLowerCase()}`}
    >
      <a>
        <div className="border flex flex-col shadow-md rounded cursor-pointer bg-white">
          <div className="w-full aspect-video border-b">
            <NextImageWithFallback
              src={src}
              alt={model.Model}
              className="w-full aspect-video object-cover rounded-t"
              onErrorRender={() => (
                <div className="uppercase">{model.Model}</div>
              )}
              containerClassName="flex justify-center items-center h-full"
              height={288}
              width={512}
              loading={src === '/images/default-car.jpg' ? 'eager' : 'lazy'}
              priority={src === '/images/default-car.jpg' ? true : false}
              unoptimized={true}
            />
          </div>
          <div className="p-3 py-4 min-h-[5.8rem] flex flex-col gap-2">
            <span className="uppercase text-xl font-bold">{model.Model}</span>
            {model?.DisplayText ? (
              <span>{model?.DisplayText}</span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ModelCard;
