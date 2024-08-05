import { useEffect, useState } from 'react';
import { FAQResponse, MediaPageSectionDetailsData } from '../../types/models';
import { MediaPageSectionKeys } from '../../types/constants';
import { SupportService } from '../../helpers/services';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

type QuestionsProps = {
  sectionDetails: Array<MediaPageSectionDetailsData> | undefined;
};
const Questions = ({ sectionDetails }: QuestionsProps) => {
  const router = useRouter();
  const [faqs, setFaqs] = useState<Array<FAQResponse>>([]);
  const [expand, setExpand] = useState<number | undefined>();

  const toggleOpen = (faqId: number) => {
    faqs[0].FAQList.map((faq) => {
      if (faq.FAQId == faqId) {
        faq.expand = !faq.expand;
      }
    });
    let randomNum = Math.floor(Math.random() * 100) + 1;
    setExpand(randomNum);
    setFaqs(faqs);
  };
  useEffect(() => {
    const initialLoad = async () => {
      const res: Array<FAQResponse> = await SupportService.getFAQs(
        router.locale,
        true
      );
      res[0]?.FAQList.map((faq, index) =>
        index !== 0 ? (faq.expand = false) : (faq.expand = true)
      );
      setFaqs(res);
    };
    initialLoad();
  }, [router]);

  const sectionData =
    sectionDetails && sectionDetails?.length > 0
      ? sectionDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.FAQWarranty
        )
      : [];

  return (
    <div className="px-4 md:px-0 md:mx-auto py-16 flex flex-col justify-center items-center">
      <h1 className="text-left md:text-center landing-page-title font-bold pb-8 md:pb-12">
        {sectionData[0]?.Title || ''}
      </h1>
      <div className="w-full md:w-3/4 lg:w-2/4 flex flex-col justify-center">
        {faqs[0]?.FAQList?.map((item, index) => {
          return (
            <div className="border-b border-gray-200 py-4" key={index}>
              <button
                onClick={() => toggleOpen(item.FAQId)}
                className="flex justify-between items-center w-full text-left gap-4"
              >
                <span className="text-2xl text-dark-gray3 font-semibold tracking-wide">
                  {item?.Question}
                </span>
                <span className="text-3xl text-primary">
                  {item.expand ? '-' : '+'}
                </span>
              </button>
              {item.expand && (
                <div className="mt-2 text-dark-gray3 text-xl tracking-wide leading-snug ltr:pr-6 rtl:pl-6">
                  {item.IsHTML ? parse(item.Answer) : item.Answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
