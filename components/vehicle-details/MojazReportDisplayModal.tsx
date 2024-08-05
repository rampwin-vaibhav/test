import { useTranslation } from 'next-i18next';
import { Modal, ModalBody } from '../common/Modal';
import { OdometerIcon, OwnerIcon, WarrantyStatusIcon } from '../icons';
import { LabelConstants } from '../../types/i18n.labels';
import { MojazLiteResponse } from '../../types/models';
import { formatNumber } from '../../helpers/utilities';

type MojazLiteReportModalProps = {
  show: boolean;
  hide: Function;
  reportData?: MojazLiteResponse | null;
};

const MojazReportDisplayModal = ({
  show,
  hide,
  reportData,
}: MojazLiteReportModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      backdrop="static"
      onClose={() => hide(false)}
      show={show}
      containerClassName="w-[35rem]"
    >
      <ModalBody>
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {t(LabelConstants.MOJAZ_LITE_REPORT)}
            </h1>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col border m-2 !mt-0">
              <div className="border-b">
                <div className="flex p-2">
                  <OwnerIcon className="h-5 w-5 ml-2" />
                  <div className="flex flex-col pl-2">
                    <span>{t(LabelConstants.TOTAL_OWNERS)}</span>
                    {reportData ? (
                      <span className="text-primary font-semibold">
                        {reportData?.TotalOwners}
                      </span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-b">
                <div className="flex p-2">
                  <OdometerIcon className="h-5 w-5 ml-2" />
                  <div className="flex flex-col pl-2">
                    <span>{t(LabelConstants.LAST_ODOMETER_READING)}</span>
                    {reportData ? (
                      <span className="text-primary font-semibold">
                        {`${formatNumber(reportData?.LastOdometerReading!)} ${t(
                          LabelConstants.KM
                        )}`}
                      </span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex p-2">
                  <WarrantyStatusIcon className="h-5 w-5 ml-2" />
                  <div className="flex flex-col pl-2">
                    <span>{t(LabelConstants.WARRANTY_STATUS)}</span>
                    {reportData ? (
                      <span className="text-primary font-semibold">
                        {reportData?.HasValidWarranty
                          ? t(LabelConstants.YES)
                          : t(LabelConstants.NO)}
                      </span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-center">
            <button
              className="btn bg-gradient btn-sm !w-[12.5rem] uppercase"
              onClick={() => {
                window.open(
                  reportData && reportData?.MojazBuyFullReportUrl
                    ? reportData?.MojazBuyFullReportUrl!
                    : process.env.NEXT_PUBLIC_BUY_MOJAZ_REPORT_LINK!,
                  '',
                  'toolbar=yes,scrollbars=yes,resizable=yes,fullscreen=yes'
                );
              }}
            >
              {t(LabelConstants.BUY_FULL_MOJAZ_REPORT)}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => hide(false)}
            >
              {t(LabelConstants.OK)}
            </button>
          </div>
        </>
      </ModalBody>
    </Modal>
  );
};

export default MojazReportDisplayModal;
