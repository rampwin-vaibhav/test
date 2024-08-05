import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { AuthService, ProfileService } from '../../helpers/services';
import { VerifyEmailPayload } from '../../types/models';
import { toast } from 'react-toastify';
import { InboxIcon } from '../../components/icons';
import Link from 'next/link';
import { RedirectURL } from '../../types/constants';
import { CommonUtils } from '../../helpers/utilities';

const SignUpInfo = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const campaignKey: string | undefined = router.query.c as string;
  const emailId: string = decodeURIComponent(router.query.e as string);

  useEffect(() => {
    {
      /* Added script to handle navigation for SignUp flow for mobile app (web view) */
    }
    const scriptTag = document.createElement('script');
    scriptTag.innerText = `(function(){
      const element_btn_nav_to_home = document.getElementById("btn_nav_to_home");
      if(element_btn_nav_to_home) {
        element_btn_nav_to_home.addEventListener("click", function() {
          console.log('HOME button click handler');  
          if(typeof GotoHomePageChannel !== "undefined"){
            console.log(GotoHomePageChannel);
            GotoHomePageChannel.postMessage("Navigate to App");
          }
        });
      }  
    })();`;
    scriptTag.async = true;
    document.head?.appendChild(scriptTag);

    // Do cleanup to avoid weird issues
    return () => {
      document.head.removeChild(scriptTag);
    };
  }, []);

  const onResendVerificationHandler = async () => {
    const payload: VerifyEmailPayload = {
      EmailAddress: emailId,
      Language: router.locale === Locales.EN ? 'English' : 'Arabic',
      CampaignKey: campaignKey,
    };
    const response = await ProfileService.verifyAndSendVerificationLink(
      payload
    );
    if (
      response.IsSuccess &&
      response.MessageCode === 'VERIFICATION_LINK_SENT'
    ) {
      toast.success(t(LabelConstants.MSG_VERIFICATION_LINK_SENT));
    } else {
      if (response.MessageCode === 'EMAIL_ALREADY_EXISTS') {
        toast.warning(t(LabelConstants.MSG_EMAIL_ALREADY_EXISTS));
      } else {
        toast.error(t(LabelConstants.MSG_VERIFICATION_LINK_SENT_FAILURE));
      }
    }
  };

  const onSignInClickHandler = async () => {
    // const response = await AuthService.fetchSignInUrl(
    //   CommonUtils.getLanguageId(router.locale!)
    // );
    // if (response) {
    //   window.location.href = response;
    // }
    router.push('/sign-in');
  };

  return (
    <div className="account-container flex justify-center md:justify-between">
      <div className="w-1/2  hidden md:block">
        <picture>
          <source
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            type="image/webp"
          />
          <img
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            alt="gogo motor"
            className="h-full w-full object-fill"
          />
        </picture>
      </div>
      <div className="flex justify-center w-1/2">
        <div className="md:px-[1.25rem] p-[1.5rem]">
          <div className="md:mt-[4rem]">
            <Link href="/">
              <picture className="cursor-pointer flex w-full items-center justify-center">
                <source
                  srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/gogo-motors.svg`}
                  type="image/svg"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/gogo-motors.svg`}
                  alt="gogo motor"
                  className="w-[14rem] h-[5rem]"
                />
              </picture>
            </Link>
          </div>
          <div className="flex flex-col items-center jus mt-[2.16rem]">
            <InboxIcon className="mt-[0.938rem] w-[4.875rem] h-[4.875rem]" />
            <div className="text-primary text-2xl md:text-[2.20rem] md:leading-10 font-bold mt-4 text-center">
              {t(LabelConstants.CHECK_YOUR_INBOX_HEAD)}
            </div>
            <section className="flex flex-col mt-[3.146rem] w-[26.938rem] text-xl">
              <span className="text-center">
                {t(LabelConstants.CHECK_YOUR_INBOX_MSG)}
              </span>
              <span className="font-semibold text-center break-words">
                {emailId}
              </span>
            </section>
            <section>
              <button
                className="btn btn-link"
                onClick={() => onResendVerificationHandler()}
              >
                {t(LabelConstants.RESEND_VERIFICATION_LINK)}
              </button>
            </section>
            <div className="flex gap-3 mt-20">
              <button
                className="btn btn-primary !min-w-[10rem] !min-h-[3rem] uppercase"
                onClick={() => router.push('/')}
                id="btn_nav_to_home"
              >
                {t(LabelConstants.HOME)}
              </button>
              <button
                className="btn btn-secondary !min-w-[10rem] !min-h-[3rem] uppercase"
                onClick={onSignInClickHandler}
              >
                {t(LabelConstants.SIGN_IN)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpInfo;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      hideLayout: true,
    },
  };
};
