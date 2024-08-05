import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import React from 'react';
import { Locales } from '../types/enums';
import { LabelConstants } from '../types/i18n.labels';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-lighter-gray">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="text-8xl font-bold">
          {t(LabelConstants.PAGE_NOT_FOUND_LABEL)}
        </div>
        <div className="text-2xl px-10 lg:px-0 font-bold md:w-[60%] text-center">
          {t(LabelConstants.PAGE_NOT_FOUND)}
          <Link href="/">
            <a className="hover:underline text-primary cursor-pointer">
              {` ${t(LabelConstants.BACK_TO_HOME)}.`}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
