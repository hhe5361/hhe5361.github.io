export interface Post {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  summary: string;
  content: string;
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  featured: boolean;
  readingTimeMinutes: number;
}

export interface NavigationLink {
  href: string;
  label: string;
  ariaLabel: string;
}
