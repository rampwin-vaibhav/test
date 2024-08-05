import { useRouter } from 'next/router';
import {
  GetColorVariantResponse,
  ProductCatalogueData,
} from '../../types/models';
import { CommonUtils } from '../../helpers/utilities';

type ProductCatalogueColorVariantProps = {
  productCatalogueData: ProductCatalogueData | undefined;
  colorVariantData: Array<GetColorVariantResponse>;
};

export const getColorBackground = (colorHex: string) => {
  return `linear-gradient(41.84deg, ${colorHex} 15.16%, ${
    colorHex + '99'
  } 50.37%, ${colorHex} 84.47%)`;
};

const ProductCatalogueColorVariant = ({
  productCatalogueData,
  colorVariantData,
}: ProductCatalogueColorVariantProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <span>
        {
          colorVariantData?.find(
            (x) =>
              x.ProductCatalogueId === productCatalogueData?.ProductCatalogueId
          )?.ColorVariant
        }
      </span>
      <div className="flex flex-wrap gap-4 pb-3 border-b">
        {colorVariantData.map((x, i) => (
          <div
            className={` rounded-full bg-white border ${
              x.ProductCatalogueId === productCatalogueData?.ProductCatalogueId
                ? 'border-primary'
                : ''
            }`}
            key={i}
          >
            <div
              className={`w-9 h-9 rounded-full border border-lighter-gray ${
                x.ProductCatalogueId ===
                productCatalogueData?.ProductCatalogueId
                  ? ''
                  : 'cursor-pointer'
              }`}
              style={{
                background: getColorBackground(x.HexCode),
              }}
              onClick={() => {
                if (
                  x.ProductCatalogueId !==
                  productCatalogueData?.ProductCatalogueId
                ) {
                  router.push(
                    `/newcars/new/info/${productCatalogueData?.MakeKey.toLowerCase()}/${productCatalogueData?.ModelKey.toLowerCase()}?p=${CommonUtils.encode(
                      String(x.ProductCatalogueId)
                    )}`
                  );
                }
              }}
              title={x.ColorVariant}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogueColorVariant;
