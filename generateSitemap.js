const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const url = 'https://www.gatewayabroadeducations.com';
const StaticURL = ['/about', '/spoken-english', '/gallary', '/videos', '/course/TOEFL', '/course/IELTS', '/course/GRE', '/course/SAT', '/course/PTE', '/course/GMAT', '/blog', '/career', '/contact']

// Define the paths/routes you want to include in the sitemap
const paths = [{ url: "/", changefreq: "daily", priority: 1 }];

(async () => {
  try {
    const sitemap = new SitemapStream({ hostname: url });

    const postsResponse = await axios.get(`http://localhost:3001/api/v1/blog?all=true`);
    
    const postsData = postsResponse?.data?.data?.blog;
    
    StaticURL.map((data) => {
      const newObj1 = {
        url: data,
        changefreq: "monthly",
        priority: 0.8,
      };
      paths.push(newObj1);
    });


    postsData.map((data) => {
      if (!!data?.Slug) {
        const newObj = {
          url: `blog-description/${data?.Slug}`,
          changefreq: "weekly",
          priority: 0.8,
        };
        paths.push(newObj);
      }
    });
    
    paths.forEach((path) => {
      sitemap.write(path);
    });

    sitemap.end();

    const xml = await streamToPromise(sitemap);

    fs.writeFileSync(path.resolve("../frontend/public/sitemap.xml"), xml);
    console.log("Sitemap created successfully!");
  } catch (error) {
    console.error("Error creating sitemap:", error);
  }
})();
