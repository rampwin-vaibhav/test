import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CMSPageKey } from '../types/constants';
import ConfigurationService from '../helpers/services/configuration.service';

export default function useDisclaimerText() {
  const [disclaimerText, setDisclaimerText] = useState<{
    [x: string]: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    loadDisclaimerText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDisclaimerText = async () => {
    const disclaimerTextData =
      await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Disclaimer,
        null,
        router.locale
      );
    setDisclaimerText(disclaimerTextData);
  };

  return [disclaimerText];
}
