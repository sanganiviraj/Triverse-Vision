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
    title: 'Dwarka — Cultural Heritage & Brand Narrative',
    caption: 'Cinematic travel and cultural narrative exploring the timeless spirit of Dwarka. High visual retention paced with evocative soundscapes. #Dwarka #CulturalDocumentary #BrandStorytelling #CinematicReel',
    category: 'Brand Story',
    likes: '41.9K',
    comments: '1,120',
    shares: '16.7K',
    views: '390K',
    img: 'https://ik.imagekit.io/eezte2o1o/Dwarka%20(1)%20(1).mp4/ik-thumbnail.jpg',
    video: 'https://ik.imagekit.io/eezte2o1o/Dwarka%20(1)%20(1).mp4',
    location: 'Dwarka Heritage Sets',
    audio: '♫ Sacred Acoustic Ambience',
    date: 'RECENT',
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
    img: 'https://ik.imagekit.io/eezte2o1o/Jenish%20Vijvik%20Toys.mp4/ik-thumbnail.jpg',
    video: 'https://ik.imagekit.io/eezte2o1o/Jenish%20Vijvik%20Toys.mp4',
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
    img: 'https://ik.imagekit.io/eezte2o1o/21-08%20Nikunjbhai%20Red&white%20skill.mp4/ik-thumbnail.jpg',
    video: 'https://ik.imagekit.io/eezte2o1o/21-08%20Nikunjbhai%20Red&white%20skill.mp4',
    location: 'Soundstage Studio',
    audio: '♫ Cyber Cinematic Beats',
    date: '4 DAYS AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-4',
    type: 'reel',
    title: 'Aeris Jewellery — Bridal & Luxury UGC Showcase',
    caption: 'Bringing bridal craftsmanship and timeless heritage alive through authentic creator storytelling. Designed to establish emotional resonance and drive showroom footfall for fine jewellery brands. #AerisJewellery #UGCVideo #BridalJewellery #BrandStorytelling',
    category: 'UGC',
    likes: '48.7K',
    comments: '1,280',
    shares: '21.5K',
    views: '460K',
    img: 'https://ik.imagekit.io/eezte2o1o/02-10%20Aeris%20Final%20with%20logo.mp4/ik-thumbnail.jpg',
    video: 'https://ik.imagekit.io/eezte2o1o/02-10%20Aeris%20Final%20with%20logo.mp4',
    location: 'Aeris Jewellery Studio',
    audio: '♫ Traditional Acoustic Beats — Triverse Sound',
    date: 'RECENT',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-5',
    type: 'reel',
    title: 'Verritas — Maternal & Infant Care',
    caption: 'Empowering mothers with thoughtful, science-backed guidance. Designed to build deep emotional trust and organic resonance for healthcare and wellness brands. #MaternalCare #Verritas #HealthcareContent #BrandStorytelling',
    category: 'Brand Story',
    likes: '38.4K',
    comments: '920',
    shares: '14.2K',
    views: '340K',
    img: 'https://ik.imagekit.io/eezte2o1o/04-08%20Verritas%20Breast%20Feeding.mp4/ik-thumbnail.jpg',
    video: 'https://ik.imagekit.io/eezte2o1o/04-08%20Verritas%20Breast%20Feeding.mp4',
    location: 'Verritas Health Studio',
    audio: '♫ Original Audio — Triverse Vision',
    date: '1 DAY AGO',
    author: defaultAuthor,
    aspectRatio: '9:16',
  },
  {
    id: 'reel-6',
    type: 'reel',
    title: 'Verritas — Child Planning & Family Wellness',
    caption: 'A compassionate guide navigating child planning and early parenting choices with clarity and warmth. Designed to establish family brand trust. #Verritas #ChildPlanning #HealthcareContent #ParentingJourney',
    category: 'Brand Story',
    likes: '43.2K',
    comments: '1,150',
    shares: '19.4K',
    views: '410K',
    img: 'https://ik.imagekit.io/eezte2o1o/19-10%20Verritas%20When%20Child%20Plan.mp4/ik-thumbnail.jpg',
    video: 'https://ik.imagekit.io/eezte2o1o/19-10%20Verritas%20When%20Child%20Plan.mp4',
    location: 'Verritas Creative Lab',
    audio: '♫ Warm Piano & Strings — Triverse Sound',
    date: '1 WEEK AGO',
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
    authorTag: '@gujrat.tunes',
    tagColor: '#2563eb',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/2_zzhrvd.png',
    caption: 'Minimalist editorial line illustration exploring architectural flow, negative space, and typographic balance. #EditorialArt #DesignThinking #GujratTunes',
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
    authorTag: '@kesvik.stories',
    tagColor: '#10b981',
    img: 'https://res.cloudinary.com/dufzjnj9b/image/upload/v1789641978/TechTone_un2mqp.png',
    caption: 'Kinetic digital identity and album cover aesthetics blending cyberpunk colors and bold streetwear typography. #TechTone #AlbumArt #KesvikStories',
    likes: '28.5K',
    comments: '920',
    shares: '8.4K',
    rotation: 9,
    offsetY: 8,
  },
];
