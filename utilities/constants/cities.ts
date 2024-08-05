const cities = [
  {
    CIT_CODE: 395,
    CIT_NAME_EN: 'ADH DHIBIYAH',
    CIT_NAME_AR: 'الذيبية',
  },
  {
    CIT_CODE: 396,
    CIT_NAME_EN: 'KHADRA',
    CIT_NAME_AR: 'خضراء',
  },
  {
    CIT_CODE: 397,
    CIT_NAME_EN: "AL BADAYI'",
    CIT_NAME_AR: 'البدايع',
  },
  {
    CIT_CODE: 398,
    CIT_NAME_EN: 'BATTAHAH',
    CIT_NAME_AR: 'بطاحة',
  },
  {
    CIT_CODE: 399,
    CIT_NAME_EN: 'AS SAQRAH',
    CIT_NAME_AR: 'الصقرة',
  },
  {
    CIT_CODE: 400,
    CIT_NAME_EN: 'WABRAH',
    CIT_NAME_AR: 'وبرة',
  },
  {
    CIT_CODE: 401,
    CIT_NAME_EN: "ABU 'ISHARAH",
    CIT_NAME_AR: 'أبو عشرة',
  },
  {
    CIT_CODE: 402,
    CIT_NAME_EN: "AL MU'ALLAQ",
    CIT_NAME_AR: 'المعلق',
  },
  {
    CIT_CODE: 403,
    CIT_NAME_EN: 'AR RUMAYTHI',
    CIT_NAME_AR: 'الرميثي',
  },
  {
    CIT_CODE: 404,
    CIT_NAME_EN: 'AL HIRANIYAH',
    CIT_NAME_AR: 'الهرانية',
  },
  {
    CIT_CODE: 405,
    CIT_NAME_EN: 'AR RADUM',
    CIT_NAME_AR: 'الرضم',
  },
  {
    CIT_CODE: 406,
    CIT_NAME_EN: "ATH THA'AL",
    CIT_NAME_AR: 'الثعل',
  },
  {
    CIT_CODE: 407,
    CIT_NAME_EN: 'AL UNSIYAT',
    CIT_NAME_AR: 'الانسيات',
  },
  {
    CIT_CODE: 408,
    CIT_NAME_EN: "FAR'AT AR RUMAYTHI",
    CIT_NAME_AR: 'فرعة الرميثي',
  },
  {
    CIT_CODE: 409,
    CIT_NAME_EN: 'AL BUTIN',
    CIT_NAME_AR: 'البطين',
  },
  {
    CIT_CODE: 410,
    CIT_NAME_EN: 'MUSHRIFAH',
    CIT_NAME_AR: 'مشرفة',
  },
  {
    CIT_CODE: 411,
    CIT_NAME_EN: 'BIDAYDAH',
    CIT_NAME_AR: 'بديدة',
  },
  {
    CIT_CODE: 412,
    CIT_NAME_EN: 'AL MIJHILIYAH',
    CIT_NAME_AR: 'المجهلية',
  },
  {
    CIT_CODE: 413,
    CIT_NAME_EN: 'AL BAHARAH',
    CIT_NAME_AR: 'البحرة',
  },
  {
    CIT_CODE: 414,
    CIT_NAME_EN: "BUDAY'AH",
    CIT_NAME_AR: 'بديعة',
  },
  {
    CIT_CODE: 415,
    CIT_NAME_EN: 'AL JUTHUM',
    CIT_NAME_AR: 'الجثوم',
  },
  {
    CIT_CODE: 416,
    CIT_NAME_EN: 'ASH SHUWAYTIN',
    CIT_NAME_AR: 'الشويطن',
  },
  {
    CIT_CODE: 417,
    CIT_NAME_EN: 'AL MAHAMAH',
    CIT_NAME_AR: 'المحامة',
  },
  {
    CIT_CODE: 419,
    CIT_NAME_EN: 'ABRAQIYAH',
    CIT_NAME_AR: 'ابرقية',
  },
  {
    CIT_CODE: 420,
    CIT_NAME_EN: 'AL JAMMANIYAH',
    CIT_NAME_AR: 'الجمانية',
  },
  {
    CIT_CODE: 421,
    CIT_NAME_EN: 'AL ASHARIYAH',
    CIT_NAME_AR: 'الاشعرية',
  },
  {
    CIT_CODE: 422,
    CIT_NAME_EN: 'AL KHADARAH',
    CIT_NAME_AR: 'الخضارة',
  },
  {
    CIT_CODE: 423,
    CIT_NAME_EN: 'AS SALIHIYAH',
    CIT_NAME_AR: 'الصالحية',
  },
  {
    CIT_CODE: 424,
    CIT_NAME_EN: "BIDAI' AL IDYAN",
    CIT_NAME_AR: 'بدائع العضيان',
  },
  {
    CIT_CODE: 425,
    CIT_NAME_EN: 'UMM ARTA',
    CIT_NAME_AR: 'أم أرطى',
  },
  {
    CIT_CODE: 426,
    CIT_NAME_EN: 'AL MAKLAH',
    CIT_NAME_AR: 'المكلاة',
  },
  {
    CIT_CODE: 427,
    CIT_NAME_EN: 'USHAYRAN',
    CIT_NAME_AR: 'عشيران',
  },
  {
    CIT_CODE: 428,
    CIT_NAME_EN: "BU'AYTHIRAN",
    CIT_NAME_AR: 'بعيثران',
  },
  {
    CIT_CODE: 429,
    CIT_NAME_EN: 'UMM QUSUR',
    CIT_NAME_AR: 'أم قصور',
  },
  {
    CIT_CODE: 430,
    CIT_NAME_EN: 'ABDAH',
    CIT_NAME_AR: 'عبدة',
  },
  {
    CIT_CODE: 431,
    CIT_NAME_EN: 'KHURAYSAH',
    CIT_NAME_AR: 'خريصة',
  },
  {
    CIT_CODE: 432,
    CIT_NAME_EN: 'AJABAH',
    CIT_NAME_AR: 'عجابة',
  },
  {
    CIT_CODE: 433,
    CIT_NAME_EN: "AL MUDAYFI'",
    CIT_NAME_AR: 'المديفع',
  },
  {
    CIT_CODE: 434,
    CIT_NAME_EN: 'AL QIDRAWIYAH',
    CIT_NAME_AR: 'القدراوية',
  },
  {
    CIT_CODE: 436,
    CIT_NAME_EN: 'UMM ATHLAH',
    CIT_NAME_AR: 'أم أثلة',
  },
  {
    CIT_CODE: 438,
    CIT_NAME_EN: "MUTI'AH",
    CIT_NAME_AR: 'مطيعة',
  },
  {
    CIT_CODE: 439,
    CIT_NAME_EN: 'AL MADARAH',
    CIT_NAME_AR: 'المدارة',
  },
  {
    CIT_CODE: 441,
    CIT_NAME_EN: 'AL HILWAH',
    CIT_NAME_AR: 'الحلوة',
  },
  {
    CIT_CODE: 442,
    CIT_NAME_EN: 'AD DUBAYJAH',
    CIT_NAME_AR: 'الدبيجة',
  },
  {
    CIT_CODE: 444,
    CIT_NAME_EN: 'AR RAWBIDAH / RAGHABAH',
    CIT_NAME_AR: 'الروبضة / رغبة',
  },
  {
    CIT_CODE: 445,
    CIT_NAME_EN: 'RAWDAT AS SUHUL',
    CIT_NAME_AR: 'رويضة السهول',
  },
  {
    CIT_CODE: 446,
    CIT_NAME_EN: 'MISHASH AS SUHUL',
    CIT_NAME_AR: 'مشاش السهول',
  },
  {
    CIT_CODE: 448,
    CIT_NAME_EN: 'AS SUFARAT',
    CIT_NAME_AR: 'الصفرات',
  },
  {
    CIT_CODE: 449,
    CIT_NAME_EN: 'AL BIR',
    CIT_NAME_AR: 'البير',
  },
  {
    CIT_CODE: 450,
    CIT_NAME_EN: 'RUWAYGHIB',
    CIT_NAME_AR: 'رويغب',
  },
  {
    CIT_CODE: 451,
    CIT_NAME_EN: 'AN NAJF',
    CIT_NAME_AR: 'النجف',
  },
  {
    CIT_CODE: 452,
    CIT_NAME_EN: 'AS SUTAYH',
    CIT_NAME_AR: 'السطيح',
  },
  {
    CIT_CODE: 453,
    CIT_NAME_EN: 'AL KHAYMAH',
    CIT_NAME_AR: 'الخيمة',
  },
  {
    CIT_CODE: 455,
    CIT_NAME_EN: 'TAFIDAH',
    CIT_NAME_AR: 'تفيدة',
  },
  {
    CIT_CODE: 457,
    CIT_NAME_EN: 'NADYA',
    CIT_NAME_AR: 'ندياء',
  },
  {
    CIT_CODE: 459,
    CIT_NAME_EN: 'DUWAYYINAH',
    CIT_NAME_AR: 'دوينه',
  },
  {
    CIT_CODE: 460,
    CIT_NAME_EN: 'ADAN',
    CIT_NAME_AR: 'عدن',
  },
  {
    CIT_CODE: 461,
    CIT_NAME_EN: 'AL AHMAR',
    CIT_NAME_AR: 'الأحمر',
  },
  {
    CIT_CODE: 462,
    CIT_NAME_EN: 'AL MUTHALLATH',
    CIT_NAME_AR: 'المثلث',
  },
  {
    CIT_CODE: 463,
    CIT_NAME_EN: "AL FAR'",
    CIT_NAME_AR: 'الفرع',
  },
  {
    CIT_CODE: 464,
    CIT_NAME_EN: "AL BIQA'",
    CIT_NAME_AR: 'البقاع',
  },
  {
    CIT_CODE: 466,
    CIT_NAME_EN: 'AL BATHNAH',
    CIT_NAME_AR: 'البثنة',
  },
  {
    CIT_CODE: 467,
    CIT_NAME_EN: 'KHAYF HUSAYN',
    CIT_NAME_AR: 'خيف حسين',
  },
  {
    CIT_CODE: 468,
    CIT_NAME_EN: 'AL BAQQARIYAH',
    CIT_NAME_AR: 'البقارية',
  },
  {
    CIT_CODE: 469,
    CIT_NAME_EN: "AL FUQ'ALI",
    CIT_NAME_AR: 'الفقعلي',
  },
  {
    CIT_CODE: 470,
    CIT_NAME_EN: 'AL MUSHAYRIF',
    CIT_NAME_AR: 'المشريف',
  },
  {
    CIT_CODE: 471,
    CIT_NAME_EN: 'UMM AL MISIN',
    CIT_NAME_AR: 'أم المسن',
  },
  {
    CIT_CODE: 473,
    CIT_NAME_EN: 'AD DARAH',
    CIT_NAME_AR: 'الدارة',
  },
  {
    CIT_CODE: 474,
    CIT_NAME_EN: 'AL QURAY',
    CIT_NAME_AR: 'القري',
  },
  {
    CIT_CODE: 475,
    CIT_NAME_EN: 'AS SILAYM',
    CIT_NAME_AR: 'السليم',
  },
  {
    CIT_CODE: 476,
    CIT_NAME_EN: 'AL LUTHAMAH',
    CIT_NAME_AR: 'اللثامة',
  },
  {
    CIT_CODE: 477,
    CIT_NAME_EN: "AL MUQANNA'",
    CIT_NAME_AR: 'المقنع',
  },
  {
    CIT_CODE: 478,
    CIT_NAME_EN: 'DUFYAN',
    CIT_NAME_AR: 'ضفيان',
  },
  {
    CIT_CODE: 479,
    CIT_NAME_EN: 'ADAD',
    CIT_NAME_AR: 'عضاد',
  },
  {
    CIT_CODE: 480,
    CIT_NAME_EN: "AL 'UDWAH",
    CIT_NAME_AR: 'العدوة',
  },
  {
    CIT_CODE: 481,
    CIT_NAME_EN: 'AN NABAH',
    CIT_NAME_AR: 'النباة',
  },
  {
    CIT_CODE: 482,
    CIT_NAME_EN: 'AL BARIDI',
    CIT_NAME_AR: 'البريدي',
  },
  {
    CIT_CODE: 484,
    CIT_NAME_EN: 'AL QARRASAH',
    CIT_NAME_AR: 'القراصة',
  },
  {
    CIT_CODE: 485,
    CIT_NAME_EN: "AL 'IS",
    CIT_NAME_AR: 'العيص',
  },
  {
    CIT_CODE: 487,
    CIT_NAME_EN: "YANBU' AN NAKHIL",
    CIT_NAME_AR: 'ينبع النخل',
  },
  {
    CIT_CODE: 488,
    CIT_NAME_EN: 'JARAJIR',
    CIT_NAME_AR: 'جراجر',
  },
  {
    CIT_CODE: 489,
    CIT_NAME_EN: "TIR'AH",
    CIT_NAME_AR: 'ترعة',
  },
  {
    CIT_CODE: 490,
    CIT_NAME_EN: "AL MURABBA'",
    CIT_NAME_AR: 'المربع',
  },
  {
    CIT_CODE: 491,
    CIT_NAME_EN: 'NABT',
    CIT_NAME_AR: 'نبط',
  },
  {
    CIT_CODE: 492,
    CIT_NAME_EN: 'AS SALILAH',
    CIT_NAME_AR: 'السليلة',
  },
  {
    CIT_CODE: 493,
    CIT_NAME_EN: 'AL QARAIN',
    CIT_NAME_AR: 'القرائن',
  },
  {
    CIT_CODE: 494,
    CIT_NAME_EN: 'ASH SHUKAYYRAH',
    CIT_NAME_AR: 'الشكيرة',
  },
  {
    CIT_CODE: 495,
    CIT_NAME_EN: 'HIJRAT AL MUGHUR',
    CIT_NAME_AR: 'هجرة المغر',
  },
  {
    CIT_CODE: 496,
    CIT_NAME_EN: "MAZARI' AL MUHTAJIBAH",
    CIT_NAME_AR: 'مزارع المحتجبة',
  },
  {
    CIT_CODE: 497,
    CIT_NAME_EN: 'AL GHURABAH',
    CIT_NAME_AR: 'الغرابة',
  },
  {
    CIT_CODE: 499,
    CIT_NAME_EN: 'GHUSLAH',
    CIT_NAME_AR: 'غسلة',
  },
  {
    CIT_CODE: 502,
    CIT_NAME_EN: 'HALWAN',
    CIT_NAME_AR: 'حلوان',
  },
  {
    CIT_CODE: 503,
    CIT_NAME_EN: 'HASARAH',
    CIT_NAME_AR: 'حصرة',
  },
  {
    CIT_CODE: 504,
    CIT_NAME_EN: 'ATH THUMAMIYAH',
    CIT_NAME_AR: 'الثمامية',
  },
  {
    CIT_CODE: 505,
    CIT_NAME_EN: 'LUBAYDAH',
    CIT_NAME_AR: 'لبيدة',
  },
  {
    CIT_CODE: 506,
    CIT_NAME_EN: "AL 'IDAYYANIYAH",
    CIT_NAME_AR: 'العضيانية',
  },
  {
    CIT_CODE: 507,
    CIT_NAME_EN: 'AJLAH',
    CIT_NAME_AR: 'عجلة',
  },
  {
    CIT_CODE: 508,
    CIT_NAME_EN: "SA'DAH",
    CIT_NAME_AR: 'سعدة',
  },
  {
    CIT_CODE: 509,
    CIT_NAME_EN: 'JAFN DABB',
    CIT_NAME_AR: 'جفن ضب',
  },
  {
    CIT_CODE: 510,
    CIT_NAME_EN: 'DALQAN',
    CIT_NAME_AR: 'دلقان',
  },
  {
    CIT_CODE: 511,
    CIT_NAME_EN: "UMM AS SIBA'",
    CIT_NAME_AR: 'أم السباع',
  },
  {
    CIT_CODE: 512,
    CIT_NAME_EN: "AL JILH AL A'LA",
    CIT_NAME_AR: 'الجله الأعلى',
  },
  {
    CIT_CODE: 513,
    CIT_NAME_EN: 'AL KHAFAQ AL JANUBI',
    CIT_NAME_AR: 'الخفق الجنوبي',
  },
  {
    CIT_CODE: 514,
    CIT_NAME_EN: 'AD DIHWAH',
    CIT_NAME_AR: 'الدحوة',
  },
  {
    CIT_CODE: 515,
    CIT_NAME_EN: 'AL KHAFAQ AL QADIM',
    CIT_NAME_AR: 'الخفق القديم',
  },
  {
    CIT_CODE: 516,
    CIT_NAME_EN: 'ASH SHARMIYAH',
    CIT_NAME_AR: 'الشرمية',
  },
  {
    CIT_CODE: 517,
    CIT_NAME_EN: 'MARAGHAN',
    CIT_NAME_AR: 'مراغان',
  },
  {
    CIT_CODE: 519,
    CIT_NAME_EN: 'AL JARWIYAH',
    CIT_NAME_AR: 'الجروية',
  },
  {
    CIT_CODE: 520,
    CIT_NAME_EN: "AL 'AWSHAZIYAH",
    CIT_NAME_AR: 'العوشزية',
  },
  {
    CIT_CODE: 521,
    CIT_NAME_EN: 'ABU RIJUM',
    CIT_NAME_AR: 'أبو رجوم',
  },
  {
    CIT_CODE: 522,
    CIT_NAME_EN: 'AL QALTAH',
    CIT_NAME_AR: 'القلتة',
  },
  {
    CIT_CODE: 523,
    CIT_NAME_EN: "LI'LI'",
    CIT_NAME_AR: 'لعلع',
  },
  {
    CIT_CODE: 524,
    CIT_NAME_EN: 'AL GHURAYRI',
    CIT_NAME_AR: 'الغريري',
  },
  {
    CIT_CODE: 526,
    CIT_NAME_EN: 'AN NASAQ AL QADIM',
    CIT_NAME_AR: 'النسق القديم',
  },
  {
    CIT_CODE: 527,
    CIT_NAME_EN: 'WUTHAYLAN',
    CIT_NAME_AR: 'وثيلان',
  },
  {
    CIT_CODE: 528,
    CIT_NAME_EN: 'BAYDA NTHAYL',
    CIT_NAME_AR: 'بيضاء نثيل',
  },
  {
    CIT_CODE: 529,
    CIT_NAME_EN: 'UMM AD DIBA',
    CIT_NAME_AR: 'أم الدباء',
  },
  {
    CIT_CODE: 530,
    CIT_NAME_EN: 'AL AMAR',
    CIT_NAME_AR: 'الأمار',
  },
  {
    CIT_CODE: 531,
    CIT_NAME_EN: 'USAYLAN',
    CIT_NAME_AR: 'عسيلان',
  },
  {
    CIT_CODE: 532,
    CIT_NAME_EN: 'AS SIDRIYAH',
    CIT_NAME_AR: 'السدرية',
  },
  {
    CIT_CODE: 533,
    CIT_NAME_EN: 'UMM ASH SHUBRUM',
    CIT_NAME_AR: 'أم الشبرم',
  },
  {
    CIT_CODE: 534,
    CIT_NAME_EN: 'AL HIJJAJI',
    CIT_NAME_AR: 'الحجاجي',
  },
  {
    CIT_CODE: 535,
    CIT_NAME_EN: 'AL GHUBAYYA',
    CIT_NAME_AR: 'الغبياء',
  },
  {
    CIT_CODE: 537,
    CIT_NAME_EN: 'ABU HUMAYD',
    CIT_NAME_AR: 'أبو حميض',
  },
  {
    CIT_CODE: 538,
    CIT_NAME_EN: "AN NUBAYBI'",
    CIT_NAME_AR: 'النبيبيع',
  },
  {
    CIT_CODE: 539,
    CIT_NAME_EN: "AN NABA'",
    CIT_NAME_AR: 'النباع',
  },
  {
    CIT_CODE: 540,
    CIT_NAME_EN: 'AL MALQA',
    CIT_NAME_AR: 'الملقى',
  },
  {
    CIT_CODE: 541,
    CIT_NAME_EN: 'HUJAYLA',
    CIT_NAME_AR: 'حجيلاء',
  },
  {
    CIT_CODE: 542,
    CIT_NAME_EN: "AL 'ABD",
    CIT_NAME_AR: 'العبد',
  },
  {
    CIT_CODE: 543,
    CIT_NAME_EN: 'UMM AL JITHJATH',
    CIT_NAME_AR: 'أم الجثجاث',
  },
  {
    CIT_CODE: 544,
    CIT_NAME_EN: 'UMM JAFR',
    CIT_NAME_AR: 'أم جفر',
  },
  {
    CIT_CODE: 545,
    CIT_NAME_EN: 'AL KHALFIYAH',
    CIT_NAME_AR: 'الخلفية',
  },
  {
    CIT_CODE: 546,
    CIT_NAME_EN: "AL JIDH'AN",
    CIT_NAME_AR: 'الجدعان',
  },
  {
    CIT_CODE: 547,
    CIT_NAME_EN: 'ZINQAHAH',
    CIT_NAME_AR: 'زنقاحة',
  },
  {
    CIT_CODE: 548,
    CIT_NAME_EN: "AL 'UMSHAN",
    CIT_NAME_AR: 'العمشان',
  },
  {
    CIT_CODE: 549,
    CIT_NAME_EN: 'AL JUDHAYYAH',
    CIT_NAME_AR: 'الجذية',
  },
  {
    CIT_CODE: 550,
    CIT_NAME_EN: "AL 'UQDAH",
    CIT_NAME_AR: 'العقدة',
  },
  {
    CIT_CODE: 551,
    CIT_NAME_EN: 'AL QARA',
    CIT_NAME_AR: 'القرا',
  },
  {
    CIT_CODE: 552,
    CIT_NAME_EN: 'AL FUTAYMAH',
    CIT_NAME_AR: 'الفطيمة',
  },
  {
    CIT_CODE: 553,
    CIT_NAME_EN: 'AL MAHARIZAH',
    CIT_NAME_AR: 'المحارزة',
  },
  {
    CIT_CODE: 554,
    CIT_NAME_EN: 'AL HAMAH',
    CIT_NAME_AR: 'الحمة',
  },
  {
    CIT_CODE: 555,
    CIT_NAME_EN: 'SAYYADAH',
    CIT_NAME_AR: 'صيادة',
  },
  {
    CIT_CODE: 556,
    CIT_NAME_EN: 'AD DIFINAH',
    CIT_NAME_AR: 'الدفينة',
  },
  {
    CIT_CODE: 557,
    CIT_NAME_EN: 'AL WAHAT',
    CIT_NAME_AR: 'الوهط',
  },
  {
    CIT_CODE: 558,
    CIT_NAME_EN: 'AL GHUNNAM',
    CIT_NAME_AR: 'الغنم',
  },
  {
    CIT_CODE: 559,
    CIT_NAME_EN: 'ABU GHAYL',
    CIT_NAME_AR: 'ابو غيل',
  },
  {
    CIT_CODE: 560,
    CIT_NAME_EN: 'UMM AL BIKAR',
    CIT_NAME_AR: 'ام البكار',
  },
  {
    CIT_CODE: 561,
    CIT_NAME_EN: "AL FU'UR",
    CIT_NAME_AR: 'الفعور',
  },
  {
    CIT_CODE: 562,
    CIT_NAME_EN: 'AS SUKHAYRAH',
    CIT_NAME_AR: 'الصخيرة',
  },
  {
    CIT_CODE: 563,
    CIT_NAME_EN: 'AS SIRAYH',
    CIT_NAME_AR: 'السريح',
  },
  {
    CIT_CODE: 564,
    CIT_NAME_EN: "AL MAL'AB",
    CIT_NAME_AR: 'الملعب',
  },
  {
    CIT_CODE: 565,
    CIT_NAME_EN: 'AL GHIMAYR',
    CIT_NAME_AR: 'الغمير',
  },
  {
    CIT_CODE: 566,
    CIT_NAME_EN: 'AL WAZIR',
    CIT_NAME_AR: 'الوزير',
  },
  {
    CIT_CODE: 567,
    CIT_NAME_EN: 'THUMALAH',
    CIT_NAME_AR: 'ثمالة',
  },
  {
    CIT_CODE: 568,
    CIT_NAME_EN: 'AN NUSBAH',
    CIT_NAME_AR: 'النصبة',
  },
  {
    CIT_CODE: 569,
    CIT_NAME_EN: 'ABBASAH',
    CIT_NAME_AR: 'عباسة',
  },
  {
    CIT_CODE: 571,
    CIT_NAME_EN: 'GHIRABAH',
    CIT_NAME_AR: 'غرابة',
  },
  {
    CIT_CODE: 572,
    CIT_NAME_EN: 'AL HALAQAH',
    CIT_NAME_AR: 'الحلقة',
  },
  {
    CIT_CODE: 573,
    CIT_NAME_EN: 'AR RIKHAYLAH',
    CIT_NAME_AR: 'الرخيلة',
  },
  {
    CIT_CODE: 574,
    CIT_NAME_EN: 'AL QASAB',
    CIT_NAME_AR: 'القصب',
  },
  {
    CIT_CODE: 576,
    CIT_NAME_EN: 'AS SUH',
    CIT_NAME_AR: 'الصوح',
  },
  {
    CIT_CODE: 577,
    CIT_NAME_EN: 'USHAYQIR',
    CIT_NAME_AR: 'اشيقر',
  },
  {
    CIT_CODE: 578,
    CIT_NAME_EN: 'UMM TULAIHAH',
    CIT_NAME_AR: 'ام طليحة',
  },
  {
    CIT_CODE: 579,
    CIT_NAME_EN: 'AD DAHINAH',
    CIT_NAME_AR: 'الداهنة',
  },
  {
    CIT_CODE: 581,
    CIT_NAME_EN: 'AL JURAIFAH',
    CIT_NAME_AR: 'الجريفة',
  },
  {
    CIT_CODE: 582,
    CIT_NAME_EN: 'AL WAQF',
    CIT_NAME_AR: 'الوقف',
  },
  {
    CIT_CODE: 583,
    CIT_NAME_EN: "AL 'ULUWAH",
    CIT_NAME_AR: 'العلوة',
  },
  {
    CIT_CODE: 584,
    CIT_NAME_EN: 'FARHAH',
    CIT_NAME_AR: 'فرحة',
  },
  {
    CIT_CODE: 585,
    CIT_NAME_EN: 'ARAWA',
    CIT_NAME_AR: 'عروى',
  },
  {
    CIT_CODE: 586,
    CIT_NAME_EN: 'FARDAH',
    CIT_NAME_AR: 'فردة',
  },
  {
    CIT_CODE: 587,
    CIT_NAME_EN: 'MUWAYSIL',
    CIT_NAME_AR: 'مويسل',
  },
  {
    CIT_CODE: 588,
    CIT_NAME_EN: 'ASH SHAT',
    CIT_NAME_AR: 'الشاة',
  },
  {
    CIT_CODE: 590,
    CIT_NAME_EN: 'MUSHRIF',
    CIT_NAME_AR: 'مشرف',
  },
  {
    CIT_CODE: 591,
    CIT_NAME_EN: 'BIDAI SUWAYQAH',
    CIT_NAME_AR: 'بدائع سويقة',
  },
  {
    CIT_CODE: 592,
    CIT_NAME_EN: 'AS SULUBIYAH',
    CIT_NAME_AR: 'الصلبية',
  },
  {
    CIT_CODE: 594,
    CIT_NAME_EN: "MAZARI' AR RAWDAH",
    CIT_NAME_AR: 'مزارع الروضة',
  },
  {
    CIT_CODE: 595,
    CIT_NAME_EN: 'HURMULAH',
    CIT_NAME_AR: 'هرمولة',
  },
  {
    CIT_CODE: 596,
    CIT_NAME_EN: 'FAIDAT ABAN ALAHMAR',
    CIT_NAME_AR: 'فيضة ابان الاحمر',
  },
  {
    CIT_CODE: 598,
    CIT_NAME_EN: 'MUTRIBAH',
    CIT_NAME_AR: 'مطربة',
  },
  {
    CIT_CODE: 599,
    CIT_NAME_EN: 'RAGHLAH',
    CIT_NAME_AR: 'رغلة',
  },
  {
    CIT_CODE: 601,
    CIT_NAME_EN: 'DABBAH',
    CIT_NAME_AR: 'ضبة',
  },
  {
    CIT_CODE: 602,
    CIT_NAME_EN: "AL 'ATAWI",
    CIT_NAME_AR: 'العطاوي',
  },
  {
    CIT_CODE: 603,
    CIT_NAME_EN: 'AL HAFAIR',
    CIT_NAME_AR: 'الحفائر',
  },
  {
    CIT_CODE: 604,
    CIT_NAME_EN: "MAZARI' TINAN",
    CIT_NAME_AR: 'مزارع طينان',
  },
  {
    CIT_CODE: 606,
    CIT_NAME_EN: "QUWAY'AN",
    CIT_NAME_AR: 'قويعان',
  },
  {
    CIT_CODE: 607,
    CIT_NAME_EN: 'AL HANABIJ',
    CIT_NAME_AR: 'الحنابج',
  },
  {
    CIT_CODE: 608,
    CIT_NAME_EN: 'ASH SHIFALLAHIYAH',
    CIT_NAME_AR: 'الشفلحية',
  },
  {
    CIT_CODE: 609,
    CIT_NAME_EN: 'RAWDAT WUTHAYLAN',
    CIT_NAME_AR: 'روضة وثيلان',
  },
  {
    CIT_CODE: 610,
    CIT_NAME_EN: 'ABU RUKAB',
    CIT_NAME_AR: 'ابو ركب',
  },
  {
    CIT_CODE: 613,
    CIT_NAME_EN: 'ABU URAYNAH',
    CIT_NAME_AR: 'أبو عرينة',
  },
  {
    CIT_CODE: 614,
    CIT_NAME_EN: "AL FAR'AH",
    CIT_NAME_AR: 'الفرعة',
  },
  {
    CIT_CODE: 615,
    CIT_NAME_EN: 'BIHAR AL JADID',
    CIT_NAME_AR: 'بحار الجديد',
  },
  {
    CIT_CODE: 616,
    CIT_NAME_EN: 'HAMAYYAN',
    CIT_NAME_AR: 'حميان',
  },
  {
    CIT_CODE: 619,
    CIT_NAME_EN: 'NUMAILEEN',
    CIT_NAME_AR: 'نميلين',
  },
  {
    CIT_CODE: 620,
    CIT_NAME_EN: 'AD DAHASIYAH',
    CIT_NAME_AR: 'الدهاسية',
  },
  {
    CIT_CODE: 621,
    CIT_NAME_EN: 'AL MASLUM',
    CIT_NAME_AR: 'المصلوم',
  },
  {
    CIT_CODE: 623,
    CIT_NAME_EN: 'UMM RUDMAH',
    CIT_NAME_AR: 'أم رضمة',
  },
  {
    CIT_CODE: 624,
    CIT_NAME_EN: 'AS SINNARIYAH',
    CIT_NAME_AR: 'السنارية',
  },
  {
    CIT_CODE: 625,
    CIT_NAME_EN: 'AD DIRIRAH',
    CIT_NAME_AR: 'الديرية',
  },
  {
    CIT_CODE: 626,
    CIT_NAME_EN: 'AL MIGHZAL',
    CIT_NAME_AR: 'المغزل',
  },
  {
    CIT_CODE: 627,
    CIT_NAME_EN: 'JUBAH',
    CIT_NAME_AR: 'جوباح',
  },
  {
    CIT_CODE: 628,
    CIT_NAME_EN: 'AL QURNAH',
    CIT_NAME_AR: 'القرنة',
  },
  {
    CIT_CODE: 630,
    CIT_NAME_EN: "AYN AS SUWAYNI'",
    CIT_NAME_AR: 'عين الصوينع',
  },
  {
    CIT_CODE: 631,
    CIT_NAME_EN: 'AL ARTAWI',
    CIT_NAME_AR: 'الأرطاوي',
  },
  {
    CIT_CODE: 632,
    CIT_NAME_EN: 'ATH THIDUWAH',
    CIT_NAME_AR: 'الثندوة',
  },
  {
    CIT_CODE: 633,
    CIT_NAME_EN: 'ABU JILAL',
    CIT_NAME_AR: 'أبو جلال',
  },
  {
    CIT_CODE: 634,
    CIT_NAME_EN: 'JANUB AL BURUD',
    CIT_NAME_AR: 'جنوب البرود',
  },
  {
    CIT_CODE: 635,
    CIT_NAME_EN: 'GHARB AL BURUD',
    CIT_NAME_AR: 'غرب البرود',
  },
  {
    CIT_CODE: 636,
    CIT_NAME_EN: 'AR RISHIYAH',
    CIT_NAME_AR: 'الريشية',
  },
  {
    CIT_CODE: 638,
    CIT_NAME_EN: "MAZRA'AT AL BIDAH",
    CIT_NAME_AR: 'مزرعة البيضة',
  },
  {
    CIT_CODE: 639,
    CIT_NAME_EN: 'AS SULAYSIYAH',
    CIT_NAME_AR: 'السليسية',
  },
  {
    CIT_CODE: 640,
    CIT_NAME_EN: "MAZRA'AT SULAYSAN",
    CIT_NAME_AR: 'مزرعة سليسان',
  },
  {
    CIT_CODE: 641,
    CIT_NAME_EN: "AL 'UWAYJA",
    CIT_NAME_AR: 'العويجاء',
  },
  {
    CIT_CODE: 644,
    CIT_NAME_EN: "BADA'I AL HAMJAH",
    CIT_NAME_AR: 'بدائع الهمجة',
  },
  {
    CIT_CODE: 645,
    CIT_NAME_EN: 'FAYDAT AL QUWAZIN',
    CIT_NAME_AR: 'فيضة القوازين',
  },
  {
    CIT_CODE: 646,
    CIT_NAME_EN: "MAZARI' MUSAYQIRAT",
    CIT_NAME_AR: 'مزارع مصيقرة',
  },
  {
    CIT_CODE: 647,
    CIT_NAME_EN: 'AL FAYHA',
    CIT_NAME_AR: 'الفيحاء',
  },
  {
    CIT_CODE: 648,
    CIT_NAME_EN: 'AD DASMAH',
    CIT_NAME_AR: 'الدسمة',
  },
  {
    CIT_CODE: 649,
    CIT_NAME_EN: 'SAFFAQAH',
    CIT_NAME_AR: 'صفاقة',
  },
  {
    CIT_CODE: 650,
    CIT_NAME_EN: "QUBAY'AH",
    CIT_NAME_AR: 'قبيعة',
  },
  {
    CIT_CODE: 651,
    CIT_NAME_EN: 'ASH SHUBRUMIYAH',
    CIT_NAME_AR: 'الشبرمية',
  },
  {
    CIT_CODE: 652,
    CIT_NAME_EN: 'KUWAYKIBAH',
    CIT_NAME_AR: 'كويكبة',
  },
  {
    CIT_CODE: 655,
    CIT_NAME_EN: 'AR RAQIBAH',
    CIT_NAME_AR: 'الرقيبة',
  },
  {
    CIT_CODE: 656,
    CIT_NAME_EN: "BID' AS SI'AKI",
    CIT_NAME_AR: 'بدع الصعكي',
  },
  {
    CIT_CODE: 657,
    CIT_NAME_EN: 'SULTANAH',
    CIT_NAME_AR: 'سلطانة',
  },
  {
    CIT_CODE: 659,
    CIT_NAME_EN: 'AL MILAYYINIYAH',
    CIT_NAME_AR: 'الملينية',
  },
  {
    CIT_CODE: 661,
    CIT_NAME_EN: 'RAWDAT JAHAM',
    CIT_NAME_AR: 'روضة جهام',
  },
  {
    CIT_CODE: 662,
    CIT_NAME_EN: "MAZARI' AL JADIDAH",
    CIT_NAME_AR: 'مزارع الجديدة',
  },
  {
    CIT_CODE: 663,
    CIT_NAME_EN: 'MUNIFAT AL MAGHAYIRAH',
    CIT_NAME_AR: 'منيفة المغايرة',
  },
  {
    CIT_CODE: 665,
    CIT_NAME_EN: 'AR RUMAYHAH',
    CIT_NAME_AR: 'الرميحة',
  },
  {
    CIT_CODE: 666,
    CIT_NAME_EN: 'HASU AL HAYD',
    CIT_NAME_AR: 'حسو الحيد',
  },
  {
    CIT_CODE: 667,
    CIT_NAME_EN: 'HUDAYJAH',
    CIT_NAME_AR: 'حديجة',
  },
  {
    CIT_CODE: 670,
    CIT_NAME_EN: 'AD DAMTHI',
    CIT_NAME_AR: 'الدمثي',
  },
  {
    CIT_CODE: 671,
    CIT_NAME_EN: 'UDAKH',
    CIT_NAME_AR: 'أوضاخ',
  },
  {
    CIT_CODE: 672,
    CIT_NAME_EN: 'KABSHAN',
    CIT_NAME_AR: 'كبشان',
  },
  {
    CIT_CODE: 676,
    CIT_NAME_EN: 'AL-JAMSH',
    CIT_NAME_AR: 'الجمش',
  },
  {
    CIT_CODE: 677,
    CIT_NAME_EN: 'NAJKH',
    CIT_NAME_AR: 'نجخ',
  },
  {
    CIT_CODE: 678,
    CIT_NAME_EN: 'JURAYSAH',
    CIT_NAME_AR: 'جريسة',
  },
  {
    CIT_CODE: 679,
    CIT_NAME_EN: "UMM AL 'ATHAKIL",
    CIT_NAME_AR: 'ام العثاكل',
  },
  {
    CIT_CODE: 680,
    CIT_NAME_EN: "ARJA'",
    CIT_NAME_AR: 'عرجاء',
  },
  {
    CIT_CODE: 681,
    CIT_NAME_EN: 'UMM SULAYM',
    CIT_NAME_AR: 'أم سليم',
  },
  {
    CIT_CODE: 686,
    CIT_NAME_EN: 'AL KHUFAYFIYAH',
    CIT_NAME_AR: 'الخفيفية',
  },
  {
    CIT_CODE: 688,
    CIT_NAME_EN: 'ARTAWI AR RAQQAS',
    CIT_NAME_AR: 'أرطاوي الرقاص',
  },
  {
    CIT_CODE: 690,
    CIT_NAME_EN: "MAZRA'AT AL KHUFAYSAH",
    CIT_NAME_AR: 'مزرعة الخفيسة',
  },
  {
    CIT_CODE: 691,
    CIT_NAME_EN: 'AYN AL QANNUR',
    CIT_NAME_AR: 'عين القنور',
  },
  {
    CIT_CODE: 692,
    CIT_NAME_EN: 'AT TASRIR',
    CIT_NAME_AR: 'التسرير',
  },
  {
    CIT_CODE: 693,
    CIT_NAME_EN: 'AL ATHLAH',
    CIT_NAME_AR: 'الاثلة',
  },
  {
    CIT_CODE: 694,
    CIT_NAME_EN: 'URAYFIJAN',
    CIT_NAME_AR: 'عريفيجان',
  },
  {
    CIT_CODE: 695,
    CIT_NAME_EN: 'AS SAKRAN',
    CIT_NAME_AR: 'السكران',
  },
  {
    CIT_CODE: 696,
    CIT_NAME_EN: 'JIFIN',
    CIT_NAME_AR: 'جفن',
  },
  {
    CIT_CODE: 697,
    CIT_NAME_EN: 'AL BURUD',
    CIT_NAME_AR: 'البرود',
  },
  {
    CIT_CODE: 698,
    CIT_NAME_EN: 'JIFANA',
    CIT_NAME_AR: 'جفنا',
  },
  {
    CIT_CODE: 701,
    CIT_NAME_EN: 'AL BIJADIYAH',
    CIT_NAME_AR: 'البجادية',
  },
  {
    CIT_CODE: 702,
    CIT_NAME_EN: "AR RAFAI'",
    CIT_NAME_AR: 'الرفائع',
  },
  {
    CIT_CODE: 703,
    CIT_NAME_EN: "JAHAM ABU 'ISHAR",
    CIT_NAME_AR: 'جهام ابو عشر',
  },
  {
    CIT_CODE: 705,
    CIT_NAME_EN: 'AL HUZAYMIYAH',
    CIT_NAME_AR: 'الحزيمية',
  },
  {
    CIT_CODE: 706,
    CIT_NAME_EN: 'KHUFF',
    CIT_NAME_AR: 'خف',
  },
  {
    CIT_CODE: 707,
    CIT_NAME_EN: 'AL MUHAMMADIYAH',
    CIT_NAME_AR: 'المحمدية',
  },
  {
    CIT_CODE: 709,
    CIT_NAME_EN: 'MASAL',
    CIT_NAME_AR: 'ماسل',
  },
  {
    CIT_CODE: 712,
    CIT_NAME_EN: 'RADWA',
    CIT_NAME_AR: 'رضوى',
  },
  {
    CIT_CODE: 713,
    CIT_NAME_EN: 'ARTAWI HILLIT',
    CIT_NAME_AR: 'ارطاوي حليت',
  },
  {
    CIT_CODE: 714,
    CIT_NAME_EN: 'AWWADAH',
    CIT_NAME_AR: 'عواضة',
  },
  {
    CIT_CODE: 715,
    CIT_NAME_EN: 'SHARARAH',
    CIT_NAME_AR: 'شرارة',
  },
  {
    CIT_CODE: 716,
    CIT_NAME_EN: 'AL HAZIM',
    CIT_NAME_AR: 'الحزم',
  },
  {
    CIT_CODE: 717,
    CIT_NAME_EN: 'SAQRAH',
    CIT_NAME_AR: 'صقرة',
  },
  {
    CIT_CODE: 718,
    CIT_NAME_EN: 'AL UQAYSHIYAH',
    CIT_NAME_AR: 'العقيشية',
  },
  {
    CIT_CODE: 719,
    CIT_NAME_EN: 'AL QURAYN',
    CIT_NAME_AR: 'القرين',
  },
  {
    CIT_CODE: 720,
    CIT_NAME_EN: 'UQLAT AL UWAYRI',
    CIT_NAME_AR: 'عقلة الغويري',
  },
  {
    CIT_CODE: 721,
    CIT_NAME_EN: "UMM ZUMU'",
    CIT_NAME_AR: 'ام زموع',
  },
  {
    CIT_CODE: 722,
    CIT_NAME_EN: 'AYN AL BARAHAH',
    CIT_NAME_AR: 'عين البراحة',
  },
  {
    CIT_CODE: 724,
    CIT_NAME_EN: 'AD DAHAWI',
    CIT_NAME_AR: 'الضحوي',
  },
  {
    CIT_CODE: 726,
    CIT_NAME_EN: 'AL MAGHIB',
    CIT_NAME_AR: 'المغيب',
  },
  {
    CIT_CODE: 727,
    CIT_NAME_EN: 'FAYDAT AL MAFASS',
    CIT_NAME_AR: 'فيضة المفص',
  },
  {
    CIT_CODE: 728,
    CIT_NAME_EN: 'URAYYIDAH',
    CIT_NAME_AR: 'عريدة',
  },
  {
    CIT_CODE: 729,
    CIT_NAME_EN: "ASH SHA'ARA'",
    CIT_NAME_AR: 'الشعراء',
  },
  {
    CIT_CODE: 730,
    CIT_NAME_EN: "AL 'AZIMIYAH",
    CIT_NAME_AR: 'العازمية',
  },
  {
    CIT_CODE: 731,
    CIT_NAME_EN: 'AL MAHAWI',
    CIT_NAME_AR: 'المحوي',
  },
  {
    CIT_CODE: 732,
    CIT_NAME_EN: "AL MUDARRI'",
    CIT_NAME_AR: 'المدرع',
  },
  {
    CIT_CODE: 733,
    CIT_NAME_EN: 'SURURAH',
    CIT_NAME_AR: 'سرورة',
  },
  {
    CIT_CODE: 734,
    CIT_NAME_EN: "ASMA'",
    CIT_NAME_AR: 'عصماء',
  },
  {
    CIT_CODE: 737,
    CIT_NAME_EN: 'MUSAWI',
    CIT_NAME_AR: 'مساوي',
  },
  {
    CIT_CODE: 738,
    CIT_NAME_EN: "AN NIQ'AH",
    CIT_NAME_AR: 'النقعة',
  },
  {
    CIT_CODE: 739,
    CIT_NAME_EN: 'AFQIRAH',
    CIT_NAME_AR: 'افقرا',
  },
  {
    CIT_CODE: 740,
    CIT_NAME_EN: "AR RUFA'",
    CIT_NAME_AR: 'الرفاع',
  },
  {
    CIT_CODE: 741,
    CIT_NAME_EN: 'AL FUQARAH',
    CIT_NAME_AR: 'الفقارة',
  },
  {
    CIT_CODE: 744,
    CIT_NAME_EN: 'AL KHUBBAH',
    CIT_NAME_AR: 'الخبة',
  },
  {
    CIT_CODE: 745,
    CIT_NAME_EN: 'AN NABUWAN',
    CIT_NAME_AR: 'النبوان',
  },
  {
    CIT_CODE: 746,
    CIT_NAME_EN: 'AR RUDIFAH',
    CIT_NAME_AR: 'الرديفة',
  },
  {
    CIT_CODE: 747,
    CIT_NAME_EN: 'AR RISHAWIYAH',
    CIT_NAME_AR: 'الرشاوية',
  },
  {
    CIT_CODE: 749,
    CIT_NAME_EN: 'AL MUSTAJIDDAH',
    CIT_NAME_AR: 'المستجدة',
  },
  {
    CIT_CODE: 750,
    CIT_NAME_EN: 'AL AMIRIYAH',
    CIT_NAME_AR: 'العامرية',
  },
  {
    CIT_CODE: 752,
    CIT_NAME_EN: 'ADH DHALMAWI',
    CIT_NAME_AR: 'الظلماوي',
  },
  {
    CIT_CODE: 753,
    CIT_NAME_EN: 'SHUBAYRIMAH',
    CIT_NAME_AR: 'شبيرمة',
  },
  {
    CIT_CODE: 754,
    CIT_NAME_EN: 'ISAM',
    CIT_NAME_AR: 'عصام',
  },
  {
    CIT_CODE: 755,
    CIT_NAME_EN: 'ABBADAH',
    CIT_NAME_AR: 'عبادة',
  },
  {
    CIT_CODE: 756,
    CIT_NAME_EN: 'AL HAYD',
    CIT_NAME_AR: 'الحيد',
  },
  {
    CIT_CODE: 757,
    CIT_NAME_EN: "AL 'ABAL",
    CIT_NAME_AR: 'العبل',
  },
  {
    CIT_CODE: 758,
    CIT_NAME_EN: 'ARTAWI AL HAMAMID',
    CIT_NAME_AR: 'ارطاوي الحماميد',
  },
  {
    CIT_CODE: 759,
    CIT_NAME_EN: "BADAI' IBN NAJIM",
    CIT_NAME_AR: 'بدائع ابن نجم',
  },
  {
    CIT_CODE: 760,
    CIT_NAME_EN: 'AL MARRIYAH',
    CIT_NAME_AR: 'المرية',
  },
  {
    CIT_CODE: 761,
    CIT_NAME_EN: 'ASH SHUQRAN',
    CIT_NAME_AR: 'الشقران',
  },
  {
    CIT_CODE: 762,
    CIT_NAME_EN: 'AL KURAYZIYAH',
    CIT_NAME_AR: 'الكريزية',
  },
  {
    CIT_CODE: 763,
    CIT_NAME_EN: 'DHARAH',
    CIT_NAME_AR: 'ذارة',
  },
  {
    CIT_CODE: 765,
    CIT_NAME_EN: "RAHBAT 'ALLUSH",
    CIT_NAME_AR: 'رحبة علوش',
  },
  {
    CIT_CODE: 768,
    CIT_NAME_EN: 'SABHA',
    CIT_NAME_AR: 'صبحا',
  },
  {
    CIT_CODE: 769,
    CIT_NAME_EN: 'HAZRAH',
    CIT_NAME_AR: 'حزرة',
  },
  {
    CIT_CODE: 770,
    CIT_NAME_EN: 'GHURAB',
    CIT_NAME_AR: 'غراب',
  },
  {
    CIT_CODE: 771,
    CIT_NAME_EN: 'AL HIJRIYAH',
    CIT_NAME_AR: 'الحجرية',
  },
  {
    CIT_CODE: 772,
    CIT_NAME_EN: 'ABU MUGHAYR',
    CIT_NAME_AR: 'أبو مغير',
  },
  {
    CIT_CODE: 773,
    CIT_NAME_EN: "AL 'IDD",
    CIT_NAME_AR: 'العد',
  },
  {
    CIT_CODE: 774,
    CIT_NAME_EN: 'AR RABTAH',
    CIT_NAME_AR: 'الربثة',
  },
  {
    CIT_CODE: 775,
    CIT_NAME_EN: 'AL BIRKAH',
    CIT_NAME_AR: 'البركة',
  },
  {
    CIT_CODE: 776,
    CIT_NAME_EN: 'AN NAFAZI',
    CIT_NAME_AR: 'النفازي',
  },
  {
    CIT_CODE: 777,
    CIT_NAME_EN: 'AL-HNAKYAH',
    CIT_NAME_AR: 'الحناكية',
  },
  {
    CIT_CODE: 778,
    CIT_NAME_EN: 'AL MAHAFFAR',
    CIT_NAME_AR: 'المحفر',
  },
  {
    CIT_CODE: 780,
    CIT_NAME_EN: 'AS SAMAD',
    CIT_NAME_AR: 'الصمد',
  },
  {
    CIT_CODE: 781,
    CIT_NAME_EN: 'AD DUMAYRIYAH',
    CIT_NAME_AR: 'الضميرية',
  },
  {
    CIT_CODE: 783,
    CIT_NAME_EN: 'AL HISU',
    CIT_NAME_AR: 'الحسو',
  },
  {
    CIT_CODE: 785,
    CIT_NAME_EN: 'SUKHAYBIRAH',
    CIT_NAME_AR: 'صخيبرة',
  },
  {
    CIT_CODE: 786,
    CIT_NAME_EN: 'HADBAN',
    CIT_NAME_AR: 'هدبان',
  },
  {
    CIT_CODE: 787,
    CIT_NAME_EN: 'BILGHAH',
    CIT_NAME_AR: 'بلغة',
  },
  {
    CIT_CODE: 788,
    CIT_NAME_EN: 'AL MAWIYAH',
    CIT_NAME_AR: 'الماوية',
  },
  {
    CIT_CODE: 789,
    CIT_NAME_EN: 'QUSAYRAH',
    CIT_NAME_AR: 'قصيرة',
  },
  {
    CIT_CODE: 790,
    CIT_NAME_EN: 'AL AWSHAZI',
    CIT_NAME_AR: 'العوشزي',
  },
  {
    CIT_CODE: 792,
    CIT_NAME_EN: 'TALAL',
    CIT_NAME_AR: 'طلال',
  },
  {
    CIT_CODE: 794,
    CIT_NAME_EN: 'AT TAWQI',
    CIT_NAME_AR: 'الطوقي',
  },
  {
    CIT_CODE: 796,
    CIT_NAME_EN: 'MALHAM',
    CIT_NAME_AR: 'ملهم',
  },
  {
    CIT_CODE: 797,
    CIT_NAME_EN: 'SUDUS',
    CIT_NAME_AR: 'سدوس',
  },
  {
    CIT_CODE: 798,
    CIT_NAME_EN: 'HIZWA',
    CIT_NAME_AR: 'حزوى',
  },
  {
    CIT_CODE: 799,
    CIT_NAME_EN: 'DIQALAH',
    CIT_NAME_AR: 'دقلة',
  },
  {
    CIT_CODE: 800,
    CIT_NAME_EN: 'HULAYFAH',
    CIT_NAME_AR: 'حليفة',
  },
  {
    CIT_CODE: 801,
    CIT_NAME_EN: 'SULBUKH',
    CIT_NAME_AR: 'صلبوخ',
  },
  {
    CIT_CODE: 802,
    CIT_NAME_EN: 'AL BARRAH',
    CIT_NAME_AR: 'البرة',
  },
  {
    CIT_CODE: 803,
    CIT_NAME_EN: 'AL UWAYNID',
    CIT_NAME_AR: 'العويند',
  },
  {
    CIT_CODE: 804,
    CIT_NAME_EN: 'AL BUWAYB',
    CIT_NAME_AR: 'البويب',
  },
  {
    CIT_CODE: 805,
    CIT_NAME_EN: 'UYAYNAH',
    CIT_NAME_AR: 'عيينة',
  },
  {
    CIT_CODE: 806,
    CIT_NAME_EN: 'IBN GHANNAM',
    CIT_NAME_AR: 'إبن غنام',
  },
  {
    CIT_CODE: 807,
    CIT_NAME_EN: 'AL GHANAMIYAH',
    CIT_NAME_AR: 'الغنامية',
  },
  {
    CIT_CODE: 808,
    CIT_NAME_EN: "AL 'AMMAJ",
    CIT_NAME_AR: 'العماج',
  },
  {
    CIT_CODE: 809,
    CIT_NAME_EN: 'HIT',
    CIT_NAME_AR: 'هيت',
  },
  {
    CIT_CODE: 811,
    CIT_NAME_EN: 'KAHF BARMAH',
    CIT_NAME_AR: 'كهف برمة',
  },
  {
    CIT_CODE: 812,
    CIT_NAME_EN: 'BANBAN',
    CIT_NAME_AR: 'بنبان',
  },
  {
    CIT_CODE: 813,
    CIT_NAME_EN: 'ATH THUMAMAH',
    CIT_NAME_AR: 'الثمامة',
  },
  {
    CIT_CODE: 814,
    CIT_NAME_EN: 'LABAN',
    CIT_NAME_AR: 'لبن',
  },
  {
    CIT_CODE: 815,
    CIT_NAME_EN: "AL 'URAYDIYAH",
    CIT_NAME_AR: 'العريدية',
  },
  {
    CIT_CODE: 816,
    CIT_NAME_EN: "AL 'ABBASIYAH",
    CIT_NAME_AR: 'العباسية',
  },
  {
    CIT_CODE: 819,
    CIT_NAME_EN: "THARMADA'",
    CIT_NAME_AR: 'ثرمداء',
  },
  {
    CIT_CODE: 820,
    CIT_NAME_EN: 'MRAT',
    CIT_NAME_AR: 'مرات',
  },
  {
    CIT_CODE: 821,
    CIT_NAME_EN: 'UTHAYTHIYAH',
    CIT_NAME_AR: 'أثيثية',
  },
  {
    CIT_CODE: 822,
    CIT_NAME_EN: 'LABKHAH',
    CIT_NAME_AR: 'لبخة',
  },
  {
    CIT_CODE: 823,
    CIT_NAME_EN: 'RAWDAT AL FARAS',
    CIT_NAME_AR: 'روضة الفرس',
  },
  {
    CIT_CODE: 825,
    CIT_NAME_EN: 'HUWAYTAH',
    CIT_NAME_AR: 'حويتة',
  },
  {
    CIT_CODE: 826,
    CIT_NAME_EN: 'AT TAWILAH',
    CIT_NAME_AR: 'الطويلة',
  },
  {
    CIT_CODE: 827,
    CIT_NAME_EN: 'UBAYR',
    CIT_NAME_AR: 'أوبير',
  },
  {
    CIT_CODE: 829,
    CIT_NAME_EN: 'IRQAH',
    CIT_NAME_AR: 'عرقة',
  },
  {
    CIT_CODE: 831,
    CIT_NAME_EN: 'AL WUSAYL',
    CIT_NAME_AR: 'الوصيل',
  },
  {
    CIT_CODE: 832,
    CIT_NAME_EN: 'ABA AL KIBASH',
    CIT_NAME_AR: 'أبا الكباش',
  },
  {
    CIT_CODE: 833,
    CIT_NAME_EN: 'AL JUBAYLAH',
    CIT_NAME_AR: 'الجبيلة',
  },
  {
    CIT_CODE: 834,
    CIT_NAME_EN: "AL 'AMMARIYAH",
    CIT_NAME_AR: 'العمارية',
  },
  {
    CIT_CODE: 835,
    CIT_NAME_EN: 'BAWDAH',
    CIT_NAME_AR: 'بوضة',
  },
  {
    CIT_CODE: 837,
    CIT_NAME_EN: 'QASR AL QURAYNAH',
    CIT_NAME_AR: 'قصر القرينة',
  },
  {
    CIT_CODE: 838,
    CIT_NAME_EN: 'QASR FAYHAQ',
    CIT_NAME_AR: 'قصر فيهق',
  },
  {
    CIT_CODE: 840,
    CIT_NAME_EN: 'QUSUR AL MUQBIL',
    CIT_NAME_AR: 'قصور المقبل',
  },
  {
    CIT_CODE: 841,
    CIT_NAME_EN: 'AL GHUTGHUT',
    CIT_NAME_AR: 'الغطغط',
  },
  {
    CIT_CODE: 842,
    CIT_NAME_EN: 'QASR IBN SHUHAYL',
    CIT_NAME_AR: 'قصر ابن شهيل',
  },
  {
    CIT_CODE: 843,
    CIT_NAME_EN: 'AL MAGHRAFIYAH',
    CIT_NAME_AR: 'المغرفية',
  },
  {
    CIT_CODE: 844,
    CIT_NAME_EN: 'JAWW',
    CIT_NAME_AR: 'جو',
  },
  {
    CIT_CODE: 845,
    CIT_NAME_EN: 'AL GHUZAYZ',
    CIT_NAME_AR: 'الغزيز',
  },
  {
    CIT_CODE: 846,
    CIT_NAME_EN: 'ATH THUMAMY',
    CIT_NAME_AR: 'الثمامي',
  },
  {
    CIT_CODE: 847,
    CIT_NAME_EN: "WA'ALAH",
    CIT_NAME_AR: 'وعلة',
  },
  {
    CIT_CODE: 848,
    CIT_NAME_EN: 'ASH SHAMANIYAH',
    CIT_NAME_AR: 'الشامانية',
  },
  {
    CIT_CODE: 849,
    CIT_NAME_EN: 'AL QUSURIYAH',
    CIT_NAME_AR: 'القصورية',
  },
  {
    CIT_CODE: 850,
    CIT_NAME_EN: 'MAZALLAH',
    CIT_NAME_AR: 'مزلة',
  },
  {
    CIT_CODE: 851,
    CIT_NAME_EN: 'USAYLAH',
    CIT_NAME_AR: 'عصيلة',
  },
  {
    CIT_CODE: 852,
    CIT_NAME_EN: 'ASH SHAWAH',
    CIT_NAME_AR: 'الشواة',
  },
  {
    CIT_CODE: 853,
    CIT_NAME_EN: 'ILAYYAN',
    CIT_NAME_AR: 'عليان',
  },
  {
    CIT_CODE: 854,
    CIT_NAME_EN: 'IDAN',
    CIT_NAME_AR: 'عيدان',
  },
  {
    CIT_CODE: 855,
    CIT_NAME_EN: 'SAYH AD DUBUL',
    CIT_NAME_AR: 'سيح الدبول',
  },
  {
    CIT_CODE: 856,
    CIT_NAME_EN: 'AL HAMJAH',
    CIT_NAME_AR: 'الهمجة',
  },
  {
    CIT_CODE: 857,
    CIT_NAME_EN: 'ABU SUDAIRAH',
    CIT_NAME_AR: 'أبو سديرة',
  },
  {
    CIT_CODE: 858,
    CIT_NAME_EN: 'AL KADRAH',
    CIT_NAME_AR: 'الكدرة',
  },
  {
    CIT_CODE: 861,
    CIT_NAME_EN: 'AD DUWAYRAH',
    CIT_NAME_AR: 'الدويرة',
  },
  {
    CIT_CODE: 862,
    CIT_NAME_EN: 'ABU MARWAH',
    CIT_NAME_AR: 'أبو مروة',
  },
  {
    CIT_CODE: 863,
    CIT_NAME_EN: 'SAMAH',
    CIT_NAME_AR: 'سماح',
  },
  {
    CIT_CODE: 865,
    CIT_NAME_EN: 'DAHIS',
    CIT_NAME_AR: 'داحس',
  },
  {
    CIT_CODE: 866,
    CIT_NAME_EN: 'DASMAN',
    CIT_NAME_AR: 'دسمان',
  },
  {
    CIT_CODE: 867,
    CIT_NAME_EN: "AL 'UWAYSIYAH",
    CIT_NAME_AR: 'العويسية',
  },
  {
    CIT_CODE: 868,
    CIT_NAME_EN: "AL 'ULAYYA",
    CIT_NAME_AR: 'العلياء',
  },
  {
    CIT_CODE: 869,
    CIT_NAME_EN: "MAZRA'AT MIZ'ILAH",
    CIT_NAME_AR: 'مزرعة مزعلة',
  },
  {
    CIT_CODE: 870,
    CIT_NAME_EN: 'AL QAWSAH',
    CIT_NAME_AR: 'القوسة',
  },
  {
    CIT_CODE: 871,
    CIT_NAME_EN: 'AR RAWGH',
    CIT_NAME_AR: 'الروغ',
  },
  {
    CIT_CODE: 872,
    CIT_NAME_EN: 'AL WUSAYTA',
    CIT_NAME_AR: 'الوسيطاء',
  },
  {
    CIT_CODE: 873,
    CIT_NAME_EN: "AL BU'AYTHIYAH",
    CIT_NAME_AR: 'البعيثية',
  },
  {
    CIT_CODE: 874,
    CIT_NAME_EN: 'ASH SHATLANIYAH',
    CIT_NAME_AR: 'الشتلانية',
  },
  {
    CIT_CODE: 875,
    CIT_NAME_EN: 'JADDALAH',
    CIT_NAME_AR: 'جدالة',
  },
  {
    CIT_CODE: 876,
    CIT_NAME_EN: 'QAFARAH',
    CIT_NAME_AR: 'قفرة',
  },
  {
    CIT_CODE: 877,
    CIT_NAME_EN: 'AJZALA',
    CIT_NAME_AR: 'أجزالا',
  },
  {
    CIT_CODE: 878,
    CIT_NAME_EN: 'AL JAFARAH',
    CIT_NAME_AR: 'الجفارة',
  },
  {
    CIT_CODE: 879,
    CIT_NAME_EN: 'GHAWDAH',
    CIT_NAME_AR: 'غودة',
  },
  {
    CIT_CODE: 882,
    CIT_NAME_EN: 'SANAM',
    CIT_NAME_AR: 'سنام',
  },
  {
    CIT_CODE: 883,
    CIT_NAME_EN: "AR RAJ'",
    CIT_NAME_AR: 'الرجع',
  },
  {
    CIT_CODE: 886,
    CIT_NAME_EN: 'AL KHUNAYQIYAH',
    CIT_NAME_AR: 'الخنيقية',
  },
  {
    CIT_CODE: 887,
    CIT_NAME_EN: 'AN NASIFAH',
    CIT_NAME_AR: 'الناصفة',
  },
  {
    CIT_CODE: 888,
    CIT_NAME_EN: 'AL MATHNAH',
    CIT_NAME_AR: 'المثناة',
  },
  {
    CIT_CODE: 889,
    CIT_NAME_EN: 'JELLAH',
    CIT_NAME_AR: 'الجله',
  },
  {
    CIT_CODE: 890,
    CIT_NAME_EN: 'AR RABWA',
    CIT_NAME_AR: 'الربواء',
  },
  {
    CIT_CODE: 891,
    CIT_NAME_EN: "LAJ'AH",
    CIT_NAME_AR: 'لجعة',
  },
  {
    CIT_CODE: 892,
    CIT_NAME_EN: 'NUKHAYLAN',
    CIT_NAME_AR: 'نخيلان',
  },
  {
    CIT_CODE: 893,
    CIT_NAME_EN: 'INAN',
    CIT_NAME_AR: 'عنان',
  },
  {
    CIT_CODE: 894,
    CIT_NAME_EN: 'AL-BEDE',
    CIT_NAME_AR: 'البدع',
  },
  {
    CIT_CODE: 895,
    CIT_NAME_EN: 'SABHA',
    CIT_NAME_AR: 'صبحاء',
  },
  {
    CIT_CODE: 896,
    CIT_NAME_EN: 'AL QASR',
    CIT_NAME_AR: 'القصر',
  },
  {
    CIT_CODE: 898,
    CIT_NAME_EN: 'THELM',
    CIT_NAME_AR: 'ظلم',
  },
  {
    CIT_CODE: 899,
    CIT_NAME_EN: 'AL KHAFASHAH',
    CIT_NAME_AR: 'الخفاشة',
  },
  {
    CIT_CODE: 900,
    CIT_NAME_EN: 'BARASH',
    CIT_NAME_AR: 'براش',
  },
  {
    CIT_CODE: 901,
    CIT_NAME_EN: 'ASH SHARIF',
    CIT_NAME_AR: 'الشريف',
  },
  {
    CIT_CODE: 902,
    CIT_NAME_EN: 'JELLAH AND TEBRAK',
    CIT_NAME_AR: 'الجلة وتبراك',
  },
  {
    CIT_CODE: 904,
    CIT_NAME_EN: 'HARJAL',
    CIT_NAME_AR: 'حرجل',
  },
  {
    CIT_CODE: 905,
    CIT_NAME_EN: 'HIDAYL',
    CIT_NAME_AR: 'هديل',
  },
  {
    CIT_CODE: 906,
    CIT_NAME_EN: 'UMM AL HISN',
    CIT_NAME_AR: 'ام الحصن',
  },
  {
    CIT_CODE: 907,
    CIT_NAME_EN: 'AL LAHYAN',
    CIT_NAME_AR: 'اللحيان',
  },
  {
    CIT_CODE: 908,
    CIT_NAME_EN: 'AL ASRAB',
    CIT_NAME_AR: 'الاسراب',
  },
  {
    CIT_CODE: 909,
    CIT_NAME_EN: 'AL ATHRIYAH',
    CIT_NAME_AR: 'العثرية',
  },
  {
    CIT_CODE: 910,
    CIT_NAME_EN: 'AL WATAH',
    CIT_NAME_AR: 'الوطاة',
  },
  {
    CIT_CODE: 911,
    CIT_NAME_EN: 'GHUDAYY',
    CIT_NAME_AR: 'غضي',
  },
  {
    CIT_CODE: 912,
    CIT_NAME_EN: 'AL HAYTAN',
    CIT_NAME_AR: 'الحيطان',
  },
  {
    CIT_CODE: 913,
    CIT_NAME_EN: 'AS SARIF',
    CIT_NAME_AR: 'الصريف',
  },
  {
    CIT_CODE: 914,
    CIT_NAME_EN: 'AL FAYZIYAH',
    CIT_NAME_AR: 'الفايزية',
  },
  {
    CIT_CODE: 915,
    CIT_NAME_EN: "AS SU'AYBIYAH",
    CIT_NAME_AR: 'الصعيبية',
  },
  {
    CIT_CODE: 916,
    CIT_NAME_EN: "NUQRAT AL 'AMARIN",
    CIT_NAME_AR: 'نقرة العمارين',
  },
  {
    CIT_CODE: 917,
    CIT_NAME_EN: 'RUGHAYLAH',
    CIT_NAME_AR: 'رغيلة',
  },
  {
    CIT_CODE: 918,
    CIT_NAME_EN: "MAZARI' AD DAGHMANIYAT",
    CIT_NAME_AR: 'مزارع الدغمانيات',
  },
  {
    CIT_CODE: 919,
    CIT_NAME_EN: "MAZARI' AR RASHID",
    CIT_NAME_AR: 'مزارع الراشد',
  },
  {
    CIT_CODE: 922,
    CIT_NAME_EN: 'ABLAQ',
    CIT_NAME_AR: 'أبلق',
  },
  {
    CIT_CODE: 923,
    CIT_NAME_EN: 'DIRAS',
    CIT_NAME_AR: 'ضراس',
  },
  {
    CIT_CODE: 924,
    CIT_NAME_EN: 'UMM MAKRIYAH',
    CIT_NAME_AR: 'أم مكرية',
  },
  {
    CIT_CODE: 925,
    CIT_NAME_EN: 'AL KHINNASAH',
    CIT_NAME_AR: 'الخناصة',
  },
  {
    CIT_CODE: 926,
    CIT_NAME_EN: "MAZARI' AS SUQAYRIYAT",
    CIT_NAME_AR: 'مزارع الصقيريات',
  },
  {
    CIT_CODE: 927,
    CIT_NAME_EN: 'RIYAD AR RIMAH',
    CIT_NAME_AR: 'رياض الرماح',
  },
  {
    CIT_CODE: 929,
    CIT_NAME_EN: 'RAWD IBN KUMAYYAN',
    CIT_NAME_AR: 'روض ابن كميان',
  },
  {
    CIT_CODE: 930,
    CIT_NAME_EN: 'AL QARU',
    CIT_NAME_AR: 'القرو',
  },
  {
    CIT_CODE: 931,
    CIT_NAME_EN: 'AL HADIDIYAH',
    CIT_NAME_AR: 'الحديدية',
  },
  {
    CIT_CODE: 932,
    CIT_NAME_EN: "AL BI'ITHAH",
    CIT_NAME_AR: 'البعيثة',
  },
  {
    CIT_CODE: 933,
    CIT_NAME_EN: 'AS SUGHAYRIYAH',
    CIT_NAME_AR: 'الصغيرية',
  },
  {
    CIT_CODE: 934,
    CIT_NAME_EN: 'HUWAYLAN',
    CIT_NAME_AR: 'حويلان',
  },
  {
    CIT_CODE: 935,
    CIT_NAME_EN: 'AS SUBAKH',
    CIT_NAME_AR: 'الصباخ',
  },
  {
    CIT_CODE: 936,
    CIT_NAME_EN: 'AL LUSAYB',
    CIT_NAME_AR: 'اللسيب',
  },
  {
    CIT_CODE: 937,
    CIT_NAME_EN: "AD DA'ISAH",
    CIT_NAME_AR: 'الدعيسة',
  },
  {
    CIT_CODE: 938,
    CIT_NAME_EN: "AL 'AQUL",
    CIT_NAME_AR: 'العاقول',
  },
  {
    CIT_CODE: 939,
    CIT_NAME_EN: 'AL BUSUR',
    CIT_NAME_AR: 'البصر',
  },
  {
    CIT_CODE: 940,
    CIT_NAME_EN: 'AL MURAYSHDIYAH',
    CIT_NAME_AR: 'المريشدية',
  },
  {
    CIT_CODE: 941,
    CIT_NAME_EN: 'AT TURFIYAH',
    CIT_NAME_AR: 'الطرفية',
  },
  {
    CIT_CODE: 943,
    CIT_NAME_EN: "AL MULAYDA'",
    CIT_NAME_AR: 'المليداء',
  },
  {
    CIT_CODE: 945,
    CIT_NAME_EN: 'MIHIR AT TURMUS',
    CIT_NAME_AR: 'محير الترمس',
  },
  {
    CIT_CODE: 946,
    CIT_NAME_EN: 'SHARI',
    CIT_NAME_AR: 'شري',
  },
  {
    CIT_CODE: 947,
    CIT_NAME_EN: "ASH SHIQQAH AL 'ULYA",
    CIT_NAME_AR: 'الشقة العليا',
  },
  {
    CIT_CODE: 948,
    CIT_NAME_EN: 'ASH SHIQQAH AS SUFLAH',
    CIT_NAME_AR: 'الشقة السفلى',
  },
  {
    CIT_CODE: 949,
    CIT_NAME_EN: 'AZ ZUBAYRAH',
    CIT_NAME_AR: 'الزبيرة',
  },
  {
    CIT_CODE: 951,
    CIT_NAME_EN: 'AL QUWARAH',
    CIT_NAME_AR: 'القوارة',
  },
  {
    CIT_CODE: 952,
    CIT_NAME_EN: 'AL HUDAYYAH',
    CIT_NAME_AR: 'الهدية',
  },
  {
    CIT_CODE: 953,
    CIT_NAME_EN: 'AL GHAMMAS',
    CIT_NAME_AR: 'الغماس',
  },
  {
    CIT_CODE: 954,
    CIT_NAME_EN: 'MUDARRAJ',
    CIT_NAME_AR: 'مدرج',
  },
  {
    CIT_CODE: 956,
    CIT_NAME_EN: 'UMM SURAYHAH',
    CIT_NAME_AR: 'أم سريحة',
  },
  {
    CIT_CODE: 957,
    CIT_NAME_EN: "AL KHARWA'IYAH",
    CIT_NAME_AR: 'الخروعية',
  },
  {
    CIT_CODE: 958,
    CIT_NAME_EN: 'AL MAJDHAMIYAH',
    CIT_NAME_AR: 'المجذمية',
  },
  {
    CIT_CODE: 959,
    CIT_NAME_EN: 'AL HUFAYYIRAH / HASAT QAHTAN',
    CIT_NAME_AR: 'الحفيرة / حصاة قحطان',
  },
  {
    CIT_CODE: 960,
    CIT_NAME_EN: 'AL HARMALIYAH',
    CIT_NAME_AR: 'الحرملية',
  },
  {
    CIT_CODE: 961,
    CIT_NAME_EN: 'KHABRA ATH THAWIR',
    CIT_NAME_AR: 'خبراء الثوير',
  },
  {
    CIT_CODE: 963,
    CIT_NAME_EN: 'MUHAIRIQAH',
    CIT_NAME_AR: 'محيرقة',
  },
  {
    CIT_CODE: 964,
    CIT_NAME_EN: 'MARQAN',
    CIT_NAME_AR: 'مرقان',
  },
  {
    CIT_CODE: 965,
    CIT_NAME_EN: 'UMM NAKHILAH',
    CIT_NAME_AR: 'ام نخيلة',
  },
  {
    CIT_CODE: 966,
    CIT_NAME_EN: 'UMM AD DIBAY',
    CIT_NAME_AR: 'ام الدبي',
  },
  {
    CIT_CODE: 967,
    CIT_NAME_EN: 'KHABRA HALWAH',
    CIT_NAME_AR: 'خبراء حلوة',
  },
  {
    CIT_CODE: 968,
    CIT_NAME_EN: 'HUJAILA',
    CIT_NAME_AR: 'حجيلا',
  },
  {
    CIT_CODE: 969,
    CIT_NAME_EN: 'AL FUWAYLIQ',
    CIT_NAME_AR: 'الفويلق',
  },
  {
    CIT_CODE: 970,
    CIT_NAME_EN: "AL QUWAY'",
    CIT_NAME_AR: 'القويع',
  },
  {
    CIT_CODE: 971,
    CIT_NAME_EN: "MIZ'IL",
    CIT_NAME_AR: 'مزعل',
  },
  {
    CIT_CODE: 972,
    CIT_NAME_EN: "BADAI' AL MASHA'ILAH",
    CIT_NAME_AR: 'بدائع المشاعلة',
  },
  {
    CIT_CODE: 973,
    CIT_NAME_EN: 'KHABRA FARAN',
    CIT_NAME_AR: 'خبراء فاران',
  },
  {
    CIT_CODE: 974,
    CIT_NAME_EN: 'KHUBAYB AR RIM',
    CIT_NAME_AR: 'خبيب الريم',
  },
  {
    CIT_CODE: 976,
    CIT_NAME_EN: 'UMM TULAYH',
    CIT_NAME_AR: 'أم طليح',
  },
  {
    CIT_CODE: 977,
    CIT_NAME_EN: "AL MANI'IYAH",
    CIT_NAME_AR: 'المانعية',
  },
  {
    CIT_CODE: 983,
    CIT_NAME_EN: 'HAJRUFAH',
    CIT_NAME_AR: 'حجرفة',
  },
  {
    CIT_CODE: 984,
    CIT_NAME_EN: "MA'ANIQ",
    CIT_NAME_AR: 'معانيق',
  },
  {
    CIT_CODE: 985,
    CIT_NAME_EN: 'AS SAYHAD',
    CIT_NAME_AR: 'الصيهد',
  },
  {
    CIT_CODE: 986,
    CIT_NAME_EN: 'AL LAGHFAH',
    CIT_NAME_AR: 'اللغفة',
  },
  {
    CIT_CODE: 987,
    CIT_NAME_EN: 'AL KHAFAQ AL JADID',
    CIT_NAME_AR: 'الخفق الجديد',
  },
  {
    CIT_CODE: 988,
    CIT_NAME_EN: 'DHALMA',
    CIT_NAME_AR: 'ظلماء',
  },
  {
    CIT_CODE: 989,
    CIT_NAME_EN: 'AL KHALAIQ ASH SHARQIYAH',
    CIT_NAME_AR: 'الخلائق الشرقية',
  },
  {
    CIT_CODE: 991,
    CIT_NAME_EN: 'TEBRAK',
    CIT_NAME_AR: 'تبراك',
  },
  {
    CIT_CODE: 993,
    CIT_NAME_EN: 'AL AWSAT',
    CIT_NAME_AR: 'الاوسط',
  },
  {
    CIT_CODE: 994,
    CIT_NAME_EN: 'AL HUWAYRRAH',
    CIT_NAME_AR: 'الحويرة',
  },
  {
    CIT_CODE: 995,
    CIT_NAME_EN: "KHASHM MI'DAD",
    CIT_NAME_AR: 'خشم معضد',
  },
  {
    CIT_CODE: 996,
    CIT_NAME_EN: 'AL BAKHRA',
    CIT_NAME_AR: 'البخرا',
  },
  {
    CIT_CODE: 997,
    CIT_NAME_EN: 'AL LUGHFIYAH',
    CIT_NAME_AR: 'اللغفية',
  },
  {
    CIT_CODE: 998,
    CIT_NAME_EN: 'AL MASBAR',
    CIT_NAME_AR: 'المسبر',
  },
  {
    CIT_CODE: 1000,
    CIT_NAME_EN: 'HAFIRAT NISAH',
    CIT_NAME_AR: 'حفرة نساح',
  },
  {
    CIT_CODE: 1001,
    CIT_NAME_EN: 'AJAJ',
    CIT_NAME_AR: 'عجاج',
  },
  {
    CIT_CODE: 1002,
    CIT_NAME_EN: "AL MASHA'ILAH",
    CIT_NAME_AR: 'المشاعلة',
  },
  {
    CIT_CODE: 1003,
    CIT_NAME_EN: 'QUNAYFIDHAH',
    CIT_NAME_AR: 'قنيفذة',
  },
  {
    CIT_CODE: 1004,
    CIT_NAME_EN: 'IFRIYAH',
    CIT_NAME_AR: 'عفرية',
  },
  {
    CIT_CODE: 1005,
    CIT_NAME_EN: 'AL KHALAIQ AL GHARBIYAH',
    CIT_NAME_AR: 'الخلائق الغربية',
  },
  {
    CIT_CODE: 1006,
    CIT_NAME_EN: 'AL JUFAYR',
    CIT_NAME_AR: 'الجفير',
  },
  {
    CIT_CODE: 1007,
    CIT_NAME_EN: 'AL ASTAH',
    CIT_NAME_AR: 'الأسطح',
  },
  {
    CIT_CODE: 1009,
    CIT_NAME_EN: 'DUMAN',
    CIT_NAME_AR: 'دمان',
  },
  {
    CIT_CODE: 1010,
    CIT_NAME_EN: 'AL MAFRAQ',
    CIT_NAME_AR: 'المفرق',
  },
  {
    CIT_CODE: 1011,
    CIT_NAME_EN: 'AL GHUZLAN',
    CIT_NAME_AR: 'الغزلان',
  },
  {
    CIT_CODE: 1012,
    CIT_NAME_EN: 'AL JADID',
    CIT_NAME_AR: 'الجديد',
  },
  {
    CIT_CODE: 1013,
    CIT_NAME_EN: 'WAJMAH',
    CIT_NAME_AR: 'وجمة',
  },
  {
    CIT_CODE: 1014,
    CIT_NAME_EN: 'ARQUS',
    CIT_NAME_AR: 'عرقوص',
  },
  {
    CIT_CODE: 1015,
    CIT_NAME_EN: "AL 'UNAYQ",
    CIT_NAME_AR: 'العنيق',
  },
  {
    CIT_CODE: 1016,
    CIT_NAME_EN: 'MURATTIJAH',
    CIT_NAME_AR: 'مرتجة',
  },
  {
    CIT_CODE: 1017,
    CIT_NAME_EN: 'AL FAQRAH',
    CIT_NAME_AR: 'الفقرة',
  },
  {
    CIT_CODE: 1018,
    CIT_NAME_EN: 'KHALS',
    CIT_NAME_AR: 'خلص',
  },
  {
    CIT_CODE: 1019,
    CIT_NAME_EN: 'AL QIFAF',
    CIT_NAME_AR: 'القفاف',
  },
  {
    CIT_CODE: 1020,
    CIT_NAME_EN: 'UMM AL BIRAK',
    CIT_NAME_AR: 'أم البرك',
  },
  {
    CIT_CODE: 1021,
    CIT_NAME_EN: 'MURAYKHAH',
    CIT_NAME_AR: 'مريخة',
  },
  {
    CIT_CODE: 1022,
    CIT_NAME_EN: "AL 'ABLA",
    CIT_NAME_AR: 'العبلا',
  },
  {
    CIT_CODE: 1023,
    CIT_NAME_EN: 'MARMUMA',
    CIT_NAME_AR: 'مرموماء',
  },
  {
    CIT_CODE: 1024,
    CIT_NAME_EN: 'QURUDHAH',
    CIT_NAME_AR: 'قرظة',
  },
  {
    CIT_CODE: 1025,
    CIT_NAME_EN: 'UMM FAHI',
    CIT_NAME_AR: 'أم فحي',
  },
  {
    CIT_CODE: 1027,
    CIT_NAME_EN: 'AL HADA',
    CIT_NAME_AR: 'الهدى',
  },
  {
    CIT_CODE: 1028,
    CIT_NAME_EN: 'AL GHUR',
    CIT_NAME_AR: 'الغور',
  },
  {
    CIT_CODE: 1029,
    CIT_NAME_EN: "MATH'AR",
    CIT_NAME_AR: 'مثعر',
  },
  {
    CIT_CODE: 1030,
    CIT_NAME_EN: 'AL HUSAYNIYAH',
    CIT_NAME_AR: 'الحسينية',
  },
  {
    CIT_CODE: 1031,
    CIT_NAME_EN: 'ASH SHUFAYYAH',
    CIT_NAME_AR: 'الشفية',
  },
  {
    CIT_CODE: 1033,
    CIT_NAME_EN: 'ABU QARN',
    CIT_NAME_AR: 'أبو قرن',
  },
  {
    CIT_CODE: 1034,
    CIT_NAME_EN: 'AL MASJID',
    CIT_NAME_AR: 'المسجد',
  },
  {
    CIT_CODE: 1035,
    CIT_NAME_EN: 'AL LAHBAN',
    CIT_NAME_AR: 'اللهبان',
  },
  {
    CIT_CODE: 1036,
    CIT_NAME_EN: 'AL JAWABIRAT',
    CIT_NAME_AR: 'الجوابرة',
  },
  {
    CIT_CODE: 1037,
    CIT_NAME_EN: 'KHURUSS',
    CIT_NAME_AR: 'خرص',
  },
  {
    CIT_CODE: 1038,
    CIT_NAME_EN: 'ASIR',
    CIT_NAME_AR: 'عاصر',
  },
  {
    CIT_CODE: 1039,
    CIT_NAME_EN: 'AL ATHUD',
    CIT_NAME_AR: 'الأثود',
  },
  {
    CIT_CODE: 1040,
    CIT_NAME_EN: 'TARJIM',
    CIT_NAME_AR: 'ترجم',
  },
  {
    CIT_CODE: 1041,
    CIT_NAME_EN: 'KITAYDAH',
    CIT_NAME_AR: 'كتيدة',
  },
  {
    CIT_CODE: 1042,
    CIT_NAME_EN: 'SAFA',
    CIT_NAME_AR: 'سفاء',
  },
  {
    CIT_CODE: 1043,
    CIT_NAME_EN: 'RAHQAN',
    CIT_NAME_AR: 'رحقان',
  },
  {
    CIT_CODE: 1044,
    CIT_NAME_EN: "THU'AYYIL",
    CIT_NAME_AR: 'ثعيل',
  },
  {
    CIT_CODE: 1046,
    CIT_NAME_EN: 'AL MAYTH',
    CIT_NAME_AR: 'الميث',
  },
  {
    CIT_CODE: 1047,
    CIT_NAME_EN: 'BIR AL GHANAM',
    CIT_NAME_AR: 'بئر الغنم',
  },
  {
    CIT_CODE: 1048,
    CIT_NAME_EN: 'AL MURTAJJAH',
    CIT_NAME_AR: 'المرتجة',
  },
  {
    CIT_CODE: 1049,
    CIT_NAME_EN: "AL MA'AYZILAH",
    CIT_NAME_AR: 'المعيزلة',
  },
  {
    CIT_CODE: 1050,
    CIT_NAME_EN: 'AL HAR',
    CIT_NAME_AR: 'الحار',
  },
  {
    CIT_CODE: 1051,
    CIT_NAME_EN: 'AS SUDAYYIRAH',
    CIT_NAME_AR: 'الصديرة',
  },
  {
    CIT_CODE: 1052,
    CIT_NAME_EN: 'DIRAYBIS',
    CIT_NAME_AR: 'دريبس',
  },
  {
    CIT_CODE: 1054,
    CIT_NAME_EN: "BI'R QAYDI",
    CIT_NAME_AR: 'بئر قيضي',
  },
  {
    CIT_CODE: 1055,
    CIT_NAME_EN: 'AL WASITHAH',
    CIT_NAME_AR: 'الواسطة',
  },
  {
    CIT_CODE: 1056,
    CIT_NAME_EN: 'AR RAYIS',
    CIT_NAME_AR: 'الرايس',
  },
  {
    CIT_CODE: 1057,
    CIT_NAME_EN: 'AL MUSAYJID',
    CIT_NAME_AR: 'المسيجيد',
  },
  {
    CIT_CODE: 1059,
    CIT_NAME_EN: 'KHAFS DAGHRAH',
    CIT_NAME_AR: 'خفس دغرة',
  },
  {
    CIT_CODE: 1060,
    CIT_NAME_EN: 'AL BIYAD',
    CIT_NAME_AR: 'البياض',
  },
  {
    CIT_CODE: 1062,
    CIT_NAME_EN: 'AL YAMAMAH',
    CIT_NAME_AR: 'اليمامة',
  },
  {
    CIT_CODE: 1066,
    CIT_NAME_EN: "AR RAFI'AH",
    CIT_NAME_AR: 'الرفيعه',
  },
  {
    CIT_CODE: 1068,
    CIT_NAME_EN: "AL 'ADHAR",
    CIT_NAME_AR: 'العذار',
  },
  {
    CIT_CODE: 1069,
    CIT_NAME_EN: 'ZUMAYQAH',
    CIT_NAME_AR: 'زميقة',
  },
  {
    CIT_CODE: 1071,
    CIT_NAME_EN: 'AL HAYATHIM',
    CIT_NAME_AR: 'الهياثم',
  },
  {
    CIT_CODE: 1072,
    CIT_NAME_EN: "AL BADA' AL QADIM",
    CIT_NAME_AR: 'البدع القديم',
  },
  {
    CIT_CODE: 1074,
    CIT_NAME_EN: "AD DUBAY'AH",
    CIT_NAME_AR: 'الضبعية',
  },
  {
    CIT_CODE: 1075,
    CIT_NAME_EN: "NA'JAN",
    CIT_NAME_AR: 'نعجان',
  },
  {
    CIT_CODE: 1076,
    CIT_NAME_EN: 'HAI AL QITAR',
    CIT_NAME_AR: 'حي القطار',
  },
  {
    CIT_CODE: 1078,
    CIT_NAME_EN: 'AS SILIMIYAH',
    CIT_NAME_AR: 'السلمية',
  },
  {
    CIT_CODE: 1080,
    CIT_NAME_EN: "AS SAHBA'",
    CIT_NAME_AR: 'السهباء',
  },
  {
    CIT_CODE: 1081,
    CIT_NAME_EN: 'ATH THALIMA',
    CIT_NAME_AR: 'الثليما',
  },
  {
    CIT_CODE: 1082,
    CIT_NAME_EN: 'AT TAWDIHIYYAH',
    CIT_NAME_AR: 'التوضيحية',
  },
  {
    CIT_CODE: 1083,
    CIT_NAME_EN: 'AL MAHATTAH',
    CIT_NAME_AR: 'المحطة',
  },
  {
    CIT_CODE: 1084,
    CIT_NAME_EN: 'AR RUGHAYB',
    CIT_NAME_AR: 'الرغيب',
  },
  {
    CIT_CODE: 1085,
    CIT_NAME_EN: 'AL MUHAMMADI',
    CIT_NAME_AR: 'المحمدي',
  },
  {
    CIT_CODE: 1086,
    CIT_NAME_EN: 'AS SAHANAH',
    CIT_NAME_AR: 'الصحنة',
  },
  {
    CIT_CODE: 1087,
    CIT_NAME_EN: 'AL JURAYSIYAH',
    CIT_NAME_AR: 'الجريسية',
  },
  {
    CIT_CODE: 1088,
    CIT_NAME_EN: 'AL GHAMR',
    CIT_NAME_AR: 'الغمر',
  },
  {
    CIT_CODE: 1089,
    CIT_NAME_EN: "AL MAZRI'",
    CIT_NAME_AR: 'المزرع',
  },
  {
    CIT_CODE: 1090,
    CIT_NAME_EN: 'HABA',
    CIT_NAME_AR: 'هبا',
  },
  {
    CIT_CODE: 1091,
    CIT_NAME_EN: 'AS SAHAN',
    CIT_NAME_AR: 'الصحن',
  },
  {
    CIT_CODE: 1092,
    CIT_NAME_EN: 'MASHUQAH',
    CIT_NAME_AR: 'مشوقة',
  },
  {
    CIT_CODE: 1093,
    CIT_NAME_EN: "UMM AL 'ARAD",
    CIT_NAME_AR: 'أم العراد',
  },
  {
    CIT_CODE: 1094,
    CIT_NAME_EN: 'AL HARRARAH',
    CIT_NAME_AR: 'الهرارة',
  },
  {
    CIT_CODE: 1095,
    CIT_NAME_EN: 'AS SIDRAH',
    CIT_NAME_AR: 'السدرة',
  },
  {
    CIT_CODE: 1096,
    CIT_NAME_EN: 'AL JISSA',
    CIT_NAME_AR: 'الجصة',
  },
  {
    CIT_CODE: 1097,
    CIT_NAME_EN: 'AL HUWAYMIDAH',
    CIT_NAME_AR: 'الحويمضة',
  },
  {
    CIT_CODE: 1098,
    CIT_NAME_EN: 'QARAN',
    CIT_NAME_AR: 'قران',
  },
  {
    CIT_CODE: 1099,
    CIT_NAME_EN: 'AL KHUFAYQ',
    CIT_NAME_AR: 'الخفيق',
  },
  {
    CIT_CODE: 1100,
    CIT_NAME_EN: 'AL HUMAYJAH',
    CIT_NAME_AR: 'الهميجة',
  },
  {
    CIT_CODE: 1102,
    CIT_NAME_EN: 'MURAYGHAN',
    CIT_NAME_AR: 'مريغان',
  },
  {
    CIT_CODE: 1103,
    CIT_NAME_EN: "AL 'ASHSHAY",
    CIT_NAME_AR: 'العشاي',
  },
  {
    CIT_CODE: 1104,
    CIT_NAME_EN: "AL QA'AR AL ASFAL",
    CIT_NAME_AR: 'القعر الاسفل',
  },
  {
    CIT_CODE: 1106,
    CIT_NAME_EN: 'AL HADBA',
    CIT_NAME_AR: 'الحدباء',
  },
  {
    CIT_CODE: 1107,
    CIT_NAME_EN: 'AR RAHAWAH',
    CIT_NAME_AR: 'الرهوة',
  },
  {
    CIT_CODE: 1108,
    CIT_NAME_EN: 'AL QAWZ',
    CIT_NAME_AR: 'القوز',
  },
  {
    CIT_CODE: 1109,
    CIT_NAME_EN: 'AL KHUNFUSAH',
    CIT_NAME_AR: 'الخنفسة',
  },
  {
    CIT_CODE: 1110,
    CIT_NAME_EN: 'HISHASH',
    CIT_NAME_AR: 'حشاش',
  },
  {
    CIT_CODE: 1111,
    CIT_NAME_EN: 'AD DUBAYYAH',
    CIT_NAME_AR: 'الضبية',
  },
  {
    CIT_CODE: 1112,
    CIT_NAME_EN: 'AL BURAYKAH',
    CIT_NAME_AR: 'البريكة',
  },
  {
    CIT_CODE: 1113,
    CIT_NAME_EN: 'AL FAZZ',
    CIT_NAME_AR: 'الفز',
  },
  {
    CIT_CODE: 1114,
    CIT_NAME_EN: 'AT TINAH',
    CIT_NAME_AR: 'الطينة',
  },
  {
    CIT_CODE: 1115,
    CIT_NAME_EN: 'UMM AL JURM',
    CIT_NAME_AR: 'ام الجرم',
  },
  {
    CIT_CODE: 1116,
    CIT_NAME_EN: 'AD DUWWARAH',
    CIT_NAME_AR: 'الدوارة',
  },
  {
    CIT_CODE: 1117,
    CIT_NAME_EN: 'ABU MARAGHAH',
    CIT_NAME_AR: 'ابو مراغة',
  },
  {
    CIT_CODE: 1118,
    CIT_NAME_EN: 'AL HAFYA',
    CIT_NAME_AR: 'الحفياء',
  },
  {
    CIT_CODE: 1119,
    CIT_NAME_EN: 'AL KHAYF',
    CIT_NAME_AR: 'الخيف',
  },
  {
    CIT_CODE: 1120,
    CIT_NAME_EN: 'AL MAKSIR',
    CIT_NAME_AR: 'المكسر',
  },
  {
    CIT_CODE: 1121,
    CIT_NAME_EN: 'AL FIJ',
    CIT_NAME_AR: 'الفيج',
  },
  {
    CIT_CODE: 1122,
    CIT_NAME_EN: 'AL SAHAM',
    CIT_NAME_AR: 'السهم',
  },
  {
    CIT_CODE: 1123,
    CIT_NAME_EN: 'AD DAFF',
    CIT_NAME_AR: 'الدف',
  },
  {
    CIT_CODE: 1124,
    CIT_NAME_EN: 'AL MUSHARIFAH',
    CIT_NAME_AR: 'المشريفة',
  },
  {
    CIT_CODE: 1125,
    CIT_NAME_EN: 'AL WAQIB',
    CIT_NAME_AR: 'الوقب',
  },
  {
    CIT_CODE: 1127,
    CIT_NAME_EN: 'JULAYYIL',
    CIT_NAME_AR: 'جليل',
  },
  {
    CIT_CODE: 1128,
    CIT_NAME_EN: 'HILIMAH',
    CIT_NAME_AR: 'حلمة',
  },
  {
    CIT_CODE: 1129,
    CIT_NAME_EN: "AL JID'",
    CIT_NAME_AR: 'الجضع',
  },
  {
    CIT_CODE: 1130,
    CIT_NAME_EN: 'AL BIYAR',
    CIT_NAME_AR: 'البيار',
  },
  {
    CIT_CODE: 1131,
    CIT_NAME_EN: "AL MA'ALI",
    CIT_NAME_AR: 'المعالي',
  },
  {
    CIT_CODE: 1132,
    CIT_NAME_EN: 'AL MADID',
    CIT_NAME_AR: 'المديد',
  },
  {
    CIT_CODE: 1133,
    CIT_NAME_EN: "AL MARAYSI'",
    CIT_NAME_AR: 'المريصيع',
  },
  {
    CIT_CODE: 1134,
    CIT_NAME_EN: 'JILAYYILAH',
    CIT_NAME_AR: 'جليلة',
  },
  {
    CIT_CODE: 1135,
    CIT_NAME_EN: 'AL MASAMMAH',
    CIT_NAME_AR: 'المسماة',
  },
  {
    CIT_CODE: 1137,
    CIT_NAME_EN: 'AL GHURUF',
    CIT_NAME_AR: 'الغروف',
  },
  {
    CIT_CODE: 1138,
    CIT_NAME_EN: 'AL BAHAWAL',
    CIT_NAME_AR: 'البحول',
  },
  {
    CIT_CODE: 1139,
    CIT_NAME_EN: 'DAWQAH',
    CIT_NAME_AR: 'دوقة',
  },
  {
    CIT_CODE: 1140,
    CIT_NAME_EN: 'AL BAKHTARIYAH',
    CIT_NAME_AR: 'البخترية',
  },
  {
    CIT_CODE: 1141,
    CIT_NAME_EN: 'AL BARZAH',
    CIT_NAME_AR: 'البرزة',
  },
  {
    CIT_CODE: 1143,
    CIT_NAME_EN: "AL MAHAYA'",
    CIT_NAME_AR: 'مهايع',
  },
  {
    CIT_CODE: 1144,
    CIT_NAME_EN: "AL MA'ADA",
    CIT_NAME_AR: 'المعداء',
  },
  {
    CIT_CODE: 1145,
    CIT_NAME_EN: "UMM AL 'URMUT",
    CIT_NAME_AR: 'ام العرمط',
  },
  {
    CIT_CODE: 1146,
    CIT_NAME_EN: 'AL MILAYHAH',
    CIT_NAME_AR: 'المليحة',
  },
  {
    CIT_CODE: 1147,
    CIT_NAME_EN: 'AD DAHALAH',
    CIT_NAME_AR: 'الدحلة',
  },
  {
    CIT_CODE: 1148,
    CIT_NAME_EN: 'AS SALAYLAT',
    CIT_NAME_AR: 'الصليلات',
  },
  {
    CIT_CODE: 1149,
    CIT_NAME_EN: 'GHUSAYYIN',
    CIT_NAME_AR: 'غصين',
  },
  {
    CIT_CODE: 1150,
    CIT_NAME_EN: 'AL-KAMEL',
    CIT_NAME_AR: 'الكامل',
  },
  {
    CIT_CODE: 1151,
    CIT_NAME_EN: "AL 'AYBAH AL 'ULYA",
    CIT_NAME_AR: 'العيبة العليا',
  },
  {
    CIT_CODE: 1153,
    CIT_NAME_EN: "AL QU'UR",
    CIT_NAME_AR: 'القعور',
  },
  {
    CIT_CODE: 1154,
    CIT_NAME_EN: 'AL GHARAYYIB',
    CIT_NAME_AR: 'الغريب',
  },
  {
    CIT_CODE: 1155,
    CIT_NAME_EN: 'MISHRIQ',
    CIT_NAME_AR: 'مشرق',
  },
  {
    CIT_CODE: 1156,
    CIT_NAME_EN: 'AL LUSUB',
    CIT_NAME_AR: 'اللصب',
  },
  {
    CIT_CODE: 1158,
    CIT_NAME_EN: "AL 'AMUDAH",
    CIT_NAME_AR: 'العمودة',
  },
  {
    CIT_CODE: 1159,
    CIT_NAME_EN: 'AL WAQBAH',
    CIT_NAME_AR: 'الوقبة',
  },
  {
    CIT_CODE: 1,
    CIT_NAME_EN: 'TABUK',
    CIT_NAME_AR: 'تبوك',
  },
  {
    CIT_CODE: 3,
    CIT_NAME_EN: 'AR RIYADH',
    CIT_NAME_AR: 'الرياض',
  },
  {
    CIT_CODE: 5,
    CIT_NAME_EN: 'AT TAIF',
    CIT_NAME_AR: 'الطائف',
  },
  {
    CIT_CODE: 6,
    CIT_NAME_EN: 'MAKKAH AL MUKARRAMAH',
    CIT_NAME_AR: 'مكة المكرمة',
  },
  {
    CIT_CODE: 10,
    CIT_NAME_EN: 'HAIL',
    CIT_NAME_AR: 'حائل',
  },
  {
    CIT_CODE: 11,
    CIT_NAME_EN: 'BURAYDAH',
    CIT_NAME_AR: 'بريدة',
  },
  {
    CIT_CODE: 12,
    CIT_NAME_EN: 'AL HUFUF',
    CIT_NAME_AR: 'الهفوف',
  },
  {
    CIT_CODE: 13,
    CIT_NAME_EN: 'AD DAMMAM',
    CIT_NAME_AR: 'الدمام',
  },
  {
    CIT_CODE: 14,
    CIT_NAME_EN: 'AL MADINAH AL MUNAWWARAH',
    CIT_NAME_AR: 'المدينة المنورة',
  },
  {
    CIT_CODE: 15,
    CIT_NAME_EN: 'ABHA',
    CIT_NAME_AR: 'ابها',
  },
  {
    CIT_CODE: 17,
    CIT_NAME_EN: 'JAZAN',
    CIT_NAME_AR: 'جازان',
  },
  {
    CIT_CODE: 18,
    CIT_NAME_EN: 'JEDDAH',
    CIT_NAME_AR: 'جدة',
  },
  {
    CIT_CODE: 24,
    CIT_NAME_EN: "AL MAJMA'AH",
    CIT_NAME_AR: 'المجمعة',
  },
  {
    CIT_CODE: 31,
    CIT_NAME_EN: 'AL KHUBAR',
    CIT_NAME_AR: 'الخبر',
  },
  {
    CIT_CODE: 36,
    CIT_NAME_EN: 'HAQL',
    CIT_NAME_AR: 'حقل',
  },
  {
    CIT_CODE: 47,
    CIT_NAME_EN: 'HAFAR AL BATIN',
    CIT_NAME_AR: 'حفر الباطن',
  },
  {
    CIT_CODE: 62,
    CIT_NAME_EN: 'KHAMIS MUSHAYT',
    CIT_NAME_AR: 'خميس مشيط',
  },
  {
    CIT_CODE: 65,
    CIT_NAME_EN: 'AHAD RIFAYDAH',
    CIT_NAME_AR: 'احد رفيده',
  },
  {
    CIT_CODE: 67,
    CIT_NAME_EN: 'AL QATIF',
    CIT_NAME_AR: 'القطيف',
  },
  {
    CIT_CODE: 74,
    CIT_NAME_EN: "TAYMA'",
    CIT_NAME_AR: 'تيماء',
  },
  {
    CIT_CODE: 80,
    CIT_NAME_EN: 'UNAYZAH',
    CIT_NAME_AR: 'عنيزة',
  },
  {
    CIT_CODE: 89,
    CIT_NAME_EN: "QARYAT AL 'ULYA",
    CIT_NAME_AR: 'قرية العليا',
  },
  {
    CIT_CODE: 113,
    CIT_NAME_EN: 'AL JUBAIL',
    CIT_NAME_AR: 'الجبيل',
  },
  {
    CIT_CODE: 115,
    CIT_NAME_EN: "AN NU'AYRIYAH",
    CIT_NAME_AR: 'النعيرية',
  },
  {
    CIT_CODE: 153,
    CIT_NAME_EN: 'HARMAH',
    CIT_NAME_AR: 'حرمة',
  },
  {
    CIT_CODE: 167,
    CIT_NAME_EN: 'TUMAIR',
    CIT_NAME_AR: 'تمير',
  },
  {
    CIT_CODE: 199,
    CIT_NAME_EN: 'AL ULA',
    CIT_NAME_AR: 'العلا',
  },
  {
    CIT_CODE: 227,
    CIT_NAME_EN: 'ADH DHAHRAN',
    CIT_NAME_AR: 'الظهران',
  },
  {
    CIT_CODE: 233,
    CIT_NAME_EN: 'AL WAJH',
    CIT_NAME_AR: 'الوجه',
  },
  {
    CIT_CODE: 243,
    CIT_NAME_EN: 'BUQAYQ',
    CIT_NAME_AR: 'بقيق',
  },
  {
    CIT_CODE: 270,
    CIT_NAME_EN: 'AZ ZULFI',
    CIT_NAME_AR: 'الزلفي',
  },
  {
    CIT_CODE: 288,
    CIT_NAME_EN: 'KHAYBAR',
    CIT_NAME_AR: 'خيبر',
  },
  {
    CIT_CODE: 306,
    CIT_NAME_EN: 'AL GHAT',
    CIT_NAME_AR: 'الغاط',
  },
  {
    CIT_CODE: 323,
    CIT_NAME_EN: 'UMLUJ',
    CIT_NAME_AR: 'املج',
  },
  {
    CIT_CODE: 377,
    CIT_NAME_EN: 'RABIGH',
    CIT_NAME_AR: 'رابغ',
  },
  {
    CIT_CODE: 418,
    CIT_NAME_EN: 'AFIF',
    CIT_NAME_AR: 'عفيف',
  },
  {
    CIT_CODE: 443,
    CIT_NAME_EN: 'THADIQ',
    CIT_NAME_AR: 'ثادق',
  },
  {
    CIT_CODE: 454,
    CIT_NAME_EN: 'SAYHAT',
    CIT_NAME_AR: 'سيهات',
  },
  {
    CIT_CODE: 456,
    CIT_NAME_EN: 'TARUT',
    CIT_NAME_AR: 'تاروت',
  },
  {
    CIT_CODE: 483,
    CIT_NAME_EN: 'YANBU',
    CIT_NAME_AR: 'ينبع',
  },
  {
    CIT_CODE: 500,
    CIT_NAME_EN: "SHAQRA'",
    CIT_NAME_AR: 'شقراء',
  },
  {
    CIT_CODE: 669,
    CIT_NAME_EN: 'AD DUWADIMI',
    CIT_NAME_AR: 'الدوادمي',
  },
  {
    CIT_CODE: 795,
    CIT_NAME_EN: 'HURAYMILA',
    CIT_NAME_AR: 'حريملاء',
  },
  {
    CIT_CODE: 828,
    CIT_NAME_EN: "AD DIR'IYAH",
    CIT_NAME_AR: 'الدرعية',
  },
  {
    CIT_CODE: 839,
    CIT_NAME_EN: 'DURUMA',
    CIT_NAME_AR: 'ضرما',
  },
  {
    CIT_CODE: 880,
    CIT_NAME_EN: "AL QUWAY'IYAH",
    CIT_NAME_AR: 'القويعية',
  },
  {
    CIT_CODE: 990,
    CIT_NAME_EN: 'AL MUZAHIMIYAH',
    CIT_NAME_AR: 'المزاحمية',
  },
  {
    CIT_CODE: 1053,
    CIT_NAME_EN: 'BADR',
    CIT_NAME_AR: 'بدر',
  },
  {
    CIT_CODE: 1061,
    CIT_NAME_EN: 'AL KHARJ',
    CIT_NAME_AR: 'الخرج',
  },
  {
    CIT_CODE: 1073,
    CIT_NAME_EN: 'AD DILAM',
    CIT_NAME_AR: 'الدلم',
  },
  {
    CIT_CODE: 1105,
    CIT_NAME_EN: 'KHULAYS',
    CIT_NAME_AR: 'خليص',
  },
  {
    CIT_CODE: 1228,
    CIT_NAME_EN: 'ASH SHINAN',
    CIT_NAME_AR: 'الشنان',
  },
  {
    CIT_CODE: 1248,
    CIT_NAME_EN: 'AL KHURMAH',
    CIT_NAME_AR: 'الخرمة',
  },
  {
    CIT_CODE: 1257,
    CIT_NAME_EN: 'AL JUMUM',
    CIT_NAME_AR: 'الجموم',
  },
  {
    CIT_CODE: 1294,
    CIT_NAME_EN: 'AL MAJARDAH',
    CIT_NAME_AR: 'المجاردة',
  },
  {
    CIT_CODE: 1361,
    CIT_NAME_EN: 'AS SULAYYIL',
    CIT_NAME_AR: 'السليل',
  },
  {
    CIT_CODE: 1443,
    CIT_NAME_EN: 'TATHLITH',
    CIT_NAME_AR: 'تثليث',
  },
  {
    CIT_CODE: 1514,
    CIT_NAME_EN: 'BISHAH',
    CIT_NAME_AR: 'بيشة',
  },
  {
    CIT_CODE: 1542,
    CIT_NAME_EN: 'AL BAHA',
    CIT_NAME_AR: 'الباحة',
  },
  {
    CIT_CODE: 1625,
    CIT_NAME_EN: 'AL QUNFIDHAH',
    CIT_NAME_AR: 'القنفذة',
  },
  {
    CIT_CODE: 1627,
    CIT_NAME_EN: "SABT AL 'ALAYAH",
    CIT_NAME_AR: 'سبت العلاية',
  },
  {
    CIT_CODE: 1801,
    CIT_NAME_EN: 'MUHAYIL',
    CIT_NAME_AR: 'محايل',
  },
  {
    CIT_CODE: 1879,
    CIT_NAME_EN: 'THUWAL',
    CIT_NAME_AR: 'ثول',
  },
  {
    CIT_CODE: 1947,
    CIT_NAME_EN: 'DUBA',
    CIT_NAME_AR: 'ضبا',
  },
  {
    CIT_CODE: 1999,
    CIT_NAME_EN: "UYUN AL JAWA'",
    CIT_NAME_AR: 'عيون الجواء',
  },
  {
    CIT_CODE: 2156,
    CIT_NAME_EN: 'TURBAH',
    CIT_NAME_AR: 'تربه',
  },
  {
    CIT_CODE: 2167,
    CIT_NAME_EN: 'SAFWA',
    CIT_NAME_AR: 'صفوى',
  },
  {
    CIT_CODE: 2171,
    CIT_NAME_EN: 'INAK',
    CIT_NAME_AR: 'عنك',
  },
  {
    CIT_CODE: 2176,
    CIT_NAME_EN: 'DARIN',
    CIT_NAME_AR: 'دارين',
  },
  {
    CIT_CODE: 2208,
    CIT_NAME_EN: 'TURAIF',
    CIT_NAME_AR: 'طريف',
  },
  {
    CIT_CODE: 2213,
    CIT_NAME_EN: "AR'AR",
    CIT_NAME_AR: 'عرعر',
  },
  {
    CIT_CODE: 2226,
    CIT_NAME_EN: 'AL QURAYYAT',
    CIT_NAME_AR: 'القريات',
  },
  {
    CIT_CODE: 2237,
    CIT_NAME_EN: 'SAKAKA',
    CIT_NAME_AR: 'سكاكا',
  },
  {
    CIT_CODE: 2256,
    CIT_NAME_EN: "RAFHA'",
    CIT_NAME_AR: 'رفحاء',
  },
  {
    CIT_CODE: 2268,
    CIT_NAME_EN: 'DAWMAT AL JANDAL',
    CIT_NAME_AR: 'دومة الجندل',
  },
  {
    CIT_CODE: 2421,
    CIT_NAME_EN: 'AR RASS',
    CIT_NAME_AR: 'الرس',
  },
  {
    CIT_CODE: 2448,
    CIT_NAME_EN: 'AL MIDHNAB',
    CIT_NAME_AR: 'المذنب',
  },
  {
    CIT_CODE: 2464,
    CIT_NAME_EN: 'AL KHAFJI',
    CIT_NAME_AR: 'الخفجي',
  },
  {
    CIT_CODE: 2467,
    CIT_NAME_EN: 'RIYAD AL KHABRA',
    CIT_NAME_AR: 'رياض الخبراء',
  },
  {
    CIT_CODE: 2481,
    CIT_NAME_EN: "AL BADAI'",
    CIT_NAME_AR: 'البدائع',
  },
  {
    CIT_CODE: 2519,
    CIT_NAME_EN: 'AN NAMAS (TANUMAH)',
    CIT_NAME_AR: 'النماص',
  },
  {
    CIT_CODE: 2522,
    CIT_NAME_EN: 'YADAMAH',
    CIT_NAME_AR: 'يدمة',
  },
  {
    CIT_CODE: 2590,
    CIT_NAME_EN: 'RAS TANNURAH',
    CIT_NAME_AR: 'راس تنورة',
  },
  {
    CIT_CODE: 2630,
    CIT_NAME_EN: 'AL BUKAYRIYAH',
    CIT_NAME_AR: 'البكيرية',
  },
  {
    CIT_CODE: 2748,
    CIT_NAME_EN: 'AL MUBARRAZ',
    CIT_NAME_AR: 'المبرز',
  },
  {
    CIT_CODE: 2777,
    CIT_NAME_EN: 'ASH SHIMASIYAH',
    CIT_NAME_AR: 'الشماسية',
  },
  {
    CIT_CODE: 3158,
    CIT_NAME_EN: 'AL HARIQ',
    CIT_NAME_AR: 'الحريق',
  },
  {
    CIT_CODE: 3161,
    CIT_NAME_EN: 'HAWTAT BANI TAMIM',
    CIT_NAME_AR: 'حوطة بني تميم',
  },
  {
    CIT_CODE: 3174,
    CIT_NAME_EN: 'LAYLA',
    CIT_NAME_AR: 'ليلى',
  },
  {
    CIT_CODE: 3275,
    CIT_NAME_EN: 'BILLASMAR',
    CIT_NAME_AR: 'بللسمر',
  },
  {
    CIT_CODE: 3328,
    CIT_NAME_EN: 'SARAT ABIDAH',
    CIT_NAME_AR: 'سراة عبيدة',
  },
  {
    CIT_CODE: 3347,
    CIT_NAME_EN: 'SHARURAH',
    CIT_NAME_AR: 'شرورة',
  },
  {
    CIT_CODE: 3417,
    CIT_NAME_EN: 'NAJRAN',
    CIT_NAME_AR: 'نجران',
  },
  {
    CIT_CODE: 3479,
    CIT_NAME_EN: 'SABYA',
    CIT_NAME_AR: 'صبيا',
  },
  {
    CIT_CODE: 3525,
    CIT_NAME_EN: 'ABU ARISH',
    CIT_NAME_AR: 'ابو عريش',
  },
  {
    CIT_CODE: 3542,
    CIT_NAME_EN: 'SAMTAH',
    CIT_NAME_AR: 'صامطة',
  },
  {
    CIT_CODE: 3597,
    CIT_NAME_EN: "AL 'ARIDAH",
    CIT_NAME_AR: 'العارضة',
  },
  {
    CIT_CODE: 3652,
    CIT_NAME_EN: 'AHAD AL MUSARIHAH',
    CIT_NAME_AR: 'احد المسارحة',
  },
  {
    CIT_CODE: 3666,
    CIT_NAME_EN: 'KING ABDULLAH ECONOMIC CITY',
    CIT_NAME_AR: 'مدينة الملك عبدالله الاقتصادية',
  },
  {
    CIT_CODE: 3678,
    CIT_NAME_EN: 'TENDAHA',
    CIT_NAME_AR: 'تندحة',
  },
  {
    CIT_CODE: 2,
    CIT_NAME_EN: "NA'MI",
    CIT_NAME_AR: 'نعمي',
  },
  {
    CIT_CODE: 4,
    CIT_NAME_EN: 'HUMAYT',
    CIT_NAME_AR: 'حميط',
  },
  {
    CIT_CODE: 7,
    CIT_NAME_EN: 'RAJM AT TAYARAH',
    CIT_NAME_AR: 'رجم الطيارة',
  },
  {
    CIT_CODE: 8,
    CIT_NAME_EN: 'ATH THUMAYD',
    CIT_NAME_AR: 'الثميد',
  },
  {
    CIT_CODE: 9,
    CIT_NAME_EN: 'USAYLAH',
    CIT_NAME_AR: 'عسيلة',
  },
  {
    CIT_CODE: 19,
    CIT_NAME_EN: 'ASH SHAYIB',
    CIT_NAME_AR: 'الشايب',
  },
  {
    CIT_CODE: 20,
    CIT_NAME_EN: 'AL FAWHAH',
    CIT_NAME_AR: 'الفوهة',
  },
  {
    CIT_CODE: 21,
    CIT_NAME_EN: 'AL LAWZ',
    CIT_NAME_AR: 'اللوز',
  },
  {
    CIT_CODE: 22,
    CIT_NAME_EN: 'AYN AL AKHDAR',
    CIT_NAME_AR: 'عين الأخضر',
  },
  {
    CIT_CODE: 23,
    CIT_NAME_EN: 'DHAT AL HAJJ',
    CIT_NAME_AR: 'ذات الحاج',
  },
  {
    CIT_CODE: 25,
    CIT_NAME_EN: 'QIYAL',
    CIT_NAME_AR: 'قيال',
  },
  {
    CIT_CODE: 26,
    CIT_NAME_EN: 'AL AKHDAR',
    CIT_NAME_AR: 'الأخضر',
  },
  {
    CIT_CODE: 27,
    CIT_NAME_EN: "AL BIDI'AH",
    CIT_NAME_AR: 'البديعة',
  },
  {
    CIT_CODE: 28,
    CIT_NAME_EN: 'MUGHAYRAH',
    CIT_NAME_AR: 'مغيرة',
  },
  {
    CIT_CODE: 29,
    CIT_NAME_EN: "AL HAWJA'",
    CIT_NAME_AR: 'الهوجاء',
  },
  {
    CIT_CODE: 30,
    CIT_NAME_EN: "AL BUDAYYI'",
    CIT_NAME_AR: 'البديع',
  },
  {
    CIT_CODE: 32,
    CIT_NAME_EN: 'ABAR QANA',
    CIT_NAME_AR: 'ابار قنا',
  },
  {
    CIT_CODE: 33,
    CIT_NAME_EN: "AL JAB'AWIYAH",
    CIT_NAME_AR: 'الجبعاوية',
  },
  {
    CIT_CODE: 35,
    CIT_NAME_EN: 'AL BAYYANAH',
    CIT_NAME_AR: 'البيانة',
  },
  {
    CIT_CODE: 39,
    CIT_NAME_EN: 'ALAQAN',
    CIT_NAME_AR: 'علقان',
  },
  {
    CIT_CODE: 40,
    CIT_NAME_EN: 'AL WADI AL JADID',
    CIT_NAME_AR: 'الوادي الجديد',
  },
  {
    CIT_CODE: 41,
    CIT_NAME_EN: 'MULAYH',
    CIT_NAME_AR: 'مليح',
  },
  {
    CIT_CODE: 42,
    CIT_NAME_EN: 'ABU AL HINSHAN',
    CIT_NAME_AR: 'ابو الحنشان',
  },
  {
    CIT_CODE: 43,
    CIT_NAME_EN: 'MAQNA',
    CIT_NAME_AR: 'مقنا',
  },
  {
    CIT_CODE: 44,
    CIT_NAME_EN: "ABU QA'AR",
    CIT_NAME_AR: 'ابو قعر',
  },
  {
    CIT_CODE: 45,
    CIT_NAME_EN: "MARKAZ AL 'AWJA",
    CIT_NAME_AR: 'مركز العوجاء',
  },
  {
    CIT_CODE: 46,
    CIT_NAME_EN: "MARKAZ AL 'ULAYYIMAH",
    CIT_NAME_AR: 'مركز العليمة',
  },
  {
    CIT_CODE: 48,
    CIT_NAME_EN: 'AL QALT',
    CIT_NAME_AR: 'القلت',
  },
  {
    CIT_CODE: 49,
    CIT_NAME_EN: 'AN NADHIM',
    CIT_NAME_AR: 'النظيم',
  },
  {
    CIT_CODE: 50,
    CIT_NAME_EN: 'IBN TUWALAH',
    CIT_NAME_AR: 'ابن طوالة',
  },
  {
    CIT_CODE: 51,
    CIT_NAME_EN: 'AS SIDAWI',
    CIT_NAME_AR: 'الصداوي',
  },
  {
    CIT_CODE: 52,
    CIT_NAME_EN: 'UMM QULAIB',
    CIT_NAME_AR: 'ام قليب',
  },
  {
    CIT_CODE: 53,
    CIT_NAME_EN: 'URAYFIJ',
    CIT_NAME_AR: 'عريفج',
  },
  {
    CIT_CODE: 54,
    CIT_NAME_EN: 'IBN SHARAR',
    CIT_NAME_AR: 'ابن شرار',
  },
  {
    CIT_CODE: 55,
    CIT_NAME_EN: 'AL QAYSUMAH',
    CIT_NAME_AR: 'القيصومة',
  },
  {
    CIT_CODE: 56,
    CIT_NAME_EN: "AR RUQ'I AL JADIDAH",
    CIT_NAME_AR: 'الرقعي الجديدة',
  },
  {
    CIT_CODE: 57,
    CIT_NAME_EN: 'DHABHAH',
    CIT_NAME_AR: 'ذبحة',
  },
  {
    CIT_CODE: 58,
    CIT_NAME_EN: 'AS SUFAIRY',
    CIT_NAME_AR: 'الصفيري',
  },
  {
    CIT_CODE: 59,
    CIT_NAME_EN: 'AL WAYLIYAH',
    CIT_NAME_AR: 'الوايلية',
  },
  {
    CIT_CODE: 60,
    CIT_NAME_EN: 'AL FIWAN',
    CIT_NAME_AR: 'الفيوان',
  },
  {
    CIT_CODE: 61,
    CIT_NAME_EN: 'AL HAMATIYAT',
    CIT_NAME_AR: 'الحماطيات',
  },
  {
    CIT_CODE: 63,
    CIT_NAME_EN: 'AL JABU',
    CIT_NAME_AR: 'الجبو',
  },
  {
    CIT_CODE: 64,
    CIT_NAME_EN: 'AL MASNAH',
    CIT_NAME_AR: 'المسناة',
  },
  {
    CIT_CODE: 66,
    CIT_NAME_EN: 'UMM ISHAR ASH SHARQIYYAH',
    CIT_NAME_AR: 'ام عشر الشرقية',
  },
  {
    CIT_CODE: 68,
    CIT_NAME_EN: 'BUHAN',
    CIT_NAME_AR: 'بوهان',
  },
  {
    CIT_CODE: 69,
    CIT_NAME_EN: 'AS SANANIYAT',
    CIT_NAME_AR: 'السنانيات',
  },
  {
    CIT_CODE: 70,
    CIT_NAME_EN: 'HAZAYA',
    CIT_NAME_AR: 'حزايا',
  },
  {
    CIT_CODE: 72,
    CIT_NAME_EN: 'BIR AL HAYZ',
    CIT_NAME_AR: 'بئر الحيز',
  },
  {
    CIT_CODE: 73,
    CIT_NAME_EN: 'JURAYDA',
    CIT_NAME_AR: 'جريداء',
  },
  {
    CIT_CODE: 75,
    CIT_NAME_EN: 'AL ASSAFIYAH',
    CIT_NAME_AR: 'العسافية',
  },
  {
    CIT_CODE: 76,
    CIT_NAME_EN: 'ARDAH',
    CIT_NAME_AR: 'عردة',
  },
  {
    CIT_CODE: 77,
    CIT_NAME_EN: 'AL KUTAIB',
    CIT_NAME_AR: 'الكتيب',
  },
  {
    CIT_CODE: 78,
    CIT_NAME_EN: "BI'R FAJR",
    CIT_NAME_AR: 'بئر فجر',
  },
  {
    CIT_CODE: 79,
    CIT_NAME_EN: 'AL QALIBAH',
    CIT_NAME_AR: 'القليبة',
  },
  {
    CIT_CODE: 81,
    CIT_NAME_EN: "AR RAF'IYAH",
    CIT_NAME_AR: 'الرافعية',
  },
  {
    CIT_CODE: 82,
    CIT_NAME_EN: 'AL KABARIT',
    CIT_NAME_AR: 'الكبريت',
  },
  {
    CIT_CODE: 83,
    CIT_NAME_EN: 'RAGHWAH',
    CIT_NAME_AR: 'رغوة',
  },
  {
    CIT_CODE: 84,
    CIT_NAME_EN: 'HAMMA',
    CIT_NAME_AR: 'حمى',
  },
  {
    CIT_CODE: 85,
    CIT_NAME_EN: 'AZ ZABR',
    CIT_NAME_AR: 'الزبر',
  },
  {
    CIT_CODE: 87,
    CIT_NAME_EN: 'AL MAHAWA',
    CIT_NAME_AR: 'المحوى',
  },
  {
    CIT_CODE: 88,
    CIT_NAME_EN: 'UMM GHAWR',
    CIT_NAME_AR: 'أم غور',
  },
  {
    CIT_CODE: 90,
    CIT_NAME_EN: "AR RAFI'AH",
    CIT_NAME_AR: 'الرفيعة',
  },
  {
    CIT_CODE: 91,
    CIT_NAME_EN: 'JARRARAH',
    CIT_NAME_AR: 'جرارة',
  },
  {
    CIT_CODE: 92,
    CIT_NAME_EN: 'QURAYYAH',
    CIT_NAME_AR: 'قرية',
  },
  {
    CIT_CODE: 93,
    CIT_NAME_EN: 'AL BUWAYBIYAT',
    CIT_NAME_AR: 'البويبيات',
  },
  {
    CIT_CODE: 94,
    CIT_NAME_EN: "AS SU'AYYIRAH",
    CIT_NAME_AR: 'السعيرة',
  },
  {
    CIT_CODE: 95,
    CIT_NAME_EN: 'MANAKH',
    CIT_NAME_AR: 'مناخ',
  },
  {
    CIT_CODE: 96,
    CIT_NAME_EN: 'AL HAYRA',
    CIT_NAME_AR: 'الحيرا',
  },
  {
    CIT_CODE: 97,
    CIT_NAME_EN: 'UMM ASH SHIFALLAH',
    CIT_NAME_AR: 'ام الشفلح',
  },
  {
    CIT_CODE: 98,
    CIT_NAME_EN: 'AL LAHABAH',
    CIT_NAME_AR: 'اللهابة',
  },
  {
    CIT_CODE: 99,
    CIT_NAME_EN: 'AL FARRIDAH',
    CIT_NAME_AR: 'الفريدة',
  },
  {
    CIT_CODE: 100,
    CIT_NAME_EN: 'ASH SHAMIYAH',
    CIT_NAME_AR: 'الشامية',
  },
  {
    CIT_CODE: 102,
    CIT_NAME_EN: 'SIHMAH',
    CIT_NAME_AR: 'سحمة',
  },
  {
    CIT_CODE: 104,
    CIT_NAME_EN: 'UMM AL HAWSHAT',
    CIT_NAME_AR: 'ام الهوشات',
  },
  {
    CIT_CODE: 105,
    CIT_NAME_EN: 'ASH SHAYYIT',
    CIT_NAME_AR: 'الشيط',
  },
  {
    CIT_CODE: 106,
    CIT_NAME_EN: "AL 'ADHIRIYAH",
    CIT_NAME_AR: 'العاذرية',
  },
  {
    CIT_CODE: 107,
    CIT_NAME_EN: 'ASH SHIHIYAH',
    CIT_NAME_AR: 'الشيحية',
  },
  {
    CIT_CODE: 108,
    CIT_NAME_EN: 'HIZWAH (AL UMANIYAH)',
    CIT_NAME_AR: 'حزوة / العمانية',
  },
  {
    CIT_CODE: 109,
    CIT_NAME_EN: "AL QAR'A'",
    CIT_NAME_AR: 'القرعاء',
  },
  {
    CIT_CODE: 110,
    CIT_NAME_EN: 'AL LISAFAH',
    CIT_NAME_AR: 'اللصافة',
  },
  {
    CIT_CODE: 111,
    CIT_NAME_EN: 'AN NUQAYRAH',
    CIT_NAME_AR: 'النقيرة',
  },
  {
    CIT_CODE: 112,
    CIT_NAME_EN: 'HIJRAT AWLAD HITHLIN',
    CIT_NAME_AR: 'هجرة أولاد حثلين',
  },
  {
    CIT_CODE: 114,
    CIT_NAME_EN: 'FARZAN',
    CIT_NAME_AR: 'فرزان',
  },
  {
    CIT_CODE: 116,
    CIT_NAME_EN: "UMM DULAY'",
    CIT_NAME_AR: 'ام ضليع',
  },
  {
    CIT_CODE: 117,
    CIT_NAME_EN: 'MULAYJAH',
    CIT_NAME_AR: 'مليجة',
  },
  {
    CIT_CODE: 118,
    CIT_NAME_EN: 'AS SARRAR',
    CIT_NAME_AR: 'الصرار',
  },
  {
    CIT_CODE: 119,
    CIT_NAME_EN: 'HANIDH',
    CIT_NAME_AR: 'حنيذ',
  },
  {
    CIT_CODE: 120,
    CIT_NAME_EN: 'MUGHATI',
    CIT_NAME_AR: 'مغطي',
  },
  {
    CIT_CODE: 121,
    CIT_NAME_EN: 'SHIFIYAH',
    CIT_NAME_AR: 'شفية',
  },
  {
    CIT_CODE: 123,
    CIT_NAME_EN: 'AL HISI',
    CIT_NAME_AR: 'الحسي',
  },
  {
    CIT_CODE: 124,
    CIT_NAME_EN: 'THAJ',
    CIT_NAME_AR: 'ثاج',
  },
  {
    CIT_CODE: 125,
    CIT_NAME_EN: 'AL HINNAH',
    CIT_NAME_AR: 'الحناة',
  },
  {
    CIT_CODE: 126,
    CIT_NAME_EN: 'AL KAHAFAH',
    CIT_NAME_AR: 'الكهفة',
  },
  {
    CIT_CODE: 127,
    CIT_NAME_EN: 'AS SAHAF',
    CIT_NAME_AR: 'الصحاف',
  },
  {
    CIT_CODE: 128,
    CIT_NAME_EN: 'AL UYAINAH',
    CIT_NAME_AR: 'العيينة',
  },
  {
    CIT_CODE: 129,
    CIT_NAME_EN: 'AL QULAYYIB',
    CIT_NAME_AR: 'القليب',
  },
  {
    CIT_CODE: 130,
    CIT_NAME_EN: 'AL WANNAN',
    CIT_NAME_AR: 'الونان',
  },
  {
    CIT_CODE: 131,
    CIT_NAME_EN: 'GHANWA',
    CIT_NAME_AR: 'غنوى',
  },
  {
    CIT_CODE: 133,
    CIT_NAME_EN: "NITA'",
    CIT_NAME_AR: 'نطاع',
  },
  {
    CIT_CODE: 134,
    CIT_NAME_EN: 'UMM AL HAMAM',
    CIT_NAME_AR: 'ام الحمام',
  },
  {
    CIT_CODE: 135,
    CIT_NAME_EN: "UMM RUBAY'AH",
    CIT_NAME_AR: 'ام ربيعة',
  },
  {
    CIT_CODE: 136,
    CIT_NAME_EN: 'ABU HADRIYAH',
    CIT_NAME_AR: 'ابو حدرية',
  },
  {
    CIT_CODE: 137,
    CIT_NAME_EN: 'MUNIFAH',
    CIT_NAME_AR: 'منيفة',
  },
  {
    CIT_CODE: 138,
    CIT_NAME_EN: 'AL-AFLAJ',
    CIT_NAME_AR: 'الأفلاج',
  },
  {
    CIT_CODE: 139,
    CIT_NAME_EN: 'KHAITAN',
    CIT_NAME_AR: 'خيطان',
  },
  {
    CIT_CODE: 140,
    CIT_NAME_EN: "AL WASI'AH",
    CIT_NAME_AR: 'الوسيعة',
  },
  {
    CIT_CODE: 141,
    CIT_NAME_EN: 'TAMRIYAH',
    CIT_NAME_AR: 'تمرية',
  },
  {
    CIT_CODE: 142,
    CIT_NAME_EN: 'ABU KHUSAYFA',
    CIT_NAME_AR: 'ابو خسيفاء',
  },
  {
    CIT_CODE: 143,
    CIT_NAME_EN: 'AN NAKHIL',
    CIT_NAME_AR: 'النخيل',
  },
  {
    CIT_CODE: 144,
    CIT_NAME_EN: 'AS SUHAYMI',
    CIT_NAME_AR: 'السحيمي',
  },
  {
    CIT_CODE: 145,
    CIT_NAME_EN: 'MUSIDDAH',
    CIT_NAME_AR: 'مصدة',
  },
  {
    CIT_CODE: 147,
    CIT_NAME_EN: 'AT TANHAH',
    CIT_NAME_AR: 'التنهاة',
  },
  {
    CIT_CODE: 148,
    CIT_NAME_EN: 'QIRI AT TUWAYM',
    CIT_NAME_AR: 'قري التويم',
  },
  {
    CIT_CODE: 149,
    CIT_NAME_EN: 'ASH SHAHMAH',
    CIT_NAME_AR: 'الشحمة',
  },
  {
    CIT_CODE: 150,
    CIT_NAME_EN: 'AL WUDAYY',
    CIT_NAME_AR: 'الودي',
  },
  {
    CIT_CODE: 151,
    CIT_NAME_EN: 'JUWAYY',
    CIT_NAME_AR: 'جوي',
  },
  {
    CIT_CODE: 152,
    CIT_NAME_EN: 'MUQBILAH',
    CIT_NAME_AR: 'مقبلة',
  },
  {
    CIT_CODE: 154,
    CIT_NAME_EN: "AL MA'DHAM",
    CIT_NAME_AR: 'المعظم',
  },
  {
    CIT_CODE: 155,
    CIT_NAME_EN: 'JIRAB',
    CIT_NAME_AR: 'جراب',
  },
  {
    CIT_CODE: 156,
    CIT_NAME_EN: 'AL UQLAH',
    CIT_NAME_AR: 'العقلة',
  },
  {
    CIT_CODE: 157,
    CIT_NAME_EN: 'AN NUGHAYQ',
    CIT_NAME_AR: 'النغيق',
  },
  {
    CIT_CODE: 158,
    CIT_NAME_EN: 'HUWAIMIDAH',
    CIT_NAME_AR: 'حويمضة',
  },
  {
    CIT_CODE: 159,
    CIT_NAME_EN: "AL BUTAIRA'",
    CIT_NAME_AR: 'البتيراء',
  },
  {
    CIT_CODE: 160,
    CIT_NAME_EN: 'AL MISHASH',
    CIT_NAME_AR: 'المشاش',
  },
  {
    CIT_CODE: 161,
    CIT_NAME_EN: 'AL FURUTHI',
    CIT_NAME_AR: 'الفروثي',
  },
  {
    CIT_CODE: 162,
    CIT_NAME_EN: 'JALAJIL',
    CIT_NAME_AR: 'جلاجل',
  },
  {
    CIT_CODE: 163,
    CIT_NAME_EN: 'AD DAKHILAH',
    CIT_NAME_AR: 'الدخيلة',
  },
  {
    CIT_CODE: 164,
    CIT_NAME_EN: 'AL HUSUN',
    CIT_NAME_AR: 'الحصون',
  },
  {
    CIT_CODE: 165,
    CIT_NAME_EN: 'HAWTET SDER',
    CIT_NAME_AR: 'حوطة سدير',
  },
  {
    CIT_CODE: 166,
    CIT_NAME_EN: 'RAWDHAT SUDAIR',
    CIT_NAME_AR: 'روضة سدير',
  },
  {
    CIT_CODE: 169,
    CIT_NAME_EN: "AL 'AMAR",
    CIT_NAME_AR: 'العمار',
  },
  {
    CIT_CODE: 170,
    CIT_NAME_EN: 'AL KHIS',
    CIT_NAME_AR: 'الخيس',
  },
  {
    CIT_CODE: 171,
    CIT_NAME_EN: "AL MA'ASHBAH",
    CIT_NAME_AR: 'المعشبة',
  },
  {
    CIT_CODE: 172,
    CIT_NAME_EN: 'AT TUWAYM',
    CIT_NAME_AR: 'التويم',
  },
  {
    CIT_CODE: 173,
    CIT_NAME_EN: 'AL KHUTAMAH',
    CIT_NAME_AR: 'الخطامة',
  },
  {
    CIT_CODE: 175,
    CIT_NAME_EN: "ASH SHI'B",
    CIT_NAME_AR: 'الشعب',
  },
  {
    CIT_CODE: 176,
    CIT_NAME_EN: 'ASHARAT SUDAIR',
    CIT_NAME_AR: 'عشيرة سدير',
  },
  {
    CIT_CODE: 177,
    CIT_NAME_EN: 'AL JUNAYFI',
    CIT_NAME_AR: 'الجنيفي',
  },
  {
    CIT_CODE: 178,
    CIT_NAME_EN: "AL 'ATTAR",
    CIT_NAME_AR: 'العطار',
  },
  {
    CIT_CODE: 179,
    CIT_NAME_EN: 'UMM AL JAMAJIM',
    CIT_NAME_AR: 'ام الجماجم',
  },
  {
    CIT_CODE: 181,
    CIT_NAME_EN: 'UMM RUJUM',
    CIT_NAME_AR: 'ام رجوم',
  },
  {
    CIT_CODE: 183,
    CIT_NAME_EN: 'AL FAISALIYAH',
    CIT_NAME_AR: 'الفيصلية',
  },
  {
    CIT_CODE: 184,
    CIT_NAME_EN: "BAWDA'",
    CIT_NAME_AR: 'بوضاء',
  },
  {
    CIT_CODE: 185,
    CIT_NAME_EN: 'AL HAIR',
    CIT_NAME_AR: 'الحائر',
  },
  {
    CIT_CODE: 186,
    CIT_NAME_EN: 'WUSHAYY',
    CIT_NAME_AR: 'وشي',
  },
  {
    CIT_CODE: 187,
    CIT_NAME_EN: 'AWDAT SUDAYR',
    CIT_NAME_AR: 'عودة سدير',
  },
  {
    CIT_CODE: 188,
    CIT_NAME_EN: 'MUBAYID',
    CIT_NAME_AR: 'مبايض',
  },
  {
    CIT_CODE: 190,
    CIT_NAME_EN: 'DIBDIBBAT FUDALA',
    CIT_NAME_AR: 'دبدبة فضلاء',
  },
  {
    CIT_CODE: 191,
    CIT_NAME_EN: 'AL HAJAB',
    CIT_NAME_AR: 'الحجب',
  },
  {
    CIT_CODE: 192,
    CIT_NAME_EN: 'ADH DHALFAH',
    CIT_NAME_AR: 'الضلفة',
  },
  {
    CIT_CODE: 193,
    CIT_NAME_EN: 'ABU TAQAH',
    CIT_NAME_AR: 'أبو طاقة',
  },
  {
    CIT_CODE: 194,
    CIT_NAME_EN: "AL 'AYN AL JADIDAH",
    CIT_NAME_AR: 'العين الجديدة',
  },
  {
    CIT_CODE: 195,
    CIT_NAME_EN: "AL QA'ARAH",
    CIT_NAME_AR: 'القعرة',
  },
  {
    CIT_CODE: 196,
    CIT_NAME_EN: 'UMM ZARB',
    CIT_NAME_AR: 'أم زرب',
  },
  {
    CIT_CODE: 197,
    CIT_NAME_EN: 'HADIYAH',
    CIT_NAME_AR: 'هدية',
  },
  {
    CIT_CODE: 202,
    CIT_NAME_EN: 'SHALAL',
    CIT_NAME_AR: 'شلال',
  },
  {
    CIT_CODE: 203,
    CIT_NAME_EN: "DA'A",
    CIT_NAME_AR: 'ضاعا',
  },
  {
    CIT_CODE: 204,
    CIT_NAME_EN: 'JAYDAH',
    CIT_NAME_AR: 'جيدة',
  },
  {
    CIT_CODE: 205,
    CIT_NAME_EN: "QULBAN 'ISHARAH",
    CIT_NAME_AR: 'قلبان عشرة',
  },
  {
    CIT_CODE: 206,
    CIT_NAME_EN: 'AN NAJIL',
    CIT_NAME_AR: 'النجيل',
  },
  {
    CIT_CODE: 207,
    CIT_NAME_EN: 'AR RUZAYQIYAH',
    CIT_NAME_AR: 'الرزيقية',
  },
  {
    CIT_CODE: 208,
    CIT_NAME_EN: 'AL HAMIDIYAH',
    CIT_NAME_AR: 'الحميدية',
  },
  {
    CIT_CODE: 209,
    CIT_NAME_EN: 'SADR',
    CIT_NAME_AR: 'صدر',
  },
  {
    CIT_CODE: 210,
    CIT_NAME_EN: "MUGHAYRA'",
    CIT_NAME_AR: 'مغيراء',
  },
  {
    CIT_CODE: 211,
    CIT_NAME_EN: 'QUSAYB ABU SIYAL',
    CIT_NAME_AR: 'قصيب ابو سيال',
  },
  {
    CIT_CODE: 212,
    CIT_NAME_EN: 'ABU ARAKAH',
    CIT_NAME_AR: 'ابو اراكة',
  },
  {
    CIT_CODE: 214,
    CIT_NAME_EN: 'AWARSH',
    CIT_NAME_AR: 'عورش',
  },
  {
    CIT_CODE: 215,
    CIT_NAME_EN: 'AN NUSHAYFAH',
    CIT_NAME_AR: 'النشيفة',
  },
  {
    CIT_CODE: 216,
    CIT_NAME_EN: 'AZ ZUBAYIR',
    CIT_NAME_AR: 'الزباير',
  },
  {
    CIT_CODE: 217,
    CIT_NAME_EN: "AD DULAY'AH",
    CIT_NAME_AR: 'الضليعة',
  },
  {
    CIT_CODE: 218,
    CIT_NAME_EN: "MITAN AL 'URAYQAH",
    CIT_NAME_AR: 'متان العريقة',
  },
  {
    CIT_CODE: 219,
    CIT_NAME_EN: 'AL ABRAQ',
    CIT_NAME_AR: 'الابرق',
  },
  {
    CIT_CODE: 220,
    CIT_NAME_EN: 'AMIRAH',
    CIT_NAME_AR: 'اميرة',
  },
  {
    CIT_CODE: 221,
    CIT_NAME_EN: 'AL JADIDAH',
    CIT_NAME_AR: 'الجديدة',
  },
  {
    CIT_CODE: 222,
    CIT_NAME_EN: 'KUTAYFAT MASADIR',
    CIT_NAME_AR: 'كتيفة مصادر',
  },
  {
    CIT_CODE: 223,
    CIT_NAME_EN: 'AR RAS',
    CIT_NAME_AR: 'الراس',
  },
  {
    CIT_CODE: 224,
    CIT_NAME_EN: 'AL BAYT',
    CIT_NAME_AR: 'البيت',
  },
  {
    CIT_CODE: 225,
    CIT_NAME_EN: 'BIR BAHAR',
    CIT_NAME_AR: 'بئر بحار',
  },
  {
    CIT_CODE: 226,
    CIT_NAME_EN: 'SABHAN',
    CIT_NAME_AR: 'سبحان',
  },
  {
    CIT_CODE: 228,
    CIT_NAME_EN: 'UMM AR RIH',
    CIT_NAME_AR: 'أم الريح',
  },
  {
    CIT_CODE: 229,
    CIT_NAME_EN: 'HARAM',
    CIT_NAME_AR: 'حرم',
  },
  {
    CIT_CODE: 230,
    CIT_NAME_EN: 'AKUZ',
    CIT_NAME_AR: 'عكوز',
  },
  {
    CIT_CODE: 231,
    CIT_NAME_EN: 'AS SUDAYD',
    CIT_NAME_AR: 'السديد',
  },
  {
    CIT_CODE: 232,
    CIT_NAME_EN: 'AL HUFAYYIRAH',
    CIT_NAME_AR: 'الحفيرة',
  },
  {
    CIT_CODE: 234,
    CIT_NAME_EN: "AN NABI'",
    CIT_NAME_AR: 'النابع',
  },
  {
    CIT_CODE: 235,
    CIT_NAME_EN: 'ANTAR',
    CIT_NAME_AR: 'عنتر',
  },
  {
    CIT_CODE: 236,
    CIT_NAME_EN: 'AL MANJUR',
    CIT_NAME_AR: 'المنجور',
  },
  {
    CIT_CODE: 237,
    CIT_NAME_EN: 'ABA AL QIZAZ',
    CIT_NAME_AR: 'ابا القزاز',
  },
  {
    CIT_CODE: 238,
    CIT_NAME_EN: "BADA'",
    CIT_NAME_AR: 'بداء',
  },
  {
    CIT_CODE: 239,
    CIT_NAME_EN: "KHURBA'",
    CIT_NAME_AR: 'خرباء',
  },
  {
    CIT_CODE: 240,
    CIT_NAME_EN: 'AL KURR',
    CIT_NAME_AR: 'الكر',
  },
  {
    CIT_CODE: 241,
    CIT_NAME_EN: 'BURQ AL USAYDIYAH',
    CIT_NAME_AR: 'برق الأسيدية',
  },
  {
    CIT_CODE: 242,
    CIT_NAME_EN: 'AL FADILI',
    CIT_NAME_AR: 'الفاضلي',
  },
  {
    CIT_CODE: 245,
    CIT_NAME_EN: 'DHULUM',
    CIT_NAME_AR: 'ظلوم',
  },
  {
    CIT_CODE: 246,
    CIT_NAME_EN: 'NEW AIN DAR',
    CIT_NAME_AR: 'عين دار الجديده',
  },
  {
    CIT_CODE: 247,
    CIT_NAME_EN: 'OLD AIN DAR',
    CIT_NAME_AR: 'عين دار القديمة',
  },
  {
    CIT_CODE: 248,
    CIT_NAME_EN: 'ALLAT',
    CIT_NAME_AR: 'علاة',
  },
  {
    CIT_CODE: 249,
    CIT_NAME_EN: 'FUDAH',
    CIT_NAME_AR: 'فودة',
  },
  {
    CIT_CODE: 250,
    CIT_NAME_EN: 'AL KIDADIYAH',
    CIT_NAME_AR: 'الكدادية',
  },
  {
    CIT_CODE: 251,
    CIT_NAME_EN: 'YAKRUB',
    CIT_NAME_AR: 'يكرب',
  },
  {
    CIT_CODE: 252,
    CIT_NAME_EN: 'AL JABIRIYAH',
    CIT_NAME_AR: 'الجابرية',
  },
  {
    CIT_CODE: 253,
    CIT_NAME_EN: 'SALASIL',
    CIT_NAME_AR: 'صلاصل',
  },
  {
    CIT_CODE: 254,
    CIT_NAME_EN: "SHUHAYLA'",
    CIT_NAME_AR: 'شهيلاء',
  },
  {
    CIT_CODE: 255,
    CIT_NAME_EN: 'USAYFIRAT',
    CIT_NAME_AR: 'عصيفرات',
  },
  {
    CIT_CODE: 257,
    CIT_NAME_EN: 'AD DUGHAYMIYAH',
    CIT_NAME_AR: 'الدغيمية',
  },
  {
    CIT_CODE: 258,
    CIT_NAME_EN: 'AR RAWDAH',
    CIT_NAME_AR: 'الروضة',
  },
  {
    CIT_CODE: 259,
    CIT_NAME_EN: 'AL MANSAF',
    CIT_NAME_AR: 'المنسف',
  },
  {
    CIT_CODE: 260,
    CIT_NAME_EN: 'MANSIYAH AL GHARBIYAH',
    CIT_NAME_AR: 'منسية الغربية',
  },
  {
    CIT_CODE: 261,
    CIT_NAME_EN: 'USHAYRAH',
    CIT_NAME_AR: 'عشيرة',
  },
  {
    CIT_CODE: 263,
    CIT_NAME_EN: 'ATH THUWAYR',
    CIT_NAME_AR: 'الثوير',
  },
  {
    CIT_CODE: 264,
    CIT_NAME_EN: 'ZULAYGHIF',
    CIT_NAME_AR: 'زليغف',
  },
  {
    CIT_CODE: 265,
    CIT_NAME_EN: "MAZARI' AL ATHLAH",
    CIT_NAME_AR: 'مزارع الاثلة',
  },
  {
    CIT_CODE: 266,
    CIT_NAME_EN: "MAZARI' AR RUHAYYAH",
    CIT_NAME_AR: 'مزارع الرحية',
  },
  {
    CIT_CODE: 267,
    CIT_NAME_EN: 'QUSAYBA',
    CIT_NAME_AR: 'قصيباء',
  },
  {
    CIT_CODE: 268,
    CIT_NAME_EN: "MAZRA'AT BAYDA NUTHAYL",
    CIT_NAME_AR: 'مزرعة بيضاء نثيل',
  },
  {
    CIT_CODE: 269,
    CIT_NAME_EN: 'IMARAT AL MISTAWI',
    CIT_NAME_AR: 'امارة المستوي',
  },
  {
    CIT_CODE: 271,
    CIT_NAME_EN: 'SAMNAN',
    CIT_NAME_AR: 'سمنان',
  },
  {
    CIT_CODE: 272,
    CIT_NAME_EN: 'ILIQAH',
    CIT_NAME_AR: 'علقة',
  },
  {
    CIT_CODE: 273,
    CIT_NAME_EN: "AL 'AYN",
    CIT_NAME_AR: 'العين',
  },
  {
    CIT_CODE: 274,
    CIT_NAME_EN: 'AL MUDHAWIH',
    CIT_NAME_AR: 'المضاويح',
  },
  {
    CIT_CODE: 275,
    CIT_NAME_EN: 'ABA AL BAQAR',
    CIT_NAME_AR: 'ابا البقر',
  },
  {
    CIT_CODE: 276,
    CIT_NAME_EN: 'AL HARDHAH',
    CIT_NAME_AR: 'الحرضة',
  },
  {
    CIT_CODE: 277,
    CIT_NAME_EN: 'AD DIRS',
    CIT_NAME_AR: 'الضرس',
  },
  {
    CIT_CODE: 278,
    CIT_NAME_EN: 'AL KHORAIBAH',
    CIT_NAME_AR: 'الخريبة',
  },
  {
    CIT_CODE: 279,
    CIT_NAME_EN: "AL 'ARAID",
    CIT_NAME_AR: 'العرائد',
  },
  {
    CIT_CODE: 280,
    CIT_NAME_EN: 'GHAMRAH',
    CIT_NAME_AR: 'غمرة',
  },
  {
    CIT_CODE: 281,
    CIT_NAME_EN: "AL 'UQILAH",
    CIT_NAME_AR: 'العقيلة',
  },
  {
    CIT_CODE: 282,
    CIT_NAME_EN: "AL 'ADLAH",
    CIT_NAME_AR: 'العدلة',
  },
  {
    CIT_CODE: 283,
    CIT_NAME_EN: 'AD DISAH',
    CIT_NAME_AR: 'الديسة',
  },
  {
    CIT_CODE: 284,
    CIT_NAME_EN: 'AS SULAYMI',
    CIT_NAME_AR: 'السليمي',
  },
  {
    CIT_CODE: 285,
    CIT_NAME_EN: 'AL JARF',
    CIT_NAME_AR: 'الجرف',
  },
  {
    CIT_CODE: 286,
    CIT_NAME_EN: 'AL HADHLULI',
    CIT_NAME_AR: 'الهذلولي',
  },
  {
    CIT_CODE: 287,
    CIT_NAME_EN: "JAD'A",
    CIT_NAME_AR: 'جدعاء',
  },
  {
    CIT_CODE: 289,
    CIT_NAME_EN: 'AL LIHIN',
    CIT_NAME_AR: 'اللحن',
  },
  {
    CIT_CODE: 290,
    CIT_NAME_EN: "AL 'ISHASH",
    CIT_NAME_AR: 'العشاش',
  },
  {
    CIT_CODE: 291,
    CIT_NAME_EN: 'AS SILSILAH',
    CIT_NAME_AR: 'الصلصلة',
  },
  {
    CIT_CODE: 292,
    CIT_NAME_EN: 'AL THAMAD',
    CIT_NAME_AR: 'الثمد',
  },
  {
    CIT_CODE: 293,
    CIT_NAME_EN: 'AL UYAYNAH',
    CIT_NAME_AR: 'العينية',
  },
  {
    CIT_CODE: 294,
    CIT_NAME_EN: 'ROMAH',
    CIT_NAME_AR: 'رماح',
  },
  {
    CIT_CODE: 295,
    CIT_NAME_EN: 'HAFR AL ATK',
    CIT_NAME_AR: 'حفر العتك',
  },
  {
    CIT_CODE: 296,
    CIT_NAME_EN: "AL MUZAYRI'",
    CIT_NAME_AR: 'المزيرع',
  },
  {
    CIT_CODE: 297,
    CIT_NAME_EN: 'SHAWYAH',
    CIT_NAME_AR: 'شوية',
  },
  {
    CIT_CODE: 298,
    CIT_NAME_EN: 'AL HIFNAH',
    CIT_NAME_AR: 'الحفنة',
  },
  {
    CIT_CODE: 299,
    CIT_NAME_EN: 'AL GHAYLANAH',
    CIT_NAME_AR: 'الغيلانة',
  },
  {
    CIT_CODE: 300,
    CIT_NAME_EN: 'AR RUMHIYAH',
    CIT_NAME_AR: 'الرمحية',
  },
  {
    CIT_CODE: 301,
    CIT_NAME_EN: 'AR RAKAH',
    CIT_NAME_AR: 'الراكة',
  },
  {
    CIT_CODE: 302,
    CIT_NAME_EN: 'AL KHURAYTAH',
    CIT_NAME_AR: 'الخريطة',
  },
  {
    CIT_CODE: 303,
    CIT_NAME_EN: 'ATH THUQBAH',
    CIT_NAME_AR: 'الثقبة',
  },
  {
    CIT_CODE: 304,
    CIT_NAME_EN: "AL 'AZIZIYAH",
    CIT_NAME_AR: 'العزيزية',
  },
  {
    CIT_CODE: 305,
    CIT_NAME_EN: 'SHADWA',
    CIT_NAME_AR: 'شدوا',
  },
  {
    CIT_CODE: 308,
    CIT_NAME_EN: 'ASH SHABAN',
    CIT_NAME_AR: 'الشبعان',
  },
  {
    CIT_CODE: 309,
    CIT_NAME_EN: 'AD DUQUM',
    CIT_NAME_AR: 'الدقم',
  },
  {
    CIT_CODE: 310,
    CIT_NAME_EN: 'AL QARS',
    CIT_NAME_AR: 'القرص',
  },
  {
    CIT_CODE: 311,
    CIT_NAME_EN: 'HIRAD',
    CIT_NAME_AR: 'حراض',
  },
  {
    CIT_CODE: 312,
    CIT_NAME_EN: 'ASH SHIBAHAH',
    CIT_NAME_AR: 'الشبحة',
  },
  {
    CIT_CODE: 313,
    CIT_NAME_EN: 'RAWDAT AL AGHAYDIRAT',
    CIT_NAME_AR: 'روضة الاغيدرات',
  },
  {
    CIT_CODE: 314,
    CIT_NAME_EN: 'AL KHADRA AL JADIDAH',
    CIT_NAME_AR: 'الخضراء الجديدة',
  },
  {
    CIT_CODE: 315,
    CIT_NAME_EN: 'SAMUR',
    CIT_NAME_AR: 'سمور',
  },
  {
    CIT_CODE: 316,
    CIT_NAME_EN: 'AL RUWAYDAT',
    CIT_NAME_AR: 'الرويضات',
  },
  {
    CIT_CODE: 317,
    CIT_NAME_EN: 'AL MAHADRAH',
    CIT_NAME_AR: 'المهدرة',
  },
  {
    CIT_CODE: 318,
    CIT_NAME_EN: 'BUQAYLAH',
    CIT_NAME_AR: 'بقيلة',
  },
  {
    CIT_CODE: 319,
    CIT_NAME_EN: "AN NU'AYLAH",
    CIT_NAME_AR: 'النعيلة',
  },
  {
    CIT_CODE: 320,
    CIT_NAME_EN: 'AZ ZAGHLIYAH',
    CIT_NAME_AR: 'الزغلية',
  },
  {
    CIT_CODE: 321,
    CIT_NAME_EN: 'TUWALAH',
    CIT_NAME_AR: 'توله',
  },
  {
    CIT_CODE: 324,
    CIT_NAME_EN: 'FAMM SHITHATH',
    CIT_NAME_AR: 'فم شثاث',
  },
  {
    CIT_CODE: 325,
    CIT_NAME_EN: 'AL HARRAH',
    CIT_NAME_AR: 'الحرة',
  },
  {
    CIT_CODE: 326,
    CIT_NAME_EN: "AL 'AMBIJAH",
    CIT_NAME_AR: 'العمبجة',
  },
  {
    CIT_CODE: 327,
    CIT_NAME_EN: 'ASH SHIDAKH',
    CIT_NAME_AR: 'الشدخ',
  },
  {
    CIT_CODE: 328,
    CIT_NAME_EN: 'AL MARAMIYAH',
    CIT_NAME_AR: 'المرامية',
  },
  {
    CIT_CODE: 329,
    CIT_NAME_EN: "MAZARI' AL BADAI'",
    CIT_NAME_AR: 'مزارع البدائع',
  },
  {
    CIT_CODE: 330,
    CIT_NAME_EN: 'AL KHATILAH',
    CIT_NAME_AR: 'الخاتلة',
  },
  {
    CIT_CODE: 331,
    CIT_NAME_EN: 'AL BILAD AL WUSTA',
    CIT_NAME_AR: 'البلاد الوسطى',
  },
  {
    CIT_CODE: 332,
    CIT_NAME_EN: "AL 'ULYA",
    CIT_NAME_AR: 'العليا',
  },
  {
    CIT_CODE: 333,
    CIT_NAME_EN: 'AL HISYAN',
    CIT_NAME_AR: 'الحسيان',
  },
  {
    CIT_CODE: 334,
    CIT_NAME_EN: "AD DUL 'AYI",
    CIT_NAME_AR: 'الضلعي',
  },
  {
    CIT_CODE: 335,
    CIT_NAME_EN: 'TUNAIBIKAH',
    CIT_NAME_AR: 'تنيبيكة',
  },
  {
    CIT_CODE: 336,
    CIT_NAME_EN: 'ABLA',
    CIT_NAME_AR: 'عبلة',
  },
  {
    CIT_CODE: 337,
    CIT_NAME_EN: 'ABLIYAH',
    CIT_NAME_AR: 'عبلية',
  },
  {
    CIT_CODE: 338,
    CIT_NAME_EN: 'HIJRAT AS SILAT',
    CIT_NAME_AR: 'هجرة السلات',
  },
  {
    CIT_CODE: 339,
    CIT_NAME_EN: 'UMM TALHAH',
    CIT_NAME_AR: 'ام طلحة',
  },
  {
    CIT_CODE: 340,
    CIT_NAME_EN: "MUA'RIJ QULAISHAH",
    CIT_NAME_AR: 'معرج قليشة',
  },
  {
    CIT_CODE: 341,
    CIT_NAME_EN: 'DAGHAN',
    CIT_NAME_AR: 'داغان',
  },
  {
    CIT_CODE: 342,
    CIT_NAME_EN: 'AL JURFIYAH',
    CIT_NAME_AR: 'الجرفية',
  },
  {
    CIT_CODE: 343,
    CIT_NAME_EN: 'HASHASHAH',
    CIT_NAME_AR: 'حشاشة',
  },
  {
    CIT_CODE: 344,
    CIT_NAME_EN: 'DARAT AL MARDAMAH',
    CIT_NAME_AR: 'دارة المردمة',
  },
  {
    CIT_CODE: 345,
    CIT_NAME_EN: 'LAHDAT AS SAYAHID',
    CIT_NAME_AR: 'لهدة الصياهد',
  },
  {
    CIT_CODE: 346,
    CIT_NAME_EN: 'AL BARZA',
    CIT_NAME_AR: 'البرزاء',
  },
  {
    CIT_CODE: 347,
    CIT_NAME_EN: 'AL FAYDAH',
    CIT_NAME_AR: 'الفيضة',
  },
  {
    CIT_CODE: 348,
    CIT_NAME_EN: 'AL KHALDIYAH',
    CIT_NAME_AR: 'الخالدية',
  },
  {
    CIT_CODE: 349,
    CIT_NAME_EN: 'AL HAMADAH',
    CIT_NAME_AR: 'الحمادة',
  },
  {
    CIT_CODE: 350,
    CIT_NAME_EN: 'AL QARARAH',
    CIT_NAME_AR: 'القرارة',
  },
  {
    CIT_CODE: 351,
    CIT_NAME_EN: 'AL HAMNAH',
    CIT_NAME_AR: 'الحمنة',
  },
  {
    CIT_CODE: 352,
    CIT_NAME_EN: 'UMM AL GHIRAN',
    CIT_NAME_AR: 'أم الغيران',
  },
  {
    CIT_CODE: 353,
    CIT_NAME_EN: 'AL MUNDASSAH',
    CIT_NAME_AR: 'المندسة',
  },
  {
    CIT_CODE: 354,
    CIT_NAME_EN: 'AS SILAYMIYAH',
    CIT_NAME_AR: 'السليمية',
  },
  {
    CIT_CODE: 355,
    CIT_NAME_EN: 'AL BARRAQIYAH',
    CIT_NAME_AR: 'البراقية',
  },
  {
    CIT_CODE: 356,
    CIT_NAME_EN: 'AS SIRAQI',
    CIT_NAME_AR: 'السراقي',
  },
  {
    CIT_CODE: 357,
    CIT_NAME_EN: 'ABAR DAHMULAH',
    CIT_NAME_AR: 'آبار دحمولة',
  },
  {
    CIT_CODE: 359,
    CIT_NAME_EN: "BADAI' AL HARASIN",
    CIT_NAME_AR: 'بدائع الهراسين',
  },
  {
    CIT_CODE: 360,
    CIT_NAME_EN: 'MAHD ADH DHAHAB',
    CIT_NAME_AR: 'مهد الذهب',
  },
  {
    CIT_CODE: 361,
    CIT_NAME_EN: 'SUFAYNAH',
    CIT_NAME_AR: 'صفينة',
  },
  {
    CIT_CODE: 362,
    CIT_NAME_EN: 'AR RIQABIYAH',
    CIT_NAME_AR: 'الرقابية',
  },
  {
    CIT_CODE: 363,
    CIT_NAME_EN: 'AS SULHANIYAH',
    CIT_NAME_AR: 'الصلحانية',
  },
  {
    CIT_CODE: 364,
    CIT_NAME_EN: 'AL GHASHIYAH',
    CIT_NAME_AR: 'الغاشية',
  },
  {
    CIT_CODE: 365,
    CIT_NAME_EN: 'AL ASAYHIR',
    CIT_NAME_AR: 'الاصيحر',
  },
  {
    CIT_CODE: 366,
    CIT_NAME_EN: 'AS SUWAYRIQIYAH',
    CIT_NAME_AR: 'السويرقية',
  },
  {
    CIT_CODE: 367,
    CIT_NAME_EN: 'THARB',
    CIT_NAME_AR: 'ثرب',
  },
  {
    CIT_CODE: 368,
    CIT_NAME_EN: 'HADHAH',
    CIT_NAME_AR: 'حاذة',
  },
  {
    CIT_CODE: 369,
    CIT_NAME_EN: 'AL UMAQ',
    CIT_NAME_AR: 'العمق',
  },
  {
    CIT_CODE: 370,
    CIT_NAME_EN: "AS SA'BIYAH",
    CIT_NAME_AR: 'الصعبية',
  },
  {
    CIT_CODE: 372,
    CIT_NAME_EN: 'AL JUHFAH',
    CIT_NAME_AR: 'الجحفة',
  },
  {
    CIT_CODE: 373,
    CIT_NAME_EN: 'RAYIN',
    CIT_NAME_AR: 'راين',
  },
  {
    CIT_CODE: 374,
    CIT_NAME_EN: 'AZ ZUWAYRA',
    CIT_NAME_AR: 'الزويراء',
  },
  {
    CIT_CODE: 375,
    CIT_NAME_EN: "AL NUWAYBI'",
    CIT_NAME_AR: 'النويبع',
  },
  {
    CIT_CODE: 378,
    CIT_NAME_EN: 'MASTURAH',
    CIT_NAME_AR: 'مستورة',
  },
  {
    CIT_CODE: 379,
    CIT_NAME_EN: "AL ABWA'",
    CIT_NAME_AR: 'الابواء',
  },
  {
    CIT_CODE: 380,
    CIT_NAME_EN: 'SHULUWAH',
    CIT_NAME_AR: 'شلوة',
  },
  {
    CIT_CODE: 381,
    CIT_NAME_EN: 'KILAYYAH',
    CIT_NAME_AR: 'كلية',
  },
  {
    CIT_CODE: 382,
    CIT_NAME_EN: 'HAJUR',
    CIT_NAME_AR: 'حجر',
  },
  {
    CIT_CODE: 383,
    CIT_NAME_EN: "SA'BAR",
    CIT_NAME_AR: 'صعبر',
  },
  {
    CIT_CODE: 384,
    CIT_NAME_EN: 'AT TANDABIYAH',
    CIT_NAME_AR: 'التنضبية',
  },
  {
    CIT_CODE: 385,
    CIT_NAME_EN: 'QUWAYZAH',
    CIT_NAME_AR: 'قويزة',
  },
  {
    CIT_CODE: 386,
    CIT_NAME_EN: 'AN NAZZAH',
    CIT_NAME_AR: 'النزة',
  },
  {
    CIT_CODE: 388,
    CIT_NAME_EN: 'AS SADR',
    CIT_NAME_AR: 'الصدر',
  },
  {
    CIT_CODE: 389,
    CIT_NAME_EN: 'AL MAGHARIBAH',
    CIT_NAME_AR: 'المغاربة',
  },
  {
    CIT_CODE: 390,
    CIT_NAME_EN: 'AL KUWAYSIYAH',
    CIT_NAME_AR: 'الكويسية',
  },
  {
    CIT_CODE: 391,
    CIT_NAME_EN: 'ABU HULAYFA',
    CIT_NAME_AR: 'ابو حليفاء',
  },
  {
    CIT_CODE: 392,
    CIT_NAME_EN: 'MAHJUBAH',
    CIT_NAME_AR: 'محجوبة',
  },
  {
    CIT_CODE: 393,
    CIT_NAME_EN: 'BIR AL FAYDAH',
    CIT_NAME_AR: 'بئر الفيضة',
  },
  {
    CIT_CODE: 394,
    CIT_NAME_EN: 'AL HUMAYJ',
    CIT_NAME_AR: 'الهميج',
  },
  {
    CIT_CODE: 2194,
    CIT_NAME_EN: 'ASH SHADQA',
    CIT_NAME_AR: 'الشدقاء',
  },
  {
    CIT_CODE: 2195,
    CIT_NAME_EN: 'AR RIQAH',
    CIT_NAME_AR: 'الريقة',
  },
  {
    CIT_CODE: 2198,
    CIT_NAME_EN: 'UMM HUBAYTIR',
    CIT_NAME_AR: 'ام حبيتر',
  },
  {
    CIT_CODE: 2200,
    CIT_NAME_EN: 'SHADAD',
    CIT_NAME_AR: 'شداد',
  },
  {
    CIT_CODE: 2201,
    CIT_NAME_EN: 'UMM AL ZILLAH',
    CIT_NAME_AR: 'ام الزلة',
  },
  {
    CIT_CODE: 2202,
    CIT_NAME_EN: "BANI DA'AD",
    CIT_NAME_AR: 'بني دعد',
  },
  {
    CIT_CODE: 2203,
    CIT_NAME_EN: 'UMM AR RAKAH',
    CIT_NAME_AR: 'ام الراكة',
  },
  {
    CIT_CODE: 2205,
    CIT_NAME_EN: 'AD DUHAYLAH',
    CIT_NAME_AR: 'الدحيلة',
  },
  {
    CIT_CODE: 2207,
    CIT_NAME_EN: "JU'RANAH",
    CIT_NAME_AR: 'جعرانة',
  },
  {
    CIT_CODE: 2209,
    CIT_NAME_EN: 'AL JIRANI',
    CIT_NAME_AR: 'الجراني',
  },
  {
    CIT_CODE: 2210,
    CIT_NAME_EN: 'AL HAMAD',
    CIT_NAME_AR: 'الحماد',
  },
  {
    CIT_CODE: 2211,
    CIT_NAME_EN: "NU'AYJ",
    CIT_NAME_AR: 'نعيج',
  },
  {
    CIT_CODE: 2212,
    CIT_NAME_EN: "QA' AL HINU",
    CIT_NAME_AR: 'قاع الحنو',
  },
  {
    CIT_CODE: 2214,
    CIT_NAME_EN: 'MARKAZ AS SAHAN',
    CIT_NAME_AR: 'مركز الصحن',
  },
  {
    CIT_CODE: 2215,
    CIT_NAME_EN: 'AL UWAYQILAH',
    CIT_NAME_AR: 'العويقلية',
  },
  {
    CIT_CODE: 2216,
    CIT_NAME_EN: 'ABA AR RAWATH',
    CIT_NAME_AR: 'أبا الرواث',
  },
  {
    CIT_CODE: 2217,
    CIT_NAME_EN: 'AL KASIB',
    CIT_NAME_AR: 'الكاسب',
  },
  {
    CIT_CODE: 2218,
    CIT_NAME_EN: 'UMM KHUNSUR',
    CIT_NAME_AR: 'أم خنصر',
  },
  {
    CIT_CODE: 2219,
    CIT_NAME_EN: 'HAZM AL JALAMID',
    CIT_NAME_AR: 'حزم الجلاميد',
  },
  {
    CIT_CODE: 2220,
    CIT_NAME_EN: 'AD DUWAYD',
    CIT_NAME_AR: 'الدويد',
  },
  {
    CIT_CODE: 2222,
    CIT_NAME_EN: 'KAF',
    CIT_NAME_AR: 'كاف',
  },
  {
    CIT_CODE: 2223,
    CIT_NAME_EN: 'AL QARQAR',
    CIT_NAME_AR: 'القرقر',
  },
  {
    CIT_CODE: 2224,
    CIT_NAME_EN: 'ITHRAH',
    CIT_NAME_AR: 'إثرة',
  },
  {
    CIT_CODE: 2225,
    CIT_NAME_EN: 'GHUTAYY',
    CIT_NAME_AR: 'غطي',
  },
  {
    CIT_CODE: 2227,
    CIT_NAME_EN: 'AYN AL HAWASI',
    CIT_NAME_AR: 'عين الحواسي',
  },
  {
    CIT_CODE: 2228,
    CIT_NAME_EN: 'QULAYYIB KHUDR',
    CIT_NAME_AR: 'قليب خضر',
  },
  {
    CIT_CODE: 2229,
    CIT_NAME_EN: 'AL ISAWIYAH',
    CIT_NAME_AR: 'العيساوية',
  },
  {
    CIT_CODE: 2230,
    CIT_NAME_EN: 'AL HADITHAH',
    CIT_NAME_AR: 'الحديثة',
  },
  {
    CIT_CODE: 2233,
    CIT_NAME_EN: 'AL HAWI',
    CIT_NAME_AR: 'الحوي',
  },
  {
    CIT_CODE: 2234,
    CIT_NAME_EN: 'SUWAYR',
    CIT_NAME_AR: 'صوير',
  },
  {
    CIT_CODE: 2235,
    CIT_NAME_EN: 'HIDRIJ',
    CIT_NAME_AR: 'حدرج',
  },
  {
    CIT_CODE: 2238,
    CIT_NAME_EN: 'AL LAQAYIT',
    CIT_NAME_AR: 'اللقايط',
  },
  {
    CIT_CODE: 2239,
    CIT_NAME_EN: 'SUBAYHAH',
    CIT_NAME_AR: 'صبيحة',
  },
  {
    CIT_CODE: 2240,
    CIT_NAME_EN: 'TABARJAL',
    CIT_NAME_AR: 'طبرجل',
  },
  {
    CIT_CODE: 2241,
    CIT_NAME_EN: 'AL FIYAD',
    CIT_NAME_AR: 'الفياض',
  },
  {
    CIT_CODE: 2242,
    CIT_NAME_EN: 'QARA',
    CIT_NAME_AR: 'قارا',
  },
  {
    CIT_CODE: 2246,
    CIT_NAME_EN: 'ZALLUM',
    CIT_NAME_AR: 'زلوم',
  },
  {
    CIT_CODE: 2247,
    CIT_NAME_EN: 'AN NABK ABU QASR',
    CIT_NAME_AR: 'النبك ابو قصر',
  },
  {
    CIT_CODE: 2249,
    CIT_NAME_EN: 'ADHFA',
    CIT_NAME_AR: 'عذفاء',
  },
  {
    CIT_CODE: 2250,
    CIT_NAME_EN: "KHAW'A'",
    CIT_NAME_AR: 'خوعاء',
  },
  {
    CIT_CODE: 2251,
    CIT_NAME_EN: 'ASH SHUWAYHITIYAH',
    CIT_NAME_AR: 'الشويحطية',
  },
  {
    CIT_CODE: 2252,
    CIT_NAME_EN: 'MARKAZ UMM AL HIRAN',
    CIT_NAME_AR: 'مركز أم الحيران',
  },
  {
    CIT_CODE: 2253,
    CIT_NAME_EN: 'MARKAZ SAMAH AL JADID',
    CIT_NAME_AR: 'مركز سماح الجديد',
  },
  {
    CIT_CODE: 2254,
    CIT_NAME_EN: 'MARKAZ ADH DHAHRAH',
    CIT_NAME_AR: 'مركز الظهرة',
  },
  {
    CIT_CODE: 2255,
    CIT_NAME_EN: 'IBN SUQI',
    CIT_NAME_AR: 'إبن سوقي',
  },
  {
    CIT_CODE: 2257,
    CIT_NAME_EN: 'NISAB',
    CIT_NAME_AR: 'نصاب',
  },
  {
    CIT_CODE: 2259,
    CIT_NAME_EN: 'LAWQAH',
    CIT_NAME_AR: 'لوقة',
  },
  {
    CIT_CODE: 2261,
    CIT_NAME_EN: 'IBN LUGHAISIM',
    CIT_NAME_AR: 'ابن لغيصم',
  },
  {
    CIT_CODE: 2262,
    CIT_NAME_EN: 'RAWDAT HABBAS',
    CIT_NAME_AR: 'روضة هباس',
  },
  {
    CIT_CODE: 2263,
    CIT_NAME_EN: 'TIMIAT',
    CIT_NAME_AR: 'التمياط',
  },
  {
    CIT_CODE: 2264,
    CIT_NAME_EN: 'IBN SHURAYM',
    CIT_NAME_AR: 'إبن شريم',
  },
  {
    CIT_CODE: 2266,
    CIT_NAME_EN: 'LINAH',
    CIT_NAME_AR: 'لينة',
  },
  {
    CIT_CODE: 2267,
    CIT_NAME_EN: 'AL MARKUZ',
    CIT_NAME_AR: 'المركوز',
  },
  {
    CIT_CODE: 2269,
    CIT_NAME_EN: "MAYQU'",
    CIT_NAME_AR: 'ميقوع',
  },
  {
    CIT_CODE: 2270,
    CIT_NAME_EN: "AL ADARI'",
    CIT_NAME_AR: 'الأضارع',
  },
  {
    CIT_CODE: 2271,
    CIT_NAME_EN: 'SAFAN',
    CIT_NAME_AR: 'صفان',
  },
  {
    CIT_CODE: 2273,
    CIT_NAME_EN: "ABU 'AJRAM",
    CIT_NAME_AR: 'ابو عجرم',
  },
  {
    CIT_CODE: 2274,
    CIT_NAME_EN: 'AT TUWAYR',
    CIT_NAME_AR: 'الطوير',
  },
  {
    CIT_CODE: 2275,
    CIT_NAME_EN: 'SADYAN',
    CIT_NAME_AR: 'صديان',
  },
  {
    CIT_CODE: 2278,
    CIT_NAME_EN: 'AL BUWAYTIN',
    CIT_NAME_AR: 'البويطن',
  },
  {
    CIT_CODE: 2279,
    CIT_NAME_EN: "BADAI' AL 'ISHSH",
    CIT_NAME_AR: 'بدائع العش',
  },
  {
    CIT_CODE: 2280,
    CIT_NAME_EN: 'SAHAYY',
    CIT_NAME_AR: 'صحي',
  },
  {
    CIT_CODE: 2281,
    CIT_NAME_EN: 'AL WUBAYRIYAH',
    CIT_NAME_AR: 'الوبيرية',
  },
  {
    CIT_CODE: 2282,
    CIT_NAME_EN: 'QUSAYRIYAT',
    CIT_NAME_AR: 'قصيريات',
  },
  {
    CIT_CODE: 2283,
    CIT_NAME_EN: "SU'AYDAN",
    CIT_NAME_AR: 'سعيدان',
  },
  {
    CIT_CODE: 2284,
    CIT_NAME_EN: 'JUFAYFA',
    CIT_NAME_AR: 'جفيفاء',
  },
  {
    CIT_CODE: 2285,
    CIT_NAME_EN: 'AL GHAMYA',
    CIT_NAME_AR: 'الغمياء',
  },
  {
    CIT_CODE: 2286,
    CIT_NAME_EN: 'AL FARHANIYAH',
    CIT_NAME_AR: 'الفرحانية',
  },
  {
    CIT_CODE: 2287,
    CIT_NAME_EN: 'AL MULAYH',
    CIT_NAME_AR: 'المليح',
  },
  {
    CIT_CODE: 2288,
    CIT_NAME_EN: 'HAFIRAT ASH SHAQAYQ',
    CIT_NAME_AR: 'حفيرة الشقيق',
  },
  {
    CIT_CODE: 2289,
    CIT_NAME_EN: 'JURUMAH',
    CIT_NAME_AR: 'جرمة',
  },
  {
    CIT_CODE: 2290,
    CIT_NAME_EN: 'AS SUFUN',
    CIT_NAME_AR: 'السفن',
  },
  {
    CIT_CODE: 2291,
    CIT_NAME_EN: "MUNIFAT AL QA'ID",
    CIT_NAME_AR: 'منيفة القاعد',
  },
  {
    CIT_CODE: 2292,
    CIT_NAME_EN: "AL QA'ID",
    CIT_NAME_AR: 'القاعد',
  },
  {
    CIT_CODE: 2294,
    CIT_NAME_EN: "ASH SHA'AFAH",
    CIT_NAME_AR: 'الشعفة',
  },
  {
    CIT_CODE: 2295,
    CIT_NAME_EN: 'AL JILF',
    CIT_NAME_AR: 'الجلف',
  },
  {
    CIT_CODE: 2296,
    CIT_NAME_EN: 'AL HURAYR',
    CIT_NAME_AR: 'الهرير',
  },
  {
    CIT_CODE: 2297,
    CIT_NAME_EN: 'TUWAYYAH',
    CIT_NAME_AR: 'طوية',
  },
  {
    CIT_CODE: 2300,
    CIT_NAME_EN: "AR RUWAY'",
    CIT_NAME_AR: 'الرويع',
  },
  {
    CIT_CODE: 2301,
    CIT_NAME_EN: "AL 'IDDI",
    CIT_NAME_AR: 'العضدي',
  },
  {
    CIT_CODE: 2302,
    CIT_NAME_EN: 'AL MARMA',
    CIT_NAME_AR: 'المرمى',
  },
  {
    CIT_CODE: 2303,
    CIT_NAME_EN: 'AL MINDASSAH ASH SHARQIYAH',
    CIT_NAME_AR: 'المندسة الشرقية',
  },
  {
    CIT_CODE: 2304,
    CIT_NAME_EN: 'AT TIM',
    CIT_NAME_AR: 'التيم',
  },
  {
    CIT_CODE: 2305,
    CIT_NAME_EN: 'AL QULAYBAYN',
    CIT_NAME_AR: 'القليبين',
  },
  {
    CIT_CODE: 2306,
    CIT_NAME_EN: 'RAYNIBAH',
    CIT_NAME_AR: 'رينبة',
  },
  {
    CIT_CODE: 2307,
    CIT_NAME_EN: 'AL MUKADHUM',
    CIT_NAME_AR: 'المكظم',
  },
  {
    CIT_CODE: 2308,
    CIT_NAME_EN: 'AL HUMAYRA',
    CIT_NAME_AR: 'الحميراء',
  },
  {
    CIT_CODE: 2309,
    CIT_NAME_EN: 'AL GHAR',
    CIT_NAME_AR: 'الغار',
  },
  {
    CIT_CODE: 2310,
    CIT_NAME_EN: "AL MU'AYQILAT",
    CIT_NAME_AR: 'المعيقلات',
  },
  {
    CIT_CODE: 2311,
    CIT_NAME_EN: 'AL MUWAYKIR',
    CIT_NAME_AR: 'المويكر',
  },
  {
    CIT_CODE: 2314,
    CIT_NAME_EN: 'ASH SHUBAYKAH',
    CIT_NAME_AR: 'الشبيكة',
  },
  {
    CIT_CODE: 2315,
    CIT_NAME_EN: "AL MAB'UTHAH",
    CIT_NAME_AR: 'المبعوثة',
  },
  {
    CIT_CODE: 2316,
    CIT_NAME_EN: 'AL JAFUR',
    CIT_NAME_AR: 'الجفر',
  },
  {
    CIT_CODE: 2317,
    CIT_NAME_EN: "AL MU'TARIDAH",
    CIT_NAME_AR: 'المعترضة',
  },
  {
    CIT_CODE: 2318,
    CIT_NAME_EN: 'AL LIQITAH',
    CIT_NAME_AR: 'اللقيطه',
  },
  {
    CIT_CODE: 2319,
    CIT_NAME_EN: 'MINSHAR',
    CIT_NAME_AR: 'منشار',
  },
  {
    CIT_CODE: 2320,
    CIT_NAME_EN: 'SAHLAT BADANAH',
    CIT_NAME_AR: 'سهلة بدنة',
  },
  {
    CIT_CODE: 2321,
    CIT_NAME_EN: "BADAI' MURAYFIQ",
    CIT_NAME_AR: 'بدائع مريفق',
  },
  {
    CIT_CODE: 2323,
    CIT_NAME_EN: "AS SULAY'A",
    CIT_NAME_AR: 'الصليعاء',
  },
  {
    CIT_CODE: 2324,
    CIT_NAME_EN: 'AS SUBAYHIYAH',
    CIT_NAME_AR: 'الصبيحية',
  },
  {
    CIT_CODE: 2326,
    CIT_NAME_EN: 'HUWAYYAN',
    CIT_NAME_AR: 'حويان',
  },
  {
    CIT_CODE: 2327,
    CIT_NAME_EN: "AL MUBAYDI'",
    CIT_NAME_AR: 'المبيدع',
  },
  {
    CIT_CODE: 2328,
    CIT_NAME_EN: "AL MABDA'",
    CIT_NAME_AR: 'المبدع',
  },
  {
    CIT_CODE: 2329,
    CIT_NAME_EN: 'KILWAH',
    CIT_NAME_AR: 'كلوة',
  },
  {
    CIT_CODE: 2331,
    CIT_NAME_EN: "AL 'AMAIR",
    CIT_NAME_AR: 'العمائر',
  },
  {
    CIT_CODE: 2332,
    CIT_NAME_EN: 'AL-SHMLY',
    CIT_NAME_AR: 'الشملي',
  },
  {
    CIT_CODE: 2333,
    CIT_NAME_EN: 'AL MUSALSAL',
    CIT_NAME_AR: 'المسلسل',
  },
  {
    CIT_CODE: 2334,
    CIT_NAME_EN: 'SIBUTAR',
    CIT_NAME_AR: 'سبطر',
  },
  {
    CIT_CODE: 2336,
    CIT_NAME_EN: 'GHURMUL AL UWAYD',
    CIT_NAME_AR: 'غرمول العويد',
  },
  {
    CIT_CODE: 2337,
    CIT_NAME_EN: 'AL HAMIRIYAH',
    CIT_NAME_AR: 'الحامرية',
  },
  {
    CIT_CODE: 2339,
    CIT_NAME_EN: 'AL HATI',
    CIT_NAME_AR: 'الحطي',
  },
  {
    CIT_CODE: 2340,
    CIT_NAME_EN: "AS SUNAYNA'",
    CIT_NAME_AR: 'الصنينا',
  },
  {
    CIT_CODE: 2341,
    CIT_NAME_EN: 'DULAYHAN',
    CIT_NAME_AR: 'دليهان',
  },
  {
    CIT_CODE: 2343,
    CIT_NAME_EN: 'ABA AL HIRAN',
    CIT_NAME_AR: 'ابا الحيران',
  },
  {
    CIT_CODE: 2344,
    CIT_NAME_EN: 'QALIB AL ATRAM',
    CIT_NAME_AR: 'قليب الاطرم',
  },
  {
    CIT_CODE: 2346,
    CIT_NAME_EN: "QINA'",
    CIT_NAME_AR: 'قناء',
  },
  {
    CIT_CODE: 2347,
    CIT_NAME_EN: 'AL MUSHAYTIYAH',
    CIT_NAME_AR: 'المشيطية',
  },
  {
    CIT_CODE: 2348,
    CIT_NAME_EN: 'AT TURBIYAH',
    CIT_NAME_AR: 'التربية',
  },
  {
    CIT_CODE: 2351,
    CIT_NAME_EN: 'MAWQAQ',
    CIT_NAME_AR: 'موقق',
  },
  {
    CIT_CODE: 2352,
    CIT_NAME_EN: 'UQLAT BIN JABRIN',
    CIT_NAME_AR: 'عقلة بن جبرين',
  },
  {
    CIT_CODE: 2353,
    CIT_NAME_EN: 'UMM AL QULBAN',
    CIT_NAME_AR: 'ام القلبان',
  },
  {
    CIT_CODE: 2354,
    CIT_NAME_EN: "MAZARI' AS SIHHAL",
    CIT_NAME_AR: 'مزارع السحل',
  },
  {
    CIT_CODE: 2355,
    CIT_NAME_EN: 'MAZARI AR RIGHLIYAH',
    CIT_NAME_AR: 'مزارع الرغلية',
  },
  {
    CIT_CODE: 2356,
    CIT_NAME_EN: 'AT TULAYHAH',
    CIT_NAME_AR: 'الطليحة',
  },
  {
    CIT_CODE: 2357,
    CIT_NAME_EN: "MAZARI' AS SAFYA",
    CIT_NAME_AR: 'مزارع الصفيا',
  },
  {
    CIT_CODE: 2360,
    CIT_NAME_EN: 'AL MIHAYNIYAH',
    CIT_NAME_AR: 'المهينية',
  },
  {
    CIT_CODE: 2362,
    CIT_NAME_EN: "AL WU'AYLI",
    CIT_NAME_AR: 'الوعيلي',
  },
  {
    CIT_CODE: 2363,
    CIT_NAME_EN: "MAZARI' AR RIKHAYSIYAH",
    CIT_NAME_AR: 'مزارع الرخيصية',
  },
  {
    CIT_CODE: 2364,
    CIT_NAME_EN: "MAZARI' BAYT",
    CIT_NAME_AR: 'مزارع بيط',
  },
  {
    CIT_CODE: 2365,
    CIT_NAME_EN: 'AL JITHYATHAH',
    CIT_NAME_AR: 'الجثياثة',
  },
  {
    CIT_CODE: 2366,
    CIT_NAME_EN: "AL QAS'A",
    CIT_NAME_AR: 'القصعاء',
  },
  {
    CIT_CODE: 2367,
    CIT_NAME_EN: 'AL LUWAYBIDAH',
    CIT_NAME_AR: 'اللويبدة',
  },
  {
    CIT_CODE: 2368,
    CIT_NAME_EN: 'AL JITHAMIYYAH',
    CIT_NAME_AR: 'الجثامية',
  },
  {
    CIT_CODE: 2369,
    CIT_NAME_EN: 'AS SUWAYFILAH',
    CIT_NAME_AR: 'السويفلة',
  },
  {
    CIT_CODE: 2370,
    CIT_NAME_EN: 'BAKAA',
    CIT_NAME_AR: 'بقعاء',
  },
  {
    CIT_CODE: 2371,
    CIT_NAME_EN: 'AL AJFAR',
    CIT_NAME_AR: 'الاجفر',
  },
  {
    CIT_CODE: 2376,
    CIT_NAME_EN: "BAQ'A' ASH SHARQIYAH",
    CIT_NAME_AR: 'بقعاء الشرقية',
  },
  {
    CIT_CODE: 2377,
    CIT_NAME_EN: 'ATH THINAYYAN',
    CIT_NAME_AR: 'الثنيان',
  },
  {
    CIT_CODE: 2379,
    CIT_NAME_EN: "ASH SHA'LANIYAH",
    CIT_NAME_AR: 'الشعلانية',
  },
  {
    CIT_CODE: 2380,
    CIT_NAME_EN: "TALHA'",
    CIT_NAME_AR: 'طلحاء',
  },
  {
    CIT_CODE: 2381,
    CIT_NAME_EN: "AL 'AMUD",
    CIT_NAME_AR: 'العمود',
  },
  {
    CIT_CODE: 2382,
    CIT_NAME_EN: 'AL HUMAYRAH',
    CIT_NAME_AR: 'الحميرة',
  },
  {
    CIT_CODE: 2384,
    CIT_NAME_EN: 'AYNUNAH',
    CIT_NAME_AR: 'عينونة',
  },
  {
    CIT_CODE: 2385,
    CIT_NAME_EN: 'AL HASHA',
    CIT_NAME_AR: 'الحشا',
  },
  {
    CIT_CODE: 2387,
    CIT_NAME_EN: "BIR 'AUDAH",
    CIT_NAME_AR: 'بئر عودة',
  },
  {
    CIT_CODE: 2388,
    CIT_NAME_EN: 'AL JIDDAH',
    CIT_NAME_AR: 'الجدة',
  },
  {
    CIT_CODE: 2390,
    CIT_NAME_EN: 'AT TURFIYAH AL GHARBIYAH',
    CIT_NAME_AR: 'الطرفية الغربية',
  },
  {
    CIT_CODE: 2392,
    CIT_NAME_EN: 'URAYFJAN SAHUQ',
    CIT_NAME_AR: 'عريفجان ساحوق',
  },
  {
    CIT_CODE: 2393,
    CIT_NAME_EN: 'AS SULAYBI',
    CIT_NAME_AR: 'الصليبي',
  },
  {
    CIT_CODE: 2394,
    CIT_NAME_EN: 'AZ ZIHAYRIYAH',
    CIT_NAME_AR: 'الزهيرية',
  },
  {
    CIT_CODE: 2395,
    CIT_NAME_EN: 'RAWDAT QIRADAN',
    CIT_NAME_AR: 'روضة قرادان',
  },
  {
    CIT_CODE: 2396,
    CIT_NAME_EN: 'ABANAT',
    CIT_NAME_AR: 'أبانات',
  },
  {
    CIT_CODE: 2397,
    CIT_NAME_EN: 'AL HINAYNIYAH',
    CIT_NAME_AR: 'الحنينية',
  },
  {
    CIT_CODE: 2399,
    CIT_NAME_EN: "DULAY' RASHID",
    CIT_NAME_AR: 'ضليع رشيد',
  },
  {
    CIT_CODE: 2401,
    CIT_NAME_EN: 'ATA',
    CIT_NAME_AR: 'عطا',
  },
  {
    CIT_CODE: 2402,
    CIT_NAME_EN: 'UTAYY',
    CIT_NAME_AR: 'عطي',
  },
  {
    CIT_CODE: 2404,
    CIT_NAME_EN: "RUFAI' AL LUHAYB",
    CIT_NAME_AR: 'رفائع اللهيب',
  },
  {
    CIT_CODE: 2405,
    CIT_NAME_EN: 'AL JARDHAWIYAH',
    CIT_NAME_AR: 'الجرذاوية',
  },
  {
    CIT_CODE: 2406,
    CIT_NAME_EN: 'AR RUKNAH',
    CIT_NAME_AR: 'الركنة',
  },
  {
    CIT_CODE: 2407,
    CIT_NAME_EN: 'AL-BATRAA',
    CIT_NAME_AR: 'البتراء',
  },
  {
    CIT_CODE: 2410,
    CIT_NAME_EN: "AL 'UBAYL",
    CIT_NAME_AR: 'العبيل',
  },
  {
    CIT_CODE: 2412,
    CIT_NAME_EN: 'NAFJAH',
    CIT_NAME_AR: 'نفجة',
  },
  {
    CIT_CODE: 2413,
    CIT_NAME_EN: 'AL GHAYDANIYAH',
    CIT_NAME_AR: 'الغيدانية',
  },
  {
    CIT_CODE: 2414,
    CIT_NAME_EN: "AL 'ABLA",
    CIT_NAME_AR: 'العبلة',
  },
  {
    CIT_CODE: 2415,
    CIT_NAME_EN: "MAZARI' AL JIRAWAH",
    CIT_NAME_AR: 'مزارع الجراوة',
  },
  {
    CIT_CODE: 2416,
    CIT_NAME_EN: 'AS SUMAYRA',
    CIT_NAME_AR: 'السميراء',
  },
  {
    CIT_CODE: 2417,
    CIT_NAME_EN: 'AL RUDAYMAH',
    CIT_NAME_AR: 'الرضيمة',
  },
  {
    CIT_CODE: 2418,
    CIT_NAME_EN: "AL QAW'I",
    CIT_NAME_AR: 'القوعي',
  },
  {
    CIT_CODE: 2419,
    CIT_NAME_EN: "MAZARI' AL 'AQL",
    CIT_NAME_AR: 'مزارع العقل',
  },
  {
    CIT_CODE: 2420,
    CIT_NAME_EN: 'DUKHNAH',
    CIT_NAME_AR: 'دخنة',
  },
  {
    CIT_CODE: 2423,
    CIT_NAME_EN: 'ASH SHAWRAQIYAH',
    CIT_NAME_AR: 'الشورقية',
  },
  {
    CIT_CODE: 2426,
    CIT_NAME_EN: "AT TAL'AH",
    CIT_NAME_AR: 'الطلعة',
  },
  {
    CIT_CODE: 2427,
    CIT_NAME_EN: 'MUDHAYFIRAH',
    CIT_NAME_AR: 'مظيفيرة',
  },
  {
    CIT_CODE: 2428,
    CIT_NAME_EN: 'AL WASHHA',
    CIT_NAME_AR: 'الوشحاء',
  },
  {
    CIT_CODE: 2429,
    CIT_NAME_EN: 'AL HISHAH',
    CIT_NAME_AR: 'الهيشة',
  },
  {
    CIT_CODE: 2431,
    CIT_NAME_EN: "AL 'ADAN",
    CIT_NAME_AR: 'العدان',
  },
  {
    CIT_CODE: 2432,
    CIT_NAME_EN: "AYN AL 'UQAYLI",
    CIT_NAME_AR: 'عين العقيلي',
  },
  {
    CIT_CODE: 2433,
    CIT_NAME_EN: 'RAWDAT AL LAWWAF',
    CIT_NAME_AR: 'روضة اللواف',
  },
  {
    CIT_CODE: 2434,
    CIT_NAME_EN: "AL 'IKRASHIYAH",
    CIT_NAME_AR: 'العكرشية',
  },
  {
    CIT_CODE: 2435,
    CIT_NAME_EN: 'ZIHLULAH',
    CIT_NAME_AR: 'زهلولة',
  },
  {
    CIT_CODE: 2436,
    CIT_NAME_EN: 'AR RUHAYMIYAH',
    CIT_NAME_AR: 'الرحيمية',
  },
  {
    CIT_CODE: 2437,
    CIT_NAME_EN: 'AL WISTA',
    CIT_NAME_AR: 'الوسطى',
  },
  {
    CIT_CODE: 2438,
    CIT_NAME_EN: 'AL MAFID',
    CIT_NAME_AR: 'المفيض',
  },
  {
    CIT_CODE: 2439,
    CIT_NAME_EN: 'AL MAHRUQAH',
    CIT_NAME_AR: 'المحروقة',
  },
  {
    CIT_CODE: 2440,
    CIT_NAME_EN: "MAZARI' KHURAYMAN",
    CIT_NAME_AR: 'مزارع خريمان',
  },
  {
    CIT_CODE: 2441,
    CIT_NAME_EN: 'AR RIBQIYAH',
    CIT_NAME_AR: 'الربقية',
  },
  {
    CIT_CODE: 2444,
    CIT_NAME_EN: 'AN NASIRIYAH',
    CIT_NAME_AR: 'الناصرية',
  },
  {
    CIT_CODE: 2445,
    CIT_NAME_EN: 'AL KHARMA AL JANUBIYAH',
    CIT_NAME_AR: 'الخرماء الجنوبية',
  },
  {
    CIT_CODE: 2446,
    CIT_NAME_EN: "AN NA'AYIM",
    CIT_NAME_AR: 'النعايم',
  },
  {
    CIT_CODE: 2447,
    CIT_NAME_EN: 'KHURAYMAN',
    CIT_NAME_AR: 'خريمان',
  },
  {
    CIT_CODE: 2449,
    CIT_NAME_EN: 'ALBA',
    CIT_NAME_AR: 'علباء',
  },
  {
    CIT_CODE: 2450,
    CIT_NAME_EN: 'RAWDAT AL HISU',
    CIT_NAME_AR: 'روضة الحسو',
  },
  {
    CIT_CODE: 2452,
    CIT_NAME_EN: 'AL MUHALLAWIYAH',
    CIT_NAME_AR: 'المحلاوية',
  },
  {
    CIT_CODE: 2453,
    CIT_NAME_EN: "MAZARI' AL HAZM",
    CIT_NAME_AR: 'مزارع الحزم',
  },
  {
    CIT_CODE: 2454,
    CIT_NAME_EN: 'DHULYIM',
    CIT_NAME_AR: 'ظليم',
  },
  {
    CIT_CODE: 2455,
    CIT_NAME_EN: 'AL BATIN',
    CIT_NAME_AR: 'الباطن',
  },
  {
    CIT_CODE: 2456,
    CIT_NAME_EN: 'AL MURGHALAH',
    CIT_NAME_AR: 'المرغلة',
  },
  {
    CIT_CODE: 2457,
    CIT_NAME_EN: 'RAGHABIYAH',
    CIT_NAME_AR: 'رغابية',
  },
  {
    CIT_CODE: 2458,
    CIT_NAME_EN: "AT TU'MIYAH",
    CIT_NAME_AR: 'الطعمية',
  },
  {
    CIT_CODE: 2459,
    CIT_NAME_EN: "AL 'ADAYIN",
    CIT_NAME_AR: 'العداين',
  },
  {
    CIT_CODE: 2461,
    CIT_NAME_EN: 'AR RIQA',
    CIT_NAME_AR: 'الرقة',
  },
  {
    CIT_CODE: 2463,
    CIT_NAME_EN: 'AR RAWGHANY',
    CIT_NAME_AR: 'الروغاني',
  },
  {
    CIT_CODE: 2466,
    CIT_NAME_EN: "WADI ABU 'ALI",
    CIT_NAME_AR: 'وادى أبو على',
  },
  {
    CIT_CODE: 2468,
    CIT_NAME_EN: "SHI'B AL HAMAR",
    CIT_NAME_AR: 'شعب الحمر',
  },
  {
    CIT_CODE: 2469,
    CIT_NAME_EN: 'SUBAYH',
    CIT_NAME_AR: 'صبيح',
  },
  {
    CIT_CODE: 2470,
    CIT_NAME_EN: 'NUBAYHA',
    CIT_NAME_AR: 'نبيها',
  },
  {
    CIT_CODE: 2471,
    CIT_NAME_EN: 'ASH SHIBIBIYAH',
    CIT_NAME_AR: 'الشبيبة',
  },
  {
    CIT_CODE: 2472,
    CIT_NAME_EN: "AL BADA'I UMM TAL'AH",
    CIT_NAME_AR: 'البدائع أم تلعة',
  },
  {
    CIT_CODE: 2473,
    CIT_NAME_EN: "AL BADAI AL 'ULYA",
    CIT_NAME_AR: 'البدائع العليا',
  },
  {
    CIT_CODE: 2475,
    CIT_NAME_EN: "MAZRA'AT AT 'ABLA",
    CIT_NAME_AR: 'مزرعة عبلا',
  },
  {
    CIT_CODE: 2476,
    CIT_NAME_EN: "ABAL 'ABLA",
    CIT_NAME_AR: 'عبل عبلا',
  },
  {
    CIT_CODE: 2478,
    CIT_NAME_EN: "AL 'ABDALIYAH",
    CIT_NAME_AR: 'العبدلية',
  },
  {
    CIT_CODE: 2479,
    CIT_NAME_EN: 'AL HAJNAWI',
    CIT_NAME_AR: 'الحجناوي',
  },
  {
    CIT_CODE: 2482,
    CIT_NAME_EN: 'DUHAYMA',
    CIT_NAME_AR: 'دهيماء',
  },
  {
    CIT_CODE: 2484,
    CIT_NAME_EN: "AL 'UBAYD",
    CIT_NAME_AR: 'العبيد',
  },
  {
    CIT_CODE: 2485,
    CIT_NAME_EN: 'AN NUFAYYID',
    CIT_NAME_AR: 'النفيد',
  },
  {
    CIT_CODE: 2486,
    CIT_NAME_EN: "AL KHABRA'",
    CIT_NAME_AR: 'الخبراء',
  },
  {
    CIT_CODE: 2488,
    CIT_NAME_EN: 'FAYDAT DHIBAN',
    CIT_NAME_AR: 'فيضة ذيبان',
  },
  {
    CIT_CODE: 2490,
    CIT_NAME_EN: "AL 'ABIR",
    CIT_NAME_AR: 'العابر',
  },
  {
    CIT_CODE: 2491,
    CIT_NAME_EN: 'MAZARI AL HAQBA',
    CIT_NAME_AR: 'مزارع الحقباء',
  },
  {
    CIT_CODE: 2492,
    CIT_NAME_EN: 'AL HAJBAH',
    CIT_NAME_AR: 'الحجبة',
  },
  {
    CIT_CODE: 2493,
    CIT_NAME_EN: 'ADH DHABAH',
    CIT_NAME_AR: 'الظبة',
  },
  {
    CIT_CODE: 2494,
    CIT_NAME_EN: 'AD DAATHAH',
    CIT_NAME_AR: 'الدعثة',
  },
  {
    CIT_CODE: 2495,
    CIT_NAME_EN: 'AD DABBAH',
    CIT_NAME_AR: 'الضبة',
  },
  {
    CIT_CODE: 2496,
    CIT_NAME_EN: 'AL HANIYAH',
    CIT_NAME_AR: 'الحنية',
  },
  {
    CIT_CODE: 2497,
    CIT_NAME_EN: 'ABU KHASHABAH',
    CIT_NAME_AR: 'ابو خشبة',
  },
  {
    CIT_CODE: 2498,
    CIT_NAME_EN: 'UMM AL KHARASI',
    CIT_NAME_AR: 'أم الخراسع',
  },
  {
    CIT_CODE: 2499,
    CIT_NAME_EN: 'ATH THAMIRIYAH',
    CIT_NAME_AR: 'الثامرية',
  },
  {
    CIT_CODE: 2500,
    CIT_NAME_EN: 'AD DATH',
    CIT_NAME_AR: 'الداث',
  },
  {
    CIT_CODE: 2501,
    CIT_NAME_EN: 'MAHDUMAH',
    CIT_NAME_AR: 'مهدومة',
  },
  {
    CIT_CODE: 2502,
    CIT_NAME_EN: "MAZARI' UMM ARTA",
    CIT_NAME_AR: 'مزارع أم أرطى',
  },
  {
    CIT_CODE: 2503,
    CIT_NAME_EN: 'AL JARRARIYAH',
    CIT_NAME_AR: 'الجرارية',
  },
  {
    CIT_CODE: 2504,
    CIT_NAME_EN: 'KHARBASHA',
    CIT_NAME_AR: 'خربشاء',
  },
  {
    CIT_CODE: 2505,
    CIT_NAME_EN: 'ADH DHAHIRIYAH',
    CIT_NAME_AR: 'الظاهرية',
  },
  {
    CIT_CODE: 2506,
    CIT_NAME_EN: 'ADH DHAHIRIYAH AL JANUBIYAH',
    CIT_NAME_AR: 'الظاهرية الجنوبية',
  },
  {
    CIT_CODE: 2507,
    CIT_NAME_EN: "AN NA'IMAH",
    CIT_NAME_AR: 'الناعمة',
  },
  {
    CIT_CODE: 2509,
    CIT_NAME_EN: 'AL GHADYA',
    CIT_NAME_AR: 'الغضياء',
  },
  {
    CIT_CODE: 2510,
    CIT_NAME_EN: "MAZARI' THUWAYDIJ",
    CIT_NAME_AR: 'مزارع ثويدج',
  },
  {
    CIT_CODE: 2511,
    CIT_NAME_EN: 'AL JARIR',
    CIT_NAME_AR: 'الجرير',
  },
  {
    CIT_CODE: 2513,
    CIT_NAME_EN: 'AL KANAHBILAH',
    CIT_NAME_AR: 'الكنهبلة',
  },
  {
    CIT_CODE: 2514,
    CIT_NAME_EN: 'AS SAHWAH',
    CIT_NAME_AR: 'السهوة',
  },
  {
    CIT_CODE: 2515,
    CIT_NAME_EN: 'YANIF',
    CIT_NAME_AR: 'يانف',
  },
  {
    CIT_CODE: 2520,
    CIT_NAME_EN: 'HAMRAH NITHIL (ABU SHADAD)',
    CIT_NAME_AR: 'حمراء نثيل / ابو شداد',
  },
  {
    CIT_CODE: 2521,
    CIT_NAME_EN: 'KHAJIM',
    CIT_NAME_AR: 'خجيم',
  },
  {
    CIT_CODE: 2523,
    CIT_NAME_EN: 'ABA AR RAKHAM',
    CIT_NAME_AR: 'ابا الرخم',
  },
  {
    CIT_CODE: 2524,
    CIT_NAME_EN: 'MARKAZ AL WUJID',
    CIT_NAME_AR: 'مركز الوجيد',
  },
  {
    CIT_CODE: 2526,
    CIT_NAME_EN: "TUBASH'AH",
    CIT_NAME_AR: 'تباشعة',
  },
  {
    CIT_CODE: 2527,
    CIT_NAME_EN: 'UMM KHISAH',
    CIT_NAME_AR: 'أم خيسة',
  },
  {
    CIT_CODE: 2528,
    CIT_NAME_EN: 'SALAHLAH',
    CIT_NAME_AR: 'صلحلح',
  },
  {
    CIT_CODE: 2529,
    CIT_NAME_EN: 'AL KHIDARI',
    CIT_NAME_AR: 'آل خضاري',
  },
  {
    CIT_CODE: 2530,
    CIT_NAME_EN: 'AN NUQRAH',
    CIT_NAME_AR: 'النقرة',
  },
  {
    CIT_CODE: 2531,
    CIT_NAME_EN: "KAMP AD DULU'",
    CIT_NAME_AR: 'كمب الضلوع',
  },
  {
    CIT_CODE: 2532,
    CIT_NAME_EN: 'AL HUFAYR',
    CIT_NAME_AR: 'الحفير',
  },
  {
    CIT_CODE: 2534,
    CIT_NAME_EN: 'QASR AL ISHRUWAT',
    CIT_NAME_AR: 'قصر العشروات',
  },
  {
    CIT_CODE: 2535,
    CIT_NAME_EN: "SARA'",
    CIT_NAME_AR: 'سراء',
  },
  {
    CIT_CODE: 2536,
    CIT_NAME_EN: 'FAYDAT IBN SUWAYLIM',
    CIT_NAME_AR: 'فيضة بن سويلم',
  },
  {
    CIT_CODE: 2537,
    CIT_NAME_EN: 'AN NISIYAH',
    CIT_NAME_AR: 'النيصية',
  },
  {
    CIT_CODE: 2538,
    CIT_NAME_EN: 'MURAYFIQ',
    CIT_NAME_AR: 'مريفق',
  },
  {
    CIT_CODE: 2539,
    CIT_NAME_EN: 'QUFAR',
    CIT_NAME_AR: 'قفار',
  },
  {
    CIT_CODE: 2540,
    CIT_NAME_EN: 'TUWARIN',
    CIT_NAME_AR: 'توارين',
  },
  {
    CIT_CODE: 2541,
    CIT_NAME_EN: 'IQDAH',
    CIT_NAME_AR: 'عقدة',
  },
  {
    CIT_CODE: 2543,
    CIT_NAME_EN: 'AL MUKHTALIF',
    CIT_NAME_AR: 'المختلف',
  },
  {
    CIT_CODE: 2545,
    CIT_NAME_EN: 'AL LUWAYMI',
    CIT_NAME_AR: 'اللويمي',
  },
  {
    CIT_CODE: 2547,
    CIT_NAME_EN: "AL 'AJAJAH",
    CIT_NAME_AR: 'العجاجة',
  },
  {
    CIT_CODE: 2548,
    CIT_NAME_EN: 'AR RAQAB',
    CIT_NAME_AR: 'الرقب',
  },
  {
    CIT_CODE: 2549,
    CIT_NAME_EN: 'AN NIMARAH',
    CIT_NAME_AR: 'النمارة',
  },
  {
    CIT_CODE: 2550,
    CIT_NAME_EN: "AL 'AYTHAMAH",
    CIT_NAME_AR: 'العيثمة',
  },
  {
    CIT_CODE: 2551,
    CIT_NAME_EN: 'LIBDAH',
    CIT_NAME_AR: 'لبدة',
  },
  {
    CIT_CODE: 2552,
    CIT_NAME_EN: 'DARGHAT',
    CIT_NAME_AR: 'ضرغط',
  },
  {
    CIT_CODE: 2553,
    CIT_NAME_EN: 'DURAIGHAT',
    CIT_NAME_AR: 'ضريغط',
  },
  {
    CIT_CODE: 2555,
    CIT_NAME_EN: "BADAI' AWL",
    CIT_NAME_AR: 'بدائع اول',
  },
  {
    CIT_CODE: 2557,
    CIT_NAME_EN: "AL HULAYFAH AL 'ULYA",
    CIT_NAME_AR: 'الحليفة العليا',
  },
  {
    CIT_CODE: 2558,
    CIT_NAME_EN: 'MARHAB ASH SHAMALI',
    CIT_NAME_AR: 'مرحب الشمالي',
  },
  {
    CIT_CODE: 2559,
    CIT_NAME_EN: "AL 'ARADIYAH",
    CIT_NAME_AR: 'العرادية',
  },
  {
    CIT_CODE: 2560,
    CIT_NAME_EN: 'FAYDAT ATHQAB',
    CIT_NAME_AR: 'فيضة اثقب',
  },
  {
    CIT_CODE: 2561,
    CIT_NAME_EN: 'RAWD IBN HADI',
    CIT_NAME_AR: 'روض ابن هادي',
  },
  {
    CIT_CODE: 2562,
    CIT_NAME_EN: "AL WAS'AH",
    CIT_NAME_AR: 'الوسعة',
  },
  {
    CIT_CODE: 2563,
    CIT_NAME_EN: 'ASH SHIWAYMIS',
    CIT_NAME_AR: 'الشويمس',
  },
  {
    CIT_CODE: 2564,
    CIT_NAME_EN: 'AL BARQAH',
    CIT_NAME_AR: 'البرقة',
  },
  {
    CIT_CODE: 2565,
    CIT_NAME_EN: 'AD DABIYAH',
    CIT_NAME_AR: 'الدابية',
  },
  {
    CIT_CODE: 2566,
    CIT_NAME_EN: 'AL HUWAYYIT',
    CIT_NAME_AR: 'الحويط',
  },
  {
    CIT_CODE: 2568,
    CIT_NAME_EN: "AMA'IR AL MURAYR",
    CIT_NAME_AR: 'عمائر المرير',
  },
  {
    CIT_CODE: 2569,
    CIT_NAME_EN: "BID' IBN KHALAF",
    CIT_NAME_AR: 'بدع ابن خلف',
  },
  {
    CIT_CODE: 2571,
    CIT_NAME_EN: 'UMM RAWSHAN',
    CIT_NAME_AR: 'ام روشن',
  },
  {
    CIT_CODE: 2572,
    CIT_NAME_EN: 'SUFAYT',
    CIT_NAME_AR: 'صفيط',
  },
  {
    CIT_CODE: 2573,
    CIT_NAME_EN: 'AN NUHAYTIYAH',
    CIT_NAME_AR: 'النحيتية',
  },
  {
    CIT_CODE: 2575,
    CIT_NAME_EN: "AL MA'ARRASH",
    CIT_NAME_AR: 'المعرش',
  },
  {
    CIT_CODE: 2577,
    CIT_NAME_EN: "WUSAYTA' AL HAFAN",
    CIT_NAME_AR: 'وسيطاء الحفن',
  },
  {
    CIT_CODE: 2578,
    CIT_NAME_EN: "AL BA'AYITH",
    CIT_NAME_AR: 'البعايث',
  },
  {
    CIT_CODE: 2579,
    CIT_NAME_EN: 'AZ ZUGHAIBIYAH',
    CIT_NAME_AR: 'الزغيبية',
  },
  {
    CIT_CODE: 2581,
    CIT_NAME_EN: "BADAI' AS SIGHWA",
    CIT_NAME_AR: 'بدائع الصغوي',
  },
  {
    CIT_CODE: 2582,
    CIT_NAME_EN: 'AS SIGHAWA',
    CIT_NAME_AR: 'الصغوى',
  },
  {
    CIT_CODE: 2583,
    CIT_NAME_EN: 'FAYDAT YAKLIB',
    CIT_NAME_AR: 'فيضة يكلب',
  },
  {
    CIT_CODE: 2584,
    CIT_NAME_EN: "MAZARI' AL QARAIN",
    CIT_NAME_AR: 'مزارع القرائن',
  },
  {
    CIT_CODE: 2585,
    CIT_NAME_EN: 'AN NUWAYBAT',
    CIT_NAME_AR: 'النويبات',
  },
  {
    CIT_CODE: 2586,
    CIT_NAME_EN: "MAZRA'AT MISHRIFAH",
    CIT_NAME_AR: 'مزرعة مشرفة',
  },
  {
    CIT_CODE: 2587,
    CIT_NAME_EN: 'AL MAKHRAM',
    CIT_NAME_AR: 'المخرم',
  },
  {
    CIT_CODE: 2591,
    CIT_NAME_EN: 'RAHIMAH',
    CIT_NAME_AR: 'رحيمة',
  },
  {
    CIT_CODE: 2592,
    CIT_NAME_EN: "BADAI' AS SUFRAN",
    CIT_NAME_AR: 'بدائع الصفران',
  },
  {
    CIT_CODE: 2593,
    CIT_NAME_EN: "HUMR AL QA'ASA",
    CIT_NAME_AR: 'حمر القعساء',
  },
  {
    CIT_CODE: 2594,
    CIT_NAME_EN: 'HURAYD',
    CIT_NAME_AR: 'حريد',
  },
  {
    CIT_CODE: 2595,
    CIT_NAME_EN: 'AD DIMASAH',
    CIT_NAME_AR: 'الديماسة',
  },
  {
    CIT_CODE: 2596,
    CIT_NAME_EN: "AL QA'ASA",
    CIT_NAME_AR: 'القعساء',
  },
  {
    CIT_CODE: 2597,
    CIT_NAME_EN: 'WUTIDAH',
    CIT_NAME_AR: 'وتدة',
  },
  {
    CIT_CODE: 2598,
    CIT_NAME_EN: 'UQAYLAT AL LABAN',
    CIT_NAME_AR: 'عقيلة اللبن',
  },
  {
    CIT_CODE: 2599,
    CIT_NAME_EN: 'AL BALLAZIYAH',
    CIT_NAME_AR: 'البلازية',
  },
  {
    CIT_CODE: 2600,
    CIT_NAME_EN: 'KHANQAT AR RIMAHI',
    CIT_NAME_AR: 'خنقة الرماحي',
  },
  {
    CIT_CODE: 2601,
    CIT_NAME_EN: 'GHISIL',
    CIT_NAME_AR: 'غسل',
  },
  {
    CIT_CODE: 2602,
    CIT_NAME_EN: "SIMIRA'",
    CIT_NAME_AR: 'سميراء',
  },
  {
    CIT_CODE: 2603,
    CIT_NAME_EN: "AR RUFAYI'",
    CIT_NAME_AR: 'الرفايع',
  },
  {
    CIT_CODE: 2604,
    CIT_NAME_EN: 'QUSAYR MATRUK',
    CIT_NAME_AR: 'قصير متروك',
  },
  {
    CIT_CODE: 2605,
    CIT_NAME_EN: 'KUTAIFAH',
    CIT_NAME_AR: 'كتيفة',
  },
  {
    CIT_CODE: 2606,
    CIT_NAME_EN: 'WUSAYT',
    CIT_NAME_AR: 'وسيط',
  },
  {
    CIT_CODE: 2609,
    CIT_NAME_EN: "AL MA'ADA",
    CIT_NAME_AR: 'المعدا',
  },
  {
    CIT_CODE: 2610,
    CIT_NAME_EN: 'MAZARI ASH SHIHIYAH',
    CIT_NAME_AR: 'مزارع الشيحية',
  },
  {
    CIT_CODE: 2612,
    CIT_NAME_EN: 'UMM QIDDAH',
    CIT_NAME_AR: 'أم قدة',
  },
  {
    CIT_CODE: 2613,
    CIT_NAME_EN: 'QALIB KHUNAYFISAH',
    CIT_NAME_AR: 'قليب خنيفسة',
  },
  {
    CIT_CODE: 2614,
    CIT_NAME_EN: "MAZRA'AT AL GHIBYAH",
    CIT_NAME_AR: 'مزرعة الغبية',
  },
  {
    CIT_CODE: 2617,
    CIT_NAME_EN: "BUQAY'A ASH SHAMALIYAH",
    CIT_NAME_AR: 'بقيعاء الشمالية',
  },
  {
    CIT_CODE: 2618,
    CIT_NAME_EN: "MAZARI' AR RUFAI'",
    CIT_NAME_AR: 'مزارع الرفائع',
  },
  {
    CIT_CODE: 2620,
    CIT_NAME_EN: 'AN NIJIBAH',
    CIT_NAME_AR: 'النجبة',
  },
  {
    CIT_CODE: 2621,
    CIT_NAME_EN: 'QALIB AR RUJAYMIYAH',
    CIT_NAME_AR: 'قليب الرجيمية',
  },
  {
    CIT_CODE: 2623,
    CIT_NAME_EN: 'UMM KHUTUT',
    CIT_NAME_AR: 'أم خطوط',
  },
  {
    CIT_CODE: 2624,
    CIT_NAME_EN: "MAZARI' AL WUSAYTA",
    CIT_NAME_AR: 'مزارع الوسيطاء',
  },
  {
    CIT_CODE: 2625,
    CIT_NAME_EN: 'AL MAKHUL',
    CIT_NAME_AR: 'المكحول',
  },
  {
    CIT_CODE: 2626,
    CIT_NAME_EN: 'KAHLAH',
    CIT_NAME_AR: 'كحلة',
  },
  {
    CIT_CODE: 2627,
    CIT_NAME_EN: 'AL ARTAWI ASH SHAMALI',
    CIT_NAME_AR: 'الأرطاوي الشمالي',
  },
  {
    CIT_CODE: 2629,
    CIT_NAME_EN: 'AL HILALIYAH',
    CIT_NAME_AR: 'الهلالية',
  },
  {
    CIT_CODE: 2632,
    CIT_NAME_EN: 'MISHASH JURUD',
    CIT_NAME_AR: 'مشاش جرود',
  },
  {
    CIT_CODE: 2633,
    CIT_NAME_EN: "AD DALFA'AH",
    CIT_NAME_AR: 'الضلفعة',
  },
  {
    CIT_CODE: 2637,
    CIT_NAME_EN: 'ASH SHABBAKIYAH',
    CIT_NAME_AR: 'الشباكية',
  },
  {
    CIT_CODE: 2639,
    CIT_NAME_EN: 'AL MARAH',
    CIT_NAME_AR: 'المراح',
  },
  {
    CIT_CODE: 2640,
    CIT_NAME_EN: 'JUDAH',
    CIT_NAME_AR: 'جودة',
  },
  {
    CIT_CODE: 2642,
    CIT_NAME_EN: 'AL UQAYR',
    CIT_NAME_AR: 'العقير',
  },
  {
    CIT_CODE: 2643,
    CIT_NAME_EN: 'YABRIN / JABRIN',
    CIT_NAME_AR: 'يبرين',
  },
  {
    CIT_CODE: 2644,
    CIT_NAME_EN: 'AL BATALIYAH',
    CIT_NAME_AR: 'البطالية',
  },
  {
    CIT_CODE: 2647,
    CIT_NAME_EN: 'AL WIZYAH',
    CIT_NAME_AR: 'الوزية',
  },
  {
    CIT_CODE: 2649,
    CIT_NAME_EN: 'AL KHARS',
    CIT_NAME_AR: 'الخرس',
  },
  {
    CIT_CODE: 2650,
    CIT_NAME_EN: 'AL GHUWAYBAH',
    CIT_NAME_AR: 'الغويبة',
  },
  {
    CIT_CODE: 2651,
    CIT_NAME_EN: 'MURAYTIBAH',
    CIT_NAME_AR: 'مريطبة',
  },
  {
    CIT_CODE: 2652,
    CIT_NAME_EN: 'SUDAH',
    CIT_NAME_AR: 'سوده',
  },
  {
    CIT_CODE: 2653,
    CIT_NAME_EN: 'AL UMRAN',
    CIT_NAME_AR: 'العمران',
  },
  {
    CIT_CODE: 2654,
    CIT_NAME_EN: 'AL MIJADIB',
    CIT_NAME_AR: 'آل مجادب',
  },
  {
    CIT_CODE: 2656,
    CIT_NAME_EN: "AL AS SA'DI",
    CIT_NAME_AR: 'آل الصعدي',
  },
  {
    CIT_CODE: 2657,
    CIT_NAME_EN: 'SADWAN',
    CIT_NAME_AR: 'سدوان',
  },
  {
    CIT_CODE: 2659,
    CIT_NAME_EN: "LARBU'AH",
    CIT_NAME_AR: 'لربوعة',
  },
  {
    CIT_CODE: 2660,
    CIT_NAME_EN: 'QIRAYSH',
    CIT_NAME_AR: 'قريش',
  },
  {
    CIT_CODE: 2661,
    CIT_NAME_EN: 'AL DAHMAN',
    CIT_NAME_AR: 'آل دحمان',
  },
  {
    CIT_CODE: 2664,
    CIT_NAME_EN: 'SHUHITAH',
    CIT_NAME_AR: 'شوحطة',
  },
  {
    CIT_CODE: 2666,
    CIT_NAME_EN: 'QAHA',
    CIT_NAME_AR: 'قاها',
  },
  {
    CIT_CODE: 2667,
    CIT_NAME_EN: "AL 'AZZAH",
    CIT_NAME_AR: 'آل عزة',
  },
  {
    CIT_CODE: 2668,
    CIT_NAME_EN: 'BIHAN',
    CIT_NAME_AR: 'بيحان',
  },
  {
    CIT_CODE: 2669,
    CIT_NAME_EN: 'QURANIYAH',
    CIT_NAME_AR: 'قرآنية',
  },
  {
    CIT_CODE: 2670,
    CIT_NAME_EN: "AL 'UTUF",
    CIT_NAME_AR: 'العطوف',
  },
  {
    CIT_CODE: 2671,
    CIT_NAME_EN: 'TALHAH',
    CIT_NAME_AR: 'طلحة',
  },
  {
    CIT_CODE: 2672,
    CIT_NAME_EN: 'AL QUSAYR',
    CIT_NAME_AR: 'القصير',
  },
  {
    CIT_CODE: 2673,
    CIT_NAME_EN: 'AL MAHASH',
    CIT_NAME_AR: 'المهاش',
  },
  {
    CIT_CODE: 2675,
    CIT_NAME_EN: "BADAI' QUNAY",
    CIT_NAME_AR: 'بدائع قني',
  },
  {
    CIT_CODE: 2676,
    CIT_NAME_EN: 'MUGHAYDAH',
    CIT_NAME_AR: 'مغيضة',
  },
  {
    CIT_CODE: 2677,
    CIT_NAME_EN: 'BUTAYHAN',
    CIT_NAME_AR: 'بطيحان',
  },
  {
    CIT_CODE: 2678,
    CIT_NAME_EN: 'AL QAHSIYAH',
    CIT_NAME_AR: 'القحصية',
  },
  {
    CIT_CODE: 2680,
    CIT_NAME_EN: 'AL BANANAH',
    CIT_NAME_AR: 'البنانة',
  },
  {
    CIT_CODE: 2681,
    CIT_NAME_EN: 'AR RUKAYYAH',
    CIT_NAME_AR: 'الركية',
  },
  {
    CIT_CODE: 2682,
    CIT_NAME_EN: "MARMUTHAT AL 'ALAM",
    CIT_NAME_AR: 'مرموثة العلم',
  },
  {
    CIT_CODE: 2683,
    CIT_NAME_EN: 'NAKHLAH',
    CIT_NAME_AR: 'نخلة',
  },
  {
    CIT_CODE: 2684,
    CIT_NAME_EN: 'AN NUMAYYIRAH',
    CIT_NAME_AR: 'النميرة',
  },
  {
    CIT_CODE: 2686,
    CIT_NAME_EN: 'MALHA',
    CIT_NAME_AR: 'ملحاء',
  },
  {
    CIT_CODE: 2687,
    CIT_NAME_EN: 'AT TARFAWI',
    CIT_NAME_AR: 'الطرفاوي',
  },
  {
    CIT_CODE: 2688,
    CIT_NAME_EN: 'ASH SHIQQAH',
    CIT_NAME_AR: 'الشقة',
  },
  {
    CIT_CODE: 2689,
    CIT_NAME_EN: "ASH SHU'AYLA",
    CIT_NAME_AR: 'الشعيلاء',
  },
  {
    CIT_CODE: 2690,
    CIT_NAME_EN: "BDAI' AL FUQAYY",
    CIT_NAME_AR: 'بدائع الفقي',
  },
  {
    CIT_CODE: 2691,
    CIT_NAME_EN: 'UMM HASHIM',
    CIT_NAME_AR: 'أم هشيم',
  },
  {
    CIT_CODE: 2692,
    CIT_NAME_EN: 'KHUFAYJ UMM HASHIM',
    CIT_NAME_AR: 'خفيج أم هشيم',
  },
  {
    CIT_CODE: 2696,
    CIT_NAME_EN: "QARYAT 'ISHAYRAH",
    CIT_NAME_AR: 'قرية عشيرة',
  },
  {
    CIT_CODE: 2697,
    CIT_NAME_EN: 'UQLAT AL MAKHRUQ',
    CIT_NAME_AR: 'عقلة المخروق',
  },
  {
    CIT_CODE: 2700,
    CIT_NAME_EN: 'ABLAH',
    CIT_NAME_AR: 'أبلة',
  },
  {
    CIT_CODE: 2701,
    CIT_NAME_EN: 'AL QUSAILAH',
    CIT_NAME_AR: 'القصيلة',
  },
  {
    CIT_CODE: 2704,
    CIT_NAME_EN: 'AL WUHAYBIYAT',
    CIT_NAME_AR: 'الوهيبيات',
  },
  {
    CIT_CODE: 2705,
    CIT_NAME_EN: 'URAYNIBAH',
    CIT_NAME_AR: 'أرينبة',
  },
  {
    CIT_CODE: 2706,
    CIT_NAME_EN: 'FIRTAJ',
    CIT_NAME_AR: 'فرتاج',
  },
  {
    CIT_CODE: 2707,
    CIT_NAME_EN: 'ASH SHIBRIYAH AS SAFRA',
    CIT_NAME_AR: 'الشبرية الصفراء',
  },
  {
    CIT_CODE: 2708,
    CIT_NAME_EN: 'ASH SHIBRIYAH AL HAMRA',
    CIT_NAME_AR: 'الشبرية الحمراء',
  },
  {
    CIT_CODE: 2709,
    CIT_NAME_EN: 'AL WUSAYTI',
    CIT_NAME_AR: 'الوسيطي',
  },
  {
    CIT_CODE: 2710,
    CIT_NAME_EN: 'AS SIKHINAH',
    CIT_NAME_AR: 'الصخنة',
  },
  {
    CIT_CODE: 2711,
    CIT_NAME_EN: "AFAY'IYAH",
    CIT_NAME_AR: 'أفيعية',
  },
  {
    CIT_CODE: 2713,
    CIT_NAME_EN: "AL MA'ADHIB",
    CIT_NAME_AR: 'المعاذب',
  },
  {
    CIT_CODE: 2715,
    CIT_NAME_EN: 'AL-GHAZALAH',
    CIT_NAME_AR: 'الغزالة',
  },
  {
    CIT_CODE: 2716,
    CIT_NAME_EN: 'AL GHARISAH',
    CIT_NAME_AR: 'الغريسة',
  },
  {
    CIT_CODE: 2717,
    CIT_NAME_EN: 'AL MIJAYSSAH',
    CIT_NAME_AR: 'المجيصة',
  },
  {
    CIT_CODE: 2719,
    CIT_NAME_EN: 'TULUH',
    CIT_NAME_AR: 'طلوح',
  },
  {
    CIT_CODE: 2720,
    CIT_NAME_EN: 'AL HULAYFAH AS SUFLAH',
    CIT_NAME_AR: 'الحليفة السفلى',
  },
  {
    CIT_CODE: 2723,
    CIT_NAME_EN: "QA' HAJLA",
    CIT_NAME_AR: 'قاع حجلا',
  },
  {
    CIT_CODE: 2724,
    CIT_NAME_EN: 'AL KHUFJ',
    CIT_NAME_AR: 'الخفج',
  },
  {
    CIT_CODE: 2725,
    CIT_NAME_EN: 'AL FUQAY',
    CIT_NAME_AR: 'الفقي',
  },
  {
    CIT_CODE: 2728,
    CIT_NAME_EN: 'AL AWSHARI',
    CIT_NAME_AR: 'العوشري',
  },
  {
    CIT_CODE: 2729,
    CIT_NAME_EN: 'MARAGHAN',
    CIT_NAME_AR: 'مرغان',
  },
  {
    CIT_CODE: 2730,
    CIT_NAME_EN: 'AL HUWAIDI',
    CIT_NAME_AR: 'الهويدي',
  },
  {
    CIT_CODE: 2731,
    CIT_NAME_EN: 'AL QUSAYSAH',
    CIT_NAME_AR: 'القصيصة',
  },
  {
    CIT_CODE: 2733,
    CIT_NAME_EN: 'SAQF',
    CIT_NAME_AR: 'سقف',
  },
  {
    CIT_CODE: 2734,
    CIT_NAME_EN: "BID' BIN HUWAYYIT",
    CIT_NAME_AR: 'بدع ابن حويط',
  },
  {
    CIT_CODE: 2735,
    CIT_NAME_EN: "BADAI' AS SUDA'IYAH",
    CIT_NAME_AR: 'بدائع الصداعية',
  },
  {
    CIT_CODE: 2736,
    CIT_NAME_EN: "RI' AL BAKR",
    CIT_NAME_AR: 'ريع البكر',
  },
  {
    CIT_CODE: 2737,
    CIT_NAME_EN: 'AL KILABIYAH',
    CIT_NAME_AR: 'الكلابية',
  },
  {
    CIT_CODE: 2738,
    CIT_NAME_EN: 'AL MUNAIZLAH',
    CIT_NAME_AR: 'المنيزلة',
  },
  {
    CIT_CODE: 2739,
    CIT_NAME_EN: 'AL QARAH',
    CIT_NAME_AR: 'القارة',
  },
  {
    CIT_CODE: 2740,
    CIT_NAME_EN: 'AL MANSURAH',
    CIT_NAME_AR: 'المنصورة',
  },
  {
    CIT_CODE: 2741,
    CIT_NAME_EN: 'AL MAZAWI',
    CIT_NAME_AR: 'المزاوي',
  },
  {
    CIT_CODE: 2743,
    CIT_NAME_EN: 'AL MARKAZ',
    CIT_NAME_AR: 'المركز',
  },
  {
    CIT_CODE: 2744,
    CIT_NAME_EN: 'AL FUDUL',
    CIT_NAME_AR: 'الفضول',
  },
  {
    CIT_CODE: 2745,
    CIT_NAME_EN: 'AR RUMAYLAH',
    CIT_NAME_AR: 'الرميلة',
  },
  {
    CIT_CODE: 2746,
    CIT_NAME_EN: 'AL JISHSHAH',
    CIT_NAME_AR: 'الجشة',
  },
  {
    CIT_CODE: 2749,
    CIT_NAME_EN: 'AL JULIJLAH',
    CIT_NAME_AR: 'الجليجلة',
  },
  {
    CIT_CODE: 2750,
    CIT_NAME_EN: 'AL MUTAIRIFI',
    CIT_NAME_AR: 'المطيرفي',
  },
  {
    CIT_CODE: 2752,
    CIT_NAME_EN: "BANI MU'N",
    CIT_NAME_AR: 'بني معن',
  },
  {
    CIT_CODE: 2754,
    CIT_NAME_EN: 'AL KHINN',
    CIT_NAME_AR: 'الخن',
  },
  {
    CIT_CODE: 2756,
    CIT_NAME_EN: 'KHURAYS',
    CIT_NAME_AR: 'خريص',
  },
  {
    CIT_CODE: 2757,
    CIT_NAME_EN: "URAY'IRAH",
    CIT_NAME_AR: 'عريعرة',
  },
  {
    CIT_CODE: 2758,
    CIT_NAME_EN: "MATALI' / UMM TALI'",
    CIT_NAME_AR: 'متالع / ام تالع',
  },
  {
    CIT_CODE: 2759,
    CIT_NAME_EN: 'AT TUWAYTHIR',
    CIT_NAME_AR: 'التويثير',
  },
  {
    CIT_CODE: 2760,
    CIT_NAME_EN: 'AD DALWAH',
    CIT_NAME_AR: 'الدالوة',
  },
  {
    CIT_CODE: 2761,
    CIT_NAME_EN: 'ASH SHAHADIN',
    CIT_NAME_AR: 'الشهادين',
  },
  {
    CIT_CODE: 2762,
    CIT_NAME_EN: 'AL HALILAH',
    CIT_NAME_AR: 'الحليلة',
  },
  {
    CIT_CODE: 2763,
    CIT_NAME_EN: 'AT TARAF',
    CIT_NAME_AR: 'الطرف',
  },
  {
    CIT_CODE: 2765,
    CIT_NAME_EN: 'AL HUNAYY',
    CIT_NAME_AR: 'الحني',
  },
  {
    CIT_CODE: 2766,
    CIT_NAME_EN: 'AL QUSAYBI',
    CIT_NAME_AR: 'القصيبي',
  },
  {
    CIT_CODE: 2767,
    CIT_NAME_EN: 'AL HABL',
    CIT_NAME_AR: 'الحبل',
  },
  {
    CIT_CODE: 2769,
    CIT_NAME_EN: 'NIBAK',
    CIT_NAME_AR: 'نباك',
  },
  {
    CIT_CODE: 2770,
    CIT_NAME_EN: 'AL BARJASIYAH',
    CIT_NAME_AR: 'البرجسية',
  },
  {
    CIT_CODE: 2771,
    CIT_NAME_EN: "MAZRA'AT AZ ZARQA",
    CIT_NAME_AR: 'مزرعة الزرقاء',
  },
  {
    CIT_CODE: 2772,
    CIT_NAME_EN: "MAZRAI' UMM DHUHAYRAH",
    CIT_NAME_AR: 'مزارع أم ظهيرة',
  },
  {
    CIT_CODE: 2773,
    CIT_NAME_EN: 'AN NABTA RAYYAH',
    CIT_NAME_AR: 'النبتى رية',
  },
  {
    CIT_CODE: 2780,
    CIT_NAME_EN: 'AN NUBQIYAH',
    CIT_NAME_AR: 'النبقية',
  },
  {
    CIT_CODE: 2781,
    CIT_NAME_EN: 'UMM HAZM',
    CIT_NAME_AR: 'أم حزم',
  },
  {
    CIT_CODE: 2784,
    CIT_NAME_EN: 'AL HUBAYRIYAH',
    CIT_NAME_AR: 'الهبيرية',
  },
  {
    CIT_CODE: 2786,
    CIT_NAME_EN: 'SAQ',
    CIT_NAME_AR: 'ساق',
  },
  {
    CIT_CODE: 2788,
    CIT_NAME_EN: 'AL BAKRAH',
    CIT_NAME_AR: 'البكرة',
  },
  {
    CIT_CODE: 2789,
    CIT_NAME_EN: 'DAWBAH',
    CIT_NAME_AR: 'دوبح',
  },
  {
    CIT_CODE: 2791,
    CIT_NAME_EN: 'TUWAL JUBAYRAH',
    CIT_NAME_AR: 'طوال جبيرة',
  },
  {
    CIT_CODE: 2792,
    CIT_NAME_EN: 'JUBAYRAH',
    CIT_NAME_AR: 'جبيرة',
  },
  {
    CIT_CODE: 2794,
    CIT_NAME_EN: 'AL JIMDAH',
    CIT_NAME_AR: 'الجمدة',
  },
  {
    CIT_CODE: 2796,
    CIT_NAME_EN: 'AL FAJJANAH',
    CIT_NAME_AR: 'الفجانة',
  },
  {
    CIT_CODE: 2798,
    CIT_NAME_EN: 'AL JURAYF',
    CIT_NAME_AR: 'الجريف',
  },
  {
    CIT_CODE: 2799,
    CIT_NAME_EN: 'AL HUJAYRAH',
    CIT_NAME_AR: 'الحجيرة',
  },
  {
    CIT_CODE: 2800,
    CIT_NAME_EN: 'RANYAH',
    CIT_NAME_AR: 'رنية',
  },
  {
    CIT_CODE: 2804,
    CIT_NAME_EN: 'KUWAYKIB',
    CIT_NAME_AR: 'كويكب',
  },
  {
    CIT_CODE: 2805,
    CIT_NAME_EN: 'AD DURAM',
    CIT_NAME_AR: 'الضرم',
  },
  {
    CIT_CODE: 2806,
    CIT_NAME_EN: "AL 'UWAYLAH",
    CIT_NAME_AR: 'العويلة',
  },
  {
    CIT_CODE: 2807,
    CIT_NAME_EN: 'AL AMLAH',
    CIT_NAME_AR: 'الاملح',
  },
  {
    CIT_CODE: 2808,
    CIT_NAME_EN: 'TURABAT AL KHIYALAH',
    CIT_NAME_AR: 'تربة الخيالة',
  },
  {
    CIT_CODE: 2809,
    CIT_NAME_EN: 'BANI FARWAH',
    CIT_NAME_AR: 'بني فروة',
  },
  {
    CIT_CODE: 2810,
    CIT_NAME_EN: "KHID'AH",
    CIT_NAME_AR: 'خدعة',
  },
  {
    CIT_CODE: 2811,
    CIT_NAME_EN: 'AL HUDAYRI',
    CIT_NAME_AR: 'الحضيري',
  },
  {
    CIT_CODE: 2812,
    CIT_NAME_EN: "AN NA'ARAH",
    CIT_NAME_AR: 'النعرة',
  },
  {
    CIT_CODE: 2813,
    CIT_NAME_EN: 'ATH THUDAH',
    CIT_NAME_AR: 'الثودة',
  },
  {
    CIT_CODE: 2814,
    CIT_NAME_EN: "JI'ABAH",
    CIT_NAME_AR: 'جعبة',
  },
  {
    CIT_CODE: 2815,
    CIT_NAME_EN: 'BANI SAR',
    CIT_NAME_AR: 'بني سار',
  },
  {
    CIT_CODE: 2816,
    CIT_NAME_EN: 'AR RABWAH',
    CIT_NAME_AR: 'الربوة',
  },
  {
    CIT_CODE: 2818,
    CIT_NAME_EN: 'MARAZIQ',
    CIT_NAME_AR: 'مرازيق',
  },
  {
    CIT_CODE: 2819,
    CIT_NAME_EN: 'AL-AKEEK',
    CIT_NAME_AR: 'العقيق',
  },
  {
    CIT_CODE: 2820,
    CIT_NAME_EN: 'AL MUTARIYAH',
    CIT_NAME_AR: 'المطرية',
  },
  {
    CIT_CODE: 2822,
    CIT_NAME_EN: 'WURAKH',
    CIT_NAME_AR: 'وراخ',
  },
  {
    CIT_CODE: 2823,
    CIT_NAME_EN: 'JARAB',
    CIT_NAME_AR: 'جرب',
  },
  {
    CIT_CODE: 2824,
    CIT_NAME_EN: 'KARA AL HAIT',
    CIT_NAME_AR: 'كرا الحائط',
  },
  {
    CIT_CODE: 2825,
    CIT_NAME_EN: 'AN NASBA',
    CIT_NAME_AR: 'النصباء',
  },
  {
    CIT_CODE: 2826,
    CIT_NAME_EN: 'BALHAKAM',
    CIT_NAME_AR: 'بالحكم',
  },
  {
    CIT_CODE: 2827,
    CIT_NAME_EN: "AL SUQA'AH",
    CIT_NAME_AR: 'آل صقاعة',
  },
  {
    CIT_CODE: 2828,
    CIT_NAME_EN: 'AL MAGHTHAH',
    CIT_NAME_AR: 'المغثة',
  },
  {
    CIT_CODE: 2829,
    CIT_NAME_EN: 'HADHWAH',
    CIT_NAME_AR: 'حظوة',
  },
  {
    CIT_CODE: 2830,
    CIT_NAME_EN: "AL 'AQIB",
    CIT_NAME_AR: 'العقب',
  },
  {
    CIT_CODE: 2831,
    CIT_NAME_EN: 'AMDAN',
    CIT_NAME_AR: 'عمضان',
  },
  {
    CIT_CODE: 2832,
    CIT_NAME_EN: 'AL HABIBAH',
    CIT_NAME_AR: 'آل حبيبة',
  },
  {
    CIT_CODE: 2833,
    CIT_NAME_EN: 'MARAWAH',
    CIT_NAME_AR: 'مراوة',
  },
  {
    CIT_CODE: 2834,
    CIT_NAME_EN: 'AS SAFH',
    CIT_NAME_AR: 'الصفح',
  },
  {
    CIT_CODE: 2835,
    CIT_NAME_EN: 'AL-MANDAK',
    CIT_NAME_AR: 'المندق',
  },
  {
    CIT_CODE: 2836,
    CIT_NAME_EN: 'BAL KHAZMAR',
    CIT_NAME_AR: 'بالخزمر',
  },
  {
    CIT_CODE: 2838,
    CIT_NAME_EN: "AL NA'MAH",
    CIT_NAME_AR: 'ال نعمة',
  },
  {
    CIT_CODE: 2839,
    CIT_NAME_EN: 'DAWS',
    CIT_NAME_AR: 'دوس',
  },
  {
    CIT_CODE: 2842,
    CIT_NAME_EN: 'ABU GHUBAR',
    CIT_NAME_AR: 'أبو غبار',
  },
  {
    CIT_CODE: 2844,
    CIT_NAME_EN: 'AL IFAYHID',
    CIT_NAME_AR: 'الإفيهد',
  },
  {
    CIT_CODE: 2846,
    CIT_NAME_EN: 'ASHQAR AN NUMANIYAT',
    CIT_NAME_AR: 'أشقر النومانيات',
  },
  {
    CIT_CODE: 2847,
    CIT_NAME_EN: 'AN NUMANIYAH',
    CIT_NAME_AR: 'النومانية',
  },
  {
    CIT_CODE: 2848,
    CIT_NAME_EN: "AL 'AMUDAH AL JANUBIYAH",
    CIT_NAME_AR: 'العمودة الجنوبية',
  },
  {
    CIT_CODE: 2849,
    CIT_NAME_EN: "AL 'AMUDAH ASH SHAMALIYAH",
    CIT_NAME_AR: 'العمودة الشمالية',
  },
  {
    CIT_CODE: 2851,
    CIT_NAME_EN: "AL ISHAY'IL",
    CIT_NAME_AR: 'الأشيعل',
  },
  {
    CIT_CODE: 2852,
    CIT_NAME_EN: 'AL QIHABIYAH',
    CIT_NAME_AR: 'القهيبية',
  },
  {
    CIT_CODE: 2853,
    CIT_NAME_EN: "ASH SHI'FANIYAH",
    CIT_NAME_AR: 'الشعيفانية',
  },
  {
    CIT_CODE: 2855,
    CIT_NAME_EN: 'DIRAYMIHAH',
    CIT_NAME_AR: 'دريميحة',
  },
  {
    CIT_CODE: 2856,
    CIT_NAME_EN: 'AL MASAK',
    CIT_NAME_AR: 'المصك',
  },
  {
    CIT_CODE: 2857,
    CIT_NAME_EN: 'QURAYTAH',
    CIT_NAME_AR: 'قريطة',
  },
  {
    CIT_CODE: 2859,
    CIT_NAME_EN: 'QASR AL BATTAH',
    CIT_NAME_AR: 'قصر البطاح',
  },
  {
    CIT_CODE: 2860,
    CIT_NAME_EN: 'AS SEEH',
    CIT_NAME_AR: 'السيح',
  },
  {
    CIT_CODE: 2861,
    CIT_NAME_EN: 'AL HIMLIYAH',
    CIT_NAME_AR: 'الحملية',
  },
  {
    CIT_CODE: 2862,
    CIT_NAME_EN: 'AS SUWAYTIYAH',
    CIT_NAME_AR: 'الصويتية',
  },
  {
    CIT_CODE: 2863,
    CIT_NAME_EN: 'AL ASAMIR',
    CIT_NAME_AR: 'الأسامر',
  },
  {
    CIT_CODE: 2864,
    CIT_NAME_EN: 'AL ASAS',
    CIT_NAME_AR: 'الأساس',
  },
  {
    CIT_CODE: 2865,
    CIT_NAME_EN: 'ABU NAKHLAH',
    CIT_NAME_AR: 'أبو نخلة',
  },
  {
    CIT_CODE: 2866,
    CIT_NAME_EN: 'ASH SHUBAYKIYAH',
    CIT_NAME_AR: 'الشبيكية',
  },
  {
    CIT_CODE: 2868,
    CIT_NAME_EN: 'JADID',
    CIT_NAME_AR: 'جديد',
  },
  {
    CIT_CODE: 2870,
    CIT_NAME_EN: 'AL KHISHAYBI',
    CIT_NAME_AR: 'الخشيبي',
  },
  {
    CIT_CODE: 2871,
    CIT_NAME_EN: 'AL HAJJAZIYAH',
    CIT_NAME_AR: 'الحجازية',
  },
  {
    CIT_CODE: 2872,
    CIT_NAME_EN: "ZUR AL 'AQARIB",
    CIT_NAME_AR: 'زور العقارب',
  },
  {
    CIT_CODE: 2873,
    CIT_NAME_EN: 'AL GHAFIYAH',
    CIT_NAME_AR: 'الغافية',
  },
  {
    CIT_CODE: 2874,
    CIT_NAME_EN: 'SUFAH',
    CIT_NAME_AR: 'صفاه',
  },
  {
    CIT_CODE: 2875,
    CIT_NAME_EN: "AL 'ADABAT",
    CIT_NAME_AR: 'العضبات',
  },
  {
    CIT_CODE: 2876,
    CIT_NAME_EN: 'QATAN',
    CIT_NAME_AR: 'قطان',
  },
  {
    CIT_CODE: 2877,
    CIT_NAME_EN: 'THAR',
    CIT_NAME_AR: 'ثار',
  },
  {
    CIT_CODE: 2879,
    CIT_NAME_EN: 'ASH SHURAFAT',
    CIT_NAME_AR: 'الشرفات',
  },
  {
    CIT_CODE: 2880,
    CIT_NAME_EN: "AR RA'Y",
    CIT_NAME_AR: 'الرعي',
  },
  {
    CIT_CODE: 2881,
    CIT_NAME_EN: 'AT TIRQ',
    CIT_NAME_AR: 'الطرق',
  },
  {
    CIT_CODE: 2882,
    CIT_NAME_EN: 'AL JIRMAH',
    CIT_NAME_AR: 'الجرمة',
  },
  {
    CIT_CODE: 2883,
    CIT_NAME_EN: 'AL HASHAFAH',
    CIT_NAME_AR: 'الحشافة',
  },
  {
    CIT_CODE: 2884,
    CIT_NAME_EN: 'HAMADAH',
    CIT_NAME_AR: 'حمضة',
  },
  {
    CIT_CODE: 2885,
    CIT_NAME_EN: "AL MAT'AN",
    CIT_NAME_AR: 'المطعن',
  },
  {
    CIT_CODE: 2886,
    CIT_NAME_EN: 'AL MANJAHAH',
    CIT_NAME_AR: 'المنجحة',
  },
  {
    CIT_CODE: 2888,
    CIT_NAME_EN: 'GHALIB',
    CIT_NAME_AR: 'غالب',
  },
  {
    CIT_CODE: 2889,
    CIT_NAME_EN: "SA'IDAH",
    CIT_NAME_AR: 'سعيدة',
  },
  {
    CIT_CODE: 2890,
    CIT_NAME_EN: "AL AJRA' ASH SHAMALI",
    CIT_NAME_AR: 'الأجرع الشمالي',
  },
  {
    CIT_CODE: 2892,
    CIT_NAME_EN: 'DABSA',
    CIT_NAME_AR: 'دبساء',
  },
  {
    CIT_CODE: 2893,
    CIT_NAME_EN: 'ALBRK',
    CIT_NAME_AR: 'البرك',
  },
  {
    CIT_CODE: 2894,
    CIT_NAME_EN: 'AL QAHMAH',
    CIT_NAME_AR: 'القحمة',
  },
  {
    CIT_CODE: 2895,
    CIT_NAME_EN: 'AMAQ',
    CIT_NAME_AR: 'عمق',
  },
  {
    CIT_CODE: 2896,
    CIT_NAME_EN: 'AL HADHIRAH',
    CIT_NAME_AR: 'الحظيرة',
  },
  {
    CIT_CODE: 2897,
    CIT_NAME_EN: 'AL HAMID',
    CIT_NAME_AR: 'آل حامد',
  },
  {
    CIT_CODE: 2898,
    CIT_NAME_EN: 'AL YUSUF',
    CIT_NAME_AR: 'آل يوسف',
  },
  {
    CIT_CODE: 2900,
    CIT_NAME_EN: 'LAWLAH',
    CIT_NAME_AR: 'لولاة',
  },
  {
    CIT_CODE: 2901,
    CIT_NAME_EN: 'NAJD QARAD',
    CIT_NAME_AR: 'نجد قرض',
  },
  {
    CIT_CODE: 2902,
    CIT_NAME_EN: 'JUMMAN',
    CIT_NAME_AR: 'جمان',
  },
  {
    CIT_CODE: 2903,
    CIT_NAME_EN: 'KATHM',
    CIT_NAME_AR: 'كثم',
  },
  {
    CIT_CODE: 2907,
    CIT_NAME_EN: "LI'SAN",
    CIT_NAME_AR: 'لعصان',
  },
  {
    CIT_CODE: 2908,
    CIT_NAME_EN: 'AL MAHALAH',
    CIT_NAME_AR: 'المحالة',
  },
  {
    CIT_CODE: 2910,
    CIT_NAME_EN: "SIRR AL AS SIRI'",
    CIT_NAME_AR: 'سر آل السريع',
  },
  {
    CIT_CODE: 2911,
    CIT_NAME_EN: "AL 'ABAB",
    CIT_NAME_AR: 'العبب',
  },
  {
    CIT_CODE: 2913,
    CIT_NAME_EN: 'AL JARJAR',
    CIT_NAME_AR: 'الجرجر',
  },
  {
    CIT_CODE: 2914,
    CIT_NAME_EN: 'ADWAN',
    CIT_NAME_AR: 'عدوان',
  },
  {
    CIT_CODE: 2916,
    CIT_NAME_EN: "AL JA'JA'",
    CIT_NAME_AR: 'الجعجاع',
  },
  {
    CIT_CODE: 2917,
    CIT_NAME_EN: 'AL MAWSATAH',
    CIT_NAME_AR: 'الموسطة',
  },
  {
    CIT_CODE: 2918,
    CIT_NAME_EN: "AL JUM'AH",
    CIT_NAME_AR: 'آل جمعة',
  },
  {
    CIT_CODE: 2919,
    CIT_NAME_EN: "AL 'AZIZAH",
    CIT_NAME_AR: 'العزيزة',
  },
  {
    CIT_CODE: 2920,
    CIT_NAME_EN: 'AL HIRAYR AL GHARBI',
    CIT_NAME_AR: 'الهرير الغربي',
  },
  {
    CIT_CODE: 2921,
    CIT_NAME_EN: 'ITARAH',
    CIT_NAME_AR: 'إيتارة',
  },
  {
    CIT_CODE: 2923,
    CIT_NAME_EN: 'AL QURH',
    CIT_NAME_AR: 'القرح',
  },
  {
    CIT_CODE: 2924,
    CIT_NAME_EN: "AL 'URF",
    CIT_NAME_AR: 'العرف',
  },
  {
    CIT_CODE: 2925,
    CIT_NAME_EN: 'ABU JARSHAH',
    CIT_NAME_AR: 'أبو جرشة',
  },
  {
    CIT_CODE: 2926,
    CIT_NAME_EN: 'AL KHASHM',
    CIT_NAME_AR: 'الخشم',
  },
  {
    CIT_CODE: 2927,
    CIT_NAME_EN: "RUGH AL 'ANID",
    CIT_NAME_AR: 'روغ العاند',
  },
  {
    CIT_CODE: 2928,
    CIT_NAME_EN: 'AL BALFALAH',
    CIT_NAME_AR: 'آل بالفلاح',
  },
  {
    CIT_CODE: 2929,
    CIT_NAME_EN: 'HAJLA',
    CIT_NAME_AR: 'حجلا',
  },
  {
    CIT_CODE: 2930,
    CIT_NAME_EN: "AL 'UTFAH",
    CIT_NAME_AR: 'العطفة',
  },
  {
    CIT_CODE: 2931,
    CIT_NAME_EN: 'TANAH',
    CIT_NAME_AR: 'تانة',
  },
  {
    CIT_CODE: 2933,
    CIT_NAME_EN: 'HUBAYYIB',
    CIT_NAME_AR: 'حبيب',
  },
  {
    CIT_CODE: 2934,
    CIT_NAME_EN: 'RUGHFAH',
    CIT_NAME_AR: 'رغفة',
  },
  {
    CIT_CODE: 2935,
    CIT_NAME_EN: 'ADADAH',
    CIT_NAME_AR: 'عضاضة',
  },
  {
    CIT_CODE: 2936,
    CIT_NAME_EN: 'AL SIRHAN',
    CIT_NAME_AR: 'آل سرحان',
  },
  {
    CIT_CODE: 2939,
    CIT_NAME_EN: "AL MAJMA'",
    CIT_NAME_AR: 'المجمع',
  },
  {
    CIT_CODE: 2940,
    CIT_NAME_EN: 'AS SAYHANI',
    CIT_NAME_AR: 'الصيحاني',
  },
  {
    CIT_CODE: 2941,
    CIT_NAME_EN: 'AL BIHAYMAH',
    CIT_NAME_AR: 'البهيمة',
  },
  {
    CIT_CODE: 2943,
    CIT_NAME_EN: 'AL JARR AS SAGHIR',
    CIT_NAME_AR: 'الجر الصغير',
  },
  {
    CIT_CODE: 2945,
    CIT_NAME_EN: 'TAMNIYAH',
    CIT_NAME_AR: 'تمنية',
  },
  {
    CIT_CODE: 2947,
    CIT_NAME_EN: "AL 'ALI",
    CIT_NAME_AR: 'آل علي',
  },
  {
    CIT_CODE: 2948,
    CIT_NAME_EN: 'AYN ADH DHIBAH',
    CIT_NAME_AR: 'عين الذيبة',
  },
  {
    CIT_CODE: 2951,
    CIT_NAME_EN: 'AL ZAYDI',
    CIT_NAME_AR: 'آل زيدي',
  },
  {
    CIT_CODE: 2952,
    CIT_NAME_EN: 'HUSN AL JARIN',
    CIT_NAME_AR: 'حصن الجرين',
  },
  {
    CIT_CODE: 2953,
    CIT_NAME_EN: "AL 'ASIM",
    CIT_NAME_AR: 'آل عاصم',
  },
  {
    CIT_CODE: 2954,
    CIT_NAME_EN: 'AL JANFUR',
    CIT_NAME_AR: 'الجنفور',
  },
  {
    CIT_CODE: 2955,
    CIT_NAME_EN: 'ARAYIS',
    CIT_NAME_AR: 'عرايس',
  },
  {
    CIT_CODE: 2956,
    CIT_NAME_EN: 'UMAM',
    CIT_NAME_AR: 'عمام',
  },
  {
    CIT_CODE: 2958,
    CIT_NAME_EN: 'SHUHAT',
    CIT_NAME_AR: 'شوحط',
  },
  {
    CIT_CODE: 2959,
    CIT_NAME_EN: "MANADIR AL 'AYN",
    CIT_NAME_AR: 'منادرالعين',
  },
  {
    CIT_CODE: 2960,
    CIT_NAME_EN: 'BANI RIZAM',
    CIT_NAME_AR: 'بني رزام',
  },
  {
    CIT_CODE: 2963,
    CIT_NAME_EN: 'SHARMAH',
    CIT_NAME_AR: 'شرمة',
  },
  {
    CIT_CODE: 2964,
    CIT_NAME_EN: 'AL HANAQ',
    CIT_NAME_AR: 'الحنق',
  },
  {
    CIT_CODE: 2966,
    CIT_NAME_EN: 'AL MUJAMMAL',
    CIT_NAME_AR: 'آل مجمل',
  },
  {
    CIT_CODE: 2967,
    CIT_NAME_EN: 'BAJDAH',
    CIT_NAME_AR: 'بجدة',
  },
  {
    CIT_CODE: 2968,
    CIT_NAME_EN: 'TABAB',
    CIT_NAME_AR: 'طبب',
  },
  {
    CIT_CODE: 2969,
    CIT_NAME_EN: 'AL SHUTAT',
    CIT_NAME_AR: 'الشطاط',
  },
  {
    CIT_CODE: 2970,
    CIT_NAME_EN: "AL 'ABIDIYAH",
    CIT_NAME_AR: 'العبيدية',
  },
  {
    CIT_CODE: 2972,
    CIT_NAME_EN: 'HIMALAH',
    CIT_NAME_AR: 'حمالة',
  },
  {
    CIT_CODE: 2975,
    CIT_NAME_EN: 'AL BASSAM',
    CIT_NAME_AR: 'آل بسام',
  },
  {
    CIT_CODE: 2976,
    CIT_NAME_EN: 'AL DUKAYN',
    CIT_NAME_AR: 'آل دكين',
  },
  {
    CIT_CODE: 2977,
    CIT_NAME_EN: 'AL MAHADI',
    CIT_NAME_AR: 'آل مهدي',
  },
  {
    CIT_CODE: 2978,
    CIT_NAME_EN: 'AL MISYAD',
    CIT_NAME_AR: 'المصياد',
  },
  {
    CIT_CODE: 2979,
    CIT_NAME_EN: "AL JUZ'AH",
    CIT_NAME_AR: 'الجزعة',
  },
  {
    CIT_CODE: 2980,
    CIT_NAME_EN: 'AL MASHDUD',
    CIT_NAME_AR: 'آل مشدود',
  },
  {
    CIT_CODE: 2981,
    CIT_NAME_EN: 'AL JIHMAH',
    CIT_NAME_AR: 'الجهمة',
  },
  {
    CIT_CODE: 2982,
    CIT_NAME_EN: "AL 'USRAN",
    CIT_NAME_AR: 'العسران',
  },
  {
    CIT_CODE: 2983,
    CIT_NAME_EN: 'AL BIHABIB',
    CIT_NAME_AR: 'آل بحبيب',
  },
  {
    CIT_CODE: 2984,
    CIT_NAME_EN: "AL QAWSHA'",
    CIT_NAME_AR: 'آل قوشع',
  },
  {
    CIT_CODE: 2986,
    CIT_NAME_EN: 'AD DILAYMIYAH',
    CIT_NAME_AR: 'الدليمية',
  },
  {
    CIT_CODE: 2988,
    CIT_NAME_EN: 'AKLAT AL-SKOUR',
    CIT_NAME_AR: 'عقلة الصقور',
  },
  {
    CIT_CODE: 2990,
    CIT_NAME_EN: "QASR IBN 'UQAYYIL",
    CIT_NAME_AR: 'قصر ابن عقيل',
  },
  {
    CIT_CODE: 2991,
    CIT_NAME_EN: 'QITAN',
    CIT_NAME_AR: 'قطن',
  },
  {
    CIT_CODE: 2992,
    CIT_NAME_EN: 'AL BASIRI',
    CIT_NAME_AR: 'البصيري',
  },
  {
    CIT_CODE: 2993,
    CIT_NAME_EN: 'AL KHURAYSHA',
    CIT_NAME_AR: 'الخريشاء',
  },
  {
    CIT_CODE: 2996,
    CIT_NAME_EN: 'MIBARI',
    CIT_NAME_AR: 'مباري',
  },
  {
    CIT_CODE: 2997,
    CIT_NAME_EN: 'AL JIFN',
    CIT_NAME_AR: 'الجفن',
  },
  {
    CIT_CODE: 2998,
    CIT_NAME_EN: 'DAYM',
    CIT_NAME_AR: 'ديم',
  },
  {
    CIT_CODE: 2999,
    CIT_NAME_EN: 'AL HUMAYLIYAH',
    CIT_NAME_AR: 'الهميلية',
  },
  {
    CIT_CODE: 3000,
    CIT_NAME_EN: "AMAYIR SI'IDAH",
    CIT_NAME_AR: 'عماير سعيدة',
  },
  {
    CIT_CODE: 3001,
    CIT_NAME_EN: 'DHAWQAN AR RAKAYA',
    CIT_NAME_AR: 'ذوقان الركايا',
  },
  {
    CIT_CODE: 3002,
    CIT_NAME_EN: 'AD DAHI',
    CIT_NAME_AR: 'الضاحي',
  },
  {
    CIT_CODE: 3003,
    CIT_NAME_EN: 'AL WAHALAN',
    CIT_NAME_AR: 'الوهلان',
  },
  {
    CIT_CODE: 3004,
    CIT_NAME_EN: "AL 'AWNIYAH",
    CIT_NAME_AR: 'العونية',
  },
  {
    CIT_CODE: 3006,
    CIT_NAME_EN: 'AL ASHRAFIYAH',
    CIT_NAME_AR: 'الأشرفية',
  },
  {
    CIT_CODE: 3007,
    CIT_NAME_EN: "MAZRA'AT AL BASSAMIYAH",
    CIT_NAME_AR: 'مزرعة البسامية',
  },
  {
    CIT_CODE: 3008,
    CIT_NAME_EN: "AD DAL'AH",
    CIT_NAME_AR: 'الضلعة',
  },
  {
    CIT_CODE: 3009,
    CIT_NAME_EN: 'GHADFA',
    CIT_NAME_AR: 'غدفاء',
  },
  {
    CIT_CODE: 3010,
    CIT_NAME_EN: 'AL GHURAYBIYAH',
    CIT_NAME_AR: 'الغريبية',
  },
  {
    CIT_CODE: 3012,
    CIT_NAME_EN: 'UMM GHUWAYFAH',
    CIT_NAME_AR: 'أم غويفة',
  },
  {
    CIT_CODE: 3013,
    CIT_NAME_EN: 'AL JANAH',
    CIT_NAME_AR: 'الجناح',
  },
  {
    CIT_CODE: 3015,
    CIT_NAME_EN: 'RIYAD QANA',
    CIT_NAME_AR: 'رياض قناء',
  },
  {
    CIT_CODE: 3017,
    CIT_NAME_EN: "RAFAI' AL HUMAYMAH",
    CIT_NAME_AR: 'رفائع الحميمة',
  },
  {
    CIT_CODE: 3018,
    CIT_NAME_EN: 'MUDHAYFIR',
    CIT_NAME_AR: 'مظيفر',
  },
  {
    CIT_CODE: 3021,
    CIT_NAME_EN: 'ABU TALH',
    CIT_NAME_AR: 'أبو طلح',
  },
  {
    CIT_CODE: 3022,
    CIT_NAME_EN: 'MIHAYYIDAH',
    CIT_NAME_AR: 'مهيضة',
  },
  {
    CIT_CODE: 3023,
    CIT_NAME_EN: 'WADI AL NAKHIL',
    CIT_NAME_AR: 'وادي النخيل',
  },
  {
    CIT_CODE: 3024,
    CIT_NAME_EN: 'FAYYADAH',
    CIT_NAME_AR: 'فياضة',
  },
  {
    CIT_CODE: 3026,
    CIT_NAME_EN: "RUF'AI' AL HAJRAH",
    CIT_NAME_AR: 'رفائع الحجرة',
  },
  {
    CIT_CODE: 3027,
    CIT_NAME_EN: 'MISHASH RUKAYYAN',
    CIT_NAME_AR: 'مشاش ركيان',
  },
  {
    CIT_CODE: 3028,
    CIT_NAME_EN: "ABU 'ARDA",
    CIT_NAME_AR: 'أبو عرداء',
  },
  {
    CIT_CODE: 3030,
    CIT_NAME_EN: 'AL-NABHANIYAH',
    CIT_NAME_AR: 'النبهانية',
  },
  {
    CIT_CODE: 3031,
    CIT_NAME_EN: 'THADIJ',
    CIT_NAME_AR: 'ثادج',
  },
  {
    CIT_CODE: 3032,
    CIT_NAME_EN: 'RUBAYQ',
    CIT_NAME_AR: 'ربيق',
  },
  {
    CIT_CODE: 3034,
    CIT_NAME_EN: 'AL MALQA',
    CIT_NAME_AR: 'الملقاء',
  },
  {
    CIT_CODE: 3035,
    CIT_NAME_EN: 'AL KHARMA',
    CIT_NAME_AR: 'الخرماء',
  },
  {
    CIT_CODE: 3036,
    CIT_NAME_EN: 'AL KHARMA ASH SHAMALIYAH',
    CIT_NAME_AR: 'الخرماءالشمالية',
  },
  {
    CIT_CODE: 3037,
    CIT_NAME_EN: 'AL HAYSUNIYAH',
    CIT_NAME_AR: 'الحيسونية',
  },
  {
    CIT_CODE: 3038,
    CIT_NAME_EN: "AL QU'AYYIR",
    CIT_NAME_AR: 'القعير',
  },
  {
    CIT_CODE: 3040,
    CIT_NAME_EN: 'QURAYDAH',
    CIT_NAME_AR: 'قريضة',
  },
  {
    CIT_CODE: 3042,
    CIT_NAME_EN: 'ABYAR ALI',
    CIT_NAME_AR: 'ابيار علي',
  },
  {
    CIT_CODE: 3043,
    CIT_NAME_EN: 'ABU KABIR',
    CIT_NAME_AR: 'أبو كبير',
  },
  {
    CIT_CODE: 3044,
    CIT_NAME_EN: 'AD DUWAYKHILAH',
    CIT_NAME_AR: 'الدويخلة',
  },
  {
    CIT_CODE: 3045,
    CIT_NAME_EN: "AL WU'AYRAH",
    CIT_NAME_AR: 'الوعيرة',
  },
  {
    CIT_CODE: 3048,
    CIT_NAME_EN: 'AL KHULAYL',
    CIT_NAME_AR: 'الخليل',
  },
  {
    CIT_CODE: 3049,
    CIT_NAME_EN: "NA'AMIN",
    CIT_NAME_AR: 'نعامين',
  },
  {
    CIT_CODE: 3050,
    CIT_NAME_EN: 'MULAYHAH',
    CIT_NAME_AR: 'مليحة',
  },
  {
    CIT_CODE: 3052,
    CIT_NAME_EN: 'AL HAR AS SUFLA',
    CIT_NAME_AR: 'الحار السفلى',
  },
  {
    CIT_CODE: 3053,
    CIT_NAME_EN: 'MUFARRIHAT',
    CIT_NAME_AR: 'مفرحات',
  },
  {
    CIT_CODE: 3054,
    CIT_NAME_EN: "AL QUTAY'A",
    CIT_NAME_AR: 'القطيعاء',
  },
  {
    CIT_CODE: 3057,
    CIT_NAME_EN: 'ARBAQ',
    CIT_NAME_AR: 'أرباق',
  },
  {
    CIT_CODE: 3058,
    CIT_NAME_EN: 'AL MULAYLIH',
    CIT_NAME_AR: 'المليليح',
  },
  {
    CIT_CODE: 3059,
    CIT_NAME_EN: 'AL MAGHARAH',
    CIT_NAME_AR: 'المغرة',
  },
  {
    CIT_CODE: 3060,
    CIT_NAME_EN: 'ABU NUMASAT',
    CIT_NAME_AR: 'أبو نمصات',
  },
  {
    CIT_CODE: 3061,
    CIT_NAME_EN: 'DITHIR',
    CIT_NAME_AR: 'دثير',
  },
  {
    CIT_CODE: 3063,
    CIT_NAME_EN: "AL 'UWAYNAH",
    CIT_NAME_AR: 'العوينة',
  },
  {
    CIT_CODE: 3065,
    CIT_NAME_EN: "ATH THA'ALAH",
    CIT_NAME_AR: 'الثعلة',
  },
  {
    CIT_CODE: 3066,
    CIT_NAME_EN: "AL HAR AL 'ULYA",
    CIT_NAME_AR: 'الحار العليا',
  },
  {
    CIT_CODE: 3067,
    CIT_NAME_EN: "AL MUDAYBI'AH",
    CIT_NAME_AR: 'المضيبعة',
  },
  {
    CIT_CODE: 3068,
    CIT_NAME_EN: 'AS SUSI',
    CIT_NAME_AR: 'السوسي',
  },
  {
    CIT_CODE: 3069,
    CIT_NAME_EN: 'ASH SHALAYIL',
    CIT_NAME_AR: 'الشلايل',
  },
  {
    CIT_CODE: 3070,
    CIT_NAME_EN: 'UWAYDIK',
    CIT_NAME_AR: 'أويدك',
  },
  {
    CIT_CODE: 3071,
    CIT_NAME_EN: 'AL GHARID',
    CIT_NAME_AR: 'الغريض',
  },
  {
    CIT_CODE: 3072,
    CIT_NAME_EN: 'AS SAYFI',
    CIT_NAME_AR: 'الصيفي',
  },
  {
    CIT_CODE: 3073,
    CIT_NAME_EN: 'AL GHUSAN',
    CIT_NAME_AR: 'الغصن',
  },
  {
    CIT_CODE: 3074,
    CIT_NAME_EN: 'ADH DHAMU',
    CIT_NAME_AR: 'الظمو',
  },
  {
    CIT_CODE: 3075,
    CIT_NAME_EN: 'AL TARQIYAH',
    CIT_NAME_AR: 'الطرقية',
  },
  {
    CIT_CODE: 3076,
    CIT_NAME_EN: "UMM AL 'IYAL",
    CIT_NAME_AR: 'أم العيال',
  },
  {
    CIT_CODE: 3077,
    CIT_NAME_EN: 'AL MALBANAH',
    CIT_NAME_AR: 'الملبنة',
  },
  {
    CIT_CODE: 3078,
    CIT_NAME_EN: 'HANADH',
    CIT_NAME_AR: 'حنذ',
  },
  {
    CIT_CODE: 3079,
    CIT_NAME_EN: 'AL HINDIYAH',
    CIT_NAME_AR: 'الهندية',
  },
  {
    CIT_CODE: 3082,
    CIT_NAME_EN: "AN NUQAY'A",
    CIT_NAME_AR: 'النقيعاء',
  },
  {
    CIT_CODE: 3083,
    CIT_NAME_EN: 'AL MUSHAYNIYAH',
    CIT_NAME_AR: 'المشينية',
  },
  {
    CIT_CODE: 3084,
    CIT_NAME_EN: 'AL QAFILAH',
    CIT_NAME_AR: 'القافلة',
  },
  {
    CIT_CODE: 3086,
    CIT_NAME_EN: 'AL MILHAH',
    CIT_NAME_AR: 'الملحة',
  },
  {
    CIT_CODE: 3087,
    CIT_NAME_EN: "AL 'AYZA",
    CIT_NAME_AR: 'العيزاء',
  },
  {
    CIT_CODE: 3089,
    CIT_NAME_EN: 'AL BARDIYAH',
    CIT_NAME_AR: 'البردية',
  },
  {
    CIT_CODE: 3090,
    CIT_NAME_EN: "AL 'USHAYRAH",
    CIT_NAME_AR: 'العشيرة',
  },
  {
    CIT_CODE: 3091,
    CIT_NAME_EN: 'AL QISAYYIBAH',
    CIT_NAME_AR: 'القصيبة',
  },
  {
    CIT_CODE: 3092,
    CIT_NAME_EN: 'ASH SHUWAMIN',
    CIT_NAME_AR: 'الشوامين',
  },
  {
    CIT_CODE: 3094,
    CIT_NAME_EN: 'TAYTAD',
    CIT_NAME_AR: 'تيتد',
  },
  {
    CIT_CODE: 3095,
    CIT_NAME_EN: 'AL BUYAYRAT',
    CIT_NAME_AR: 'البييرات',
  },
  {
    CIT_CODE: 3096,
    CIT_NAME_EN: 'HURUMAH',
    CIT_NAME_AR: 'هرمة',
  },
  {
    CIT_CODE: 3097,
    CIT_NAME_EN: "AL 'UTHAYYA",
    CIT_NAME_AR: 'العثيا',
  },
  {
    CIT_CODE: 3098,
    CIT_NAME_EN: 'SHIQRI',
    CIT_NAME_AR: 'شقري',
  },
  {
    CIT_CODE: 3099,
    CIT_NAME_EN: 'SHAJWA',
    CIT_NAME_AR: 'شجوى',
  },
  {
    CIT_CODE: 3100,
    CIT_NAME_EN: 'AL BUWAIR',
    CIT_NAME_AR: 'البوير',
  },
  {
    CIT_CODE: 3101,
    CIT_NAME_EN: 'ASH SHUQRAH',
    CIT_NAME_AR: 'الشقرة',
  },
  {
    CIT_CODE: 3103,
    CIT_NAME_EN: 'AL FURAYSH',
    CIT_NAME_AR: 'الفريش',
  },
  {
    CIT_CODE: 3106,
    CIT_NAME_EN: "AR RASI'AH",
    CIT_NAME_AR: 'الرصيعة',
  },
  {
    CIT_CODE: 3107,
    CIT_NAME_EN: 'ABYAR AL MASHI',
    CIT_NAME_AR: 'ابيار الماشي',
  },
  {
    CIT_CODE: 3108,
    CIT_NAME_EN: 'RUWAWAH',
    CIT_NAME_AR: 'رواوة',
  },
  {
    CIT_CODE: 3110,
    CIT_NAME_EN: "ABU DIBA'",
    CIT_NAME_AR: 'ابو ضباع',
  },
  {
    CIT_CODE: 3112,
    CIT_NAME_EN: 'AL AKHAL',
    CIT_NAME_AR: 'الاكحل',
  },
  {
    CIT_CODE: 3113,
    CIT_NAME_EN: 'AL YITIMAH',
    CIT_NAME_AR: 'اليتمة',
  },
  {
    CIT_CODE: 3114,
    CIT_NAME_EN: 'AL FAQIR',
    CIT_NAME_AR: 'الفقير',
  },
  {
    CIT_CODE: 3116,
    CIT_NAME_EN: 'BUWAT',
    CIT_NAME_AR: 'بواط',
  },
  {
    CIT_CODE: 3117,
    CIT_NAME_EN: "AL 'USAYLIB",
    CIT_NAME_AR: 'العصيلب',
  },
  {
    CIT_CODE: 3118,
    CIT_NAME_EN: 'AL JIFDUR',
    CIT_NAME_AR: 'الجفدور',
  },
  {
    CIT_CODE: 3119,
    CIT_NAME_EN: 'MISKAH',
    CIT_NAME_AR: 'مسكة',
  },
  {
    CIT_CODE: 3120,
    CIT_NAME_EN: 'UMM AL MAHASH',
    CIT_NAME_AR: 'أم المحاش',
  },
  {
    CIT_CODE: 3121,
    CIT_NAME_EN: 'IDAH',
    CIT_NAME_AR: 'عيدة',
  },
  {
    CIT_CODE: 3123,
    CIT_NAME_EN: 'SUMAYIR',
    CIT_NAME_AR: 'صميعر',
  },
  {
    CIT_CODE: 3124,
    CIT_NAME_EN: 'FAYDAT SALAM',
    CIT_NAME_AR: 'فيضة سلام',
  },
  {
    CIT_CODE: 3125,
    CIT_NAME_EN: 'TUFAYLAH',
    CIT_NAME_AR: 'طفيلة',
  },
  {
    CIT_CODE: 3126,
    CIT_NAME_EN: 'HULAYWAH',
    CIT_NAME_AR: 'حليوة',
  },
  {
    CIT_CODE: 3127,
    CIT_NAME_EN: 'HURMUL',
    CIT_NAME_AR: 'هرمول',
  },
  {
    CIT_CODE: 3128,
    CIT_NAME_EN: "RAWDAT 'AS'AS",
    CIT_NAME_AR: 'روضة عسعس',
  },
  {
    CIT_CODE: 3129,
    CIT_NAME_EN: 'AL MUTAYWI',
    CIT_NAME_AR: 'المطيوي',
  },
  {
    CIT_CODE: 3130,
    CIT_NAME_EN: "BADAI' HUWAYSHILAH",
    CIT_NAME_AR: 'بدائع هويشلة',
  },
  {
    CIT_CODE: 3131,
    CIT_NAME_EN: 'AL KUFFIYAH',
    CIT_NAME_AR: 'الكفية',
  },
  {
    CIT_CODE: 3132,
    CIT_NAME_EN: "BUQAY'A AL JANUBIYAH",
    CIT_NAME_AR: 'بقيعاء الجنوبية',
  },
  {
    CIT_CODE: 3133,
    CIT_NAME_EN: "AR RUFAYI' AL NAJH",
    CIT_NAME_AR: 'الرفايع النجج',
  },
  {
    CIT_CODE: 3139,
    CIT_NAME_EN: "BADAI AD DIB'IYAH",
    CIT_NAME_AR: 'بدائع الضبعية',
  },
  {
    CIT_CODE: 3140,
    CIT_NAME_EN: 'JAFRAT AL JADIDAH',
    CIT_NAME_AR: 'جفرة الجديدة',
  },
  {
    CIT_CODE: 3141,
    CIT_NAME_EN: 'JAFRAH',
    CIT_NAME_AR: 'جفرة',
  },
  {
    CIT_CODE: 3143,
    CIT_NAME_EN: "BADAI' MUSHRIFAH",
    CIT_NAME_AR: 'بدائع مشرفة',
  },
  {
    CIT_CODE: 3144,
    CIT_NAME_EN: 'NAJIKH AL JANUBI',
    CIT_NAME_AR: 'نجخ الجنوبي',
  },
  {
    CIT_CODE: 3145,
    CIT_NAME_EN: 'NAJIKH AL SHAMALI',
    CIT_NAME_AR: 'نجخ الشمالي',
  },
  {
    CIT_CODE: 3147,
    CIT_NAME_EN: "SU'AYNIN",
    CIT_NAME_AR: 'صعينين',
  },
  {
    CIT_CODE: 3148,
    CIT_NAME_EN: 'LAYM',
    CIT_NAME_AR: 'ليم',
  },
  {
    CIT_CODE: 3150,
    CIT_NAME_EN: 'BIR ZUHAYMILAH',
    CIT_NAME_AR: 'بئر زهيميلة',
  },
  {
    CIT_CODE: 3151,
    CIT_NAME_EN: 'DHERIAH',
    CIT_NAME_AR: 'ضرية',
  },
  {
    CIT_CODE: 3152,
    CIT_NAME_EN: "AS SUM'URIYAH",
    CIT_NAME_AR: 'الصمعورية',
  },
  {
    CIT_CODE: 3153,
    CIT_NAME_EN: 'SALAM',
    CIT_NAME_AR: 'سلام',
  },
  {
    CIT_CODE: 3154,
    CIT_NAME_EN: "AL 'AQIR",
    CIT_NAME_AR: 'العاقر',
  },
  {
    CIT_CODE: 3155,
    CIT_NAME_EN: "BADAI' RIMAN",
    CIT_NAME_AR: 'بدائع ريمان',
  },
  {
    CIT_CODE: 3156,
    CIT_NAME_EN: "BADAI' AD DUBTAN",
    CIT_NAME_AR: 'بدائع الضبطان',
  },
  {
    CIT_CODE: 3157,
    CIT_NAME_EN: "AL BA'JA",
    CIT_NAME_AR: 'البعجاء',
  },
  {
    CIT_CODE: 3159,
    CIT_NAME_EN: "NA'AM",
    CIT_NAME_AR: 'نعام',
  },
  {
    CIT_CODE: 3160,
    CIT_NAME_EN: 'HUTAT AL HILWAH',
    CIT_NAME_AR: 'حوطة الحلوة',
  },
  {
    CIT_CODE: 3162,
    CIT_NAME_EN: 'ASFAL AL BATIN',
    CIT_NAME_AR: 'اسفل الباطن',
  },
  {
    CIT_CODE: 3164,
    CIT_NAME_EN: "AL MITH'AB",
    CIT_NAME_AR: 'المثعب',
  },
  {
    CIT_CODE: 3167,
    CIT_NAME_EN: 'WADI AL BARK',
    CIT_NAME_AR: 'وادي البرك',
  },
  {
    CIT_CODE: 3168,
    CIT_NAME_EN: 'ASH SHUKRAH',
    CIT_NAME_AR: 'الشكرة',
  },
  {
    CIT_CODE: 3170,
    CIT_NAME_EN: 'AN NAIFIYAH',
    CIT_NAME_AR: 'النايفية',
  },
  {
    CIT_CODE: 3171,
    CIT_NAME_EN: 'AL QATIN',
    CIT_NAME_AR: 'القطين',
  },
  {
    CIT_CODE: 3172,
    CIT_NAME_EN: 'AL KHARFAH',
    CIT_NAME_AR: 'الخرفة',
  },
  {
    CIT_CODE: 3175,
    CIT_NAME_EN: 'SWIDANA',
    CIT_NAME_AR: 'سويدانا',
  },
  {
    CIT_CODE: 3178,
    CIT_NAME_EN: 'AL HAMR',
    CIT_NAME_AR: 'الحمر',
  },
  {
    CIT_CODE: 3179,
    CIT_NAME_EN: "AL BADI' AL JANUBI",
    CIT_NAME_AR: 'البديع الجنوبى',
  },
  {
    CIT_CODE: 3180,
    CIT_NAME_EN: "AL BADI' ASH SHAMALI",
    CIT_NAME_AR: 'البديع الشمالي',
  },
  {
    CIT_CODE: 3181,
    CIT_NAME_EN: 'AL HADDAR',
    CIT_NAME_AR: 'الهدار',
  },
  {
    CIT_CODE: 3182,
    CIT_NAME_EN: 'SAQI AN NAHID',
    CIT_NAME_AR: 'ساقي الناهض',
  },
  {
    CIT_CODE: 3183,
    CIT_NAME_EN: 'AL GHAYL',
    CIT_NAME_AR: 'الغيل',
  },
  {
    CIT_CODE: 3184,
    CIT_NAME_EN: 'SITARAH',
    CIT_NAME_AR: 'ستارة',
  },
  {
    CIT_CODE: 3185,
    CIT_NAME_EN: 'HARADAH',
    CIT_NAME_AR: 'حراضة',
  },
  {
    CIT_CODE: 3187,
    CIT_NAME_EN: "AL 'UTHAYTHI",
    CIT_NAME_AR: 'العثيثي',
  },
  {
    CIT_CODE: 3188,
    CIT_NAME_EN: "AL HAFA'IR",
    CIT_NAME_AR: 'ا لحفائر',
  },
  {
    CIT_CODE: 3189,
    CIT_NAME_EN: 'AS SALAM',
    CIT_NAME_AR: 'السلم',
  },
  {
    CIT_CODE: 3191,
    CIT_NAME_EN: 'AL QUWAMAH',
    CIT_NAME_AR: 'القوامة',
  },
  {
    CIT_CODE: 3192,
    CIT_NAME_EN: 'AL GHAFAH',
    CIT_NAME_AR: 'الغافة',
  },
  {
    CIT_CODE: 3193,
    CIT_NAME_EN: 'AL HIDDAH',
    CIT_NAME_AR: 'الحدة',
  },
  {
    CIT_CODE: 3194,
    CIT_NAME_EN: 'AL MAGHARA',
    CIT_NAME_AR: 'المغراء',
  },
  {
    CIT_CODE: 3195,
    CIT_NAME_EN: "AL 'UFAYRIYAH",
    CIT_NAME_AR: 'العفيرية',
  },
  {
    CIT_CODE: 3196,
    CIT_NAME_EN: 'ABU MILUH',
    CIT_NAME_AR: 'أبو ملوح',
  },
  {
    CIT_CODE: 3197,
    CIT_NAME_EN: 'AN NAGHAR',
    CIT_NAME_AR: 'النغر',
  },
  {
    CIT_CODE: 3198,
    CIT_NAME_EN: 'AS SADR',
    CIT_NAME_AR: 'السدر',
  },
  {
    CIT_CODE: 3199,
    CIT_NAME_EN: 'AL JARR THAMIYYAH',
    CIT_NAME_AR: 'الجر ثمية',
  },
  {
    CIT_CODE: 3201,
    CIT_NAME_EN: 'IBN GHUF',
    CIT_NAME_AR: 'إبن غوف',
  },
  {
    CIT_CODE: 3202,
    CIT_NAME_EN: 'AL MIFA',
    CIT_NAME_AR: 'الميفا',
  },
  {
    CIT_CODE: 3204,
    CIT_NAME_EN: 'AL UMRAH',
    CIT_NAME_AR: 'الامرة',
  },
  {
    CIT_CODE: 3206,
    CIT_NAME_EN: 'AT TAYF',
    CIT_NAME_AR: 'الطيف',
  },
  {
    CIT_CODE: 3207,
    CIT_NAME_EN: "AS SAMA'AH",
    CIT_NAME_AR: 'السمعة',
  },
  {
    CIT_CODE: 3208,
    CIT_NAME_EN: 'NABIR',
    CIT_NAME_AR: 'نابر',
  },
  {
    CIT_CODE: 3210,
    CIT_NAME_EN: "AZ ZIRA'AH",
    CIT_NAME_AR: 'الزرعة',
  },
  {
    CIT_CODE: 3211,
    CIT_NAME_EN: 'AL ISHAYRAH',
    CIT_NAME_AR: 'الاشيرة',
  },
  {
    CIT_CODE: 3213,
    CIT_NAME_EN: "FARA'T AL 'ATARDAH",
    CIT_NAME_AR: 'فرعة العطاردة',
  },
  {
    CIT_CODE: 3215,
    CIT_NAME_EN: 'AL HASHAS',
    CIT_NAME_AR: 'الحصحص',
  },
  {
    CIT_CODE: 3216,
    CIT_NAME_EN: 'QURAMA',
    CIT_NAME_AR: 'قراما',
  },
  {
    CIT_CODE: 3217,
    CIT_NAME_EN: "AL 'AYYASH",
    CIT_NAME_AR: 'العياش',
  },
  {
    CIT_CODE: 3219,
    CIT_NAME_EN: 'AL GHASANAH',
    CIT_NAME_AR: 'الغصنة',
  },
  {
    CIT_CODE: 3220,
    CIT_NAME_EN: 'QILWAH',
    CIT_NAME_AR: 'قلوة',
  },
  {
    CIT_CODE: 3222,
    CIT_NAME_EN: 'NIRA',
    CIT_NAME_AR: 'نيرا',
  },
  {
    CIT_CODE: 3225,
    CIT_NAME_EN: 'AL HATAFIRAH',
    CIT_NAME_AR: 'الهتافرة',
  },
  {
    CIT_CODE: 3227,
    CIT_NAME_EN: 'AL MASWADAH',
    CIT_NAME_AR: 'المسودة',
  },
  {
    CIT_CODE: 3228,
    CIT_NAME_EN: 'AL HASHU',
    CIT_NAME_AR: 'الحشو',
  },
  {
    CIT_CODE: 3229,
    CIT_NAME_EN: "FARA'T BANI SUHAYM",
    CIT_NAME_AR: 'فرعة بني سهيم',
  },
  {
    CIT_CODE: 3231,
    CIT_NAME_EN: "AL 'AWASIYAH",
    CIT_NAME_AR: 'العواصية',
  },
  {
    CIT_CODE: 3234,
    CIT_NAME_EN: 'AL HUSN',
    CIT_NAME_AR: 'الحصن',
  },
  {
    CIT_CODE: 3235,
    CIT_NAME_EN: 'GHAMID AZ ZINAD',
    CIT_NAME_AR: 'غامد الزناد',
  },
  {
    CIT_CODE: 3236,
    CIT_NAME_EN: 'AL-MKHWAH',
    CIT_NAME_AR: 'المخواة',
  },
  {
    CIT_CODE: 3237,
    CIT_NAME_EN: 'NUSUBAH',
    CIT_NAME_AR: 'نصبة',
  },
  {
    CIT_CODE: 3238,
    CIT_NAME_EN: 'NAWAN',
    CIT_NAME_AR: 'ناوان',
  },
  {
    CIT_CODE: 3239,
    CIT_NAME_EN: "AL 'IRQ",
    CIT_NAME_AR: 'العرق',
  },
  {
    CIT_CODE: 3240,
    CIT_NAME_EN: "KA'B",
    CIT_NAME_AR: 'كعب',
  },
  {
    CIT_CODE: 3241,
    CIT_NAME_EN: 'AL KHADIRAH',
    CIT_NAME_AR: 'الخاضرة',
  },
  {
    CIT_CODE: 3242,
    CIT_NAME_EN: 'AL QARN AL ABYAD',
    CIT_NAME_AR: 'القرن الأبيض',
  },
  {
    CIT_CODE: 3243,
    CIT_NAME_EN: 'AD DAHID',
    CIT_NAME_AR: 'الدحض',
  },
  {
    CIT_CODE: 3244,
    CIT_NAME_EN: 'ADH DHAHARAH',
    CIT_NAME_AR: 'الظهارة',
  },
  {
    CIT_CODE: 3245,
    CIT_NAME_EN: 'MAKHDARAH',
    CIT_NAME_AR: 'مخدرة',
  },
  {
    CIT_CODE: 3248,
    CIT_NAME_EN: 'BANY MULAYH',
    CIT_NAME_AR: 'بني مليح',
  },
  {
    CIT_CODE: 3249,
    CIT_NAME_EN: 'WADI AL GHAYL',
    CIT_NAME_AR: 'وادي الغيل',
  },
  {
    CIT_CODE: 3251,
    CIT_NAME_EN: "RUBU' AS SARW",
    CIT_NAME_AR: 'ربوع السرو',
  },
  {
    CIT_CODE: 3252,
    CIT_NAME_EN: 'AL BUKHISHAYF',
    CIT_NAME_AR: 'آل بو خشيف',
  },
  {
    CIT_CODE: 3253,
    CIT_NAME_EN: 'BAHWAN',
    CIT_NAME_AR: 'بهوان',
  },
  {
    CIT_CODE: 3254,
    CIT_NAME_EN: 'AD DARIBAYN',
    CIT_NAME_AR: 'الضاربين',
  },
  {
    CIT_CODE: 3255,
    CIT_NAME_EN: 'AL MAKHLAD',
    CIT_NAME_AR: 'آل مخلد',
  },
  {
    CIT_CODE: 3256,
    CIT_NAME_EN: "AL 'ABBAS",
    CIT_NAME_AR: 'آل عباس',
  },
  {
    CIT_CODE: 3257,
    CIT_NAME_EN: 'AL MIDRAH',
    CIT_NAME_AR: 'آل مضرة',
  },
  {
    CIT_CODE: 3258,
    CIT_NAME_EN: 'GHASHIRAH',
    CIT_NAME_AR: 'غاشرة',
  },
  {
    CIT_CODE: 3259,
    CIT_NAME_EN: 'DHABUB',
    CIT_NAME_AR: 'ذبوب',
  },
  {
    CIT_CODE: 3260,
    CIT_NAME_EN: 'MIJALID',
    CIT_NAME_AR: 'مجالد',
  },
  {
    CIT_CODE: 3261,
    CIT_NAME_EN: 'AL SAKHAYTAH',
    CIT_NAME_AR: 'آل سخيطة',
  },
  {
    CIT_CODE: 3262,
    CIT_NAME_EN: 'ABALLAH',
    CIT_NAME_AR: 'عبالة',
  },
  {
    CIT_CODE: 3263,
    CIT_NAME_EN: "AL 'UBAYD",
    CIT_NAME_AR: 'آل عبيد',
  },
  {
    CIT_CODE: 3264,
    CIT_NAME_EN: "AL MISHA'IR",
    CIT_NAME_AR: 'آل مشاعر',
  },
  {
    CIT_CODE: 3265,
    CIT_NAME_EN: 'MISFIRAH',
    CIT_NAME_AR: 'مسفرة',
  },
  {
    CIT_CODE: 3266,
    CIT_NAME_EN: 'AL FARSH',
    CIT_NAME_AR: 'آل فرش',
  },
  {
    CIT_CODE: 3267,
    CIT_NAME_EN: 'AL HUFAH',
    CIT_NAME_AR: 'الحفاة',
  },
  {
    CIT_CODE: 3268,
    CIT_NAME_EN: 'AS SURRAH',
    CIT_NAME_AR: 'الصرة',
  },
  {
    CIT_CODE: 3269,
    CIT_NAME_EN: 'HAWRA',
    CIT_NAME_AR: 'حوراء',
  },
  {
    CIT_CODE: 3271,
    CIT_NAME_EN: 'KUBADAH',
    CIT_NAME_AR: 'كبدة',
  },
  {
    CIT_CODE: 3272,
    CIT_NAME_EN: "AL 'AYNAYN",
    CIT_NAME_AR: 'العينين',
  },
  {
    CIT_CODE: 3273,
    CIT_NAME_EN: 'TNOMAH',
    CIT_NAME_AR: 'تنومة',
  },
  {
    CIT_CODE: 3274,
    CIT_NAME_EN: 'AL WADIYAYN',
    CIT_NAME_AR: 'الواديين',
  },
  {
    CIT_CODE: 3276,
    CIT_NAME_EN: 'AL LAJAM',
    CIT_NAME_AR: 'آل لجم',
  },
  {
    CIT_CODE: 3277,
    CIT_NAME_EN: 'AL ITHNAYN',
    CIT_NAME_AR: 'الاثنين',
  },
  {
    CIT_CODE: 3278,
    CIT_NAME_EN: 'AL GHALFAQ',
    CIT_NAME_AR: 'آل غلفق',
  },
  {
    CIT_CODE: 3279,
    CIT_NAME_EN: 'SUHAYBAN',
    CIT_NAME_AR: 'سحيبان',
  },
  {
    CIT_CODE: 3281,
    CIT_NAME_EN: 'QIYAN',
    CIT_NAME_AR: 'قيان',
  },
  {
    CIT_CODE: 3282,
    CIT_NAME_EN: 'AL GHARS',
    CIT_NAME_AR: 'الغرس',
  },
  {
    CIT_CODE: 3283,
    CIT_NAME_EN: 'AL HAKIMAH',
    CIT_NAME_AR: 'الحكيمة',
  },
  {
    CIT_CODE: 3284,
    CIT_NAME_EN: 'AR RAQWAH',
    CIT_NAME_AR: 'الرقوة',
  },
  {
    CIT_CODE: 3285,
    CIT_NAME_EN: 'AL AL JILDAH',
    CIT_NAME_AR: 'آل الجلدة',
  },
  {
    CIT_CODE: 3286,
    CIT_NAME_EN: 'MASHRUFAH',
    CIT_NAME_AR: 'مشروفة',
  },
  {
    CIT_CODE: 3287,
    CIT_NAME_EN: 'LAHMAH',
    CIT_NAME_AR: 'لاهمة',
  },
  {
    CIT_CODE: 1160,
    CIT_NAME_EN: "AL FARI'",
    CIT_NAME_AR: 'الفارع',
  },
  {
    CIT_CODE: 1161,
    CIT_NAME_EN: 'AL KHIDAYD',
    CIT_NAME_AR: 'الخديد',
  },
  {
    CIT_CODE: 1162,
    CIT_NAME_EN: 'AL MAGHAWI',
    CIT_NAME_AR: 'المغاوي',
  },
  {
    CIT_CODE: 1163,
    CIT_NAME_EN: 'AL MAQFA',
    CIT_NAME_AR: 'المقفي',
  },
  {
    CIT_CODE: 1164,
    CIT_NAME_EN: 'AL HATAMIYAH',
    CIT_NAME_AR: 'الحطامية',
  },
  {
    CIT_CODE: 1165,
    CIT_NAME_EN: "KIDWAT AL 'AWAJ",
    CIT_NAME_AR: 'كدوة الأعوج',
  },
  {
    CIT_CODE: 1166,
    CIT_NAME_EN: 'HISHAYMAH',
    CIT_NAME_AR: 'هشيمة',
  },
  {
    CIT_CODE: 1167,
    CIT_NAME_EN: 'KHABT MIZQAH',
    CIT_NAME_AR: 'خبت مزقة',
  },
  {
    CIT_CODE: 1168,
    CIT_NAME_EN: 'AS SABT',
    CIT_NAME_AR: 'السبت',
  },
  {
    CIT_CODE: 1169,
    CIT_NAME_EN: 'AN NILAH',
    CIT_NAME_AR: 'النيلة',
  },
  {
    CIT_CODE: 1170,
    CIT_NAME_EN: 'AL QARN',
    CIT_NAME_AR: 'القرن',
  },
  {
    CIT_CODE: 1171,
    CIT_NAME_EN: 'AL HULAYFAH',
    CIT_NAME_AR: 'الحليفة',
  },
  {
    CIT_CODE: 1172,
    CIT_NAME_EN: 'AL MUSAYLIM',
    CIT_NAME_AR: 'المسيليم',
  },
  {
    CIT_CODE: 1173,
    CIT_NAME_EN: 'ALQORA',
    CIT_NAME_AR: 'القرى',
  },
  {
    CIT_CODE: 1174,
    CIT_NAME_EN: "JUM'AT AT RABIAH",
    CIT_NAME_AR: 'جمعة ربيعة',
  },
  {
    CIT_CODE: 1175,
    CIT_NAME_EN: 'AL FALIQ',
    CIT_NAME_AR: 'الفالق',
  },
  {
    CIT_CODE: 1176,
    CIT_NAME_EN: 'KHAMIS HARB',
    CIT_NAME_AR: 'خميس حرب',
  },
  {
    CIT_CODE: 1177,
    CIT_NAME_EN: 'AL JARD',
    CIT_NAME_AR: 'الجرد',
  },
  {
    CIT_CODE: 1178,
    CIT_NAME_EN: 'AR RAKH',
    CIT_NAME_AR: 'الركح',
  },
  {
    CIT_CODE: 1179,
    CIT_NAME_EN: 'AS SABATAH',
    CIT_NAME_AR: 'السبطة',
  },
  {
    CIT_CODE: 1180,
    CIT_NAME_EN: 'ATH THULUTH',
    CIT_NAME_AR: 'الثلوث',
  },
  {
    CIT_CODE: 1181,
    CIT_NAME_EN: 'ASH SHASARAH',
    CIT_NAME_AR: 'الشصرة',
  },
  {
    CIT_CODE: 1182,
    CIT_NAME_EN: 'AMRAT',
    CIT_NAME_AR: 'عمرات',
  },
  {
    CIT_CODE: 1183,
    CIT_NAME_EN: 'AJAH',
    CIT_NAME_AR: 'عاجة',
  },
  {
    CIT_CODE: 1185,
    CIT_NAME_EN: 'AL KHUMJAN',
    CIT_NAME_AR: 'الخمجان',
  },
  {
    CIT_CODE: 1186,
    CIT_NAME_EN: 'AL KADANAH',
    CIT_NAME_AR: 'الكدنة',
  },
  {
    CIT_CODE: 1187,
    CIT_NAME_EN: 'SHAYNANAH',
    CIT_NAME_AR: 'شينانة',
  },
  {
    CIT_CODE: 1188,
    CIT_NAME_EN: 'AL JILAMAH',
    CIT_NAME_AR: 'الجلمة',
  },
  {
    CIT_CODE: 1189,
    CIT_NAME_EN: 'AS SARH',
    CIT_NAME_AR: 'الصرح',
  },
  {
    CIT_CODE: 1190,
    CIT_NAME_EN: "AS SA'AYB",
    CIT_NAME_AR: 'الصعيب',
  },
  {
    CIT_CODE: 1191,
    CIT_NAME_EN: 'AL QARAYYAH',
    CIT_NAME_AR: 'القرية',
  },
  {
    CIT_CODE: 1192,
    CIT_NAME_EN: 'AL MADHAH',
    CIT_NAME_AR: 'المضحاة',
  },
  {
    CIT_CODE: 1193,
    CIT_NAME_EN: 'AN NIHAYMIYAH',
    CIT_NAME_AR: 'النهيمية',
  },
  {
    CIT_CODE: 1194,
    CIT_NAME_EN: 'AL GHARIF',
    CIT_NAME_AR: 'الغريف',
  },
  {
    CIT_CODE: 1195,
    CIT_NAME_EN: "ASH SHAR'",
    CIT_NAME_AR: 'الشرع',
  },
  {
    CIT_CODE: 1196,
    CIT_NAME_EN: 'AD DUGHMIYAH',
    CIT_NAME_AR: 'الدغمية',
  },
  {
    CIT_CODE: 1197,
    CIT_NAME_EN: 'UMM RAKAH',
    CIT_NAME_AR: 'أم راكة',
  },
  {
    CIT_CODE: 1198,
    CIT_NAME_EN: 'AD DUBAYYILAH',
    CIT_NAME_AR: 'الدبيلة',
  },
  {
    CIT_CODE: 1199,
    CIT_NAME_EN: 'JABBAR',
    CIT_NAME_AR: 'جبار',
  },
  {
    CIT_CODE: 1200,
    CIT_NAME_EN: 'AL HIJIF',
    CIT_NAME_AR: 'الحجف',
  },
  {
    CIT_CODE: 1201,
    CIT_NAME_EN: 'ABU JUMAYDAH',
    CIT_NAME_AR: 'أبو جميدة',
  },
  {
    CIT_CODE: 1202,
    CIT_NAME_EN: 'GHITHAH',
    CIT_NAME_AR: 'غثاة',
  },
  {
    CIT_CODE: 1203,
    CIT_NAME_EN: 'AD DAHYA',
    CIT_NAME_AR: 'الضحياء',
  },
  {
    CIT_CODE: 1204,
    CIT_NAME_EN: 'AT TIRAQ',
    CIT_NAME_AR: 'الطراق',
  },
  {
    CIT_CODE: 1205,
    CIT_NAME_EN: 'AL KHURAYMI',
    CIT_NAME_AR: 'الخريمي',
  },
  {
    CIT_CODE: 1206,
    CIT_NAME_EN: "MAZARI' AD DAWAYYAH",
    CIT_NAME_AR: 'مزارع الدوية',
  },
  {
    CIT_CODE: 1207,
    CIT_NAME_EN: 'AL QARFA',
    CIT_NAME_AR: 'القرفاء',
  },
  {
    CIT_CODE: 1209,
    CIT_NAME_EN: 'MUBARAZ',
    CIT_NAME_AR: 'مبرز',
  },
  {
    CIT_CODE: 1211,
    CIT_NAME_EN: "SIBI'AH",
    CIT_NAME_AR: 'سبيعة',
  },
  {
    CIT_CODE: 1213,
    CIT_NAME_EN: 'AL MIRAKAH',
    CIT_NAME_AR: 'الميركة',
  },
  {
    CIT_CODE: 1214,
    CIT_NAME_EN: 'ASH SHALLALAH',
    CIT_NAME_AR: 'الشلالة',
  },
  {
    CIT_CODE: 1215,
    CIT_NAME_EN: "UMM AL 'AMAYIR",
    CIT_NAME_AR: 'أم العماير',
  },
  {
    CIT_CODE: 1216,
    CIT_NAME_EN: 'MAZARI TAKHAYIL',
    CIT_NAME_AR: 'مزارع تخاييل',
  },
  {
    CIT_CODE: 1217,
    CIT_NAME_EN: "BADAI' IBDAH",
    CIT_NAME_AR: 'بدائع إبضة',
  },
  {
    CIT_CODE: 1218,
    CIT_NAME_EN: 'AL HAWRA',
    CIT_NAME_AR: 'الحورا',
  },
  {
    CIT_CODE: 1219,
    CIT_NAME_EN: 'QARYAH AL BUTAIN',
    CIT_NAME_AR: 'قرية البطين',
  },
  {
    CIT_CODE: 1220,
    CIT_NAME_EN: 'IBDAH',
    CIT_NAME_AR: 'إبضة',
  },
  {
    CIT_CODE: 1221,
    CIT_NAME_EN: 'THIRAL',
    CIT_NAME_AR: 'ثرال',
  },
  {
    CIT_CODE: 1222,
    CIT_NAME_EN: 'ZIKHIN',
    CIT_NAME_AR: 'زيخين',
  },
  {
    CIT_CODE: 1223,
    CIT_NAME_EN: 'AL KHAYT',
    CIT_NAME_AR: 'الخيط',
  },
  {
    CIT_CODE: 1225,
    CIT_NAME_EN: "AL MA'AZIL",
    CIT_NAME_AR: 'المعازل',
  },
  {
    CIT_CODE: 1226,
    CIT_NAME_EN: "AL MADABI'",
    CIT_NAME_AR: 'المضابيع',
  },
  {
    CIT_CODE: 1227,
    CIT_NAME_EN: 'AS SAQIYAH',
    CIT_NAME_AR: 'الساقية',
  },
  {
    CIT_CODE: 1231,
    CIT_NAME_EN: 'RAKK',
    CIT_NAME_AR: 'رك',
  },
  {
    CIT_CODE: 1232,
    CIT_NAME_EN: 'AL FUWAILEQ / AR RISHAWIYAH',
    CIT_NAME_AR: 'الفويلق / الرشاوية',
  },
  {
    CIT_CODE: 1233,
    CIT_NAME_EN: 'AL UBAITIR',
    CIT_NAME_AR: 'الابيتر',
  },
  {
    CIT_CODE: 1234,
    CIT_NAME_EN: 'AL KIHAYFIYAH',
    CIT_NAME_AR: 'الكهيفية',
  },
  {
    CIT_CODE: 1235,
    CIT_NAME_EN: "AL 'UDHAIM",
    CIT_NAME_AR: 'العظيم',
  },
  {
    CIT_CODE: 1236,
    CIT_NAME_EN: 'AL MUQAYSIR',
    CIT_NAME_AR: 'المقيصر',
  },
  {
    CIT_CODE: 1238,
    CIT_NAME_EN: 'AZ ZIRB',
    CIT_NAME_AR: 'الزرب',
  },
  {
    CIT_CODE: 1239,
    CIT_NAME_EN: 'AL LUWAYYAT',
    CIT_NAME_AR: 'اللويات',
  },
  {
    CIT_CODE: 1240,
    CIT_NAME_EN: 'AL URAYQIT',
    CIT_NAME_AR: 'الأريقط',
  },
  {
    CIT_CODE: 1241,
    CIT_NAME_EN: "AL MU'AZILAH",
    CIT_NAME_AR: 'المعيزيلة',
  },
  {
    CIT_CODE: 1242,
    CIT_NAME_EN: 'ASH SHURUFIYAH',
    CIT_NAME_AR: 'الشرفية',
  },
  {
    CIT_CODE: 1244,
    CIT_NAME_EN: 'AD DHALIM',
    CIT_NAME_AR: 'الظليم',
  },
  {
    CIT_CODE: 1245,
    CIT_NAME_EN: 'AL HINU',
    CIT_NAME_AR: 'الحنو',
  },
  {
    CIT_CODE: 1246,
    CIT_NAME_EN: "AL JU'AYRAH",
    CIT_NAME_AR: 'الجعيرة',
  },
  {
    CIT_CODE: 1250,
    CIT_NAME_EN: 'SHUBAYRIM',
    CIT_NAME_AR: 'شبيرم',
  },
  {
    CIT_CODE: 1251,
    CIT_NAME_EN: 'MITYAH',
    CIT_NAME_AR: 'مطية',
  },
  {
    CIT_CODE: 1252,
    CIT_NAME_EN: 'DAFF ZAYNI',
    CIT_NAME_AR: 'دف زيني',
  },
  {
    CIT_CODE: 1253,
    CIT_NAME_EN: 'AN NUWAYDIRAH',
    CIT_NAME_AR: 'النويدرة',
  },
  {
    CIT_CODE: 1255,
    CIT_NAME_EN: 'AL MURSHIDIYAH',
    CIT_NAME_AR: 'المرشدية',
  },
  {
    CIT_CODE: 1256,
    CIT_NAME_EN: 'AD DAWH AL KABIR',
    CIT_NAME_AR: 'الدوح الكبير',
  },
  {
    CIT_CODE: 1258,
    CIT_NAME_EN: "ABU 'URWAH",
    CIT_NAME_AR: 'ابو عروة',
  },
  {
    CIT_CODE: 1259,
    CIT_NAME_EN: 'AL BRABIR',
    CIT_NAME_AR: 'البرابير',
  },
  {
    CIT_CODE: 1260,
    CIT_NAME_EN: 'QARN AS SURUR',
    CIT_NAME_AR: 'قرن السرور',
  },
  {
    CIT_CODE: 1261,
    CIT_NAME_EN: 'AL HAMIMAH',
    CIT_NAME_AR: 'الحميمة',
  },
  {
    CIT_CODE: 1262,
    CIT_NAME_EN: 'HARAT AL JABAL',
    CIT_NAME_AR: 'حرة الجبل',
  },
  {
    CIT_CODE: 1263,
    CIT_NAME_EN: 'SAMD AL HUMAYMAH',
    CIT_NAME_AR: 'سمد الحميمة',
  },
  {
    CIT_CODE: 1264,
    CIT_NAME_EN: 'AL NUZHA',
    CIT_NAME_AR: 'النزهة',
  },
  {
    CIT_CODE: 1266,
    CIT_NAME_EN: 'AL QADHAL',
    CIT_NAME_AR: 'القذال',
  },
  {
    CIT_CODE: 1267,
    CIT_NAME_EN: 'SHAWAHIT',
    CIT_NAME_AR: 'شواحط',
  },
  {
    CIT_CODE: 1268,
    CIT_NAME_EN: 'ADAMAN',
    CIT_NAME_AR: 'عدمن',
  },
  {
    CIT_CODE: 1269,
    CIT_NAME_EN: 'AL MUNAYDHIR',
    CIT_NAME_AR: 'المنيظر',
  },
  {
    CIT_CODE: 1270,
    CIT_NAME_EN: 'MAHABBAH',
    CIT_NAME_AR: 'محبة',
  },
  {
    CIT_CODE: 1271,
    CIT_NAME_EN: 'AL FASILAH',
    CIT_NAME_AR: 'الفصيلة',
  },
  {
    CIT_CODE: 1272,
    CIT_NAME_EN: 'AL MASLAMAH',
    CIT_NAME_AR: 'المسلمة',
  },
  {
    CIT_CODE: 1273,
    CIT_NAME_EN: 'AL KHAWSH',
    CIT_NAME_AR: 'الخوش',
  },
  {
    CIT_CODE: 1274,
    CIT_NAME_EN: 'AL KANABI',
    CIT_NAME_AR: 'الكنبي',
  },
  {
    CIT_CODE: 1275,
    CIT_NAME_EN: 'AL QIWAR',
    CIT_NAME_AR: 'القيوار',
  },
  {
    CIT_CODE: 1276,
    CIT_NAME_EN: "AL QANA'AT",
    CIT_NAME_AR: 'القنعات',
  },
  {
    CIT_CODE: 1277,
    CIT_NAME_EN: 'AL MIFA',
    CIT_NAME_AR: 'الميفاء',
  },
  {
    CIT_CODE: 1278,
    CIT_NAME_EN: "SA'ABAN",
    CIT_NAME_AR: 'صعابان',
  },
  {
    CIT_CODE: 1279,
    CIT_NAME_EN: 'MAKHAF',
    CIT_NAME_AR: 'مكهاف',
  },
  {
    CIT_CODE: 1280,
    CIT_NAME_EN: 'AL MANDHAR',
    CIT_NAME_AR: 'المنظر',
  },
  {
    CIT_CODE: 1281,
    CIT_NAME_EN: "UMM FURA'",
    CIT_NAME_AR: 'أم فرع',
  },
  {
    CIT_CODE: 1282,
    CIT_NAME_EN: 'AL QURAYHAH',
    CIT_NAME_AR: 'القريحة',
  },
  {
    CIT_CODE: 1284,
    CIT_NAME_EN: "UMM SH'BAYN",
    CIT_NAME_AR: 'أم شعبين',
  },
  {
    CIT_CODE: 1286,
    CIT_NAME_EN: 'QUZZAH',
    CIT_NAME_AR: 'قزة',
  },
  {
    CIT_CODE: 1287,
    CIT_NAME_EN: 'SAYALAH',
    CIT_NAME_AR: 'سيالة',
  },
  {
    CIT_CODE: 1288,
    CIT_NAME_EN: 'AL AHSAR',
    CIT_NAME_AR: 'الأحسر',
  },
  {
    CIT_CODE: 1289,
    CIT_NAME_EN: 'AL FADIYAH',
    CIT_NAME_AR: 'الفاضية',
  },
  {
    CIT_CODE: 1290,
    CIT_NAME_EN: "NA'S",
    CIT_NAME_AR: 'نعص',
  },
  {
    CIT_CODE: 1291,
    CIT_NAME_EN: 'AD DAHI',
    CIT_NAME_AR: 'الضحي',
  },
  {
    CIT_CODE: 1292,
    CIT_NAME_EN: "AL HAYD 'ABS",
    CIT_NAME_AR: 'الحيد عبس',
  },
  {
    CIT_CODE: 1293,
    CIT_NAME_EN: 'AT TARAQAH',
    CIT_NAME_AR: 'الطرقة',
  },
  {
    CIT_CODE: 1296,
    CIT_NAME_EN: 'AL AQIQAH',
    CIT_NAME_AR: 'العقيقة',
  },
  {
    CIT_CODE: 1297,
    CIT_NAME_EN: 'BAREK',
    CIT_NAME_AR: 'بارق',
  },
  {
    CIT_CODE: 1298,
    CIT_NAME_EN: 'AL HURAYR ASH SHARQI (AL JAZI)',
    CIT_NAME_AR: 'الهرير الشرقي - الجازي',
  },
  {
    CIT_CODE: 1299,
    CIT_NAME_EN: 'TAYYIB AL ISM',
    CIT_NAME_AR: 'طيب الإسم',
  },
  {
    CIT_CODE: 1300,
    CIT_NAME_EN: "AL 'AMMARAH",
    CIT_NAME_AR: 'العمارة',
  },
  {
    CIT_CODE: 1302,
    CIT_NAME_EN: 'AL MAZARQAH',
    CIT_NAME_AR: 'المزارقة',
  },
  {
    CIT_CODE: 1303,
    CIT_NAME_EN: 'AL GHAYTHAN',
    CIT_NAME_AR: 'آل غيثان',
  },
  {
    CIT_CODE: 1304,
    CIT_NAME_EN: 'AL ASH SHIRAYFI',
    CIT_NAME_AR: 'آل الشريفي',
  },
  {
    CIT_CODE: 1305,
    CIT_NAME_EN: 'AL AT TUM',
    CIT_NAME_AR: 'آل التوم',
  },
  {
    CIT_CODE: 1306,
    CIT_NAME_EN: 'AL SUWAYD',
    CIT_NAME_AR: 'آل سويد',
  },
  {
    CIT_CODE: 1307,
    CIT_NAME_EN: 'AS SIMIDAH',
    CIT_NAME_AR: 'الصمدة',
  },
  {
    CIT_CODE: 1308,
    CIT_NAME_EN: 'AL FAYD',
    CIT_NAME_AR: 'الفيض',
  },
  {
    CIT_CODE: 1309,
    CIT_NAME_EN: 'AL MIRAYYIH',
    CIT_NAME_AR: 'آل مريح',
  },
  {
    CIT_CODE: 1310,
    CIT_NAME_EN: 'SAFWAN',
    CIT_NAME_AR: 'صفوان',
  },
  {
    CIT_CODE: 1311,
    CIT_NAME_EN: 'AR RUNAH',
    CIT_NAME_AR: 'الرونة',
  },
  {
    CIT_CODE: 1312,
    CIT_NAME_EN: 'AL ADH DHIB',
    CIT_NAME_AR: 'آل الذيب',
  },
  {
    CIT_CODE: 1313,
    CIT_NAME_EN: 'RAWDAN',
    CIT_NAME_AR: 'روضان',
  },
  {
    CIT_CODE: 1315,
    CIT_NAME_EN: "HADA'",
    CIT_NAME_AR: 'حداء',
  },
  {
    CIT_CODE: 1316,
    CIT_NAME_EN: 'AL MAQAYTH',
    CIT_NAME_AR: 'المقايث',
  },
  {
    CIT_CODE: 1317,
    CIT_NAME_EN: 'AL QURAINAH / HADAT ASH SHAM',
    CIT_NAME_AR: 'القرينة / هداة الشام',
  },
  {
    CIT_CODE: 1318,
    CIT_NAME_EN: "AL QI'DUBAH",
    CIT_NAME_AR: 'القعضبة',
  },
  {
    CIT_CODE: 1319,
    CIT_NAME_EN: 'AZ ZALLAL',
    CIT_NAME_AR: 'الزلال',
  },
  {
    CIT_CODE: 1320,
    CIT_NAME_EN: 'AR RUWAYGHAG',
    CIT_NAME_AR: 'الرويغة',
  },
  {
    CIT_CODE: 1321,
    CIT_NAME_EN: "AL 'ASB",
    CIT_NAME_AR: 'العصب',
  },
  {
    CIT_CODE: 1323,
    CIT_NAME_EN: "AL MA'LAH",
    CIT_NAME_AR: 'المعلاة',
  },
  {
    CIT_CODE: 1325,
    CIT_NAME_EN: 'AL JAYSHI',
    CIT_NAME_AR: 'الجيشي',
  },
  {
    CIT_CODE: 1326,
    CIT_NAME_EN: 'AZ ZURAYB',
    CIT_NAME_AR: 'الزريب',
  },
  {
    CIT_CODE: 1327,
    CIT_NAME_EN: 'AL BINAYAH',
    CIT_NAME_AR: 'البناية',
  },
  {
    CIT_CODE: 1328,
    CIT_NAME_EN: 'FAYDAH',
    CIT_NAME_AR: 'فيدة',
  },
  {
    CIT_CODE: 1330,
    CIT_NAME_EN: "AL MUQAYTI'",
    CIT_NAME_AR: 'المقيطيع',
  },
  {
    CIT_CODE: 1331,
    CIT_NAME_EN: 'AL MAQAYTAH',
    CIT_NAME_AR: 'المقايتة',
  },
  {
    CIT_CODE: 1332,
    CIT_NAME_EN: 'AL MIQARR',
    CIT_NAME_AR: 'المقر',
  },
  {
    CIT_CODE: 1333,
    CIT_NAME_EN: 'ABU HASANIYAH',
    CIT_NAME_AR: 'ابو حصانية',
  },
  {
    CIT_CODE: 1334,
    CIT_NAME_EN: 'AN NAWARIYAH',
    CIT_NAME_AR: 'النوارية',
  },
  {
    CIT_CODE: 1338,
    CIT_NAME_EN: 'MUSHAJI',
    CIT_NAME_AR: 'مشجي',
  },
  {
    CIT_CODE: 1339,
    CIT_NAME_EN: 'AL KHULASAH',
    CIT_NAME_AR: 'الخلاصة',
  },
  {
    CIT_CODE: 1340,
    CIT_NAME_EN: 'AL QAHAH',
    CIT_NAME_AR: 'القاحة',
  },
  {
    CIT_CODE: 1341,
    CIT_NAME_EN: "AL QA'",
    CIT_NAME_AR: 'القاع',
  },
  {
    CIT_CODE: 1342,
    CIT_NAME_EN: 'ISFAN',
    CIT_NAME_AR: 'عسفان',
  },
  {
    CIT_CODE: 1344,
    CIT_NAME_EN: 'MADRAKAH',
    CIT_NAME_AR: 'مدركة',
  },
  {
    CIT_CODE: 1345,
    CIT_NAME_EN: 'AYN SHAMS',
    CIT_NAME_AR: 'عين شمس',
  },
  {
    CIT_CODE: 1346,
    CIT_NAME_EN: 'AR RAYYAN',
    CIT_NAME_AR: 'الريان',
  },
  {
    CIT_CODE: 1347,
    CIT_NAME_EN: 'JARIR',
    CIT_NAME_AR: 'جرير',
  },
  {
    CIT_CODE: 1348,
    CIT_NAME_EN: 'AL FAIZIYAH',
    CIT_NAME_AR: 'الفائزية',
  },
  {
    CIT_CODE: 1349,
    CIT_NAME_EN: 'AL MASARIR',
    CIT_NAME_AR: 'المصارير',
  },
  {
    CIT_CODE: 1350,
    CIT_NAME_EN: "AN NUWAY'MAH",
    CIT_NAME_AR: 'النويعمة',
  },
  {
    CIT_CODE: 1351,
    CIT_NAME_EN: 'WADI AD DAWASIR',
    CIT_NAME_AR: 'وادي الدواسر',
  },
  {
    CIT_CODE: 1352,
    CIT_NAME_EN: "ABRAQ AN NA 'AM",
    CIT_NAME_AR: 'ابرق النعام',
  },
  {
    CIT_CODE: 1353,
    CIT_NAME_EN: 'KAMDAH',
    CIT_NAME_AR: 'كمدة',
  },
  {
    CIT_CODE: 1354,
    CIT_NAME_EN: 'AL FAW',
    CIT_NAME_AR: 'الفاو',
  },
  {
    CIT_CODE: 1355,
    CIT_NAME_EN: 'HIRJAT AZ ZUFUR',
    CIT_NAME_AR: 'حرجة الزفر',
  },
  {
    CIT_CODE: 1356,
    CIT_NAME_EN: 'HAJLAT AS SUWAD',
    CIT_NAME_AR: 'حجلة السواد',
  },
  {
    CIT_CODE: 1357,
    CIT_NAME_EN: 'AL KAWAKIB',
    CIT_NAME_AR: 'الكواكب',
  },
  {
    CIT_CODE: 1358,
    CIT_NAME_EN: "AD DHALA'ABY",
    CIT_NAME_AR: 'الدلعبي',
  },
  {
    CIT_CODE: 1359,
    CIT_NAME_EN: 'BANI LABIB',
    CIT_NAME_AR: 'بني لبيب',
  },
  {
    CIT_CODE: 1360,
    CIT_NAME_EN: 'KHASHM AL BAZUM',
    CIT_NAME_AR: 'خشم البازوم',
  },
  {
    CIT_CODE: 1362,
    CIT_NAME_EN: 'KHAYRAN',
    CIT_NAME_AR: 'خيران',
  },
  {
    CIT_CODE: 1363,
    CIT_NAME_EN: 'TAMRAH',
    CIT_NAME_AR: 'تمرة',
  },
  {
    CIT_CODE: 1364,
    CIT_NAME_EN: 'HIMAM',
    CIT_NAME_AR: 'حمام',
  },
  {
    CIT_CODE: 1365,
    CIT_NAME_EN: 'RAYDA',
    CIT_NAME_AR: 'ريدا',
  },
  {
    CIT_CODE: 1366,
    CIT_NAME_EN: 'AL WASQAH',
    CIT_NAME_AR: 'الوسقة',
  },
  {
    CIT_CODE: 1367,
    CIT_NAME_EN: 'AL MIDRIJ',
    CIT_NAME_AR: 'المدرج',
  },
  {
    CIT_CODE: 1368,
    CIT_NAME_EN: 'AL HADABAH',
    CIT_NAME_AR: 'الحدبة',
  },
  {
    CIT_CODE: 1369,
    CIT_NAME_EN: 'AL KHASIRAH',
    CIT_NAME_AR: 'الخصرة',
  },
  {
    CIT_CODE: 1370,
    CIT_NAME_EN: 'UWAYYAH',
    CIT_NAME_AR: 'عوية',
  },
  {
    CIT_CODE: 1373,
    CIT_NAME_EN: 'AL HASAHIS',
    CIT_NAME_AR: 'الحصاحص',
  },
  {
    CIT_CODE: 1374,
    CIT_NAME_EN: 'AL MUDIR',
    CIT_NAME_AR: 'المدير',
  },
  {
    CIT_CODE: 1375,
    CIT_NAME_EN: 'DHI RAHJAN',
    CIT_NAME_AR: 'ذي رهجان',
  },
  {
    CIT_CODE: 1376,
    CIT_NAME_EN: 'AL LUGHAYSIM',
    CIT_NAME_AR: 'اللغيسيم',
  },
  {
    CIT_CODE: 1377,
    CIT_NAME_EN: 'AL WAQRAYN',
    CIT_NAME_AR: 'الوقرين',
  },
  {
    CIT_CODE: 1378,
    CIT_NAME_EN: 'AS SUWAMILAH',
    CIT_NAME_AR: 'الصواملة',
  },
  {
    CIT_CODE: 1379,
    CIT_NAME_EN: 'AS SADIYAH',
    CIT_NAME_AR: 'الصدية',
  },
  {
    CIT_CODE: 1380,
    CIT_NAME_EN: "SUQ AL JUM'AH",
    CIT_NAME_AR: 'سوق الجمعة',
  },
  {
    CIT_CODE: 1381,
    CIT_NAME_EN: "MASA'DAH",
    CIT_NAME_AR: 'مسعدة',
  },
  {
    CIT_CODE: 1382,
    CIT_NAME_EN: 'DHAHA',
    CIT_NAME_AR: 'ظهي',
  },
  {
    CIT_CODE: 1383,
    CIT_NAME_EN: 'SALAM AZ ZUWAHIRAH',
    CIT_NAME_AR: 'سلم الزواهرة',
  },
  {
    CIT_CODE: 1384,
    CIT_NAME_EN: 'UMM ASH SHAWK',
    CIT_NAME_AR: 'أم الشوك',
  },
  {
    CIT_CODE: 1385,
    CIT_NAME_EN: 'AL HARIQAH',
    CIT_NAME_AR: 'الحريقة',
  },
  {
    CIT_CODE: 1386,
    CIT_NAME_EN: 'AL HABQAH',
    CIT_NAME_AR: 'الحبقة',
  },
  {
    CIT_CODE: 1387,
    CIT_NAME_EN: 'KARSH',
    CIT_NAME_AR: 'كرش',
  },
  {
    CIT_CODE: 1388,
    CIT_NAME_EN: 'MIFTAH',
    CIT_NAME_AR: 'مفتاح',
  },
  {
    CIT_CODE: 1389,
    CIT_NAME_EN: 'AL KURDUM',
    CIT_NAME_AR: 'الكردم',
  },
  {
    CIT_CODE: 1390,
    CIT_NAME_EN: 'ALLAITH',
    CIT_NAME_AR: 'الليث',
  },
  {
    CIT_CODE: 1391,
    CIT_NAME_EN: 'AL JAIZAH',
    CIT_NAME_AR: 'الجائزة',
  },
  {
    CIT_CODE: 1392,
    CIT_NAME_EN: "QA'IS",
    CIT_NAME_AR: 'قاعس',
  },
  {
    CIT_CODE: 1394,
    CIT_NAME_EN: 'AL MAYTHA',
    CIT_NAME_AR: 'الميثاء',
  },
  {
    CIT_CODE: 1395,
    CIT_NAME_EN: 'AL GHURRAT',
    CIT_NAME_AR: 'الغرات',
  },
  {
    CIT_CODE: 1396,
    CIT_NAME_EN: "SALA'AH",
    CIT_NAME_AR: 'صلعة',
  },
  {
    CIT_CODE: 1397,
    CIT_NAME_EN: "DUBAY'AH",
    CIT_NAME_AR: 'ضبيعة',
  },
  {
    CIT_CODE: 1399,
    CIT_NAME_EN: 'AL HULAY',
    CIT_NAME_AR: 'الحلي',
  },
  {
    CIT_CODE: 1401,
    CIT_NAME_EN: 'AR RUNAYFAH',
    CIT_NAME_AR: 'الرنيفة',
  },
  {
    CIT_CODE: 1402,
    CIT_NAME_EN: 'SUQ AL LUSAFAH',
    CIT_NAME_AR: 'سوق اللصفة',
  },
  {
    CIT_CODE: 1403,
    CIT_NAME_EN: 'UYUN HARRAH',
    CIT_NAME_AR: 'عيون حارة',
  },
  {
    CIT_CODE: 1404,
    CIT_NAME_EN: 'AS SIWAHAH',
    CIT_NAME_AR: 'السوحة',
  },
  {
    CIT_CODE: 1405,
    CIT_NAME_EN: 'RUBU AL AYN',
    CIT_NAME_AR: 'ربوع العين',
  },
  {
    CIT_CODE: 1406,
    CIT_NAME_EN: 'AL MIJAYRIMAH',
    CIT_NAME_AR: 'المجيرمة',
  },
  {
    CIT_CODE: 1407,
    CIT_NAME_EN: "AS SA'DIYAH",
    CIT_NAME_AR: 'السعدية',
  },
  {
    CIT_CODE: 1408,
    CIT_NAME_EN: 'SUQ DHARA',
    CIT_NAME_AR: 'سوق ذرى',
  },
  {
    CIT_CODE: 1409,
    CIT_NAME_EN: "SUQ TARA'A",
    CIT_NAME_AR: 'سوق ترعا',
  },
  {
    CIT_CODE: 1410,
    CIT_NAME_EN: 'AR RAFUGH',
    CIT_NAME_AR: 'الرفغ',
  },
  {
    CIT_CODE: 1411,
    CIT_NAME_EN: 'QARADAH',
    CIT_NAME_AR: 'قرضة',
  },
  {
    CIT_CODE: 1412,
    CIT_NAME_EN: 'AL BARID',
    CIT_NAME_AR: 'البرد',
  },
  {
    CIT_CODE: 1413,
    CIT_NAME_EN: 'SUQ BANI YAZID',
    CIT_NAME_AR: 'سوق بني يزيد',
  },
  {
    CIT_CODE: 1414,
    CIT_NAME_EN: 'HAQAL',
    CIT_NAME_AR: 'حقال',
  },
  {
    CIT_CODE: 1415,
    CIT_NAME_EN: "AS SA'I",
    CIT_NAME_AR: 'الساعي',
  },
  {
    CIT_CODE: 1416,
    CIT_NAME_EN: 'DHANABA',
    CIT_NAME_AR: 'ذنباء',
  },
  {
    CIT_CODE: 1417,
    CIT_NAME_EN: 'AL MAQSABAH',
    CIT_NAME_AR: 'المقسبة',
  },
  {
    CIT_CODE: 1418,
    CIT_NAME_EN: 'SHARAQIB',
    CIT_NAME_AR: 'شراقب',
  },
  {
    CIT_CODE: 1419,
    CIT_NAME_EN: 'SHAYBAY',
    CIT_NAME_AR: 'شيباي',
  },
  {
    CIT_CODE: 1420,
    CIT_NAME_EN: 'QUFAYLAN',
    CIT_NAME_AR: 'قفيلان',
  },
  {
    CIT_CODE: 1421,
    CIT_NAME_EN: 'AS SALIF',
    CIT_NAME_AR: 'الصالف',
  },
  {
    CIT_CODE: 1422,
    CIT_NAME_EN: 'SABAH',
    CIT_NAME_AR: 'صبح',
  },
  {
    CIT_CODE: 1423,
    CIT_NAME_EN: 'AL GHALLAH',
    CIT_NAME_AR: 'الغالة',
  },
  {
    CIT_CODE: 1424,
    CIT_NAME_EN: 'GHUMAYQAH',
    CIT_NAME_AR: 'غميقة',
  },
  {
    CIT_CODE: 1425,
    CIT_NAME_EN: 'AL HUJRAH',
    CIT_NAME_AR: 'الحجرة',
  },
  {
    CIT_CODE: 1426,
    CIT_NAME_EN: 'LAMLAM',
    CIT_NAME_AR: 'لملم',
  },
  {
    CIT_CODE: 1427,
    CIT_NAME_EN: 'AL JARIN',
    CIT_NAME_AR: 'الجرين',
  },
  {
    CIT_CODE: 1428,
    CIT_NAME_EN: 'AL SHAQQAH (AS SHWAH)',
    CIT_NAME_AR: 'الشاقة / الصهوة',
  },
  {
    CIT_CODE: 1429,
    CIT_NAME_EN: 'AS SAFAH',
    CIT_NAME_AR: 'السفح',
  },
  {
    CIT_CODE: 1430,
    CIT_NAME_EN: 'HAZM MIFTAH',
    CIT_NAME_AR: 'حزم مفتاح',
  },
  {
    CIT_CODE: 1431,
    CIT_NAME_EN: 'JASH',
    CIT_NAME_AR: 'جاش',
  },
  {
    CIT_CODE: 1432,
    CIT_NAME_EN: 'RUDAT JASH',
    CIT_NAME_AR: 'روضة جاش',
  },
  {
    CIT_CODE: 1433,
    CIT_NAME_EN: 'AL HARFAYN',
    CIT_NAME_AR: 'الحرفين',
  },
  {
    CIT_CODE: 1434,
    CIT_NAME_EN: "LA'IS",
    CIT_NAME_AR: 'لاعس',
  },
  {
    CIT_CODE: 1436,
    CIT_NAME_EN: 'AD DIRAYB',
    CIT_NAME_AR: 'الدريب',
  },
  {
    CIT_CODE: 1437,
    CIT_NAME_EN: "AL JAZI'",
    CIT_NAME_AR: 'الجازع',
  },
  {
    CIT_CODE: 1438,
    CIT_NAME_EN: 'AL FAKHRIYAH',
    CIT_NAME_AR: 'الفاخرية',
  },
  {
    CIT_CODE: 1439,
    CIT_NAME_EN: 'KUTNAH',
    CIT_NAME_AR: 'كتنة',
  },
  {
    CIT_CODE: 1440,
    CIT_NAME_EN: 'AL JAZIRAH',
    CIT_NAME_AR: 'الجزيرة',
  },
  {
    CIT_CODE: 1444,
    CIT_NAME_EN: 'AL SUWAYDAN',
    CIT_NAME_AR: 'ال سويدان',
  },
  {
    CIT_CODE: 1445,
    CIT_NAME_EN: 'AL AYFAN',
    CIT_NAME_AR: 'ال عيفان',
  },
  {
    CIT_CODE: 1446,
    CIT_NAME_EN: 'AL KHUMAYSAH',
    CIT_NAME_AR: 'ال خميسة',
  },
  {
    CIT_CODE: 1447,
    CIT_NAME_EN: 'AL QIRAH',
    CIT_NAME_AR: 'القيرة',
  },
  {
    CIT_CODE: 1448,
    CIT_NAME_EN: 'AL HAMADAH',
    CIT_NAME_AR: 'الحمضة',
  },
  {
    CIT_CODE: 1449,
    CIT_NAME_EN: 'AZ ZURQ',
    CIT_NAME_AR: 'الزرق',
  },
  {
    CIT_CODE: 1450,
    CIT_NAME_EN: 'HABIYAH',
    CIT_NAME_AR: 'حبية',
  },
  {
    CIT_CODE: 1451,
    CIT_NAME_EN: 'RUGHWAN',
    CIT_NAME_AR: 'رغوان',
  },
  {
    CIT_CODE: 1453,
    CIT_NAME_EN: 'AL AMWAH',
    CIT_NAME_AR: 'الامواه',
  },
  {
    CIT_CODE: 1454,
    CIT_NAME_EN: 'AS SUBAYKHAH',
    CIT_NAME_AR: 'الصبيخة',
  },
  {
    CIT_CODE: 1455,
    CIT_NAME_EN: 'AL ISHTA',
    CIT_NAME_AR: 'الإشتاء',
  },
  {
    CIT_CODE: 1456,
    CIT_NAME_EN: 'AL MAKATIM',
    CIT_NAME_AR: 'المكاتيم',
  },
  {
    CIT_CODE: 1457,
    CIT_NAME_EN: 'AL HUKMAN',
    CIT_NAME_AR: 'الحكمان',
  },
  {
    CIT_CODE: 1458,
    CIT_NAME_EN: 'AL KALIBAH',
    CIT_NAME_AR: 'الكلبة',
  },
  {
    CIT_CODE: 1459,
    CIT_NAME_EN: 'ATH THARAWIN',
    CIT_NAME_AR: 'الثراوين',
  },
  {
    CIT_CODE: 1460,
    CIT_NAME_EN: 'QURAYSH AL HASAN',
    CIT_NAME_AR: 'قريش الحسن',
  },
  {
    CIT_CODE: 1461,
    CIT_NAME_EN: "AD DUBAY'AT",
    CIT_NAME_AR: 'الضبيعات',
  },
  {
    CIT_CODE: 1462,
    CIT_NAME_EN: 'WADI BATHAN',
    CIT_NAME_AR: 'وادي بطحان',
  },
  {
    CIT_CODE: 1463,
    CIT_NAME_EN: 'AL KARADISAH',
    CIT_NAME_AR: 'الكرادسة',
  },
  {
    CIT_CODE: 1464,
    CIT_NAME_EN: "SABIHAH AL 'ULYA",
    CIT_NAME_AR: 'سبيحة العليا',
  },
  {
    CIT_CODE: 1466,
    CIT_NAME_EN: 'AL ATAWLAH',
    CIT_NAME_AR: 'الاطاولة',
  },
  {
    CIT_CODE: 1467,
    CIT_NAME_EN: 'BAYDAH',
    CIT_NAME_AR: 'بيدة',
  },
  {
    CIT_CODE: 1468,
    CIT_NAME_EN: 'AL QISAMAH',
    CIT_NAME_AR: 'القسمة',
  },
  {
    CIT_CODE: 1469,
    CIT_NAME_EN: 'NIKHAL',
    CIT_NAME_AR: 'نخال',
  },
  {
    CIT_CODE: 1470,
    CIT_NAME_EN: 'AL KHALIJ',
    CIT_NAME_AR: 'الخليج',
  },
  {
    CIT_CODE: 1471,
    CIT_NAME_EN: 'AS SABIHI',
    CIT_NAME_AR: 'الصبيحي',
  },
  {
    CIT_CODE: 1472,
    CIT_NAME_EN: 'AL MADRA',
    CIT_NAME_AR: 'المدراء',
  },
  {
    CIT_CODE: 1473,
    CIT_NAME_EN: 'AL BAQIRAH',
    CIT_NAME_AR: 'الباقرة',
  },
  {
    CIT_CODE: 1474,
    CIT_NAME_EN: 'NAMRAN',
    CIT_NAME_AR: 'نمران',
  },
  {
    CIT_CODE: 1475,
    CIT_NAME_EN: 'SHUDAYQ',
    CIT_NAME_AR: 'شديق',
  },
  {
    CIT_CODE: 1476,
    CIT_NAME_EN: 'AL HARF',
    CIT_NAME_AR: 'الحرف',
  },
  {
    CIT_CODE: 1477,
    CIT_NAME_EN: "AL 'ATF",
    CIT_NAME_AR: 'العطف',
  },
  {
    CIT_CODE: 1478,
    CIT_NAME_EN: 'AD DUHU',
    CIT_NAME_AR: 'الدحو',
  },
  {
    CIT_CODE: 1479,
    CIT_NAME_EN: 'AL HURAYRAH',
    CIT_NAME_AR: 'الحريرة',
  },
  {
    CIT_CODE: 1480,
    CIT_NAME_EN: 'ASH SHAQIQAH',
    CIT_NAME_AR: 'الشقيقة',
  },
  {
    CIT_CODE: 1481,
    CIT_NAME_EN: "AN NAQI'",
    CIT_NAME_AR: 'النقيع',
  },
  {
    CIT_CODE: 1483,
    CIT_NAME_EN: 'AL JUNAYNAH',
    CIT_NAME_AR: 'الجنينة',
  },
  {
    CIT_CODE: 1485,
    CIT_NAME_EN: 'UMM AL FURUGH',
    CIT_NAME_AR: 'ام الفروغ',
  },
  {
    CIT_CODE: 1486,
    CIT_NAME_EN: 'AQILIYAH',
    CIT_NAME_AR: 'عقيلية',
  },
  {
    CIT_CODE: 1487,
    CIT_NAME_EN: 'BAYNAH',
    CIT_NAME_AR: 'بينة',
  },
  {
    CIT_CODE: 1488,
    CIT_NAME_EN: 'ARMAN',
    CIT_NAME_AR: 'عرمان',
  },
  {
    CIT_CODE: 1489,
    CIT_NAME_EN: 'AL QADIHY',
    CIT_NAME_AR: 'القديحى',
  },
  {
    CIT_CODE: 1490,
    CIT_NAME_EN: "WA'IR",
    CIT_NAME_AR: 'واعر',
  },
  {
    CIT_CODE: 1491,
    CIT_NAME_EN: 'ASH SHATT',
    CIT_NAME_AR: 'الشط',
  },
  {
    CIT_CODE: 1492,
    CIT_NAME_EN: 'AL MARWAH',
    CIT_NAME_AR: 'المروة',
  },
  {
    CIT_CODE: 1493,
    CIT_NAME_EN: 'AL MAHAMIL',
    CIT_NAME_AR: 'المهامل',
  },
  {
    CIT_CODE: 1495,
    CIT_NAME_EN: 'AL HIFAH',
    CIT_NAME_AR: 'الحيفة',
  },
  {
    CIT_CODE: 1496,
    CIT_NAME_EN: 'MUHR',
    CIT_NAME_AR: 'مهر',
  },
  {
    CIT_CODE: 1497,
    CIT_NAME_EN: 'AL BAHIM',
    CIT_NAME_AR: 'البهيم',
  },
  {
    CIT_CODE: 1498,
    CIT_NAME_EN: 'AL GHAFRAT',
    CIT_NAME_AR: 'الغفرات',
  },
  {
    CIT_CODE: 1499,
    CIT_NAME_EN: "AL MA'DIN",
    CIT_NAME_AR: 'المعدن',
  },
  {
    CIT_CODE: 1501,
    CIT_NAME_EN: 'BADIYAH',
    CIT_NAME_AR: 'بادية',
  },
  {
    CIT_CODE: 1504,
    CIT_NAME_EN: 'MUJAHHIM',
    CIT_NAME_AR: 'مجحم',
  },
  {
    CIT_CODE: 1505,
    CIT_NAME_EN: 'AL HAJUN',
    CIT_NAME_AR: 'الحجون',
  },
  {
    CIT_CODE: 1506,
    CIT_NAME_EN: 'SAMAKH',
    CIT_NAME_AR: 'صمخ',
  },
  {
    CIT_CODE: 1508,
    CIT_NAME_EN: 'ATH THINIYAH',
    CIT_NAME_AR: 'الثنية',
  },
  {
    CIT_CODE: 1509,
    CIT_NAME_EN: 'AL QAWZIYAH',
    CIT_NAME_AR: 'القوزية',
  },
  {
    CIT_CODE: 1510,
    CIT_NAME_EN: 'AL QAWBA',
    CIT_NAME_AR: 'القوباء',
  },
  {
    CIT_CODE: 1511,
    CIT_NAME_EN: 'QUTBAH',
    CIT_NAME_AR: 'قطبة',
  },
  {
    CIT_CODE: 1512,
    CIT_NAME_EN: 'DAFIR KHARSHAN',
    CIT_NAME_AR: 'دفرخرشان',
  },
  {
    CIT_CODE: 1513,
    CIT_NAME_EN: 'JALLAL',
    CIT_NAME_AR: 'جلال',
  },
  {
    CIT_CODE: 1515,
    CIT_NAME_EN: 'AD DAILAMI',
    CIT_NAME_AR: 'الديلمي',
  },
  {
    CIT_CODE: 1516,
    CIT_NAME_EN: "AR RUQAITA'",
    CIT_NAME_AR: 'الرقيطاء',
  },
  {
    CIT_CODE: 1517,
    CIT_NAME_EN: 'TABALAH',
    CIT_NAME_AR: 'تبالة',
  },
  {
    CIT_CODE: 1518,
    CIT_NAME_EN: 'AL HAZMI',
    CIT_NAME_AR: 'الحازمي',
  },
  {
    CIT_CODE: 1520,
    CIT_NAME_EN: 'AL HADABAH',
    CIT_NAME_AR: 'الهضبة',
  },
  {
    CIT_CODE: 1521,
    CIT_NAME_EN: 'AL ABNA',
    CIT_NAME_AR: 'الأبناء',
  },
  {
    CIT_CODE: 1522,
    CIT_NAME_EN: 'BANI JARRAH',
    CIT_NAME_AR: 'بني جرة',
  },
  {
    CIT_CODE: 1523,
    CIT_NAME_EN: 'AL MARZUQ',
    CIT_NAME_AR: 'آل مرزوق',
  },
  {
    CIT_CODE: 1524,
    CIT_NAME_EN: 'AL HIMAYD',
    CIT_NAME_AR: 'آل حميد',
  },
  {
    CIT_CODE: 1525,
    CIT_NAME_EN: 'JABR',
    CIT_NAME_AR: 'جبر',
  },
  {
    CIT_CODE: 1526,
    CIT_NAME_EN: 'HAWALAH',
    CIT_NAME_AR: 'حوالة',
  },
  {
    CIT_CODE: 1527,
    CIT_NAME_EN: 'AL AZAHIRAH',
    CIT_NAME_AR: 'الأزاهرة',
  },
  {
    CIT_CODE: 1528,
    CIT_NAME_EN: 'DAR AS SUQ',
    CIT_NAME_AR: 'دارالسوق',
  },
  {
    CIT_CODE: 1529,
    CIT_NAME_EN: 'BANI KABIR',
    CIT_NAME_AR: 'بني كبير',
  },
  {
    CIT_CODE: 1530,
    CIT_NAME_EN: 'AL HUMRAN',
    CIT_NAME_AR: 'الحمران',
  },
  {
    CIT_CODE: 1531,
    CIT_NAME_EN: 'BLGRSHY',
    CIT_NAME_AR: 'بلجرشي',
  },
  {
    CIT_CODE: 1533,
    CIT_NAME_EN: 'BAL SHAHAM',
    CIT_NAME_AR: 'بالشهم',
  },
  {
    CIT_CODE: 1534,
    CIT_NAME_EN: 'BADIYAT BANI KABIR',
    CIT_NAME_AR: 'بادية بني كبير',
  },
  {
    CIT_CODE: 1535,
    CIT_NAME_EN: "BAL'ALA",
    CIT_NAME_AR: 'بلعلاء',
  },
  {
    CIT_CODE: 1536,
    CIT_NAME_EN: "AL 'UFUS",
    CIT_NAME_AR: 'العفوص',
  },
  {
    CIT_CODE: 1537,
    CIT_NAME_EN: 'KHIRAH',
    CIT_NAME_AR: 'خيرة',
  },
  {
    CIT_CODE: 1538,
    CIT_NAME_EN: 'QARN DHABI',
    CIT_NAME_AR: 'قرن ظبي',
  },
  {
    CIT_CODE: 1539,
    CIT_NAME_EN: 'SHIBRIQAH',
    CIT_NAME_AR: 'شبرقة',
  },
  {
    CIT_CODE: 1540,
    CIT_NAME_EN: 'AL GHASHAMRAH',
    CIT_NAME_AR: 'الغشامرة',
  },
  {
    CIT_CODE: 1541,
    CIT_NAME_EN: "AL 'ABBAS",
    CIT_NAME_AR: 'العباس',
  },
  {
    CIT_CODE: 1543,
    CIT_NAME_EN: 'RAGHDAN',
    CIT_NAME_AR: 'رغدان',
  },
  {
    CIT_CODE: 1544,
    CIT_NAME_EN: 'ADH DHAFIR',
    CIT_NAME_AR: 'الظفير',
  },
  {
    CIT_CODE: 1545,
    CIT_NAME_EN: 'BANI HASAN',
    CIT_NAME_AR: 'بني حسن',
  },
  {
    CIT_CODE: 1546,
    CIT_NAME_EN: 'BAYDAN',
    CIT_NAME_AR: 'بيضان',
  },
  {
    CIT_CODE: 1547,
    CIT_NAME_EN: 'AS SAGHRAH',
    CIT_NAME_AR: 'الصغرة',
  },
  {
    CIT_CODE: 1548,
    CIT_NAME_EN: 'BANI DHABYAN',
    CIT_NAME_AR: 'بني ظبيان',
  },
  {
    CIT_CODE: 1549,
    CIT_NAME_EN: 'ASH SHAQIQ',
    CIT_NAME_AR: 'الشقيق',
  },
  {
    CIT_CODE: 1550,
    CIT_NAME_EN: 'AL BADHDHADHAH',
    CIT_NAME_AR: 'البظاظة',
  },
  {
    CIT_CODE: 1552,
    CIT_NAME_EN: 'AL YAZID',
    CIT_NAME_AR: 'آل يزيد',
  },
  {
    CIT_CODE: 1555,
    CIT_NAME_EN: 'AL BALAS',
    CIT_NAME_AR: 'البلس',
  },
  {
    CIT_CODE: 1556,
    CIT_NAME_EN: "AL 'IDHAH",
    CIT_NAME_AR: 'العظة',
  },
  {
    CIT_CODE: 1557,
    CIT_NAME_EN: 'AS SARF',
    CIT_NAME_AR: 'الصرف',
  },
  {
    CIT_CODE: 1558,
    CIT_NAME_EN: 'THAMMA',
    CIT_NAME_AR: 'ثما',
  },
  {
    CIT_CODE: 1559,
    CIT_NAME_EN: "AL 'ASIRAH",
    CIT_NAME_AR: 'العاسرة',
  },
  {
    CIT_CODE: 1560,
    CIT_NAME_EN: 'HIJAB',
    CIT_NAME_AR: 'حجاب',
  },
  {
    CIT_CODE: 1561,
    CIT_NAME_EN: 'AL HUSANAH',
    CIT_NAME_AR: 'الحصنة',
  },
  {
    CIT_CODE: 1562,
    CIT_NAME_EN: 'AL AZ ZARIYAH',
    CIT_NAME_AR: 'آل الزارية',
  },
  {
    CIT_CODE: 1563,
    CIT_NAME_EN: 'AL HASBA',
    CIT_NAME_AR: 'الحصباء',
  },
  {
    CIT_CODE: 1564,
    CIT_NAME_EN: 'AL SALAMAH',
    CIT_NAME_AR: 'آل سلمة',
  },
  {
    CIT_CODE: 1565,
    CIT_NAME_EN: 'AL ASH SHAYKH',
    CIT_NAME_AR: 'ال الشيخ',
  },
  {
    CIT_CODE: 1566,
    CIT_NAME_EN: 'AL BASHAIR',
    CIT_NAME_AR: 'البشائر',
  },
  {
    CIT_CODE: 1568,
    CIT_NAME_EN: "ABU 'ALI",
    CIT_NAME_AR: 'أبو علي',
  },
  {
    CIT_CODE: 1569,
    CIT_NAME_EN: "AL 'AMUDIYAH",
    CIT_NAME_AR: 'العمودية',
  },
  {
    CIT_CODE: 1570,
    CIT_NAME_EN: 'QARN BIN SAHIR',
    CIT_NAME_AR: 'قرن بن ساهر',
  },
  {
    CIT_CODE: 1571,
    CIT_NAME_EN: "THULUTH 'IMARAH",
    CIT_NAME_AR: 'ثلوث عمارة',
  },
  {
    CIT_CODE: 1572,
    CIT_NAME_EN: 'HARF MIBRAH',
    CIT_NAME_AR: 'حرف مبرة',
  },
  {
    CIT_CODE: 1573,
    CIT_NAME_EN: 'AL FAYIJAH',
    CIT_NAME_AR: 'الفايجة',
  },
  {
    CIT_CODE: 1575,
    CIT_NAME_EN: 'NAKHUSAH',
    CIT_NAME_AR: 'ناخسة',
  },
  {
    CIT_CODE: 1576,
    CIT_NAME_EN: 'NUMARAH',
    CIT_NAME_AR: 'نمرة',
  },
  {
    CIT_CODE: 1577,
    CIT_NAME_EN: "AL QAZA'AH",
    CIT_NAME_AR: 'القزعة',
  },
  {
    CIT_CODE: 1579,
    CIT_NAME_EN: "AL MU'AQAS",
    CIT_NAME_AR: 'المعقص',
  },
  {
    CIT_CODE: 1581,
    CIT_NAME_EN: 'AS SUFAY',
    CIT_NAME_AR: 'الصفي',
  },
  {
    CIT_CODE: 1582,
    CIT_NAME_EN: 'ASH SHAGHAZ',
    CIT_NAME_AR: 'الشغز',
  },
  {
    CIT_CODE: 1583,
    CIT_NAME_EN: 'AL QADAB',
    CIT_NAME_AR: 'القضب',
  },
  {
    CIT_CODE: 1584,
    CIT_NAME_EN: "AL 'AJALIN",
    CIT_NAME_AR: 'العجالين',
  },
  {
    CIT_CODE: 1586,
    CIT_NAME_EN: 'AS SULB',
    CIT_NAME_AR: 'الصلب',
  },
  {
    CIT_CODE: 1587,
    CIT_NAME_EN: 'AL FARIQ',
    CIT_NAME_AR: 'الفريق',
  },
  {
    CIT_CODE: 1588,
    CIT_NAME_EN: 'AS SALAMAH',
    CIT_NAME_AR: 'السلامة',
  },
  {
    CIT_CODE: 1589,
    CIT_NAME_EN: 'AS SAHWAH',
    CIT_NAME_AR: 'الصهوة',
  },
  {
    CIT_CODE: 1590,
    CIT_NAME_EN: 'UNAYKIR',
    CIT_NAME_AR: 'عنيكر',
  },
  {
    CIT_CODE: 1591,
    CIT_NAME_EN: 'AL KIDSAH',
    CIT_NAME_AR: 'الكدسة',
  },
  {
    CIT_CODE: 1592,
    CIT_NAME_EN: 'AJLAN',
    CIT_NAME_AR: 'عجلان',
  },
  {
    CIT_CODE: 1593,
    CIT_NAME_EN: 'AL QUHMAN',
    CIT_NAME_AR: 'القحمان',
  },
  {
    CIT_CODE: 1594,
    CIT_NAME_EN: "AL 'ARJA",
    CIT_NAME_AR: 'العرجاء',
  },
  {
    CIT_CODE: 1595,
    CIT_NAME_EN: 'AL BURAYM',
    CIT_NAME_AR: 'البريم',
  },
  {
    CIT_CODE: 1596,
    CIT_NAME_EN: 'AL FARSHAH',
    CIT_NAME_AR: 'الفرشة',
  },
  {
    CIT_CODE: 1597,
    CIT_NAME_EN: "AZ ZA'ATIRAH",
    CIT_NAME_AR: 'الزعاترة',
  },
  {
    CIT_CODE: 1598,
    CIT_NAME_EN: "AL 'AMAYIR",
    CIT_NAME_AR: 'العماير',
  },
  {
    CIT_CODE: 1599,
    CIT_NAME_EN: 'AS SAMRAH',
    CIT_NAME_AR: 'السمرة',
  },
  {
    CIT_CODE: 1600,
    CIT_NAME_EN: "SHA'IB SAMIR",
    CIT_NAME_AR: 'شعب سامر',
  },
  {
    CIT_CODE: 1601,
    CIT_NAME_EN: 'AS SADAH',
    CIT_NAME_AR: 'السادة',
  },
  {
    CIT_CODE: 1602,
    CIT_NAME_EN: 'AL QAHB',
    CIT_NAME_AR: 'القحب',
  },
  {
    CIT_CODE: 1603,
    CIT_NAME_EN: 'BALLAQAH',
    CIT_NAME_AR: 'بلاقة',
  },
  {
    CIT_CODE: 1604,
    CIT_NAME_EN: 'ZUBAYD',
    CIT_NAME_AR: 'زبيد',
  },
  {
    CIT_CODE: 1605,
    CIT_NAME_EN: 'MAKHSHUSH',
    CIT_NAME_AR: 'مخشوش',
  },
  {
    CIT_CODE: 1606,
    CIT_NAME_EN: "AL 'AYNAH",
    CIT_NAME_AR: 'العينة',
  },
  {
    CIT_CODE: 1607,
    CIT_NAME_EN: 'KHABT AS SABT',
    CIT_NAME_AR: 'خبت السبت',
  },
  {
    CIT_CODE: 1608,
    CIT_NAME_EN: 'AL FAHIMAH',
    CIT_NAME_AR: 'الفاهمة',
  },
  {
    CIT_CODE: 1609,
    CIT_NAME_EN: 'THURAYBAN',
    CIT_NAME_AR: 'ثريبان',
  },
  {
    CIT_CODE: 1610,
    CIT_NAME_EN: 'AL MABNA',
    CIT_NAME_AR: 'المبنى',
  },
  {
    CIT_CODE: 1612,
    CIT_NAME_EN: 'AL HUDHAYFAH',
    CIT_NAME_AR: 'الحذيفة',
  },
  {
    CIT_CODE: 1613,
    CIT_NAME_EN: 'NAKHIS',
    CIT_NAME_AR: 'ناخس',
  },
  {
    CIT_CODE: 1614,
    CIT_NAME_EN: 'AZ ZUBAYRI',
    CIT_NAME_AR: 'الزبيري',
  },
  {
    CIT_CODE: 1616,
    CIT_NAME_EN: 'AS SIRR',
    CIT_NAME_AR: 'السر',
  },
  {
    CIT_CODE: 1617,
    CIT_NAME_EN: "AL 'AMIR",
    CIT_NAME_AR: 'آل عامر',
  },
  {
    CIT_CODE: 1618,
    CIT_NAME_EN: "AN NUBAY'AH",
    CIT_NAME_AR: 'النبيعة',
  },
  {
    CIT_CODE: 1619,
    CIT_NAME_EN: 'AL HARSH',
    CIT_NAME_AR: 'الحرش',
  },
  {
    CIT_CODE: 1621,
    CIT_NAME_EN: 'AS SUDARAH',
    CIT_NAME_AR: 'الصدرة',
  },
  {
    CIT_CODE: 1622,
    CIT_NAME_EN: 'AL HADDARAH',
    CIT_NAME_AR: 'الهدارة',
  },
  {
    CIT_CODE: 1623,
    CIT_NAME_EN: 'ASH SHARA',
    CIT_NAME_AR: 'الشرى',
  },
  {
    CIT_CODE: 1624,
    CIT_NAME_EN: 'AL ANAFAH',
    CIT_NAME_AR: 'الأنفة',
  },
  {
    CIT_CODE: 1626,
    CIT_NAME_EN: 'BLKARN',
    CIT_NAME_AR: 'بلقرن',
  },
  {
    CIT_CODE: 1629,
    CIT_NAME_EN: 'KIYAD',
    CIT_NAME_AR: 'كياد',
  },
  {
    CIT_CODE: 1630,
    CIT_NAME_EN: 'AS SUFFAH',
    CIT_NAME_AR: 'الصفة',
  },
  {
    CIT_CODE: 1631,
    CIT_NAME_EN: 'AL MUDHAYLIF',
    CIT_NAME_AR: 'المظيلف',
  },
  {
    CIT_CODE: 1632,
    CIT_NAME_EN: 'AL HABIL',
    CIT_NAME_AR: 'الحبيل',
  },
  {
    CIT_CODE: 1635,
    CIT_NAME_EN: "MA'SHUQAH",
    CIT_NAME_AR: 'معشوقة',
  },
  {
    CIT_CODE: 1637,
    CIT_NAME_EN: 'SABT SHUMRAN',
    CIT_NAME_AR: 'سبت شمران',
  },
  {
    CIT_CODE: 1638,
    CIT_NAME_EN: 'AHD BANI ZAYD',
    CIT_NAME_AR: 'احد بني زيد',
  },
  {
    CIT_CODE: 1639,
    CIT_NAME_EN: 'SABT AL JARAH',
    CIT_NAME_AR: 'سبت الجارة',
  },
  {
    CIT_CODE: 1640,
    CIT_NAME_EN: 'QUDRAYN',
    CIT_NAME_AR: 'قدرين',
  },
  {
    CIT_CODE: 1641,
    CIT_NAME_EN: 'AL SUFYAN',
    CIT_NAME_AR: 'آل سفيان',
  },
  {
    CIT_CODE: 1642,
    CIT_NAME_EN: 'AL BADLAH',
    CIT_NAME_AR: 'البدلة',
  },
  {
    CIT_CODE: 1643,
    CIT_NAME_EN: 'MAMLAH',
    CIT_NAME_AR: 'مملح',
  },
  {
    CIT_CODE: 1644,
    CIT_NAME_EN: 'AL JAWDAH',
    CIT_NAME_AR: 'آل جودة',
  },
  {
    CIT_CODE: 1645,
    CIT_NAME_EN: 'BANI ZUHAYR',
    CIT_NAME_AR: 'بني زهير',
  },
  {
    CIT_CODE: 1647,
    CIT_NAME_EN: 'AL ITHIBAH',
    CIT_NAME_AR: 'آل إثيبة',
  },
  {
    CIT_CODE: 1648,
    CIT_NAME_EN: 'TALA',
    CIT_NAME_AR: 'تلاء',
  },
  {
    CIT_CODE: 1649,
    CIT_NAME_EN: 'AL QAYSAH',
    CIT_NAME_AR: 'القيسة',
  },
  {
    CIT_CODE: 1650,
    CIT_NAME_EN: 'AL FARIS',
    CIT_NAME_AR: 'آل فارس',
  },
  {
    CIT_CODE: 1651,
    CIT_NAME_EN: 'ADH DHAFRA',
    CIT_NAME_AR: 'الذفراء',
  },
  {
    CIT_CODE: 1652,
    CIT_NAME_EN: 'BATHAH',
    CIT_NAME_AR: 'بطحة',
  },
  {
    CIT_CODE: 1653,
    CIT_NAME_EN: 'BANI QAYS',
    CIT_NAME_AR: 'بني قيس',
  },
  {
    CIT_CODE: 1654,
    CIT_NAME_EN: 'AL QADWA',
    CIT_NAME_AR: 'القضوى',
  },
  {
    CIT_CODE: 1655,
    CIT_NAME_EN: 'AL HUMAYYITAH',
    CIT_NAME_AR: 'الحميطة',
  },
  {
    CIT_CODE: 1656,
    CIT_NAME_EN: 'AR RASHDA',
    CIT_NAME_AR: 'الرشداء',
  },
  {
    CIT_CODE: 1657,
    CIT_NAME_EN: 'LABWAH',
    CIT_NAME_AR: 'لبوة',
  },
  {
    CIT_CODE: 1658,
    CIT_NAME_EN: 'AL HIDAYNAN',
    CIT_NAME_AR: 'آل حضينان',
  },
  {
    CIT_CODE: 1659,
    CIT_NAME_EN: 'AL MUJRA',
    CIT_NAME_AR: 'المجرا',
  },
  {
    CIT_CODE: 1660,
    CIT_NAME_EN: 'AL KHARB',
    CIT_NAME_AR: 'الخرب',
  },
  {
    CIT_CODE: 1661,
    CIT_NAME_EN: 'AL SAQR',
    CIT_NAME_AR: 'آل صقر',
  },
  {
    CIT_CODE: 1663,
    CIT_NAME_EN: "TI'MAH",
    CIT_NAME_AR: 'طعمة',
  },
  {
    CIT_CODE: 1664,
    CIT_NAME_EN: "AL MU'AMALAH",
    CIT_NAME_AR: 'المعاملة',
  },
  {
    CIT_CODE: 1665,
    CIT_NAME_EN: 'AL HAYMAH',
    CIT_NAME_AR: 'الحيمة',
  },
  {
    CIT_CODE: 1666,
    CIT_NAME_EN: 'AL BATNAH',
    CIT_NAME_AR: 'البطنة',
  },
  {
    CIT_CODE: 1667,
    CIT_NAME_EN: 'BEESH',
    CIT_NAME_AR: 'بيش',
  },
  {
    CIT_CODE: 1669,
    CIT_NAME_EN: "AT TURAYF AL A'LA",
    CIT_NAME_AR: 'الطريف الأعلى',
  },
  {
    CIT_CODE: 1670,
    CIT_NAME_EN: 'AL MADDAH',
    CIT_NAME_AR: 'المضة',
  },
  {
    CIT_CODE: 1672,
    CIT_NAME_EN: 'THAFRAH',
    CIT_NAME_AR: 'ثفرة',
  },
  {
    CIT_CODE: 1673,
    CIT_NAME_EN: "FAR'AT QUWA",
    CIT_NAME_AR: 'فرعة قواء',
  },
  {
    CIT_CODE: 1674,
    CIT_NAME_EN: 'AL BARQA',
    CIT_NAME_AR: 'البرقاء',
  },
  {
    CIT_CODE: 1675,
    CIT_NAME_EN: 'FRSAN',
    CIT_NAME_AR: 'فرسان',
  },
  {
    CIT_CODE: 1676,
    CIT_NAME_EN: 'LASAS',
    CIT_NAME_AR: 'لسس',
  },
  {
    CIT_CODE: 1678,
    CIT_NAME_EN: 'AS SAFA AL MULABAD',
    CIT_NAME_AR: 'الصفا الملبد',
  },
  {
    CIT_CODE: 1679,
    CIT_NAME_EN: "ATH THU'AYLIBAH",
    CIT_NAME_AR: 'الثعيلبة',
  },
  {
    CIT_CODE: 1680,
    CIT_NAME_EN: 'AT TALHAH',
    CIT_NAME_AR: 'الطلحة',
  },
  {
    CIT_CODE: 1683,
    CIT_NAME_EN: 'AL BAGHATH',
    CIT_NAME_AR: 'البغث',
  },
  {
    CIT_CODE: 1684,
    CIT_NAME_EN: 'AL MURAYFIQ',
    CIT_NAME_AR: 'المريفق',
  },
  {
    CIT_CODE: 1686,
    CIT_NAME_EN: 'AL QADDAH',
    CIT_NAME_AR: 'القضة',
  },
  {
    CIT_CODE: 1687,
    CIT_NAME_EN: 'AL HAMID',
    CIT_NAME_AR: 'الحامض',
  },
  {
    CIT_CODE: 1688,
    CIT_NAME_EN: 'AT TILAH',
    CIT_NAME_AR: 'الطلاح',
  },
  {
    CIT_CODE: 1689,
    CIT_NAME_EN: 'WASIT',
    CIT_NAME_AR: 'واسط',
  },
  {
    CIT_CODE: 1690,
    CIT_NAME_EN: "KHASHM SHA'",
    CIT_NAME_AR: 'خشم شاع',
  },
  {
    CIT_CODE: 1691,
    CIT_NAME_EN: 'AL KHADAYIR',
    CIT_NAME_AR: 'الخضاير',
  },
  {
    CIT_CODE: 1692,
    CIT_NAME_EN: 'MASHHIDH',
    CIT_NAME_AR: 'مشحذ',
  },
  {
    CIT_CODE: 1693,
    CIT_NAME_EN: 'BURAYM AS SILIL',
    CIT_NAME_AR: 'بريم السليل',
  },
  {
    CIT_CODE: 1694,
    CIT_NAME_EN: 'AL BURDAN',
    CIT_NAME_AR: 'البردان',
  },
  {
    CIT_CODE: 1696,
    CIT_NAME_EN: "AL SA'ID",
    CIT_NAME_AR: 'آل سعيد',
  },
  {
    CIT_CODE: 1697,
    CIT_NAME_EN: 'AL GHAWL',
    CIT_NAME_AR: 'الغول',
  },
  {
    CIT_CODE: 1698,
    CIT_NAME_EN: 'AL AL HAYILAH',
    CIT_NAME_AR: 'آل الهايلة',
  },
  {
    CIT_CODE: 1699,
    CIT_NAME_EN: 'AL JARMAN',
    CIT_NAME_AR: 'آل جرمان',
  },
  {
    CIT_CODE: 1701,
    CIT_NAME_EN: 'AL HAWAWISH',
    CIT_NAME_AR: 'الحواويش',
  },
  {
    CIT_CODE: 1702,
    CIT_NAME_EN: 'AL MARRI',
    CIT_NAME_AR: 'المري',
  },
  {
    CIT_CODE: 1703,
    CIT_NAME_EN: 'AL SHUWAYL',
    CIT_NAME_AR: 'آل شويل',
  },
  {
    CIT_CODE: 1704,
    CIT_NAME_EN: 'KIDMAN',
    CIT_NAME_AR: 'كدمان',
  },
  {
    CIT_CODE: 1705,
    CIT_NAME_EN: 'AS SUFAYYAH',
    CIT_NAME_AR: 'الصفية',
  },
  {
    CIT_CODE: 1706,
    CIT_NAME_EN: 'IBN NIJAM',
    CIT_NAME_AR: 'إبن نجم',
  },
  {
    CIT_CODE: 1708,
    CIT_NAME_EN: "HADBA'",
    CIT_NAME_AR: 'هدباء',
  },
  {
    CIT_CODE: 1709,
    CIT_NAME_EN: 'WADI IBN HASHBAL',
    CIT_NAME_AR: 'وادي ابن هشبل',
  },
  {
    CIT_CODE: 1710,
    CIT_NAME_EN: 'AL BI THAWR',
    CIT_NAME_AR: 'ال بي ثور',
  },
  {
    CIT_CODE: 1711,
    CIT_NAME_EN: 'AS SILA',
    CIT_NAME_AR: 'السلع',
  },
  {
    CIT_CODE: 1714,
    CIT_NAME_EN: 'KHAYBAR AL JANUB',
    CIT_NAME_AR: 'خيبر الجنوب',
  },
  {
    CIT_CODE: 1715,
    CIT_NAME_EN: 'AL HITHADAH',
    CIT_NAME_AR: 'الحثدة',
  },
  {
    CIT_CODE: 1716,
    CIT_NAME_EN: "AL BA'IQ",
    CIT_NAME_AR: 'الباعق',
  },
  {
    CIT_CODE: 1717,
    CIT_NAME_EN: "AL 'ARD",
    CIT_NAME_AR: 'العرض',
  },
  {
    CIT_CODE: 1718,
    CIT_NAME_EN: 'UMM DAHI',
    CIT_NAME_AR: 'أم ضحي',
  },
  {
    CIT_CODE: 1719,
    CIT_NAME_EN: 'AL THAWBAN',
    CIT_NAME_AR: 'آل ثوبان',
  },
  {
    CIT_CODE: 1720,
    CIT_NAME_EN: 'AL HAYLAH',
    CIT_NAME_AR: 'الحيلة',
  },
  {
    CIT_CODE: 1721,
    CIT_NAME_EN: 'MURATIKH',
    CIT_NAME_AR: 'مراتخ',
  },
  {
    CIT_CODE: 1722,
    CIT_NAME_EN: 'UMM DHUHUR AR RAFUD',
    CIT_NAME_AR: 'أم ظهور الرفود',
  },
  {
    CIT_CODE: 1723,
    CIT_NAME_EN: "MAJZU'AH",
    CIT_NAME_AR: 'مجزوعة',
  },
  {
    CIT_CODE: 1724,
    CIT_NAME_EN: 'AL QURUNAH',
    CIT_NAME_AR: 'القرونة',
  },
  {
    CIT_CODE: 1725,
    CIT_NAME_EN: "AR RI'",
    CIT_NAME_AR: 'الريع',
  },
  {
    CIT_CODE: 1726,
    CIT_NAME_EN: 'QINAYFID',
    CIT_NAME_AR: 'قنيفد',
  },
  {
    CIT_CODE: 1729,
    CIT_NAME_EN: 'AL MUHSUN',
    CIT_NAME_AR: 'آل محصن',
  },
  {
    CIT_CODE: 1730,
    CIT_NAME_EN: 'AN NUSUB',
    CIT_NAME_AR: 'النصب',
  },
  {
    CIT_CODE: 1731,
    CIT_NAME_EN: 'AL MUSLIM',
    CIT_NAME_AR: 'المسلم',
  },
  {
    CIT_CODE: 1732,
    CIT_NAME_EN: 'AR RAYSH',
    CIT_NAME_AR: 'الريش',
  },
  {
    CIT_CODE: 1733,
    CIT_NAME_EN: 'AL HAJIB',
    CIT_NAME_AR: 'الحاجب',
  },
  {
    CIT_CODE: 1734,
    CIT_NAME_EN: "AL 'ILLIN",
    CIT_NAME_AR: 'آل علين',
  },
  {
    CIT_CODE: 1735,
    CIT_NAME_EN: 'AL HUDN',
    CIT_NAME_AR: 'الحضن',
  },
  {
    CIT_CODE: 1737,
    CIT_NAME_EN: 'AL MUKATHTHIR',
    CIT_NAME_AR: 'المكثر',
  },
  {
    CIT_CODE: 1738,
    CIT_NAME_EN: 'AL BARIK',
    CIT_NAME_AR: 'البارك',
  },
  {
    CIT_CODE: 1739,
    CIT_NAME_EN: 'AL MAGHMAR',
    CIT_NAME_AR: 'المغمر',
  },
  {
    CIT_CODE: 1740,
    CIT_NAME_EN: "AL 'IDAH",
    CIT_NAME_AR: 'العيدة',
  },
  {
    CIT_CODE: 1742,
    CIT_NAME_EN: "AL MAQA'ID",
    CIT_NAME_AR: 'المقاعد',
  },
  {
    CIT_CODE: 1743,
    CIT_NAME_EN: "SHI'B DURAYB",
    CIT_NAME_AR: 'شعب دريب',
  },
  {
    CIT_CODE: 1744,
    CIT_NAME_EN: 'AL KADID',
    CIT_NAME_AR: 'الكديد',
  },
  {
    CIT_CODE: 1745,
    CIT_NAME_EN: 'AS SAHAR',
    CIT_NAME_AR: 'السحر',
  },
  {
    CIT_CODE: 1746,
    CIT_NAME_EN: "IBN 'ABIDI",
    CIT_NAME_AR: 'إبن عبيدي',
  },
  {
    CIT_CODE: 1747,
    CIT_NAME_EN: 'AL JABHAH',
    CIT_NAME_AR: 'الجبهة',
  },
  {
    CIT_CODE: 1749,
    CIT_NAME_EN: "MA'SAM",
    CIT_NAME_AR: 'معصم',
  },
  {
    CIT_CODE: 1750,
    CIT_NAME_EN: 'AL HADABAT',
    CIT_NAME_AR: 'الحدبات',
  },
  {
    CIT_CODE: 1751,
    CIT_NAME_EN: "AL MA'SHUR",
    CIT_NAME_AR: 'المعشور',
  },
  {
    CIT_CODE: 1753,
    CIT_NAME_EN: 'BAYN AL JABLAYN',
    CIT_NAME_AR: 'بين الجبلين',
  },
  {
    CIT_CODE: 1754,
    CIT_NAME_EN: 'AL HASHAF',
    CIT_NAME_AR: 'الحشف',
  },
  {
    CIT_CODE: 1755,
    CIT_NAME_EN: 'RAYMAN',
    CIT_NAME_AR: 'ريمان',
  },
  {
    CIT_CODE: 1756,
    CIT_NAME_EN: 'AL KHULAYYIF',
    CIT_NAME_AR: 'الخليف',
  },
  {
    CIT_CODE: 1757,
    CIT_NAME_EN: 'AR RAHAH',
    CIT_NAME_AR: 'الراحة',
  },
  {
    CIT_CODE: 1758,
    CIT_NAME_EN: "AL 'AFARAH",
    CIT_NAME_AR: 'العفارة',
  },
  {
    CIT_CODE: 1759,
    CIT_NAME_EN: 'AL BAJILI',
    CIT_NAME_AR: 'البجيلي',
  },
  {
    CIT_CODE: 1760,
    CIT_NAME_EN: "AL 'AQL",
    CIT_NAME_AR: 'العقل',
  },
  {
    CIT_CODE: 1762,
    CIT_NAME_EN: 'SAYYAL',
    CIT_NAME_AR: 'سيال',
  },
  {
    CIT_CODE: 1763,
    CIT_NAME_EN: "AL MA'LAWI",
    CIT_NAME_AR: 'آل معلوي',
  },
  {
    CIT_CODE: 1764,
    CIT_NAME_EN: 'AL KHUTAYM',
    CIT_NAME_AR: 'الخطيم',
  },
  {
    CIT_CODE: 1765,
    CIT_NAME_EN: 'AL FAYY',
    CIT_NAME_AR: 'الفي',
  },
  {
    CIT_CODE: 1766,
    CIT_NAME_EN: 'AL JARDAN',
    CIT_NAME_AR: 'الجردان',
  },
  {
    CIT_CODE: 1767,
    CIT_NAME_EN: 'KHARIF',
    CIT_NAME_AR: 'خارف',
  },
  {
    CIT_CODE: 1768,
    CIT_NAME_EN: 'ASH SHARAF',
    CIT_NAME_AR: 'الشرف',
  },
  {
    CIT_CODE: 1769,
    CIT_NAME_EN: 'SARAH',
    CIT_NAME_AR: 'سارة',
  },
  {
    CIT_CODE: 1770,
    CIT_NAME_EN: 'SIQAMAH',
    CIT_NAME_AR: 'سقامة',
  },
  {
    CIT_CODE: 1771,
    CIT_NAME_EN: 'AL KHABARAH',
    CIT_NAME_AR: 'الخبارة',
  },
  {
    CIT_CODE: 1772,
    CIT_NAME_EN: 'GHUDAYQAH',
    CIT_NAME_AR: 'غديقة',
  },
  {
    CIT_CODE: 1773,
    CIT_NAME_EN: 'AL KHARJAH',
    CIT_NAME_AR: 'الخرجة',
  },
  {
    CIT_CODE: 1774,
    CIT_NAME_EN: 'AD DUBANIYAH',
    CIT_NAME_AR: 'الدبانية',
  },
  {
    CIT_CODE: 1775,
    CIT_NAME_EN: 'AS SABKHAH',
    CIT_NAME_AR: 'الصبخة',
  },
  {
    CIT_CODE: 1776,
    CIT_NAME_EN: "SA'BAH",
    CIT_NAME_AR: 'صعبة',
  },
  {
    CIT_CODE: 1777,
    CIT_NAME_EN: 'SUR BIN SHAKWAN',
    CIT_NAME_AR: 'صور بن شكوان',
  },
  {
    CIT_CODE: 1778,
    CIT_NAME_EN: 'AL KHASHASHAH',
    CIT_NAME_AR: 'الخشاشة',
  },
  {
    CIT_CODE: 1779,
    CIT_NAME_EN: "AL 'AWSA",
    CIT_NAME_AR: 'العوصاء',
  },
  {
    CIT_CODE: 1780,
    CIT_NAME_EN: 'AL KHUSHSHAH',
    CIT_NAME_AR: 'الخشة',
  },
  {
    CIT_CODE: 1781,
    CIT_NAME_EN: 'LAGHAB',
    CIT_NAME_AR: 'لغب',
  },
  {
    CIT_CODE: 1782,
    CIT_NAME_EN: 'AR RAHA',
    CIT_NAME_AR: 'الرحى',
  },
  {
    CIT_CODE: 1783,
    CIT_NAME_EN: 'HARIZAH',
    CIT_NAME_AR: 'حريزة',
  },
  {
    CIT_CODE: 1785,
    CIT_NAME_EN: 'AL HAWRAH',
    CIT_NAME_AR: 'الحورة',
  },
  {
    CIT_CODE: 1786,
    CIT_NAME_EN: 'RADWAN',
    CIT_NAME_AR: 'رضوان',
  },
  {
    CIT_CODE: 1787,
    CIT_NAME_EN: 'HABATH',
    CIT_NAME_AR: 'حبث',
  },
  {
    CIT_CODE: 1788,
    CIT_NAME_EN: 'AL NAHIYAH',
    CIT_NAME_AR: 'آل ناهية',
  },
  {
    CIT_CODE: 1790,
    CIT_NAME_EN: 'FUTAH',
    CIT_NAME_AR: 'فتاح',
  },
  {
    CIT_CODE: 1791,
    CIT_NAME_EN: 'MASLAT',
    CIT_NAME_AR: 'مسلت',
  },
  {
    CIT_CODE: 1792,
    CIT_NAME_EN: 'AL SHADDADI',
    CIT_NAME_AR: 'آل شدادي',
  },
  {
    CIT_CODE: 1793,
    CIT_NAME_EN: "AL 'ASIMI",
    CIT_NAME_AR: 'آل عاصمي',
  },
  {
    CIT_CODE: 1794,
    CIT_NAME_EN: 'DHI HUSAYMU',
    CIT_NAME_AR: 'ذي حصيمو',
  },
  {
    CIT_CODE: 1795,
    CIT_NAME_EN: 'WUSANIB',
    CIT_NAME_AR: 'وسانب',
  },
  {
    CIT_CODE: 1796,
    CIT_NAME_EN: 'AZ ZAHA',
    CIT_NAME_AR: 'الزهراء',
  },
  {
    CIT_CODE: 1797,
    CIT_NAME_EN: 'AL MASQAWI',
    CIT_NAME_AR: 'المسقوي',
  },
  {
    CIT_CODE: 1798,
    CIT_NAME_EN: 'HIDAH',
    CIT_NAME_AR: 'هدة',
  },
  {
    CIT_CODE: 1799,
    CIT_NAME_EN: 'AL GHAL',
    CIT_NAME_AR: 'الغال',
  },
  {
    CIT_CODE: 1800,
    CIT_NAME_EN: 'KHAMIS MUTAIR',
    CIT_NAME_AR: 'خميس مطير',
  },
  {
    CIT_CODE: 1802,
    CIT_NAME_EN: 'QANA & AL BAHR',
    CIT_NAME_AR: 'قنا البحر',
  },
  {
    CIT_CODE: 1803,
    CIT_NAME_EN: 'KHAMIS AL BAHR',
    CIT_NAME_AR: 'خميس البحر',
  },
  {
    CIT_CODE: 1804,
    CIT_NAME_EN: "QUSHAY'AH",
    CIT_NAME_AR: 'قشيعة',
  },
  {
    CIT_CODE: 1805,
    CIT_NAME_EN: 'DALAJ',
    CIT_NAME_AR: 'دالج',
  },
  {
    CIT_CODE: 1806,
    CIT_NAME_EN: "SHATT IBN JAZI'AH",
    CIT_NAME_AR: 'شط إبن جازعة',
  },
  {
    CIT_CODE: 1807,
    CIT_NAME_EN: 'MANQASH',
    CIT_NAME_AR: 'منقش',
  },
  {
    CIT_CODE: 1808,
    CIT_NAME_EN: 'AD DIMAGH',
    CIT_NAME_AR: 'الدماغ',
  },
  {
    CIT_CODE: 1809,
    CIT_NAME_EN: 'THULUTH RIM',
    CIT_NAME_AR: 'ثلوث ريم',
  },
  {
    CIT_CODE: 1811,
    CIT_NAME_EN: "AD DAJI'",
    CIT_NAME_AR: 'الضاجع',
  },
  {
    CIT_CODE: 1812,
    CIT_NAME_EN: "AR RAS'AH",
    CIT_NAME_AR: 'الرصعة',
  },
  {
    CIT_CODE: 1813,
    CIT_NAME_EN: 'SANUMAH',
    CIT_NAME_AR: 'سنومة',
  },
  {
    CIT_CODE: 1815,
    CIT_NAME_EN: 'AS SARW',
    CIT_NAME_AR: 'السرو',
  },
  {
    CIT_CODE: 1816,
    CIT_NAME_EN: "AL 'ASHSHAH",
    CIT_NAME_AR: 'العشة',
  },
  {
    CIT_CODE: 1817,
    CIT_NAME_EN: 'AL MAJAM',
    CIT_NAME_AR: 'آل مجم',
  },
  {
    CIT_CODE: 1819,
    CIT_NAME_EN: 'AL QARIYAH',
    CIT_NAME_AR: 'القارية',
  },
  {
    CIT_CODE: 1820,
    CIT_NAME_EN: 'ADH DHURWAH',
    CIT_NAME_AR: 'الذروة',
  },
  {
    CIT_CODE: 1821,
    CIT_NAME_EN: "ASH SHI'BAYN",
    CIT_NAME_AR: 'الشعبين',
  },
  {
    CIT_CODE: 1822,
    CIT_NAME_EN: "AL 'ISA",
    CIT_NAME_AR: 'آل عيسى',
  },
  {
    CIT_CODE: 1823,
    CIT_NAME_EN: 'MARJUMAH',
    CIT_NAME_AR: 'مرجومة',
  },
  {
    CIT_CODE: 1824,
    CIT_NAME_EN: 'BAYYAGH',
    CIT_NAME_AR: 'بيغ',
  },
  {
    CIT_CODE: 1825,
    CIT_NAME_EN: 'AL JAZWAH',
    CIT_NAME_AR: 'الجزوة',
  },
  {
    CIT_CODE: 1826,
    CIT_NAME_EN: 'FAQWAH',
    CIT_NAME_AR: 'فقوة',
  },
  {
    CIT_CODE: 1827,
    CIT_NAME_EN: "AL MUT'ALI",
    CIT_NAME_AR: 'آل متعالي',
  },
  {
    CIT_CODE: 1828,
    CIT_NAME_EN: 'DABLA',
    CIT_NAME_AR: 'دبلاء',
  },
  {
    CIT_CODE: 1830,
    CIT_NAME_EN: 'KALMAH',
    CIT_NAME_AR: 'كلمة',
  },
  {
    CIT_CODE: 1831,
    CIT_NAME_EN: 'AL MASAM',
    CIT_NAME_AR: 'آل مصم',
  },
  {
    CIT_CODE: 1832,
    CIT_NAME_EN: 'YASRAH',
    CIT_NAME_AR: 'يسراة',
  },
  {
    CIT_CODE: 1833,
    CIT_NAME_EN: 'AL ATHL',
    CIT_NAME_AR: 'الأثل',
  },
  {
    CIT_CODE: 1834,
    CIT_NAME_EN: 'LASNAY',
    CIT_NAME_AR: 'لصناي',
  },
  {
    CIT_CODE: 1835,
    CIT_NAME_EN: 'UKYAH',
    CIT_NAME_AR: 'عكية',
  },
  {
    CIT_CODE: 1836,
    CIT_NAME_EN: 'AL QARAR',
    CIT_NAME_AR: 'القرار',
  },
  {
    CIT_CODE: 1838,
    CIT_NAME_EN: 'FAYSHAN',
    CIT_NAME_AR: 'فيشان',
  },
  {
    CIT_CODE: 1841,
    CIT_NAME_EN: 'AL LASBAH',
    CIT_NAME_AR: 'اللصبة',
  },
  {
    CIT_CODE: 1842,
    CIT_NAME_EN: 'JAWW JIBAH',
    CIT_NAME_AR: 'جو جيبة',
  },
  {
    CIT_CODE: 1843,
    CIT_NAME_EN: 'LUHUD',
    CIT_NAME_AR: 'لهد',
  },
  {
    CIT_CODE: 1844,
    CIT_NAME_EN: 'AL HADANAH',
    CIT_NAME_AR: 'الهدانة',
  },
  {
    CIT_CODE: 1845,
    CIT_NAME_EN: "ABU DHIRA'",
    CIT_NAME_AR: 'أبو ذراع',
  },
  {
    CIT_CODE: 1846,
    CIT_NAME_EN: 'REJAL ALMAA',
    CIT_NAME_AR: 'رجال ألمع',
  },
  {
    CIT_CODE: 1847,
    CIT_NAME_EN: 'AS SUDAH',
    CIT_NAME_AR: 'السودة',
  },
  {
    CIT_CODE: 1849,
    CIT_NAME_EN: 'AL KHUTWAH',
    CIT_NAME_AR: 'الخطوة',
  },
  {
    CIT_CODE: 1851,
    CIT_NAME_EN: "AL QIFAY'",
    CIT_NAME_AR: 'آل قفيع',
  },
  {
    CIT_CODE: 1852,
    CIT_NAME_EN: 'AL MADIQ',
    CIT_NAME_AR: 'المضيق',
  },
  {
    CIT_CODE: 1853,
    CIT_NAME_EN: 'AL LAGHIR',
    CIT_NAME_AR: 'آل لغر',
  },
  {
    CIT_CODE: 1855,
    CIT_NAME_EN: 'AL DALHAM',
    CIT_NAME_AR: 'آل دلهم',
  },
  {
    CIT_CODE: 1856,
    CIT_NAME_EN: 'UNQARAH',
    CIT_NAME_AR: 'عنقرة',
  },
  {
    CIT_CODE: 1857,
    CIT_NAME_EN: 'AL LUT',
    CIT_NAME_AR: 'آل لوط',
  },
  {
    CIT_CODE: 1858,
    CIT_NAME_EN: 'AL MAKIR',
    CIT_NAME_AR: 'آل مكر',
  },
  {
    CIT_CODE: 1859,
    CIT_NAME_EN: "AL 'IRQ",
    CIT_NAME_AR: 'آل عرق',
  },
  {
    CIT_CODE: 1860,
    CIT_NAME_EN: 'SARAYIM',
    CIT_NAME_AR: 'سرايم',
  },
  {
    CIT_CODE: 1861,
    CIT_NAME_EN: 'LAZMAH',
    CIT_NAME_AR: 'لزمة',
  },
  {
    CIT_CODE: 1862,
    CIT_NAME_EN: 'AL-DARB',
    CIT_NAME_AR: 'الدرب',
  },
  {
    CIT_CODE: 1863,
    CIT_NAME_EN: 'BANI TAMIM',
    CIT_NAME_AR: 'بني تميم',
  },
  {
    CIT_CODE: 1864,
    CIT_NAME_EN: 'AL QARHA',
    CIT_NAME_AR: 'القرحاء',
  },
  {
    CIT_CODE: 1865,
    CIT_NAME_EN: "AL 'AMRAH",
    CIT_NAME_AR: 'آل عمرة',
  },
  {
    CIT_CODE: 1866,
    CIT_NAME_EN: 'AL AD DAHIS',
    CIT_NAME_AR: 'آل الداحس',
  },
  {
    CIT_CODE: 1867,
    CIT_NAME_EN: 'AL ZUHAYR',
    CIT_NAME_AR: 'آل زهير',
  },
  {
    CIT_CODE: 1868,
    CIT_NAME_EN: 'IRAB',
    CIT_NAME_AR: 'عراب',
  },
  {
    CIT_CODE: 1869,
    CIT_NAME_EN: 'AL MASHHUR',
    CIT_NAME_AR: 'آل مشهور',
  },
  {
    CIT_CODE: 1871,
    CIT_NAME_EN: 'AL HIDAYLAH',
    CIT_NAME_AR: 'آل حديلة',
  },
  {
    CIT_CODE: 1872,
    CIT_NAME_EN: 'AL HILAMI',
    CIT_NAME_AR: 'آل حلامي',
  },
  {
    CIT_CODE: 1873,
    CIT_NAME_EN: 'SAFHAN',
    CIT_NAME_AR: 'صفحان',
  },
  {
    CIT_CODE: 1874,
    CIT_NAME_EN: 'SAMUDAH',
    CIT_NAME_AR: 'سامودة',
  },
  {
    CIT_CODE: 1875,
    CIT_NAME_EN: 'AL GHUBBAH',
    CIT_NAME_AR: 'الغبة',
  },
  {
    CIT_CODE: 1876,
    CIT_NAME_EN: 'AL MAHAMID',
    CIT_NAME_AR: 'المحاميد',
  },
  {
    CIT_CODE: 1877,
    CIT_NAME_EN: "MASNA AL 'AZYAR",
    CIT_NAME_AR: 'مسنى الازيار',
  },
  {
    CIT_CODE: 1878,
    CIT_NAME_EN: 'AL HUDHAYFAT AL QALAH',
    CIT_NAME_AR: 'الحذيفة القالة',
  },
  {
    CIT_CODE: 1880,
    CIT_NAME_EN: 'UMM AS SALAM',
    CIT_NAME_AR: 'ام السلم',
  },
  {
    CIT_CODE: 1882,
    CIT_NAME_EN: 'BAHRAH AL MUJAHIDIN',
    CIT_NAME_AR: 'بحرة المجاهدين',
  },
  {
    CIT_CODE: 1883,
    CIT_NAME_EN: 'BAHRAH AL QADIMAH',
    CIT_NAME_AR: 'بحرة القديمة',
  },
  {
    CIT_CODE: 1884,
    CIT_NAME_EN: "HADA' AL JADIDAH",
    CIT_NAME_AR: 'حداء الجديدة',
  },
  {
    CIT_CODE: 1885,
    CIT_NAME_EN: 'DHAHBAN',
    CIT_NAME_AR: 'ذهبان',
  },
  {
    CIT_CODE: 1886,
    CIT_NAME_EN: 'AL GHAWLA',
    CIT_NAME_AR: 'الغولاء',
  },
  {
    CIT_CODE: 1887,
    CIT_NAME_EN: "AL 'AWJANIYAH",
    CIT_NAME_AR: 'العوجانية',
  },
  {
    CIT_CODE: 1888,
    CIT_NAME_EN: 'AS SAFHAH',
    CIT_NAME_AR: 'الصفحة',
  },
  {
    CIT_CODE: 1889,
    CIT_NAME_EN: 'AL QADIMAH',
    CIT_NAME_AR: 'القضيمة',
  },
  {
    CIT_CODE: 1890,
    CIT_NAME_EN: 'AL QADIMAH PORT',
    CIT_NAME_AR: 'ميناء القضيمة',
  },
  {
    CIT_CODE: 1891,
    CIT_NAME_EN: 'AL MAWALID',
    CIT_NAME_AR: 'المواليد',
  },
  {
    CIT_CODE: 1892,
    CIT_NAME_EN: 'DAGHMA',
    CIT_NAME_AR: 'دغماء',
  },
  {
    CIT_CODE: 1895,
    CIT_NAME_EN: 'AL QAHAB',
    CIT_NAME_AR: 'القهب',
  },
  {
    CIT_CODE: 1896,
    CIT_NAME_EN: 'AL JAHASAH',
    CIT_NAME_AR: 'الجحصة',
  },
  {
    CIT_CODE: 1898,
    CIT_NAME_EN: 'ASH SHUHUMAH',
    CIT_NAME_AR: 'الشهومة',
  },
  {
    CIT_CODE: 1900,
    CIT_NAME_EN: 'SAYHAN',
    CIT_NAME_AR: 'سيحان',
  },
  {
    CIT_CODE: 1901,
    CIT_NAME_EN: 'AL HAWIYAH',
    CIT_NAME_AR: 'الحوية',
  },
  {
    CIT_CODE: 1902,
    CIT_NAME_EN: 'HUMAYS',
    CIT_NAME_AR: 'خميس',
  },
  {
    CIT_CODE: 1904,
    CIT_NAME_EN: 'AL AHLAF',
    CIT_NAME_AR: 'الاحلاف',
  },
  {
    CIT_CODE: 1905,
    CIT_NAME_EN: 'AL MUWAYH AL QADIM',
    CIT_NAME_AR: 'المويه القديم',
  },
  {
    CIT_CODE: 1907,
    CIT_NAME_EN: 'AL BADIRIYAH',
    CIT_NAME_AR: 'البادرية',
  },
  {
    CIT_CODE: 1909,
    CIT_NAME_EN: 'ADH DHUWAYB',
    CIT_NAME_AR: 'الذويب',
  },
  {
    CIT_CODE: 1910,
    CIT_NAME_EN: 'MARWAN',
    CIT_NAME_AR: 'مروان',
  },
  {
    CIT_CODE: 1912,
    CIT_NAME_EN: 'UMM AD DAWM',
    CIT_NAME_AR: 'أم الدوم',
  },
  {
    CIT_CODE: 1913,
    CIT_NAME_EN: 'DUGHAYBJAH',
    CIT_NAME_AR: 'دغيبجة',
  },
  {
    CIT_CODE: 1914,
    CIT_NAME_EN: 'AR RUMAYDAH',
    CIT_NAME_AR: 'الرميدة',
  },
  {
    CIT_CODE: 1915,
    CIT_NAME_EN: 'KHADD AL HAJ',
    CIT_NAME_AR: 'خد الحاج',
  },
  {
    CIT_CODE: 1916,
    CIT_NAME_EN: 'SHUWAYHIT',
    CIT_NAME_AR: 'شويحط',
  },
  {
    CIT_CODE: 1917,
    CIT_NAME_EN: 'WITAYLIH',
    CIT_NAME_AR: 'وطيلح',
  },
  {
    CIT_CODE: 1918,
    CIT_NAME_EN: "AL 'ANABAH",
    CIT_NAME_AR: 'العنبة',
  },
  {
    CIT_CODE: 1919,
    CIT_NAME_EN: 'AL KHUDR',
    CIT_NAME_AR: 'الخضر',
  },
  {
    CIT_CODE: 1920,
    CIT_NAME_EN: 'AL WUDIYAH',
    CIT_NAME_AR: 'الودية',
  },
  {
    CIT_CODE: 1922,
    CIT_NAME_EN: 'AL MAHANI',
    CIT_NAME_AR: 'المحاني',
  },
  {
    CIT_CODE: 1923,
    CIT_NAME_EN: 'AD DAR AL BAYDA',
    CIT_NAME_AR: 'الدار البيضاء',
  },
  {
    CIT_CODE: 1924,
    CIT_NAME_EN: 'AN NAMUR',
    CIT_NAME_AR: 'النمور',
  },
  {
    CIT_CODE: 1925,
    CIT_NAME_EN: 'AL MUBAYRIZ',
    CIT_NAME_AR: 'المبيرز',
  },
  {
    CIT_CODE: 1926,
    CIT_NAME_EN: 'MALAH',
    CIT_NAME_AR: 'ملح',
  },
  {
    CIT_CODE: 1927,
    CIT_NAME_EN: 'AL GHADIRAYN',
    CIT_NAME_AR: 'الغديرين',
  },
  {
    CIT_CODE: 1928,
    CIT_NAME_EN: 'AL HAMAH',
    CIT_NAME_AR: 'الهامة',
  },
  {
    CIT_CODE: 1929,
    CIT_NAME_EN: "BIR ABU AL 'AJJAJ",
    CIT_NAME_AR: 'بئر ابو العجاج',
  },
  {
    CIT_CODE: 1930,
    CIT_NAME_EN: 'BIR AS SADI',
    CIT_NAME_AR: 'بئر السادي',
  },
  {
    CIT_CODE: 1931,
    CIT_NAME_EN: "QAL'AT AL ADHNUM",
    CIT_NAME_AR: 'قلعة الاذنم',
  },
  {
    CIT_CODE: 1933,
    CIT_NAME_EN: 'WADI ABU TINAH',
    CIT_NAME_AR: 'وادي ابو طينة',
  },
  {
    CIT_CODE: 1934,
    CIT_NAME_EN: 'AS SURAH',
    CIT_NAME_AR: 'الصورة',
  },
  {
    CIT_CODE: 1935,
    CIT_NAME_EN: 'TIRAYM',
    CIT_NAME_AR: 'تريم',
  },
  {
    CIT_CODE: 1936,
    CIT_NAME_EN: 'BIR FHAYMAN',
    CIT_NAME_AR: 'بئر فحيمان',
  },
  {
    CIT_CODE: 1937,
    CIT_NAME_EN: 'QASRAH',
    CIT_NAME_AR: 'قاصرة',
  },
  {
    CIT_CODE: 1938,
    CIT_NAME_EN: 'HADDAJ',
    CIT_NAME_AR: 'هداج',
  },
  {
    CIT_CODE: 1939,
    CIT_NAME_EN: 'AL HAWAWIT',
    CIT_NAME_AR: 'الحواويط',
  },
  {
    CIT_CODE: 1940,
    CIT_NAME_EN: 'JUBBAH',
    CIT_NAME_AR: 'جبة',
  },
  {
    CIT_CODE: 1941,
    CIT_NAME_EN: 'AL MHARISH',
    CIT_NAME_AR: 'المهارش',
  },
  {
    CIT_CODE: 1942,
    CIT_NAME_EN: 'DUJI',
    CIT_NAME_AR: 'ضوجي',
  },
  {
    CIT_CODE: 1943,
    CIT_NAME_EN: 'AL MURAYR',
    CIT_NAME_AR: 'المرير',
  },
  {
    CIT_CODE: 1944,
    CIT_NAME_EN: 'SHUWAQ',
    CIT_NAME_AR: 'شواق',
  },
  {
    CIT_CODE: 1945,
    CIT_NAME_EN: 'AMDAN',
    CIT_NAME_AR: 'آمدان',
  },
  {
    CIT_CODE: 1946,
    CIT_NAME_EN: 'RUWAQA',
    CIT_NAME_AR: 'رواقا',
  },
  {
    CIT_CODE: 1949,
    CIT_NAME_EN: 'SURR',
    CIT_NAME_AR: 'صر',
  },
  {
    CIT_CODE: 1951,
    CIT_NAME_EN: "NABI' DAMA",
    CIT_NAME_AR: 'نابع داما',
  },
  {
    CIT_CODE: 1952,
    CIT_NAME_EN: 'QABQAB',
    CIT_NAME_AR: 'قبقاب',
  },
  {
    CIT_CODE: 1953,
    CIT_NAME_EN: 'SHARMA',
    CIT_NAME_AR: 'شرماء',
  },
  {
    CIT_CODE: 1954,
    CIT_NAME_EN: 'SHAGHAB',
    CIT_NAME_AR: 'شغب',
  },
  {
    CIT_CODE: 1955,
    CIT_NAME_EN: 'AL MUWAYLIH',
    CIT_NAME_AR: 'المويلح',
  },
  {
    CIT_CODE: 1957,
    CIT_NAME_EN: 'AL SALIMIYAH',
    CIT_NAME_AR: 'السالمية',
  },
  {
    CIT_CODE: 1958,
    CIT_NAME_EN: 'AL MURAYDISIYAH',
    CIT_NAME_AR: 'المريديسية',
  },
  {
    CIT_CODE: 1959,
    CIT_NAME_EN: "AS SAFRA'",
    CIT_NAME_AR: 'الصفراء',
  },
  {
    CIT_CODE: 1960,
    CIT_NAME_EN: 'KHABB RAWDAN',
    CIT_NAME_AR: 'خب روضان',
  },
  {
    CIT_CODE: 1961,
    CIT_NAME_EN: 'AL MUNTAZAH',
    CIT_NAME_AR: 'المنتزة',
  },
  {
    CIT_CODE: 1963,
    CIT_NAME_EN: 'FAYD',
    CIT_NAME_AR: 'فيد',
  },
  {
    CIT_CODE: 1964,
    CIT_NAME_EN: 'TABAH',
    CIT_NAME_AR: 'طابة',
  },
  {
    CIT_CODE: 1966,
    CIT_NAME_EN: 'UQLAT IBN DANI',
    CIT_NAME_AR: 'عقلة بن داني',
  },
  {
    CIT_CODE: 1967,
    CIT_NAME_EN: 'UQLAT AL LABAN',
    CIT_NAME_AR: 'عقلة اللبن',
  },
  {
    CIT_CODE: 1970,
    CIT_NAME_EN: 'UQLAT IBN KULAYB',
    CIT_NAME_AR: 'عقلة ابن كليب',
  },
  {
    CIT_CODE: 1971,
    CIT_NAME_EN: "URAIJA'",
    CIT_NAME_AR: 'عريجاء',
  },
  {
    CIT_CODE: 1972,
    CIT_NAME_EN: 'AL MATRAFIYAH',
    CIT_NAME_AR: 'المطرفية',
  },
  {
    CIT_CODE: 1973,
    CIT_NAME_EN: 'AL MUDAYYIH',
    CIT_NAME_AR: 'المضيح',
  },
  {
    CIT_CODE: 1975,
    CIT_NAME_EN: "AN NI'AYY",
    CIT_NAME_AR: 'النعي',
  },
  {
    CIT_CODE: 1977,
    CIT_NAME_EN: "AL 'ISHSH",
    CIT_NAME_AR: 'العش',
  },
  {
    CIT_CODE: 1978,
    CIT_NAME_EN: "AS SAB'AN",
    CIT_NAME_AR: 'السبعان',
  },
  {
    CIT_CODE: 1979,
    CIT_NAME_EN: "QASR AL 'ABDALLAH",
    CIT_NAME_AR: 'قصر العبد الله',
  },
  {
    CIT_CODE: 1980,
    CIT_NAME_EN: "MAZARI' AL HUFAYRAT",
    CIT_NAME_AR: 'مزارع الحفيرات',
  },
  {
    CIT_CODE: 1982,
    CIT_NAME_EN: 'AS SAMRA',
    CIT_NAME_AR: 'السمراء',
  },
  {
    CIT_CODE: 1983,
    CIT_NAME_EN: "AL 'ATSHAN",
    CIT_NAME_AR: 'العطشان',
  },
  {
    CIT_CODE: 1984,
    CIT_NAME_EN: 'AS SIQ',
    CIT_NAME_AR: 'السيق',
  },
  {
    CIT_CODE: 1986,
    CIT_NAME_EN: 'AL-ASYAH',
    CIT_NAME_AR: 'الاسياح',
  },
  {
    CIT_CODE: 1987,
    CIT_NAME_EN: 'AT TANNUMAH',
    CIT_NAME_AR: 'التنومة',
  },
  {
    CIT_CODE: 1989,
    CIT_NAME_EN: 'KHUSAYYIBAH',
    CIT_NAME_AR: 'خصيبة',
  },
  {
    CIT_CODE: 1990,
    CIT_NAME_EN: 'TURAYF AL ASYAH',
    CIT_NAME_AR: 'طريف الاسياح',
  },
  {
    CIT_CODE: 1991,
    CIT_NAME_EN: 'AL BANDARIYAH',
    CIT_NAME_AR: 'البندرية',
  },
  {
    CIT_CODE: 1992,
    CIT_NAME_EN: 'HUNAYDHIL',
    CIT_NAME_AR: 'حنيظل',
  },
  {
    CIT_CODE: 1993,
    CIT_NAME_EN: "AL JA'ALAH",
    CIT_NAME_AR: 'الجعلة',
  },
  {
    CIT_CODE: 1994,
    CIT_NAME_EN: 'ABA AL WUROOD',
    CIT_NAME_AR: 'ابا الورود',
  },
  {
    CIT_CODE: 1995,
    CIT_NAME_EN: 'DIDAH',
    CIT_NAME_AR: 'ضيدة',
  },
  {
    CIT_CODE: 1996,
    CIT_NAME_EN: 'AN NIMRIYAH',
    CIT_NAME_AR: 'النمرية',
  },
  {
    CIT_CODE: 1997,
    CIT_NAME_EN: 'AL MUTAYWI ASH SHAMALI',
    CIT_NAME_AR: 'المطيوي الشمالي',
  },
  {
    CIT_CODE: 1998,
    CIT_NAME_EN: 'AL MAHALANI',
    CIT_NAME_AR: 'المحلاني',
  },
  {
    CIT_CODE: 2000,
    CIT_NAME_EN: 'UTHAL',
    CIT_NAME_AR: 'أوثال',
  },
  {
    CIT_CODE: 2001,
    CIT_NAME_EN: 'GHAF AL JIWA',
    CIT_NAME_AR: 'غاف الجواء',
  },
  {
    CIT_CODE: 2002,
    CIT_NAME_EN: 'RAWD AL JIWA',
    CIT_NAME_AR: 'روض الجواء',
  },
  {
    CIT_CODE: 2003,
    CIT_NAME_EN: 'ASH SHAHARIN',
    CIT_NAME_AR: 'الشهارين',
  },
  {
    CIT_CODE: 2006,
    CIT_NAME_EN: "AL 'UBAYLAH",
    CIT_NAME_AR: 'العبيلة',
  },
  {
    CIT_CODE: 2007,
    CIT_NAME_EN: 'SHUBAYTAH',
    CIT_NAME_AR: 'شبيطة',
  },
  {
    CIT_CODE: 2008,
    CIT_NAME_EN: 'SHAWWALAH',
    CIT_NAME_AR: 'شوالة',
  },
  {
    CIT_CODE: 2009,
    CIT_NAME_EN: 'MARKAZ ASH SHAYBAH',
    CIT_NAME_AR: 'مركز الشيبة',
  },
  {
    CIT_CODE: 2010,
    CIT_NAME_EN: 'MARKAZ AL KHIRAN',
    CIT_NAME_AR: 'مركز الخيران',
  },
  {
    CIT_CODE: 2011,
    CIT_NAME_EN: 'HIJRAT AT TAWILAH',
    CIT_NAME_AR: 'هجرة الطويلة',
  },
  {
    CIT_CODE: 2012,
    CIT_NAME_EN: 'AJAIB',
    CIT_NAME_AR: 'عجائب',
  },
  {
    CIT_CODE: 2013,
    CIT_NAME_EN: 'AT TARBIL',
    CIT_NAME_AR: 'الطربيل',
  },
  {
    CIT_CODE: 2014,
    CIT_NAME_EN: 'AT TUHAYMIYAH',
    CIT_NAME_AR: 'التهيمية',
  },
  {
    CIT_CODE: 2015,
    CIT_NAME_EN: 'AL MIQDAM',
    CIT_NAME_AR: 'المقدام',
  },
  {
    CIT_CODE: 2016,
    CIT_NAME_EN: 'AS SABAYIRAH',
    CIT_NAME_AR: 'السبايرة',
  },
  {
    CIT_CODE: 2017,
    CIT_NAME_EN: 'AS SABAT',
    CIT_NAME_AR: 'السباط',
  },
  {
    CIT_CODE: 2018,
    CIT_NAME_EN: 'AL JARN',
    CIT_NAME_AR: 'الجرن',
  },
  {
    CIT_CODE: 2019,
    CIT_NAME_EN: 'BARQA AL RUKBAN',
    CIT_NAME_AR: 'برقاء  الركبان',
  },
  {
    CIT_CODE: 2023,
    CIT_NAME_EN: 'ALADEED',
    CIT_NAME_AR: 'العديد',
  },
  {
    CIT_CODE: 2025,
    CIT_NAME_EN: "DHA'BLUTIN",
    CIT_NAME_AR: 'ذعبلوتن',
  },
  {
    CIT_CODE: 2027,
    CIT_NAME_EN: "NA'LAT SHADQAM",
    CIT_NAME_AR: 'نعلة شدقم',
  },
  {
    CIT_CODE: 2028,
    CIT_NAME_EN: 'AL KHUWAYS',
    CIT_NAME_AR: 'الخويس',
  },
  {
    CIT_CODE: 2029,
    CIT_NAME_EN: 'SHADQAM',
    CIT_NAME_AR: 'شدقم',
  },
  {
    CIT_CODE: 2031,
    CIT_NAME_EN: 'AL FAWWARAH',
    CIT_NAME_AR: 'الفوارة',
  },
  {
    CIT_CODE: 2032,
    CIT_NAME_EN: 'IBN SIRHAN',
    CIT_NAME_AR: 'ابن سرحان',
  },
  {
    CIT_CODE: 2033,
    CIT_NAME_EN: 'AL MURADDAF',
    CIT_NAME_AR: 'المرضف',
  },
  {
    CIT_CODE: 2035,
    CIT_NAME_EN: 'AL UDAYLIYAH',
    CIT_NAME_AR: 'العضيلية',
  },
  {
    CIT_CODE: 2037,
    CIT_NAME_EN: 'HARAD',
    CIT_NAME_AR: 'حرض',
  },
  {
    CIT_CODE: 2038,
    CIT_NAME_EN: "AL 'AYUN",
    CIT_NAME_AR: 'العيون',
  },
  {
    CIT_CODE: 2039,
    CIT_NAME_EN: 'AL HAIT',
    CIT_NAME_AR: 'الحائط',
  },
  {
    CIT_CODE: 2041,
    CIT_NAME_EN: 'GHAZAL',
    CIT_NAME_AR: 'غزال',
  },
  {
    CIT_CODE: 2044,
    CIT_NAME_EN: 'AL MUWAYH AL JADID',
    CIT_NAME_AR: 'المويه الجديد',
  },
  {
    CIT_CODE: 2045,
    CIT_NAME_EN: 'ABAL',
    CIT_NAME_AR: 'عبال',
  },
  {
    CIT_CODE: 2046,
    CIT_NAME_EN: "AL JI'LAN",
    CIT_NAME_AR: 'الجعلان',
  },
  {
    CIT_CODE: 2047,
    CIT_NAME_EN: 'HALABA',
    CIT_NAME_AR: 'حلباء',
  },
  {
    CIT_CODE: 2048,
    CIT_NAME_EN: 'HADDAD',
    CIT_NAME_AR: 'حداد',
  },
  {
    CIT_CODE: 2049,
    CIT_NAME_EN: 'AS SAYL AS SAGHIR',
    CIT_NAME_AR: 'السيل الصغير',
  },
  {
    CIT_CODE: 2050,
    CIT_NAME_EN: 'RAYHAH',
    CIT_NAME_AR: 'ريحة',
  },
  {
    CIT_CODE: 2051,
    CIT_NAME_EN: "AL 'ARFA",
    CIT_NAME_AR: 'العرفاء',
  },
  {
    CIT_CODE: 2052,
    CIT_NAME_EN: 'AR RAHBAH',
    CIT_NAME_AR: 'الرحبة',
  },
  {
    CIT_CODE: 2053,
    CIT_NAME_EN: 'AL QUHAYB',
    CIT_NAME_AR: 'القهيب',
  },
  {
    CIT_CODE: 2054,
    CIT_NAME_EN: 'AL QARAN',
    CIT_NAME_AR: 'القران',
  },
  {
    CIT_CODE: 2056,
    CIT_NAME_EN: 'AS SAYL AL KABIR',
    CIT_NAME_AR: 'السيل الكبير',
  },
  {
    CIT_CODE: 2057,
    CIT_NAME_EN: 'AS SAWARQIYAH',
    CIT_NAME_AR: 'السوارفية',
  },
  {
    CIT_CODE: 2058,
    CIT_NAME_EN: 'USHAYRAH AL JADIDAH',
    CIT_NAME_AR: 'عشيرة الجديدة',
  },
  {
    CIT_CODE: 2059,
    CIT_NAME_EN: "AL 'ATIF",
    CIT_NAME_AR: 'العطيف',
  },
  {
    CIT_CODE: 2060,
    CIT_NAME_EN: 'AL QURRASHIYAT',
    CIT_NAME_AR: 'القرشيات',
  },
  {
    CIT_CODE: 2062,
    CIT_NAME_EN: 'AS SAYILAH',
    CIT_NAME_AR: 'السايلة',
  },
  {
    CIT_CODE: 2063,
    CIT_NAME_EN: "AL FIRA'",
    CIT_NAME_AR: 'الفراع',
  },
  {
    CIT_CODE: 2064,
    CIT_NAME_EN: 'AN NAJMAH',
    CIT_NAME_AR: 'النجمة',
  },
  {
    CIT_CODE: 2065,
    CIT_NAME_EN: "AL 'USMAN",
    CIT_NAME_AR: 'العصمان',
  },
  {
    CIT_CODE: 2066,
    CIT_NAME_EN: "AL 'ASID",
    CIT_NAME_AR: 'العاصد',
  },
  {
    CIT_CODE: 2067,
    CIT_NAME_EN: "AL YA'ASIB",
    CIT_NAME_AR: 'اليعاسيب',
  },
  {
    CIT_CODE: 2068,
    CIT_NAME_EN: 'ASH SHUBBAN',
    CIT_NAME_AR: 'الشبان',
  },
  {
    CIT_CODE: 2069,
    CIT_NAME_EN: "AL QANA'",
    CIT_NAME_AR: 'العنع',
  },
  {
    CIT_CODE: 2070,
    CIT_NAME_EN: 'ALTWAL',
    CIT_NAME_AR: 'الطوال',
  },
  {
    CIT_CODE: 2071,
    CIT_NAME_EN: "AL FARI'AH",
    CIT_NAME_AR: 'الفارعة',
  },
  {
    CIT_CODE: 2073,
    CIT_NAME_EN: 'AS SADD',
    CIT_NAME_AR: 'السد',
  },
  {
    CIT_CODE: 2075,
    CIT_NAME_EN: 'AL BURAH',
    CIT_NAME_AR: 'البورة',
  },
  {
    CIT_CODE: 2077,
    CIT_NAME_EN: 'RISHAN',
    CIT_NAME_AR: 'ريشان',
  },
  {
    CIT_CODE: 2078,
    CIT_NAME_EN: 'MITHAN',
    CIT_NAME_AR: 'المثان',
  },
  {
    CIT_CODE: 2079,
    CIT_NAME_EN: 'AL MANADIH',
    CIT_NAME_AR: 'المناضح',
  },
  {
    CIT_CODE: 2081,
    CIT_NAME_EN: 'AL MAJRAD',
    CIT_NAME_AR: 'المجرد',
  },
  {
    CIT_CODE: 2082,
    CIT_NAME_EN: "AL 'ATA",
    CIT_NAME_AR: 'آل عطى',
  },
  {
    CIT_CODE: 2083,
    CIT_NAME_EN: 'AS SALAQA',
    CIT_NAME_AR: 'السلاقا',
  },
  {
    CIT_CODE: 2084,
    CIT_NAME_EN: 'AL DAR AL HAMRA',
    CIT_NAME_AR: 'الدار الحمراء',
  },
  {
    CIT_CODE: 2085,
    CIT_NAME_EN: 'MARRAN',
    CIT_NAME_AR: 'مران',
  },
  {
    CIT_CODE: 2087,
    CIT_NAME_EN: 'SHAQASAN',
    CIT_NAME_AR: 'شقصان',
  },
  {
    CIT_CODE: 2088,
    CIT_NAME_EN: 'MUDALLILAH',
    CIT_NAME_AR: 'مظللة',
  },
  {
    CIT_CODE: 2089,
    CIT_NAME_EN: 'UMM AN NAKHLAH',
    CIT_NAME_AR: 'ام النخلة',
  },
  {
    CIT_CODE: 2090,
    CIT_NAME_EN: 'ADH DHIYABAT',
    CIT_NAME_AR: 'الذيابات',
  },
  {
    CIT_CODE: 2091,
    CIT_NAME_EN: 'GHAZAYIL',
    CIT_NAME_AR: 'غزايل',
  },
  {
    CIT_CODE: 2092,
    CIT_NAME_EN: 'QIYA',
    CIT_NAME_AR: 'قيا',
  },
  {
    CIT_CODE: 2093,
    CIT_NAME_EN: 'BUWA',
    CIT_NAME_AR: 'بوا',
  },
  {
    CIT_CODE: 2094,
    CIT_NAME_EN: 'ISHAYRA MAKTAN',
    CIT_NAME_AR: 'عشيرة مكتن',
  },
  {
    CIT_CODE: 2096,
    CIT_NAME_EN: 'RUMHAH',
    CIT_NAME_AR: 'رمحة',
  },
  {
    CIT_CODE: 2097,
    CIT_NAME_EN: 'AS SALAMAH',
    CIT_NAME_AR: 'السلمة',
  },
  {
    CIT_CODE: 2098,
    CIT_NAME_EN: 'HADAN',
    CIT_NAME_AR: 'حضن',
  },
  {
    CIT_CODE: 2099,
    CIT_NAME_EN: "BIR 'INN",
    CIT_NAME_AR: 'بئر عن',
  },
  {
    CIT_CODE: 2100,
    CIT_NAME_EN: 'ATH THABITIYAH',
    CIT_NAME_AR: 'الثابتية',
  },
  {
    CIT_CODE: 2102,
    CIT_NAME_EN: 'SULUBAH',
    CIT_NAME_AR: 'صلبة',
  },
  {
    CIT_CODE: 2103,
    CIT_NAME_EN: 'AL AKHADIR',
    CIT_NAME_AR: 'الاخاضر',
  },
  {
    CIT_CODE: 2104,
    CIT_NAME_EN: 'AL KHARAIQ',
    CIT_NAME_AR: 'الخرائق',
  },
  {
    CIT_CODE: 2105,
    CIT_NAME_EN: 'KULAKH',
    CIT_NAME_AR: 'كلاخ',
  },
  {
    CIT_CODE: 2106,
    CIT_NAME_EN: 'ZUBAIDAH',
    CIT_NAME_AR: 'زبيدة',
  },
  {
    CIT_CODE: 2107,
    CIT_NAME_EN: "ZA'FARAN",
    CIT_NAME_AR: 'زعفران',
  },
  {
    CIT_CODE: 2108,
    CIT_NAME_EN: 'MARFUD',
    CIT_NAME_AR: 'مرفوض',
  },
  {
    CIT_CODE: 2109,
    CIT_NAME_EN: 'AL QUDAIFAH',
    CIT_NAME_AR: 'القضيفة',
  },
  {
    CIT_CODE: 2110,
    CIT_NAME_EN: 'BISIL',
    CIT_NAME_AR: 'بسل',
  },
  {
    CIT_CODE: 2111,
    CIT_NAME_EN: 'AS SUDAYRAH',
    CIT_NAME_AR: 'السديرة',
  },
  {
    CIT_CODE: 2112,
    CIT_NAME_EN: "AL MA'QIR",
    CIT_NAME_AR: 'المعقر',
  },
  {
    CIT_CODE: 2113,
    CIT_NAME_EN: 'AT TUFLAN',
    CIT_NAME_AR: 'الطفلان',
  },
  {
    CIT_CODE: 2114,
    CIT_NAME_EN: 'AS SUFAH',
    CIT_NAME_AR: 'الصفاة',
  },
  {
    CIT_CODE: 2116,
    CIT_NAME_EN: 'AL JADIR',
    CIT_NAME_AR: 'الجدير',
  },
  {
    CIT_CODE: 2118,
    CIT_NAME_EN: 'AL HAWTAH',
    CIT_NAME_AR: 'الحوطة',
  },
  {
    CIT_CODE: 2119,
    CIT_NAME_EN: 'JUWAIRAH',
    CIT_NAME_AR: 'جويرة',
  },
  {
    CIT_CODE: 2120,
    CIT_NAME_EN: 'AT TUFAYHA',
    CIT_NAME_AR: 'الطفيحاء',
  },
  {
    CIT_CODE: 2121,
    CIT_NAME_EN: 'JUSH',
    CIT_NAME_AR: 'جوش',
  },
  {
    CIT_CODE: 2122,
    CIT_NAME_EN: 'AL QAHUM',
    CIT_NAME_AR: 'القحوم',
  },
  {
    CIT_CODE: 2124,
    CIT_NAME_EN: 'AL HAMRA',
    CIT_NAME_AR: 'الحمراء',
  },
  {
    CIT_CODE: 2126,
    CIT_NAME_EN: 'AL LIBBAH',
    CIT_NAME_AR: 'اللبة',
  },
  {
    CIT_CODE: 2127,
    CIT_NAME_EN: "AL QARI'",
    CIT_NAME_AR: 'القريع',
  },
  {
    CIT_CODE: 2128,
    CIT_NAME_EN: "ASH SHA'A'IB",
    CIT_NAME_AR: 'الشعاعيب',
  },
  {
    CIT_CODE: 2129,
    CIT_NAME_EN: 'MAYSAN',
    CIT_NAME_AR: 'ميسان',
  },
  {
    CIT_CODE: 2130,
    CIT_NAME_EN: 'QAHA',
    CIT_NAME_AR: 'قها',
  },
  {
    CIT_CODE: 2131,
    CIT_NAME_EN: 'BARAHRAH',
    CIT_NAME_AR: 'برحرح',
  },
  {
    CIT_CODE: 2132,
    CIT_NAME_EN: 'AS SUR',
    CIT_NAME_AR: 'الصور',
  },
  {
    CIT_CODE: 2133,
    CIT_NAME_EN: 'ABU RAKAH',
    CIT_NAME_AR: 'ابو راكة',
  },
  {
    CIT_CODE: 2134,
    CIT_NAME_EN: "AL FURAY'",
    CIT_NAME_AR: 'الفريع',
  },
  {
    CIT_CODE: 2138,
    CIT_NAME_EN: 'DHAWWAD',
    CIT_NAME_AR: 'ذواد',
  },
  {
    CIT_CODE: 2139,
    CIT_NAME_EN: 'AL MABRAK',
    CIT_NAME_AR: 'المبرك',
  },
  {
    CIT_CODE: 2140,
    CIT_NAME_EN: "AL 'ILAWAH",
    CIT_NAME_AR: 'العلاوة',
  },
  {
    CIT_CODE: 2141,
    CIT_NAME_EN: 'AL HAIRIYAH',
    CIT_NAME_AR: 'الحائرية',
  },
  {
    CIT_CODE: 2142,
    CIT_NAME_EN: "DU'AYMIR",
    CIT_NAME_AR: 'دعيمر',
  },
  {
    CIT_CODE: 2143,
    CIT_NAME_EN: "WUSA'AD",
    CIT_NAME_AR: 'وساعد',
  },
  {
    CIT_CODE: 2144,
    CIT_NAME_EN: 'AL MIDARAH',
    CIT_NAME_AR: 'المدرة',
  },
  {
    CIT_CODE: 2145,
    CIT_NAME_EN: 'AD DAYYIRAH',
    CIT_NAME_AR: 'الديرة',
  },
  {
    CIT_CODE: 2148,
    CIT_NAME_EN: "AL 'ILABAH",
    CIT_NAME_AR: 'العلبة',
  },
  {
    CIT_CODE: 2149,
    CIT_NAME_EN: "AL 'ABISIYAH",
    CIT_NAME_AR: 'العابسية',
  },
  {
    CIT_CODE: 2150,
    CIT_NAME_EN: "AL 'IRQAYN",
    CIT_NAME_AR: 'العرقين',
  },
  {
    CIT_CODE: 2151,
    CIT_NAME_EN: 'AL GHARMUL',
    CIT_NAME_AR: 'الغرمول',
  },
  {
    CIT_CODE: 2152,
    CIT_NAME_EN: "AL 'ISALAH",
    CIT_NAME_AR: 'العصلة',
  },
  {
    CIT_CODE: 2153,
    CIT_NAME_EN: 'ZALLAQAH',
    CIT_NAME_AR: 'زلاقة',
  },
  {
    CIT_CODE: 2154,
    CIT_NAME_EN: 'AL HASHAFAH',
    CIT_NAME_AR: 'الحشفة',
  },
  {
    CIT_CODE: 2155,
    CIT_NAME_EN: 'ABU MADHALLAH',
    CIT_NAME_AR: 'ابو مظلة',
  },
  {
    CIT_CODE: 2157,
    CIT_NAME_EN: 'AL HASHRAJ',
    CIT_NAME_AR: 'الحشرج',
  },
  {
    CIT_CODE: 2158,
    CIT_NAME_EN: "SHI'R",
    CIT_NAME_AR: 'شعر',
  },
  {
    CIT_CODE: 2159,
    CIT_NAME_EN: "AR RABI'IYAH",
    CIT_NAME_AR: 'الربيعية',
  },
  {
    CIT_CODE: 2160,
    CIT_NAME_EN: 'BIR IBN RASHDAN',
    CIT_NAME_AR: 'بئر ابن رشدان',
  },
  {
    CIT_CODE: 2161,
    CIT_NAME_EN: 'AL QUDAYH',
    CIT_NAME_AR: 'القديح',
  },
  {
    CIT_CODE: 2162,
    CIT_NAME_EN: 'AL KHUWILDIYAH',
    CIT_NAME_AR: 'الخويلدية',
  },
  {
    CIT_CODE: 2163,
    CIT_NAME_EN: 'AD DURAIDY',
    CIT_NAME_AR: 'الدريدي',
  },
  {
    CIT_CODE: 2164,
    CIT_NAME_EN: 'AL KHATRASHIYAH',
    CIT_NAME_AR: 'الخترشية',
  },
  {
    CIT_CODE: 2165,
    CIT_NAME_EN: "ABU MA'AN",
    CIT_NAME_AR: 'ابو معن',
  },
  {
    CIT_CODE: 2166,
    CIT_NAME_EN: 'UMM AS SAHIK',
    CIT_NAME_AR: 'ام الساهك',
  },
  {
    CIT_CODE: 2168,
    CIT_NAME_EN: 'HAZAM UMM AS SAHIK',
    CIT_NAME_AR: 'حزم ام الساهك',
  },
  {
    CIT_CODE: 2169,
    CIT_NAME_EN: 'AL FARSH',
    CIT_NAME_AR: 'الفرش',
  },
  {
    CIT_CODE: 2170,
    CIT_NAME_EN: 'AL JISH',
    CIT_NAME_AR: 'الجش',
  },
  {
    CIT_CODE: 2172,
    CIT_NAME_EN: 'HILAT MUHISH',
    CIT_NAME_AR: 'حلة محيش',
  },
  {
    CIT_CODE: 2173,
    CIT_NAME_EN: 'AT TUBI',
    CIT_NAME_AR: 'التوبي',
  },
  {
    CIT_CODE: 2174,
    CIT_NAME_EN: 'AL MILAHAH',
    CIT_NAME_AR: 'الملاحة',
  },
  {
    CIT_CODE: 2175,
    CIT_NAME_EN: "AL 'USAYLI",
    CIT_NAME_AR: 'العصيلي',
  },
  {
    CIT_CODE: 2177,
    CIT_NAME_EN: "AL 'AWWAMIYAH",
    CIT_NAME_AR: 'العوامية',
  },
  {
    CIT_CODE: 2178,
    CIT_NAME_EN: 'AN NABIYAH',
    CIT_NAME_AR: 'النابية',
  },
  {
    CIT_CODE: 2179,
    CIT_NAME_EN: 'AZ ZAWR',
    CIT_NAME_AR: 'الزور',
  },
  {
    CIT_CODE: 2182,
    CIT_NAME_EN: "SHARAI' AL MUJAHIDIN",
    CIT_NAME_AR: 'شرائع المجاهدين',
  },
  {
    CIT_CODE: 2183,
    CIT_NAME_EN: "AT TAN'IM",
    CIT_NAME_AR: 'التنعيم',
  },
  {
    CIT_CODE: 2185,
    CIT_NAME_EN: "ASH SHARAI'",
    CIT_NAME_AR: 'الشرائع',
  },
  {
    CIT_CODE: 2186,
    CIT_NAME_EN: 'AR RAYJAH',
    CIT_NAME_AR: 'الريجة',
  },
  {
    CIT_CODE: 2187,
    CIT_NAME_EN: "QABIL 'IFAN",
    CIT_NAME_AR: 'قابل عيفان',
  },
  {
    CIT_CODE: 2188,
    CIT_NAME_EN: 'BANI UMAYR',
    CIT_NAME_AR: 'بني عمير',
  },
  {
    CIT_CODE: 2189,
    CIT_NAME_EN: 'AL BIJAYDI',
    CIT_NAME_AR: 'البجيدي',
  },
  {
    CIT_CODE: 2190,
    CIT_NAME_EN: 'QURA AS SADR',
    CIT_NAME_AR: 'قرى الصدر',
  },
  {
    CIT_CODE: 2192,
    CIT_NAME_EN: 'AL MAJARISH',
    CIT_NAME_AR: 'المجاريش',
  },
  {
    CIT_CODE: 2193,
    CIT_NAME_EN: 'AL HASAN',
    CIT_NAME_AR: 'الحسن',
  },
  {
    CIT_CODE: 80000,
    CIT_NAME_EN: 'TEST',
    CIT_NAME_AR: null,
  },
  {
    CIT_CODE: 3288,
    CIT_NAME_EN: 'AL FUHAYD',
    CIT_NAME_AR: 'آل فهيد',
  },
  {
    CIT_CODE: 3290,
    CIT_NAME_EN: 'AL SUNAYJ',
    CIT_NAME_AR: 'آل صنيج',
  },
  {
    CIT_CODE: 3291,
    CIT_NAME_EN: "AL 'URFAN",
    CIT_NAME_AR: 'آل عرفان',
  },
  {
    CIT_CODE: 3292,
    CIT_NAME_EN: 'AL KUSHAYM',
    CIT_NAME_AR: 'آل كشيم',
  },
  {
    CIT_CODE: 3293,
    CIT_NAME_EN: 'AL HADHYAN',
    CIT_NAME_AR: 'الحذيان',
  },
  {
    CIT_CODE: 3294,
    CIT_NAME_EN: "AL 'URFAN",
    CIT_NAME_AR: 'العرفان',
  },
  {
    CIT_CODE: 3295,
    CIT_NAME_EN: 'HAFIDH',
    CIT_NAME_AR: 'حافظ',
  },
  {
    CIT_CODE: 3296,
    CIT_NAME_EN: "AL 'ULUBI",
    CIT_NAME_AR: 'العلوبي',
  },
  {
    CIT_CODE: 3297,
    CIT_NAME_EN: 'AR RUMADAH',
    CIT_NAME_AR: 'الرمضة',
  },
  {
    CIT_CODE: 3298,
    CIT_NAME_EN: 'AL-AREEN',
    CIT_NAME_AR: 'العرين',
  },
  {
    CIT_CODE: 3299,
    CIT_NAME_EN: 'TURAIB',
    CIT_NAME_AR: 'فرعة طريب',
  },
  {
    CIT_CODE: 3300,
    CIT_NAME_EN: 'AZ ZAHRAH',
    CIT_NAME_AR: 'الزهرة',
  },
  {
    CIT_CODE: 3301,
    CIT_NAME_EN: "AL MA'ADDI",
    CIT_NAME_AR: 'آل معدي',
  },
  {
    CIT_CODE: 3302,
    CIT_NAME_EN: 'AL GHILIQAH',
    CIT_NAME_AR: 'الغلقة',
  },
  {
    CIT_CODE: 3303,
    CIT_NAME_EN: 'AL JILDAH',
    CIT_NAME_AR: 'الجلدة',
  },
  {
    CIT_CODE: 3304,
    CIT_NAME_EN: 'AL QUNBAH',
    CIT_NAME_AR: 'آل قنبة',
  },
  {
    CIT_CODE: 3305,
    CIT_NAME_EN: "AR RIBA'AH",
    CIT_NAME_AR: 'الربعة',
  },
  {
    CIT_CODE: 3306,
    CIT_NAME_EN: 'AL WAHABAH',
    CIT_NAME_AR: 'الوهابة',
  },
  {
    CIT_CODE: 3307,
    CIT_NAME_EN: "AL SA'IDAH",
    CIT_NAME_AR: 'آل سعيدة',
  },
  {
    CIT_CODE: 3308,
    CIT_NAME_EN: 'AL KULAT',
    CIT_NAME_AR: 'آل كولت',
  },
  {
    CIT_CODE: 3309,
    CIT_NAME_EN: 'AL JALLAL',
    CIT_NAME_AR: 'آل جلال',
  },
  {
    CIT_CODE: 3310,
    CIT_NAME_EN: 'AL MIHI',
    CIT_NAME_AR: 'آل محي',
  },
  {
    CIT_CODE: 3312,
    CIT_NAME_EN: 'AL HUNJUR',
    CIT_NAME_AR: 'الحنجور',
  },
  {
    CIT_CODE: 3314,
    CIT_NAME_EN: 'AL MANABIYAH',
    CIT_NAME_AR: 'المنابية',
  },
  {
    CIT_CODE: 3315,
    CIT_NAME_EN: 'AZ ZUHAYD',
    CIT_NAME_AR: 'الزهيد',
  },
  {
    CIT_CODE: 3316,
    CIT_NAME_EN: 'AL MUHAZMAH',
    CIT_NAME_AR: 'المحزمة',
  },
  {
    CIT_CODE: 3317,
    CIT_NAME_EN: 'AD DARBAYN',
    CIT_NAME_AR: 'الدربين',
  },
  {
    CIT_CODE: 3318,
    CIT_NAME_EN: "ASH SHA'AQAH",
    CIT_NAME_AR: 'الشعاقة',
  },
  {
    CIT_CODE: 3321,
    CIT_NAME_EN: 'DIRAMAH',
    CIT_NAME_AR: 'درامة',
  },
  {
    CIT_CODE: 3322,
    CIT_NAME_EN: 'AL AL KHALAF',
    CIT_NAME_AR: 'آل الخلف',
  },
  {
    CIT_CODE: 3323,
    CIT_NAME_EN: "AL MANI'",
    CIT_NAME_AR: 'آل مانع',
  },
  {
    CIT_CODE: 3324,
    CIT_NAME_EN: "NAQ'AH",
    CIT_NAME_AR: 'نقعة',
  },
  {
    CIT_CODE: 3325,
    CIT_NAME_EN: 'AL GHUBRAN',
    CIT_NAME_AR: 'آل غبران',
  },
  {
    CIT_CODE: 3326,
    CIT_NAME_EN: "AL FUQA'IS",
    CIT_NAME_AR: 'الفقاعيس',
  },
  {
    CIT_CODE: 3331,
    CIT_NAME_EN: 'AR RABUAH',
    CIT_NAME_AR: 'الربوعة',
  },
  {
    CIT_CODE: 3333,
    CIT_NAME_EN: 'ARDAYN',
    CIT_NAME_AR: 'عرضين',
  },
  {
    CIT_CODE: 3334,
    CIT_NAME_EN: 'UMM AL WHAHT',
    CIT_NAME_AR: 'ام الوهط',
  },
  {
    CIT_CODE: 3335,
    CIT_NAME_EN: 'AL MINKHALI',
    CIT_NAME_AR: 'المنخلي',
  },
  {
    CIT_CODE: 3336,
    CIT_NAME_EN: 'KHAD QAYS',
    CIT_NAME_AR: 'خد قيس',
  },
  {
    CIT_CODE: 3338,
    CIT_NAME_EN: 'TIRIMAH',
    CIT_NAME_AR: 'تريمة',
  },
  {
    CIT_CODE: 3339,
    CIT_NAME_EN: 'ADH DHAHIRAH',
    CIT_NAME_AR: 'الظاهرة',
  },
  {
    CIT_CODE: 3340,
    CIT_NAME_EN: 'RUDAYYAH',
    CIT_NAME_AR: 'رضية',
  },
  {
    CIT_CODE: 3341,
    CIT_NAME_EN: 'HAZAMAH',
    CIT_NAME_AR: 'حزامة',
  },
  {
    CIT_CODE: 3342,
    CIT_NAME_EN: 'BADR AL JANUB',
    CIT_NAME_AR: 'بدر الجنوب',
  },
  {
    CIT_CODE: 3343,
    CIT_NAME_EN: 'AL HARSHAF',
    CIT_NAME_AR: 'الحرشف',
  },
  {
    CIT_CODE: 3344,
    CIT_NAME_EN: 'HADADAH',
    CIT_NAME_AR: 'هدادة',
  },
  {
    CIT_CODE: 3345,
    CIT_NAME_EN: 'AL KHANIQ',
    CIT_NAME_AR: 'الخانق',
  },
  {
    CIT_CODE: 3346,
    CIT_NAME_EN: 'AL JIFAH',
    CIT_NAME_AR: 'الجفة',
  },
  {
    CIT_CODE: 3348,
    CIT_NAME_EN: 'SHIQQAT AL KANAWIR',
    CIT_NAME_AR: 'شقة الكناور',
  },
  {
    CIT_CODE: 3349,
    CIT_NAME_EN: 'AT TAMANI',
    CIT_NAME_AR: 'التماني',
  },
  {
    CIT_CODE: 3352,
    CIT_NAME_EN: 'SHAYBAT MISWARAH',
    CIT_NAME_AR: 'شيبة مسورة',
  },
  {
    CIT_CODE: 3353,
    CIT_NAME_EN: 'AL THABIT',
    CIT_NAME_AR: 'آل ثابت',
  },
  {
    CIT_CODE: 3354,
    CIT_NAME_EN: 'AL JIRBAH',
    CIT_NAME_AR: 'الجربة',
  },
  {
    CIT_CODE: 3356,
    CIT_NAME_EN: "AL MAJZA'AH",
    CIT_NAME_AR: 'المجزعة',
  },
  {
    CIT_CODE: 3357,
    CIT_NAME_EN: "AL 'ALYA",
    CIT_NAME_AR: 'آل عليا',
  },
  {
    CIT_CODE: 3358,
    CIT_NAME_EN: 'AL BAYDA',
    CIT_NAME_AR: 'آل بيضاء',
  },
  {
    CIT_CODE: 3359,
    CIT_NAME_EN: "AL MU'AMMAR",
    CIT_NAME_AR: 'آل معمر',
  },
  {
    CIT_CODE: 3361,
    CIT_NAME_EN: 'AL HAJIR',
    CIT_NAME_AR: 'الحاجر',
  },
  {
    CIT_CODE: 3363,
    CIT_NAME_EN: 'AL MALTA',
    CIT_NAME_AR: 'الملطاء',
  },
  {
    CIT_CODE: 3365,
    CIT_NAME_EN: 'AL MIJAZAH',
    CIT_NAME_AR: 'المجازة',
  },
  {
    CIT_CODE: 3366,
    CIT_NAME_EN: 'BIN LAKRAM',
    CIT_NAME_AR: 'بن لكرم',
  },
  {
    CIT_CODE: 3367,
    CIT_NAME_EN: 'AS SALATIN',
    CIT_NAME_AR: 'السلاطين',
  },
  {
    CIT_CODE: 3368,
    CIT_NAME_EN: 'AL MAHJAR',
    CIT_NAME_AR: 'المحجر',
  },
  {
    CIT_CODE: 3369,
    CIT_NAME_EN: 'AL WASAT',
    CIT_NAME_AR: 'الوسط',
  },
  {
    CIT_CODE: 3371,
    CIT_NAME_EN: "AL AL ASH'ATH",
    CIT_NAME_AR: 'آل الأشعث',
  },
  {
    CIT_CODE: 3372,
    CIT_NAME_EN: "AL 'ANTHARI",
    CIT_NAME_AR: 'العنثري',
  },
  {
    CIT_CODE: 3373,
    CIT_NAME_EN: "AL 'IMRAN",
    CIT_NAME_AR: 'آل عمران',
  },
  {
    CIT_CODE: 3374,
    CIT_NAME_EN: 'AL JIHALI',
    CIT_NAME_AR: 'آل جحالي',
  },
  {
    CIT_CODE: 3376,
    CIT_NAME_EN: 'DIHIR',
    CIT_NAME_AR: 'دهر',
  },
  {
    CIT_CODE: 3379,
    CIT_NAME_EN: 'ALLAF',
    CIT_NAME_AR: 'علاف',
  },
  {
    CIT_CODE: 3380,
    CIT_NAME_EN: "AL YA'LA",
    CIT_NAME_AR: 'آل يعلى',
  },
  {
    CIT_CODE: 3381,
    CIT_NAME_EN: 'ZAHRAN AL-JANOUB',
    CIT_NAME_AR: 'ظهران الجنوب',
  },
  {
    CIT_CODE: 3383,
    CIT_NAME_EN: 'AL HARAJAH',
    CIT_NAME_AR: 'الحرجه',
  },
  {
    CIT_CODE: 3384,
    CIT_NAME_EN: 'AL KULAH',
    CIT_NAME_AR: 'الكولة',
  },
  {
    CIT_CODE: 3386,
    CIT_NAME_EN: 'HUMRAN',
    CIT_NAME_AR: 'حمران',
  },
  {
    CIT_CODE: 3387,
    CIT_NAME_EN: 'AL LAHWAH',
    CIT_NAME_AR: 'آل لهوة',
  },
  {
    CIT_CODE: 3388,
    CIT_NAME_EN: 'AL HUWAYMIL',
    CIT_NAME_AR: 'الهويمل',
  },
  {
    CIT_CODE: 3389,
    CIT_NAME_EN: 'BIR KHUBASH',
    CIT_NAME_AR: 'بئر خباش',
  },
  {
    CIT_CODE: 3391,
    CIT_NAME_EN: 'QABIL MINIF',
    CIT_NAME_AR: 'قابل منيف',
  },
  {
    CIT_CODE: 3392,
    CIT_NAME_EN: 'AL HAWID',
    CIT_NAME_AR: 'الهويد',
  },
  {
    CIT_CODE: 3394,
    CIT_NAME_EN: 'AD DAWAS',
    CIT_NAME_AR: 'الدواس',
  },
  {
    CIT_CODE: 3395,
    CIT_NAME_EN: 'LAHUMAH',
    CIT_NAME_AR: 'لاهومة',
  },
  {
    CIT_CODE: 3396,
    CIT_NAME_EN: 'HBOUNA',
    CIT_NAME_AR: 'حبونا',
  },
  {
    CIT_CODE: 3398,
    CIT_NAME_EN: 'QARAR',
    CIT_NAME_AR: 'قرار',
  },
  {
    CIT_CODE: 3399,
    CIT_NAME_EN: 'AL KADARAH',
    CIT_NAME_AR: 'الكدارة',
  },
  {
    CIT_CODE: 3400,
    CIT_NAME_EN: 'AL HAJANBAH',
    CIT_NAME_AR: 'الهجنبة',
  },
  {
    CIT_CODE: 3403,
    CIT_NAME_EN: 'ABU AS SADAD',
    CIT_NAME_AR: 'ابو السداد',
  },
  {
    CIT_CODE: 3405,
    CIT_NAME_EN: 'AL HURUF',
    CIT_NAME_AR: 'الحروف',
  },
  {
    CIT_CODE: 3406,
    CIT_NAME_EN: 'ITWAD',
    CIT_NAME_AR: 'عتود',
  },
  {
    CIT_CODE: 3407,
    CIT_NAME_EN: 'RAMLAN',
    CIT_NAME_AR: 'رملان',
  },
  {
    CIT_CODE: 3408,
    CIT_NAME_EN: 'AL MINJARAH',
    CIT_NAME_AR: 'المنجارة',
  },
  {
    CIT_CODE: 3409,
    CIT_NAME_EN: 'AD DAWLAH',
    CIT_NAME_AR: 'الدولة',
  },
  {
    CIT_CODE: 3410,
    CIT_NAME_EN: 'MISLIYAH',
    CIT_NAME_AR: 'مسلية',
  },
  {
    CIT_CODE: 3411,
    CIT_NAME_EN: 'AL-FTEHAH',
    CIT_NAME_AR: 'الفطيحة',
  },
  {
    CIT_CODE: 3413,
    CIT_NAME_EN: "MA'MAR RIMAN",
    CIT_NAME_AR: 'معمر ريمان',
  },
  {
    CIT_CODE: 3414,
    CIT_NAME_EN: 'DAWWAH',
    CIT_NAME_AR: 'دوح',
  },
  {
    CIT_CODE: 3415,
    CIT_NAME_EN: "AN NAQ'A",
    CIT_NAME_AR: 'النقعاء',
  },
  {
    CIT_CODE: 3418,
    CIT_NAME_EN: "BI'R 'ASKAR",
    CIT_NAME_AR: 'بئر عسكر',
  },
  {
    CIT_CODE: 3419,
    CIT_NAME_EN: 'NAHUQAH',
    CIT_NAME_AR: 'نهوقة',
  },
  {
    CIT_CODE: 3420,
    CIT_NAME_EN: 'AL SHAHI',
    CIT_NAME_AR: 'ال شهي',
  },
  {
    CIT_CODE: 3421,
    CIT_NAME_EN: "RIJLA'",
    CIT_NAME_AR: 'رجلاء',
  },
  {
    CIT_CODE: 3422,
    CIT_NAME_EN: 'ALSUWAR',
    CIT_NAME_AR: 'آل سوار',
  },
  {
    CIT_CODE: 3426,
    CIT_NAME_EN: 'RAKHYAH',
    CIT_NAME_AR: 'رخية',
  },
  {
    CIT_CODE: 3427,
    CIT_NAME_EN: 'AL-RETH',
    CIT_NAME_AR: 'الريث',
  },
  {
    CIT_CODE: 3429,
    CIT_NAME_EN: 'ATHWAN',
    CIT_NAME_AR: 'عثوان',
  },
  {
    CIT_CODE: 3430,
    CIT_NAME_EN: "AL QA'QA'",
    CIT_NAME_AR: 'القعقاع',
  },
  {
    CIT_CODE: 3431,
    CIT_NAME_EN: 'ASH SHAMLAH',
    CIT_NAME_AR: 'الشملاة',
  },
  {
    CIT_CODE: 3432,
    CIT_NAME_EN: 'AS SUHAYYAH',
    CIT_NAME_AR: 'السهية',
  },
  {
    CIT_CODE: 3435,
    CIT_NAME_EN: 'AL HINNAYAH',
    CIT_NAME_AR: 'الحناية',
  },
  {
    CIT_CODE: 3436,
    CIT_NAME_EN: "AN NAFI'AH",
    CIT_NAME_AR: 'النفيعة',
  },
  {
    CIT_CODE: 3437,
    CIT_NAME_EN: 'ZAWZA',
    CIT_NAME_AR: 'زوزاء',
  },
  {
    CIT_CODE: 3438,
    CIT_NAME_EN: 'AR RUKBAH',
    CIT_NAME_AR: 'الركبة',
  },
  {
    CIT_CODE: 3439,
    CIT_NAME_EN: "AL 'IZZAH",
    CIT_NAME_AR: 'العزة',
  },
  {
    CIT_CODE: 3440,
    CIT_NAME_EN: "KHUWAY'IMAH",
    CIT_NAME_AR: 'خويعمة',
  },
  {
    CIT_CODE: 3441,
    CIT_NAME_EN: 'AD DIKARAH',
    CIT_NAME_AR: 'الدخرة',
  },
  {
    CIT_CODE: 3442,
    CIT_NAME_EN: 'AL KHASHAH',
    CIT_NAME_AR: 'الخشعة',
  },
  {
    CIT_CODE: 3443,
    CIT_NAME_EN: 'AL KAWABISAR',
    CIT_NAME_AR: 'الكوابسة',
  },
  {
    CIT_CODE: 3444,
    CIT_NAME_EN: 'AL HAYJA',
    CIT_NAME_AR: 'الهيجاء',
  },
  {
    CIT_CODE: 3445,
    CIT_NAME_EN: 'AL YAMANIYAH',
    CIT_NAME_AR: 'اليمانية',
  },
  {
    CIT_CODE: 3446,
    CIT_NAME_EN: 'FIFAA',
    CIT_NAME_AR: 'فيفاء',
  },
  {
    CIT_CODE: 3447,
    CIT_NAME_EN: 'AL-DAAER',
    CIT_NAME_AR: 'الدائر',
  },
  {
    CIT_CODE: 3450,
    CIT_NAME_EN: 'DHAHIRAT AS SAFA',
    CIT_NAME_AR: 'ظاهرة الصفا',
  },
  {
    CIT_CODE: 3452,
    CIT_NAME_EN: 'AL QATAB',
    CIT_NAME_AR: 'القتب',
  },
  {
    CIT_CODE: 3453,
    CIT_NAME_EN: 'AL HIYAJ',
    CIT_NAME_AR: 'الهياج',
  },
  {
    CIT_CODE: 3455,
    CIT_NAME_EN: 'AL-EYADBI',
    CIT_NAME_AR: 'العيدابي',
  },
  {
    CIT_CODE: 3456,
    CIT_NAME_EN: "MUQZA'",
    CIT_NAME_AR: 'مقزع',
  },
  {
    CIT_CODE: 3457,
    CIT_NAME_EN: 'HARUB',
    CIT_NAME_AR: 'هروب',
  },
  {
    CIT_CODE: 3458,
    CIT_NAME_EN: "ASH SHARI'AH",
    CIT_NAME_AR: 'الشريعة',
  },
  {
    CIT_CODE: 3459,
    CIT_NAME_EN: 'AL HAJRUF',
    CIT_NAME_AR: 'الحجروف',
  },
  {
    CIT_CODE: 3460,
    CIT_NAME_EN: 'NURAH',
    CIT_NAME_AR: 'نورة',
  },
  {
    CIT_CODE: 3464,
    CIT_NAME_EN: 'QOUZ AL JAAFRAH',
    CIT_NAME_AR: 'قوز الجعافره',
  },
  {
    CIT_CODE: 3465,
    CIT_NAME_EN: 'AL HAQU',
    CIT_NAME_AR: 'الحقو',
  },
  {
    CIT_CODE: 3466,
    CIT_NAME_EN: 'AL QUWAM',
    CIT_NAME_AR: 'القوام',
  },
  {
    CIT_CODE: 3468,
    CIT_NAME_EN: "AL 'ADDAYAH",
    CIT_NAME_AR: 'العداية',
  },
  {
    CIT_CODE: 3469,
    CIT_NAME_EN: 'AL BAHIR',
    CIT_NAME_AR: 'الباحر',
  },
  {
    CIT_CODE: 3470,
    CIT_NAME_EN: "AL MU'TARID",
    CIT_NAME_AR: 'المعترض',
  },
  {
    CIT_CODE: 3471,
    CIT_NAME_EN: 'NAKHLAN',
    CIT_NAME_AR: 'نخلان',
  },
  {
    CIT_CODE: 3472,
    CIT_NAME_EN: 'AL GHARA',
    CIT_NAME_AR: 'الغرا',
  },
  {
    CIT_CODE: 3473,
    CIT_NAME_EN: "AL 'ABADILAH",
    CIT_NAME_AR: 'العبادلة',
  },
  {
    CIT_CODE: 3474,
    CIT_NAME_EN: "AL 'ARISH",
    CIT_NAME_AR: 'العريش',
  },
  {
    CIT_CODE: 3475,
    CIT_NAME_EN: 'MUSHALLAHAH',
    CIT_NAME_AR: 'مشلحة',
  },
  {
    CIT_CODE: 3476,
    CIT_NAME_EN: 'AR RAYIGHAH',
    CIT_NAME_AR: 'الرايغة',
  },
  {
    CIT_CODE: 3477,
    CIT_NAME_EN: 'AL MALHA',
    CIT_NAME_AR: 'الملحاة',
  },
  {
    CIT_CODE: 3478,
    CIT_NAME_EN: 'AD DAHNA',
    CIT_NAME_AR: 'الدهناء',
  },
  {
    CIT_CODE: 3480,
    CIT_NAME_EN: "QA'IM AD DASHSH",
    CIT_NAME_AR: 'قائم الدش',
  },
  {
    CIT_CODE: 3481,
    CIT_NAME_EN: 'SABYA AL JADIDAH',
    CIT_NAME_AR: 'صبيا الجديدة',
  },
  {
    CIT_CODE: 3482,
    CIT_NAME_EN: 'AL KUDMI',
    CIT_NAME_AR: 'الكدمي',
  },
  {
    CIT_CODE: 3484,
    CIT_NAME_EN: "AS SALAM AL 'ULYA",
    CIT_NAME_AR: 'السلام العليا',
  },
  {
    CIT_CODE: 3485,
    CIT_NAME_EN: "ABU ALQA'AYID",
    CIT_NAME_AR: 'ابو القعايد',
  },
  {
    CIT_CODE: 3486,
    CIT_NAME_EN: "ABU AS SALA'",
    CIT_NAME_AR: 'ابو السلع',
  },
  {
    CIT_CODE: 3487,
    CIT_NAME_EN: "AL 'ALIYAH",
    CIT_NAME_AR: 'العالية',
  },
  {
    CIT_CODE: 3488,
    CIT_NAME_EN: 'GHAWWAN',
    CIT_NAME_AR: 'غوان',
  },
  {
    CIT_CODE: 3489,
    CIT_NAME_EN: 'AL HUSAYNI',
    CIT_NAME_AR: 'الحسيني',
  },
  {
    CIT_CODE: 3490,
    CIT_NAME_EN: 'AL DHABYAH',
    CIT_NAME_AR: 'الظبية',
  },
  {
    CIT_CODE: 3491,
    CIT_NAME_EN: 'AL JAMMALAH',
    CIT_NAME_AR: 'الجمالة',
  },
  {
    CIT_CODE: 3492,
    CIT_NAME_EN: 'AL SABAKHAH',
    CIT_NAME_AR: 'السبخة',
  },
  {
    CIT_CODE: 3494,
    CIT_NAME_EN: "KHABT SA'IDAH",
    CIT_NAME_AR: 'خبت سعيدة',
  },
  {
    CIT_CODE: 3495,
    CIT_NAME_EN: 'AL HIMA',
    CIT_NAME_AR: 'الحمي',
  },
  {
    CIT_CODE: 3497,
    CIT_NAME_EN: 'AL JAHW',
    CIT_NAME_AR: 'الجهو',
  },
  {
    CIT_CODE: 3498,
    CIT_NAME_EN: 'AL QAMRI',
    CIT_NAME_AR: 'القمري',
  },
  {
    CIT_CODE: 3499,
    CIT_NAME_EN: 'DMD',
    CIT_NAME_AR: 'ضمد',
  },
  {
    CIT_CODE: 3500,
    CIT_NAME_EN: 'AL KHUDAYRAH',
    CIT_NAME_AR: 'الخضيرة',
  },
  {
    CIT_CODE: 3502,
    CIT_NAME_EN: 'ZABARAT RASHID',
    CIT_NAME_AR: 'زبارة رشيد',
  },
  {
    CIT_CODE: 3503,
    CIT_NAME_EN: 'QANBURA',
    CIT_NAME_AR: 'قنبورة',
  },
  {
    CIT_CODE: 3504,
    CIT_NAME_EN: 'BHRAH',
    CIT_NAME_AR: 'بحرة',
  },
  {
    CIT_CODE: 3505,
    CIT_NAME_EN: 'AL QAIM',
    CIT_NAME_AR: 'القائم',
  },
  {
    CIT_CODE: 3506,
    CIT_NAME_EN: 'AL MUHSAM',
    CIT_NAME_AR: 'المحصام',
  },
  {
    CIT_CODE: 3507,
    CIT_NAME_EN: 'AL HAJAJAH',
    CIT_NAME_AR: 'الحجاجة',
  },
  {
    CIT_CODE: 3509,
    CIT_NAME_EN: 'AS SADILIYAH',
    CIT_NAME_AR: 'السادلية',
  },
  {
    CIT_CODE: 3510,
    CIT_NAME_EN: 'MURAYKHIYAH',
    CIT_NAME_AR: 'مريخية',
  },
  {
    CIT_CODE: 3511,
    CIT_NAME_EN: "AL 'ARUS",
    CIT_NAME_AR: 'العروس',
  },
  {
    CIT_CODE: 3512,
    CIT_NAME_EN: 'AL KHUZNAH',
    CIT_NAME_AR: 'الخزنة',
  },
  {
    CIT_CODE: 3513,
    CIT_NAME_EN: "AL 'USAYLAH",
    CIT_NAME_AR: 'العسيلة',
  },
  {
    CIT_CODE: 3514,
    CIT_NAME_EN: 'SADD MALAKI',
    CIT_NAME_AR: 'سد ملاكي',
  },
  {
    CIT_CODE: 3515,
    CIT_NAME_EN: 'AL KUTAYFAH',
    CIT_NAME_AR: 'الكتيفة',
  },
  {
    CIT_CODE: 3516,
    CIT_NAME_EN: 'AS SYABAH',
    CIT_NAME_AR: 'السيبة',
  },
  {
    CIT_CODE: 3517,
    CIT_NAME_EN: 'AL MARZUQ',
    CIT_NAME_AR: 'المرزوق',
  },
  {
    CIT_CODE: 3519,
    CIT_NAME_EN: 'AR RADD',
    CIT_NAME_AR: 'الرد',
  },
  {
    CIT_CODE: 3520,
    CIT_NAME_EN: 'DUDAH',
    CIT_NAME_AR: 'دودة',
  },
  {
    CIT_CODE: 3521,
    CIT_NAME_EN: 'AD DAWSHIYAH',
    CIT_NAME_AR: 'الدوشية',
  },
  {
    CIT_CODE: 3522,
    CIT_NAME_EN: 'UMM AL HAJAL',
    CIT_NAME_AR: 'أم الحجل',
  },
  {
    CIT_CODE: 3523,
    CIT_NAME_EN: 'AL MUQAYDIR',
    CIT_NAME_AR: 'المقيدر',
  },
  {
    CIT_CODE: 3527,
    CIT_NAME_EN: 'FALAS',
    CIT_NAME_AR: 'فلس',
  },
  {
    CIT_CODE: 3528,
    CIT_NAME_EN: 'HAKIMAH',
    CIT_NAME_AR: 'حاكمة',
  },
  {
    CIT_CODE: 3529,
    CIT_NAME_EN: 'AS SAYYABAH',
    CIT_NAME_AR: 'الصيابة',
  },
  {
    CIT_CODE: 3531,
    CIT_NAME_EN: 'AL KURUS',
    CIT_NAME_AR: 'الكروس',
  },
  {
    CIT_CODE: 3532,
    CIT_NAME_EN: 'AL MUBAYYAT',
    CIT_NAME_AR: 'المبيت',
  },
  {
    CIT_CODE: 3533,
    CIT_NAME_EN: 'AS SIRDAH',
    CIT_NAME_AR: 'السرداح',
  },
  {
    CIT_CODE: 3534,
    CIT_NAME_EN: "AL MI'ZAB",
    CIT_NAME_AR: 'المعزاب',
  },
  {
    CIT_CODE: 3535,
    CIT_NAME_EN: 'AS SAWADI',
    CIT_NAME_AR: 'السودي',
  },
  {
    CIT_CODE: 3536,
    CIT_NAME_EN: 'AL HALHALAH',
    CIT_NAME_AR: 'الحلحلة',
  },
  {
    CIT_CODE: 3537,
    CIT_NAME_EN: "WA'LAN",
    CIT_NAME_AR: 'وعلان',
  },
  {
    CIT_CODE: 3538,
    CIT_NAME_EN: 'AL BAYSURI',
    CIT_NAME_AR: 'البيسري',
  },
  {
    CIT_CODE: 3539,
    CIT_NAME_EN: 'DAYHAMAH',
    CIT_NAME_AR: 'ديحمة',
  },
  {
    CIT_CODE: 3540,
    CIT_NAME_EN: 'AL KHALAYIF',
    CIT_NAME_AR: 'الخلايف',
  },
  {
    CIT_CODE: 3541,
    CIT_NAME_EN: 'AL SHANAMIRAH',
    CIT_NAME_AR: 'الشنامرة',
  },
  {
    CIT_CODE: 3543,
    CIT_NAME_EN: 'AL JURADIYAH',
    CIT_NAME_AR: 'الجرادية',
  },
  {
    CIT_CODE: 3544,
    CIT_NAME_EN: 'ABU HAJAR AL ASFAL',
    CIT_NAME_AR: 'ابو حجر الاسفل',
  },
  {
    CIT_CODE: 3545,
    CIT_NAME_EN: 'AD DAGHARIR',
    CIT_NAME_AR: 'الدغارير',
  },
  {
    CIT_CODE: 3547,
    CIT_NAME_EN: 'HAKIMAT AD DAGHARIR',
    CIT_NAME_AR: 'حاكمة الدغارير',
  },
  {
    CIT_CODE: 3548,
    CIT_NAME_EN: 'AL QUFL',
    CIT_NAME_AR: 'القفل',
  },
  {
    CIT_CODE: 3550,
    CIT_NAME_EN: 'AL LAQYAH',
    CIT_NAME_AR: 'اللقية',
  },
  {
    CIT_CODE: 3551,
    CIT_NAME_EN: "ABU HAJAR AL A'LA",
    CIT_NAME_AR: 'ابو حجر الأعلى',
  },
  {
    CIT_CODE: 3552,
    CIT_NAME_EN: 'AN NUJAMIYAH',
    CIT_NAME_AR: 'النجامية',
  },
  {
    CIT_CODE: 3553,
    CIT_NAME_EN: "SHI'B ADH DHIB",
    CIT_NAME_AR: 'شعب الذئب',
  },
  {
    CIT_CODE: 3554,
    CIT_NAME_EN: 'AL KHAWJARAH',
    CIT_NAME_AR: 'الخوجرة',
  },
  {
    CIT_CODE: 3556,
    CIT_NAME_EN: 'AL MIJANNAH',
    CIT_NAME_AR: 'المجنة',
  },
  {
    CIT_CODE: 3557,
    CIT_NAME_EN: 'ANTUTAH',
    CIT_NAME_AR: 'عنطوطة',
  },
  {
    CIT_CODE: 3558,
    CIT_NAME_EN: "AL JADHI'",
    CIT_NAME_AR: 'الجاظع',
  },
  {
    CIT_CODE: 3559,
    CIT_NAME_EN: 'AR RUKUBAH',
    CIT_NAME_AR: 'الركوبة',
  },
  {
    CIT_CODE: 3560,
    CIT_NAME_EN: "MUJ'UR",
    CIT_NAME_AR: 'مجعر',
  },
  {
    CIT_CODE: 3562,
    CIT_NAME_EN: 'AL-KHARKHER',
    CIT_NAME_AR: 'الخرخير',
  },
  {
    CIT_CODE: 3563,
    CIT_NAME_EN: 'ABU TAWQ',
    CIT_NAME_AR: 'أبو طوق',
  },
  {
    CIT_CODE: 3564,
    CIT_NAME_EN: "AL 'UQAIL",
    CIT_NAME_AR: 'العقيل',
  },
  {
    CIT_CODE: 3565,
    CIT_NAME_EN: 'KHATB',
    CIT_NAME_AR: 'ختب',
  },
  {
    CIT_CODE: 3566,
    CIT_NAME_EN: 'SIR',
    CIT_NAME_AR: 'صير',
  },
  {
    CIT_CODE: 3567,
    CIT_NAME_EN: 'AL QSAR',
    CIT_NAME_AR: 'القصار',
  },
  {
    CIT_CODE: 3568,
    CIT_NAME_EN: 'AL MUHARQ',
    CIT_NAME_AR: 'المحرق',
  },
  {
    CIT_CODE: 3569,
    CIT_NAME_EN: 'GNABA',
    CIT_NAME_AR: 'جنابه',
  },
  {
    CIT_CODE: 3570,
    CIT_NAME_EN: 'NEW PORT',
    CIT_NAME_AR: 'الميناء الجديد',
  },
  {
    CIT_CODE: 3572,
    CIT_NAME_EN: 'UMM SUMDAYN',
    CIT_NAME_AR: 'أم صمدين',
  },
  {
    CIT_CODE: 3573,
    CIT_NAME_EN: 'AL MISHRAN',
    CIT_NAME_AR: 'المشران',
  },
  {
    CIT_CODE: 3581,
    CIT_NAME_EN: 'BIR IBN HERMAS',
    CIT_NAME_AR: 'بئر بن هرماس',
  },
  {
    CIT_CODE: 3582,
    CIT_NAME_EN: 'AL HULAYSIYAH',
    CIT_NAME_AR: 'الحليسية',
  },
  {
    CIT_CODE: 3583,
    CIT_NAME_EN: 'RAS UMM QUSBAH',
    CIT_NAME_AR: 'راس ام قصبة',
  },
  {
    CIT_CODE: 3584,
    CIT_NAME_EN: 'KHABT AL BAQAR',
    CIT_NAME_AR: 'خبت البقر',
  },
  {
    CIT_CODE: 3585,
    CIT_NAME_EN: 'AL HANABAH',
    CIT_NAME_AR: 'الحنبة',
  },
  {
    CIT_CODE: 3586,
    CIT_NAME_EN: 'IRQ',
    CIT_NAME_AR: 'عرق',
  },
  {
    CIT_CODE: 3587,
    CIT_NAME_EN: "ABU AL 'USHARAH",
    CIT_NAME_AR: 'أبو العشرة',
  },
  {
    CIT_CODE: 3588,
    CIT_NAME_EN: 'JARRAR',
    CIT_NAME_AR: 'جرار',
  },
  {
    CIT_CODE: 3589,
    CIT_NAME_EN: "AL 'AYSHAH",
    CIT_NAME_AR: 'العيشة',
  },
  {
    CIT_CODE: 3590,
    CIT_NAME_EN: "JABAL 'ABADIL",
    CIT_NAME_AR: 'جبل عبادل',
  },
  {
    CIT_CODE: 3591,
    CIT_NAME_EN: 'AL BIHTHAH',
    CIT_NAME_AR: 'البحثة',
  },
  {
    CIT_CODE: 3592,
    CIT_NAME_EN: 'AL MIJAZI',
    CIT_NAME_AR: 'المجازيع',
  },
  {
    CIT_CODE: 3593,
    CIT_NAME_EN: 'AL MASKIYAH',
    CIT_NAME_AR: 'المسكية',
  },
  {
    CIT_CODE: 3594,
    CIT_NAME_EN: 'HAMAYAH',
    CIT_NAME_AR: 'حمية',
  },
  {
    CIT_CODE: 3595,
    CIT_NAME_EN: 'AS SAHHAR',
    CIT_NAME_AR: 'السحار',
  },
  {
    CIT_CODE: 3596,
    CIT_NAME_EN: 'AL QASABAH',
    CIT_NAME_AR: 'القصبة',
  },
  {
    CIT_CODE: 3598,
    CIT_NAME_EN: 'SANABIS',
    CIT_NAME_AR: 'سنابس',
  },
  {
    CIT_CODE: 3599,
    CIT_NAME_EN: 'QAYS',
    CIT_NAME_AR: 'قيس',
  },
  {
    CIT_CODE: 3600,
    CIT_NAME_EN: 'AL WAHLAH',
    CIT_NAME_AR: 'الوحلة',
  },
  {
    CIT_CODE: 3601,
    CIT_NAME_EN: "AL 'ISHWAH",
    CIT_NAME_AR: 'العشوة',
  },
  {
    CIT_CODE: 3602,
    CIT_NAME_EN: 'AL FUQHA',
    CIT_NAME_AR: 'الفقهاء',
  },
  {
    CIT_CODE: 3603,
    CIT_NAME_EN: 'DUHAYQAH',
    CIT_NAME_AR: 'دحيقة',
  },
  {
    CIT_CODE: 3604,
    CIT_NAME_EN: 'ASH SHAWAJIRAH',
    CIT_NAME_AR: 'الشواجرة',
  },
  {
    CIT_CODE: 3605,
    CIT_NAME_EN: 'BAKHSHAH',
    CIT_NAME_AR: 'بخشة',
  },
  {
    CIT_CODE: 3606,
    CIT_NAME_EN: 'AL ASAMILAH',
    CIT_NAME_AR: 'الاساملة',
  },
  {
    CIT_CODE: 3607,
    CIT_NAME_EN: 'AL KHALFAH',
    CIT_NAME_AR: 'الخلفة',
  },
  {
    CIT_CODE: 3608,
    CIT_NAME_EN: "JADI' AL MAHADIN",
    CIT_NAME_AR: 'جاضع المحاضين',
  },
  {
    CIT_CODE: 3609,
    CIT_NAME_EN: 'AL KHUMS',
    CIT_NAME_AR: 'الخمس',
  },
  {
    CIT_CODE: 3611,
    CIT_NAME_EN: 'AS SUDAD',
    CIT_NAME_AR: 'السداد',
  },
  {
    CIT_CODE: 3612,
    CIT_NAME_EN: 'AZ ZAHABAYN',
    CIT_NAME_AR: 'الزهبين',
  },
  {
    CIT_CODE: 3613,
    CIT_NAME_EN: 'SANBAH',
    CIT_NAME_AR: 'صنبة',
  },
  {
    CIT_CODE: 3615,
    CIT_NAME_EN: "AL MA'BUJ",
    CIT_NAME_AR: 'المعبوج',
  },
  {
    CIT_CODE: 3616,
    CIT_NAME_EN: 'AL KHASAWIYAH',
    CIT_NAME_AR: 'الخصاوية',
  },
  {
    CIT_CODE: 3617,
    CIT_NAME_EN: 'AL MADAYAH',
    CIT_NAME_AR: 'المضاية',
  },
  {
    CIT_CODE: 3618,
    CIT_NAME_EN: "AL BADI' WAL QARAFI",
    CIT_NAME_AR: 'البديع والقرفي',
  },
  {
    CIT_CODE: 3619,
    CIT_NAME_EN: 'MIZHIRAH',
    CIT_NAME_AR: 'مزهرة',
  },
  {
    CIT_CODE: 3620,
    CIT_NAME_EN: 'AL KARBUS',
    CIT_NAME_AR: 'الكربوص',
  },
  {
    CIT_CODE: 3621,
    CIT_NAME_EN: 'AL WASILI',
    CIT_NAME_AR: 'الواصلي',
  },
  {
    CIT_CODE: 3623,
    CIT_NAME_EN: 'QAMIZAH',
    CIT_NAME_AR: 'قامزة',
  },
  {
    CIT_CODE: 3624,
    CIT_NAME_EN: 'SHAHRAYN',
    CIT_NAME_AR: 'شهرين',
  },
  {
    CIT_CODE: 3626,
    CIT_NAME_EN: 'ADH DHAHAR',
    CIT_NAME_AR: 'الظهر',
  },
  {
    CIT_CODE: 3627,
    CIT_NAME_EN: "AL 'AQUM",
    CIT_NAME_AR: 'العقم',
  },
  {
    CIT_CODE: 3628,
    CIT_NAME_EN: 'AS SUBKHAYAH',
    CIT_NAME_AR: 'الصبخاية',
  },
  {
    CIT_CODE: 3629,
    CIT_NAME_EN: 'JILAH',
    CIT_NAME_AR: 'جلاح',
  },
  {
    CIT_CODE: 3631,
    CIT_NAME_EN: 'AL MIHDAF',
    CIT_NAME_AR: 'المهدف',
  },
  {
    CIT_CODE: 3633,
    CIT_NAME_EN: 'AL-KOUBAH',
    CIT_NAME_AR: 'الخوبة',
  },
  {
    CIT_CODE: 3635,
    CIT_NAME_EN: 'AL KHASHAL',
    CIT_NAME_AR: 'الخشل',
  },
  {
    CIT_CODE: 3636,
    CIT_NAME_EN: 'AL JABIRI',
    CIT_NAME_AR: 'الجابري',
  },
  {
    CIT_CODE: 3637,
    CIT_NAME_EN: 'JUHA',
    CIT_NAME_AR: 'جحا',
  },
  {
    CIT_CODE: 3640,
    CIT_NAME_EN: 'ASH SHUTAYFIYAH',
    CIT_NAME_AR: 'الشطيفية',
  },
  {
    CIT_CODE: 3641,
    CIT_NAME_EN: 'AL HASSAMAH',
    CIT_NAME_AR: 'الحصامة',
  },
  {
    CIT_CODE: 3642,
    CIT_NAME_EN: 'AL KHADRA ASH SHAMALIYAH',
    CIT_NAME_AR: 'الخضراء الشمالية',
  },
  {
    CIT_CODE: 3643,
    CIT_NAME_EN: 'AL SUWAYDIYAH',
    CIT_NAME_AR: 'السويدية',
  },
  {
    CIT_CODE: 3644,
    CIT_NAME_EN: 'RASHAH',
    CIT_NAME_AR: 'رعشة',
  },
  {
    CIT_CODE: 3645,
    CIT_NAME_EN: 'AL MUJAMMAH',
    CIT_NAME_AR: 'المجامة',
  },
  {
    CIT_CODE: 3646,
    CIT_NAME_EN: 'AL MUKHASHSHALIYAH',
    CIT_NAME_AR: 'المخشلية',
  },
  {
    CIT_CODE: 3647,
    CIT_NAME_EN: 'AL HAMIDAH',
    CIT_NAME_AR: 'الحامضة',
  },
  {
    CIT_CODE: 3648,
    CIT_NAME_EN: "AL JA'DIYAH",
    CIT_NAME_AR: 'الجعدية',
  },
  {
    CIT_CODE: 3649,
    CIT_NAME_EN: 'AL MAHAMIL',
    CIT_NAME_AR: 'المحامل',
  },
  {
    CIT_CODE: 3650,
    CIT_NAME_EN: 'AL HASAMAH',
    CIT_NAME_AR: 'الحصمة',
  },
  {
    CIT_CODE: 3653,
    CIT_NAME_EN: 'AL HIJFAR',
    CIT_NAME_AR: 'الحجفار',
  },
  {
    CIT_CODE: 3654,
    CIT_NAME_EN: 'AT TAHIRIYAH',
    CIT_NAME_AR: 'الطاهرية',
  },
  {
    CIT_CODE: 3655,
    CIT_NAME_EN: 'AL HADRUR',
    CIT_NAME_AR: 'الحضرور',
  },
  {
    CIT_CODE: 3656,
    CIT_NAME_EN: "AD DURAY'IYAH",
    CIT_NAME_AR: 'الدريعية',
  },
  {
    CIT_CODE: 3657,
    CIT_NAME_EN: 'AL BADAWI',
    CIT_NAME_AR: 'البدوي',
  },
  {
    CIT_CODE: 3658,
    CIT_NAME_EN: 'AL HALLIYAH',
    CIT_NAME_AR: 'الهلية',
  },
  {
    CIT_CODE: 3659,
    CIT_NAME_EN: 'AL HANINI',
    CIT_NAME_AR: 'الحنيني',
  },
  {
    CIT_CODE: 3660,
    CIT_NAME_EN: "QAMA'AH",
    CIT_NAME_AR: 'قمعة',
  },
  {
    CIT_CODE: 3662,
    CIT_NAME_EN: 'AL MAQARQAM',
    CIT_NAME_AR: 'المقرقم',
  },
  {
    CIT_CODE: 3664,
    CIT_NAME_EN: 'AL HAQLAH',
    CIT_NAME_AR: 'الحقلة',
  },
  {
    CIT_CODE: 3665,
    CIT_NAME_EN: 'ABU AR RADIF',
    CIT_NAME_AR: 'أبو الرديف',
  },
  {
    CIT_CODE: 3667,
    CIT_NAME_EN: 'AL KHARISH',
    CIT_NAME_AR: 'الخارش',
  },
  {
    CIT_CODE: 3668,
    CIT_NAME_EN: 'AS SAHI',
    CIT_NAME_AR: 'السهي',
  },
  {
    CIT_CODE: 3669,
    CIT_NAME_EN: 'RAMADA',
    CIT_NAME_AR: 'رمادا',
  },
  {
    CIT_CODE: 3670,
    CIT_NAME_EN: 'RAWAN',
    CIT_NAME_AR: 'روان',
  },
  {
    CIT_CODE: 3671,
    CIT_NAME_EN: 'HIJRAT SHUHAYL',
    CIT_NAME_AR: 'هجرة شهيل',
  },
  {
    CIT_CODE: 3673,
    CIT_NAME_EN: 'UMM SIDRAH',
    CIT_NAME_AR: 'أم سدرة',
  },
  {
    CIT_CODE: 3674,
    CIT_NAME_EN: 'MASHDHUBAH',
    CIT_NAME_AR: 'مشذوبة',
  },
  {
    CIT_CODE: 3675,
    CIT_NAME_EN: 'AL MUFAIJIR',
    CIT_NAME_AR: 'المفيجر',
  },
  {
    CIT_CODE: 3676,
    CIT_NAME_EN: 'WADI AL HAYAT',
    CIT_NAME_AR: 'وادي الحياة',
  },
  {
    CIT_CODE: 3677,
    CIT_NAME_EN: 'AL AHSA',
    CIT_NAME_AR: 'الاحساء',
  },
  {
    CIT_CODE: 3679,
    CIT_NAME_EN: 'AS SULAIMANIYAH',
    CIT_NAME_AR: 'السليمانية',
  },
  {
    CIT_CODE: 3682,
    CIT_NAME_EN: 'KHATBAH',
    CIT_NAME_AR: 'ختبة',
  },
  {
    CIT_CODE: 3684,
    CIT_NAME_EN: 'ADHAM',
    CIT_NAME_AR: 'اضم',
  },
  {
    CIT_CODE: 3685,
    CIT_NAME_EN: 'AL KHLUSAH',
    CIT_NAME_AR: 'الخلصة',
  },
  {
    CIT_CODE: 3687,
    CIT_NAME_EN: 'HISWAH',
    CIT_NAME_AR: 'حسوة',
  },
  {
    CIT_CODE: 3688,
    CIT_NAME_EN: 'AL FARAAIN',
    CIT_NAME_AR: 'الفرعين',
  },
  {
    CIT_CODE: 3689,
    CIT_NAME_EN: 'BILLAHMAR',
    CIT_NAME_AR: 'بللحمر',
  },
  {
    CIT_CODE: 3690,
    CIT_NAME_EN: 'BAHR ABU SUKAYNAH',
    CIT_NAME_AR: 'بحر ابو سكينة',
  },
  {
    CIT_CODE: 3692,
    CIT_NAME_EN: 'YAARA',
    CIT_NAME_AR: 'يعرى',
  },
  {
    CIT_CODE: 3693,
    CIT_NAME_EN: 'AL AYSH',
    CIT_NAME_AR: 'العيش',
  },
  {
    CIT_CODE: 3694,
    CIT_NAME_EN: 'SANAFIR ISLAND',
    CIT_NAME_AR: 'جزيرة صنافير',
  },
  {
    CIT_CODE: 3695,
    CIT_NAME_EN: 'TIRAN ISLAND',
    CIT_NAME_AR: 'جزيرة تيران',
  },
  {
    CIT_CODE: 3696,
    CIT_NAME_EN: 'SALILAT JUHAYNAH',
    CIT_NAME_AR: 'سليلة جهينة',
  },
  {
    CIT_CODE: 3698,
    CIT_NAME_EN: 'AS SAFWIYAH',
    CIT_NAME_AR: 'الصفوية',
  },
  {
    CIT_CODE: 3700,
    CIT_NAME_EN: 'JAWATHA',
    CIT_NAME_AR: 'جواثا',
  },
  {
    CIT_CODE: 3702,
    CIT_NAME_EN: 'Ras Al Khair',
    CIT_NAME_AR: 'رأس الخير',
  },
  {
    CIT_CODE: 3705,
    CIT_NAME_EN: "SHUAIB AS SAQA'A",
    CIT_NAME_AR: 'شعيب الصقعاء ',
  },
  {
    CIT_CODE: 3706,
    CIT_NAME_EN: 'MASHASH IBN JAZI',
    CIT_NAME_AR: 'مشاش ابن جازي',
  },
  {
    CIT_CODE: 3707,
    CIT_NAME_EN: 'FAYDAT AS SAMMAR',
    CIT_NAME_AR: 'فيضة السمار',
  },
  {
    CIT_CODE: 3708,
    CIT_NAME_EN: 'DHARFI',
    CIT_NAME_AR: 'ذرفي',
  },
  {
    CIT_CODE: 3709,
    CIT_NAME_EN: 'AL MISHALIYAH',
    CIT_NAME_AR: 'المشعلية',
  },
  {
    CIT_CODE: 3710,
    CIT_NAME_EN: 'AL KHAWI',
    CIT_NAME_AR: 'الخوي',
  },
  {
    CIT_CODE: 3711,
    CIT_NAME_EN: 'AL RAHMAH',
    CIT_NAME_AR: 'آل رحمة',
  },
  {
    CIT_CODE: 3712,
    CIT_NAME_EN: 'AS SADDAIN',
    CIT_NAME_AR: 'السدين',
  },
  {
    CIT_CODE: 3771,
    CIT_NAME_EN: 'AL AZIZIYAH',
    CIT_NAME_AR: 'العزيزيه',
  },
  {
    CIT_CODE: 3794,
    CIT_NAME_EN: 'AL HABABIYAH',
    CIT_NAME_AR: 'الحبابيه',
  },
  {
    CIT_CODE: 3901,
    CIT_NAME_EN: 'AS SADRYAH',
    CIT_NAME_AR: 'السدريه',
  },
  {
    CIT_CODE: 3902,
    CIT_NAME_EN: 'AL HUWAYDYAH',
    CIT_NAME_AR: 'الهويديه',
  },
  {
    CIT_CODE: 3903,
    CIT_NAME_EN: 'AL ENADYAH',
    CIT_NAME_AR: 'العناديه',
  },
  {
    CIT_CODE: 3945,
    CIT_NAME_EN: 'ABU SIDR',
    CIT_NAME_AR: 'ابو سدر',
  },
  {
    CIT_CODE: 3946,
    CIT_NAME_EN: 'MUSHRIFAT AL KRASHMAH',
    CIT_NAME_AR: 'مشرفة الكراشمه',
  },
  {
    CIT_CODE: 4092,
    CIT_NAME_EN: 'AL-SALEHIYAH',
    CIT_NAME_AR: 'الصالحيه',
  },
  {
    CIT_CODE: 4396,
    CIT_NAME_EN: 'AL WASITA',
    CIT_NAME_AR: 'الوسيطا',
  },
  {
    CIT_CODE: 4765,
    CIT_NAME_EN: 'AL HAYANIYA',
    CIT_NAME_AR: 'الحيانية',
  },
  {
    CIT_CODE: 4815,
    CIT_NAME_EN: 'AL MUSAYFIQIH',
    CIT_NAME_AR: 'المصيفقيه',
  },
  {
    CIT_CODE: 4816,
    CIT_NAME_EN: 'AL NASFAH',
    CIT_NAME_AR: 'الناصفه',
  },
  {
    CIT_CODE: 4837,
    CIT_NAME_EN: 'AL BAYNIH',
    CIT_NAME_AR: 'الباينيه',
  },
  {
    CIT_CODE: 4873,
    CIT_NAME_EN: "RUFA'I AL MUZAINI",
    CIT_NAME_AR: 'رفايع المزينى',
  },
  {
    CIT_CODE: 4997,
    CIT_NAME_EN: 'AL QURAINAH',
    CIT_NAME_AR: 'القرينه',
  },
  {
    CIT_CODE: 5001,
    CIT_NAME_EN: 'GHIANAH WAHURQAN',
    CIT_NAME_AR: 'غيانه وحرقان',
  },
  {
    CIT_CODE: 5022,
    CIT_NAME_EN: 'AL ABDALIYAH',
    CIT_NAME_AR: 'العبدليه',
  },
  {
    CIT_CODE: 7035,
    CIT_NAME_EN: 'GHARAN',
    CIT_NAME_AR: 'غران',
  },
  {
    CIT_CODE: 9605,
    CIT_NAME_EN: 'YANBAA AS SENAYAH',
    CIT_NAME_AR: 'ينبع الصناعيه',
  },
  {
    CIT_CODE: 10437,
    CIT_NAME_EN: 'SABHA AL JAHFAH',
    CIT_NAME_AR: 'صبحا الجحفه',
  },
  {
    CIT_CODE: 10444,
    CIT_NAME_EN: "BADAI' AL HANAHANAH",
    CIT_NAME_AR: 'بدائع الحناحنه',
  },
  {
    CIT_CODE: 10445,
    CIT_NAME_EN: "BADAI' AL AWD",
    CIT_NAME_AR: 'بدائع العوض',
  },
  {
    CIT_CODE: 10706,
    CIT_NAME_EN: 'AL JADIDAT',
    CIT_NAME_AR: 'الجديدات',
  },
  {
    CIT_CODE: 10724,
    CIT_NAME_EN: 'AL HIIJRAH',
    CIT_NAME_AR: 'الحجره',
  },
  {
    CIT_CODE: 10772,
    CIT_NAME_EN: 'HARIFIYAT DAREIH',
    CIT_NAME_AR: 'حريفيات درعه',
  },
  {
    CIT_CODE: 10809,
    CIT_NAME_EN: 'AYN IBN FUHAYD',
    CIT_NAME_AR: 'عين ابن فهيد',
  },
  {
    CIT_CODE: 10826,
    CIT_NAME_EN: 'KOFAT',
    CIT_NAME_AR: 'كفت',
  },
  {
    CIT_CODE: 10827,
    CIT_NAME_EN: 'AL NUWAISIFAH',
    CIT_NAME_AR: 'النويصفة',
  },
  {
    CIT_CODE: 10829,
    CIT_NAME_EN: 'MISHRIFAT AMUDAN',
    CIT_NAME_AR: 'مشرفة عمودان',
  },
  {
    CIT_CODE: 10832,
    CIT_NAME_EN: 'FAIDAT AL SALAMAT',
    CIT_NAME_AR: 'فيضة السلمات',
  },
  {
    CIT_CODE: 10872,
    CIT_NAME_EN: 'AL MARMUTHAH',
    CIT_NAME_AR: 'المرموثة',
  },
  {
    CIT_CODE: 10873,
    CIT_NAME_EN: 'AL MARMUTHAH ASH SHAMALIYAH',
    CIT_NAME_AR: 'المرموثة الشمالية',
  },
  {
    CIT_CODE: 10879,
    CIT_NAME_EN: 'MAZUNAH',
    CIT_NAME_AR: 'مازونة',
  },
  {
    CIT_CODE: 10880,
    CIT_NAME_EN: 'AL SALBIYAH',
    CIT_NAME_AR: 'الصلبيه',
  },
  {
    CIT_CODE: 10917,
    CIT_NAME_EN: 'ASH SHUQRAN AL HAJR',
    CIT_NAME_AR: 'شقران الحاجر',
  },
  {
    CIT_CODE: 11054,
    CIT_NAME_EN: "AR RUQ'I",
    CIT_NAME_AR: 'الرقعى',
  },
  {
    CIT_CODE: 11055,
    CIT_NAME_EN: 'AL DHIBIYAH',
    CIT_NAME_AR: 'الذيبيه',
  },
  {
    CIT_CODE: 11090,
    CIT_NAME_EN: 'TANAJIB',
    CIT_NAME_AR: 'تناقيب',
  },
  {
    CIT_CODE: 11094,
    CIT_NAME_EN: 'GHAZLAN ',
    CIT_NAME_AR: 'غزلان',
  },
  {
    CIT_CODE: 11198,
    CIT_NAME_EN: 'AIN BIN MUSAFIH',
    CIT_NAME_AR: 'عين بن مصافح',
  },
  {
    CIT_CODE: 12351,
    CIT_NAME_EN: 'AL SHUQAYRIYAH',
    CIT_NAME_AR: 'الشقيريه',
  },
  {
    CIT_CODE: 17417,
    CIT_NAME_EN: 'ALQARININ',
    CIT_NAME_AR: 'القرينين',
  },
  {
    CIT_CODE: 17444,
    CIT_NAME_EN: 'RIJAMAH',
    CIT_NAME_AR: 'رجامة',
  },
  {
    CIT_CODE: 17457,
    CIT_NAME_EN: 'AL KHUWAIR',
    CIT_NAME_AR: 'الخوير',
  },
  {
    CIT_CODE: 17467,
    CIT_NAME_EN: 'AL JABAYLI ',
    CIT_NAME_AR: 'الجبيلي',
  },
  {
    CIT_CODE: 17475,
    CIT_NAME_EN: 'UMM SARUT',
    CIT_NAME_AR: 'ام ساروت',
  },
  {
    CIT_CODE: 17491,
    CIT_NAME_EN: 'BADAYIE ALEULYA',
    CIT_NAME_AR: 'بدائع العليا',
  },
  {
    CIT_CODE: 17662,
    CIT_NAME_EN: 'AD DIHWAH',
    CIT_NAME_AR: 'الدحوه',
  },
  {
    CIT_CODE: 17698,
    CIT_NAME_EN: 'AL SHAQ',
    CIT_NAME_AR: 'الشق',
  },
  {
    CIT_CODE: 17777,
    CIT_NAME_EN: 'AL MANAKH',
    CIT_NAME_AR: 'المناخ',
  },
  {
    CIT_CODE: 17781,
    CIT_NAME_EN: 'ABU DUYHAT',
    CIT_NAME_AR: 'ابو دويحات',
  },
  {
    CIT_CODE: 17888,
    CIT_NAME_EN: 'IBN AESH',
    CIT_NAME_AR: 'ابن عائش',
  },
  {
    CIT_CODE: 17924,
    CIT_NAME_EN: 'AL NAEAMIA',
    CIT_NAME_AR: 'النعامية',
  },
  {
    CIT_CODE: 17925,
    CIT_NAME_EN: 'AL HAJARIAH',
    CIT_NAME_AR: 'الهجاريه',
  },
  {
    CIT_CODE: 17926,
    CIT_NAME_EN: 'AL KHAWAJIH',
    CIT_NAME_AR: 'الخواجيه',
  },
  {
    CIT_CODE: 17927,
    CIT_NAME_EN: 'AL SAWALIMAH',
    CIT_NAME_AR: 'السوالمه',
  },
  {
    CIT_CODE: 17928,
    CIT_NAME_EN: 'AL BATINAH',
    CIT_NAME_AR: 'الباطنه',
  },
  {
    CIT_CODE: 17929,
    CIT_NAME_EN: 'AL SHAMUH',
    CIT_NAME_AR: 'الشمه',
  },
  {
    CIT_CODE: 17930,
    CIT_NAME_EN: 'AL RAFIE',
    CIT_NAME_AR: 'الرافعي',
  },
  {
    CIT_CODE: 17931,
    CIT_NAME_EN: 'ALT ARASHAH',
    CIT_NAME_AR: 'الطراشه',
  },
  {
    CIT_CODE: 17932,
    CIT_NAME_EN: 'AL FAQRAH',
    CIT_NAME_AR: 'الفقره',
  },
  {
    CIT_CODE: 17933,
    CIT_NAME_EN: 'ABU ALKARSH',
    CIT_NAME_AR: 'ابو الكرش',
  },
  {
    CIT_CODE: 17934,
    CIT_NAME_EN: 'AL ARJEEN',
    CIT_NAME_AR: 'العرجين',
  },
  {
    CIT_CODE: 17935,
    CIT_NAME_EN: 'AL HIWAYA',
    CIT_NAME_AR: 'الحواية',
  },
  {
    CIT_CODE: 17936,
    CIT_NAME_EN: 'AL AMARIDAH',
    CIT_NAME_AR: 'العمارده',
  },
  {
    CIT_CODE: 17937,
    CIT_NAME_EN: 'AL QASADAH',
    CIT_NAME_AR: 'القصاده',
  },
  {
    CIT_CODE: 17938,
    CIT_NAME_EN: 'AL SARURIYAH',
    CIT_NAME_AR: 'السروريه',
  },
  {
    CIT_CODE: 17939,
    CIT_NAME_EN: 'AL NIJABAH WAL JAHAJIH',
    CIT_NAME_AR: 'النجابه و الجحاجح',
  },
  {
    CIT_CODE: 17940,
    CIT_NAME_EN: 'ABDULLAH AL EYAFI (AL EYAFI)',
    CIT_NAME_AR: 'عبدالله العيافي (العيافي)',
  },
  {
    CIT_CODE: 17941,
    CIT_NAME_EN: 'AL JAEAWUNAH',
    CIT_NAME_AR: 'الجعاونه',
  },
  {
    CIT_CODE: 17942,
    CIT_NAME_EN: 'HALAH MUHSIN AL MUHASANA',
    CIT_NAME_AR: 'حله محسن  المحاسنة',
  },
  {
    CIT_CODE: 17943,
    CIT_NAME_EN: 'AL DAWAHISHAH',
    CIT_NAME_AR: 'الدواحشه',
  },
  {
    CIT_CODE: 17944,
    CIT_NAME_EN: 'TYHAN (HULAT TYHAN)',
    CIT_NAME_AR: 'تيهان (حلة تيهان)',
  },
  {
    CIT_CODE: 17945,
    CIT_NAME_EN: 'AL KHAWARAH',
    CIT_NAME_AR: 'الخواره',
  },
  {
    CIT_CODE: 17946,
    CIT_NAME_EN: 'AL SHAWAHIYAH',
    CIT_NAME_AR: 'الشواهية',
  },
  {
    CIT_CODE: 17947,
    CIT_NAME_EN: 'AL SHIARAH',
    CIT_NAME_AR: 'الشعاره',
  },
  {
    CIT_CODE: 17948,
    CIT_NAME_EN: 'AL QAWAEA',
    CIT_NAME_AR: 'القواعة',
  },
  {
    CIT_CODE: 17991,
    CIT_NAME_EN: 'AL SHAAKHIR',
    CIT_NAME_AR: 'الشاخر',
  },
  {
    CIT_CODE: 17992,
    CIT_NAME_EN: 'UMM AL SHIBAQA',
    CIT_NAME_AR: 'ام الشباقاء',
  },
  {
    CIT_CODE: 17993,
    CIT_NAME_EN: 'AL LAKHABSIA',
    CIT_NAME_AR: 'اللخبصية',
  },
  {
    CIT_CODE: 17994,
    CIT_NAME_EN: 'AL SAMIKH',
    CIT_NAME_AR: 'الصامخ',
  },
  {
    CIT_CODE: 17995,
    CIT_NAME_EN: 'AL JARAH AL QADIUMAH',
    CIT_NAME_AR: 'الجاره القديمه',
  },
  {
    CIT_CODE: 17996,
    CIT_NAME_EN: 'AL ZINIYAH',
    CIT_NAME_AR: 'الزينيه',
  },
  {
    CIT_CODE: 17997,
    CIT_NAME_EN: 'HULAT ALI BIN MUSA',
    CIT_NAME_AR: 'حلة علي بن موسى',
  },
  {
    CIT_CODE: 17998,
    CIT_NAME_EN: 'UMM AL QAHFAH',
    CIT_NAME_AR: 'ام القحفه',
  },
  {
    CIT_CODE: 17999,
    CIT_NAME_EN: 'HULAT AL MAKKI',
    CIT_NAME_AR: 'حلة المكي',
  },
  {
    CIT_CODE: 18000,
    CIT_NAME_EN: 'HULAT AL EARSHI',
    CIT_NAME_AR: 'حلة العرشي',
  },
  {
    CIT_CODE: 18001,
    CIT_NAME_EN: 'QIBAH',
    CIT_NAME_AR: 'قبه',
  },
  {
    CIT_CODE: 18003,
    CIT_NAME_EN: 'HALAH ATTIEH',
    CIT_NAME_AR: 'حله عطيه',
  },
  {
    CIT_CODE: 18004,
    CIT_NAME_EN: 'HALAH ABU MAREI',
    CIT_NAME_AR: 'حله ابو مرعي',
  },
  {
    CIT_CODE: 18005,
    CIT_NAME_EN: 'AL DAHEEQI',
    CIT_NAME_AR: 'الدحيقي',
  },
  {
    CIT_CODE: 18006,
    CIT_NAME_EN: 'AL HASHIBIRIA',
    CIT_NAME_AR: 'الحشيبرية',
  },
  {
    CIT_CODE: 18008,
    CIT_NAME_EN: 'AL RUNAH',
    CIT_NAME_AR: 'الرونه',
  },
  {
    CIT_CODE: 18009,
    CIT_NAME_EN: 'HALAH MUHAMAD EISA',
    CIT_NAME_AR: 'حله محمد عيسى',
  },
  {
    CIT_CODE: 18010,
    CIT_NAME_EN: 'HALAH ALEAQIBIU',
    CIT_NAME_AR: 'حله العقيبي',
  },
  {
    CIT_CODE: 18011,
    CIT_NAME_EN: 'HALAH AL QAMIRI',
    CIT_NAME_AR: 'حله القميري',
  },
  {
    CIT_CODE: 18012,
    CIT_NAME_EN: 'HALAH MISHARY',
    CIT_NAME_AR: 'حله مشاري',
  },
  {
    CIT_CODE: 18013,
    CIT_NAME_EN: 'HALAH AL SAHLULI',
    CIT_NAME_AR: 'حله الصهلولي',
  },
  {
    CIT_CODE: 18014,
    CIT_NAME_EN: 'HALAH ALHAWA TYN',
    CIT_NAME_AR: 'حله الحو تين',
  },
  {
    CIT_CODE: 18015,
    CIT_NAME_EN: 'HALAH BIN ALWAAN',
    CIT_NAME_AR: 'حله بن علوان',
  },
  {
    CIT_CODE: 18016,
    CIT_NAME_EN: 'HALAH AL HUKMAA',
    CIT_NAME_AR: 'حله الحكمى',
  },
  {
    CIT_CODE: 18017,
    CIT_NAME_EN: 'HALAH ABDULLAH QABEA',
    CIT_NAME_AR: 'حله عبدالله قبع',
  },
  {
    CIT_CODE: 18018,
    CIT_NAME_EN: 'HALAH MARUEI BIN SHAMY',
    CIT_NAME_AR: 'حله مروعي بن شامي',
  },
  {
    CIT_CODE: 18019,
    CIT_NAME_EN: 'HALAH AL KALABIH',
    CIT_NAME_AR: 'حله الكلابيه',
  },
  {
    CIT_CODE: 18020,
    CIT_NAME_EN: 'ABU DANQUR',
    CIT_NAME_AR: 'ابو دنقور',
  },
  {
    CIT_CODE: 18021,
    CIT_NAME_EN: 'AL JIDIAYN',
    CIT_NAME_AR: 'الجديين',
  },
  {
    CIT_CODE: 18022,
    CIT_NAME_EN: 'ZUBARAH AL JIDYEEN',
    CIT_NAME_AR: 'زباره الجديين',
  },
  {
    CIT_CODE: 18023,
    CIT_NAME_EN: 'SHAYBAN',
    CIT_NAME_AR: 'شيبان',
  },
  {
    CIT_CODE: 18025,
    CIT_NAME_EN: 'QARYAT AL JAWABIRIH',
    CIT_NAME_AR: 'قرية الجوابره',
  },
  {
    CIT_CODE: 18026,
    CIT_NAME_EN: 'AL SHAWAJIRAT WAL JARABIYAH',
    CIT_NAME_AR: 'الشواجرة والجرابية',
  },
  {
    CIT_CODE: 18027,
    CIT_NAME_EN: 'AL ZAYNI',
    CIT_NAME_AR: 'الزيني',
  },
  {
    CIT_CODE: 18028,
    CIT_NAME_EN: 'AL MAHASIH',
    CIT_NAME_AR: 'المحاصيه',
  },
  {
    CIT_CODE: 18029,
    CIT_NAME_EN: 'JAMEEMA',
    CIT_NAME_AR: 'جميما',
  },
  {
    CIT_CODE: 18030,
    CIT_NAME_EN: 'HANAQFAH',
    CIT_NAME_AR: 'حنقفه',
  },
  {
    CIT_CODE: 18031,
    CIT_NAME_EN: 'AL HAWAMIDAH JAHISH',
    CIT_NAME_AR: 'الحوامضه جحيش',
  },
  {
    CIT_CODE: 18032,
    CIT_NAME_EN: 'AL ZAQLAH',
    CIT_NAME_AR: 'الزقله',
  },
  {
    CIT_CODE: 18043,
    CIT_NAME_EN: 'SHAHDAH',
    CIT_NAME_AR: 'شهده',
  },
  {
    CIT_CODE: 18044,
    CIT_NAME_EN: 'AL KALABAH',
    CIT_NAME_AR: 'الكلبه',
  },
  {
    CIT_CODE: 18045,
    CIT_NAME_EN: 'AL FISALAH WAL DAGHARIH',
    CIT_NAME_AR: 'الفصاله والدغاريه',
  },
  {
    CIT_CODE: 18046,
    CIT_NAME_EN: 'AL SHIQAFAH WAL MUSAWAFA',
    CIT_NAME_AR: 'الشقافه والمصاوفة',
  },
  {
    CIT_CODE: 18048,
    CIT_NAME_EN: 'AL SHAEAFAH',
    CIT_NAME_AR: 'الشعافه',
  },
  {
    CIT_CODE: 18049,
    CIT_NAME_EN: 'ABU AL MAQRAH',
    CIT_NAME_AR: 'ابوالمقره',
  },
  {
    CIT_CODE: 18052,
    CIT_NAME_EN: 'ALEAWAJIMUH',
    CIT_NAME_AR: 'العواجمه',
  },
  {
    CIT_CODE: 18053,
    CIT_NAME_EN: 'WAJAH ALHASAN',
    CIT_NAME_AR: 'وجه الحسن',
  },
  {
    CIT_CODE: 18054,
    CIT_NAME_EN: 'ALEARDUH',
    CIT_NAME_AR: 'العرضه',
  },
  {
    CIT_CODE: 18055,
    CIT_NAME_EN: 'ALBATIH',
    CIT_NAME_AR: 'البطيح',
  },
  {
    CIT_CODE: 18056,
    CIT_NAME_EN: 'ALSIDADUH',
    CIT_NAME_AR: 'السداده',
  },
  {
    CIT_CODE: 18057,
    CIT_NAME_EN: 'ALNZLH',
    CIT_NAME_AR: 'النزلـــه',
  },
  {
    CIT_CODE: 18058,
    CIT_NAME_EN: 'EAWANAH',
    CIT_NAME_AR: 'عوانه',
  },
  {
    CIT_CODE: 18059,
    CIT_NAME_EN: 'ALEABDUH',
    CIT_NAME_AR: 'العبده',
  },
  {
    CIT_CODE: 18060,
    CIT_NAME_EN: 'ABU ALTUYUR',
    CIT_NAME_AR: 'ابو الطيور',
  },
  {
    CIT_CODE: 18061,
    CIT_NAME_EN: 'UMM ALEARSH',
    CIT_NAME_AR: 'ام العرش',
  },
  {
    CIT_CODE: 18062,
    CIT_NAME_EN: 'MANSIH',
    CIT_NAME_AR: 'منسيه',
  },
  {
    CIT_CODE: 18063,
    CIT_NAME_EN: 'ALSANIF',
    CIT_NAME_AR: 'الصنيف',
  },
  {
    CIT_CODE: 18064,
    CIT_NAME_EN: 'ALHIMDIH',
    CIT_NAME_AR: 'الحمضيه',
  },
  {
    CIT_CODE: 18066,
    CIT_NAME_EN: 'ALMAJDIRUH',
    CIT_NAME_AR: 'المجديره',
  },
  {
    CIT_CODE: 18067,
    CIT_NAME_EN: "HULAT 'ABU HABIBUH",
    CIT_NAME_AR: 'حلة ابو حبيبه',
  },
  {
    CIT_CODE: 18068,
    CIT_NAME_EN: 'ALKHAWALIDUH',
    CIT_NAME_AR: 'الخوالده',
  },
  {
    CIT_CODE: 18069,
    CIT_NAME_EN: 'ALZAYDIUH',
    CIT_NAME_AR: 'الزيديه',
  },
  {
    CIT_CODE: 18070,
    CIT_NAME_EN: 'ALHAJARAYN',
    CIT_NAME_AR: 'الحجرين',
  },
  {
    CIT_CODE: 18071,
    CIT_NAME_EN: 'JARIBUH',
    CIT_NAME_AR: 'جريبه',
  },
  {
    CIT_CODE: 18072,
    CIT_NAME_EN: 'ZARABAH',
    CIT_NAME_AR: 'زربه',
  },
  {
    CIT_CODE: 18073,
    CIT_NAME_EN: 'ALHADWAA',
    CIT_NAME_AR: 'الهدوى',
  },
  {
    CIT_CODE: 18074,
    CIT_NAME_EN: 'ALHAQAWIH',
    CIT_NAME_AR: 'الحقاويه',
  },
  {
    CIT_CODE: 18075,
    CIT_NAME_EN: 'ALEASILUH',
    CIT_NAME_AR: 'العسيله',
  },
  {
    CIT_CODE: 18076,
    CIT_NAME_EN: 'ALRAJIE',
    CIT_NAME_AR: 'الرجيع',
  },
  {
    CIT_CODE: 18077,
    CIT_NAME_EN: "HULAT 'IIBRAHIM EISAA",
    CIT_NAME_AR: 'حلة ابراهيم عيسى',
  },
  {
    CIT_CODE: 18078,
    CIT_NAME_EN: 'ALKAWMUH',
    CIT_NAME_AR: 'الكومه',
  },
  {
    CIT_CODE: 18210,
    CIT_NAME_EN: 'AL SHABITAH',
    CIT_NAME_AR: 'الشابطه',
  },
  {
    CIT_CODE: 18285,
    CIT_NAME_EN: 'SALAM BANI WASAL',
    CIT_NAME_AR: 'سلام بني واصل',
  },
  {
    CIT_CODE: 19924,
    CIT_NAME_EN: 'AL GHAFQIYAH',
    CIT_NAME_AR: 'الغفقيه',
  },
  {
    CIT_CODE: 19927,
    CIT_NAME_EN: 'ASH SHUAFULIYAH',
    CIT_NAME_AR: 'الشعفوليه',
  },
  {
    CIT_CODE: 21984,
    CIT_NAME_EN: 'AL QADHANAH',
    CIT_NAME_AR: 'قذانه',
  },
  {
    CIT_CODE: 22799,
    CIT_NAME_EN: 'AL-DAHWAT',
    CIT_NAME_AR: 'الضحوات',
  },
  {
    CIT_CODE: 23385,
    CIT_NAME_EN: 'ABURAWAS',
    CIT_NAME_AR: 'ابورواث',
  },
  {
    CIT_CODE: 23386,
    CIT_NAME_EN: 'HEDEB',
    CIT_NAME_AR: 'هديب',
  },
  {
    CIT_CODE: 23408,
    CIT_NAME_EN: 'ATHNAB',
    CIT_NAME_AR: 'أطناب',
  },
  {
    CIT_CODE: 23416,
    CIT_NAME_EN: 'BASITHAH',
    CIT_NAME_AR: 'بسيطاء',
  },
  {
    CIT_CODE: 34,
    CIT_NAME_EN: 'ALUMAIH',
    CIT_NAME_AR: 'المويه',
  },
  {
    CIT_CODE: 37,
    CIT_NAME_EN: 'Al Ardiyat',
    CIT_NAME_AR: 'العرضيات',
  },
  {
    CIT_CODE: 38,
    CIT_NAME_EN: 'AZ ZAYTAH',
    CIT_NAME_AR: 'الزيتة',
  },
  {
    CIT_CODE: 10003,
    CIT_NAME_EN: 'AL-MAHD',
    CIT_NAME_AR: 'المهد',
  },
  {
    CIT_CODE: 71,
    CIT_NAME_EN: 'SDER',
    CIT_NAME_AR: 'سدير',
  },
  {
    CIT_CODE: 86,
    CIT_NAME_EN: 'AS SAFFANIYAH',
    CIT_NAME_AR: 'السفانية',
  },
  {
    CIT_CODE: 101,
    CIT_NAME_EN: "AL 'AYTALIYAH",
    CIT_NAME_AR: 'العيطلية',
  },
  {
    CIT_CODE: 103,
    CIT_NAME_EN: 'ASH SHAMLUL (UMM AQLA)',
    CIT_NAME_AR: 'الشملول / ام عقلا',
  },
  {
    CIT_CODE: 122,
    CIT_NAME_EN: 'UTAYYIQ',
    CIT_NAME_AR: 'عتيق',
  },
  {
    CIT_CODE: 132,
    CIT_NAME_EN: 'AZ ZUGHAYN',
    CIT_NAME_AR: 'الزغين',
  },
  {
    CIT_CODE: 146,
    CIT_NAME_EN: 'UMM SUDAYRAH',
    CIT_NAME_AR: 'أم سديرة',
  },
  {
    CIT_CODE: 168,
    CIT_NAME_EN: 'AL-ARTAWYAH',
    CIT_NAME_AR: 'الأرطاوية',
  },
  {
    CIT_CODE: 180,
    CIT_NAME_EN: 'MISHLAH',
    CIT_NAME_AR: 'مشلح',
  },
  {
    CIT_CODE: 201,
    CIT_NAME_EN: 'RUHAYB',
    CIT_NAME_AR: 'رحيب',
  },
  {
    CIT_CODE: 213,
    CIT_NAME_EN: 'MADAIN AS SALIH',
    CIT_NAME_AR: 'مدائن الصالح',
  },
  {
    CIT_CODE: 10000,
    CIT_NAME_EN: 'AL HUMAYDAH',
    CIT_NAME_AR: 'الحميضة',
  },
  {
    CIT_CODE: 10001,
    CIT_NAME_EN: 'AD DURRAH',
    CIT_NAME_AR: 'الدرة',
  },
  {
    CIT_CODE: 10002,
    CIT_NAME_EN: 'ALJOWF',
    CIT_NAME_AR: 'الجوف',
  },
  {
    CIT_CODE: 10004,
    CIT_NAME_EN: 'AKBAD',
    CIT_NAME_AR: 'أكباد',
  },
  {
    CIT_CODE: 10005,
    CIT_NAME_EN: 'TAREEB',
    CIT_NAME_AR: 'طريب',
  },
  {
    CIT_CODE: 10006,
    CIT_NAME_EN: 'ALHADEETHA',
    CIT_NAME_AR: 'الحديثه',
  },
  {
    CIT_CODE: 10007,
    CIT_NAME_EN: 'KING FAHAD CAUSEWAY',
    CIT_NAME_AR: 'جسر الملك فهد',
  },
  {
    CIT_CODE: 10008,
    CIT_NAME_EN: 'AL-OAYKILAH',
    CIT_NAME_AR: 'العويقيلة',
  },
  {
    CIT_CODE: 10009,
    CIT_NAME_EN: 'Farasan',
    CIT_NAME_AR: 'جزر فرسان',
  },
  {
    CIT_CODE: 10010,
    CIT_NAME_EN: 'Khubash',
    CIT_NAME_AR: 'خباش',
  },
  {
    CIT_CODE: 10011,
    CIT_NAME_EN: 'AL-SHKEK BJEZAN',
    CIT_NAME_AR: 'الشقيق بجازان',
  },
  {
    CIT_CODE: 10012,
    CIT_NAME_EN: 'AL-ARDYAH AL-JANOUBYAH',
    CIT_NAME_AR: 'العرضيةالجنوبية',
  },
  {
    CIT_CODE: 10013,
    CIT_NAME_EN: 'AFFRA',
    CIT_NAME_AR: 'عفراء',
  },
  {
    CIT_CODE: 10014,
    CIT_NAME_EN: "BADR AL-JANO'OB",
    CIT_NAME_AR: 'بدر الجنود',
  },
  {
    CIT_CODE: 10015,
    CIT_NAME_EN: 'AR RUWAYDAH',
    CIT_NAME_AR: 'الرويضة',
  },
  {
    CIT_CODE: 10016,
    CIT_NAME_EN: "AL QA'IYAH",
    CIT_NAME_AR: 'القاعية',
  },
  {
    CIT_CODE: 10017,
    CIT_NAME_EN: 'AL KHUNQAH',
    CIT_NAME_AR: 'الخنقة',
  },
  {
    CIT_CODE: 10018,
    CIT_NAME_EN: 'SAJIR',
    CIT_NAME_AR: 'ساجر',
  },
  {
    CIT_CODE: 10019,
    CIT_NAME_EN: 'NIFI',
    CIT_NAME_AR: 'نفي',
  },
  {
    CIT_CODE: 10020,
    CIT_NAME_EN: 'HALABAN',
    CIT_NAME_AR: 'حلبان',
  },
  {
    CIT_CODE: 10021,
    CIT_NAME_EN: 'TUHAYY',
    CIT_NAME_AR: 'طحي',
  },
  {
    CIT_CODE: 10022,
    CIT_NAME_EN: 'AR RAYN',
    CIT_NAME_AR: 'الرين',
  },
  {
    CIT_CODE: 10023,
    CIT_NAME_EN: 'AZ ZAYMAH',
    CIT_NAME_AR: 'الزيمة',
  },
  {
    CIT_CODE: 10024,
    CIT_NAME_EN: 'ASH SHUMAYSI',
    CIT_NAME_AR: 'الشميسي',
  },
  {
    CIT_CODE: 10025,
    CIT_NAME_EN: "ASH SHA'IBAH",
    CIT_NAME_AR: 'الشعيبة',
  },
  {
    CIT_CODE: 10026,
    CIT_NAME_EN: 'AS SUWAYDIRAH',
    CIT_NAME_AR: 'الصويدرة',
  },
  {
    CIT_CODE: 10027,
    CIT_NAME_EN: 'BATHA',
    CIT_NAME_AR: 'بطحاء',
  },
  {
    CIT_CODE: 10028,
    CIT_NAME_EN: 'SALWA',
    CIT_NAME_AR: 'سلوى',
  },
  {
    CIT_CODE: 10029,
    CIT_NAME_EN: "ASH SHI'BAH",
    CIT_NAME_AR: 'الشعبة',
  },
  {
    CIT_CODE: 10030,
    CIT_NAME_EN: 'AL HUFAYRAH',
    CIT_NAME_AR: ' الحفيرة',
  },
  {
    CIT_CODE: 10031,
    CIT_NAME_EN: 'AL KHADRA',
    CIT_NAME_AR: 'الخضراء',
  },
  {
    CIT_CODE: 10032,
    CIT_NAME_EN: 'AL HARAJAH',
    CIT_NAME_AR: 'الحرجة',
  },
  {
    CIT_CODE: 10033,
    CIT_NAME_EN: 'BASHUT',
    CIT_NAME_AR: 'باشوت',
  },
  {
    CIT_CODE: 10034,
    CIT_NAME_EN: 'MUHAYIL',
    CIT_NAME_AR: 'محايل',
  },
  {
    CIT_CODE: 10035,
    CIT_NAME_EN: 'AL HURAYDAH',
    CIT_NAME_AR: 'الحريضة',
  },
  {
    CIT_CODE: 10036,
    CIT_NAME_EN: "ASH SHA'F",
    CIT_NAME_AR: 'الشعف',
  },
  {
    CIT_CODE: 10037,
    CIT_NAME_EN: 'AL JAWWAH',
    CIT_NAME_AR: 'الجوة',
  },
  {
    CIT_CODE: 10038,
    CIT_NAME_EN: 'ALB',
    CIT_NAME_AR: 'علب',
  },
  {
    CIT_CODE: 10039,
    CIT_NAME_EN: 'AL MASQI',
    CIT_NAME_AR: 'المسقي',
  },
  {
    CIT_CODE: 10040,
    CIT_NAME_EN: 'HALAT AMMAR',
    CIT_NAME_AR: 'حالة عمار',
  },
  {
    CIT_CODE: 10041,
    CIT_NAME_EN: 'AL JAHARA',
    CIT_NAME_AR: 'الجهراء',
  },
  {
    CIT_CODE: 10042,
    CIT_NAME_EN: 'AL KHUTTAH',
    CIT_NAME_AR: 'الخطة',
  },
  {
    CIT_CODE: 10043,
    CIT_NAME_EN: 'JUBBAH',
    CIT_NAME_AR: 'جبه',
  },
  {
    CIT_CODE: 10044,
    CIT_NAME_EN: "JADIDAT 'AR'AR",
    CIT_NAME_AR: 'جديدة عرعر',
  },
  {
    CIT_CODE: 10045,
    CIT_NAME_EN: 'AIBAN',
    CIT_NAME_AR: 'عيبان',
  },
  {
    CIT_CODE: 10046,
    CIT_NAME_EN: 'SABYA',
    CIT_NAME_AR: 'صبيا',
  },
  {
    CIT_CODE: 10047,
    CIT_NAME_EN: 'ASH SHUQAIRI',
    CIT_NAME_AR: 'الشقيري',
  },
  {
    CIT_CODE: 10048,
    CIT_NAME_EN: 'AL MUWASSAM',
    CIT_NAME_AR: 'الموسم',
  },
  {
    CIT_CODE: 10049,
    CIT_NAME_EN: "AL WADI'AH",
    CIT_NAME_AR: 'الوديعة',
  },
  {
    CIT_CODE: 10050,
    CIT_NAME_EN: 'AL HUSAYNIYAH',
    CIT_NAME_AR: 'الحصينية',
  },
  {
    CIT_CODE: 10051,
    CIT_NAME_EN: "AL 'ARAYYISAH",
    CIT_NAME_AR: 'العريسة',
  },
  {
    CIT_CODE: 10052,
    CIT_NAME_EN: 'AL QUSAYBA',
    CIT_NAME_AR: 'القصيباء',
  },
  {
    CIT_CODE: 10053,
    CIT_NAME_EN: "TAL'AT 'AMMAR",
    CIT_NAME_AR: 'طلعة عمار',
  },
  {
    CIT_CODE: 10054,
    CIT_NAME_EN: 'QIBAH',
    CIT_NAME_AR: 'قبة',
  },
  {
    CIT_CODE: 10055,
    CIT_NAME_EN: 'ASH SHANANAH',
    CIT_NAME_AR: 'الشنانة',
  },
];

export default cities;
