import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { LabelConstants } from '../../../types/i18n.labels';
import { faqList } from '../../../types/models';
import { SearchIcon } from '../../icons';
type FaqSearchProps = {
  FAQList: Array<faqList>;
  setFaqId: (value: SetStateAction<number | undefined>) => void;
};

const SearchFAQ = (props: FaqSearchProps) => {
  const { t } = useTranslation();
  const faqRef = useRef<HTMLDivElement>(null);
  const [faqQuestions, setFaqQuestions] = useState<Array<faqList>>([]);
  const [faqValue, setFaqValue] = useState<string>();

  //detect id click outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setFaqQuestions([]);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const getPredictionMake = (values: string) => {
    return props.FAQList.filter(
      (item: faqList, index) =>
        item.value.toLowerCase().indexOf(values.toLowerCase()) !== -1
    );
  };

  // This function is used to handle selected FAQ question
  const handleFaq = (value: string) => {
    if (value.length > 0) {
      const predictions = getPredictionMake(value);
      setFaqQuestions(predictions);
    } else {
      setFaqQuestions([]);
    }
  };
  return (
    <div ref={faqRef} className="relative">
      <div className="flex items-center justify-center rounded-t-md border border-lighter-gray w-full !h-[3.5rem]">
        <div className="pl-[10px] pr-[13px] rtl:pl-[15px] rtl:pr-[30px]">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          className="h-full px-0 border-none text-lg leading-7"
          placeholder={t(LabelConstants.SEARCH)}
          value={faqValue}
          onChange={(e) => {
            handleFaq(e.target.value);
            setFaqValue(e.target.value);
          }}
          onFocus={() => setFaqQuestions(props.FAQList)}
          autoComplete="off"
        />
      </div>
      {faqQuestions.length > 0 && (
        <div className="absolute bot-0 z-10 bg-white w-full flex flex-col gap-2 h-auto max-h-[18rem] rounded-b-md overflow-y-auto border border-lighter-gray">
          {faqQuestions.map((item: faqList, index) => (
            <>
              <Link href={`/info/faq#${item.key}`} key={index + item.key}>
                <div
                  className="cursor-pointer text-lg border-b border-lighter-gray min-h-[3.25rem] px-3 flex items-center"
                  onClick={() => {
                    setFaqValue(item.value);
                    setFaqQuestions([]);
                    props.setFaqId(item.key);
                  }}
                >
                  <span className="text-base">{item.value}</span>
                </div>
              </Link>
            </>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchFAQ;
