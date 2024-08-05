import { MediaPageSectionKeys } from '../../types/constants';
import {
  MediaPageSectionDetailsData,
  MediaPageArtifactDetailsData,
  MediaPageProcessToBuyDetailsData,
} from '../../types/models';

type ProcessToBuyProps = {
  sectionDetails: Array<MediaPageSectionDetailsData> | undefined;
  artifactDetails: Array<MediaPageArtifactDetailsData> | undefined;
  processToBuyDetails: Array<MediaPageProcessToBuyDetailsData> | undefined;
};
const ProcessToBuy = ({
  sectionDetails,
  artifactDetails,
  processToBuyDetails,
}: ProcessToBuyProps) => {
  const sectionData =
    sectionDetails && sectionDetails?.length > 0
      ? sectionDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.ProcessToBuyWarranty
        )
      : [];

  const processToBuyData =
    processToBuyDetails && processToBuyDetails?.length > 0
      ? processToBuyDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.ProcessToBuyWarranty
        )
      : [];

  return (
    <>
      {processToBuyData?.length > 0 && (
        <div className="w-full p-8 md:p-0 flex flex-col md:justify-center md:items-center bg-gradient-to-r from-[#F6D5F7] to-[#FBE9D7] mt-10 md:mt-20 mx-auto">
          <h1 className="landing-page-title font-bold py-8 md:py-16">
            {sectionData[0]?.Title || ''}
          </h1>
          <div className="flex flex-col md:flex-row justify-between pb-16 gap-6 md:gap-0 w-full md:w-[90%] lg:w-[80%]">
            {processToBuyData?.length > 0 &&
              processToBuyData?.map((data, index) => {
                return (
                  <div className="flex gap-8" key={index}>
                    <div className="relative">
                      <picture>
                        <img
                          src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/${data?.ImageUrl}`}
                          alt="gogo motor"
                          className="aspect-[960/427] object-cover w-[8rem] h-[8rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[2rem]"
                        />
                      </picture>
                      <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
                        0{index + 1}
                      </div>
                    </div>
                    <div className="w-72">
                      <p className="text-2xl font-semibold tracking-wide">
                        {data?.Header}
                      </p>
                      <p className="pt-2 ltr:pr-4 rtl:pl-4 text-xl">
                        {data?.Description || ''}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessToBuy;
