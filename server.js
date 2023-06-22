const path = require('path')
const app = require("./app");
const dotenv = require('dotenv')
dotenv.config()


const { PORT } = require("./config");
const buildPath = path.join(__dirname, 'build')


app.use(express.static(buildPath))
app.use(express.json())

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
