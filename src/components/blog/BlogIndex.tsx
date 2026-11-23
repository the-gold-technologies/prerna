"use client";

import React from "react";
import {
  BlogHero,
  BlogStories,
  BlogQuote,
  BlogLibraryIndex,
  BlogNewsletter,
} from "./index";

export default function BlogIndex() {
  return (
    <>
      <BlogHero />
      <BlogStories />
      <BlogQuote />
      <BlogLibraryIndex />
      <BlogNewsletter />
    </>
  );
}

export { BlogHero, BlogStories, BlogQuote, BlogLibraryIndex, BlogNewsletter };
