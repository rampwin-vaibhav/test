import { useRouter } from 'next/router';
import { ColorVariantType } from '../../types/models';
import { CommonUtils } from '../../helpers/utilities';

type NewColorVariantProps = {
  vehicleListingId: number;
  colorVariantData: Array<ColorVariantType>;
};

export const getColorBackground = (colorHex: string) => {
  return `linear-gradient(41.84deg, ${colorHex} 15.16%, ${
    colorHex + '99'
  } 50.37%, ${colorHex} 84.47%)`;
};

const ColorVariant = ({
  vehicleListingId,
  colorVariantData,
}: NewColorVariantProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <span>
        {
          colorVariantData?.find((x) => x.VehicleListingId === vehicleListingId)
            ?.ColorVariant
        }
      </span>
      <div className="flex flex-wrap gap-4 pb-3 border-b">
        {colorVariantData.map((x, i) => (
          <div
            className={` rounded-full bg-white border ${
              x.VehicleListingId === vehicleListingId ? 'border-primary' : ''
            }`}
            key={i}
          >
            <div
              className={`w-9 h-9 rounded-full border border-lighter-gray ${
                x.VehicleListingId === vehicleListingId ? '' : 'cursor-pointer'
              }`}
              style={{
                background: getColorBackground(x.HexCode),
              }}
              onClick={() =>
                router.push(
                  `/newcars/new/info/${x.Make.toLowerCase()}/${x.Model.toLowerCase()}?v=${CommonUtils.encode(
                    String(x.VehicleListingId)
                  )}`
                )
              }
              title={x.ColorVariant}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorVariant;
