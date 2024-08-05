import parse from 'html-react-parser';
import moment from 'moment';
import 'moment/locale/ar';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect, useState } from 'react';
import GogoProshield from '../../../assets/GogoProshield';
import {
  AuthService,
  GlobalService,
  NotificationService,
  PackageSubscription,
} from '../../../helpers/services';
import { CommonUtils } from '../../../helpers/utilities';
import { SessionUtils } from '../../../helpers/utilities/session.utils';
import { useAppContext } from '../../../provider/AppProvider';
import { RedirectURL } from '../../../types/constants';
import { SocialMedia } from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import {
  ConfigurationResponse,
  HeaderMenu,
  NotificationData,
  SocialMediaResponse,
  UserNotificationResponse,
} from '../../../types/models';
import {
  BellIcon,
  ConciergeIcon,
  ExpandFilledArrowIcon,
  LogoutIcon,
  MyBookmarkIcon,
  MyOrdersIcon,
  ProfileIcon,
  ShoppingCartIcon,
  VehicleIcon,
  WhatsappIcon,
} from '../../icons';
import LocaleSwitcher from '../LanguageSwitcher';
import HeaderDropdownMenu from './HeaderDropdownMenu';
import SupportModal from './SupportModal';
type HeaderProps = {
  careerEmail: ConfigurationResponse;
  socialMedia: SocialMediaResponse;
  phoneNumber: string;
};

