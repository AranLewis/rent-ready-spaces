module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  // Not site content — served publicly only so external tools (e.g. a
  // browser-automation extension) can fetch pin images by URL instead of
  // needing local filesystem access.
  eleventyConfig.addPassthroughCopy("pinterest/images");

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().split("T")[0]
  );

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("content/posts/*.md").sort(
      (a, b) => b.date - a.date
    )
  );

  // Builds an Amazon affiliate link from a base product URL and the site-wide
  // tracking tag (site.amazonTag), so setting the real tag in one place
  // updates every link. Usage: {% affiliateLink product.url, product.text, site.amazonTag %}
  eleventyConfig.addShortcode("affiliateLink", function (url, text, tag) {
    const separator = url.includes("?") ? "&" : "?";
    const finalUrl = tag ? `${url}${separator}tag=${tag}` : url;
    return `<a href="${finalUrl}" rel="nofollow sponsored noopener" target="_blank">${text}</a>`;
  });

  return {
    // GitHub Pages project sites (no custom domain) serve from /<repo-name>/,
    // not the domain root — this prefixes every `| url`-filtered / page.url
    // link so internal navigation resolves correctly. Set to "/" instead if a
    // custom domain or a github.io *user* site is set up later.
    pathPrefix: "/rent-ready-spaces/",
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
