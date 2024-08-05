import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { FormDropdown, FormTextarea } from '../common/Form';
import { VehicleService } from '../../helpers/services';
import { useRouter } from 'next/router';
import { DeletionReason } from '../../types/models';
import { LabelConstants } from '../../types/i18n.labels';
import MessageBox from '../common/MessageBox';

type DeleteVehicleModalProps = {
  show: boolean;
  listingId: string | number;
  onClose: (isDeleted: boolean) => void;
};

interface IFormInput {
  reason: DeletionReason;
  summary: string;
}

const schema = yup
  .object({
    reason: yup.object().nullable().required(),
  })
  .required();

/**
 * This modal component open a window with vehicle deletion form.
 * @returns JSX.Element
 */
const DeleteVehicleModal = ({
  show,
  listingId,
  onClose,
}: DeleteVehicleModalProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { control, reset, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const [deletionReason, setDeletionReason] = useState<Array<DeletionReason>>(
    []
  );

  useEffect(() => {
    const init = async () => {
      // fetch list of vehicle deletion reasons.
      const reasons = await VehicleService.fetchVehicleDeletionReasons(
        router.locale
      );
      setDeletionReason(reasons);
    };

    if (show) {
      init();
      reset();
    }
  }, [show, router.locale, reset]);

  /**
   * This method handles submit request for deletion request.
   */
  const onSubmit: SubmitHandler<IFormInput> = async ({
    reason: { DeletionReasonId },
    summary,
  }: IFormInput) => {
    const result = await VehicleService.deleteVehicleById(
      listingId,
      DeletionReasonId,
      summary ? summary : null
    );
    if (result) {
      await MessageBox.open({ content: t(LabelConstants.VEHICLE_DELETED) });
      onClose(true);
    }
  };

  return (
    <Modal backdrop="static" show={show} onClose={() => onClose(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="flex flex-col gap-3 p-2">
            <div className="font-bold text-xl text-gray-600">
              {t(LabelConstants.DELETION_CONFIRMATION)}
            </div>
            <div className="flex flex-col gap-[1.875rem]">
              <FormDropdown
                control={control}
                name="reason"
                options={deletionReason}
                labelAccessor="DeletionReason"
                valueAccessor="DeletionReasonId"
                labelText={`${t(LabelConstants.REASON)}*`}
              />
              <FormTextarea
                control={control}
                name="summary"
                label={`${t(LabelConstants.ADDITIONAL_INFORMATION)}`}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-modal uppercase"
            >
              {t(LabelConstants.CONFIRM)}
            </button>
            <button
              type="reset"
              className="btn btn-secondary btn-modal uppercase"
              onClick={() => onClose(false)}
            >
              {t(LabelConstants.CANCEL)}
            </button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default DeleteVehicleModal;
