const app = require("./app");
const dotenv = require('dotenv')
dotenv.config()


const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
