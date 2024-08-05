import { useTranslation } from 'next-i18next';
import { formatNumber } from '../../../helpers/utilities';
import { ProductReferenceType } from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import { CartData } from '../../../types/models';
import { DeleteCartIcon } from '../../icons';
import { useRouter } from 'next/router';

type CashVehicleOrderItemProps = {
  cartItemsData: CartData | undefined;
  removeService: (id: number) => void;
  handleProceed: (id: number, payFullamount: boolean) => void;
};

const CashVehicleOrderItem = ({
  cartItemsData,
  removeService,
  handleProceed,
}: CashVehicleOrderItemProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div>
      {cartItemsData?.CartItems.filter(
        (x) =>
          !x.MarkedForFinance && x.CartItemType === ProductReferenceType.Vehicle
      ).map((x, i) => (
        <>
          <div className="flex gap-2 px-[1.75rem] justify-between" key={i}>
            <div className="max-w-[10.625rem] uppercase font-bold text-large text-dark-gray1 ">
              {`${x.Make ? x.Make : ''} ${x.Model ? x.Model : ''} ${
                x.Spec ? x.Spec : ''
              } ${x.ModelYear ? x.ModelYear : ''}`}
            </div>
            <div
              className="text-dark-gray1 font-bold text-large whitespace-nowrap flex flex-col"
              dir="ltr"
            >
              <div className="flex gap-2">
                <span>{t(LabelConstants.SAR)}</span>
                <span>{formatNumber(x.DisplayPrice || 0, 2)}</span>
              </div>
              <div className="flex justify-end text-[0.875rem] text-dark-gray2">
                {t(LabelConstants.INCLUSIVE_VAT)}
              </div>
            </div>
          </div>

          {x.Services.length > 0 && (
            <div className="flex flex-col px-[1.75rem] gap-2 pt-3">
              {x.Services.filter((x) => x.IsMandatory).map((y, i) => (
                <div key={i}>
                  <div className="flex gap-3 justify-between">
                    <div className="flex gap-1 items-center">
                      <DeleteCartIcon className="w-4 h-4" fill="#929597" />
                      <div className="max-w-[12rem]">{y.Name}</div>
                    </div>
                    <div className="whitespace-nowrap">{`${t(
                      LabelConstants.SAR
                    )} ${formatNumber(y.DisplayPrice || 0, 2)}`}</div>
                  </div>
                  <div className="flex justify-end text-[0.875rem] text-dark-gray2">
                    {t(LabelConstants.INCLUSIVE_VAT)}
                  </div>
                </div>
              ))}
              {x.Services.filter((x) => !x.IsMandatory).length > 0 && <hr />}
              {x.Services.filter((x) => !x.IsMandatory).map((y, i) => (
                <div key={i}>
                  <div className="flex gap-3 justify-between">
                    <div className="flex gap-1 items-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => removeService(y?.ServiceId)}
                      >
                        <DeleteCartIcon className="w-4 h-4" />
                      </div>
                      <div className="max-w-[12rem]">{y.Name}</div>
                    </div>
                    <div className="whitespace-nowrap">{`${t(
                      LabelConstants.SAR
                    )} ${formatNumber(y.DisplayPrice || 0, 2)}`}</div>
                  </div>
                  <div className="flex justify-end text-[0.875rem] text-dark-gray2">
                    {t(LabelConstants.INCLUSIVE_VAT)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 py-[0.938rem] px-[1.75rem]">
            <hr />
            <div>
              <div className="flex justify-between font-semibold text-lg">
                <p className="text-right">{`${t(
                  LabelConstants.FINAL_AMOUNT
                )}`}</p>
                <p
                  className="text-right pl-1 text-primary whitespace-nowrap flex gap-2"
                  dir="ltr"
                >
                  <span>{t(LabelConstants.SAR)}</span>
                  <span>
                    {formatNumber(cartItemsData?.TotalAmount || 0, 2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-end text-[0.875rem] text-dark-gray2">
                {t(LabelConstants.INCLUSIVE_VAT)}
              </div>
            </div>

            <hr />
            <div className="flex gap-4 flex-col">
              <span className="font-bold text-primary text-lg">
                {t(LabelConstants.BOOKING_AMOUNT_TEXT)}
              </span>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between font-semibold text-lg">
                    <p className="text-right">{`${t(
                      LabelConstants.BOOKING_AMOUNT
                    )}`}</p>
                    <p
                      className="text-right pl-1 text-primary whitespace-nowrap flex gap-2"
                      dir="ltr"
                    >
                      <span>{t(LabelConstants.SAR)}</span>
                      <span>
                        {formatNumber(cartItemsData?.BookingAmount || 0, 2)}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between text-[0.875rem] text-dark-gray2">
                    <span className="text-xs text-dark-gray1 font-bold">
                      {t(LabelConstants.SECURE_BOOKING)}
                    </span>
                    <span>{t(LabelConstants.INCLUSIVE_VAT)}</span>
                  </div>
                </div>
                <button
                  className="btn btn-primary w-full !h-[3.5rem] uppercase"
                  onClick={() => {
                    handleProceed(cartItemsData?.ShoppingCartId!, false);
                  }}
                  // disabled={btnDisabled}
                >
                  {t(LabelConstants.BOOK_NOW)}
                </button>
                <span className="text-sm text-primary">
                  {t(LabelConstants.BOOKING_TEXT)}
                </span>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
export default CashVehicleOrderItem;
