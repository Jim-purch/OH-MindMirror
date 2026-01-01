import { SandplayScene } from '../../types';

export const SCENES: SandplayScene[] = [
  {
    id: 'desert',
    name: '经典沙盘',
    description: '象征意识与现实，基础的沙盘体验',
    backgroundStyle: {
      backgroundColor: '#e6cfa1',
      backgroundImage: `
        radial-gradient(circle at 50% 50%, #f3e5be 0%, transparent 10%),
        radial-gradient(circle at 20% 80%, #d4b886 0%, transparent 15%),
        radial-gradient(circle at 80% 20%, #f3e5be 0%, transparent 20%)
      `,
      backgroundSize: '100px 100px, 200px 200px, 300px 300px'
    }
  },
  {
    id: 'ocean',
    name: '深海潜意识',
    description: '象征情感与深层潜意识，探索内心深处',
    backgroundStyle: {
      backgroundColor: '#1a4b6e',
      backgroundImage: `
        linear-gradient(to bottom, #2c7bb6 0%, #1a4b6e 100%),
        radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)
      `
    }
  },
  {
    id: 'forest',
    name: '生命森林',
    description: '象征成长、生机与治愈',
    backgroundStyle: {
      backgroundColor: '#2d5a27',
      backgroundImage: `
        linear-gradient(135deg, #3a7a33 25%, transparent 25%) -50px 0,
        linear-gradient(225deg, #3a7a33 25%, transparent 25%) -50px 0,
        linear-gradient(315deg, #3a7a33 25%, transparent 25%),
        linear-gradient(45deg, #3a7a33 25%, transparent 25%)
      `,
      backgroundSize: '100px 100px'
    }
  },
  {
    id: 'night_sky',
    name: '星空梦境',
    description: '象征灵性、梦想与无限可能',
    backgroundStyle: {
      backgroundColor: '#0f172a',
      backgroundImage: `
        radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px),
        radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px),
        radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 3px)
      `,
      backgroundSize: '550px 550px, 350px 350px, 250px 250px',
      backgroundPosition: '0 0, 40px 60px, 130px 270px'
    }
  },
  {
    id: 'inner_room',
    name: '心灵房间',
    description: '象征秩序、安全与内在结构',
    backgroundStyle: {
      backgroundColor: '#f5f5f4',
      backgroundImage: `
        linear-gradient(#e7e5e4 2px, transparent 2px),
        linear-gradient(90deg, #e7e5e4 2px, transparent 2px),
        linear-gradient(rgba(231,229,228,.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(231,229,228,.3) 1px, transparent 1px)
      `,
      backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px'
    }
  }
];
