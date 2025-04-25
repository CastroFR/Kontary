require('dotenv').config();
const app = require('./src/app'); // Importar la aplicación de Express
const connectDB = require('./src/config/db.config');

const port = process.env.PORT || 3000;

/*app.get('/', (req, res) => {
  res.send('Hello World!');
});*/

connectDB(); // Conectar a la base de datos

app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
});
