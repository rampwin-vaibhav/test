import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { CircleSuccessIcon } from '../../components/icons';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const FinanceSuccessPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="container lg:!px-52 w-full h-full">
      <div className="flex flex-col gap-9 mt-14  items-center justify-center">
        <div className="flex flex-col gap-5 items-center justify-center">
          <CircleSuccessIcon className="md:w-[5rem] w-[4rem] md:h-[5rem] h-[4rem]" />
          <span className="font-bold text-[2.5rem] text-center w-[28.875rem] text-primary">
            {t(LabelConstants.THANK_YOU_FINANCE_IT)}
          </span>
        </div>
        <div className="flex text-2xl w-[47rem] font-normal text-center flex-col gap-5 items-center justify-center">
          <span>{t(LabelConstants.FINANCE_IT_SUCCESS_MSG)}</span>
          <span>{t(LabelConstants.FINANCE_IT_SUCCESS_INFO_MSG)}</span>
        </div>
        <div>
          <button
            className="btn btn-primary uppercase"
            onClick={() => router.push('/my-orders')}
          >
            {t(LabelConstants.SHOW_MY_ORDERS_BUTTON)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceSuccessPage;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
