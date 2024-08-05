import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { SessionUtils } from '../../../helpers/utilities';
import { PushDataToGTM } from '../../../helpers/utilities/gtm';
import { Locales } from '../../../types/enums';
import { GTMEvents } from '../../../types/gtm';
import HeaderDropdownMenu, {
  HeaderDropdownMenuService,
} from '../Header/HeaderDropdownMenu';

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const languageRef = useRef<HeaderDropdownMenuService>(null);

  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale && locale !== 'default'
  );

  const handleLanguageChange = () => {
    languageRef.current?.closeDropdown();

    const user = SessionUtils.getUserDetails();

    //Added GTM event for Compare Click
    PushDataToGTM(GTMEvents.LanguageSwitched, {
      userId: user?.UserId
        ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
        : null,
      languageId:
        // added condition because router.locale updates late
        router.locale === Locales.EN ? Locales.AR : Locales.EN,
    });
  };

  return (
    <HeaderDropdownMenu
      ref={languageRef}
      label={
        activeLocale === 'ar'
          ? 'English'
          : activeLocale === 'en'
          ? 'عربى'
          : 'English'
      }
      className={`${activeLocale === 'en' ? "font-['Vazirmatn']" : ''}`}
    >
      {() => (
        <ul className="flex flex-col w-[100px] divide-y">
          {locales?.map((locale) => {
            const { pathname, query, asPath } = router;
            return (
              <Link
                href={{ pathname, query }}
                as={asPath}
                locale={locale}
                key={locale}
              >
                <li
                  className={`header-dropdown-item ${
                    activeLocale === locale ? 'active' : ''
                  }`}
                  onClick={() => {
                    handleLanguageChange();
                  }}
                >
                  {locale === 'ar' ? (
                    <a className="w-full uppercase text-right font-['Vazirmatn']">
                      عربى
                    </a>
                  ) : (
                    <a className="w-full uppercase text-left">English</a>
                  )}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </HeaderDropdownMenu>
  );
}
