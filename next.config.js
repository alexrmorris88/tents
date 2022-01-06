module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    MONGODB_USER_NAME: process.env.MONGODB_USER_NAME,
    MONGODB_USER_PASSWORD: process.env.MONGODB_USER_PASSWORD,
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_KEY: process.env.SECRET_KEY,

    NODEMAILER_HOST: process.env.NODEMAILER_HOST,
    NODEMAILER_PORT: process.env.NODEMAILER_PORT,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    NODEMAILER_NAME: process.env.NODEMAILER_NAME,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  },
};
