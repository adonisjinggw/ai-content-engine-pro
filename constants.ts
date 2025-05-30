import { TranslationKey } from './contexts/LocalizationContext';

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_IMAGE_MODEL = 'imagen-3.0-generate-002';

export enum AppRoutes {
  HOME = '/',
  HOT_NEWS = '/hot-news',
  TRENDS = '/trends',
  TEXT_TO_IMAGE = '/text-to-image',
  IMAGE_TO_IMAGE = '/image-to-image',
  ARTICLE_GENERATOR = '/article-generator',
  VIDEO_TOOLS = '/video-tools', 
  AUTO_PUBLISH = '/auto-publish', 
  SETTINGS = '/settings',
  PRICING = '/pricing', // Mock pricing page route
}

export const ARTICLE_PLATFORM_STYLES = {
  GENERAL: 'general',
  WECHAT: 'wechat',
  WEIBO: 'weibo',
  XIAOHONGSHU: 'xiaohongshu',
  DOUYIN: 'douyin',
};

// For Text-to-Image, Image-to-Image
export const IMAGE_ASPECT_RATIOS: { id: string; labelKey: TranslationKey; value: string; }[] = [
  { id: 'square', labelKey: 'aspectRatio.square', value: '1:1 aspect ratio' },
  { id: 'landscape', labelKey: 'aspectRatio.landscape', value: '16:9 aspect ratio' },
  { id: 'portrait', labelKey: 'aspectRatio.portrait', value: '9:16 aspect ratio' },
  { id: 'wide', labelKey: 'aspectRatio.wide', value: '21:9 aspect ratio' },
  { id: 'tall', labelKey: 'aspectRatio.tall', value: '3:4 aspect ratio' },
];

export const IMAGE_STYLES: { id: string; labelKey: TranslationKey; value: string; }[] = [
  { id: 'photorealistic', labelKey: 'style.photorealistic', value: 'photorealistic, hyperrealistic, 8k' },
  { id: 'anime', labelKey: 'style.anime', value: 'anime style, vibrant colors, detailed characters' },
  { id: 'impressionist', labelKey: 'style.impressionist', value: 'impressionistic painting, visible brush strokes' },
  { id: 'cyberpunk', labelKey: 'style.cyberpunk', value: 'cyberpunk city, neon lights, futuristic' },
  { id: 'watercolor', labelKey: 'style.watercolor', value: 'watercolor painting, soft edges, flowing colors' },
  { id: 'lineart', labelKey: 'style.lineart', value: 'line art, monochrome, minimalist' },
  { id: 'fantasy', labelKey: 'style.fantasy', value: 'epic fantasy art, detailed, magical' },
  { id: 'vintage', labelKey: 'style.vintage', value: 'vintage photo, retro style, desaturated colors' },
];

// For Video Concept Developer (influences script/storyboard text)
export const VIDEO_CONCEPT_ASPECT_RATIOS = IMAGE_ASPECT_RATIOS; // Can reuse or define specific ones

export const VIDEO_CONCEPT_STYLES: { id: string; labelKey: TranslationKey; value: string; }[] = [
  { id: 'cinematic', labelKey: 'videoStyle.cinematic', value: 'cinematic, dramatic lighting, wide shots' },
  { id: 'documentary', labelKey: 'videoStyle.documentary', value: 'documentary style, interviews, realistic' },
  { id: 'vlog', labelKey: 'videoStyle.vlog', value: 'vlog style, personal, direct to camera' },
  { id: 'animatedExplainer', labelKey: 'videoStyle.animatedExplainer', value: 'animated explainer video, clear visuals, voiceover friendly' },
  { id: 'shortFilm', labelKey: 'videoStyle.shortFilm', value: 'short film, narrative structure, character development' },
];

// Modal keys for Auth
export const AUTH_MODAL_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
  PRICING: 'pricing'
} as const; // Added 'as const' for stricter type inference