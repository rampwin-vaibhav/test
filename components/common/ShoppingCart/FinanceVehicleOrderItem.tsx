import { useTranslation } from 'next-i18next';
import { CartData } from '../../../types/models';
import { LabelConstants } from '../../../types/i18n.labels';
import { formatNumber } from '../../../helpers/utilities';
import { DeleteCartIcon } from '../../icons';
import { PricingMethod } from '../../../types/constants';

type FinanceVehicleOrderItemProps = {
  cartItemsData: CartData | undefined;
  removeService: (id: number) => void;
  handleFinanceIt: () => void;
};

const FinanceVehicleOrderItem = ({
  cartItemsData,
  removeService,
  handleFinanceIt,
}: FinanceVehicleOrderItemProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-end -mt-1"></div>
      {cartItemsData?.CartItems.map(
        (x, i) =>
          x.MarkedForFinance && (
            <div className="flex flex-col gap-2 pb-4 pt-3 px-[1.75rem]" key={i}>
              <div className="flex gap-2 justify-between mt-1">
                <div className="max-w-[10.625rem] uppercase font-bold text-large text-dark-gray1 ">
                  {`${x.Make ? x.Make : ''} ${x.Model ? x.Model : ''} ${
                    x.Spec ? x.Spec : ''
                  } ${x.ModelYear ? x.ModelYear : ''}`}
                </div>
                <div className="flex flex-col">
                  <div className="whitespace-nowrap font-bold text-large">{`${t(
                    LabelConstants.SAR
                  )} ${formatNumber(x.DisplayPrice || 0, 2)}`}</div>
                  <div className="flex justify-end text-[0.875rem] text-dark-gray2">
                    {t(LabelConstants.INCLUSIVE_VAT)}
                  </div>
                </div>
              </div>
              {x.Services.length > 0 && (
                <div className="flex flex-col gap-2 pt-3">
                  {x.Services.filter((x) => x.IsMandatory).map((y, i) => (
                    <div key={i}>
                      <div className="flex gap-3 justify-between">
                        <div className="flex gap-1 items-center">
                          <DeleteCartIcon
                            className="w-4 h-4"
                            fill={'#929597'}
                          />
                          <div className="max-w-[12rem]">{y.Name}</div>
                        </div>
                        {y.PricingMethod === PricingMethod.Free ? (
                          <span>{t(LabelConstants.FREE)}</span>
                        ) : (
                          <div className="whitespace-nowrap">{`${t(
                            LabelConstants.SAR
                          )} ${formatNumber(y.DisplayPrice || 0, 2)}`}</div>
                        )}
                      </div>
                      {y.PricingMethod !== PricingMethod.Free && (
                        <div className="flex justify-end text-[0.875rem] text-dark-gray2">
                          {t(LabelConstants.INCLUSIVE_VAT)}
                        </div>
                      )}
                    </div>
                  ))}
                  {x.Services.filter((x) => !x.IsMandatory) && <hr />}
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
            </div>
          )
      )}
      <div className="flex gap-4 flex-col py-[0.938rem] px-[1.75rem]">
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <p className="text-right">{`${t(LabelConstants.FINAL_AMOUNT)}`}</p>
          <div className="flex flex-col">
            <p
              className="text-right pl-1 text-primary whitespace-nowrap flex gap-2"
              dir="ltr"
            >
              <span>{t(LabelConstants.SAR)}</span>
              <span>{formatNumber(cartItemsData?.TotalAmount || 0, 2)}</span>
            </p>
            <div className="flex justify-end text-[0.875rem] text-dark-gray2">
              {t(LabelConstants.INCLUSIVE_VAT)}
            </div>
          </div>
        </div>
        <div className="font-bold flex items-center text-primary border border-1 p-3 border-primary rounded-md text-lg">
          <span
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: t(LabelConstants.FINANCE_HEADING, {
                FinPalIcon: `<picture class="inline">
                                  <source
                                    srcSet=${`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/finpal_logo1.png`}
                                    type="image/png"
                                  />
                                    <img
                                      src=${`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/finpal_logo1.png`}
                                      alt="gogo motor"
                                      class="inline w-14 lt:mr-1 rtl:ml-1"
                                    />
                                </picture>`,
              }),
            }}
          ></span>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="btn btn-primary w-full !h-[3.5rem] uppercase"
            // disabled={btnDisabled}
            onClick={() => {
              handleFinanceIt();
            }}
          >
            {t(LabelConstants.FINANCE_IT)}
          </button>
          <span className="text-sm text-primary">
            {t(LabelConstants.FINANCE_TEXT)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinanceVehicleOrderItem;
