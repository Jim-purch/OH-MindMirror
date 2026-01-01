import { ToyDefinition } from '../../types';

// Icons using simplified SVG paths (viewBox 0 0 24 24 standard)
// These represent a wide variety of symbols used in Sandplay therapy.

const CATEGORIES = {
  PEOPLE: '人物',
  NATURE: '自然',
  ANIMALS: '动物',
  BUILDINGS: '建筑',
  TRANSPORT: '交通',
  SYMBOLS: '象征',
  FANTASY: '幻想'
};

export const TOY_DATA: ToyDefinition[] = [
  // --- PEOPLE (人物) ---
  {
    id: 'p_man',
    name: '男人',
    category: CATEGORIES.PEOPLE,
    svg: '<circle cx="12" cy="7" r="4" fill="currentColor"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    defaultColor: '#4B5563'
  },
  {
    id: 'p_woman',
    name: '女人',
    category: CATEGORIES.PEOPLE,
    svg: '<circle cx="12" cy="7" r="4" fill="currentColor"/><path d="M5.5 21v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    defaultColor: '#EC4899'
  },
  {
    id: 'p_baby',
    name: '婴儿',
    category: CATEGORIES.PEOPLE,
    svg: '<circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="10" r="1" fill="currentColor"/><path d="M10 14h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    defaultColor: '#FDBA74'
  },
  {
    id: 'p_oldman',
    name: '老人',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#9CA3AF'
  },
  {
    id: 'p_police',
    name: '警察',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M12 2l-4 4h8l-4-4z" fill="currentColor"/><circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#1E40AF'
  },
  {
    id: 'p_doctor',
    name: '医生',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M12 4v4m-2-2h4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#10B981'
  },
  {
    id: 'p_soldier',
    name: '士兵',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M5 6l7-4 7 4v4c0 6-7 10-7 10S5 16 5 10V6z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#3F6212'
  },
  {
    id: 'p_king',
    name: '国王',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M12 2l3 5h-6l3-5z" fill="currentColor"/><path d="M4 22h16M4 18h16m-4-4h4" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#F59E0B'
  },
  {
    id: 'p_queen',
    name: '女王',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M12 2l3 5h-6l3-5z" fill="currentColor"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#9333EA'
  },
  {
    id: 'p_family',
    name: '家庭',
    category: CATEGORIES.PEOPLE,
    svg: '<circle cx="8" cy="10" r="3" fill="currentColor"/><circle cx="16" cy="10" r="3" fill="currentColor"/><circle cx="12" cy="16" r="2" fill="currentColor"/>',
    defaultColor: '#DB2777'
  },
  {
    id: 'p_mask',
    name: '面具人',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M2 12c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2 2 6.5 2 12z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/>',
    defaultColor: '#6B7280'
  },
  {
    id: 'p_shadow',
    name: '影子',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M12 4a4 4 0 0 0-4 4c0 2 1.5 3.5 4 3.5s4-1.5 4-3.5a4 4 0 0 0-4-4z" fill="currentColor" opacity="0.5"/><path d="M6 20v-2c0-2.2 3.6-4 6-4s6 1.8 6 4v2" stroke="currentColor" stroke-width="2" opacity="0.5"/>',
    defaultColor: '#1F2937'
  },
  {
    id: 'p_clown',
    name: '小丑',
    category: CATEGORIES.PEOPLE,
    svg: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="2" fill="red"/><path d="M8 8h1M15 8h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    defaultColor: '#EF4444'
  },
  {
    id: 'p_wizard',
    name: '巫师',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M12 2l-6 8h12l-6-8z" fill="currentColor"/><rect x="6" y="10" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#7C3AED'
  },
  {
    id: 'p_hero',
    name: '英雄',
    category: CATEGORIES.PEOPLE,
    svg: '<path d="M5 6l7-4 7 4v4c0 6-7 10-7 10S5 16 5 10V6z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#E11D48'
  },

  // --- NATURE (自然) ---
  {
    id: 'n_tree',
    name: '树',
    category: CATEGORIES.NATURE,
    svg: '<path d="M12 2L4 16h16L12 2z" fill="currentColor"/><rect x="10" y="16" width="4" height="6" fill="#78350F"/>',
    defaultColor: '#166534'
  },
  {
    id: 'n_flower',
    name: '花',
    category: CATEGORIES.NATURE,
    svg: '<circle cx="12" cy="12" r="3" fill="#FBBF24"/><circle cx="12" cy="6" r="3" fill="currentColor"/><circle cx="18" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="18" r="3" fill="currentColor"/><circle cx="6" cy="12" r="3" fill="currentColor"/>',
    defaultColor: '#F43F5E'
  },
  {
    id: 'n_sun',
    name: '太阳',
    category: CATEGORIES.NATURE,
    svg: '<circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#F59E0B'
  },
  {
    id: 'n_moon',
    name: '月亮',
    category: CATEGORIES.NATURE,
    svg: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>',
    defaultColor: '#FEF3C7'
  },
  {
    id: 'n_mountain',
    name: '山',
    category: CATEGORIES.NATURE,
    svg: '<path d="M21 19H3l9-15 9 15z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 19L15 9" stroke="currentColor" stroke-width="1"/>',
    defaultColor: '#57534E'
  },
  {
    id: 'n_water',
    name: '水',
    category: CATEGORIES.NATURE,
    svg: '<path d="M12 2.69l5.74 5.74c1.58 1.58 1.58 4.15 0 5.74-1.58 1.58-4.15 1.58-5.74 0l-5.74-5.74" fill="currentColor"/>',
    defaultColor: '#3B82F6'
  },
  {
    id: 'n_fire',
    name: '火',
    category: CATEGORIES.NATURE,
    svg: '<path d="M12 2c0 3-3 6-3 9 0 2.5 1.5 5 3 5s3-2.5 3-5c0-3-3-6-3-9z" fill="currentColor"/>',
    defaultColor: '#EF4444'
  },
  {
    id: 'n_cloud',
    name: '云',
    category: CATEGORIES.NATURE,
    svg: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>',
    defaultColor: '#93C5FD'
  },
  {
    id: 'n_star',
    name: '星星',
    category: CATEGORIES.NATURE,
    svg: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>',
    defaultColor: '#FDE047'
  },
  {
    id: 'n_rock',
    name: '石头',
    category: CATEGORIES.NATURE,
    svg: '<path d="M19 14c1.49 0 2.88.5 4.07 1.35C24.47 16.5 24 18 22 20c-1.25 1.25-3.04 1.77-4.72 1.35-2.07-.52-3.66-2.36-3.66-4.5 0-1.58.85-2.85 2.1-3.63.85-.54 1.96-.87 3.28-.22z" fill="currentColor"/>',
    defaultColor: '#78716C'
  },
  {
    id: 'n_leaf',
    name: '叶子',
    category: CATEGORIES.NATURE,
    svg: '<path d="M2 22C2 12 12 2 12 2s10 10 10 20c0 0-10-6-20 0z" fill="currentColor"/>',
    defaultColor: '#65A30D'
  },
  {
    id: 'n_lightning',
    name: '闪电',
    category: CATEGORIES.NATURE,
    svg: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>',
    defaultColor: '#FACC15'
  },
  {
    id: 'n_rain',
    name: '雨',
    category: CATEGORIES.NATURE,
    svg: '<path d="M16 13v6M8 13v6M12 15v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    defaultColor: '#60A5FA'
  },
  {
    id: 'n_rainbow',
    name: '彩虹',
    category: CATEGORIES.NATURE,
    svg: '<path d="M4 17c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#A855F7'
  },
  {
    id: 'n_snow',
    name: '雪花',
    category: CATEGORIES.NATURE,
    svg: '<path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#BFDBFE'
  },

  // --- ANIMALS (动物) ---
  {
    id: 'a_cat',
    name: '猫',
    category: CATEGORIES.ANIMALS,
    svg: '<circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7 8L5 3l5 2m4-2l5-2-2 5" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#F59E0B'
  },
  {
    id: 'a_dog',
    name: '狗',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M10 10c0 3-2 5-2 5s3 2 5 2 5-2 5-2-2-2-2-5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="10" r="4" fill="currentColor"/>',
    defaultColor: '#B45309'
  },
  {
    id: 'a_bird',
    name: '鸟',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#38BDF8'
  },
  {
    id: 'a_fish',
    name: '鱼',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M2 12s5-5 10-5 8 5 8 5-3 5-8 5-10-5-10-5z" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="#fff"/>',
    defaultColor: '#FB923C'
  },
  {
    id: 'a_butterfly',
    name: '蝴蝶',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M12 12c0-3 3-6 6-6s4 3 4 6-4 6-4 6M12 12c0-3-3-6-6-6S2 9 2 12s4 6 4 6" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#C084FC'
  },
  {
    id: 'a_snake',
    name: '蛇',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M10 20s-6-4-3-8 5-4 2-8 3-2 5 0" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#10B981'
  },
  {
    id: 'a_spider',
    name: '蜘蛛',
    category: CATEGORIES.ANIMALS,
    svg: '<circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 12L4 4m8 8l8-8m-8 8l-8 8m8-8l8 8m-8-8L2 12m10 0l20 0m-10 0L12 2m0 10l0 20" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#1F2937'
  },
  {
    id: 'a_rabbit',
    name: '兔子',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M12 14c-2 0-3-1-3-3s2-4 2-8c0-1 .5-2 1-2s1 1 1 2c0 4 2 6 2 8s-1 3-3 3z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#F9A8D4'
  },
  {
    id: 'a_lion',
    name: '狮子',
    category: CATEGORIES.ANIMALS,
    svg: '<circle cx="12" cy="12" r="6" fill="currentColor"/><path d="M12 2l2 4M12 22l-2-4M2 12l4 2M22 12l-4-2" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#D97706'
  },
  {
    id: 'a_bear',
    name: '熊',
    category: CATEGORIES.ANIMALS,
    svg: '<rect x="6" y="8" width="12" height="10" rx="3" fill="currentColor"/><circle cx="6" cy="8" r="2" fill="currentColor"/><circle cx="18" cy="8" r="2" fill="currentColor"/>',
    defaultColor: '#78350F'
  },
  {
    id: 'a_turtle',
    name: '乌龟',
    category: CATEGORIES.ANIMALS,
    svg: '<circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6v12M6 12h12" stroke="currentColor" stroke-width="1"/>',
    defaultColor: '#15803D'
  },
  {
    id: 'a_dragon',
    name: '龙',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/><path d="M12 2c5 0 10 5 10 10s-5 10-10 10" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#DC2626'
  },
  {
    id: 'a_unicorn',
    name: '独角兽',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M10 6l2-4 2 4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.5"/>',
    defaultColor: '#E879F9'
  },
  {
    id: 'a_owl',
    name: '猫头鹰',
    category: CATEGORIES.ANIMALS,
    svg: '<circle cx="8" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 16l2 2-2 2-2-2z" fill="currentColor"/>',
    defaultColor: '#4B5563'
  },
  {
    id: 'a_wolf',
    name: '狼',
    category: CATEGORIES.ANIMALS,
    svg: '<path d="M4 4l8 8 8-8-8 16L4 4z" fill="currentColor"/>',
    defaultColor: '#374151'
  },

  // --- BUILDINGS (建筑) ---
  {
    id: 'b_house',
    name: '房子',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#B91C1C'
  },
  {
    id: 'b_castle',
    name: '城堡',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M22 20v-8h-4V4h-2v4h-4V4H8v4H4v12h18" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#6B7280'
  },
  {
    id: 'b_tent',
    name: '帐篷',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M3 21l9-18 9 18H3z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#F97316'
  },
  {
    id: 'b_bridge',
    name: '桥',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M2 12c5 0 5-6 10-6s5 6 10 6" stroke="currentColor" stroke-width="2" fill="none"/><path d="M2 18h20" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#92400E'
  },
  {
    id: 'b_fence',
    name: '栅栏',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M6 4v16M18 4v16M2 8h20M2 16h20" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#A16207'
  },
  {
    id: 'b_tower',
    name: '塔',
    category: CATEGORIES.BUILDINGS,
    svg: '<rect x="8" y="2" width="8" height="20" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 6h8M8 10h8M8 14h8M8 18h8" stroke="currentColor" stroke-width="1"/>',
    defaultColor: '#52525B'
  },
  {
    id: 'b_door',
    name: '门',
    category: CATEGORIES.BUILDINGS,
    svg: '<rect x="6" y="2" width="12" height="20" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="12" r="1" fill="currentColor"/>',
    defaultColor: '#713F12'
  },
  {
    id: 'b_wall',
    name: '墙',
    category: CATEGORIES.BUILDINGS,
    svg: '<rect x="2" y="6" width="20" height="12" fill="currentColor" opacity="0.6"/><path d="M2 10h20M2 14h20M8 6v12M16 6v12" stroke="white" stroke-width="1"/>',
    defaultColor: '#78716C'
  },
  {
    id: 'b_grave',
    name: '墓碑',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M6 22V10a6 6 0 0 1 12 0v12" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 12v6M9 14h6" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#525252'
  },
  {
    id: 'b_fountain',
    name: '喷泉',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M12 2v10M6 12s2-4 6-4 6 4 6 4" stroke="currentColor" stroke-width="2" fill="none"/><rect x="4" y="16" width="16" height="4" fill="currentColor"/>',
    defaultColor: '#2563EB'
  },
  {
    id: 'b_lighthouse',
    name: '灯塔',
    category: CATEGORIES.BUILDINGS,
    svg: '<path d="M8 22l2-18h4l2 18" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2L4 22h16L12 2z" stroke="currentColor" stroke-width="1" opacity="0.3"/>',
    defaultColor: '#DC2626'
  },
  {
    id: 'b_well',
    name: '水井',
    category: CATEGORIES.BUILDINGS,
    svg: '<ellipse cx="12" cy="18" rx="8" ry="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 18v-8M20 18v-8M2 8h20" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#57534E'
  },

  // --- TRANSPORT (交通/物品) ---
  {
    id: 't_car',
    name: '车',
    category: CATEGORIES.TRANSPORT,
    svg: '<rect x="2" y="10" width="20" height="8" rx="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="black"/><circle cx="18" cy="18" r="2" fill="black"/>',
    defaultColor: '#EF4444'
  },
  {
    id: 't_boat',
    name: '船',
    category: CATEGORIES.TRANSPORT,
    svg: '<path d="M2 14h20l-3 6H5l-3-6z" fill="currentColor"/><path d="M12 2v12M12 2l-6 10" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#3B82F6'
  },
  {
    id: 't_plane',
    name: '飞机',
    category: CATEGORIES.TRANSPORT,
    svg: '<path d="M12 2l2 8h8l-6 4 2 8-8-4-8 4 2-8-6-4h8z" fill="currentColor"/>',
    defaultColor: '#60A5FA'
  },
  {
    id: 't_bike',
    name: '自行车',
    category: CATEGORIES.TRANSPORT,
    svg: '<circle cx="6" cy="16" r="4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="18" cy="16" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6 16l6-8h4l4 8" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#10B981'
  },
  {
    id: 't_sword',
    name: '剑',
    category: CATEGORIES.TRANSPORT,
    svg: '<path d="M12 2l2 14-2 6-2-6 2-14z" fill="currentColor"/><path d="M8 16h8" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#9CA3AF'
  },
  {
    id: 't_shield',
    name: '盾',
    category: CATEGORIES.TRANSPORT,
    svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#3B82F6'
  },
  {
    id: 't_book',
    name: '书',
    category: CATEGORIES.TRANSPORT,
    svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#8B5CF6'
  },
  {
    id: 't_key',
    name: '钥匙',
    category: CATEGORIES.TRANSPORT,
    svg: '<circle cx="8" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 12h8v4M16 12v4" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#F59E0B'
  },
  {
    id: 't_chest',
    name: '宝箱',
    category: CATEGORIES.TRANSPORT,
    svg: '<rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 12h16" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#D97706'
  },
  {
    id: 't_ladder',
    name: '梯子',
    category: CATEGORIES.TRANSPORT,
    svg: '<path d="M8 2v20M16 2v20M8 6h8M8 10h8M8 14h8M8 18h8" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#A16207'
  },
  {
    id: 't_chair',
    name: '椅子',
    category: CATEGORIES.TRANSPORT,
    svg: '<path d="M7 22v-8h10v8M7 14V6h10" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#78350F'
  },
  {
    id: 't_table',
    name: '桌子',
    category: CATEGORIES.TRANSPORT,
    svg: '<rect x="4" y="10" width="16" height="4" fill="currentColor"/><path d="M6 14v6M18 14v6" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#92400E'
  },
  {
    id: 't_mirror',
    name: '镜子',
    category: CATEGORIES.TRANSPORT,
    svg: '<circle cx="12" cy="10" r="6" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 16v6M8 22h8" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#93C5FD'
  },
  {
    id: 't_gift',
    name: '礼物',
    category: CATEGORIES.TRANSPORT,
    svg: '<rect x="4" y="8" width="16" height="12" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 8v12M4 14h16" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#EC4899'
  },
  {
    id: 't_clock',
    name: '时钟',
    category: CATEGORIES.TRANSPORT,
    svg: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#4B5563'
  },

  // --- SYMBOLS (象征) ---
  {
    id: 's_heart',
    name: '爱心',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>',
    defaultColor: '#EF4444'
  },
  {
    id: 's_broken_heart',
    name: '心碎',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M12 5l-2 5 4 2-2 5M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#DC2626'
  },
  {
    id: 's_skull',
    name: '骷髅',
    category: CATEGORIES.SYMBOLS,
    svg: '<circle cx="12" cy="10" r="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="10" r="1" fill="currentColor"/><path d="M9 16h6" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#374151'
  },
  {
    id: 's_yin_yang',
    name: '阴阳',
    category: CATEGORIES.SYMBOLS,
    svg: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2a5 5 0 0 1 0 10 5 5 0 0 0 0 10 10 10 0 0 0 0-20z" fill="currentColor"/>',
    defaultColor: '#1F2937'
  },
  {
    id: 's_spiral',
    name: '螺旋',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0m4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#8B5CF6'
  },
  {
    id: 's_eye',
    name: '眼睛',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
    defaultColor: '#06B6D4'
  },
  {
    id: 's_cross',
    name: '十字',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M12 2v20M2 10h20" stroke="currentColor" stroke-width="3"/>',
    defaultColor: '#9CA3AF'
  },
  {
    id: 's_circle',
    name: '圆圈',
    category: CATEGORIES.SYMBOLS,
    svg: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#F59E0B'
  },
  {
    id: 's_triangle',
    name: '三角',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M12 3l10 18H2z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#10B981'
  },
  {
    id: 's_square',
    name: '方块',
    category: CATEGORIES.SYMBOLS,
    svg: '<rect x="4" y="4" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#3B82F6'
  },
  {
    id: 's_infinity',
    name: '无限',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M18.18 8.18a4.5 4.5 0 0 0-6.36 6.36l-7.28-7.28a4.5 4.5 0 0 0 6.36 6.36l7.28-7.28z" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#8B5CF6'
  },
  {
    id: 's_music',
    name: '音乐',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="6" cy="18" r="3" fill="currentColor"/><circle cx="18" cy="16" r="3" fill="currentColor"/>',
    defaultColor: '#EC4899'
  },
  {
    id: 's_balance',
    name: '天平',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M12 3v10M6 13h12" stroke="currentColor" stroke-width="2"/><path d="M6 13l-3 6h6l-3-6M18 13l-3 6h6l-3-6" fill="currentColor"/>',
    defaultColor: '#D97706'
  },
  {
    id: 's_puzzle',
    name: '拼图',
    category: CATEGORIES.SYMBOLS,
    svg: '<path d="M12 4v4H8v4h4v4h4v-4h4V8h-4V4h-4z" fill="currentColor"/>',
    defaultColor: '#10B981'
  },
  {
    id: 's_target',
    name: '目标',
    category: CATEGORIES.SYMBOLS,
    svg: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    defaultColor: '#EF4444'
  },

  // --- FANTASY (幻想) ---
  {
    id: 'f_ghost',
    name: '幽灵',
    category: CATEGORIES.FANTASY,
    svg: '<path d="M12 2a8 8 0 0 0-8 8v12l4-2 4 2 4-2 4 2V10a8 8 0 0 0-8-8z" fill="currentColor" opacity="0.7"/><circle cx="9" cy="10" r="1" fill="white"/><circle cx="15" cy="10" r="1" fill="white"/>',
    defaultColor: '#9CA3AF'
  },
  {
    id: 'f_alien',
    name: '外星人',
    category: CATEGORIES.FANTASY,
    svg: '<path d="M12 2c-4 0-8 5-8 10 0 6 3 10 8 10s8-4 8-10c0-5-4-10-8-10z" fill="currentColor"/><ellipse cx="9" cy="12" rx="2" ry="3" fill="black"/><ellipse cx="15" cy="12" rx="2" ry="3" fill="black"/>',
    defaultColor: '#22C55E'
  },
  {
    id: 'f_angel',
    name: '天使',
    category: CATEGORIES.FANTASY,
    svg: '<circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 12l8 8 8-8" stroke="currentColor" stroke-width="2" fill="none"/><path d="M2 8l10 4 10-4" stroke="currentColor" stroke-width="2" fill="none"/>',
    defaultColor: '#FCD34D'
  },
  {
    id: 'f_devil',
    name: '魔鬼',
    category: CATEGORIES.FANTASY,
    svg: '<circle cx="12" cy="12" r="6" fill="currentColor"/><path d="M12 2v4M8 2l2 5M16 2l-2 5" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#991B1B'
  },
  {
    id: 'f_monster',
    name: '怪兽',
    category: CATEGORIES.FANTASY,
    svg: '<rect x="4" y="6" width="16" height="14" rx="2" fill="currentColor"/><path d="M6 14h2M16 14h2M8 18h8" stroke="black" stroke-width="2"/>',
    defaultColor: '#4C1D95'
  },
  {
    id: 'f_magic_wand',
    name: '魔杖',
    category: CATEGORIES.FANTASY,
    svg: '<path d="M2 22l8-8" stroke="currentColor" stroke-width="3"/><path d="M16 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="currentColor"/>',
    defaultColor: '#F472B6'
  },
  {
    id: 'f_potion',
    name: '药水',
    category: CATEGORIES.FANTASY,
    svg: '<path d="M8 2h8v4H8z" fill="currentColor"/><path d="M6 6h12l2 14H4L6 6z" fill="currentColor" opacity="0.8"/>',
    defaultColor: '#14B8A6'
  },
  {
    id: 'f_crystal',
    name: '水晶',
    category: CATEGORIES.FANTASY,
    svg: '<path d="M12 2l8 10-8 10-8-10z" fill="currentColor" opacity="0.8"/>',
    defaultColor: '#A855F7'
  },
  {
    id: 'f_ufo',
    name: '飞碟',
    category: CATEGORIES.FANTASY,
    svg: '<ellipse cx="12" cy="12" rx="10" ry="4" fill="currentColor"/><circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.5"/>',
    defaultColor: '#64748B'
  },
  {
    id: 'f_robot',
    name: '机器人',
    category: CATEGORIES.FANTASY,
    svg: '<rect x="6" y="4" width="12" height="10" fill="currentColor"/><rect x="8" y="14" width="8" height="8" fill="currentColor"/><path d="M4 8h2M18 8h2" stroke="currentColor" stroke-width="2"/>',
    defaultColor: '#94A3B8'
  }
];