const Header: FC<HeaderProps> = ({
  careerEmail,
  socialMedia,
  phoneNumber,
}): ReactElement => {
  const router = useRouter();
  const { pathname, query, asPath, locale: activeLocale } = router;
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    showSignUpButton: false,
  });
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [notificationData, setNotificationData] =
    useState<Array<NotificationData>>();
  const [notificationUnreadCount, setNotificationUnreadCount] =
    useState<number>();
  const [headerMenu, setHeaderMenu] = useState<Array<HeaderMenu>>([]);
  const [pathName, setPathName] = useState<string>('');
  const { setShoppingCartCount, shoppingCartCount, isLoggedIn, setIsLoggedIn } =
    useAppContext();

  useEffect(() => {
    const initialLoad = async () => {
      /* Check User Session */
      const isAuthenticated = SessionUtils.isValidSession();
      await setAuth({
        isAuthenticated: isAuthenticated,
        showSignUpButton: true,
      });
      if (isAuthenticated) {
        const unreadCount: number =
          await NotificationService.fetchNotificationsUnreadCount();
        if (
          notificationUnreadCount !== unreadCount ||
          notificationData === undefined
        ) {
          setNotificationUnreadCount(unreadCount && unreadCount);

          /* Fetch user notifications data*/
          const response: UserNotificationResponse =
            await NotificationService.fetchNotificationsList(
              1,
              5,
              0,
              CommonUtils.getLanguageId(router.locale!)
            );
          if (response) {
            setNotificationData(
              response.DataList && response.DataList.slice(0, 5)
            );
          }
        }
        const shoppingCount = await PackageSubscription.getShoppingCartCount();
        setShoppingCartCount(shoppingCount);
        localStorage.removeItem(RedirectURL);
      }
    };
    if (router.isReady || isLoggedIn) initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isLoggedIn]);

  useEffect(() => {
    moment.locale(router.locale);
  }, [router.locale]);

  useEffect(() => {
    setPathName(router.asPath);
  }, [pathname]);

  useEffect(() => {
    /* Fetch user notifications data*/
    const fetchNotificationData = async () => {
      if (auth.isAuthenticated) {
        const unreadCount: number =
          await NotificationService.fetchNotificationsUnreadCount();

        setNotificationUnreadCount(unreadCount && unreadCount);

        /* Fetch user notifications data*/
        const response: UserNotificationResponse =
          await NotificationService.fetchNotificationsList(
            1,
            5,
            0,
            CommonUtils.getLanguageId(router.locale!)
          );
        if (response) {
          setNotificationData(
            response.DataList && response.DataList.slice(0, 5)
          );
        }
      }
      const headerData = await GlobalService.getHeaderMenu(router.locale);
      setHeaderMenu(headerData);
    };
    fetchNotificationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  useEffect(() => {
    let dir = router.locale == 'ar' ? 'rtl' : 'ltr';
    let lang = router.locale == 'ar' ? 'ar' : 'en';
    (document.querySelector('html') as HTMLElement).setAttribute('dir', dir);
    (document.querySelector('html') as HTMLElement).setAttribute('lang', lang);
  }, [router.locale]);

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated) {
          setAuth({
            isAuthenticated: false,
            showSignUpButton: true,
          });
        } else {
          setAuth({
            isAuthenticated: true,
            showSignUpButton: false,
          });
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, []);

  const onSignInClickHandler = async () => {
    localStorage.setItem(RedirectURL, router.asPath);
    // const response = await AuthService.fetchSignInUrl(
    //   CommonUtils.getLanguageId(router.locale!)
    // );
    // if (response) {
    //   window.location.href = response;
    // }
    router.push('/sign-in');
  };

  const contactNumber =
    socialMedia && socialMedia.SocialMedia.length > 0
      ? socialMedia.SocialMedia.filter(
          (itm) => itm.SocialMediaType.trim() === SocialMedia.WhatsApp
        ).map(function (data) {
          return data.ContactNumber;
        })
      : null;

  const mediaEmail =
    socialMedia && socialMedia.SocialMedia?.length > 0
      ? socialMedia.SocialMedia.filter(
          (itm) => itm.SocialMediaType === SocialMedia.Email
        ).map(function (data) {
          return data.MediaEmail;
        })
      : null;

  const openMenuBar = (isOpen: boolean) => {
    setOpenMenu(isOpen);
    if (isOpen) {
      (document.querySelector('body') as HTMLElement).classList.add(
        'body-scroll'
      );
    } else {
      (document.querySelector('body') as HTMLElement).classList.remove(
        'body-scroll'
      );
    }
  };

  return (
    <header>
      <nav className="header bg-white fixed xl:relative w-full z-20 top-0 left-0 border-0">
        <div className="top-header">
          <div className="container flex flex-wrap justify-end w-full items-center mx-auto py-2 gap-[2.813rem] text-base">
            {/* language switcher */}
            <div className="menu-item">
              <LocaleSwitcher />
            </div>

            {/* menus for About GOGO MOTOR */}
            <div className="menu-item">
              <HeaderDropdownMenu label={t(LabelConstants.ABOUT_GOGO_MOTOR)}>
                {({ close }) => (
                  <ul className="flex flex-col w-[200px] divide-y text-lg font-bold">
                    <Link prefetch={false} href="/info/about-us">
                      <li
                        className="header-dropdown-item uppercase"
                        onClick={() => close()}
                      >
                        <a>{t(LabelConstants.ABOUT_US)}</a>
                      </li>
                    </Link>
                    <a href={`mailto:${careerEmail?.ConfigurationValue}`}>
                      <li
                        className="header-dropdown-item uppercase"
                        onClick={() => close()}
                      >
                        {t(LabelConstants.CAREERS)}
                      </li>
                    </a>
                    <Link prefetch={false} href="/info/contact-us">
                      <li
                        className="header-dropdown-item uppercase"
                        onClick={() => close()}
                      >
                        {t(LabelConstants.CONTACT_US)}
                      </li>
                    </Link>
                  </ul>
                )}
              </HeaderDropdownMenu>
            </div>

            {/* menus for Support & Contact */}
            <div className="menu-item " onClick={() => setOpenOverlay(true)}>
              <span className="uppercase flex items-center justify-between h-8 gap-2 w-full border-none">
                {t(LabelConstants.SUPPORT_CONTACT)}
                <ExpandFilledArrowIcon className="w-3 text-white" />
              </span>
            </div>
          </div>
        </div>
        <div className="shadow-lg">
          <div className="main-header">
            <div className="container flex justify-between items-center gap-4 sm:gap-0">
              <div className="flex gap-[10px] xl:gap-[18px] 2xl:gap-[30px] 3xl:gap-[46.3px]">
                {/* Brand Logo */}
                {!pathName.toLowerCase().includes('/vas/warranty') && (
                  <Link prefetch={false} href="/">
                    <a
                      className={`flex items-center  ${
                        pathName.toLowerCase().includes('/vas/warranty')
                          ? 'invisible'
                          : 'visible'
                      }`}
                      onClick={() => openMenu && openMenuBar(false)}
                    >
                      <picture className="cursor-pointer">
                        <source
                          srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/gogo-motors.svg`}
                          type="image/svg"
                        />
                        <img
                          src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/gogo-motors.svg`}
                          alt="gogo motor"
                          className="w-[11.4706rem]"
                          width="183"
                          height="164"
                        />
                      </picture>
                    </a>
                  </Link>
                )}
                {pathName.toLowerCase().includes('/vas/warranty') && (
                  <Link prefetch={false} href="/">
                    <a
                      className="flex object-contain"
                      onClick={() => openMenu && openMenuBar(false)}
                    >
                      <GogoProshield className="w-[60px] h-[70px] lg:w-[5rem] " />
                    </a>
                  </Link>
                )}

                {/* menu items for large devices */}
                <div
                  className={`justify-between items-center w-full hidden xl:flex xl:w-auto xl:order-1`}
                >
                  <ul className="flex gap-8">
                    {headerMenu && headerMenu.length > 0 ? (
                      <>
                        {headerMenu.map((item: HeaderMenu) => (
                          <li key={item.MenuId} className="whitespace-nowrap">
                            <Link prefetch={false} href={item.URL}>
                              <a
                                className={`menu-item text-xl font-bold text-primary ${
                                  pathName === item.URL ||
                                  (router.asPath
                                    .toLowerCase()
                                    .includes('cartype=used-cars') &&
                                    item.URL.toLowerCase() ===
                                      '/cars?cartype=used-cars') ||
                                  (pathName
                                    .toLowerCase()
                                    .includes('/newcars/new') &&
                                    item.URL.toLowerCase() ===
                                      '/newcars/new') ||
                                  (pathName
                                    .toLowerCase()
                                    .includes('/newcars/outlet') &&
                                    item.URL.toLowerCase() ===
                                      '/newcars/outlet/intro') ||
                                  (pathName
                                    .toLocaleLowerCase()
                                    .includes('/car-details') &&
                                    item.URL.toLowerCase() ===
                                      '/cars?cartype=used-cars')
                                    ? 'underline underline-offset-4 decoration-2'
                                    : ''
                                }`}
                              >
                                {item.Menu}
                              </a>
                            </Link>
                          </li>
                        ))}
                        <li className="whitespace-nowrap">
                          <Link prefetch={false} href={'/vas/warranty'}>
                            <a
                              className={`menu-item text-xl font-bold ${
                                pathName
                                  .toLocaleLowerCase()
                                  .includes('/vas/warranty') &&
                                'underline underline-offset-4 decoration-2'
                              }`}
                            >
                              GoGo ProShield
                            </a>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex xl:order-2 items-center gap-4">
                {/* Cart Menu */}
                {auth.isAuthenticated && (
                  <Link prefetch={false} href="/cart">
                    <div
                      className="flex gap-2 relative cursor-pointer"
                      onClick={() => openMenu && openMenuBar(false)}
                    >
                      <ShoppingCartIcon className="h-8 w-8 text-primary" />
                      {Number(shoppingCartCount || 0) > 0 && (
                        <span className="absolute top-0 -right-2 h-[1.3rem] min-w-[1.3rem] px-1 inline-flex items-center justify-center text-sm font-bold leading-none text-white bg-success rounded-full">
                          {Number(shoppingCartCount || 0) > 9
                            ? '9+'
                            : Number(shoppingCartCount || 0)}
                        </span>
                      )}
                    </div>
                  </Link>
                )}
                {/*Notifications*/}
                {auth.isAuthenticated && (
                  <>
                    <div className="flex gap-2 relative px-2">
                      <HeaderDropdownMenu
                        setLabelButton={() => (
                          <div className="">
                            <BellIcon className="w-7" />
                            {notificationUnreadCount! > 0 && (
                              <span className="absolute top-0 left-2.7 h-[1.3rem] min-w-[1.3rem] px-1 inline-flex items-center justify-center text-sm font-bold leading-none text-white bg-success rounded-full">
                                {notificationUnreadCount! > 9
                                  ? '9+'
                                  : notificationUnreadCount}
                              </span>
                            )}
                          </div>
                        )}
                      >
                        {({ close }) => (
                          <ul className="flex flex-col w-[230px] gap-2 px-2 pt-1">
                            <li className="">
                              <div className="flex justify-between">
                                <h6 className="text-sm font-bold">
                                  {t(LabelConstants.NOTIFICATIONS)}
                                </h6>
                                <div
                                  className=" text-red-700 cursor-pointer text-sm font-bold"
                                  onClick={() => {
                                    close();
                                    openMenu && openMenuBar(false);
                                    NotificationService.fetchNotificationsList(
                                      1,
                                      10,
                                      0,
                                      CommonUtils.getLanguageId(router.locale!)
                                    );
                                    router.push('/notifications');
                                  }}
                                >
                                  {t(LabelConstants.SEE_ALL)}
                                </div>
                              </div>
                            </li>
                            {notificationData ? (
                              notificationData.map((list, index) => (
                                <li className="" key={index}>
                                  <div
                                    className="flex flex-col bell-notification gap-1 cursor-pointer"
                                    onClick={() => {
                                      close();
                                      openMenu && openMenuBar(false);
                                      NotificationService.fetchNotificationsList(
                                        1,
                                        10,
                                        0,
                                        CommonUtils.getLanguageId(
                                          router.locale!
                                        )
                                      );
                                      router.push('/notifications');
                                    }}
                                  >
                                    <span className="name">
                                      {parse(`${list.AlertText}`)}
                                    </span>
                                    <span className="time">
                                      {moment(
                                        CommonUtils.convertUTCToLocal(
                                          list.CreatedDate
                                        )
                                      ).fromNow()}
                                    </span>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="header-dropdown-item"></li>
                            )}
                          </ul>
                        )}
                      </HeaderDropdownMenu>
                    </div>
                  </>
                )}

                {/* Profile Menu */}
                {auth.isAuthenticated && (
                  <div className="flex gap-2">
                    {SessionUtils.getUserDetails()?.FirstName ? (
                      <div className="whitespace-nowrap text-primary self-center hidden md:flex items-center gap-1">
                        <div> {t(LabelConstants.HELLO)},</div>
                        <div className="text-ellipsis w-20 overflow-hidden">
                          {SessionUtils.getUserDetails()?.FirstName}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <HeaderDropdownMenu
                      setLabelButton={() => (
                        <ProfileIcon className="h-8 w-8 text-primary" />
                      )}
                    >
                      {({ close }) => (
                        <ul className="flex flex-col w-52 divide-y">
                          <Link prefetch={false} href="/profile">
                            <li
                              className="header-dropdown-item"
                              onClick={() => {
                                close();
                                openMenu && openMenuBar(false);
                              }}
                            >
                              <a className="w-full flex gap-3 items-center">
                                <ProfileIcon className="h-6 w-6" />
                                <span>{t(LabelConstants.PROFILE)}</span>
                              </a>
                            </li>
                          </Link>
                          <Link prefetch={false} href="/my-bookmarks">
                            <li
                              className="header-dropdown-item"
                              onClick={() => {
                                close();
                                openMenu && openMenuBar(false);
                              }}
                            >
                              <a className="w-full flex gap-3 items-center">
                                <MyBookmarkIcon className="h-5 w-5" />
                                <span>{t(LabelConstants.MY_BOOKMARKS)}</span>
                              </a>
                            </li>
                          </Link>
                          {/* Task 12338: Hide My Quotation link from Profile Menu */}
                          {/* <Link prefetch={false} href="/quotations">
                            <li
                              className="header-dropdown-item"
                              onClick={() => close()}
                            >
                              <a className="w-full flex gap-3 items-center">
                                <QuotationIcon className="h-5 w-5" />
                                <span>{t(LabelConstants.MY_QUOTATIONS)}</span>
                              </a>
                            </li>
                          </Link> */}
                          <Link prefetch={false} href="/dashboard">
                            <li
                              className="header-dropdown-item"
                              onClick={() => {
                                close();
                                openMenu && openMenuBar(false);
                              }}
                            >
                              <a className="w-full flex gap-3 items-center">
                                <VehicleIcon className="h-5 w-5" />
                                <span>{t(LabelConstants.MY_VEHICLES)}</span>
                              </a>
                            </li>
                          </Link>
                          <Link prefetch={false} href="/my-wishlist">
                            <li
                              className="header-dropdown-item"
                              onClick={() => {
                                close();
                                openMenu && openMenuBar(false);
                              }}
                            >
                              <a className="w-full flex gap-3 items-center">
                                <ConciergeIcon className="h-5 w-5" />
                                <span>{t(LabelConstants.MY_CONCIERGE)}</span>
                              </a>
                            </li>
                          </Link>
                          <Link prefetch={false} href="/my-orders">
                            <li
                              className="header-dropdown-item"
                              onClick={() => {
                                close();
                                openMenu && openMenuBar(false);
                              }}
                            >
                              <a className="w-full flex gap-2 items-center">
                                <MyOrdersIcon className="h-6 w-6" />
                                <span>{t(LabelConstants.MY_ORDERS)}</span>
                              </a>
                            </li>
                          </Link>
                          <div
                            className="header-dropdown-item"
                            onClick={async () => {
                              const logoutUrl = SessionUtils.getLogoutURL();
                              await AuthService.signOut(logoutUrl);
                              await AuthService.logout();
                              setAuth({
                                isAuthenticated: false,
                                showSignUpButton: true,
                              });
                              setIsLoggedIn(false);
                              router.push('/sign-in');
                              close();
                              openMenu && openMenuBar(false);
                              if (logoutUrl) {
                                window.location.href = '/sign-in';
                              }
                            }}
                          >
                            <li className="w-full flex gap-3 items-center">
                              <LogoutIcon className="h-5 w-5" />
                              <span>{t(LabelConstants.LOGOUT)}</span>
                            </li>
                          </div>
                        </ul>
                      )}
                    </HeaderDropdownMenu>
                  </div>
                )}

                {/* Sign In Menu */}
                <div className="h-auto flex gap-2">
                  {!auth.isAuthenticated && auth.showSignUpButton && (
                    <div
                      className="cursor-pointer text-sm sm:text-xl font-bold bg-gradient text-white px-[0.875rem] pt-2 pb-[0.4375rem] rounded-md uppercase leading-[1.5625rem]"
                      onClick={onSignInClickHandler}
                    >
                      {t(LabelConstants.SIGN_IN)}
                    </div>
                  )}
                  {/* mobile master menu button */}

                  <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 text-base text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    onClick={() => openMenuBar(!openMenu)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="w-6 h-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* menu items for small devices */}
          <div
            className={`${
              openMenu ? 'relative' : 'hidden'
            } main-header-expandable justify-between items-center w-full xl:hidden xl:w-auto xl:order-1 overflow-auto h-[calc(100vh-6rem)]`}
          >
            <ul className="flex flex-col p-4 rounded-lg border border-gray-100 xl:flex-row xl:space-x-8 xl:mt-0 xl:font-medium xl:border-0 xl:bg-white gap-2">
              {headerMenu.map((item: HeaderMenu) => (
                <li
                  key={item.MenuId}
                  onClick={() => {
                    openMenuBar(!openMenu);
                  }}
                  className="whitespace-nowrap"
                >
                  <Link prefetch={false} href={item.URL}>
                    <a className={`text-base font-bold text-primary`}>
                      {item.Menu}
                    </a>
                  </Link>
                </li>
              ))}
              <li onClick={() => openMenuBar(!openMenu)} className="md:hidden">
                <Link prefetch={false} href="/vas/warranty">
                  <a className="text-primary text-base font-bold">
                    GoGo ProShield
                  </a>
                </Link>
              </li>
              <li onClick={() => openMenuBar(!openMenu)} className="md:hidden">
                <Link prefetch={false} href="/info/about-us">
                  <a className="text-primary text-base font-bold">
                    {t(LabelConstants.ABOUT_US)}
                  </a>
                </Link>
              </li>
              <li onClick={() => openMenuBar(!openMenu)} className="md:hidden">
                <a
                  className="text-primary text-base font-bold"
                  href={`mailto:${careerEmail?.ConfigurationValue}`}
                >
                  {t(LabelConstants.CAREERS)}
                </a>
              </li>
            </ul>
            <div className="md:hidden sm:p-8 p-2 gap-6 flex sm:justify-between items-center bg-gray-50 sm:flex-nowrap flex-wrap justify-center sm:my-0 py-5">
              <div className="text-xl font-bold gap-4 flex flex-row items-center">
                <label className="sm:flex hidden">
                  {t(LabelConstants.SELECT_LANGUAGE)}
                </label>
                <div>
                  <button
                    className={`w-[50px] h-[36px] cursor-pointer text-white ${
                      activeLocale === 'en'
                        ? 'bg-gradient rounded-l-[2px]'
                        : ' bg-gray-400 rounded-r-[2px]'
                    }`}
                  >
                    <Link
                      prefetch={false}
                      href={{ pathname, query }}
                      as={asPath}
                      locale={'en'}
                    >
                      EN
                    </Link>
                  </button>
                  <button
                    className={`w-[50px] h-[36px] cursor-pointer text-white ${
                      activeLocale === 'ar'
                        ? ' bg-gradient rounded-l-[2px]'
                        : 'bg-gray-400  rounded-r-[2px]'
                    }`}
                  >
                    <Link
                      prefetch={false}
                      href={{ pathname, query }}
                      as={asPath}
                      locale={'ar'}
                    >
                      عربى
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-20 md:hidden">
              <div className="flex flex-col">
                <div className="flex w-full items-center justify-between bg-white p-2 py-3">
                  <div className="flex justify-center w-full">
                    <div className="text-xl">
                      {t(LabelConstants.SUPPORT_CONTACT)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between flex-col">
                  <div className="w-full">
                    <div className="flex  items-center flex-col bg-white py-5">
                      <div className="text-3xl font-bold text-center">
                        {t(LabelConstants.HAVE_QUESTIONS)}
                      </div>
                      <div className="mt-5 font-bold text-lg">
                        {t(LabelConstants.BROWSE)}
                        <Link prefetch={false} href="/info/faq">
                          <span
                            className="mt-4 cursor-pointer text-gradient"
                            onClick={() => openMenuBar(!openMenu)}
                          >{` ${t(LabelConstants.FAQ)}`}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <div className="font-bold mt-4 text-3xl ">
                      {t(LabelConstants.HERE_TO_HELP)}
                    </div>
                    <div className="mt-4 flex flex-row gap-2">
                      <div>{t(LabelConstants.PLEASE_GIVE_US_A_CALL)}</div>
                      <span
                        className="text-gradient"
                        dir="ltr"
                      >{` ${phoneNumber}`}</span>
                    </div>

                    <div className="mt-4">{t(LabelConstants.OR)}</div>

                    <a
                      href={`https://api.whatsapp.com/send?phone=${
                        contactNumber &&
                        encodeURIComponent(String(contactNumber[0]))
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WhatsappIcon className="mt-4 cursor-pointer"></WhatsappIcon>
                    </a>

                    <div className="mt-4">{t(LabelConstants.OR)}</div>

                    <div className="mt-4 text-gradient">
                      <a href={`mailto:${mediaEmail && mediaEmail[0]}`}>
                        {mediaEmail && mediaEmail[0]}
                      </a>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col items-center bg-white py-10">
                      <div className="text-3xl font-bold text-center">
                        {t(LabelConstants.FEEDBACK_VALUABLE)}
                      </div>
                      <div className="mt-5 font-bold text-lg text-center">
                        {t(LabelConstants.GIVE_YOUR_FEEDBACK)}
                        <Link prefetch={false} href="/info/contact-us">
                          <span
                            className="text-gradient cursor-pointer"
                            onClick={() => openMenuBar(!openMenu)}
                          >
                            {` ${t(LabelConstants.FEEDBACK)}`}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SupportModal
        isOverlayOpen={openOverlay}
        closeOverlay={setOpenOverlay}
        socialMedia={socialMedia}
        phoneNumber={phoneNumber}
      ></SupportModal>
    </header>
  );
};

export default Header;
