import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { TitleTransferUrl } from '../../types/constants';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';

const TitleTransfer = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Title Transfer View
    PushDataToGTMWithSubEvents(
      GTMEvents.TitleTransfer,
      GTMSubEvents.ViewedService,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
  }, []);

  return (
    <div className="ul-terms">
      <div className="text-base">
        <div className="dark-gray1">
          {t(LabelConstants.TITLE_TRANSFER_CONTENT)}
          <a
            href={TitleTransferUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-1 underline text-primary"
          >
            {t(LabelConstants.TITLE_TRANSFER_URL)}
          </a>
        </div>
        <div className="font-bold mt-10">
          {t(LabelConstants.COMPLETE_OWNERSHIP)}
        </div>
        <ul className="list-disc pl-6">
          <li>{t(LabelConstants.VEHICLE_MUST_REGISTERED)}</li>
          <li>{t(LabelConstants.VALID_REGISTRATION)}</li>
          <li>{t(LabelConstants.VEHICLE_INSPECTION)}</li>
          <li>{t(LabelConstants.VEHICLE_INSURANCE)}</li>
          <li>{t(LabelConstants.NO_TRAFFIC_VIOLATION)}</li>
          <li>{t(LabelConstants.NO_TRAFFIC_VIOLATION_BUYER)}</li>
          <li>{t(LabelConstants.NO_TRAFFIC_VIOLATION_SELLER)}</li>
          <li>{t(LabelConstants.GOVERNMENT_FEES)}</li>
        </ul>
      </div>
    </div>
  );
};

export default TitleTransfer;
