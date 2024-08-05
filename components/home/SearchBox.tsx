import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { SearchIcon } from '../icons/SearchIcon';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';

interface ISearchBoxForm {
  searchKey: string;
}

const SearchBox = () => {
  const { register, handleSubmit } = useForm<ISearchBoxForm>();
  const { t } = useTranslation();
  const router = useRouter();

  const searchSubmit: SubmitHandler<ISearchBoxForm> = async (
    data: ISearchBoxForm
  ) => {
    if (data.searchKey) {
      router.push(`/all-listings?searchKey=${data.searchKey}`);
    } else {
      router.push('/all-listings');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(searchSubmit)}
      className="search-form w-full flex justify-center"
    >
      <div className="flex items-center justify-center bg-white rounded-[0.375rem] shadow-lg ltr:lg:min-w-[72.063rem] ltr:md:w-[46rem] ltr:w-[31rem] rtl:w-full h-[5.25rem]">
        <div className="pl-[30px] pr-[15px] rtl:pl-[15px] rtl:pr-[30px]">
          <SearchIcon className="h-[1.875rem] w-[1.875rem] text-primary" />
        </div>
        <input
          className="h-full px-0 border-none text-2xl leading-7"
          placeholder={t(LabelConstants.SEARCH_BOX_PLACEHOLDER)}
          {...register('searchKey')}
        />
        <div className="search-box-button flex items-center justify-center m-2 rounded-[0.375rem]">
          <button
            type="submit"
            className="bg-gradient rounded-[0.375rem] text-large font-bold h-[4.125rem] w-[4.5rem]"
          >
            {t(LabelConstants.GO_LBL)}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
