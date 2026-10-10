export const initialProducts = [
  // 1. Sport Ozuqalari (Nutrition)
  {
    id: "prod-1",
    name: "Optimum Nutrition Gold Standard 100% Whey Protein Double Rich Chocolate (2.27 kg)",
    category: "nutrition",
    categoryLabel: "Sport ozuqalari",
    price: 980000,
    oldPrice: 1150000,
    image: "/products/prod_1_on_whey.jpg",
    rating: 4.9,
    reviewsCount: 248,
    stock: 35,
    featured: true,
    description: "Dunyoning eng mashhur va eng ko'p sotilgan zardob oqsili (Whey Protein Isolate). Har bir portsiyada 24g ultra-toza oqsil, 5.5g BCAA va 4g glutamin mavjud. Mushaklarni o'stirish, mashg'ulotdan keyin tez tiklanish uchun 100% original AQSH mahsuloti.",
    specs: ["24g toza protein har bir portsiyada", "5.5g tabiiy BCAA aminokislotalari", "74 portsiyalik katta banka (2.27 kg)", "AQSHda ishlab chiqarilgan, 100% original"]
  },
  {
    id: "prod-2",
    name: "Dymatize ISO100 Hydrolyzed 100% Whey Isolate Gourmet Vanilla (2.3 kg)",
    category: "nutrition",
    categoryLabel: "Sport ozuqalari",
    price: 1190000,
    oldPrice: 1350000,
    image: "/products/prod_2_dymatize.jpg",
    rating: 5.0,
    reviewsCount: 184,
    stock: 22,
    featured: true,
    description: "Gidrolizlangan ultra-toza zardob izolati. Yog' va shakarsiz (0g shakar, 1g kam uglevod). Oshqozonga tez va yengil so'riladi, quruq mushak to'plash va ozish davrida professional sportchilarning 1-raqamli tanlovi.",
    specs: ["25g gidrolizlangan ultra-toza izolat", "5.5g BCAA va 2.6g leytsin", "Laktosoz va glutensiz formula", "Vazni: 2.3 kg (76 porsiya)"]
  },
  {
    id: "prod-3",
    name: "MuscleTech Platinum 100% Pure Creatine Monohydrate Micronized (400g)",
    category: "nutrition",
    categoryLabel: "Sport ozuqalari",
    price: 295000,
    oldPrice: 350000,
    image: "/products/prod_3_creatine.jpg",
    rating: 4.8,
    reviewsCount: 156,
    stock: 50,
    featured: true,
    description: "Mushak kuchi va chidamliligini portlovchi darajada oshiruvchi mikronlashtirilgan toza kreatin monogidrat. HPLC-testdan o'tgan ultra-mayin kukun suvda bir zumda eriydi va mushak hujayralariga kuch bag'ishlaydi.",
    specs: ["5g toza mikronlangan kreatin portsiyasi", "80 portsiyalik tejamkor banka", "Mazasi neytral (shakerga oson qo'shiladi)", "Mushak kuchi va hajmiga 100% kafolat"]
  },
  {
    id: "prod-4",
    name: "Universal Nutrition Animal Pak Multi-Vitamin Complex (44 Packs)",
    category: "nutrition",
    categoryLabel: "Sport ozuqalari",
    price: 490000,
    oldPrice: 560000,
    image: "/products/prod_4_animal_pak.jpg",
    rating: 4.9,
    reviewsCount: 92,
    stock: 18,
    featured: false,
    description: "Og'ir jismoniy mashg'ulotlar bilan shug'ullanuvchi sportchilar uchun afsonaviy kompleks. 85 dan ortiq ozuqaviy moddalar, vitaminlar, minerallar, antioksidantlar va ovqat hazm qilish fermentlarini o'z ichiga olgan qulay paketlar.",
    specs: ["44 ta alohida kunlik paketchalar", "Kuchli immunitet va yuqori baquvvatlik", "Aminokislotalar va fermentlar bilan boyitilgan", "Universal Nutrition (AQSH)"]
  },
  {
    id: "prod-5",
    name: "Cellucor C4 Original Pre-Workout Energetik Icy Blue Razz (390g)",
    category: "nutrition",
    categoryLabel: "Sport ozuqalari",
    price: 380000,
    oldPrice: 440000,
    image: "/products/prod_5_c4.jpg",
    rating: 4.8,
    reviewsCount: 114,
    stock: 30,
    featured: false,
    description: "Mashg'ulotdan oldin ichiladigan portlovchi energiya va diqqatni jamlovchi pre-workout majmuasi. Karnozin beta-alanin, kreatin nitrat va tabiiy kofein mashg'ulot davomida charchoqni his qildirmaydi.",
    specs: ["60 porsiyalik banka", "150mg toza kofein va beta-alanin", "Maksimal mushak nasosi (Pump effekti)", "Yoqimli mevali muz ta'mi"]
  },

  // 2. Trenajyor va Anjomlar (Equipment)
  {
    id: "prod-6",
    name: "Bowflex SelectTech 552 Sozlanuvchi Gantellar Juftligi (2-24 kg)",
    category: "equipment",
    categoryLabel: "Trenajyor va Anjomlar",
    price: 1850000,
    oldPrice: 2200000,
    image: "/products/prod_6_bowflex.jpg",
    rating: 5.0,
    reviewsCount: 88,
    stock: 12,
    featured: true,
    description: "15 juft alohida gantellar o'rnini bosuvchi innovatsion mexanizmga ega Bowflex sozlanuvchi metall gantellar. Qulay aylanuvchi disk orqali og'irlikni 2 kg dan 24 kg gacha soniyalarda o'zgartirish mumkin.",
    specs: ["2 kg dan 24 kg gacha sozlanuvchi og'irlik", "15 xil og'irlik rejimi bitta gantelda", "Sirpanmas kauchuk dastak va mustahkam podstavka", "Uy va fitnes zal uchun juda ixcham"]
  },
  {
    id: "prod-7",
    name: "Rogue Fitness Cast Iron Powder Coat Kettlebell Girya (16 kg)",
    category: "equipment",
    categoryLabel: "Trenajyor va Anjomlar",
    price: 420000,
    oldPrice: 490000,
    image: "/products/prod_7_rogue_kettlebell.jpg",
    rating: 4.9,
    reviewsCount: 73,
    stock: 20,
    featured: false,
    description: "Krossfit, funksional mashg'ulotlar va umumiy tana chidamliligini oshirish uchun yaxlit quyma temirdan tayyorlangan Rogue fitnes giryasi. Sirpanmaydigan mat qoplamasi qulay ushlashni ta'minlaydi.",
    specs: ["16 kg aniq vazn (1 Pud)", "Yaxlit monolit quyma temir", "Sirpanmas kukunli emal qoplama", "Rangli belgilash xalqasi"]
  },
  {
    id: "prod-8",
    name: "Manduka PRO Premium Ekologik Fitnes va Yoga Mat (6mm)",
    category: "equipment",
    categoryLabel: "Trenajyor va Anjomlar",
    price: 360000,
    oldPrice: 430000,
    image: "/products/prod_8_manduka_mat.jpg",
    rating: 4.9,
    reviewsCount: 65,
    stock: 28,
    featured: true,
    description: "Dunyodagi eng sifatli professional fitnes va yoga gilamchasi. 6mm zich ortopedik qatlami bo'g'im va tizzalarni qattiq poldan to'liq himoya qiladi. Terlaganda ham sirpanmaydi va umrbod xizmat qiladi.",
    specs: ["180 x 66 sm keng o'lcham", "6 mm ortopedik yuqori zichlik", "100% ekologik va toksinsiz sertifikat", "Sirpanmaydigan maxsus tekstura"]
  },
  {
    id: "prod-9",
    name: "Rogue SR-1 Bearing Speed Rope Professional Sakrash Arqoni",
    category: "equipment",
    categoryLabel: "Trenajyor va Anjomlar",
    price: 135000,
    oldPrice: 170000,
    image: "/products/prod_9_speed_rope.jpg",
    rating: 4.8,
    reviewsCount: 140,
    stock: 45,
    featured: false,
    description: "Boks, krossfit va tezkor kardio mashg'ulotlari uchun maxsus podshipnikli professional po'lat trosli skakalka. 360 daraja erkin aylanuvchi nozik podshipniklar soniyada 6-7 aylanish tezligini beradi.",
    specs: ["3 metr uzunlikdagi neylon qoplamali po'lat tros", "Alyuminiy nozik dastaklar", "Ikki tomonlama sharikli podshipnik", "Qulay sozlanuvchi fiksator"]
  },
  {
    id: "prod-10",
    name: "Iron Gym Total Upper Body Mashg'ulot Turnik & Brus Tizimi",
    category: "equipment",
    categoryLabel: "Trenajyor va Anjomlar",
    price: 270000,
    oldPrice: 330000,
    image: "/products/prod_10_pullup_bar.jpg",
    rating: 4.7,
    reviewsCount: 57,
    stock: 16,
    featured: false,
    description: "Eshik romiga devorni teshib o'tirmasdan bir zumda o'rnatiladigan ko'p funksiyali xonadon turnigi. Ko'krak, orqa, yelka, qo'l va press mushaklarini to'liq mashq qildirish imkonini beradi.",
    specs: ["130 kg gacha maksimal yuklama", "Eshik romiga osongina ilinadi", "Yumshoq neopren ushlagichlar", "Otjimaniye va press uchun polga ham qo'yiladi"]
  },

  // 3. Sport Kiyimlari (Apparel & Footwear)
  {
    id: "prod-11",
    name: "Nike Air Zoom Pegasus 40 Professional Yugurish Krossovkasi",
    category: "wear",
    categoryLabel: "Sport kiyimlari",
    price: 890000,
    oldPrice: 1050000,
    image: "/products/prod_11_nike_pegasus.jpg",
    rating: 4.9,
    reviewsCount: 215,
    stock: 24,
    featured: true,
    description: "Nike kompaniyasining afsonaviy yugurish va fitnes krossovkasi. Zoom Air texnologiyasi har bir qadamda elastik qaytish va amortizatsiya beradi. Nafas oluvchi to'rli yuqori qism oyoqni salqin saqlaydi.",
    specs: ["Nike React ko'pik va ikkitalik Zoom Air bloki", "Yengil va nafas oluvchi Engineered Mesh", "O'lchamlar: 40, 41, 42, 43, 44, 45", "100% Original Nike mahsuloti"]
  },
  {
    id: "prod-12",
    name: "Under Armour HeatGear Armour Erkaklar Kompression Sport Futbolkasi",
    category: "wear",
    categoryLabel: "Sport kiyimlari",
    price: 245000,
    oldPrice: 290000,
    image: "/products/prod_12_under_armour.jpg",
    rating: 4.8,
    reviewsCount: 84,
    stock: 32,
    featured: true,
    description: "Mushaklarni to'g'ri fiksatsiya qiluvchi, qon aylanishini yaxshilovchi original Under Armour kompressiya kiyimi. HeatGear texnologiyasi terni tez chiqaradi va badanni quruq saqlaydi.",
    specs: ["84% Poliester, 16% Elastan", "4-tomonlama erkin cho'ziluvchi mato", "Antibakterial Anti-Odor hidga qarshi qatlam", "O'lchamlar: S, M, L, XL, XXL"]
  },
  {
    id: "prod-13",
    name: "Gymshark Vital Seamless 2.0 High-Waist Ayollar Fitnes Legginsi",
    category: "wear",
    categoryLabel: "Sport kiyimlari",
    price: 340000,
    oldPrice: 410000,
    image: "/products/prod_13_gymshark.jpg",
    rating: 5.0,
    reviewsCount: 167,
    stock: 19,
    featured: true,
    description: "Dunyodagi eng ommabop ayollar fitnes legginsi. Choksiz Seamless to'qilishi tufayli teriga botmaydi, qorin qismini chiroyli tortadi va orqa qomatni yanada jozibador ko'rsatadi.",
    specs: ["Baland bel (High-Waist korset effekti)", "Squat-Proof (qorong'uda ham shaffof bo'lmaydi)", "Yumshoq, elastik va nafas oluvchi material", "O'lchamlar: XS, S, M, L"]
  },

  // 4. Aksessuarlar va Gadjetlar (Accessories)
  {
    id: "prod-14",
    name: "BlenderBottle Strada Tritan Sport Shaker (820 ml, Qulflanuvchi Qopqoq)",
    category: "accessories",
    categoryLabel: "Aksessuarlar",
    price: 145000,
    oldPrice: 180000,
    image: "/products/prod_14_blenderbottle.jpg",
    rating: 4.9,
    reviewsCount: 198,
    stock: 60,
    featured: false,
    description: "BPA-free zarbaga chidamli Eastman Tritan shishasimon materialidan ishlangan premium shaker. Jarrohlik po'latidan qilingan prujinali to'pi eng quyuq proteinni ham 10 soniyada tugunsiz aralashtiradi.",
    specs: ["820 ml sig'im o'lchov shkalasi bilan", "Tugmali qulflanuvchi germetik qopqoq", "Hid va dog' o'tkazmaydigan Tritan plastmassa", "Idish yuvish mashinasiga 100% mos"]
  },
  {
    id: "prod-15",
    name: "Apple Watch Ultra 2 Titanium 49mm GPS + Cellular Sport Smart Soati",
    category: "accessories",
    categoryLabel: "Aksessuarlar",
    price: 1250000,
    oldPrice: 1480000,
    image: "/products/prod_15_apple_watch.jpg",
    rating: 5.0,
    reviewsCount: 122,
    stock: 15,
    featured: true,
    description: "Ekstremal sportchilar va yuguruvchilar uchun titan korpusli eng baquvvat aqlli soat. Yurak urishi, EKG, qondagi kislorod (SpO2), tana harorati, yugurish kadansi va chuqur uyqu tahlilini yuritadi.",
    specs: ["Aviatsiya darajasidagi 49mm Titan korpus", "3000 nit yorqinlikdagi Sapphire Crystal displey", "100 metr suvga chidamlilik va kompas", "Sport mashg'ulotlarida 72 soatlik quvvat"]
  },
  {
    id: "prod-16",
    name: "Hydro Flask 32 oz Wide Mouth Zanglamas Po'lat Termos (946 ml)",
    category: "accessories",
    categoryLabel: "Aksessuarlar",
    price: 230000,
    oldPrice: 280000,
    image: "/products/prod_16_hydro_flask.jpg",
    rating: 4.9,
    reviewsCount: 110,
    stock: 34,
    featured: false,
    description: "TempShield ikki qavatli vakuum izolyatsiyali original Hydro Flask sport termosi. Ichimliklarni 24 soat muzdek sovuq va 12 soat issiq saqlaydi. 18/8 oziq-ovqat zanglamas po'latidan ishlangan.",
    specs: ["946 ml (32 oz) sig'im", "24 soat sovuq / 12 soat issiq harorat nazorati", "Kukunli rangli sirpanmas Color Last qoplama", "BPA-free va ta'm o'zgartirmaydi"]
  }
];

export const productCategories = [
  { id: "all", labelUz: "Barchasi", labelRu: "Все товары", labelEn: "All Products" },
  { id: "nutrition", labelUz: "Sport ozuqalari", labelRu: "Спортивное питание", labelEn: "Sports Nutrition" },
  { id: "equipment", labelUz: "Trenajyor va anjomlar", labelRu: "Тренажеры и инвентарь", labelEn: "Equipment & Gym" },
  { id: "wear", labelUz: "Sport kiyimlari", labelRu: "Спортивная одежда", labelEn: "Sportswear & Apparel" },
  { id: "accessories", labelUz: "Aksessuarlar", labelRu: "Фитнес аксессуары", labelEn: "Fitness Accessories" },
];

export const getCategoryLabel = (catId, lang = "uz") => {
  const found = productCategories.find((c) => c.id === catId);
  if (!found) return catId;
  if (lang === "ru") return found.labelRu;
  if (lang === "en") return found.labelEn;
  return found.labelUz;
};
