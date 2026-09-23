import React from 'react';
import { 
  Camera, 
  Mic, 
  Image as ImageIcon, 
  Video, 
  Edit3, 
  Layers,
  ArrowRight,
  Menu,
  X,
  Check,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export const Icons = {
  // Lucide Icons
  Camera,
  Mic,
  Image: ImageIcon,
  Video,
  Edit: Edit3,
  Layers,
  ArrowRight,
  Menu,
  X,
  Check,
  ChevronRight,
  Mail,
  Phone,
  MapPin,

  // Custom SVG Icons (for icons not in lucide-react or brand icons)
  WhatsApp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.031 2C6.511 2 2.025 6.486 2.025 12.006c0 1.83.498 3.551 1.365 5.034L2 22l5.127-1.344a9.96 9.96 0 0 0 4.904 1.282c5.52 0 10.006-4.486 10.006-10.006C22.037 6.486 17.551 2 12.031 2zm5.834 14.28c-.244.685-1.42 1.31-1.956 1.36-.51.047-1.173.067-3.791-.976-3.344-1.324-5.467-4.757-5.633-4.978-.163-.22-1.336-1.78-1.336-3.4 0-1.62.85-2.417 1.15-2.735.3-.318.654-.398.871-.398.217 0 .435.002.626.012.203.01.474-.078.74.564.275.662.934 2.285 1.015 2.45.08.164.135.358.026.577-.108.22-.163.358-.326.549-.163.19-.344.425-.49.57-.164.164-.336.342-.144.672.19.33.847 1.4 1.817 2.264 1.25 1.114 2.304 1.458 2.632 1.622.327.164.518.137.708-.082.191-.22.817-.954 1.035-1.282.217-.328.435-.273.734-.163.3.11 1.905.898 2.232 1.062.327.163.545.245.626.382.082.136.082.791-.162 1.476z"/>
    </svg>
  ),
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  AIClose: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  RealProduction: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8h12v8H3a1 1 0 01-1-1V9a1 1 0 011-1z" />
    </svg>
  ),
};
