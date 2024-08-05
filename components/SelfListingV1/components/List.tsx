import { AnimatePresence } from 'framer-motion';
import { SlideIn } from '../../common/Animations';
import { useRouter } from 'next/router';
import SelectedCheckIcon from './SelectedCheckIcon';

type ListProps = {
  itemsClasses?: string;
  selectedId?: number | string | null;
  items: {
    label: string | null;
    value: number | string;
    chipText?: string | null;
  }[];
  onClick: ({
    label,
    value,
  }: {
    label: string | null;
    value: number | string;
  }) => void;
};

const List = ({
  itemsClasses = '',
  items,
  selectedId = null,
  onClick,
}: ListProps) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      <ol>
        {items?.map((eachItem, index) => (
          <SlideIn
            key={index}
            direction={router.locale === 'en' ? 'left' : 'right'}
            duration={0.2 * (index / 2 + 1.5)}
          >
            <li
              className={`${itemsClasses} cursor-pointer flex items-center justify-between pr-2`}
              onClick={() => onClick(eachItem)}
            >
              <p className="flex items-center gap-[16px]">
                <span>{eachItem.label}</span>
                {eachItem.chipText && (
                  <span className="py-[3px] px-[8px] bg-[#EBEFFF] text-[11px] font-normal text-[#757575] rounded-[4px]">
                    {eachItem.chipText}
                  </span>
                )}
              </p>
              {selectedId && selectedId === eachItem.value ? (
                <SelectedCheckIcon />
              ) : null}
            </li>
          </SlideIn>
        ))}{' '}
      </ol>
    </AnimatePresence>
  );
};
export default List;
