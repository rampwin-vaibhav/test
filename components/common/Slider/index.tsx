import Slider from './Slide';
import SliderItem from './SliderItem';

export type SliderServices = {
  loadNext: () => void;
  loadPrev: () => void;
};

export { Slider, SliderItem };
