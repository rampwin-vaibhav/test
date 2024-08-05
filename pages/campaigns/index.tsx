import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import BannerSlider from '../../components/newcars/BannerSlider';
import { AppTheme } from '../../types/constants';
import { Locales } from '../../types/enums';
import OurOffers from './OurOffers';
import RequestQuote from './RequestQuote';
import TermsAndConditions from './Terms&Conditions';

type Props = {};

const CarsCampagin = ({
  cars,
  cities,
  carOffers,
  heroBanners,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div>
      {/* Title Start */}
      <section className="text-center py-[30px] px-[20px]">
        <h1 className="text-[38px] md:text-[46px] text-gradient font-bold">
          {t('CAMPAIGN_PAGE.CAMPAIGN_TITLE')}
        </h1>
        <p className="text-[24px] font-normal">
          {t('CAMPAIGN_PAGE.CAMPAIGN_SUB_TITLE')}
        </p>
      </section>
      {/* Title End */}

      {/* Banner Slider Start */}
      <section>
        <BannerSlider
          bannerImages={heroBanners}
          dir={router.locale === Locales.AR ? 'rtl' : 'ltr'}
          bannerStyleForVAS="w-full object-cover h-1/4 rtl:scale-x-[1]"
        />
      </section>
      {/* Banner Slider End */}

      {/* Request Quotation Start */}
      <RequestQuote cities={cities} cars={cars} />
      {/* Request Quotation End */}

      {/* Our Offers Start */}
      <OurOffers carOffers={carOffers} />
      {/* Our Offers End */}

      {/* Terms And Conditions Start */}
      <TermsAndConditions />
      {/* Terms And Conditions End */}
    </div>
  );
};

