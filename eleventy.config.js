module.exports = function (eleventyConfig) {
  // Copy static assets and admin panel as-is
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  return {
    dir: {
      input:    "src",
      output:   "_site",
      includes: "_includes",
      data:     "_data",
    },
    htmlTemplateEngine: "njk",
  };
};
