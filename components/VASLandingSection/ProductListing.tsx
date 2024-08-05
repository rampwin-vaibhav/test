import { MediaPageSectionKeys } from '../../types/constants';
import {
  MediaPageSectionDetailsData,
  MediaPageListingPointsData,
  MediaPageArtifactDetailsData,
} from '../../types/models';
import { TickIconWithCircle } from '../icons/TickIconWithCircle';

type ProductListingProps = {
  imageDirection: string;
  sectionDetails: Array<MediaPageSectionDetailsData> | undefined;
  listingPoints: Array<MediaPageListingPointsData> | undefined;
  artifactDetails: Array<MediaPageArtifactDetailsData> | undefined;
};
const ProductListing = ({
  imageDirection,
  sectionDetails,
  listingPoints,
  artifactDetails,
}: ProductListingProps) => {
  const sectionDataBenefits =
    sectionDetails && sectionDetails?.length > 0
      ? sectionDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.BenefitsWarranty
        )
      : [];

  const listingPointsBenefits =
    listingPoints && listingPoints?.length > 0
      ? listingPoints?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.BenefitsWarranty
        )
      : [];

  const artifactDetailsBenefits =
    artifactDetails && artifactDetails?.length > 0
      ? artifactDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.BenefitsWarranty
        )
      : [];

  const sectionDataEligibleCriteria =
    sectionDetails && sectionDetails?.length > 0
      ? sectionDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.EligibleCriteriaWarranty
        )
      : [];

  const listingPointsEligibleCriteria =
    listingPoints && listingPoints?.length > 0
      ? listingPoints?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.EligibleCriteriaWarranty
        )
      : [];

  const artifactDetailsEligibleCriteria =
    artifactDetails && artifactDetails?.length > 0
      ? artifactDetails?.filter(
          (itm) =>
            itm?.MediaPageSectionKey?.trim() ===
            MediaPageSectionKeys.EligibleCriteriaWarranty
        )
      : [];

  return (
    <>
      {imageDirection?.toLowerCase() == 'right' ? (
        <div className="w-full md:w-4/5 px-6 md:px-0 flex flex-col md:flex-row justify-center md:pt-10 mx-auto gap-12">
          <div className="w-full hidden md:block pl-0 md:p-4 lg:p-16 md:w-1/2">
            <p className="text-3xl font-bold">
              {sectionDataBenefits[0]?.Title || ''}
            </p>
            {listingPointsBenefits?.length > 0 && (
              <div className="pt-8">
                {listingPointsBenefits.map((item, index) => {
                  return (
                    <div className="flex items-center pb-4" key={index}>
                      <div className="w-[1.2rem] h-[1.2rem] flex items-center justify-center">
                        <TickIconWithCircle className="w-6 h-6" />
                      </div>
                      <p className="text-dark-gray3 ltr:pl-4 rtl:pr-4 text-[1.5rem] tracking-wide font-semibold w-full">
                        {item?.Description || ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {artifactDetailsBenefits[0]?.URL && (
            <div className="w-full pt-12 block md:hidden md:w-1/2">
              <picture>
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/${artifactDetailsBenefits[0]?.URL}`}
                  alt="gogo motor"
                  className="aspect-[960/427] object-cover w-[43rem] h-[26rem] rounded-[2rem]"
                />
              </picture>
            </div>
          )}

          {artifactDetailsBenefits[0]?.URL && (
            <div className="w-full hidden md:block md:w-1/2">
              <picture>
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/${artifactDetailsBenefits[0]?.URL}`}
                  alt="gogo motor"
                  className="aspect-[960/427] object-cover w-[40rem] h-[28rem] rounded-[2rem]"
                />
              </picture>
            </div>
          )}
          <div className="w-full block md:hidden md:w-1/2">
            <p className="text-3xl font-bold">
              {sectionDataBenefits[0]?.Title || ''}
            </p>
            {listingPointsBenefits?.length > 0 && (
              <div className="pt-8">
                {listingPointsBenefits.map((item, index) => {
                  return (
                    <div className="flex items-center pb-4" key={index}>
                      <div className="w-[1.2rem] h-[1.2rem] flex items-center justify-center">
                        <TickIconWithCircle className="w-6 h-6" />
                      </div>
                      <p className="text-dark-gray3 text-xl ltr:pl-4 rtl:pr-4 font-semibold tracking-wide">
                        {item?.Description || ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full md:w-4/5 px-6 md:px-0 flex flex-col md:flex-row justify-center pt-10 mx-auto gap-12">
          {artifactDetailsEligibleCriteria[0]?.URL && (
            <div className="w-full md:w-1/2">
              <picture>
                <img
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/${artifactDetailsEligibleCriteria[0]?.URL}`}
                  alt="gogo motor"
                  className="aspect-[960/427] object-cover w-[43rem] h-[26rem] rounded-[2rem]"
                />
              </picture>
            </div>
          )}
          <div className="w-full md:w-1/2">
            <p className="text-3xl font-bold pl-0 md:pl-4 lg:pl-16 md:pt-8">
              {sectionDataEligibleCriteria[0]?.Title || ''}
            </p>
            {listingPointsEligibleCriteria?.length > 0 && (
              <div className="pl-0 md:pl-4 lg:pl-16 pt-8">
                {listingPointsEligibleCriteria.map((item, index) => {
                  return (
                    <div className="flex items-center pb-4" key={index}>
                      <div className="w-[1.2rem] h-[1.2rem] flex items-center justify-center">
                        <TickIconWithCircle className="w-6 h-6" />
                      </div>
                      <p className="text-dark-gray3 text-[1.5rem] ltr:pl-4 rtl:pr-4 font-semibold tracking-wide w-full">
                        {item?.Description || ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductListing;
