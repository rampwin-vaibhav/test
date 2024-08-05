import React, { useEffect, useState } from 'react';
import { CloseIcon, DamageImageIcon } from '../icons';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ListingImageArtifact } from '../../types/models';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation, Thumbs]);

type VehicleImagePopUpUpProps = {
  showPopUp: boolean;
  imageUrl: string;
  closeModal: Function;
  popUpBeforeImage?: ListingImageArtifact | null;
  openBeforeImage: React.MouseEventHandler<HTMLDivElement> | undefined;
  showDescriptionText: string | undefined;
  showSliderData: Array<ListingImageArtifact>;
};
const VehicleImagePopUp = ({
  showPopUp,
  imageUrl,
  closeModal,
  popUpBeforeImage,
  openBeforeImage,
  showDescriptionText,
  showSliderData,
}: VehicleImagePopUpUpProps) => {
  const { t } = useTranslation();
  const [zoomEnabled, setZoomEnabled] = useState<boolean>(true);

  const initialSlide = showSliderData?.findIndex(
    (x) => x.ArtifactUrlPath === imageUrl
  );

  useEffect(() => {
    if (showPopUp) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return function () {
      document.body.style.overflow = 'unset';
    };
  }, [showPopUp]);

  const goNext = (event: any) => {
    event.stopPropagation();
    setZoomEnabled(false); // Disable zoom

    setTimeout(() => setZoomEnabled(true), 500);
  };

  const goPrev = (event: any) => {
    event.stopPropagation();
    setZoomEnabled(false); // Disable zoom

    setTimeout(() => setZoomEnabled(true), 500);
  };

  return (
    <>
      {showPopUp && (
        <div className="po-slider spin-car fixed z-30 top-0 left-0 h-full w-full bg-gray-800 bg-opacity-80">
          <div className="w-full h-full top-0 left-0 flex flex-col justify-center items-center">
            <div className="h-full w-full flex justify-center items-center opacity-100">
              <div className=" max-w-[80%] max-h-[90%] w-full relative aspect-[16/9] flex flex-col-reverse lg:flex-row md:justify-center gap-5">
                <TransformWrapper disabled={!zoomEnabled}>
                  <TransformComponent
                    wrapperClass="!w-full aspect-[16/9]"
                    contentClass="!w-full"
                  >
                    {showSliderData && showSliderData?.length > 1 ? (
                      <>
                        <Swiper
                          spaceBetween={10}
                          slidesPerView={1}
                          pagination={{ clickable: true }}
                          initialSlide={initialSlide}
                          className="external-buttons h-[600px]"
                          navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                          }}
                          style={{ zIndex: 1 }}
                        >
                          {showSliderData?.map((images, index) => {
                            return (
                              <div key={index}>
                                <SwiperSlide key={index}>
                                  <picture className="">
                                    <img
                                      className="w-full aspect-[16/9] object-contain"
                                      src={images.ArtifactUrlPath || ''}
                                      alt="Vehicle_image"
                                    />
                                  </picture>
                                </SwiperSlide>
                              </div>
                            );
                          })}
                          <button
                            className="swiper-button-prev"
                            onClick={(event: any) => goPrev(event)}
                          ></button>
                          <button
                            className="swiper-button-next"
                            onClick={(event: any) => goNext(event)}
                          ></button>
                        </Swiper>
                      </>
                    ) : (
                      <picture className="w-full aspect-[16/9]">
                        <img
                          src={imageUrl}
                          alt="used-cars"
                          onError={(event: any) => {
                            event.target.src = '/images/default-car.jpg';
                            event.onerror = null;
                          }}
                          className="w-full"
                        />
                      </picture>
                    )}

                    {popUpBeforeImage && (
                      <div
                        className="absolute top-0 ltr:right-0 rtl:left-0 p-5 cursor-pointer"
                        onClick={openBeforeImage}
                      >
                        <DamageImageIcon className="h-12 w-12" />
                      </div>
                    )}
                  </TransformComponent>
                </TransformWrapper>
                <div className="flex items-center absolute right-0 bottom-0 my-2  justify-center w-full">
                  {popUpBeforeImage?.Description ? (
                    <div className="bg-primary text-white p-2  rounded-sm">
                      {t(LabelConstants.AFTER_REPAIR, {
                        after: popUpBeforeImage?.Description,
                      })}
                    </div>
                  ) : showDescriptionText ? (
                    <div className="bg-primary text-white p-2  rounded-sm">
                      {t(LabelConstants.BEFORE_REPAIR, {
                        before: showDescriptionText,
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="flex justify-end"
                  onClick={() => {
                    closeModal(false);
                  }}
                >
                  <CloseIcon className="cursor-pointer w-[1.875rem] h-[1.875rem] text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleImagePopUp;
