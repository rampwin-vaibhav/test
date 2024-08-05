import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import parse from 'html-react-parser';
import { GlobalService } from '../../helpers/services';
import { PrivacyResponse } from '../../types/models';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';

const PrivacyPage: NextPage<{ privacyPolicyData: PrivacyResponse }> = ({
  privacyPolicyData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <PrivatePageLayout title={t(LabelConstants.PRIVACY_POLICY)}>
      <div className="gogo-privacy-page">
        <span className="para-info">
          {privacyPolicyData && parse(privacyPolicyData.PrivacyPolicies[0])}
        </span>
      </div>
    </PrivatePageLayout>
  );
};
export default PrivacyPage;

export const getStaticProps: GetStaticProps<{
  privacyPolicyData: PrivacyResponse;
}> = async ({ locale }: GetStaticPropsContext) => {
  const res = await GlobalService.fetchPrivacyPolicy(locale);
  return {
    props: {
      privacyPolicyData: res,
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
    revalidate: 86400, // Revalidate every 1 Day
  };
};
