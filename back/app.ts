const express = require('express')  // es el inicio de todo back para poder usar express, la sintaxis es de node
require('dotenv').config();         // cargamos el fichero .env para poder usar sus variables aquí


const cors = require('cors');
const app = express();  // llamamos a la función express que nos permitirá hacer las peticiones put/get etc
const PORT = process.env.PORT || 3000;  // el valor de PORT es el que coja de el fichero .env si está y si no será 3000

app.use(cors())
app.use(express.json());      // middleware que transforma la req.body a un json              
app.use(express.urlencoded({ extended: false }));



app.use('/api', require('./routes/api'))  // estamos delegando todas las peticiones que vengan con api a la api.ts


app.listen(PORT, () => {                                    //nuestro servidor se tiene que poner a escuchar, normalmente dentro de los paréntesis                                                   
    console.log(`Server is running on port ${PORT}`)      //se pone el puerto al que nos conectamos, pero para que sea variable lo ponemos en el fichero de entorno.
})                                                          //es una función callback