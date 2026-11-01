import type { Program, ProgramSlug } from '../types';

export const programs: Program[] = [
  {
    slug: 'photoshop',
    name: 'Adobe Photoshop',
    abbr: 'Ps',
    category: 'ภาพและรีทัช',
    tagline: 'แต่งภาพ รีทัช และออกแบบกราฟิกแบบพิกเซล',
    description:
      'Photoshop เป็นโปรแกรมมาตรฐานสำหรับงานภาพถ่าย การรีทัช การทำโปสเตอร์ แบนเนอร์ และการตัดต่อภาพ เหมาะกับคนที่ต้องการควบคุมรายละเอียดของภาพได้ลึกที่สุด',
    color1: '#31a8ff',
    color2: '#6366f1',
    platforms: ['Windows', 'macOS', 'iPad'],
    bestFor: ['แต่งภาพถ่าย', 'ออกแบบโปสเตอร์/แบนเนอร์', 'ทำ Mockup และรีทัชผิว'],
    skills: ['Layer & Mask', 'Selection', 'Adjustment Layers', 'Retouching'],
  },
  {
    slug: 'illustrator',
    name: 'Adobe Illustrator',
    abbr: 'Ai',
    category: 'เวกเตอร์',
    tagline: 'วาดโลโก้ ไอคอน และภาพประกอบแบบเวกเตอร์',
    description:
      'Illustrator ใช้สร้างงานเวกเตอร์ที่ขยายได้ไม่จำกัดโดยภาพไม่แตก เหมาะกับโลโก้ ไอคอน แพ็กเกจจิ้ง และงานพิมพ์ที่ต้องคมชัดทุกขนาด',
    color1: '#ff9a00',
    color2: '#ff5e3a',
    platforms: ['Windows', 'macOS', 'iPad'],
    bestFor: ['ออกแบบโลโก้', 'ไอคอนและอินโฟกราฟิก', 'ภาพประกอบเวกเตอร์'],
    skills: ['Pen Tool', 'Pathfinder', 'Image Trace', 'Typography'],
  },
  {
    slug: 'after-effects',
    name: 'Adobe After Effects',
    abbr: 'Ae',
    category: 'โมชั่นกราฟิก',
    tagline: 'ทำโมชั่นกราฟิกและเอฟเฟกต์วิดีโอ',
    description:
      'After Effects ใช้สร้างแอนิเมชันกราฟิก ไตเติล เอฟเฟกต์ และงาน Visual Effects เหมาะกับคนที่อยากให้งานดีไซน์ขยับได้อย่างมีชีวิตชีวา',
    color1: '#9999ff',
    color2: '#7c3aed',
    platforms: ['Windows', 'macOS'],
    bestFor: ['Motion Graphics', 'Title/Lower Third', 'เอฟเฟกต์วิดีโอ'],
    skills: ['Keyframe', 'Graph Editor', 'Text Animator', 'Expressions'],
  },
  {
    slug: 'premiere-pro',
    name: 'Adobe Premiere Pro',
    abbr: 'Pr',
    category: 'ตัดต่อวิดีโอ',
    tagline: 'ตัดต่อ ปรับสี และทำเสียงวิดีโอแบบมืออาชีพ',
    description:
      'Premiere Pro เป็นโปรแกรมตัดต่อวิดีโอครบวงจร ตั้งแต่เรียงคลิป ปรับสี จัดการเสียง ไปจนถึง Export ไปยังทุกแพลตฟอร์ม',
    color1: '#ea77ff',
    color2: '#c026d3',
    platforms: ['Windows', 'macOS'],
    bestFor: ['ตัดต่อ YouTube/Reels', 'ภาพยนตร์สั้น', 'ปรับสีและเสียง'],
    skills: ['Timeline Editing', 'Lumetri Color', 'Essential Sound', 'Export'],
  },
  {
    slug: 'procreate',
    name: 'Procreate',
    abbr: 'Pc',
    category: 'วาดภาพดิจิทัล',
    tagline: 'วาดภาพดิจิทัลบน iPad ด้วยแปรงสุดลื่น',
    description:
      'Procreate เป็นแอปวาดภาพสำหรับ iPad ที่ใช้งานง่าย มีแปรงหลากหลายและตอบสนองรวดเร็ว เหมาะกับนักวาดภาพประกอบ ตัวละคร และแอนิเมชันสั้น ๆ',
    color1: '#2dd4bf',
    color2: '#0ea5e9',
    platforms: ['iPad (Apple Pencil)'],
    bestFor: ['วาดภาพประกอบ', 'ออกแบบตัวละคร', 'Lettering และแอนิเมชันสั้น'],
    skills: ['Brush Studio', 'Layers & Clipping', 'Color Harmony', 'Animation Assist'],
  },
];

export function getProgram(slug: ProgramSlug): Program {
  const found = programs.find((p) => p.slug === slug);
  if (!found) {
    throw new Error(`Unknown program: ${slug}`);
  }
  return found;
}

export function isProgramSlug(value: string | null | undefined): value is ProgramSlug {
  return programs.some((p) => p.slug === value);
}
