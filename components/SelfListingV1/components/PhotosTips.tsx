import React from 'react';
import { CloseIcon } from '../../icons';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../../types/i18n.labels';

const PhotosTips = ({
  closeTips = () => {},
}: {
  closeTips?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center min-h-full min-w-full bg-black/20 backdrop-blur-sm ">
      <div className="bg-white w-[312px] rounded-lg shadow-lg py-[22px] px-[16px]">
        <div className="text-xl font-bold mb-4 flex items-start justify-between">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="21" cy="21" r="21" fill="#F4E8F5" />
            <path
              d="M24.9018 16.4879C23.4446 15.3362 21.5644 14.9367 19.7311 15.3597C17.5924 15.8533 15.8766 17.5455 15.3596 19.6843C14.772 22.0582 15.5946 24.4555 17.5218 25.9362C17.6629 26.0537 17.7569 26.2652 17.7569 26.5003V29.7202C17.7569 30.3783 18.2974 30.9189 18.9555 30.9189H19.7076C19.9191 31.5535 20.4832 32 21.1883 32C21.8934 32 22.4575 31.53 22.669 30.9189H23.4211C24.0792 30.9189 24.6197 30.3783 24.6197 29.7202V26.4768C24.6197 26.2652 24.6903 26.0772 24.8313 25.9597C26.3355 24.808 27.2051 23.0688 27.2051 21.212C27.1816 19.3553 26.3355 17.6395 24.9018 16.4879ZM19.1906 29.4617V28.0985H23.1391V29.4617H19.1906ZM23.9382 24.808C23.4446 25.1841 23.1391 25.7952 23.1391 26.4768V26.6648H19.1906V26.5003C19.1906 25.8187 18.885 25.1841 18.3915 24.7845C16.9343 23.6564 16.2997 21.8466 16.7462 20.0134C17.1458 18.4151 18.4385 17.146 20.0602 16.7699C21.4703 16.4409 22.904 16.7464 24.0087 17.616C25.1133 18.4857 25.7479 19.7783 25.7479 21.1885C25.7244 22.6222 25.0663 23.9384 23.9382 24.808Z"
              fill="#4C0055"
            />
            <path
              d="M21.1638 13.737C21.5633 13.737 21.8924 13.408 21.8924 13.0084V10.7286C21.8924 10.329 21.5633 10 21.1638 10C20.7642 10 20.4352 10.329 20.4352 10.7286V13.0084C20.4352 13.408 20.7642 13.737 21.1638 13.737Z"
              fill="#4C0055"
            />
            <path
              d="M15.9235 15.8996C16.2056 15.6176 16.2056 15.1475 15.9235 14.8655L14.3018 13.2438C14.0198 12.9617 13.5497 12.9617 13.2677 13.2438C12.9856 13.5258 12.9856 13.9959 13.2677 14.2779L14.8894 15.8996C15.0304 16.0406 15.2184 16.1112 15.4064 16.1112C15.5945 16.1112 15.7825 16.0406 15.9235 15.8996Z"
              fill="#4C0055"
            />
            <path
              d="M13.0084 20.4363H10.7286C10.329 20.4363 10 20.7653 10 21.1649C10 21.5644 10.329 21.8935 10.7286 21.8935H13.0084C13.4079 21.8935 13.737 21.5644 13.737 21.1649C13.737 20.7653 13.4079 20.4363 13.0084 20.4363Z"
              fill="#4C0055"
            />
            <path
              d="M31.5991 20.4358H29.3193C28.9197 20.4358 28.5907 20.7648 28.5907 21.1644C28.5907 21.5639 28.9197 21.893 29.3193 21.893H31.5991C31.9986 21.893 32.3277 21.5639 32.3277 21.1644C32.3277 20.7648 31.9986 20.4358 31.5991 20.4358Z"
              fill="#4C0055"
            />
            <path
              d="M29.0602 13.2677C28.7782 12.9856 28.3081 12.9856 28.0261 13.2677L26.4044 14.8894C26.1224 15.1714 26.1224 15.6415 26.4044 15.9236C26.5454 16.0646 26.7334 16.1351 26.9215 16.1351C27.1095 16.1351 27.2975 16.0646 27.4385 15.9236L29.0602 14.3018C29.3423 13.9963 29.3423 13.5497 29.0602 13.2677Z"
              fill="#4C0055"
            />
          </svg>

          <button
            className="w-[24px] h-[24px] bg-[#F0F0F0] rounded-full flex items-center justify-center "
            onClick={closeTips}
          >
            <CloseIcon className="w-[8px] h-[8px] " />
          </button>
        </div>
        <div className="w-full">
          <p className="text-[#212121] my-[16px] text-[15px] font-semibold ">
            {t(LabelConstants.TIPS_ON_GETTING_GOOD_PHOTOS)}
          </p>
          <ul
            className="!text-[15px] text-[#212121] leading-[27px] !my-0 !pl-7 "
            style={{ all: 'revert' }}
          >
            <li>{t(LabelConstants.CLICK_MULTIPLE_PHOTOS_AND_COVER_360)}</li>
            <li>{t(LabelConstants.USE_GOOD_HIGH_RESOLUTION_CAMERA)}</li>
            <li>{t(LabelConstants.MAKE_SURE_ITS_UNDER_NATURAL_LIGHT)}</li>
            <li>{t(LabelConstants.TRY_AVOIDING_ANOTHER_CAR_IN_PHOTO)}</li>
            <li>{t(LabelConstants.AVOID_ANY_REFLECTION_OR_SHADOW)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotosTips;
