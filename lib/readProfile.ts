import userProfileFr from "@/data/user_profile.json";
import userProfileEn from "@/data/user_profile_en.json";

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  about: string;
  photo_path?: string;
  skills: {
    category: string;
    technologies: string[];
    description?: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    details: string;
    technologies: string[];
    photos: string[];
    video?: string;
    image?: string;
    photo_path?: string;
    github?: string;
    live?: string;
    featured?: boolean;
    location?: string;
    period?: string;
  }[];
  experience: {
    title: string;
    company?: string;
    location?: string;
    period: string;
    description: string;
    technologies?: string[];
    result?: string;
    photo_path?: string;
  }[];
  education: {
    title: string;
    company?: string;
    location?: string;
    period: string;
    description: string;
    technologies?: string[];
    photo_path?: string;
  }[];
  certifications?: string[];
  languages?: {
    language: string;
    level: string;
  }[];
  hobbies?: string[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    phone: string;
  };
  cv_path: string;
  location: string;
  stats: {
    experience_years: number;
    people_led: number;
    study_years: number;
  };
}

export function readProfile(lang: "fr" | "en" = "fr"): UserProfile {
  return (lang === "en" ? userProfileEn : userProfileFr) as UserProfile;
}

