import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
  GetServerSideProps,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../../types/i18n.labels';

type BuyProps = {
  selectedMakeModels: any;
};

const OutletNewPage: NextPage<BuyProps> = ({
  selectedMakeModels,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation();
  const router = useRouter();

  const queryStr = router.asPath.split('?')[1];

  type RenderImagesProps = {
    imageSrc: string;
    text: string;
    onClick: () => {};
  };

  const RenderImages = ({ imageSrc, text, onClick }: RenderImagesProps) => {
    return (
      <div onClick={onClick} className="cursor-pointer">
        <picture className="relative flex items-center justify-center">
          <img src={imageSrc} alt="" className="h-[25rem] w-[28.81rem] " />
          <div className="absolute  text-center">
            <p className="font-bold text-white">{text}</p>
          </div>
        </picture>
      </div>
    );
  };

  return (
    <div className="">
      <div className="relative flex items-center justify-center">
        <picture>
          <img
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/search-banner.webp`}
            alt=""
            className="h-[25rem] w-full"
          />
        </picture>
        <div className=" absolute text-center text-white">
          <p className="font-bold text-7xl">
            {t(LabelConstants.PICK_YOUR_SELECTION)}
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-3 justify-evenly pt-7 mb-20 text-5xl">
        <RenderImages
          imageSrc={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/search-new-car.webp`}
          text={t(LabelConstants.NEW_CARS)}
          onClick={() => router.push('/newcars')}
        />

        <RenderImages
          imageSrc={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/search-outlet-car.webp`}
          text={t(LabelConstants.OUTLET_CARS)}
          onClick={() =>
            router.push(
              `/outlet-intro${
                queryStr
                  ? `?${queryStr}`
                  : selectedMakeModels && selectedMakeModels.length === 1
                  ? `/${selectedMakeModels[0]}`
                  : selectedMakeModels && selectedMakeModels.length > 1
                  ? `/${selectedMakeModels[0]}-${selectedMakeModels[1]}`
                  : ''
              }`
            )
          }
        />
        <RenderImages
          imageSrc={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/search-pre-owned-car.webp`}
          text={t(LabelConstants.PRE_OWNED_CARS)}
          onClick={() =>
            router.push(
              `/cars${
                queryStr
                  ? `?${queryStr}&carType=used-cars`
                  : selectedMakeModels && selectedMakeModels.length === 1
                  ? `/${selectedMakeModels[0]}?carType=used-cars`
                  : selectedMakeModels && selectedMakeModels.length > 1
                  ? `/${selectedMakeModels[0]}-${selectedMakeModels[1]}?carType=used-cars`
                  : '?carType=used-cars'
              }`
            )
          }
        />
      </div>
    </div>
  );
};
export default OutletNewPage;

export const getServerSideProps: GetServerSideProps<BuyProps> = async ({
  locale,
  params,
}: GetServerSidePropsContext) => {
  const { 'filter-params': filterParams } = params as {
    'filter-params'?: Array<string>;
  };
  let selectedMakeModels;
  if (filterParams && filterParams.length > 0 && filterParams.length <= 2) {
    const makeModels = filterParams[0];

    if (makeModels) {
      selectedMakeModels = makeModels.split('-');
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      selectedMakeModels: selectedMakeModels || null,
    },
  };
};
