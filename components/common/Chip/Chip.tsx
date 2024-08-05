type ChipProps = {
  text: string;
};

const Chip = ({ text }: ChipProps) => {
  return (
    <div className="px-[17px] py-[8px] bg-[#F3F2F4] rounded-[40px] text-[12px] font-medium">
      {text}
    </div>
  );
};

export default Chip;
