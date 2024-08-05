import React, { useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../common/PopoverV1';
import { useTranslation } from 'next-i18next';
import {
  LabelConstants,
  SelfListingConstants,
} from '../../../types/i18n.labels';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setLoader,
  updateSelfListingFlow,
  updateSelfListingStep,
} from '../../../lib/self-listing/selfListing.slice';
import { ListingImageArtifact } from '../../../types/models';
import { CommonUtils } from '../../../helpers/utilities';
import { useRouter } from 'next/router';
import { ListingService, VehicleService } from '../../../helpers/services';
import { toast } from 'react-toastify';

interface PhotoMenuProps {
  item: ListingImageArtifact;
  itemIndex?: number;
}

const PhotoMenu: React.FC<PhotoMenuProps> = ({ item, itemIndex = -1 }) => {
  const { t } = useTranslation();
  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const vehicleImages = useAppSelector(
    ({ selfListing }) => selfListing.data.vehicleImages
  );
  const imageVerifications = useAppSelector(
    ({ selfListing }) => selfListing.data.imageVerifications
  );
  const selfListingSelector = useAppSelector(({ selfListing }) => selfListing);
  const router = useRouter();

  const handleChangeCover = () => {
    dispatch(
      updateSelfListingStep(SelfListingConstants.SelfListingSelectCoverImage)
    );
  };

  const handleReplaceImage = () => {
    if (hiddenFileInputRef.current) {
      hiddenFileInputRef.current.click();
    }
  };

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
  const handleUseAsCover = async () => {
    console.log('Setting cover image');
    dispatch(setLoader(true));

    try {
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
        item,
        item.ArtifactUrl!
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
        VehicleListingArtifactId: item.VehicleListingArtifactId,
        VehicleListingId: selfListingSelector.data.vehicle_listing_id,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        ArtifactTypeId: item.ArtifactTypeId,
      };
      let delRes = await VehicleService.deleteImage(delData);

      dispatch(setLoader(false));
      let updatedImages: ListingImageArtifact[] = [...vehicleImages].map(
        (itm) => ({
          ...itm,
          IsProfileImage:
            itm.VehicleListingArtifactId === item.VehicleListingArtifactId,
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

  const handleHiddenInputChange = async () => {
    let file: File;
    if (
      hiddenFileInputRef.current &&
      hiddenFileInputRef.current.files &&
      hiddenFileInputRef.current.files.length > 0
    ) {
      dispatch(setLoader(true));
      file = hiddenFileInputRef.current.files[0];
      const delData = {
        VehicleListingArtifactId: item.VehicleListingArtifactId,
        VehicleListingId: selfListingSelector.data.vehicle_listing_id,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        ArtifactTypeId: item.ArtifactTypeId,
      };
      const delRes = await VehicleService.deleteImage(delData);
      if (delRes) {
        let data = {
          VehicleListingId: selfListingSelector.data.vehicle_listing_id,
          ArtifactTypeId: item.ArtifactTypeId,
          FileName: file.name,
          FileData: await CommonUtils.convertBase64(file),
          LanguageId: CommonUtils.getLanguageId(router.locale!),
        };
        const res = await VehicleService.uploadImage(data);
        if (res) {
          const imageData = await ListingService.fetchListingImages(
            selfListingSelector.data.vehicle_listing_id,
            router.locale,
            selfListingSelector.data.body_type_code
          );
          dispatch(updateSelfListingFlow({ vehicleImages: imageData }));
        }
      }
      dispatch(setLoader(false));
    }
  };

  const handleDeleteImage = async () => {
    const data = {
      VehicleListingArtifactId: item.VehicleListingArtifactId,
      VehicleListingId: selfListingSelector.data.vehicle_listing_id,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
      ArtifactTypeId: item.ArtifactTypeId,
    };
    dispatch(setLoader(true));
    const res = await VehicleService.deleteImage(data);
    if (res) {
      const imageData = await ListingService.fetchListingImages(
        selfListingSelector.data.vehicle_listing_id,
        router.locale,
        selfListingSelector.data.body_type_code
      );
      dispatch(updateSelfListingFlow({ vehicleImages: imageData }));
    }
    dispatch(setLoader(false));
  };

  return (
    <DropdownMenu>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        className="hidden"
        ref={hiddenFileInputRef}
        onChange={handleHiddenInputChange}
      />
      <DropdownMenuTrigger className="bg-white shadow-md w-[28px] h-[28px] flex items-center justify-center rounded-full ">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0001 10.8334C10.4603 10.8334 10.8334 10.4603 10.8334 10.0001C10.8334 9.53984 10.4603 9.16675 10.0001 9.16675C9.53984 9.16675 9.16675 9.53984 9.16675 10.0001C9.16675 10.4603 9.53984 10.8334 10.0001 10.8334Z"
            stroke="#212121"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
            stroke="#212121"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.16659 10.8334C4.62682 10.8334 4.99992 10.4603 4.99992 10.0001C4.99992 9.53984 4.62682 9.16675 4.16659 9.16675C3.70635 9.16675 3.33325 9.53984 3.33325 10.0001C3.33325 10.4603 3.70635 10.8334 4.16659 10.8334Z"
            stroke="#212121"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white theme-v1 text-center"
      >
        <DropdownMenuItem className="text-[#212121] text-[13px] ">
          {itemIndex === 0 ? (
            <button onClick={handleChangeCover} className="w-full">
              {t(LabelConstants.CHANGE_COVER_IMAGE)}
            </button>
          ) : (
            <button onClick={handleUseAsCover} className="w-full">
              {t(LabelConstants.USE_AS_COVER)}
            </button>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-[#212121] text-[13px] ">
          <button onClick={handleReplaceImage} className="w-full">
            {t(LabelConstants.REPLACE)}
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-[#212121] text-[13px] ">
          <button onClick={handleDeleteImage} className="w-full">
            {t(LabelConstants.DELETE)}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PhotoMenu;
