export interface PortfolioAuthor {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
}

export interface PortfolioItem {
  id: string;
  type: 'reel' | 'post';
  title: string;
  caption: string;
  category: string;
  likes: string;
  comments: string;
  shares: string;
  views?: string;
  img: string;
  video?: string;
  location?: string;
  audio?: string;
  date: string;
  author: PortfolioAuthor;
  aspectRatio?: '9:16' | '4:5' | '1:1';
}

export const defaultAuthor: PortfolioAuthor = {
  name: 'Triverse Vision',
  handle: 'triversevision',
  avatar: '/assets/triverse_vision_logo.png',
  verified: true,
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // ── 1. Instagram Reels (Videos) ───────────────────
  {
    id: 'reel-1',
    type: 'reel',
    title: 'Verritas — Maternal & Infant Care',
    caption: 'Empowering mothers with thoughtful, science-backed guidance. Designed to build deep emotional trust and organic resonance for healthcare and wellness brands. #MaternalCare #Verritas #HealthcareContent #BrandStorytelling',
    category: 'Brand Story',
    likes: '38.4K',
    comments: '920',
    shares: '14.2K',
    views: '340K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1790057815/04-08_Verritas_Breast_Feeding_xwc6rv.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/v1790057815/04-08_Verritas_Breast_Feeding_xwc6rv.mp4',
    location: 'Verritas Health Studio',
    audio: '♫ Original Audio — Triverse Vision',
    date: '1 DAY AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-2',
    type: 'reel',
    title: 'Vijvik Toys — UGC Experience',
    caption: 'Unboxing real excitement! High-converting UGC video engineered to demonstrate play value and drive high-intent e-commerce purchases through genuine creator storytelling. #VijvikToys #UGCVideo #EcommerceGrowth #CreatorStrategy',
    category: 'UGC',
    likes: '52.1K',
    comments: '1,430',
    shares: '22.8K',
    views: '510K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1790058850/Jenish_Vijvik_Toys_uudfvj.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/v1790058850/Jenish_Vijvik_Toys_uudfvj.mp4',
    location: 'Creator Lab • Triverse Vision',
    audio: '♫ Trending Audio — Viral Ambient Mix',
    date: '2 DAYS AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-3',
    type: 'reel',
    title: 'Red & White Multimedia — Skill Accelerator',
    caption: 'Guiding the next generation into high-income creative careers. Paced with dynamic motion graphics and crisp delivery to maximize 30-second completion rates. #SkillDevelopment #RedAndWhite #FounderBranding #EducationMarketing',
    category: 'Brand Story',
    likes: '74.6K',
    comments: '2,890',
    shares: '39.4K',
    views: '780K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1790058885/21-08_Nikunjbhai_Red_white_skill_lu2nbi.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/v1790058885/21-08_Nikunjbhai_Red_white_skill_lu2nbi.mp4',
    location: 'Soundstage Studio',
    audio: '♫ Cyber Cinematic Beats',
    date: '4 DAYS AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-4',
    type: 'reel',
    title: 'Commonwealth — UGC Growth Story',
    caption: 'Real conversations that break through digital noise. UGC content tailored to foster trust, answer customer hesitation, and drive inbound action. #UGCStory #Commonwealth #RealPeopleRealResults #SocialProof',
    category: 'UGC',
    likes: '41.9K',
    comments: '1,120',
    shares: '16.7K',
    views: '390K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1790058867/30-7_MohitBhai_Common_Wealth_obgxtw.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/v1790058867/30-7_MohitBhai_Common_Wealth_obgxtw.mp4',
    location: 'Community Studio Sets',
    audio: '♫ Ambient Lofi Beat',
    date: '6 DAYS AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-5',
    type: 'reel',
    title: 'Custom Pieces — Bespoke Craftsmanship',
    caption: 'Every piece tells a story of precision, heritage, and artistic vision. Showcasing bespoke design through cinematic macro details and balanced rhythm. #CustomPieces #BespokeDesign #LuxuryBranding #VisualIdentity',
    category: 'Brand Story',
    likes: '46.3K',
    comments: '1,050',
    shares: '18.2K',
    views: '440K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1790058830/23-7_Custom_Pieces_ewpkmw.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/v1790058830/23-7_Custom_Pieces_ewpkmw.mp4',
    location: 'Bespoke Atelier',
    audio: '♫ Triverse Sound Design Lab',
    date: '1 WEEK AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-6',
    type: 'reel',
    title: 'Verritas — Everyday Baby Routine',
    caption: 'Nurturing newborn comfort with gentle daily routines. Highlighting essential touchpoints for mothers seeking genuine product reliability. #BabyRoutine #Verritas #ParentingTips #GentleCare',
    category: 'Brand Story',
    likes: '35.8K',
    comments: '840',
    shares: '13.1K',
    views: '310K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1790058858/14-09_Verritas_Baby_Routin_jsrdqi.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/v1790058858/14-09_Verritas_Baby_Routin_jsrdqi.mp4',
    location: 'Verritas Studio Sets',
    audio: '♫ Calm Acoustic Guitar',
    date: '1 WEEK AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-7',
    type: 'reel',
    title: 'Campus Life — Student Experience',
    caption: 'Experiencing campus culture from an authentic student vantage point. UGC storytelling crafted to drive prospective admissions and peer engagement. #CampusLife #UGCStudent #EducationBranding #CampusCulture',
    category: 'UGC',
    likes: '58.2K',
    comments: '1,670',
    shares: '27.4K',
    views: '560K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1790058850/12-08_Mohit_school_video_zpd2ub.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/v1790058850/12-08_Mohit_school_video_zpd2ub.mp4',
    location: 'Campus Ground Stage',
    audio: '♫ Upbeat Electronic Pulse',
    date: '2 WEEKS AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-8',
    type: 'reel',
    title: 'Clinical Dermatology & Skincare',
    caption: 'Transforming clinical dermatology facts into a high-retention viral hook that drove 340+ orders in 48 hours. #Dermatology #EcommerceGrowth #BrandStory',
    category: 'Brand Story',
    likes: '31.5K',
    comments: '890',
    shares: '12.4K',
    views: '280K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1775670178/Pimple_Daagh_1_frzzcg.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto/v1775670178/Pimple_Daagh_1_frzzcg.mp4',
    location: 'Dermatology Studio Sets',
    audio: '♫ Viral Ambient Mix',
    date: '3 WEEKS AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-9',
    type: 'reel',
    title: 'AI Synthesis & Digital Avatar',
    caption: 'Testing the limits of hyper-realistic digital avatar synthesis for founders producing 30+ videos per month without daily shoot friction. #FutureOfMedia #AIPerformance',
    category: 'Brand Story',
    likes: '89.4K',
    comments: '3,840',
    shares: '45.8K',
    views: '920K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1775669495/New_Project_6_1EA079D_q91u0a.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto/v1775669495/New_Project_6_1EA079D_q91u0a.mp4',
    location: 'Triverse AI Innovation Lab',
    audio: '♫ Cyber Pulse Beats',
    date: '3 WEEKS AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-10',
    type: 'reel',
    title: 'Authority Architecture in Healthcare',
    caption: 'Strategic educational content engineered to establish high-ticket authority and retain viewer attention past 30 seconds. #AuthorityBranding #HealthcareLeadership',
    category: 'Brand Story',
    likes: '62.8K',
    comments: '2,150',
    shares: '34.1K',
    views: '650K',
    img: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto,so_2/v1775669597/3_Books_to_become_Dentistry_king_1_uh4geo.jpg',
    video: 'https://res.cloudinary.com/dufzjnj9b/video/upload/w_360,h_640,c_fill,q_auto,f_auto/v1775669597/3_Books_to_become_Dentistry_king_1_uh4geo.mp4',
    location: 'Creator Soundstage',
    audio: '♫ Triverse Sound Design Lab',
    date: '1 MONTH AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
];

export interface ClientLogo {
  id: string;
  name: string;
  img: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'logo-1',
    name: 'Brand Identity 01',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/01_znywnd.png',
  },
  {
    id: 'logo-2',
    name: 'Brand Identity 02',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/2_zzhrvd.png',
  },
  {
    id: 'logo-3',
    name: 'TechTone',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/TechTone_un2mqp.png',
  },
  {
    id: 'logo-4',
    name: 'Brand Identity 04',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641979/4_wnglvr.png',
  },
];

