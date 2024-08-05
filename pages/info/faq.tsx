import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';
import parse from 'html-react-parser';
import { SupportService } from '../../helpers/services';
import { faqList, FAQResponse } from '../../types/models';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import SearchFAQ from '../../components/common/FAQSearch';

type FAQPageProps = {
  faqs: Array<FAQResponse>;
};

const FAQPage: NextPage<FAQPageProps> = ({
  faqs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const [faqId, setFaqId] = useState<number | undefined>();

  //This is used to get FAQCategoryId for selected question
  const openFaq =
    faqId &&
    faqs.filter((x) => x.FAQList.find((y) => y.FAQId === faqId))[0]
      .FAQCategoryId;

  const arrFAQ = faqs.map((x) =>
    x.FAQList.map((itm) => {
      return {
        key: itm.FAQId,
        value: itm.Question,
      };
    })
  );

  //This function is used to create single array for all question
  function faqArrList(arr: any) {
    return arr.reduce(function (flat: Array<faqList>, toFlatten: faqList) {
      return flat.concat(
        Array.isArray(toFlatten) ? faqArrList(toFlatten) : toFlatten
      );
    }, []);
  }

  return (
    <PrivatePageLayout title={t(LabelConstants.FAQ)}>
      <div className="gogo-faq-page">
        <SearchFAQ FAQList={faqArrList(arrFAQ)} setFaqId={setFaqId} />
        <div className="para-section mt-12">
          {faqs.map((item) => (
            <div className="w-full" key={item.FAQCategoryId}>
              <details className="mb-4" open={item.FAQCategoryId === openFaq}>
                <summary className="bg-lighter-gray text-dark-gray1 rounded-md py-3 px-4 cursor-pointer w-full font-bold">
                  <span className="px-2">{item.FAQCategory}</span>
                </summary>
                <div className="sm:mx-auto sm:mb-2 -mx-2 p-4">
                  <div className="flex flex-col gap-3">
                    {item.FAQList.map((list) => (
                      <Fragment key={list.FAQId}>
                        <details
                          id={`${list.FAQId}`}
                          open={list.FAQId === faqId}
                        >
                          <summary className="font-normal text-dark-gray1 rounded-md py-2 px-4 cursor-pointer">
                            <span className="px-2">{list.Question}</span>
                          </summary>
                          <div className="ml-3 text-dark-gray2">
                            {list.IsHTML ? parse(list.Answer) : list.Answer}
                          </div>
                        </details>
                        <hr className="mx-4" />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </PrivatePageLayout>
  );
};
export default FAQPage;

export const getStaticProps: GetStaticProps<FAQPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const res: Array<FAQResponse> = await SupportService.getFAQs(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      faqs: res,
    },
    revalidate: 86400, // Revalidate every 1 Day
  };
};
