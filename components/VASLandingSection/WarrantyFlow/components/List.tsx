import { AnimatePresence } from 'framer-motion';
import { SlideIn } from '../../../common/Animations';

type ListProps = {
  items: { label: string | null; value: number | string }[];
  onClick: ({
    label,
    value,
  }: {
    label: string | null;
    value: number | string;
  }) => void;
};

const List = ({ items, onClick }: ListProps) => {
  return (
    <AnimatePresence>
      <ol>
        {items?.map((eachItem, index) => (
          <SlideIn
            key={index}
            direction="left"
            duration={0.2 * (index / 2 + 1.5)}
          >
            <li
              className={`text-[16px] font-[500] border-b py-[28px] cursor-pointer`}
              onClick={() => onClick(eachItem)}
            >
              {eachItem.label}
            </li>
          </SlideIn>
        ))}{' '}
      </ol>
    </AnimatePresence>
  );
};
export default List;
