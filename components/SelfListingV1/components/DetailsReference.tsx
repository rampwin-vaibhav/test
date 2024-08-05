import React from 'react';
import { CloseIcon } from '../../icons';
import { useRouter } from 'next/router';
import Image from 'next/image';

const DetailsReference = ({
  closeTips = () => {},
}: {
  closeTips?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center min-h-full min-w-full bg-black/[79%] ">
      <div className="relative w-[50%] max-w-[720px] bg-white rounded-lg shadow-lg p-6">
        <button
          className="w-[24px] absolute top-[6px] right-[6px] h-[24px] bg-[#F0F0F0] rounded-full flex items-center justify-center "
          onClick={closeTips}
        >
          <CloseIcon className="w-[8px] h-[8px] " />
        </button>
        <div className="relative w-[90%] my-5 mx-auto aspect-[2.3/1]">
          {router.locale && (
            <Image
              src={`/images/rc-sample-${router.locale}.png`}
              alt="Vehicle Details Reference"
              layout="fill"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsReference;
