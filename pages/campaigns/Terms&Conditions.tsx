import { useTranslation } from 'next-i18next';

type Props = {};

const TermsAndConditions = (props: Props) => {
  const { t } = useTranslation();
  return (
    <section className="max-w-[1152px] mx-auto my-[40px] px-[20px]">
      <h2 className="text-primary mb-[20px] text-[20px] font-bold">
        {t('CAMPAIGN_PAGE.OFFER_TERMS_CONDITION')}
      </h2>
      <ul className="text-[#818181] text-[16px] text !list-disc px-[25px]">
        {[...Array(9)].map((_echTerm, index) => (
          <li key={index}>
            {t(`CAMPAIGN_PAGE.ADDITIONAL_TERMS.TERM_${index + 1}`)}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TermsAndConditions;
