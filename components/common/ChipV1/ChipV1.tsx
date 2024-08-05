import React, { MouseEventHandler } from 'react';

type ChipProps = {
  text: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const ChipV1 = ({ text, active = false, onClick = () => {} }: ChipProps) => {
  return (
    <div
      onClick={onClick}
      className={`px-[12px] whitespace-nowrap py-[8px] ${
        active ? 'bg-[#EBEFFF] border border-[#212121]' : 'bg-[#F3F2F4]'
      } text-[#212121] rounded-[40px] text-[12px] font-medium cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default ChipV1;
