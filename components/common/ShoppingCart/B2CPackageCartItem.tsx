import { useTranslation } from 'next-i18next';
import { DeleteCartIcon, PackageIcon } from '../../icons';
import { LabelConstants } from '../../../types/i18n.labels';
import { formatNumber } from '../../../helpers/utilities';
import { CartItem } from '../../../types/models';

type B2CPackageCartItemProps = {
  cartItem: CartItem;
  callBack: (cartItemId: number, cartId: number, name: string) => void;
};

const B2CPackageCartItem = ({
  cartItem,
  callBack,
}: B2CPackageCartItemProps) => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-[0.25rem] border-gray-300">
      <div className="flex h-full flex-row w-full p-[1.875rem] gap-[1.875rem]">
        <div className="">
          {cartItem.IconURL ? (
            <picture className="w-[13.75rem] h-[13.75rem]">
              <source srcSet={cartItem.IconURL} />
              <img
                src={cartItem.IconURL}
                alt="package icon"
                className="h-full w-full p-4 object-cover"
                onError={(event: any) => {
                  event.target.src = '/images/default-package.png';
                  event.onerror = null;
                }}
              />
            </picture>
          ) : (
            <PackageIcon className="aspect-[110/110] w-[6.3rem]" />
          )}
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex min-[462px]:flex-row flex-col  justify-between">
              <div>
                <h1 className="md:text-heading6 text-lg text-dark-gray1 font-semibold">
                  {cartItem.Name}
                </h1>
              </div>
              <div className="flex min-[462px]:justify-end justify-start items-center">
                <h1
                  className="font-semibold flex gap-2 md:text-heading6 text-lg text-primary"
                  dir="ltr"
                >
                  <span>{t(LabelConstants.SAR)}</span>
                  <span>{formatNumber(cartItem.DisplayPrice, 2)}</span>
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

export default B2CPackageCartItem;
