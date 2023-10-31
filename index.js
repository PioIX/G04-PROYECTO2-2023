
/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const fileUpload = require('express-fileupload'); //Para la carga de archivos
const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars
app.use(fileUpload());

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

app.get('/', function(req, res)
{
    //Petición GET con URL = "/", lease, página principal.
    console.log(req.query); //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('home', null); //Renderizo página "login" sin pasar ningún objeto a Handlebars
});

app.post('/login', function(req, res)
{
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    //res.render('home', { mensaje: "Hola mundo!", usuario: req.body.usuario}); //Renderizo página "home" enviando un objeto de 2 parámetros a Handlebars
    res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.put('/login', function(req, res) {
    //Petición PUT con URL = "/login"
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    res.send(null);
});

app.delete('/login', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});

app.post('/registro', async (req, res) =>{
     
    const nom = req.body.nombre;
    const usua = req.body.usuario;
    const ps = req.body.pass;
    
    const dev = await MySQL.realizarInsert(`INSERT INTO Usuarios ( nombre, usuario, contraseña) VALUES (  "${nom}", "${usua}", "${ps}")`) 
    
    if (dev == "1") {

        res.render('home', { mensaje:"Se ha registrado Exitosamente!!!"} );
        //alert( " Bienvenido " + req.body.nombre + ", usted está registrado como usuario "  );
    }
    else{
        console.log(dev);
        alert("No se pudo  registrar como usuario");
    }
    //user.push(new User(req.body.DNI, req.body.nombre, req.body.usuario, req.body.contraseña))
});

app.get('/', function(req, res)
{
      res.render('home', {layout : 'index'}); 
});


app.get('/login', function(req, res)
{
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('login', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.get('/registro', function(req, res)
{
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('registro', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/registro', function(req, res)
{
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/logueo', async (req, res)=>
{
        const col = req.body.usuario;

        console.log(col);

 
        }
);

function subir_audio(req, carpeta, isAudio, callback)
{
//Posibles respuestas de la función:
// 0: Se recibió un archivo, pero no era tipo PNG, GIF o JPG (en caso de que es Imagen sea true).
// -1: No se recibieron archivos.
// -2:Se recibieron archivos pero no pudieron ser copiados a la carpeta solicitada en el servidor.
// String con el nombre del archivo: Se recibieron archivos y copiaron exitosamente.
if (!req.files)
{
callback(-1);
}
else
{
let file = req.files.uploaded_audio;
if(file.mimetype == "mp3/wav" || file.mimetype == "mp3/wav" || 
file.mimetype == "mp3/wav" || isAudio == false)
{
file.mv(carpeta + file.name, function(err)
{
if (err)
{
callback(-2);
}
else
{
callback(file.name);
}
});
}
else
{
console.log("Formato no permitido, utilice '.mp3','.wav'.");
callback(0);
}
}
}

app.get("/subir", (req,res) =>{
    

        
        res.render('subir', null); //Si tengo que contestarle al front, lo hago aquí.

})


app.post("/subir", (req,res) =>{
    console.log(rta);
    subir_audio(req, "subir/", false, function(rta){
        
        res.render('home', null); //Si tengo que contestarle al front, lo hago aquí.
    });
})

app.post("/obtenerLink",async (req,res) => {
    let link = await MySQL.realizarQuery(`SELECT URL FROM Temas WHERE ID_Tema = "${req.body.tema}";`);
    res.send({url: link})
})
//await MySQL.realizarSelect(`SELECT   FROM Temas (ID_Tema, nombre, artista, duracion) VALUES ("${idt}",  "${nomt}", "${art}", "${dur}")`) 