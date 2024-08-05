import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import PhotoMenu from './components/PhotoMenu';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { ArrowRightIcon } from '../icons';
import { ListingService, VehicleService } from '../../helpers/services';
import { ListingImageArtifact } from '../../types/models';
import { useRouter } from 'next/router';
import { CommonUtils } from '../../helpers/utilities';
import { toast } from 'react-toastify';

const UploadCarImages = () => {
  const vehicleImages = useAppSelector(
    ({ selfListing }) => selfListing.data.vehicleImages
  );
  const imageVerifications = useAppSelector(
    ({ selfListing }) => selfListing.data.imageVerifications
  );
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  const [vehicleListingImages, setVehicleListingImages] = useState<
    Array<ListingImageArtifact>
  >([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const initialLoad = async () => {
      dispatch(setLoader(true));
      let listing_body_type_code = selfListingSelector.data.body_type_code;
      if (listing_body_type_code < 0) {
        const listingData = await VehicleService.fetchVehicleListingData(
          selfListingSelector.data.vehicle_listing_id,
          router.locale
        );
        listing_body_type_code = listingData?.Overview?.BodyTypeCode || 1;
      }
      const res = await ListingService.fetchListingImages(
        selfListingSelector.data.vehicle_listing_id,
        router.locale,
        listing_body_type_code
      );
      setVehicleListingImages(res);
      dispatch(
        updateSelfListingFlow({
          imageVerifications: [],
        })
      );
      dispatch(
        updateSelfListingFlow({
          body_type_code: listing_body_type_code,
        })
      );
      dispatch(
        updateSelfListingFlow({
          vehicleImages: res.filter((itm) => itm.ArtifactUrlPath !== null),
        })
      );
      dispatch(setLoader(false));
    };
    initialLoad();
  }, [
    router.locale,
    selfListingSelector.data.vehicle_listing_id,
    dispatch,
    selfListingSelector.data.body_type_code,
  ]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files) {
      console.log('returning form !files');
      return;
    }
    const availableImages = vehicleListingImages.filter(
      (itm) => itm.ArtifactUrlPath === null
    );
    console.log(vehicleListingImages);
    console.log(availableImages);

    if (availableImages.length < files.length) {
      console.log('returning from availableImages.length < files.length');
      return;
    }

    if (files.length > 0) {
      dispatch(setLoader(true));
      try {
        let filesUploadResponses = await Promise.all(
          Array.from(files).map(async (fl, index) => {
            let data = {
              VehicleListingId: selfListingSelector.data.vehicle_listing_id,
              ArtifactTypeId: 0,
              FileName: fl.name,
              FileData: await CommonUtils.convertBase64(fl),
              LanguageId: CommonUtils.getLanguageId(router.locale!),
              VehicleListingArtifactId: 0,
            };
            return await VehicleService.uploadImage(data);
          })
        );
        const newImages = await ListingService.fetchListingImages(
          selfListingSelector.data.vehicle_listing_id,
          router.locale,
          selfListingSelector.data.body_type_code
        );
        setVehicleListingImages(newImages);
        let tempArr = newImages.filter((item) => item.ArtifactUrlPath !== null);
        let verifiedRes = await Promise.all(
          tempArr.map(async (item) => {
            if (!filesUploadResponses.includes(item.VehicleListingArtifactId)) {
              return { [item.VehicleListingArtifactId]: true };
            }
            const verificationRes = await ListingService.verifyVehicleImage(
              item.ArtifactUrlPath
            );
            let finalResult =
              verificationRes.data.isVehicle !== undefined
                ? verificationRes.data.isVehicle
                : verificationRes.data.is_vehicle;
            console.log('finalResult: ', finalResult);

            console.log(verificationRes);

            return {
              [item.VehicleListingArtifactId]: finalResult,
            };
          })
        );
        console.log(verifiedRes);
        dispatch(setLoader(false));

        const prevLength = vehicleImages.length;
        dispatch(updateSelfListingFlow({ vehicleImages: tempArr }));
        dispatch(
          updateSelfListingFlow({
            imageVerifications: verifiedRes,
          })
        );
        if (
          prevLength === 0 ||
          vehicleImages.some((itm) => !itm.IsProfileImage) ||
          imageVerifications.some((x) => Object.values(x)[0] === false)
        ) {
          dispatch(
            updateSelfListingStep(
              SelfListingConstants.SelfListingSelectCoverImage
            )
          );
        }
      } catch (err: any) {
        toast.error(err.message);
        dispatch(setLoader(false));
      }
    }
  };

  const handleContinueBtnClick = () => {
    const isCoverImageSet = vehicleImages.some(
      (item) => item.IsProfileImage === true
    );

    if (cleverTap) {
      cleverTap.event?.push('sl_car_photos_uploaded');
    }
    if (isCoverImageSet) {
      dispatch(
        updateSelfListingStep(
          SelfListingConstants.SelfListingEnterExpectedPrice
        )
      );
    } else {
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingSelectCoverImage)
      );
    }

  };

  return (
    <div className="px-[24px] h-full overflow-y-auto pb-[140px] sm:pb-[90px]">
      <div className="grid grid-cols-2 gap-[16px] mb-[16px] ">
        {[...vehicleImages]
          .sort((a, b) =>
            a.IsProfileImage === b.IsProfileImage
              ? 0
              : a.IsProfileImage
              ? -1
              : 1
          )
          .filter((itm) => itm.ArtifactUrlPath !== null)
          .map((item, index) => (
            <div
              key={item.VehicleListingArtifactId}
              className={`relative ${
                index === 0 ? 'col-span-2' : 'col-span-1'
              } w-full aspect-video`}
            >
              <div className="absolute top-2 right-2 z-30">
                <PhotoMenu item={item} itemIndex={index} />
              </div>
              {index === 0 && (
                <div className="absolute top-[11px] bg-white rounded-[4px] left-[11px] text-[12px] font-medium text-[#212121] py-[4px] px-[6px] z-30">
                  {t(LabelConstants.COVER_IMAGE)}
                </div>
              )}
              <Image
                alt=""
                src={item.ArtifactUrlPath!}
                layout="fill"
                className="rounded-[6px]"
              />
            </div>
          ))}
      </div>

      <div
        className={`w-full ${
          vehicleImages.length === 0
            ? 'aspect-square mb-0'
            : 'aspect-auto mb-[16px]'
        } flex items-center justify-center rounded-[8px] bg-black/[6%] `}
      >
        <label htmlFor="uploadCarImages" className="w-full">
          <div
            className={`${
              vehicleImages.length === 0 ? 'w-[237px]' : 'w-full'
            } h-[56px] rounded-[8px] mx-auto flex items-center cursor-pointer justify-center gap-[8px] bg-white border border-[#B2B2B2] text-[15px] font-medium text-[#212121] `}
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_455_16100)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.66675 5.83317C4.20651 5.83317 3.83341 6.20627 3.83341 6.6665V16.6665C3.83341 17.1267 4.20651 17.4998 4.66675 17.4998H14.6667C15.127 17.4998 15.5001 17.1267 15.5001 16.6665V11.6665C15.5001 11.2063 15.8732 10.8332 16.3334 10.8332C16.7937 10.8332 17.1667 11.2063 17.1667 11.6665V16.6665C17.1667 18.0472 16.0475 19.1665 14.6667 19.1665H4.66675C3.28604 19.1665 2.16675 18.0472 2.16675 16.6665V6.6665C2.16675 5.28579 3.28604 4.1665 4.66675 4.1665H9.66675C10.127 4.1665 10.5001 4.5396 10.5001 4.99984C10.5001 5.46007 10.127 5.83317 9.66675 5.83317H4.66675Z"
                  fill="#757575"
                />
                <path
                  d="M12.1771 11C12.0121 10.7801 11.6831 10.7776 11.5147 10.9949L9.34923 13.7883L7.89705 12.0308C7.72716 11.8251 7.41052 11.8299 7.24685 12.0405L5.58845 14.1743C5.37572 14.448 5.57078 14.8466 5.91744 14.8466H14.2319C14.5754 14.8466 14.7713 14.4544 14.5651 14.1798L12.1771 11Z"
                  fill="#757575"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.3333 9.1665C15.8731 9.1665 15.5 8.79341 15.5 8.33317V1.6665C15.5 1.20627 15.8731 0.83317 16.3333 0.83317C16.7936 0.83317 17.1667 1.20627 17.1667 1.6665V8.33317C17.1667 8.79341 16.7936 9.1665 16.3333 9.1665Z"
                  fill="#757575"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.1667 4.99984C12.1667 4.5396 12.5398 4.1665 13.0001 4.1665H19.6667C20.127 4.1665 20.5001 4.5396 20.5001 4.99984C20.5001 5.46007 20.127 5.83317 19.6667 5.83317H13.0001C12.5398 5.83317 12.1667 5.46007 12.1667 4.99984Z"
                  fill="#757575"
                />
              </g>
              <defs>
                <clipPath id="clip0_455_16100">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            {t(
              vehicleImages.length === 0
                ? LabelConstants.UPLOAD_CAR_PHOTOS
                : LabelConstants.UPLOAD_MORE_PHOTOS
            )}
          </div>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            className="hidden"
            id="uploadCarImages"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
      {vehicleImages.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full">
          <div className="bg-white shadow-[0px_0px_15px_0px_#0000001A]">
            <div className="flex justify-between p-[20px] items-center w-full sm:mx-auto">
              <div>
                <p className="font-normal text-[13px] text-black">
                  <span>{vehicleImages.length}</span>{' '}
                  <span>{t(LabelConstants.UPLOADED)}</span>
                </p>
              </div>

              <button
                disabled={
                  vehicleImages.filter((item) => item.ArtifactTypeId === 1)
                    .length === 0
                }
                onClick={handleContinueBtnClick}
                className="bg-black disabled:opacity-40 text-white rounded-[40px] w-[119px] h-[48px] text-[13px] font-semibold flex items-center gap-2 justify-center"
              >
                {t(LabelConstants.CONTINUE)}
                <ArrowRightIcon className="w-[8px] h-[8px] !text-white rtl:-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCarImages;
