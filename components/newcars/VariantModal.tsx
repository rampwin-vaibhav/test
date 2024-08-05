import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { Modal, ModalBody } from '../common/Modal';
import { SetStateAction } from 'react';
import { GetVariantResponse, ProductCatalogueData } from '../../types/models';
import { ArrowRightIcon } from '../icons';
import { CommonUtils, formatNumber } from '../../helpers/utilities';
import { useRouter } from 'next/router';

type modalProps = {
  openVariantModal: boolean;
  setOpenVariantModal: (value: SetStateAction<boolean>) => void;
  productCatalogueData: ProductCatalogueData;
  variantData: Array<GetVariantResponse>;
};

const VariantModal = (props: modalProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Modal
      show={props.openVariantModal}
      onClose={() => {
        props.setOpenVariantModal(false);
      }}
      containerClassName="min-w-[45rem]"
    >
      <ModalBody>
        <div>
          <div className="justify-start border-b-2 pb-4 w-full">
            <h1 className="text-2xl text-gray-700 font-normal">
              {t(LabelConstants.SELECT_VARIANT_LABEL)}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            {props.variantData &&
              props.variantData.map((x: GetVariantResponse, index: number) => (
                <div
                  className={`flex justify-between items-center w-full h-24 cursor-pointer ${
                    index === props.variantData.length - 1 ? '' : 'border-b'
                  }`}
                  key={x.TrimId}
                  onClick={() => {
                    router.push(
                      `/newcars/new/info/${props.productCatalogueData?.Make.toLowerCase()}/${props.productCatalogueData?.Model.toLowerCase()}?p=${CommonUtils.encode(
                        String(x.ProductCatalogueId)
                      )}`
                    );
                  }}
                >
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold uppercase">
                        {x.Trim}
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <div className="text-gray-400 pt-2">
                          <ul className="flex list-inside gap-3 list-disc">
                            {x?.FuelType ? (
                              <li className="list-disc first:list-none">
                                {x?.FuelType || '-'}
                              </li>
                            ) : (
                              <></>
                            )}
                            {x?.Transmission ? (
                              <li className="list-disc first:list-none">
                                {x?.Transmission || '-'}
                              </li>
                            ) : (
                              <></>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div>
                        <span className="text-primary text-2xl font-bold">
                          {`${t(LabelConstants.SAR)} ${
                            formatNumber(x?.DisplayPrice) || '-'
                          }`}
                        </span>
                        <span className="pl-2 text-sm">
                          {t(LabelConstants.INCLUSIVE_VAT)}
                        </span>
                      </div>
                      <div>
                        <ArrowRightIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default VariantModal;
