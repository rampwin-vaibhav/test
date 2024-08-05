import CleverTap from 'clevertap-web-sdk/clevertap';
import { withApplicationInsights } from 'next-applicationinsights';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import 'rc-slider/assets/index.css';
import { useCallback, useEffect, useState } from 'react';
import { clarity } from 'react-microsoft-clarity';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/common/Footer';
import FooterCampaign from '../components/common/Footer/FooterCampaign';
import Header from '../components/common/Header';
import { GlobalService } from '../helpers/services';
import ConfigurationService from '../helpers/services/configuration.service';
import { SessionUtils } from '../helpers/utilities';
import { PushDataToGTM } from '../helpers/utilities/gtm';
import { setCleverTap } from '../lib/global.slice';
import { AppProvider } from '../provider/AppProvider';
import '../styles/globals.scss';
import { AppTheme } from '../types/constants';
import { ConfigurationKey } from '../types/enums';
import { GTMEvents } from '../types/gtm';
import { LabelConstants } from '../types/i18n.labels';
import { ConfigurationResponse, SocialMediaResponse } from '../types/models';
import StoreProvider from './StoreProvider';
import {
  getCanonicalUrlServerSide,
  getCurrentPageCanonicalUrl,
} from '../helpers/utilities/canonicalUrlHelper';
import App from 'next/app';
// const ChatBot = dynamic(() => import('../components/common/ChatBot'), {
//   ssr: false,
// });
interface AppProps extends NextAppProps {
  canonicalUrlServerSide: string;
}
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  canonicalUrlServerSide,
}: AppProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [careerEmail, setCareerEmail] = useState<ConfigurationResponse>();
  const [socialMedia, setSocialMediaData] = useState<SocialMediaResponse>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const pushDataToAnalytics = useCallback(() => {
    if (router.isReady) {
      const user = SessionUtils.getUserDetails();

      let userId = '';

      if (user) {
        userId = process.env.NEXT_PUBLIC_GTM_ENV_PREFIX + user.UserId;
      }

      //Added GTM event for Page View
      PushDataToGTM(GTMEvents.PageView, {
        url: router.asPath,
        userId,
      });
    }
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    pushDataToAnalytics();
  }, [pushDataToAnalytics]);

  useEffect(() => {
    const id = process?.env?.NEXT_PUBLIC_CLARITY_ID!;
    if (id) {
      clarity.init(id);
    }
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      /* Load application header menu */
      const [configRes, socialMediaData, phoneNumberConfigurationData] =
        await Promise.all([
          ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.CareersEmailId,
            router.locale
          ),

          GlobalService.fetchSocialMedia(),
          ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.CustomerPhoneNumber
          ),
        ]);
      setCareerEmail(configRes);
      setSocialMediaData(socialMediaData);
      phoneNumberConfigurationData &&
        setPhoneNumber(phoneNumberConfigurationData.ConfigurationValue);
    };
    if (router.locale) initialLoad();
  }, [router.locale]);

  const loadTheme = () => {
    switch (pageProps.applyTheme) {
      case AppTheme.V1:
        return 'theme-v1';
      default:
        return 'theme-default';
    }
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined') {
        setCanonicalUrl(getCurrentPageCanonicalUrl(url));
      }
    };

    const url = typeof window !== 'undefined' && window?.location?.href;
    if (url) {
      setCanonicalUrl(getCurrentPageCanonicalUrl(url));
    }
    router?.events?.on('routeChangeComplete', handleRouteChange);

    return () => {
      router?.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [router?.events]);

  return (
    <StoreProvider>
      <CleverTapHOC>
        <AppProvider>
          {/* <MetaDataRouteComponent /> */}
          <Head>
            <title key={'page-title'}>
              {t(LabelConstants.GO_GO_MOTOR_PAGE_META_TITLE_GLOBAL)}
            </title>
            {process.env.NEXT_PUBLIC_ENABLE_CRAWLING === 'true' ? (
              <></>
            ) : (
              <>
                <meta name="robots" content="noindex" />
                <meta name="googlebot" content="noindex" />
              </>
            )}
            <meta
              name="description"
              content={t(LabelConstants.GO_GO_MOTOR_PAGE_META_DESC_GLOBAL)}
              key="meta-data-description"
            />

            <link
              rel="icon"
              href={`${process.env.NEXT_PUBLIC_APP_CDN_URL}/b2cpages/favicon.ico`}
            />
            <link
              rel="canonical"
              href={
                canonicalUrl?.length > 0
                  ? canonicalUrl
                  : canonicalUrlServerSide ?? ''
              }
              key={'canonicalUrl'}
            />
          </Head>
          {process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true' ? (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_GOOGLE_PUBLISHER_ID}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          ) : (
            <></>
          )}
          <Script
            id="gtm-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_IDENTIFIER}');`,
            }}
          />
          <Script
            id="google-tag-manager_1"
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-16637799978"
          />
          <Script id="google-tag-manager_2" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-16637799978');gtag('event', 'conversion', {'send_to': 'AW-16637799978/xZaRCOShgcEZEKrcwv09'});`}
          </Script>
          {router.pathname === '/petromin-auth' || pageProps.hideLayout ? (
            <main className={loadTheme()}>
              <Component {...pageProps} />
              <ToastContainer limit={1} autoClose={2000} />
              <div id="app-message-box" />
            </main>
          ) : (
            <div className={loadTheme()}>
              {!pageProps.hideHeader && (
                <Header
                  careerEmail={careerEmail!}
                  socialMedia={socialMedia!}
                  phoneNumber={phoneNumber}
                />
              )}
              <main className="main">
                <Component {...pageProps} />
              </main>
              {/* <ChatBot /> */}

              {!pageProps.hideFooter &&
                (pageProps.showCampaignFooter ? (
                  <FooterCampaign
                    careerEmail={careerEmail!}
                    socialMedia={socialMedia!}
                    phoneNumber={phoneNumber}
                  />
                ) : (
                  <Footer
                    careerEmail={careerEmail!}
                    socialMedia={socialMedia!}
                    phoneNumber={phoneNumber}
                  />
                ))}

              <ToastContainer limit={1} autoClose={2000} />
              <div id="app-message-box" />
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_IDENTIFIER}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                ></iframe>
              </noscript>
            </div>
          )}
        </AppProvider>
      </CleverTapHOC>
    </StoreProvider>
  );
}
MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  const req = appContext?.ctx?.req;
  const canonicalUrl = req ? getCanonicalUrlServerSide(req) : '';

  return { ...appProps, canonicalUrlServerSide: canonicalUrl };
};
export default appWithTranslation(
  withApplicationInsights({
    instrumentationKey: process.env.NEXT_PUBLIC_INSTRUMENTATION_KEY,
    isEnabled: process.env.NEXT_PUBLIC_IS_LOCAL !== 'true',
  })(MyApp as any)
);

async function initializeClevertap(): Promise<CleverTap> {
  const clevertapModule = await import('clevertap-web-sdk');

  clevertapModule.default.init('TEST-9WW-7RR-9Z7Z');
  clevertapModule.default.privacy.push({ optOut: false });
  clevertapModule.default.privacy.push({ useIP: false });
  clevertapModule.default.setLogLevel(3);

  return clevertapModule.default;
}

const CleverTapHOC = ({ children }: { children: any }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    clevertapInit();
  }, []);

  const [clevertapModule, setClevertapModule] = useState<CleverTap | null>(
    null
  );

  const clevertapInit = async () => {
    let clevertap = clevertapModule;
    if (!clevertap) {
      clevertap = await initializeClevertap();

      dispatch(setCleverTap(clevertap));
    }
  };

  return children;
};
