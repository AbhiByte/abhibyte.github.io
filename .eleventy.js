const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/favicon.*");

  eleventyConfig.addCollection("posts", function (api) {
    return api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  // YYYY-MM-DD
  eleventyConfig.addFilter("dateFormat", function (date) {
    return new Date(date).toISOString().slice(0, 10);
  });

  // strip HTML tags, estimate reading time
  eleventyConfig.addFilter("readingTime", function (content) {
    const text = content.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
