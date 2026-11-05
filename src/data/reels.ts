export interface ReelItem {
  id: number;
  title: string;
  desc: string;
  tag: string;
  img: string;
  video: string;
  likes?: string;
  views?: string;
}

export const reelsData: ReelItem[] = [
  {
    id: 0,
    title: "Dwarka — Cultural Journey & Brand Narrative",
    desc: "High-retention cinematic storytelling and cultural heritage",
    tag: "Brand Story",
    img: "https://ik.imagekit.io/eezte2o1o/Dwarka%20(1)%20(1).mp4/ik-thumbnail.jpg",
    video: "https://ik.imagekit.io/eezte2o1o/Dwarka%20(1)%20(1).mp4",
    likes: "9,640",
    views: "384.2K"
  },
  {
    id: 1,
    title: "Verritas — Maternal & Infant Care",
    desc: "Empathetic healthcare and maternal guidance storytelling",
    tag: "Brand Story",
    img: "https://ik.imagekit.io/eezte2o1o/04-08%20Verritas%20Breast%20Feeding.mp4/ik-thumbnail.jpg",
    video: "https://ik.imagekit.io/eezte2o1o/04-08%20Verritas%20Breast%20Feeding.mp4",
    likes: "2,200",
    views: "78,926"
  },
  {
    id: 2,
    title: "Vijvik Toys — UGC Experience",
    desc: "Engaging UGC toy demonstration and product review",
    tag: "UGC",
    img: "https://ik.imagekit.io/eezte2o1o/Jenish%20Vijvik%20Toys.mp4/ik-thumbnail.jpg",
    video: "https://ik.imagekit.io/eezte2o1o/Jenish%20Vijvik%20Toys.mp4",
    likes: "4,850",
    views: "142.5K"
  },
  {
    id: 3,
    title: "Red & White Multimedia",
    desc: "High-retention skill accelerator & leadership",
    tag: "Brand Story",
    img: "https://ik.imagekit.io/eezte2o1o/21-08%20Nikunjbhai%20Red&white%20skill.mp4/ik-thumbnail.jpg",
    video: "https://ik.imagekit.io/eezte2o1o/21-08%20Nikunjbhai%20Red&white%20skill.mp4",
    likes: "14.8K",
    views: "520.4K"
  },
  {
    id: 4,
    title: "Aeris Jewellery — UGC Showcase",
    desc: "Bridal craftsmanship and fine jewelry creator narrative",
    tag: "UGC",
    img: "https://ik.imagekit.io/eezte2o1o/02-10%20Aeris%20Final%20with%20logo.mp4/ik-thumbnail.jpg",
    video: "https://ik.imagekit.io/eezte2o1o/02-10%20Aeris%20Final%20with%20logo.mp4",
    likes: "11.2K",
    views: "432.8K"
  },
  {
    id: 5,
    title: "Verritas — Child Planning & Wellness",
    desc: "Gentle daily routine lifestyle and healthcare narrative",
    tag: "Brand Story",
    img: "https://ik.imagekit.io/eezte2o1o/19-10%20Verritas%20When%20Child%20Plan.mp4/ik-thumbnail.jpg",
    video: "https://ik.imagekit.io/eezte2o1o/19-10%20Verritas%20When%20Child%20Plan.mp4",
    likes: "5,180",
    views: "164.7K"
  }
];
