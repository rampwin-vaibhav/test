import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isMobileOnly } from 'react-device-detect';
import { Locales } from '../types/enums';
import BannerSection from '../components/VASLandingSection/BannerSection';
import ProductListing from '../components/VASLandingSection/ProductListing';
import ProcessToBuy from '../components/VASLandingSection/ProcessToBuySection';
import Questions from '../components/VASLandingSection/QuestionsSection';
import Testimonials from '../components/VASLandingSection/Testimonials';
import About from '../components/VASLandingSection/About';
import ContactDetailsSection from '../components/VASLandingSection/ContactDetailsSection';
import { SupportService } from '../helpers/services';
import { VASPageDetailsResponse } from '../types/models';
import { WebsitePlatform, MediaPageKey } from '../types/constants';

type GoGoProShieldProps = {};

const GoGoProShield: NextPage<
  GoGoProShieldProps
> = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
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
  }, [router]);

  return (
    <div className="gogo-home-page">
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
    </div>
  );
};

export default GoGoProShield;
export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
