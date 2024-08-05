import { CartItem } from '../../../types/models';
import { useTranslation } from 'next-i18next';
import { DeleteCartIcon, PackageIcon } from '../../icons';
import { LabelConstants } from '../../../types/i18n.labels';
import { formatNumber } from '../../../helpers/utilities';

type B2CServiceCartItemProps = {
  cartItem: CartItem;
  callBack: (cartItemId: number, cartId: number, name: string) => void;
};

const B2CServiceCartItem = ({
  cartItem,
  callBack,
}: B2CServiceCartItemProps) => {
  const { t } = useTranslation();
  return (
    <div className="border rounded-[0.25rem]  h-[17.5rem] border-gray-300">
      <div className="flex h-full flex-row w-full p-[1.875rem] gap-[1.875rem]">
        <div className="h-[8rem] w-[8rem] border rounded-lg flex items-center justify-center">
          {cartItem.IconURL ? (
            <picture className="h-[8rem] w-[8rem]">
              <source srcSet={cartItem.IconURL} />
              <img
                src={cartItem.IconURL}
                alt="service icon"
                className="h-full w-full p-4 object-cover"
                onError={(event: any) => {
                  event.target.src = '/images/default-package.png';
                  event.onerror = null;
                }}
              />
            </picture>
          ) : (
            <PackageIcon className="h-[8rem] w-[8rem]" />
          )}
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="flex flex-col gap-[0.625rem]">
            <div className="flex min-[462px]:flex-row flex-col  justify-between">
              <div>
                <h1 className="lg:text-[1.625rem] font-bold">
                  {cartItem.Name}
                </h1>
              </div>
              <div className="flex min-[462px]:justify-end justify-start items-center">
                <h1 className="font-semibold md:text-heading6 text-lg text-primary">
                  {`${t(LabelConstants.SAR)} ${formatNumber(
                    cartItem.DisplayPrice,
                    2
                  )}`}
                </h1>
              </div>
            </div>
            <div className="flex min-[462px]:flex-row flex-col  justify-between">
              <div>
                <span className="text-lg text-[#929597]">
                  {cartItem.Description}
                </span>
              </div>
              <div className="flex min-[462px]:justify-end justify-start items-center">
                <span className="text-lg text-[#929597] font-semibold">
                  {t(LabelConstants.INCLUSIVE_VAT)}
                </span>
              </div>
            </div>
            <div className="flex min-[462px]:flex-row flex-col  justify-between">
              <div className="flex items-center">{`${t(
                LabelConstants.VEHICLE_ID
              )} - ${
                cartItem.VehicleListingId
                  ? String(cartItem.VehicleListingId).padStart(8, '0')
                  : '-'
              }`}</div>
            </div>
          </div>
          <div className="border-gray-300">
            <div className="flex justify-end cursor-pointer min-[471px]:flex-row flex-col gap-2">
              <div
                onClick={() =>
                  callBack(
                    cartItem.ShoppingCartItemId,
                    cartItem.ShoppingCartId,
                    cartItem.Name
                  )
                }
                className="flex flex-row items-center justify-end gap-[0.313rem]"
              >
                <DeleteCartIcon className="w-5 h-8 " />
                <span className="underline text-lg text-error">
                  {t(LabelConstants.REMOVE)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default B2CServiceCartItem;
