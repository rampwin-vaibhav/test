import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import About from '../../../components/VASLandingSection/About';
import BannerSection from '../../../components/VASLandingSection/BannerSection';
import ContactDetailsSection from '../../../components/VASLandingSection/ContactDetailsSection';
import ProcessToBuy from '../../../components/VASLandingSection/ProcessToBuySection';
import ProductListing from '../../../components/VASLandingSection/ProductListing';
import Questions from '../../../components/VASLandingSection/QuestionsSection';
import Testimonials from '../../../components/VASLandingSection/Testimonials';
import WarrantyBanner from '../../../components/VASLandingSection/WarrantyBanner';
import BaseMobileCard from '../../../components/VASLandingSection/WarrantyFlow/components/BaseMobileCard';
import { SupportService } from '../../../helpers/services';
import { CommonUtils } from '../../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  rehydrateWarrantyState,
  WarrantyState,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import {
  AppTheme,
  MediaPageKey,
  WebsitePlatform,
} from '../../../types/constants';
import { Locales } from '../../../types/enums';
import { VASPageDetailsResponse } from '../../../types/models';
import MetaDataComponent from '../../../components/PagesMetaData/MetaDataComponent';

type GoGoProShieldProps = {
  title?: string;
  description?: string;
};

const GoGoProShield: NextPage<GoGoProShieldProps> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isWarrantyFlowOpen = useAppSelector(({ warranty }) => warranty.isOpen);

  const query = router.query;
  useEffect(() => {
    if (query.p) {
      const rehydratedData = CommonUtils.decodeB64<WarrantyState>(
        query.p as string
      );
      dispatch(rehydrateWarrantyState(rehydratedData));
    }
  }, [query, dispatch]);

  const [VASdetails, setVASDetails] = useState<VASPageDetailsResponse>();

  useEffect(() => {
    const initialLoad = async () => {
      const res = await SupportService.fetchVASDetails(
        MediaPageKey.WarrantyVAS,
        router.locale,
        isMobileOnly ? WebsitePlatform.Mobile : WebsitePlatform.Web
      );
      setVASDetails(res);
    };
    initialLoad();
  }, [router.locale]);

  return (
    <div className="gogo-home-page">
      <MetaDataComponent title={props.title} description={props.description} />
      <BannerSection
        mediaPageRibbonDetails={VASdetails?.MediaPageRibbonDetails}
        mediaPageArtifactDetails={VASdetails?.MediaPageArtifactDetails}
        mediaPageCTADetails={VASdetails?.MediaPageCTADetails}
        mediaPageSectionDetails={VASdetails?.MediaPageSectionDetails}
      />
      <About sectionDetails={VASdetails?.MediaPageSectionDetails} />
      <ProductListing
        imageDirection="right"
        sectionDetails={VASdetails?.MediaPageSectionDetails}
        listingPoints={VASdetails?.MediaPageListingPoints}
        artifactDetails={VASdetails?.MediaPageArtifactDetails}
      />
      <ProductListing
        imageDirection="left"
        sectionDetails={VASdetails?.MediaPageSectionDetails}
        listingPoints={VASdetails?.MediaPageListingPoints}
        artifactDetails={VASdetails?.MediaPageArtifactDetails}
      />
      <ProcessToBuy
        sectionDetails={VASdetails?.MediaPageSectionDetails}
        artifactDetails={VASdetails?.MediaPageArtifactDetails}
        processToBuyDetails={VASdetails?.MediaPageProcessToBuyDetails}
      />
      <Testimonials />
      <Questions sectionDetails={VASdetails?.MediaPageSectionDetails} />
      <ContactDetailsSection />
      <WarrantyBanner />
      {isWarrantyFlowOpen && <BaseMobileCard />}
    </div>
  );
};

export default GoGoProShield;
export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  const translations = await serverSideTranslations(locale || Locales.EN, [
    'common',
  ]);
  const title =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_TITLE_WARRANTY;
  const description =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_DESCRIPTION_WARRANTY;
  return {
    props: {
      ...translations,
      title,
      description,
      applyTheme: AppTheme.V1,
    },
  };
};
