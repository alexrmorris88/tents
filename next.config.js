module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
  },
};
