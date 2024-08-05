import { Modal, ModalBody, ModalFooter } from '../common/Modal';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { FormInput } from '../common/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

interface IFormInput {
  searchName: string;
}

const schema = yup
  .object({
    searchName: yup
      .string()
      .nullable()
      .trim()
      .required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

type SaveSearchModalProps = {
  show: boolean;
  onClose: (searchName?: string) => void;
};

/**
 * This modal component is use to accept user search name.
 * @returns JSX.Element
 */
const SaveSearchModal = ({ show, onClose }: SaveSearchModalProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (show) reset();
  }, [show, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async ({
    searchName,
  }: IFormInput) => {
    onClose(searchName);
  };

  return (
    <Modal backdrop="static" show={show} onClose={onClose}>
      <>
        <ModalBody>
          <div className="flex flex-col gap-10 p-2 items-center justify-center">
            <div className="text-xl font-bold text-gray-600">
              {t(LabelConstants.NAME_OF_SEARCH)}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="save-search"
              className="w-full px-3"
            >
              <FormInput control={control} name="searchName" />
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center">
            <button
              form="save-search"
              type="submit"
              className="btn btn-primary btn-modal font-bold uppercase"
            >
              {t(LabelConstants.SAVE)}
            </button>
          </div>
        </ModalFooter>
      </>
    </Modal>
  );
};

export default SaveSearchModal;
