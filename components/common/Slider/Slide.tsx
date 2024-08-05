import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ReactElement,
} from 'react';
import { SliderServices } from '.';
import { NextIcon, PrevIcon } from '../../icons';
import { useRouter } from 'next/router';
import { Locales } from '../../../types/enums';

type SliderProps = {
  children: Array<JSX.Element>;
  showNavControl?: boolean;
} & { ref: React.Ref<ReactElement> };

const Slider = forwardRef<SliderServices, SliderProps>(
  ({ children, showNavControl = true }, ref) => {
    useImperativeHandle(ref, () => ({
      loadNext: () => {
        if (!isDisabled('next')) moveNext();
      },
      loadPrev: () => {
        if (!isDisabled('prev')) movePrev();
      },
    }));
    const router = useRouter();
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef<any>(null);

    const movePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevState) => prevState - 1);
      }
    };

    const moveNext = () => {
      if (
        carousel.current !== null &&
        carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
      ) {
        setCurrentIndex((prevState) => prevState + 1);
      }
    };

    const isDisabled = (direction: any) => {
      if (direction === 'prev') {
        return currentIndex <= 0;
      }

      if (direction === 'next' && carousel.current !== null) {
        return (
          carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
        );
      }

      return false;
    };

    useEffect(() => {
      if (carousel !== null && carousel.current !== null) {
        carousel.current.scrollLeft =
          carousel.current.offsetWidth *
          currentIndex *
          (router.locale === Locales.AR ? -1 : 1);
      }
    }, [currentIndex, router.locale]);

    useEffect(() => {
      maxScrollWidth.current = carousel.current
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : 0;
    }, []);

    return (
      <div className="w-full">
        <div className="mx-auto flex gap-2 items-center">
          {showNavControl && (
            <button
              onClick={movePrev}
              className="bg-white p-2 rounded-sm text-black text-center disabled:opacity-95 disabled:cursor-not-allowed"
              disabled={isDisabled('prev')}
            >
              <PrevIcon className="h-5 w-5" />
            </button>
          )}
          <div className="relative overflow-hidden">
            <div
              ref={carousel}
              className="relative flex gap-5 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
            >
              {children}
            </div>
          </div>
          {showNavControl && (
            <button
              onClick={moveNext}
              className="bg-white p-2 rounded-sm text-black text-center disabled:opacity-95 disabled:cursor-not-allowed"
              disabled={isDisabled('next')}
            >
              <NextIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