export interface MasterpiecePost {
  id: string;
  title: string;
  category: string;
  authorTag?: string;
  tagColor?: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  img: string;
  rotation: number;
  offsetY?: number;
}

export const MASTERPIECE_POSTS: MasterpiecePost[] = [
  {
    id: 'masterpiece-1',
    title: 'Visual Identity System — 01',
    category: 'Brand Identity',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/01_znywnd.png',
    caption: 'Experimental typography and tactile collage aesthetics crafted to command instant attention across social feeds. #BrandDesign #VisualIdentity #TriverseVision',
    likes: '14.2K',
    comments: '340',
    shares: '2.1K',
    rotation: -9,
    offsetY: 8,
  },
  {
    id: 'masterpiece-2',
    title: 'Tactile Architecture & Design',
    category: 'Editorial Artwork',
    authorTag: '@coplin',
    tagColor: '#2563eb',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/2_zzhrvd.png',
    caption: 'Minimalist editorial line illustration exploring architectural flow, negative space, and typographic balance. #EditorialArt #DesignThinking #Coplin',
    likes: '22.8K',
    comments: '680',
    shares: '4.5K',
    rotation: -6,
    offsetY: 2,
  },
  {
    id: 'masterpiece-3',
    title: 'Time for Coffee — Chai Partner',
    category: 'F&B Creative',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641992/Time_to_Coffe_with_Chaipartner_onh06y.png',
    caption: 'Fusing timeless tea culture with warm morning cafe aesthetics. Engineered for high organic shares and lifestyle resonance. #ChaiPartner #CafeCulture',
    likes: '19.4K',
    comments: '588',
    shares: '5.1K',
    rotation: -3,
    offsetY: -4,
  },
  {
    id: 'masterpiece-4',
    title: 'Modern Home — Luxury Real Estate',
    category: 'Luxury Real Estate',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641992/Modern_Home_Real_Estate_Instagram_Post_vlgulr.png',
    caption: 'Architectural minimalism meets luxury real estate marketing. Strategic grid hierarchy engineered to drive high-intent property inquiries. #LuxuryLiving #ModernHome',
    likes: '26.7K',
    comments: '890',
    shares: '7.8K',
    rotation: 0,
    offsetY: -8,
  },
  {
    id: 'masterpiece-5',
    title: 'Grey Real Estate — Premium Launch',
    category: 'Real Estate Campaign',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641993/Grey_Real_Estate_Promo_ueyhvm.png',
    caption: 'Contemporary architectural campaign with bold monochrome contrast. Designed to establish instant market authority. #GreyRealEstate #VisualStrategy',
    likes: '18.9K',
    comments: '530',
    shares: '4.6K',
    rotation: 3,
    offsetY: -4,
  },
  {
    id: 'masterpiece-6',
    title: '500+ Milestones Celebrated',
    category: 'Social Proof & Growth',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641992/500_azc0n4.png',
    caption: '500+ milestones unlocked with our visionary brand partners. Celebratory graphics engineered for maximum social proof and engagement spikes. #500Milestones #Growth',
    likes: '32.1K',
    comments: '1,140',
    shares: '9.8K',
    rotation: 6,
    offsetY: 2,
  },
  {
    id: 'masterpiece-7',
    title: 'TechTone — Digital Audio Brand',
    category: 'Identity System',
    authorTag: '@andrea',
    tagColor: '#10b981',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/TechTone_un2mqp.png',
    caption: 'Kinetic digital identity and album cover aesthetics blending cyberpunk colors and bold streetwear typography. #TechTone #AlbumArt #Andrea',
    likes: '28.5K',
    comments: '920',
    shares: '8.4K',
    rotation: 9,
    offsetY: 8,
  },
];
