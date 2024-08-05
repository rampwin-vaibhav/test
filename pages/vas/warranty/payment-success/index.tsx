import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CircleSuccessIcon } from '../../../../components/icons';
import { InvoiceService } from '../../../../helpers/services';

const PaymentSuccessVas = () => {
  const router = useRouter();
  const params = router.query;

  useEffect(() => {
    const invoiceId = Buffer.from(`${params.id}`, 'base64').toString('ascii');
    const initialLoad = async () => {
      const data = await InvoiceService.getPaymentStatus(
        parseInt(invoiceId, 10),
        router.locale
      );
      console.log(data);
    };
    initialLoad();
  }, [params.id, router.locale]);
  return (
    <div className="bg-white theme-v1">
      <div className="w-full h-[311px] bg-[linear-gradient(104.66deg,#FFFFFF_13.45%,rgba(215,224,255,0.5)_44.67%,rgba(214,75,226,0.1)_95.57%)]">
        <div className="flex items-center justify-center gap-3 flex-col pt-8">
          <svg
            width="69"
            height="69"
            viewBox="0 0 69 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="34.5" cy="34.5" r="21.5" fill="#4C0055" />
            <path
              d="M25.6543 35.1507L31.1165 40.6126L43.3404 28.3887"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="34.5" cy="34.5" r="21.5" fill="#038700" />
            <circle
              cx="34.5"
              cy="34.5"
              r="28"
              stroke="#038700"
              strokeOpacity="0.26"
              strokeWidth="13"
            />
            <path
              d="M25.6582 35.1487L31.1204 40.6106L43.3443 28.3867"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <p className="font-semibold text-[18px] sm:text-[28px]">
            We have received your payment
          </p>
          <div className="relative flex flex-col mt-4 gap-2 w-[299px] sm:w-[340px] h-auto p-6 bg-white border border-black/10 rounded-[8px] text-center ">
            <span className="text-[12px] absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[5px] font-medium text-white bg-[#FFA500] px-[8px] py-[4px] ">
              Inspection Pending
            </span>
            <h1 className="text-[18px] font-semibold text-[#272828] ">
              Platinum Plan
            </h1>
            <p className="text-[12px] text-[#A0A0A0] font-normal ">
              24 Months Or 50,000 Kms
            </p>
            <div className="flex items-center gap-2 justify-center my-4">
              <p className="text-[15px] font-medium text-[#272828] ">
                SAR 6150.50
              </p>
              <div className="bg-[#038700] text-[10px] font-normal text-white flex items-center gap-0.5 px-1.5 rounded-full">
                <CircleSuccessIcon className="w-[9px] h-[6px] " />
                Paid
              </div>
            </div>
            <button
              onClick={() => router.push('/')}
              className="w-full h-[48px] bg-black text-[13px] font-semibold mx-auto flex items-center justify-center gap-2 text-white rounded-[40px]"
            >
              Go to Home Page
              <svg
                width="7"
                height="10"
                viewBox="0 0 7 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.125 1L5.48546 5L1.125 9" stroke="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-center justify-center p-8 mt-[80px]">
        <h2 className="text-2xl font-semibold mb-8">Next steps</h2>
        <div className="flex flex-col sm:flex-row space-x-0 sm:-space-x-24">
          <div className="flex flex-row sm:flex-col gap-3 items-start sm:items-center">
            <div className="mb-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7493 1.83398H5.49935C5.01312 1.83398 4.5468 2.02714 4.20299 2.37096C3.85917 2.71477 3.66602 3.18109 3.66602 3.66732V18.334C3.66602 18.8202 3.85917 19.2865 4.20299 19.6303C4.5468 19.9742 5.01312 20.1673 5.49935 20.1673H16.4993C16.9856 20.1673 17.4519 19.9742 17.7957 19.6303C18.1395 19.2865 18.3327 18.8202 18.3327 18.334V6.41732L13.7493 1.83398Z"
                  fill="#FFDD9F"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.834 1.83398V5.50065C12.834 5.98688 13.0271 6.4532 13.371 6.79701C13.7148 7.14083 14.1811 7.33398 14.6673 7.33398H18.334"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 13.7493L10.0833 15.5827L13.75 11.916"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-left sm:text-center">
              <h3 className="text-[18px] text-[#272828] font-medium">
                Document verification
              </h3>
              <p className="text-left sm:text-center text-[#656565] text-[13px] font-normal w-[252px] ">
                The inspector will complete the warranty inspection form.
              </p>
            </div>
          </div>

          <div>
            <svg
              width="268"
              height="1"
              viewBox="0 0 268 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-3 hidden sm:block"
            >
              <line
                x1="267.5"
                y1="0.5"
                x2="0.5"
                y2="0.5"
                stroke="#BCBCBC"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
            </svg>

            <svg
              width="1"
              height="76"
              viewBox="0 0 1 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block sm:hidden -mt-14 mb-1 ml-3"
            >
              <line
                x1="1"
                y1="0.5"
                x2="1"
                y2="75.5"
                stroke="#BCBCBC"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          <div className="flex flex-row sm:flex-col gap-3 items-start sm:items-center">
            <div className="mb-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3327 12.5291C18.3327 17.1124 15.1243 19.4041 11.311 20.7332C11.1113 20.8009 10.8944 20.7977 10.6968 20.7241C6.87435 19.4041 3.66602 17.1124 3.66602 12.5291V6.11239C3.66602 5.86928 3.76259 5.63612 3.9345 5.46421C4.10641 5.2923 4.33957 5.19572 4.58268 5.19572C6.41602 5.19572 8.70768 4.09572 10.3027 2.70239C10.4969 2.53647 10.7439 2.44531 10.9993 2.44531C11.2548 2.44531 11.5018 2.53647 11.696 2.70239C13.3002 4.10489 15.5827 5.19572 17.416 5.19572C17.6591 5.19572 17.8923 5.2923 18.0642 5.46421C18.2361 5.63612 18.3327 5.86928 18.3327 6.11239V12.5291Z"
                  fill="#FFDD9F"
                />
                <path
                  d="M18.3327 11.9158C18.3327 16.4991 15.1243 18.7908 11.311 20.1199C11.1113 20.1876 10.8944 20.1844 10.6968 20.1108C6.87435 18.7908 3.66602 16.4991 3.66602 11.9158V5.49911C3.66602 5.256 3.76259 5.02284 3.9345 4.85093C4.10641 4.67902 4.33957 4.58244 4.58268 4.58244C6.41602 4.58244 8.70768 3.48244 10.3027 2.08911C10.4969 1.92319 10.7439 1.83203 10.9993 1.83203C11.2548 1.83203 11.5018 1.92319 11.696 2.08911C13.3002 3.49161 15.5827 4.58244 17.416 4.58244C17.6591 4.58244 17.8923 4.67902 18.0642 4.85093C18.2361 5.02284 18.3327 5.256 18.3327 5.49911V11.9158Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 10.9993L10.0833 12.8327L13.75 9.16602"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-left sm:text-center">
              <h3 className="text-[18px] text-[#272828] font-medium">
                Warranty approval
              </h3>
              <p className="text-[#656565] text-[13px] font-normal w-[252px]">
                Our team will inspect the vehicle and share the status within 48
                hours.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-center justify-center w-full sm:w-[533px] sm:h-[220px] mx-auto my-8 p-8 bg-white sm:pt-8 sm:border sm:border-solid sm:border-black/10 sm:rounded-[8px]">
        <div className="border-t border-dashed border-[#ACACAC] w-full -mt-8 mb-16 sm:hidden"></div>
        <h2 className="text-[18px] sm:text-[20px] font-semibold mb-8 text-[#272828]">
          If vehicle inspection is rejected?
        </h2>
        <div className="flex flex-col sm:flex-row gap-[30px] sm:gap-0 space-x-0 sm:space-x-8">
          <div className="flex flex-row sm:flex-col gap-[11px] sm:gap-0 items-start sm:items-center sm:w-[200px] ">
            <div className="mb-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.66602 9.16732C3.66602 5.13398 6.96602 1.83398 10.9993 1.83398C15.0327 1.83398 18.3327 5.13398 18.3327 9.16732C18.3327 13.2007 15.0327 16.5007 10.9993 16.5007H3.66602"
                  stroke="#272828"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.33268 20.1673L3.66602 16.5007L7.33268 12.834"
                  stroke="#272828"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-left sm:text-center">
              <h3 className="text-[15px] sm:text-[18px] text-[#272828] font-medium">
                Refund Process
              </h3>
              <p className="text-left sm:text-center text-[13px] font-normal text-[#656565]">
                You will receive the refund within 3-4 working days.
              </p>
            </div>
          </div>
          <div className="border-l border-gray-200"></div>
          <div className="flex flex-row sm:flex-col gap-[11px] sm:gap-0 items-start sm:items-center sm:w-[220px]">
            <div className="mb-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.725 2.75H4.58333C4.0971 2.75 3.63079 2.94315 3.28697 3.28697C2.94315 3.63079 2.75 4.0971 2.75 4.58333V19.25L6.41667 15.5833H17.4167C17.9029 15.5833 18.3692 15.3902 18.713 15.0464C19.0568 14.7025 19.25 14.2362 19.25 13.75V11.275"
                  stroke="#272828"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 8.25C18.0188 8.25 19.25 7.01878 19.25 5.5C19.25 3.98122 18.0188 2.75 16.5 2.75C14.9812 2.75 13.75 3.98122 13.75 5.5C13.75 7.01878 14.9812 8.25 16.5 8.25Z"
                  stroke="#272828"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-left sm:text-center">
              <h3 className="text-[18px] text-[#272828] font-medium">
                Notification
              </h3>
              <p className="text-left sm:text-center text-[13px] font-normal text-[#656565]">
                You will receive an email notification if your vehicle is
                rejected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessVas;
