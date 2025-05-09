
export type SiteConfig = {
  name: string;
  description: string;
  mainNav: {
    title: string;
    href: string;
  }[];
  links: {
    github: string;
    docs: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Python Learning Arena",
  description: "An interactive platform for learning Python through challenges and exercises.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Problems",
      href: "/problems",
    },
    {
      title: "Learning Paths",
      href: "/learning-paths",
    },
    {
      title: "Daily Challenges",
      href: "/daily-challenges",
    },
  ],
  links: {
    github: "https://github.com/yourusername/python-learning-arena",
    docs: "/docs",
  },
};
