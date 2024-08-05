import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { GlobalService } from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import { ConfigurationKey, Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { CallIcon, ContactUsIcon, EmailIcon } from '../icons';
import DownloadSection from './DownloadSection';

type ContactDetailsProps = {};
const ContactDetailsSection = ({}: ContactDetailsProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState<any>(['care@gogoproshield.com']);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    const initialLoad = async () => {
      const [socialMediaData, phoneNumberConfigurationData] = await Promise.all(
        [
          GlobalService.fetchSocialMedia(),
          ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.CustomerPhoneNumber
          ),
        ]
      );
      // setEmail(
      //   socialMediaData.SocialMedia.filter(
      //     (itm) => itm.SocialMediaType === SocialMedia.Email
      //   ).map(function (data) {
      //     return data.MediaEmail;
      //   })
      // );
      phoneNumberConfigurationData &&
        setPhoneNumber(phoneNumberConfigurationData.ConfigurationValue);
    };
    if (router.locale) initialLoad();
  }, [router.locale]);
  return (
    <Fragment>
      <div className="mt-16 flex justify-center">
        <div className="flex w-[90%] lg:w-[65%] items-center relative bg-primary h-[22rem] rounded-[3rem]">
          <div
            className={`absolute -top-14 ${
              router.locale === Locales.AR ? 'left-3' : 'right-3'
            }`}
          >
            {<ContactUsIcon className="w-36 h-36 md:w-48 md:h-48" />}
          </div>
          <div className="p-10 lg:p-20 w-full">
            <h1 className="text-3xl tracking-wide md:text-5xl font-bold py-8 md:pt-0 md:pb-16 text-white">
              {t(LabelConstants.CONTACT_US)}
            </h1>
            <div className="flex flex-col md:flex-row md:justify-start gap-8 md:gap-24">
              <div className="w-full flex justify-between md:justify-start items-center md:gap-10 pb-8 md:pb-0 border-b md:border-none">
                <div className="flex flex-col">
                  <p className="text-lg text-gray-300 mb-2">Write to us</p>
                  <p className="text-xl md:text-2xl text-white">
                    <a href={`mailto:${email && email[0]}`}>
                      {email && email[0]}
                    </a>
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center">
                  <EmailIcon primaryColor="#4C0055" />
                </div>
              </div>
              <div className="w-full flex justify-between md:justify-start items-center md:gap-10 pb-6 md:pb-0">
                <div className="flex flex-col">
                  <p className="text-lg text-gray-300 mb-2">Call us</p>
                  <p className="text-xl md:text-2xl text-white">
                    {phoneNumber}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center">
                  <CallIcon className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DownloadSection />
    </Fragment>
  );
};

export default ContactDetailsSection;
