if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  publicRuntimeConfig: {
    apiHost: process.env.API_HOST
  }
};
