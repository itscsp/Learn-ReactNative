export type Article = {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link?: string;
  _embedded?: any;
};

export type Category = {
  id: number;
  name: string;
  count: number;
  slug: string;
};
