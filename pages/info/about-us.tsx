import type {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next';
import { useTranslation } from 'next-i18next';
import parse from 'html-react-parser';
import { GlobalService } from '../../helpers/services';
import { AboutUsResponse } from '../../types/models';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import MetaDataComponent from '../../components/PagesMetaData/MetaDataComponent';

const AboutUs: NextPage<{
  aboutUsData: AboutUsResponse;
  title: any;
  description: any;
}> = ({
  aboutUsData,
  title,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <>
      <MetaDataComponent title={title} description={description} />
      <PrivatePageLayout title={t(LabelConstants.ABOUT_US)}>
        <div className="gogo-privacy-page">
          <span className="para-info">
            {aboutUsData && parse(aboutUsData.AboutUsData[0])}
          </span>
        </div>
      </PrivatePageLayout>
    </>
  );
};

export default AboutUs;

export const getStaticProps: GetStaticProps<{
  aboutUsData: AboutUsResponse;
  title: any;
  description: any;
}> = async ({ locale }: GetStaticPropsContext) => {
  const res = await GlobalService.fetchAboutUs(locale);
  const translations = await serverSideTranslations(locale || Locales.EN, [
    'common',
  ]);
  const title =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_TITLE_ABOUT_US;
  const description =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_DESCRIPTION_ABOUT_US;
  return {
    props: {
      ...translations,
      title,
      description,
      aboutUsData: res,
    },
    revalidate: 86400, // Revalidate every 1 Day
  };
};
