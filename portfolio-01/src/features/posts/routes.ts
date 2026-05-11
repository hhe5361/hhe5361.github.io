const postQueryKey = 'post';

export const buildHomeHref = (sectionId?: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  return sectionId ? `${baseUrl}#${sectionId}` : baseUrl;
};

export const buildPostHref = (slug: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  return `${baseUrl}?${postQueryKey}=${encodeURIComponent(slug)}`;
};

export const getRequestedPostSlug = (search: string) => {
  const params = new URLSearchParams(search);
  const slug = params.get(postQueryKey)?.trim();
  return slug || null;
};
