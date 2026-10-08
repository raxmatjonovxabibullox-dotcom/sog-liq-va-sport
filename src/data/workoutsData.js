export const workoutPlans = [
  {
    id: "workout-1",
    title: {
      uz: "Yog' yoqish va Ozish (HIIT Kardio)",
      ru: "Жиросжигание и Похудение (HIIT Кардио)",
      en: "Fat Burn & Weight Loss (HIIT Cardio)",
    },
    duration: "25 daqiqa",
    calories: "280 - 350 kcal",
    level: { uz: "Boshlang'ich / O'rta", ru: "Начальный / Средний", en: "Beginner / Intermediate" },
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    exercises: [
      { name: "Jumping Jacks (Sakrash)", time: "45 soniya", rest: "15 soniya" },
      { name: "High Knees (Tizlarni baland ko'tarish)", time: "40 soniya", rest: "20 soniya" },
      { name: "Burpees (To'liq burpi)", time: "30 soniya", rest: "30 soniya" },
      { name: "Mountain Climbers (Tog'ga chiqish)", time: "45 soniya", rest: "15 soniya" },
      { name: "Squat Jumps (O'tirib sakrash)", time: "40 soniya", rest: "20 soniya" },
    ]
  },
  {
    id: "workout-2",
    title: {
      uz: "Mushak Massasi va Kuch Mashqlari",
      ru: "Набор Мышечной Массы и Сила",
      en: "Muscle Mass & Strength Builder",
    },
    duration: "45 daqiqa",
    calories: "400 - 500 kcal",
    level: { uz: "O'rta / Yuqori", ru: "Средний / Продвинутый", en: "Intermediate / Advanced" },
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    exercises: [
      { name: "Gantellar bilan o'tirish (Goblet Squat)", time: "4 set x 12 marta", rest: "60 soniya" },
      { name: "Polga tayangan holda qo'llarni bukib yozish (Push-ups)", time: "4 set x 15 marta", rest: "45 soniya" },
      { name: "Gantellarni yelkaga ko'tarish (Shoulder Press)", time: "3 set x 12 marta", rest: "60 soniya" },
      { name: "Biceps ko'tarish (Dumbbell Curls)", time: "3 set x 12 marta", rest: "45 soniya" },
      { name: "Planka (Plank Core Hold)", time: "3 set x 60 soniya", rest: "30 soniya" },
    ]
  },
  {
    id: "workout-3",
    title: {
      uz: "Qorin mushaklari va Po'latdek Press (Core)",
      ru: "Рельефный Пресс и Сильный Кор",
      en: "Six-Pack Abs & Strong Core",
    },
    duration: "15 daqiqa",
    calories: "160 - 200 kcal",
    level: { uz: "Hamma uchun", ru: "Для всех", en: "All Levels" },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    exercises: [
      { name: "Klassik Crunch (Qorin burish)", time: "3 set x 20 marta", rest: "30 soniya" },
      { name: "Velosiped mashqi (Bicycle Crunches)", time: "45 soniya", rest: "20 soniya" },
      { name: "Oyoqlarni osilgan holda ko'tarish (Leg Raises)", time: "3 set x 15 marta", rest: "30 soniya" },
      { name: "Yon planka (Side Plank)", time: "Har bir tomon 30 soniya", rest: "20 soniya" },
      { name: "Vakuum mashqi (Qorin tortish)", time: "5 marta x 15 soniya", rest: "15 soniya" },
    ]
  }
];

export const healthyTips = [
  {
    title: {
      uz: "Oqsil (Protein) me'yori",
      ru: "Норма белка в день",
      en: "Daily Protein Intake",
    },
    text: {
      uz: "Mushaklarni o'stirish va tiklash uchun har 1 kg tana vazniga 1.6 - 2.2 gramm oqsil iste'mol qilish zarur.",
      ru: "Для роста и восстановления мышц необходимо потреблять 1.6 - 2.2 г белка на 1 кг веса тела.",
      en: "Aim for 1.6 to 2.2 grams of protein per kilogram of body weight to support muscle recovery and growth.",
    },
    icon: "drumstick"
  },
  {
    title: {
      uz: "Suv balansi",
      ru: "Водный баланс",
      en: "Hydration Balance",
    },
    text: {
      uz: "Mashg'ulot paytida har 15-20 daqiqada 150-200 ml suv ichib turing. Suvsizlanish kuchni 15% gacha kamaytiradi.",
      ru: "Пейте 150-200 мл воды каждые 15-20 минут во время тренировок. Обезвоживание снижает силу на 15%.",
      en: "Sip 150-200ml of water every 15-20 mins during exercise. Dehydration can reduce strength by 15%.",
    },
    icon: "droplet"
  },
  {
    title: {
      uz: "To'liq uyqu va Tiklanish",
      ru: "Сон и Восстановление",
      en: "Sleep & Recovery",
    },
    text: {
      uz: "Mushaklar zalda emas, balki chuqur uyqu paytida (7-8 soat) tiklanadi va o'sadi.",
      ru: "Мышцы восстанавливаются и растут во время глубокого сна (7-8 часов), а не на тренировке.",
      en: "Muscles recover and grow during deep sleep (7-8 hours), making restful recovery non-negotiable.",
    },
    icon: "moon"
  }
];
