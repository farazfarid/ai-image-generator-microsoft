const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANISATION,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