export default CarsCampagin;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  const cars =
    locale === Locales.EN
      ? [
          {
            value: 'Camry',
            label: 'Camry',
          },
          {
            value: 'Elantra',
            label: 'Elantra',
          },
          {
            value: 'Yaris',
            label: 'Yaris',
          },
          {
            value: 'X-Trail',
            label: 'X-Trail',
          },
          {
            value: 'Corolla',
            label: 'Corolla',
          },
          {
            value: 'Dzire',
            label: 'Dzire',
          },
          {
            value: 'Altima',
            label: 'Altima',
          },
          {
            value: 'Kicks',
            label: 'Kicks',
          },
          {
            value: 'Patrol',
            label: 'Patrol',
          },
          {
            value: 'Charger',
            label: 'Charger',
          },
          {
            value: 'Gladiator',
            label: 'Gladiator',
          },
          {
            value: 'Grand Cherokee 2 Row',
            label: 'Grand Cherokee 2 Row',
          },
          {
            value: 'Grand Cherokee 3 ROW',
            label: 'Grand Cherokee 3 ROW',
          },
          {
            value: 'RAM 1500',
            label: 'RAM 1500',
          },
          {
            value: '500 CABRIO',
            label: '500 CABRIO',
          },
        ]
      : [
          {
            value: 'Camry',
            label: 'كامري',
          },
          {
            value: 'Elantra',
            label: 'إلنترا',
          },
          {
            value: 'Yaris',
            label: 'ياريس',
          },
          {
            value: 'X-Trail',
            label: 'إكس تريل',
          },
          {
            value: 'Corolla',
            label: 'كورولا',
          },
          {
            value: 'Dzire',
            label: 'ديزاير',
          },
          {
            value: 'Altima',
            label: 'ألتيما',
          },
          {
            value: 'Kicks',
            label: 'كيكس',
          },
          {
            value: 'Patrol',
            label: 'باترول',
          },
          {
            value: 'Charger',
            label: 'تشارجر',
          },
          {
            value: 'Gladiator',
            label: 'جلادياتور',
          },
          {
            value: 'Grand Cherokee 2 Row',
            label: 'جراند شيروكي صفين',
          },
          {
            value: 'Grand Cherokee 3 ROW',
            label: 'جراند شيروكي ثلاثة صفوف',
          },
          {
            value: 'RAM 1500',
            label: 'رام 1500',
          },
          {
            value: '500 CABRIO',
            label: '500 كابريو',
          },
        ];

  const cities =
    locale === Locales.EN
      ? [
          {
            value: 'abha',
            label: 'Abha',
          },
          {
            value: 'Badr',
            label: 'Badr',
          },
          {
            value: 'Baljurashi',
            label: 'Baljurashi',
          },
          {
            value: 'Bisha',
            label: 'Bisha',
          },
          {
            value: 'Bareq',
            label: 'Bareq',
          },
          {
            value: 'Buraydah',
            label: 'Buraydah',
          },
          {
            value: 'Al Bahah',
            label: 'Al Bahah',
          },
          {
            value: 'Arar',
            label: 'Arar',
          },
          {
            value: 'Dammam',
            label: 'Dammam',
          },
          {
            value: 'Dhahran',
            label: 'Dhahran',
          },
          {
            value: 'Duba',
            label: 'Duba',
          },
          {
            value: 'Dumat Al-Jandal',
            label: 'Dumat Al-Jandal',
          },
          {
            value: 'Dawadmi',
            label: 'Dawadmi',
          },
          {
            value: 'Haql',
            label: 'Haql',
          },
          {
            value: "Ha'il",
            label: "Ha'il",
          },
          {
            value: 'Hofuf-Al-Mubarraz',
            label: 'Hofuf-Al-Mubarraz',
          },
          {
            value: 'Hafr Al-Batin',
            label: 'Hafr Al-Batin',
          },
          {
            value: 'Jeddah',
            label: 'Jeddah',
          },
          {
            value: 'Jizan',
            label: 'Jizan',
          },
          {
            value: 'Jubail',
            label: 'Jubail',
          },
          {
            value: 'Khafji',
            label: 'Khafji',
          },
          {
            value: 'Khamis Mushait',
            label: 'Khamis Mushait',
          },
          {
            value: 'Khobar',
            label: 'Khobar',
          },
          {
            value: 'Al Lith',
            label: 'Al Lith',
          },
          {
            value: 'Al Majma-ah',
            label: "Al Majma'ah",
          },
          {
            value: 'Al Mikhwah',
            label: 'Al Mikhwah',
          },
          {
            value: 'Medina',
            label: 'Medina',
          },
          {
            value: 'Mecca',
            label: 'Mecca',
          },
          {
            value: 'Muzahmiyya',
            label: 'Muzahmiyya',
          },
          {
            value: 'Najran',
            label: 'Najran',
          },
          {
            value: 'Al-Namas',
            label: 'Al-Namas',
          },
          {
            value: 'Neom',
            label: 'Neom',
          },
          {
            value: 'Umluj',
            label: 'Umluj',
          },
          {
            value: 'Al-Omran',
            label: 'Al-Omran',
          },
          {
            value: 'Al-Oyoon',
            label: 'Al-Oyoon',
          },
          {
            value: 'Qatif',
            label: 'Qatif',
          },
          {
            value: 'Al Qunfudhah',
            label: 'Al Qunfudhah',
          },
          {
            value: 'Qurayyat',
            label: 'Qurayyat',
          },
          {
            value: 'Rabigh',
            label: 'Rabigh',
          },
          {
            value: 'Rafha',
            label: 'Rafha',
          },
          {
            value: 'Ar Rass',
            label: 'Ar Rass',
          },
          {
            value: 'Ras Tanura',
            label: 'Ras Tanura',
          },
          {
            value: 'Ranyah',
            label: 'Ranyah',
          },
          {
            value: 'Riyadh',
            label: 'Riyadh',
          },
          {
            value: 'Sabya',
            label: 'Sabya',
          },
          {
            value: 'Saihat',
            label: 'Saihat',
          },
          {
            value: 'Safwa',
            label: 'Safwa',
          },
          {
            value: 'Sakakah',
            label: 'Sakakah',
          },
          {
            value: 'Sharurah',
            label: 'Sharurah',
          },
          {
            value: 'Shaqra',
            label: 'Shaqra',
          },
          {
            value: 'Taif',
            label: 'Taif',
          },
          {
            value: 'Tabuk',
            label: 'Tabuk',
          },
          {
            value: 'Tanomah',
            label: 'Tanomah',
          },
          {
            value: 'Tarout',
            label: 'Tarout',
          },
          {
            value: 'Tayma',
            label: 'Tayma',
          },
          {
            value: 'Thuwal',
            label: 'Thuwal',
          },
          {
            value: 'Thuqbah',
            label: 'Thuqbah',
          },
          {
            value: 'Turaif',
            label: 'Turaif',
          },
          {
            value: 'Tabarjal',
            label: 'Tabarjal',
          },
          {
            value: 'Al-Ula',
            label: "Al-'Ula",
          },
          {
            value: 'Unaizah',
            label: 'Unaizah',
          },
          {
            value: 'Wadi Al-Dawasir',
            label: 'Wadi Al-Dawasir',
          },
          {
            value: 'Al Wajh',
            label: 'Al Wajh',
          },
          {
            value: 'Yanbu',
            label: 'Yanbu',
          },
          {
            value: 'Zulfi',
            label: 'Zulfi',
          },
        ]
      : [
          {
            value: 'abha',
            label: 'أبها',
          },
          {
            value: 'Badr',
            label: 'بدر',
          },
          {
            value: 'Baljurashi',
            label: 'بلجرشي',
          },
          {
            value: 'Bisha',
            label: 'بيشة',
          },
          {
            value: 'Bareq',
            label: 'بارق',
          },
          {
            value: 'Buraydah',
            label: 'بريدة',
          },
          {
            value: 'Al Bahah',
            label: 'الباحة',
          },
          {
            value: 'Arar',
            label: 'عرعر',
          },
          {
            value: 'Dammam',
            label: 'الدمام',
          },
          {
            value: 'Dhahran',
            label: 'الظهران',
          },
          {
            value: 'Duba',
            label: 'ضباء',
          },
          {
            value: 'Dumat Al-Jandal',
            label: 'دومة الجندل',
          },
          {
            value: 'Dawadmi',
            label: 'الدوادمي',
          },
          {
            value: 'Haql',
            label: 'حقل',
          },
          {
            value: "Ha'il",
            label: 'حائل',
          },
          {
            value: 'Hofuf-Al-Mubarraz',
            label: 'الهفوف-المبرز',
          },
          {
            value: 'Hafr Al-Batin',
            label: 'حفر الباطن',
          },
          {
            value: 'Jeddah',
            label: 'جدة',
          },
          {
            value: 'Jizan',
            label: 'جيزان',
          },
          {
            value: 'Jubail',
            label: 'الجبيل',
          },
          {
            value: 'Khafji',
            label: 'الخفجي',
          },
          {
            value: 'Khamis Mushait',
            label: 'خميس مشيط',
          },
          {
            value: 'Khobar',
            label: 'الخبر',
          },
          {
            value: 'Al Lith',
            label: 'الليث',
          },
          {
            value: 'Al Majma-ah',
            label: 'المجمعة',
          },
          {
            value: 'Al Mikhwah',
            label: 'المخواة',
          },
          {
            value: 'Medina',
            label: 'المدينة المنورة',
          },
          {
            value: 'Mecca',
            label: 'مكة المكرمة',
          },
          {
            value: 'Muzahmiyya',
            label: 'المزاحمية',
          },
          {
            value: 'Najran',
            label: 'نجران',
          },
          {
            value: 'Al-Namas',
            label: 'النماص',
          },
          {
            value: 'Neom',
            label: 'نيوم',
          },
          {
            value: 'Umluj',
            label: 'أملج',
          },
          {
            value: 'Al-Omran',
            label: 'العمران',
          },
          {
            value: 'Al-Oyoon',
            label: 'العيون',
          },
          {
            value: 'Qatif',
            label: 'القطيف',
          },
          {
            value: 'Al Qunfudhah',
            label: 'القنفذة',
          },
          {
            value: 'Qurayyat',
            label: 'القريات',
          },
          {
            value: 'Rabigh',
            label: 'رابغ',
          },
          {
            value: 'Rafha',
            label: 'رفحاء',
          },
          {
            value: 'Ar Rass',
            label: 'الرس',
          },
          {
            value: 'Ras Tanura',
            label: 'رأس تنورة',
          },
          {
            value: 'Ranyah',
            label: 'رنية',
          },
          {
            value: 'Riyadh',
            label: 'الرياض',
          },
          {
            value: 'Sabya',
            label: 'صبيا',
          },
          {
            value: 'Saihat',
            label: 'سيهات',
          },
          {
            value: 'Safwa',
            label: 'صفوى',
          },
          {
            value: 'Sakakah',
            label: 'سكاكا',
          },
          {
            value: 'Sharurah',
            label: 'شرورة',
          },
          {
            value: 'Shaqra',
            label: 'شقراء',
          },
          {
            value: 'Taif',
            label: 'الطائف',
          },
          {
            value: 'Tabuk',
            label: 'تبوك',
          },
          {
            value: 'Tanomah',
            label: 'تنومة',
          },
          {
            value: 'Tarout',
            label: 'تاروت',
          },
          {
            value: 'Tayma',
            label: 'تيماء',
          },
          {
            value: 'Thuwal',
            label: 'ثول',
          },
          {
            value: 'Thuqbah',
            label: 'الثقبة',
          },
          {
            value: 'Turaif',
            label: 'طريف',
          },
          {
            value: 'Tabarjal',
            label: 'طبرجل',
          },
          {
            value: 'Al-Ula',
            label: 'العلا',
          },
          {
            value: 'Unaizah',
            label: 'عنيزة',
          },
          {
            value: 'Wadi Al-Dawasir',
            label: 'وادي الدواسر',
          },
          {
            value: 'Al Wajh',
            label: 'الوجه',
          },
          {
            value: 'Yanbu',
            label: 'ينبع',
          },
          {
            value: 'Zulfi',
            label: 'الزلفي',
          },
        ];

  const carOffers =
    locale === 'en'
      ? [
          {
            car: {
              image: 'assets/images/car6.webp',
              title: 'SUZUKI Dzire 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 717,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.7% average insurance and average 4.77% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car3.png',
              title: 'Toyota Yaris 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 933,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.4% average insurance and average 4.47% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car5.png',
              title: 'Toyota Corolla 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 1133,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.4% average insurance and average 4.47% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car2.webp',
              title: 'Hyundai Elantra 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 1177,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.9% average insurance and average 4.97% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/cambrio.png',
              title: 'Fiat 500 Cabrio 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 1350,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.7% average insurance and average 5.34% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car1.webp',
              title: 'Toyota Camry 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 1505,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.4% average insurance and average 4.47% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car11.png',
              title: 'Nissan Altima 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 1560,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.4% average insurance and average 4.47% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/charger.png',
              title: 'Dodge Charger 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 2720,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.7% average insurance and average 5.34% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car12.png',
              title: 'Nissan Kicks 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 1060,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.4% average insurance and average 4.47% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car4.webp',
              title: 'Nissan X-Trail 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 1466,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.4% average insurance and average 4.47% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/cherokee-2.png',
              title: 'Jeep Grand Cherokee 5 Seater 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 3820,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.7% average insurance and average 5.34% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/car13.png',
              title: 'Nissan Patrol 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 3860,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.4% average insurance and average 4.47% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/cherokee-3.png',
              title: 'Jeep Grand Cherokee 7 Seater 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 3940,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.7% average insurance and average 5.34% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/ram-1500.png',
              title: 'Ram 1500 2022',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 3130,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.7% average insurance and average 5.34% APR.',
            },
          },
          {
            car: {
              image: 'assets/images/gladiator.png',
              title: 'Jeep Gladiator 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% Down Payment',
                '0% Admin Fee',
                '5 Year Roadside Assistance',
                'Quick Approval Process',
              ],
              price: {
                currency: 'SAR',
                amount: 3650,
                duration: 'Monthly',
              },
              note: 'Monthly installment is calculated based on the entry trim, 2.7% average insurance and average 5.34% APR.',
            },
          },
        ]
      : [
          {
            car: {
              image: 'assets/images/car6.webp',
              title: 'سوزوكي ديزاير 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 717,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.7% و APR بمتوسط 4.77%.',
            },
          },
          {
            car: {
              image: 'assets/images/car3.png',
              title: 'تويوتا يارس 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 933,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.4% و APR بمتوسط 4.47%.',
            },
          },
          {
            car: {
              image: 'assets/images/car5.png',
              title: 'تويوتا كورولا 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 1133,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.4% و APR بمتوسط 4.47%.',
            },
          },
          {
            car: {
              image: 'assets/images/car2.webp',
              title: 'هيونداي إلنترا 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 1177,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.9% و APR بمتوسط 4.97%.',
            },
          },
          {
            car: {
              image: 'assets/images/cambrio.png',
              title: 'فيات 500 كابريو 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 1350,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.7% و APR بمتوسط 5.34%.',
            },
          },
          {
            car: {
              image: 'assets/images/car1.webp',
              title: 'تويوتا كامري 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 1505,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.4% و APR بمتوسط 4.47%.',
            },
          },
          {
            car: {
              image: 'assets/images/car11.png',
              title: 'نيسان ألتيما 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 1560,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.4% و APR بمتوسط 4.47%.',
            },
          },
          {
            car: {
              image: 'assets/images/charger.png',
              title: 'دودج تشارجر 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 2720,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.7% و APR بمتوسط 5.34%.',
            },
          },
          {
            car: {
              image: 'assets/images/car12.png',
              title: 'نيسان كيكس 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 1060,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.4% و APR بمتوسط 4.47%.',
            },
          },
          {
            car: {
              image: 'assets/images/car4.webp',
              title: 'نيسان إكس تريل 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 1466,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.4% و APR بمتوسط 4.47%.',
            },
          },
          {
            car: {
              image: 'assets/images/cherokee-2.png',
              title: 'جيب جراند شيروكي 5 مقاعد 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 3820,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.7% و APR بمتوسط 5.34%.',
            },
          },
          {
            car: {
              image: 'assets/images/car13.png',
              title: 'نيسان باترول 2024',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 3860,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.4% و APR بمتوسط 4.47%.',
            },
          },
          {
            car: {
              image: 'assets/images/cherokee-3.png',
              title: 'جيب جراند شيروكي 7 مقاعد 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 3940,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.7% و APR بمتوسط 5.34%.',
            },
          },
          {
            car: {
              image: 'assets/images/ram-1500.png',
              title: 'رام 1500 2022',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 3130,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.7% و APR بمتوسط 5.34%.',
            },
          },
          {
            car: {
              image: 'assets/images/gladiator.png',
              title: 'جيب جلادياتور 2023',
              bankLogo: 'assets/images/AlRajhi.png',
              features: [
                '0% دفعة أولى',
                '0% رسوم إدارية',
                '5 سنوات مساعدة على الطريق',
                'عملية الموافقة السريعة',
              ],
              price: {
                currency: 'ريال',
                amount: 3650,
                duration: 'شهري',
              },
              note: 'يتم احتساب القسط الشهري بناءً على الديكور الأساسي، بمتوسط تأمين 2.7% و APR بمتوسط 5.34%.',
            },
          },
        ];

  const heroBanners =
    locale === 'en'
      ? [
          {
            URL: 'assets/images/en/hero-6.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-3.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-5.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-2.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/cambrio-en.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-1.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-11.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/charger-en.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-12.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-4.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/cherokee-2-en.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/hero-13.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/cherokee-3-en.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/ram-1500-en.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/en/gladiator-en.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
        ]
      : [
          {
            URL: 'assets/images/ar/hero-6.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-3.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-5.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-2.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/cambrioar.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-1.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-11.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/charger-ar.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-12.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-4.webp',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/cherokee-2-ar.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/hero-13.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/cherokee-3-ar.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/ram-1500-ar.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
          {
            URL: 'assets/images/ar/gladiator-ar.png',
            MakeArtifactId: 0,
            Platform: 'Web',
          },
        ];
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      applyTheme: AppTheme.V1,
      cars,
      cities,
      carOffers,
      heroBanners,
    },
  };
};
