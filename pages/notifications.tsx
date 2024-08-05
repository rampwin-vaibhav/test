import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { NotificationService } from '../helpers/services';
import { NotificationData, UserNotificationResponse } from '../types/models';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../types/i18n.labels';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import { CommonUtils, SessionUtils } from '../helpers/utilities';
import { NextIcon, PrevIcon } from '../components/icons';
import 'moment/locale/ar';
import moment from 'moment';
import SignInModal from '../components/common/SignInModal';

type NotificationPageProps = {};

const NotificationPage: NextPage<NotificationPageProps> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [notificationData, setNotificationData] = useState<
    Array<NotificationData>
  >([]);
  const [noOfPages, setNoOfPages] = useState<number>();
  const [isRead] = useState(1);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const getNotifications = useCallback(
    async (currentPage: number) => {
      const response: UserNotificationResponse =
        await NotificationService.fetchNotificationsList(
          currentPage,
          maxItemsPerPage,
          isRead,
          CommonUtils.getLanguageId(router.locale!)
        );
      if (response) {
        setLoading(false);
        setNotificationData(response.DataList && response.DataList);
        setNoOfPages(
          Math.ceil(response.DataCount && response.DataCount / maxItemsPerPage)
        );
      } else {
        setLoading(false);
      }
    },
    [maxItemsPerPage, isRead, router.locale]
  );
  useEffect(() => {
    const initialLoad = async () => {
      await getNotifications(currentPage);
    };
    if (SessionUtils.isValidSession()) {
      initialLoad();
    } else {
      router.replace('/404');
    }
  }, [getNotifications, currentPage, maxItemsPerPage, isRead, router]);

  useEffect(() => {
    moment.locale(router.locale);
  }, [router.locale]);

  const changePage = (direction: string) => {
    if (direction === 'back') {
      setLoading(true);
      setCurrentPage(currentPage - 1);
      getNotifications(currentPage - 1);
    } else if (direction === 'next') {
      setLoading(true);
      setCurrentPage(currentPage + 1);
      getNotifications(currentPage + 1);
    }
  };

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated) {
          setOpenSignInModal(true);
        } else {
          setOpenSignInModal(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, []);

  return (
    <PrivatePageLayout title={t(LabelConstants.NOTIFICATION)}>
      <div className="gogo-notification">
        <div className="notification">
          <div className="px-4 mb-8 text-sm">
            {loading ? (
              <div className="flex">
                <p className="notify-me-section">
                  {t(LabelConstants.LOADING_LBL)}
                </p>
              </div>
            ) : !loading && notificationData ? (
              <div>
                <ul className="list-disc flex flex-col gap-2">
                  {notificationData.map((list, index) => (
                    <li className="gap" key={list.AlertNotificationId}>
                      <div>{parse(list.AlertText)}</div>
                      <p>
                        {moment(
                          CommonUtils.convertUTCToLocal(list.CreatedDate)
                        ).fromNow()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex">
                <p className="notify-me-section">
                  {t(LabelConstants.NO_NOTIFICATIONS_CONFIGURED)}
                </p>
              </div>
            )}
          </div>
        </div>
        {noOfPages! >= 1 && (
          <div className="icon-position flex items-center justify-center gap-2">
            <div
              onClick={() => (currentPage === 1 ? false : changePage('back'))}
            >
              <PrevIcon
                className={
                  currentPage === 1
                    ? 'cursor-not-allowed icon'
                    : 'icon cursor-pointer'
                }
              />
            </div>
            <div className="pt-[1px]">
              {t(LabelConstants.PAGE_INDICATOR, {
                currentPage: currentPage,
                lastPage: noOfPages,
              })}
            </div>
            <div
              className=""
              onClick={() =>
                currentPage === noOfPages ? false : changePage('next')
              }
            >
              <NextIcon
                className={
                  currentPage === noOfPages
                    ? 'icon ga-move-next cursor-not-allowed'
                    : 'icon ga-move-next cursor-pointer'
                }
              />
            </div>
          </div>
        )}
        {/* Sign In Modal */}
        <SignInModal
          show={openSignInModal}
          onClose={() => {
            setOpenSignInModal(false);
            router.push('/');
          }}
        />
      </div>
    </PrivatePageLayout>
  );
};
export default NotificationPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  res,
  req,
}: GetServerSidePropsContext) => {
  if (!SessionUtils.isValidServerSession(req, res)) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {
        ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
