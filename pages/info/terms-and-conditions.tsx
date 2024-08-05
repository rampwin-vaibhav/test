import type {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next';
import { useTranslation } from 'next-i18next';
import parse from 'html-react-parser';
import { GlobalService } from '../../helpers/services';
import { TermsAndConditions } from '../../types/models';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';

type TermsAndConditionsPageProps = {
  termsAndConditions: TermsAndConditions;
};

const TermsAndConditionsPage: NextPage<TermsAndConditionsPageProps> = ({
  termsAndConditions,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <PrivatePageLayout title={t(LabelConstants.TERMS_CONDITIONS)}>
      <div className="gogo-terms-page">
        <div className="para-section po-terms">
          <span className="para-info">
            {termsAndConditions && parse(termsAndConditions.TermConditions[0])}
          </span>
        </div>
      </div>
    </PrivatePageLayout>
  );
};
export default TermsAndConditionsPage;

export const getStaticProps: GetStaticProps<
  TermsAndConditionsPageProps
> = async ({ locale }: GetStaticPropsContext) => {
  const termsAndConditions = await GlobalService.fetchTermsAndConditions(
    locale
  );
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      termsAndConditions,
    },
    revalidate: 86400, // Revalidate every 1 Day
  };
};
