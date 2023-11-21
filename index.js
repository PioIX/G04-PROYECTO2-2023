
/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias



const express = require('express'); //Para el manejo del servidor Web
const exphbs = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const fileUpload = require('express-fileupload'); //Para la carga de archivos
const app = express(); //Inicializo express para el manejo de las peticiones
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
} = require("firebase/auth");

let alert = require('alert'); 

var session = require("express-session");

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.use(session({
    secret: "123kjgrioegj34ij"
}));



app.engine('handlebars', exphbs({ defaultLayout: 'main' })); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars
app.use(fileUpload());

const Listen_Port = 3100; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function () {
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


function selectOpt(index){
  alert("CORRECTO");
}



// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA936j4rOJbIGAiPMENWJAMbIAeCULI8J8",
    authDomain: "infothebest-3b261.firebaseapp.com",
    projectId: "infothebest-3b261",
    storageBucket: "infothebest-3b261.appspot.com",
    messagingSenderId: "125429100089",
    appId: "1:125429100089:web:707f20f776e39a3d8367e8",
  };
  
  const appFirebase = initializeApp(firebaseConfig);
  const auth = getAuth(appFirebase);
  
  // Importar AuthService
  const authService = require("./authService");

  
  app.get("/", (req, res) => {
   // console.log(req.session.user)
    res.render("home");
  });
  
  app.get("/register", (req, res) => {
    res.render("register");
  });
  
  app.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      await authService.registerUser(auth, { email, password });
      res.render("register", {
        message: "Registro exitoso. Puedes iniciar sesión ahora.",
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      res.render("register", {
        message: "Error en el registro: " + error.message,
      });
    }
  });
  

  app.get("/logout", (req, res) => {
    req.session.user = null;
    res.render("home");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });
  
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userCredential = await authService.loginUser(auth, {
        email,
        password,
      });
      // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.render("login", {
        message: "Error en el inicio de sesión: " + error.message,
      });
    }
  });
  
  app.get("/dashboard", (req, res) => {
    // Agrega aquí la lógica para mostrar la página del dashboard
    res.render("dashboard");
  });
  

  
app.get('/', function (req, res) {
    //Petición GET con URL = "/", lease, página principal.
    console.log(req.query); //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('home', null); //Renderizo página "login" sin pasar ningún objeto a Handlebars
});



