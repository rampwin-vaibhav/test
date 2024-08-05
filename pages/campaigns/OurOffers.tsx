import { useTranslation } from 'next-i18next';
import { TickIconWithCircle } from '../../components/icons/TickIconWithCircle';

type Props = {
  carOffers: [];
};

const OurOffers = ({ carOffers }: Props) => {
  const { t } = useTranslation();
  return (
    <section className="max-w-[1152px] mx-auto px-[20px]">
      <div>
        <div className="hedStyle mb-4 text-primary">
          <h2 className="font-bold text-[40px]">
            {t('CAMPAIGN_PAGE.OFFERS_TITLE')}
          </h2>
          <p className="text-[20px]">{t('CAMPAIGN_PAGE.OFFERS_SUB_TITLE')}</p>
        </div>

        <div className="flex flex-col w-full gap-6 my-[32px]">
          {carOffers.map((eachCar: any) => (
            <CarCard key={eachCar.car.title} car={eachCar.car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurOffers;

const CarCard = ({ car }: { car: any }) => {
  return (
    <div
      className="w-full mx-auto bg-white rounded-xl overflow-hidden p-[1rem]"
      style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex items-center justify-center md:flex-shrink-0 w-full md:w-[200px] object-contain bg-[#EDEDED] rounded-md">
            <picture>
              <img
                className="h-auto w-full object-cover md:h-full md:w-48"
                src={car.image}
                alt={car.title}
              />
            </picture>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full pb-[16px] border-b border-b-[#E6E6E6]">
              <div className="uppercase tracking-wide text-[20px] md:text-[24px] text-black font-bold">
                {car.title}
              </div>
              <div>
                <picture>
                  <img
                    src={car.bankLogo}
                    alt="Bank Logo"
                    className="w-[85px] h-[31px] mx-auto md:mx-0"
                  />
                </picture>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-900 py-[40px] text-[20px] font-bold">
                {car.features.map((eachFeature: any, index: number) => (
                  <li className="flex items-center gap-4" key={index}>
                    <TickIconWithCircle className="!bg-gradient !h-6 !w-6" />
                    <span>{eachFeature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-2">
                  <div className="text-[25px] text-black font-bold">
                    {car.price.currency}
                  </div>
                  <p className="text-[58px] font-bold text-gradient pb-0 mb-0">
                    {car.price.amount}
                  </p>
                </div>
                <p className="text-lg text-black text-[16px] font-bold">
                  {car.price.duration}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[9px] text-[#8c8c8c] mt-[12px] text-end">
          {car.note}
        </p>
      </div>
    </div>
  );
};

{
  /* <div className="p-8 flex-1">
          <div className="mt-1">
            <ul className="grid grid-cols-2 gap-4 text-lg text-purple-900">
              <li className="flex items-center space-x-2">
                <span className="text-orange-400">✓</span>
                <span>0% Down Payment</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-orange-400">✓</span>
                <span>5 Year Roadside Assistance</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-orange-400">✓</span>
                <span>0% Admin Fee</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-orange-400">✓</span>
                <span>Quick Approval Process</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 flex items-baseline">
            <div className="text-3xl text-orange-600">SAR</div>
            <div className="text-5xl font-bold text-orange-600 ml-2">717</div>
            <div className="text-lg text-black ml-2">MONTHLY</div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Monthly installment is calculated based on the entry trim, 2.7%
            average insurance and average 4.77% APR.
          </div>
        </div> */
}
