import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import Head from 'next/head';
type MetaDataComponentProps = {
  titleKey?: string;
  descriptionKey?: string;
  title?: string;
  description?: string;
  replacementTitle?: string;
  replacementDescription?: string;
};
const MetaDataComponent = (props: MetaDataComponentProps) => {
  const { t } = useTranslation();

  const title = props.title
    ? props.title
    : props.replacementTitle
    ? (t(props?.titleKey ?? '') ?? '').replace(
        '${replacement}',
        props.replacementTitle
      )
    : t(props?.titleKey ?? LabelConstants.GO_GO_MOTOR_PAGE_META_TITLE_GLOBAL);
  const description = props.description
    ? props.description
    : props.replacementDescription
    ? (t(props?.descriptionKey ?? '') ?? '').replace(
        '${replacement}',
        props.replacementDescription
      )
    : t(
        props.descriptionKey ?? LabelConstants.GO_GO_MOTOR_PAGE_META_DESC_GLOBAL
      );
  return (
    <Head>
      <title key={'page-title'}>{title}</title>

      <meta
        name="description"
        content={description}
        key="meta-data-description"
      />
    </Head>
  );
};

export default MetaDataComponent;
