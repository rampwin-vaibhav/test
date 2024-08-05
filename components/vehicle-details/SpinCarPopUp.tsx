import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { CloseIcon } from '../icons';
import Head from 'next/head';

type SpinCarPopUpProps = {
  showPopUp: boolean;
  artifactURL: string;
  closeModal: Function;
};

const SpinCarPopUp = ({
  showPopUp,
  artifactURL,
  closeModal,
}: SpinCarPopUpProps) => {
  const [displayGif, setDisplayGif] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside: any = (ev: MouseEvent) => {
      if (ref.current && ref.current?.contains(ev.target as any)) {
        closeModal(false);
      }
    };

    if (artifactURL) {
      setDisplayGif(true);
    }

    if (showPopUp) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.body.style.overflow = 'unset';
    }

    return function () {
      document.body.style.overflow = 'unset';
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [artifactURL, closeModal, showPopUp]);

  return (
    <>
      <Head>
        <link rel="prefetch" href={artifactURL} as="document" />
      </Head>
      {showPopUp && (
        <div className="spin-car fixed z-30 top-0 left-0 h-full w-full bg-gray-800 bg-opacity-80">
          <div className="w-full h-full top-0 left-0 flex flex-col justify-center items-center">
            <div
              className="h-full w-full flex justify-center items-center opacity-100"
              ref={ref}
            >
              <div className="max-w-[80%] max-h-[90%] w-full relative aspect-[16/9] flex flex-col-reverse lg:flex-row md:justify-center gap-5">
                <iframe
                  className="w-full h-full aspect-[16/9]"
                  title="360° View"
                  src={artifactURL}
                  onLoad={() => {
                    setDisplayGif(false);
                  }}
                  referrerPolicy="no-referrer"
                ></iframe>
                <div
                  className="flex justify-end"
                  onClick={() => {
                    closeModal(false);
                  }}
                >
                  <CloseIcon className="cursor-pointer w-[1.875rem] h-[1.875rem] text-white" />
                </div>
                {displayGif && (
                  <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 cursor-pointer">
                    <div
                      className=""
                      onClick={() => {
                        setDisplayGif(false);
                      }}
                    >
                      <picture>
                        <img
                          src={'/images/spin-gif.png'}
                          alt="spin-gif"
                          className="sm:h-32 sm:w-32 w-20 h-20 spin-gif rounded-lg sm:rounded-xl"
                        />
                      </picture>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinCarPopUp;
