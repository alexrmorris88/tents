module.exports = {
  env: {
    DB_URI: `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PASSWORD}$@cluster0.w6txq.mongodb.net/tents?retryWrites=true&w=majority`,
  },
  reactStrictMode: true,
};
