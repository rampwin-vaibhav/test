import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';
import { useRouter } from 'next/router';

const ComingSoon = () => {
  const router = useRouter();

  return (
    <div className="min-page-height flex justify-center items-center bg-gradient-to-r from-[#F8F8F8] to-[#D1D3D4]">
      <picture>
        <source
          srcSet={`${
            process.env.NEXT_PUBLIC_Image_CDN_URL
          }/CMS/Common/coming-soon-${router.locale?.toLowerCase()}.webp`}
        />
        <img
          src={`${
            process.env.NEXT_PUBLIC_Image_CDN_URL
          }/CMS/Common/coming-soon-${router.locale?.toLowerCase()}.webp`}
          alt="campaign-image"
          className="max-w-[52.75rem] max-h-[52.75rem] w-full"
        />
      </picture>
    </div>
  );
};

export default ComingSoon;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
