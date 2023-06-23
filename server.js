const app = require("./app");
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()


const { PORT } = require("./config");

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