app.post('/registro', async (req, res)  => {

    const dni = req.body.dni; 
    const nom = req.body.nombre;
    const usua = req.body.nombre;
    const mail = req.body.mail;
    const ps = req.body.pass;
    
    const dev = await MySQL.realizarQuery(`INSERT INTO Usuarios ( dni, nombre, usuario, contraseña, mail) VALUES (  "${dni}","${nom}", "${usua}", "${ps}", "${mail}")`)

    if ( dev.affectedRows == "1") {

        res.render('alert', { mensaje: "Se ha registrado Exitosamente!!!" });
        
        //alert( " Bienvenido " + req.body.nombre + ", usted está registrado como usuario "  );
    }
    else {
        console.log(dev);
        res.render('alert', {mensaje: "No se ha podido regregistrar"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
    }
    //user.push(new User(req.body.DNI, req.body.nombre 
  });



app.get('/', function (req, res) {
    console.log(req.session.user)
    res.render('home', { layout: 'index' });
});

//Valido credenciales  con fetch y Select a la base
app.put('/login', async (req, res) => {
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
   //Petición PUT con URL = "/login"

    
    console.log(req.body.pass)
    console.log("Soy un pedido login PUT", null);
    let respuesta = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE usuario = "${req.body.user}" AND contraseña = "${req.body.pass}"`)
    if (respuesta.length > 0) {
        console.log("Validado");

        //Grabo el usuario en la sesion
        req.session.user = req.body.user;
        
        res.send({validar:true})
    }
    else{
        console.log("NO Validado");
        res.send({validar:false})    
     }
    
    //res.render('login', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});


app.get('/registro', function (req, res) {
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('registro', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/registro', function (req, res) {
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/logueo', async (req, res) => {
    const col = req.body.usuario;
    console.log(col);
    if (col == "admin") {
      res.render('menuAdmin', { mensaje:"bienvenido", usuario: col});
   }else{
      res.render('menuUser', { mensaje:"bienvenido", usuario: col});
   }

}
);


function subir_audio(req, carpeta, isAudio, callback) {
    //Posibles respuestas de la función:
    // 0: Se recibió un archivo, pero no era tipo PNG, GIF o JPG (en caso de que es Imagen sea true).
    // -1: No se recibieron archivos.
    // -2:Se recibieron archivos pero no pudieron ser copiados a la carpeta solicitada en el servidor.
    // String con el nombre del archivo: Se recibieron archivos y copiaron exitosamente.
    if (!req.files) {
        callback(-1);
    }
    else {
        let file = req.files.uploaded_audio;
        if (file.mimetype == "mp3/wav" || file.mimetype == "mp3/wav" ||
            file.mimetype == "mp3/wav" || isAudio == false) {
            file.mv(carpeta + file.name, function (err) {
                if (err) {
                    callback(-2);
                }
                else {
                    callback(file.name);
                }
            });
        }
        else {
            console.log("Formato no permitido, utilice '.mp3','.wav'.");
            callback(0);
        }
    }
}

app.get("/subir", (req, res) => {

  if (req.session.user != null ) {

     res.render('subir2', null); //Si tengo que contestarle al front, lo hago aquí.

    } else {
      console.log("No esta logueado");
      //alert("No esta logueado para esta acción");
      res.render('alert', {mensaje: "No de ha podido loguear!!!"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
      
}   

})


 app.post("/subir", (req, res) => {
  subir_audio(req, "subir/", false, function (rta) {
      console.log(rta); // Now rta is defined within this callback function
      res.render('home', null);
  });
});
//-----------------------------
//NUEVO METODO PARA SUBIR
//-----------------------------

app.post('/subir2', async (req, res)  => {

  const temaNombre = req.body.temaNombre; 
  const temaArtista = req.body.temaArtista;
  const temaDuracion = req.body.temaDuracion;
  const temaUrl = req.body.temaUrl;
  const usuario = req.session.user;
  
  const dev = await MySQL.realizarQuery(`INSERT INTO Canciones ( nombre, artista, duracion, url) VALUES (  "${temaNombre}","${temaArtista}", "${temaDuracion}", "${temaUrl}")`)

  if ( dev.affectedRows == "1") {

    const dev2 = await MySQL.realizarQuery(`INSERT INTO CancionesPorUsuario ( URL, Nombre_Usuario, Megusta) VALUES (  "${temaUrl}","${usuario}", 0)`)

    if ( dev2.affectedRows == "1") {


      res.render('alert', { mensaje: "Se ha Subido Exitosamente!!!" });
      
      //alert( " Bienvenido " + req.body.nombre + ", usted está registrado como usuario "  );
    }
  }
  else {
      console.log(dev);
      res.render('alert', {mensaje: "No se ha podido regregistrar"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  }
  //user.push(new User(req.body.DNI, req.body.nombre 
});





//--------------------------------

app.post("/obtenerLink", async (req, res) => {
    let link = await MySQL.realizarQuery(`SELECT URL FROM Canciones WHERE ID_Tema = "${req.body.tema}";`);
    res.send({ url: link })
})
//await MySQL.realizarSelect(`SELECT   FROM Temas (ID_Tema, nombre, artista, duracion) VALUES ("${idt}",  "${nomt}", "${art}", "${dur}")`) 

app.get('/buscar', function (req, res) {
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
  
    if (req.session.user != null ) {
      console.log("Esta logueado");
      res.render('buscar', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
    } else {
            console.log("No esta logueado");
            //alert("No esta logueado para esta acción");
            res.render('alert', {mensaje: "Debe estar Logueado!!!"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
    }
   
});

app.post('/buscar', function (req, res) {
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('buscar', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.get('/buscar2', async function(req, res) {

//Controlo si esta logueado en sesion
if (req.session.user != null ) {
 

    const usuario = req.session.user; 
   //Obtengo todos los temas de la base 
   let canciones = await MySQL.realizarQuery(`SELECT c.Nombre, c.Artista, c.ID_Tema FROM Canciones c , CancionesPorUsuario cu , Usuarios u WHERE cu.Nombre_usuario = u.Nombre AND c.URL = cu.URL AND u.Usuario =  "${usuario}";`)
   console.log("Temas subidos", canciones)  
   //Para hacer - Eenvio lista de Temas para mostrar
   if (canciones.length > 0) {
       const vector = []
       for (var i = 0; i < canciones .length; i++) {
           cadena= `${canciones[i].Nombre} / ${canciones[i].Artista}`
           vector.push(cadena);
       }
 //     const uno =  canciones.url
     //  console.log(uno);
   //       res.render('musica-subida', { mensaje:"bienvenido", usuario: uno});
        res.render('musica-subida', { vector: vector}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
     } else {
             console.log("No paso nada");
             res.render('alert', {mensaje: "No pudo cargar Canciones"});
     }

} else {
        console.log("No esta logueado");
        //alert("No esta logueado para esta acción");
        res.render('alert', {mensaje: "Debe estar Logueado!!!"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
}

});


app.post('/buscadorDeCanciones',async function (req, res) {
    console.log("Buscaron: ", req.body.buscador)

    let canciones = await MySQL.realizarQuery(`SELECT Nombre, Artista, ID_Tema FROM Canciones WHERE Nombre LIKE "%${req.body.buscador}%"; `)
    res.send(canciones)
});


app.get('/megusta', async function(req, res) {

//Controlo si esta logueado en sesion
if (req.session.user != null ) {
 
  const usuario = req.session.user;
  //Obtengo todos los temas que me gustan (de la base)  
  //let canciones = await MySQL.realizarQuery(`SELECT Nombre, Artista, ID_Tema FROM Temas`)
  let canciones = await MySQL.realizarQuery(`SELECT c.Nombre, c.Artista, c.ID_Tema FROM Canciones c , CancionesPorUsuario cu , Usuarios u WHERE cu.Nombre_usuario = u.Nombre AND c.URL = cu.URL AND u.Usuario =  "${usuario}" AND cu.Megusta = 1 ;`)
  
  console.log("Temas que me gustan", canciones)  
  if (canciones.length > 0) {
    const vector = []
    for (var i = 0; i < canciones .length; i++) {
        cadena= `${canciones[i].Nombre} / ${canciones[i].Artista}`
        vector.push(cadena);
    }
     res.render('megusta', { vector: vector}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  } else {
          console.log("No paso nada");
          res.render('alert', {mensaje: "No pudo cargar Canciones!!!"});
  }

} else {
  console.log("No esta logueado");
  //alert("No esta logueado para esta acción");
  res.render('alert', {mensaje: "Debe estar Logueado!!!"});//Renderizo página "home" sin pasar ningún objeto a Handlebars
}

  //Para hacer - Eenvio lista de Temas para mostrar
  //res.send(cancionese)
  //res.render('megusta', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

//Asi es como estaba antes
app.get('/megusta', function (req, res) {
  //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
  res.render('megusta', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});


app.post('/megusta', function (req, res) {
  //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
  res.render('megusta', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

