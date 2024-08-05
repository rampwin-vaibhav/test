import { LabelConstants } from '../../types/i18n.labels';

export const getCurrentPageMetaData = (url: string, translator: Function) => {
  let title = translator(LabelConstants.GO_GO_MOTOR_PAGE_META_TITLE_GLOBAL);
  let description = translator(
    LabelConstants.GO_GO_MOTOR_PAGE_META_DESC_GLOBAL
  );
  if (url?.includes('/newcars/new')) {
    const currentYear = new Date().getFullYear();
    const replacementTitle = `${currentYear}-${currentYear + 1}`;
    const replacementDescription = `${currentYear}-${currentYear + 1}`;
    return {
      title: translator(LabelConstants.META_TITLE_NEW_CARS).replace(
        '${replacement}',
        replacementTitle
      ),
      description: translator(LabelConstants.META_DESCRIPTION_NEW_CARS).replace(
        '${replacement}',
        replacementDescription
      ),
    };
  }
  return { title, description };
};
