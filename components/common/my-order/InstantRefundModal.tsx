import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../../types/i18n.labels';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '../Form';
import { ListingService, OrderService } from '../../../helpers/services';
import {
  MyOrdersData,
  RequestRefundPayload,
  RequestRefundResponse,
} from '../../../types/models';
import { useRouter } from 'next/router';
import MessageBox, { MessageBoxResult, MessageBoxType } from '../MessageBox';

interface IFormInput {
  description: string;
}

type InstantRefundProps = {
  originalInvoiceId: number;
  amount: number;
  itemId: string;
  subscriptionReferenceType: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  onClose?: () => void;
  setMyOrders: (value: Array<MyOrdersData>) => void;
};
const schema = yup
  .object({
    description: yup
      .string()
      .trim()
      .nullable()
      .required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

const InstantRefundModal = ({
  originalInvoiceId,
  amount,
  itemId,
  subscriptionReferenceType,
  openModal,
  setOpenModal,
  setMyOrders,
}: InstantRefundProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload: RequestRefundPayload = {
      OriginalInvoiceId: originalInvoiceId,
      Amount: amount,
      RefundDescription: data?.description!,
      ItemId: itemId,
      SubscriptionReferenceType: subscriptionReferenceType,
      IsCancelOrder: true,
    };
    const response: RequestRefundResponse = await OrderService.refundRequest(
      payload
    );

    if (response.IsSuccess) {
      closeModel();

      const result = await MessageBox.open({
        content: t(LabelConstants.REFUND_REQUEST_PROCESS_SUCCESS),
        type: MessageBoxType.Alert,
      });
      if (result === MessageBoxResult.OK) {
        router.push('/my-orders');
      }
      const myOrders = await ListingService.fetchMyOrders(router.locale);
      setMyOrders(myOrders.Data);
    } else {
      closeModel();
      const result = await MessageBox.open({
        content: t(LabelConstants.REFUND_REQUEST_FAIL_MSG),
        type: MessageBoxType.Alert,
      });
      if (result === MessageBoxResult.OK) {
        router.push('/my-orders');
      }
    }
  };
  const closeModel = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <Modal
        backdrop="static"
        show={openModal}
        onClose={() => closeModel()}
        containerClassName="w-[30rem]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="mt-5">
              <FormInput
                name="description"
                label={`${t(LabelConstants.REFUND_REQUEST_REASON_QUESTION)}*`}
                control={control}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-modal !text-lg uppercase !min-h-min  !px-4 !py-3"
              >
                {t(LabelConstants.REQUEST_REFUND)}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-modal !text-lg uppercase !min-h-min  !px-4 !py-3"
                onClick={() => closeModel()}
              >
                {t(LabelConstants.CANCEL)}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};
export default InstantRefundModal;
