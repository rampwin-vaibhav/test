import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { LabelConstants, SelfListingConstants } from '../../types/i18n.labels';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../lib/self-listing/selfListing.slice';
import { ArrowRightIcon } from '../icons';
import { ListingImageArtifact } from '../../types/models';
import { CommonUtils } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import { VehicleService } from '../../helpers/services';
import { toast } from 'react-toastify';

const SelectCoverImage = () => {
  const vehicleImages = useAppSelector(
    ({ selfListing }) => selfListing.data.vehicleImages
  );
  const imageVerifications = useAppSelector(
    ({ selfListing }) => selfListing.data.imageVerifications
  );
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const [selectedImage, setSelectedImage] = useState<number>(
    vehicleImages.findIndex((item) => item.IsProfileImage)
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {};

  async function createFileObjectFromUrl(
    selImg: ListingImageArtifact,
    fileName: string
  ) {
    try {
      const response = await fetch(selImg.ArtifactUrlPath!);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: selImg.MimeType });
      return file;
    } catch (error) {
      console.error('Error creating File object:', error);
      return null;
    }
  }

  const handleSetCoverImage = async (selectedImage: ListingImageArtifact) => {
    console.log('Setting cover image');
    const newImages = vehicleImages.filter((item) =>
      imageVerifications.find((x) => x[item.VehicleListingArtifactId] === false)
    );

    dispatch(setLoader(true));

    try {
      let res = await Promise.all(
        newImages.map(async (img) => {
          const data = {
            VehicleListingArtifactId: img.VehicleListingArtifactId,
            VehicleListingId: selfListingSelector.data.vehicle_listing_id,
            LanguageId: CommonUtils.getLanguageId(router.locale!),
            ArtifactTypeId: img.ArtifactTypeId,
          };
          return await VehicleService.deleteImage(data);
        })
      );

      // Remove old
      let oldCover = vehicleImages.find((x) => x.ArtifactTypeId === 1);
      if (oldCover) {
        const fileToRemoveFromCover = await createFileObjectFromUrl(
          oldCover,
          oldCover.ArtifactUrl!
        );
        let oldData = {
          VehicleListingId: selfListingSelector.data.vehicle_listing_id,
          ArtifactTypeId: 0,
          FileName: fileToRemoveFromCover!.name,
          FileData: await CommonUtils.convertBase64(fileToRemoveFromCover!),
          LanguageId: CommonUtils.getLanguageId(router.locale!),
        };

        const setRes = await VehicleService.uploadImage(oldData);

        const oldDelData = {
          VehicleListingArtifactId: oldCover.VehicleListingArtifactId,
          VehicleListingId: selfListingSelector.data.vehicle_listing_id,
          LanguageId: CommonUtils.getLanguageId(router.locale!),
          ArtifactTypeId: oldCover.ArtifactTypeId,
        };
        let delRes = await VehicleService.deleteImage(oldDelData);
      }

      let fileToSetCover = await createFileObjectFromUrl(
        selectedImage,
        selectedImage.ArtifactUrl!
      );

      if (!fileToSetCover) {
        return;
      }

      let data = {
        VehicleListingId: selfListingSelector.data.vehicle_listing_id,
        ArtifactTypeId: 1,
        FileName: fileToSetCover.name,
        FileData: await CommonUtils.convertBase64(fileToSetCover),
        LanguageId: CommonUtils.getLanguageId(router.locale!),
      };

      const setRes = await VehicleService.uploadImage(data);

      if (!setRes) {
        return;
      }

      const delData = {
        VehicleListingArtifactId: selectedImage.VehicleListingArtifactId,
        VehicleListingId: selfListingSelector.data.vehicle_listing_id,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        ArtifactTypeId: selectedImage.ArtifactTypeId,
      };
      let delRes = await VehicleService.deleteImage(delData);

      dispatch(setLoader(false));
      let updatedImages: ListingImageArtifact[] = [...vehicleImages].map(
        (item) => ({
          ...item,
          IsProfileImage:
            item.VehicleListingArtifactId ===
            selectedImage.VehicleListingArtifactId,
        })
      );
      dispatch(
        updateSelfListingFlow({
          vehicleImages: updatedImages.filter(
            (itm) => itm.ArtifactUrlPath !== null
          ),
        })
      );
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingUploadCarImages)
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="px-[24px] h-full overflow-y-auto pb-[140px] sm:pb-[90px]">
      <p className="text-[15px] text-[#212121] font-medium my-[14px] ">
        {t(LabelConstants.SELECT_A_COVER_IMAGE_FOR_YOUR_POST)}
      </p>
      <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
        {vehicleImages
          .filter((itm) => itm.ArtifactUrlPath !== null)
          .map((item, index) => {
            let verif = imageVerifications.find(
              (x) => x?.[item.VehicleListingArtifactId]
            );

            return (
              <div
                key={item.VehicleListingArtifactId}
                onClick={() => {
                  if (verif) {
                    handleSetCoverImage(item);
                  }
                }}
                className={`relative w-full border-2 ${
                  index === selectedImage
                    ? 'border-[#038700]'
                    : verif
                    ? 'border-transparent'
                    : 'border-[#EE4D37]'
                } aspect-video rounded-[6px] overflow-hidden `}
              >
                {selectedImage === -1 && verif && (
                  <div className="absolute top-0 right-0 flex justify-end p-[8px] w-full h-full bg-white/40 z-30">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="20"
                        height="20"
                        rx="4"
                        fill="white"
                        stroke="#212121"
                      />
                    </svg>
                  </div>
                )}

                {!verif && (
                  <div className="absolute top-0 right-0 flex items-center justify-center p-[8px] w-full h-full bg-[#AB2424]/50 z-30">
                    <p className="text-[11px] text-white font-semibold">
                      {t(LabelConstants.IMPROPER_IMAGE)}
                    </p>
                  </div>
                )}
                {index === selectedImage && (
                  <div className="absolute top-[8px] right-[8px] z-30">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="20"
                        height="20"
                        rx="4"
                        fill="white"
                        stroke="#212121"
                      />
                      <path
                        d="M6 11.5L9.5 15L16.5 8"
                        stroke="#212121"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <Image alt="" src={item.ArtifactUrlPath!} layout="fill" />
              </div>
            );
          })}
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
              disabled
              className="bg-black disabled:opacity-40 text-white rounded-[40px] w-[119px] h-[48px] text-[13px] font-semibold flex items-center gap-2 justify-center"
            >
              {t(LabelConstants.CONTINUE)}
              <ArrowRightIcon className="w-[8px] h-[8px] !text-white rtl:-rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCoverImage;
