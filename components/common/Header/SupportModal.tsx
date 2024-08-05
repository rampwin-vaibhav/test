import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { SocialMedia } from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import { SocialMediaResponse } from '../../../types/models';
import { CloseIcon, WhatsappIcon } from '../../icons';

type SupportModalProps = {
  closeOverlay: Function;
  isOverlayOpen: boolean;
  socialMedia: SocialMediaResponse | undefined;
  phoneNumber: string;
};

const SupportModal = ({
  closeOverlay,
  isOverlayOpen,
  socialMedia,
  phoneNumber,
}: SupportModalProps) => {
  const { t } = useTranslation();
  const platforms = socialMedia;

  const contactNumber =
    platforms && platforms.SocialMedia.length > 0
      ? platforms.SocialMedia.filter(
          (itm) => itm.SocialMediaType.trim() === SocialMedia.WhatsApp
        ).map(function (data) {
          return data.ContactNumber;
        })
      : null;

  const mediaEmail =
    platforms && platforms.SocialMedia?.length > 0
      ? platforms.SocialMedia.filter(
          (itm) => itm.SocialMediaType === SocialMedia.Email
        ).map(function (data) {
          return data.MediaEmail;
        })
      : null;

  return (
    <>
      {isOverlayOpen && (
        <div className="mobile-scroll flex fixed ltr:right-0 rtl:left-0 top-0 h-screen w-[35.125rem] bg-lighter-gray z-[99999] flex-col drop-shadow-xl shadow-dark-gray1">
          <div className="flex w-full items-center justify-between bg-white h-[4.125rem] drop-shadow">
            <div className="flex justify-center w-full text-2xl">
              {t(LabelConstants.SUPPORT_CONTACT)}
            </div>
            <div className="p-5">
              <div
                className="cursor-pointer"
                onClick={() => closeOverlay(false)}
              >
                <CloseIcon className="w-[1.125rem] h-[1.125rem]" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between h-full flex-col p-4 overflow-y-auto">
            <div className="w-full  ">
              <div className="flex items-center flex-col bg-white py-10">
                <div className="text-4xl font-bold">
                  {t(LabelConstants.HAVE_QUESTIONS)}
                </div>
                <div className="mt-5 text-large">
                  {t(LabelConstants.BROWSE)}
                  <Link href="/info/faq">
                    <a onClick={() => closeOverlay(false)}>
                      <span className="mt-4 cursor-pointer text-gradient">{` ${t(
                        LabelConstants.FAQ
                      )}`}</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-col text-large">
              <div className="mt-4 text-4xl font-bold">
                {t(LabelConstants.HERE_TO_HELP)}
              </div>

              <div className="mt-4">
                {`${t(LabelConstants.PLEASE_GIVE_US_A_CALL)} `}
                <span className="text-gradient phone-direction inline-block">{`${phoneNumber}`}</span>
              </div>

              <div className="mt-4 font-bold">{t(LabelConstants.OR)}</div>

              <a
                href={`https://api.whatsapp.com/send?phone=${
                  contactNumber && encodeURIComponent(String(contactNumber[0]))
                }`}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsappIcon className="mt-4"></WhatsappIcon>
              </a>

              <div className="mt-4 font-bold">{t(LabelConstants.OR)}</div>

              <div className="mt-4 text-gradient">
                <a
                  href={`mailto:${mediaEmail && mediaEmail[0]}`}
                  onClick={() => closeOverlay(false)}
                >
                  {mediaEmail && mediaEmail[0]}
                </a>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col items-center bg-white py-10">
                <div className="text-4xl font-bold text-center px-[0.9375rem]">
                  {t(LabelConstants.FEEDBACK_VALUABLE)}
                </div>
                <div className="mt-5 text-large">
                  {t(LabelConstants.GIVE_YOUR_FEEDBACK)}
                  <Link href="/info/contact-us">
                    <a onClick={() => closeOverlay(false)}>
                      <span className="text-gradient cursor-pointer">
                        {` ${t(LabelConstants.FEEDBACK)}`}
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportModal;
