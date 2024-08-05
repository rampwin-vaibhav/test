import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { CloseIcon, SearchIcon } from '../icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormBrandSearchInput {
  searchKey: string;
}

const schema = yup.object({
  searchKey: yup.string(),
});

const BrandSearchInput = ({
  onSearch,
}: {
  onSearch: (searchKey: string) => void;
}) => {
  const { t } = useTranslation();
  const { handleSubmit, register, reset, getValues } =
    useForm<IFormBrandSearchInput>({
      resolver: yupResolver(schema),
    });

  const onSubmit: SubmitHandler<IFormBrandSearchInput> = async ({
    searchKey,
  }: IFormBrandSearchInput) => {
    onSearch(searchKey);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full p-2 bg-white items-center rounded-md shadow">
        <input
          {...register('searchKey')}
          className="w-full grow p-2 text-xl leading-4 bg-white h-full border-0 rounded-none"
          placeholder={t(LabelConstants.NEW_CAR_BRAND_SEARCH)}
        />
        <div className="bg-white p-2">
          {getValues().searchKey ? (
            <button
              type="button"
              className="h-[2rem] w-[2rem]"
              onClick={() => reset({ searchKey: '' })}
            >
              <CloseIcon className="h-[1rem] w-full" />
            </button>
          ) : (
            <></>
          )}
        </div>
        <button
          className="bg-gradient rounded-md h-full w-[4rem] py-3"
          type="submit"
        >
          <SearchIcon className="h-[1.5rem] text-white w-full" />
        </button>
      </div>
    </form>
  );
};

export default BrandSearchInput;
