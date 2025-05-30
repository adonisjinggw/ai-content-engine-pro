import React from 'react'; 
import { TranslationKey } from './contexts/LocalizationContext';

export interface NewsArticle {
  title: string;
  summary: string;
  url: string;
  source?: string; 
  publicationDate?: string; // Added for timestamp
  sourceName?: string; // Added for source display
}

export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  };
}

export interface TrendDataPoint {
  name: string; 
  value: number;
  predictedValue?: number; 
}

export interface Trend {
  topic: string;
  data: TrendDataPoint[];
  predictionText?: string;
  predictedData?: TrendDataPoint[];
}

export interface GeneratedArticle {
  id: string; 
  title: string;
  content: string;
  hashtags?: string[];
  platformStyle?: string; 
  timestamp: number; 
}

// Shared types for image and video concept generation
export interface AspectRatioOption {
  id: string;
  labelKey: TranslationKey;
  value: string; // e.g., "16:9" or specific keywords for prompt
}

export interface StylePreset {
  id: string;
  labelKey: TranslationKey;
  value: string; // Keywords to add to prompt
}

export interface ImageGenParams {
  prompt: string;
  aspectRatio?: string;
  style?: string;
}

export interface VideoConceptParams {
  prompt: string;
  aspectRatio?: string; // For shot composition ideas
  style?: string; // For script tone/visuals
  scenes?: number; // For text-to-script
  imageInspirationUrl?: string; // For image-to-concept
  startFrameUrl?: string; // For frame-to-frame concept
  endFrameUrl?: string; // For frame-to-frame concept
}

export interface GeneratedTextConcept { // For video tools
  title: string;
  conceptType: 'script' | 'storyboard' | 'sceneIdeas' | 'transitionIdeas';
  text: string; // The main script/storyboard content
  details?: Record<string, any>; // e.g., characters, locations
}


export interface AutoPublishPlatform {
  id: string;
  nameKey: TranslationKey; 
  icon?: React.FC<React.SVGProps<SVGSVGElement>>; 
}

export interface PublishStatus {
  platformId: string;
  status: 'pending' | 'publishing' | 'success' | 'failed';
  message?: string;
}

// Auth Types
export interface User {
  id: string;
  username: string;
  email?: string;
  membershipTier?: 'free' | 'pro'; // Mock membership
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

// Preview State for Image/Video tools
export interface PreviewData<T> {
  data: T; // e.g., image URL or GeneratedTextConcept
  prompt: string; // The prompt used
  aspectRatio?: string;
  style?: string;
}