export type TransitionMode = "slats" | "laser" | "dolly" | "monogram" | "curtain";

export interface TransitionOption {
  id: TransitionMode;
  number: string;
  name: string;
  nameArabic: string;
  description: string;
}

export const TRANSITION_OPTIONS: TransitionOption[] = [
  {
    id: "slats",
    number: "01",
    name: "Architectural Blue Slats",
    nameArabic: "الستارة المعمارية الزرقاء (شرائح)",
    description: "5 أعمدة معمارية رأسية باللون الأزرق الملكي والسيان تنغلق وتفتح بتتابع زمني فخم.",
  },
  {
    id: "laser",
    number: "02",
    name: "Laser Horizon Sweep",
    nameArabic: "مسحة الليزر الأزرق",
    description: "ستارة داكنة يتقدمها خط ليزري أزرق نقي متناسق مع إضاءة الموقع.",
  },
  {
    id: "dolly",
    number: "03",
    name: "3D Camera Dolly",
    nameArabic: "عمق الكاميرا ثلاثية الأبعاد",
    description: "حركة كاميرا سينمائية نحو العمق مع تراجع وتكبير سلس وتعتيم فوري.",
  },
  {
    id: "monogram",
    number: "04",
    name: "Minimal Monogram",
    nameArabic: "الستارة المصمتة مع اللوجو",
    description: "حجاب أسود فخم تومض فيه كلمة KV STUDIO وإحداثيات رقمية.",
  },
  {
    id: "curtain",
    number: "05",
    name: "Curtain Drop",
    nameArabic: "الستارة التنازلية الموحدة",
    description: "نزول ستائري من الأعلى للأسفل متطابق مع فيزياء كروت الخدمات.",
  },
];
