import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../../types/i18n.labels';
import {
  CartItem,
  QuotationResultItem,
  ServiceResponse,
} from '../../../types/models';
import { Modal, ModalBody, ModalHeader } from '../Modal';
import { useState } from 'react';
import { formatNumber } from '../../../helpers/utilities';
import { VASServiceType } from '../../../types/enums';

type QuotationServiceSliderItemProps = {
  service: ServiceResponse;
  list: Array<ServiceResponse>;
  isSelected: boolean;
  cartItem: QuotationResultItem;
  selectedServiceId: Array<number>;
  updateSelectedServices: (serviceIdList: Array<number>) => void;
};

const QuotationServiceSliderItem = ({
  service,
  list,
  isSelected,
  cartItem,
  updateSelectedServices,
  selectedServiceId,
}: QuotationServiceSliderItemProps) => {
  const [viewDetails, setViewDetails] = useState<boolean>(false);

  const { t } = useTranslation();
  const handleCheckBox = (checked: boolean) => {
    let ids = [...selectedServiceId];
    if (!checked) {
      ids = ids.filter((x) => x !== service.ServiceId);
    } else {
      ids.push(service.ServiceId);
    }
    updateSelectedServices(ids);
  };

  const chooseServiceVariant = (isSelected: boolean, serviceId: number) => {
    let ids = [...selectedServiceId];
    if (isSelected) {
      const availableServicesForSameType = selectedServiceId.filter((x) =>
        list.map((y) => y.ServiceId).includes(x)
      );
      ids = ids.filter((x) => !availableServicesForSameType.includes(x));
      ids.push(serviceId);
    } else {
      ids = ids.filter((x) => x !== serviceId);
    }
    updateSelectedServices(ids);
  };
  const getServiceText = (ServiceType: string) => {
    switch (ServiceType) {
      case VASServiceType.WarrantyService:
        return <div>{t(LabelConstants.EXTENDED_WARRANTY)}</div>;
      case VASServiceType.MotorInsurance:
        return <div>{t(LabelConstants.MOTOR_INSURANCE)}</div>;
      case VASServiceType.Reconditioning:
        return <div>{t(LabelConstants.RECONDITIONING)}</div>;
      case VASServiceType.CarCare:
        return <div>{t(LabelConstants.CAR_CARE)}</div>;
      case VASServiceType.RoadsideAssistance:
        return <div>{t(LabelConstants.ROADSIDE_ASSISTANCE)}</div>;
      case VASServiceType.ServiceContract:
        return <div>{t(LabelConstants.SERVICE_CONTRACT)}</div>;
    }
  };
  return (
    <div
      className={`border ${
        isSelected
          ? 'border-primary text-primary'
          : 'border-gray-300 text-dark-gray1'
      }  rounded-md min-w-[10.05rem] h-[14.188rem]`}
    >
      <div className="py-[1.25rem] grid h-full grid-rows-3 justify-between text-center">
        <div className="text-[0.875rem] font-bold w-[10rem]">
          {service.ServiceName}
        </div>
        <div>
          <div className="text-lg font-bold">
            {t(LabelConstants.SAR)} {formatNumber(service.DisplayPrice || 0, 2)}
          </div>
          <div className="text-sm">{t(LabelConstants.INCLUSIVE_VAT)}</div>
          {list && list.length > 1 && !isSelected && (
            <div
              className="underline mt-[0.625rem] cursor-pointer"
              onClick={() => setViewDetails(true)}
            >
              {t(LabelConstants.VIEW_DETAILS)}
            </div>
          )}
        </div>
        <div className="mt-[2rem]">
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer"
            checked={
              isSelected || selectedServiceId.includes(service.ServiceId)
            }
            onChange={(e) => handleCheckBox(e.target.checked)}
            disabled={isSelected}
          />
        </div>
      </div>
      <Modal
        show={viewDetails}
        onClose={() => setViewDetails(false)}
        containerClassName="max-w-[70rem]"
      >
        <>
          <ModalHeader>
            <div className="flex text-2xl text-dark-gray1 pt-4 flex-col gap-2 items-center justify-center">
              {getServiceText(list[0].ServiceType)}
              <div className="text-lg font-normal text-dark-gray1">
                {t(LabelConstants.PLEASE_CHOOSE_OPTION)}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-row flex-wrap p-3 pt-0 gap-4">
              {list?.map((service, i) => {
                const isChecked =
                  cartItem.Services.findIndex(
                    (x) => x.ServiceId === service.ServiceId
                  ) !== -1;
                return (
                  <div
                    className={`border ${
                      isChecked
                        ? 'border-primary text-primary'
                        : 'border-gray-300 text-dark-gray1'
                    }  rounded-md min-w-[10.05rem] h-[10.188rem]`}
                    key={i}
                  >
                    <div className="py-4 grid h-full grid-rows-3 justify-between text-center">
                      <div className="text-sm font-bold w-[10rem]">
                        {service.ServiceName}
                      </div>
                      <div>
                        <div className="text-lg font-bold">
                          {`${t(LabelConstants.SAR)} ${formatNumber(
                            service.DisplayPrice || 0,
                            2
                          )}`}
                        </div>
                        <div className="text-sm">
                          {t(LabelConstants.INCLUSIVE_VAT)}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-end">
                        <input
                          type="checkbox"
                          className="h-5 w-5 cursor-pointer"
                          checked={selectedServiceId.includes(
                            service.ServiceId
                          )}
                          onChange={(e) => {
                            chooseServiceVariant(
                              e.target.checked,
                              service.ServiceId
                            );
                            setViewDetails(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ModalBody>
        </>
      </Modal>
    </div>
  );
};
export default QuotationServiceSliderItem;
