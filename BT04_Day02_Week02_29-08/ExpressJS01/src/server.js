require('dotenv').config();
// import các nguồn cần dùng
const express = require('express');
const path = require('path');
const cors = require('cors');

const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');

const app = express(); // cấu hình app là express

// cấu hình port
const port = process.env.PORT || 8888;

// **Khai báo reactBuildPath chỉ 1 lần**
const reactBuildPath = path.join(__dirname, '../../ReactJS01/reactjs01/dist');
app.use(express.static(reactBuildPath));

app.use(cors()); // config cors
app.use(express.json()); // config req.body cho json
app.use(express.urlencoded({ extended: true })); // for form data

configViewEngine(app); // config template engine

// config route cho view ejs
const webAPI = express.Router();
webAPI.get('/', getHomepage);
app.use('/', webAPI);

// khai báo route cho API
app.use('/v1/api', apiRoutes);

// catch-all route cho React
app.use((req, res) => {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

(async () => {
  try {
    // kết nối database using mongoose
    await connection();
    // lắng nghe port trong env
    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log('>>> Error connect to DB: ', error);
  }
})();