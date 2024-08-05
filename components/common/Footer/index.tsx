import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { SocialMedia } from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import {
  ConfigurationResponse,
  SocialMediaResponse,
} from '../../../types/models';
import { EmailIcon, TelephoneIcon } from '../../icons';
import parse from 'html-react-parser';
import Image from 'next/image';

type ChildProps = {
  careerEmail: ConfigurationResponse;
  socialMedia: SocialMediaResponse;
  phoneNumber: string;
};

const Footer: FC<ChildProps> = ({
  careerEmail,
  socialMedia,
  phoneNumber,
}): ReactElement => {
  const { t } = useTranslation();
  const socialMediaUrl = socialMedia;

  const mediaEmail =
    socialMediaUrl && socialMediaUrl.SocialMedia?.length > 0
      ? socialMediaUrl.SocialMedia.filter(
          (itm) => itm.SocialMediaType === SocialMedia.Email
        ).map(function (data) {
          return data.MediaEmail;
        })
      : null;

  const getSocialMediaURL = (mediaType: SocialMedia) => {
    if (
      socialMediaUrl &&
      socialMediaUrl.SocialMedia &&
      socialMediaUrl.SocialMedia.length > 0
    ) {
      const media = socialMediaUrl.SocialMedia.find(
        (itm) => itm.SocialMediaType.trim() === mediaType
      );
      return media ? media.MediaUrl : '';
    }
    return '';
  };

  return (
    <footer className="flex flex-col pt-[5.625rem] bg-primary container text-white text-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[1.638rem]">
        <div className="min-w-max flex flex-col gap-[1.438rem] items-center md:items-start">
          <div className="uppercase">{t(LabelConstants.ABOUT_GOGO_MOTOR)}</div>
          <div className="flex sm:flex-row flex-col sm:gap-12">
            <div className="flex flex-col gap-1">
              <div className="flex justify-center md:justify-start">
                <Link prefetch={false} href="/info/about-us">
                  <a>{t(LabelConstants.ABOUT_US)}</a>
                </Link>
              </div>
              <div className="flex justify-center md:justify-start">
                <a href={`mailto:${careerEmail?.ConfigurationValue}`}>
                  {t(LabelConstants.CAREERS)}
                </a>
              </div>
              <div className="flex justify-center md:justify-start">
                <Link prefetch={false} href="/info/contact-us">
                  {t(LabelConstants.CONTACT_US)}
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-center md:justify-start">
                <Link prefetch={false} href="/info/faq">
                  <a>{t(LabelConstants.FAQ)}</a>
                </Link>
              </div>
              <div className="flex justify-center md:justify-start">
                <Link prefetch={false} href="/info/privacy-policy">
                  <a>{t(LabelConstants.PRIVACY_POLICY)}</a>
                </Link>
              </div>
              <div className="flex justify-center md:justify-start">
                <Link prefetch={false} href="/info/terms-and-conditions">
                  {t(LabelConstants.TERMS_CONDITIONS)}
                </Link>
              </div>
              <div className="flex justify-center md:justify-start">
                <Link
                  prefetch={false}
                  href="/info/terms-and-conditions#sales-and-purchase-policy"
                >
                  {t(LabelConstants.SALES_AND_PURCHASE)}
                </Link>
              </div>
              <div className="flex justify-center md:justify-start">
                <Link
                  prefetch={false}
                  href="/info/terms-and-conditions#refund-and-cancellation-policy"
                >
                  {t(LabelConstants.REFUND_AND_CANCELLATION)}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[1.438rem] items-center md:items-start">
          <div className="ml-0 md:ml-20 flex flex-col gap-[1.438rem] items-center md:items-start">
            <div>{t(LabelConstants.KEEP_IN_TOUCH)}</div>
            <div className="flex gap-5">
              <a
                href={getSocialMediaURL(SocialMedia.Facebook)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getSocialMediaURL(SocialMedia.Facebook)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/fb.svg`}
                  alt="gogo motor"
                  width={48}
                  height={47}
                  className="w-12"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
              <a
                href={getSocialMediaURL(SocialMedia.YouTube)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getSocialMediaURL(SocialMedia.YouTube)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/youtube.svg`}
                  alt="gogo motor"
                  width={48}
                  height={47}
                  className="w-12"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
              <a
                href={getSocialMediaURL(SocialMedia.Instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getSocialMediaURL(SocialMedia.Instagram)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/instagram.svg`}
                  alt="gogo motor"
                  width={48}
                  height={47}
                  className="w-12"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
              <a
                href={getSocialMediaURL(SocialMedia.Twitter)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getSocialMediaURL(SocialMedia.Twitter)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/twitter.svg`}
                  alt="gogo motor"
                  width={48}
                  height={47}
                  className="w-12"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
              <a
                href={getSocialMediaURL(SocialMedia.LinkedIn)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getSocialMediaURL(SocialMedia.LinkedIn)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/linkedin.svg`}
                  alt="gogo motor"
                  width={48}
                  height={47}
                  className="w-12"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
            </div>
          </div>
          <div className="lg:min-w-max ml-0 md:ml-20 xl:flex hidden flex-col gap-2 items-center md:items-start mt-8">
            <div>{t(LabelConstants.NEED_HELP)}</div>
            <div className="flex gap-3 items-center mt-[0.540rem]">
              <div>
                <TelephoneIcon />
              </div>
              <div className="flex flex-col text-lg 2xl:text-[1.063rem]">
                <span>{phoneNumber}</span>
                <span>{t(LabelConstants.GOGOMOTOR_WORK_TIME1)}</span>
                {/* <span>{t(LabelConstants.GOGOMOTOR_WORK_TIME2)}</span> */}
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <EmailIcon />
              </div>
              <span className="underline text-lg 2xl:text-[1.063rem] cursor-pointer">
                <a href={`mailto:${mediaEmail && mediaEmail[0]}`}>
                  {mediaEmail && mediaEmail[0]}
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[1.438rem] items-center lg:col-span-2">
          <div className="flex flex-col gap-[1.438rem]">
            <div className="w-full text-center xl:text-start uppercase">
              {t(LabelConstants.PAYMENT_METHODS)}
            </div>
            <div className="flex flex-wrap lg:justify-end justify-center gap-5 lg:col-span-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/casamada.svg`}
                alt="gogo motor"
                width={100}
                height={60}
                className="max-w-[6.25rem] max-h-[3.75rem]"
                loading="lazy"
                unoptimized={true}
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/mastercard.svg`}
                alt="gogo motor"
                width={100}
                height={60}
                className="max-w-[6.25rem] max-h-[3.75rem]"
                loading="lazy"
                unoptimized={true}
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/visacard.svg`}
                alt="gogo motor"
                width={100}
                height={60}
                className="max-w-[6.25rem] max-h-[3.75rem]"
                loading="lazy"
                unoptimized={true}
              />
              {/* <picture>
                <source
                  srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/american-express.svg`}
                  type="image/svg"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/american-express.svg`}
                  alt="gogo motor"
                  className="max-w-[6.25rem] max-h-[3.75rem]"
                />
              </picture> */}
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/applepay.svg`}
                alt="gogo motor"
                width={100}
                height={60}
                className="max-w-[6.25rem] max-h-[3.75rem]"
                loading="lazy"
                unoptimized={true}
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/stcpay.svg`}
                alt="gogo motor"
                width={100}
                height={60}
                className="max-w-[6.25rem] max-h-[3.75rem]"
                loading="lazy"
                unoptimized={true}
              />
            </div>
          </div>

          {/*
               Need help section - For Large Devices
         */}

          <div className="hidden xl:flex flex-col items-center">
            <div className="mt-5">
              {t(LabelConstants.PLEASE_VISIT_APP_STORE)}
            </div>
            <div className="flex items-center gap-2 mt-[1.438rem]">
              <a
                href="https://play.google.com/store/apps/details?id=com.petromin.gogomotor&pli=1"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/google_play.png`}
                  alt="gogo motor"
                  width={149}
                  height={46}
                  className="w-[9.3rem] aspect-[16/5] cursor-pointer rounded"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
              <a
                href="https://apps.apple.com/sa/app/gogo-motor/id1665705551"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_store.png`}
                  alt="gogo motor"
                  width={149}
                  height={46}
                  className="w-[9.3rem] aspect-[16/5] cursor-pointer rounded"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
              <a
                href="https://appgallery.huawei.com/app/C107741441"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_gallery.png`}
                  alt="gogo motor"
                  width={149}
                  height={46}
                  className="w-[9.3rem] aspect-[16/5] cursor-pointer rounded"
                  loading="lazy"
                  unoptimized={true}
                />
              </a>
            </div>
            <div className="flex items-center gap-3 w-full justify-center my-10">
              <div className="flex gap-5 justify-between">
                <div className="flex flex-col gap-y-[0.875rem]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_scanner.png`}
                    alt="gogo motor"
                    width={112}
                    height={112}
                    className="w-[7rem] h-[7rem]"
                    loading="lazy"
                    unoptimized={true}
                  />
                </div>
              </div>
              <span className="w-auto md:w-[16.75rem] leading-6 text-center">
                {t(LabelConstants.PLEASE_SCAN)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/*
          Need help section - For Small Devices
      */}

      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-[1.438rem]">
        <div className="flex flex-col gap-[1.438rem] items-center md:items-start mt-[1.638rem]">
          <div>{t(LabelConstants.NEED_HELP)}</div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-3  w-full">
              <div>
                <TelephoneIcon />
              </div>
              <div className="flex flex-col">
                <span>{phoneNumber}</span>
                <span>{t(LabelConstants.GOGOMOTOR_WORK_TIME1)}</span>
                {/* <span>{t(LabelConstants.GOGOMOTOR_WORK_TIME2)}</span> */}
              </div>
            </div>
            <div className="flex gap-3  w-full">
              <div>
                <EmailIcon />
              </div>
              <span className="underline cursor-pointer">
                <a href={`mailto:${mediaEmail && mediaEmail[0]}`}>
                  {mediaEmail && mediaEmail[0]}
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:justify-end justify-center md:justify-start items-center text-base">
          <div className="mt-[1.638rem]">
            {t(LabelConstants.PLEASE_VISIT_APP_STORE)}
          </div>
          <div className="flex items-center gap-2 mt-[1.438rem]">
            <a
              href="https://play.google.com/store/apps/details?id=com.petromin.gogomotor&pli=1"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/google_play.png`}
                alt="gogo motor"
                width={149}
                height={46}
                className="w-[9.3rem] aspect-[16/5] cursor-pointer rounded"
                loading="lazy"
                unoptimized={true}
              />
            </a>
            <a
              href="https://apps.apple.com/sa/app/gogo-motor/id1665705551"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_store.png`}
                alt="gogo motor"
                width={149}
                height={46}
                className="w-[9.3rem] aspect-[16/5] cursor-pointer rounded"
                loading="lazy"
                unoptimized={true}
              />
            </a>

            <a
              href="https://appgallery.huawei.com/app/C107741441"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_gallery.png`}
                alt="gogo motor"
                width={149}
                height={46}
                className="w-[9.3rem] aspect-[16/5] cursor-pointer rounded"
                loading="lazy"
                unoptimized={true}
              />
            </a>
          </div>
          <div className="flex items-center gap-5 my-10">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-[0.875rem]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_scanner.png`}
                  alt="gogo motor"
                  width={96}
                  height={96}
                  className="w-[6rem] h-[6rem]"
                  loading="lazy"
                  unoptimized={true}
                />
              </div>
            </div>
            <span className="w-auto md:w-[13.75rem] text-base leading-6">
              {t(LabelConstants.PLEASE_SCAN)}
            </span>
          </div>
        </div>
      </div>
      <hr className="border-white sm:mx-[2.5rem]" />
      <div className="flex flex-col justify-center sm:justify-start my-4">
        <span className="text-center">{t(LabelConstants.COPYRIGHT)}</span>
        <span className="text-center">
          {parse(t(LabelConstants.GOGOMOTOR_ADDRESS))}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
