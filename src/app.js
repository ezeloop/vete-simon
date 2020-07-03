const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('ejs');
const router = require('./router/router');


const PORT = process.env.PORT || 3000;
const DB_URL = 'mongodb://localhost:27017/pacientesDB'

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use('/', router)

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`);
    }

    console.log('Conexion a base de datos establecida');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
