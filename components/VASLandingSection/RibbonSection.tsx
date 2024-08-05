import { useRouter } from 'next/router';
import { Locales } from '../../types/enums';
import { MediaPageRibbonDetailsData } from '../../types/models';
import Aeme from '../icons/Aeme';
import Bank from '../icons/Bank';
import Transfer from '../icons/Transfer';
import Warranty from '../icons/Warranty';

type RibbonDetailsProps = {
  mediaPageRibbonDetails?: Array<MediaPageRibbonDetailsData>;
};

const icons = [
  <Bank key={1} />,
  <Transfer key={1} />,
  <Aeme key={1} />,
  <Warranty key={1} />,
];
const RibbonSection = ({ mediaPageRibbonDetails }: RibbonDetailsProps) => {
  const router = useRouter();
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-6 relative bg-white p-6 lg:p-8 w-[90%] md:w-[80%] rounded-3xl shadow-lg ${
        router.locale === Locales.AR
          ? '-left-6 md:left-[-7rem] lg:left-[-10rem]'
          : 'left-6 md:left-[7rem] lg:left-[10rem]'
      }`}
    >
      {mediaPageRibbonDetails?.map((itm, index) => (
        <div
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          key={itm.MediaPageRibbonId}
        >
          {icons[index]}
          <div className="text-[18-px] w-[4.8rem] text-center md:text-left">
            {itm.RibbonHeader}
          </div>
          {itm.Description && (
            <div className="text-xl w-full md:w-1/2">{itm.Description}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RibbonSection;
