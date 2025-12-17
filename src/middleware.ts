import type { ImageMetadata, MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = ({ locals }, next) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/*.{jpeg,jpg,png,gif,svg,webp}",
  );
  const badges = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/badges/*.{jpeg,jpg,png,gif,svg,webp}",
  );
  const portfolio = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/portfolio/*.{jpeg,jpg,png,gif,svg,webp}",
  );
  // intercept data from a request
  // optionally, modify the properties in `locals`
  locals.images = images;
  locals.badges = badges;
  locals.portfolio = portfolio;

  // return a Response or the result of calling `next()`
  return next();
};
