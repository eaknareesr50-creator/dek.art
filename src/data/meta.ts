import type { FaqCategory, Level } from '../types';

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: 'เริ่มต้น',
  intermediate: 'ปานกลาง',
  advanced: 'ขั้นสูง',
};

export const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];

export const FAQ_CATEGORY_LABEL: Record<FaqCategory, string> = {
  general: 'ทั่วไป',
  learning: 'การเรียนรู้',
  consult: 'การปรึกษา',
  software: 'โปรแกรมและอุปกรณ์',
};

export const FAQ_CATEGORIES: FaqCategory[] = ['general', 'learning', 'consult', 'software'];
