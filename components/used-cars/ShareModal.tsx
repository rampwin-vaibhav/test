import { SocialMediaPlatformItem, VehicleTracking } from '../../types/models';
import { Modal, ModalBody } from '../common/Modal';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import { useEffect, useState } from 'react';
import { Locales, SocialMediaPlatform, VehicleEvent } from '../../types/enums';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { toast } from 'react-toastify';
import { VehicleService } from '../../helpers/services';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import { TwitterIcon } from '../icons';

type ShareModalProps = {
  show: boolean;
  listingId: string | number;
  sharingPlatform: Array<SocialMediaPlatformItem>;
  onClose: () => void;
  shareUrl: string;
};

/**
 * This modal component open a window with vehicle sharing options.
 * @returns JSX.Element
 */
const ShareModal = ({
  show,
  listingId,
  sharingPlatform = [],
  onClose,
  shareUrl,
}: ShareModalProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [facebookPlatformDetails, setFacebookPlatformDetails] =
    useState<SocialMediaPlatformItem>();
  const [whatsAppPlatformDetails, setWhatsAppPlatformDetails] =
    useState<SocialMediaPlatformItem>();
  const [emailPlatformDetails, setEmailPlatformDetails] =
    useState<SocialMediaPlatformItem>();
  const [twitterPlatformDetails, setTwitterPlatformDetails] =
    useState<SocialMediaPlatformItem>();
  const [url, setUrl] = useState<string>(``);
  const [copy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (sharingPlatform && sharingPlatform.length > 0) {
      setFacebookPlatformDetails(
        sharingPlatform.find(
          (x) => x.SocialMediaPlatformKey === SocialMediaPlatform.Facebook
        )
      );
      setWhatsAppPlatformDetails(
        sharingPlatform.find(
          (x) => x.SocialMediaPlatformKey === SocialMediaPlatform.WhatsApp
        )
      );
      setEmailPlatformDetails(
        sharingPlatform.find(
          (x) => x.SocialMediaPlatformKey === SocialMediaPlatform.Email
        )
      );
      setTwitterPlatformDetails(
        sharingPlatform.find(
          (x) => x.SocialMediaPlatformKey === SocialMediaPlatform.Twitter
        )
      );
    }
  }, [sharingPlatform]);

  useEffect(() => {
    setUrl(shareUrl);
  }, [listingId, router.locale, shareUrl]);

  useEffect(() => {
    show && setCopy(false);
  }, [show]);

  const onShare = async (platformId: number) => {
    const user = SessionUtils.getUserDetails();
    const data: VehicleTracking = {
      EventType: VehicleEvent.ShareListingLogs,
      SharedPlatformId: platformId,
      UserId: user ? user.UserId : CommonUtils.getChatBotAnonymousUserId(),
      VehicleListingIds: [String(listingId)],
    };
    await VehicleService.track(data);
  };

  const onCopyButtonClick = () => {
    navigator.clipboard.writeText(url);
    setCopy(true);
    toast.success(t(LabelConstants.LINK_COPIED_SUCCESS));
  };

  return (
    <Modal backdrop="static" show={show} onClose={onClose}>
      <ModalBody>
        <div className="flex flex-col gap-3 p-2">
          <div className="font-bold text-xl text-gray-600">
            {t(LabelConstants.SHARE_WITH)}
          </div>
          <div className="flex gap-3 justify-around">
            {facebookPlatformDetails && (
              <FacebookShareButton
                url={url}
                quote={facebookPlatformDetails.SharingTemplate}
                hashtag={'#Popular_car'}
                onClick={() =>
                  onShare(facebookPlatformDetails.SocialMediaPlatformId)
                }
              >
                <FacebookIcon size={50} round />
              </FacebookShareButton>
            )}
            {twitterPlatformDetails && (
              <TwitterShareButton
                title={twitterPlatformDetails.SharingTemplate}
                url={url}
                hashtags={['hashtag1', 'hashtag2']}
                onClick={() =>
                  onShare(twitterPlatformDetails.SocialMediaPlatformId)
                }
              >
                <TwitterIcon className="w-[50px]" />
              </TwitterShareButton>
            )}
            {whatsAppPlatformDetails && (
              <WhatsappShareButton
                title={`${whatsAppPlatformDetails.SharingTemplate}\n\n`}
                url={url}
                onClick={() =>
                  onShare(whatsAppPlatformDetails.SocialMediaPlatformId)
                }
              >
                <WhatsappIcon size={50} round />
              </WhatsappShareButton>
            )}
            {emailPlatformDetails && (
              <a
                href={`mailto:?subject=${emailPlatformDetails.Subject}&body=${(
                  emailPlatformDetails.SharingTemplate || ''
                )
                  .replaceAll('{{n}}', '%0D%0A')
                  .replaceAll('{{url}}', url)}`}
                onClick={() =>
                  onShare(emailPlatformDetails.SocialMediaPlatformId)
                }
              >
                <EmailIcon size={50} round />
              </a>
            )}
          </div>
          <br></br>
          <div className="font-bold text-xl text-gray-600">
            {t(LabelConstants.COPY_THIS_LINK)}
          </div>
          <div className="flex gap-2 w-full items-center">
            <div className="w-full bg-gray-300 text-center text-blue-700 rounded text-xs py-1">
              {url}
            </div>
            <div>
              {copy ? (
                <label className="text-sm">
                  {t(LabelConstants.LINK_COPIED)}
                </label>
              ) : (
                <label
                  className="whitespace-nowrap text-sm"
                  onClick={() => onCopyButtonClick()}
                >
                  {t(LabelConstants.COPY)}
                </label>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShareModal;
