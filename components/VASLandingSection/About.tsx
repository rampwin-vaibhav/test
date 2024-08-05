import { MediaPageSectionKeys } from '../../types/constants';
import { MediaPageSectionDetailsData } from '../../types/models';

type AboutPageProps = {
  sectionDetails: Array<MediaPageSectionDetailsData> | undefined;
};
const About = ({ sectionDetails }: AboutPageProps) => {
  const sectionData =
    sectionDetails && sectionDetails?.length > 0
      ? sectionDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.DetailsWarranty
        )
      : [];

  return (
    <>
      {sectionData && (
        <div className="text-left md:text-center pt-20 px-8 md:pt-20 bg-white">
          <p className="landing-page-title font-bold md:pt-16 pt-32">
            {sectionData[0]?.Title || ''}
          </p>
          <p className="text-large leading-normal pt-2 break-words w-full md:w-[50rem] mx-auto text-dark-gray3">
            {sectionData[0]?.SubTitle || ''}
          </p>
        </div>
      )}
    </>
  );
};

export default About;
