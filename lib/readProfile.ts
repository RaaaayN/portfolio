import userProfile from "@/data/user_profile.json";

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  about: string;
  skills: {
    category: string;
    technologies: string[];
    description?: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    image?: string;
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
  }[];
  education: {
    title: string;
    company?: string;
    location?: string;
    period: string;
    description: string;
    technologies?: string[];
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
}

export function readProfile(): UserProfile {
  return userProfile as UserProfile;
}
