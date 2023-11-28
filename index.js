
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
    secret: "123kjgrioeg34ij"
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
  
  app.get("/registro", (req, res) => {
    res.render("registro");
  });
  
  /*app.post("/registro", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      await authService.registerUser(auth, { email, password });
      res.render("registro", {
        message: "Registro exitoso. Puedes iniciar sesión ahora.",
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      res.render("registro", {
        message: "Error en el registro: " + error.message,
      });
    }
  });*/
  

  app.get("/logout", (req, res) => {
    req.session.user = null;
    res.render("home");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });
  
  app.post("/login", async (req, res) => {
    
    req.session.user = req.body.usuario;
    res.render("home");


   });
   
  
   app.get("/menuAdmin", (req, res) => {
    res.render("menuAdmin");
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

    }
    else {
        console.log(dev);
        res.render('alert', {mensaje: "No se ha podido regregistrar"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
    }


   // user.push(new User(dni, mail, nom, usua, ps))
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
      
        const col = req.body.user;
        console.log(col);
        if (col == "admin") {
          res.render('menuUser', { mensaje:"bienvenido", usuario: col});
       }else{
          res.render('menuUser', { mensaje:"bienvenido", usuario: col});
       }
    

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

//------------------------------------------------
app.get('/crearPlaylist', function (req, res) {
  res.render('crearPlayList', null); 
});
//------------------------------------------------
app.post('/creoPlayList', async (req, res)  => {

  const nom = req.body.nombre;
  const cant = "";
  const url= "";
    
  const dev = await MySQL.realizarQuery(`INSERT INTO Playlist ( nombre, cantidad, URL) VALUES (  "${nom}","${cant}","${url}")`)

  if ( dev.affectedRows == "1") {
      res.render('alert', { mensaje: "Se ha creado!!!" });
  }
  else {
      console.log(dev);
      res.render('alert', {mensaje: "No se ha podido Crear"});
  }

});
//------------------------------------------------------

app.post('/logueo', async (req, res) => {
  req.session.user = req.body.usuario;
    const col = req.body.usuario;
    console.log(col);
    if (col == "admin") {
      res.render('menuUser', { mensaje:"bienvenido", usuario: col});
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
      res.render('alert', {mensaje: "Debe estar Logueado!!!"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
    }
});


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
      res.render('alert', {mensaje: "No se ha podido subir"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  }
  //user.push(new User(req.body.DNI, req.body.nombre 
});





//--------------------------------

app.post("/subir", async (req, res) => {
  try {
    const rta = await subir_audio(req, "subir/", false);
    console.log(rta);
    res.render('musica_subida', null);
  } catch (error) {
    // Handle the error appropriately, e.g., log it or send an error response.
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

  


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
if (req.session.user == null ) {

    console.log("No esta logueado");
    res.render('alert', {mensaje: "Debe estar Logueado!!!"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
} else {
        
 
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

}

});
//-------------------------------------------------------------------
//Listamos Playists
//--------------------------------------
app.get('/verPlaylists', async function(req, res) {
  //Controlo si esta logueado en sesion
  if (req.session.user == null ) {
      console.log("No esta logueado");
      res.render('alert', {mensaje: "Debe estar Logueado!!!"}); 
  } else {
     const usuario = req.session.user; 
     //Obtengo todos los temas de la base 
     let canciones = await MySQL.realizarQuery(`SELECT pl.nombre play, c.Nombre cancion FROM Temas_Playlist tp, Canciones c, Playlist pl WHERE tp.ID_tema = c.ID_Tema AND tp.ID_Playlist = pl.ID_Playlist ORDER BY pl.nombre;`)
     //Para hacer - Eenvio lista de Temas para mostrar
     if (canciones.length > 0) {
         const vector = []
         playAnterior = "1";  
         for (var i = 0; i < canciones .length; i++) {
              if (canciones[i].play == playAnterior) {
                cadena= `${".............."} / ${canciones[i].cancion}`   
              } else {
                cadena= `${canciones[i].play} / ${canciones[i].cancion}`
                playAnterior = canciones[i].play;
              }
             vector.push(cadena);
         }
             res.render('playlists', { vector: vector}); 
       } else {
               res.render('alert', {mensaje: "No pudo cargar Playlists"});
       }
  }
  });
//--------------------------------------------------------------------

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

//---------------------------------
//Listar y borrar canciones subidas
//---------------------------------

app.get('/bajaCanciones', async function(req, res) {
  if (req.session.user != "admin" ) {


    console.log("No esta logueado");
    res.render('alert', {mensaje: "Debe estar Logueado como Administrador!!!"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
} else {

  let paqueteDeCanciones = await MySQL.realizarQuery(`SELECT * FROM Canciones`)
 
    if (paqueteDeCanciones.length > 0) {
      const vector = [] 
 
       for (var i = 0; i < paqueteDeCanciones.length; i++) {      
         cadena= `${paqueteDeCanciones[i].ID_Tema} / ${paqueteDeCanciones[i].Nombre}`
         vector.push(cadena); 
       }
  
    // res.render('menuAdmin', { mensaje:"bienvenido", usuario: col});
   // res.render('mainAdmin', { vector: vector  });
     res.render('bajaCancion', { vector: vector  });
   }else{
     alert("No se pudo cargar las canciones");
   }
  } 
 });

//----------------------------------------------------
app.post('/borrarCancion', async function(req, res) {

  const id = req.body.cancionId;
  //Elimino la cancion por id ingresado  
  await MySQL.realizarQuery(`DELETE FROM Canciones WHERE ID_Tema = "${id}"`)

  //Listo Pido la lista de preguntas para actualizar la vista 
  let paqueteDeCanciones = await MySQL.realizarQuery(`SELECT * FROM Canciones`)
  
  if (paqueteDeCanciones.length > 0) {
    const vector = [] 

     for (var i = 0; i < paqueteDeCanciones.length; i++) {      
       cadena= `${paqueteDeCanciones[i].ID_Tema} / ${paqueteDeCanciones[i].Nombre}`
       vector.push(cadena); 
     }

   res.render('bajaCancion', { vector: vector  });
 }else{
   alert("No se pudo cargar la cancion");
 }

});

//--------------------------------------
//---------------------------------
//Listar y borrar Usuarios para Admin
//---------------------------------

app.get('/bajaUsuarios', async function(req, res) {
  if (req.session.user != "admin" ) {
    console.log("No esta logueado");
    res.render('alert', {mensaje: "Debe estar Logueado como Administrador!!!"}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
} else {

  let paqueteDeUsuarios = await MySQL.realizarQuery(`SELECT * FROM Usuarios`)
 
    if (paqueteDeUsuarios.length > 0) {
      const vector = [] 
 
       for (var i = 0; i < paqueteDeUsuarios.length; i++) {      
         cadena= `${paqueteDeUsuarios[i].DNI} / ${paqueteDeUsuarios[i].Nombre}`
         vector.push(cadena); 
       }
  
    // res.render('menuAdmin', { mensaje:"bienvenido", usuario: col});
   // res.render('mainAdmin', { vector: vector  });
     res.render('bajaUsuario', { vector: vector  });
   }else{
    res.render('alert', {mensaje: "No de pudo cargar la lista de usuarios"}); 
   }
  } 
 });

//----------------------------------------------------
app.post('/borrarUsuario', async function(req, res) {

  const  dni =  req.body.DNI;
  //Elimino usuario por dni ingresado  
  await MySQL.realizarQuery(`DELETE FROM Usuarios WHERE DNI = "${dni}"`)

  //Listo  los usuarios para actualizar la vista 
  let paqueteDeUsuarios = await MySQL.realizarQuery(`SELECT * FROM Usuarios`)
  
  if (paqueteDeUsuarios.length > 0) {
    const vector = [] 

     for (var i = 0; i < paqueteDeUsuarios.length; i++) {      
       cadena= `${paqueteDeUsuarios[i].DNI} / ${paqueteDeUsuarios[i].Nombre}`
       vector.push(cadena); 
     }

   res.render('bajaUsuario', { vector: vector  });
 }else{
  res.render('alert', {mensaje: "No de pudo cargar la lista de usuarios"}); 
 }

});

//--------------------------------------------------------
//---------------------------------
//Listar canciones subidas por usuario para subir a Playlist
//---------------------------------

app.get('/subirAPlaylist', async function(req, res) {
  if (req.session.user == null ) {

    console.log("No esta logueado");
    res.render('alert', {mensaje: "Debe estar Logueado !!!"}); 
} else {

  let paqueteDeCanciones = await MySQL.realizarQuery(`SELECT * FROM Canciones`)
 
    if (paqueteDeCanciones.length > 0) {
      const vector = [] 
 
       for (var i = 0; i < paqueteDeCanciones.length; i++) {      
         cadena= `${paqueteDeCanciones[i].ID_Tema} / ${paqueteDeCanciones[i].Nombre}`
         vector.push(cadena); 
       }
  
    // res.render('menuAdmin', { mensaje:"bienvenido", usuario: col});
   // res.render('mainAdmin', { vector: vector  });
     res.render('cancionAPlaylist', { vector: vector  });
   }else{
     alert("No se pudo cargar las canciones");
   }
  } 
 });

//----------------------------------------------------
app.post('/addToPlaylist', async function(req, res) {

  const playlist = req.body.playlist;

  //Busco ID de Playlist segun el Nombre ingresado

  let temaspl = await MySQL.realizarQuery(`SELECT * FROM Playlist WHERE nombre = "${playlist}";`);
  
    
    const plid = temaspl[0].ID_Playlist; 
    const id = req.body.cancionId;
  


/*
  let id_pl = await MySQL.realizarQuery(`SELECT * FROM Playlist WHERE nombre = "${playlist}";`);
  if (id_pl == null ) {
      res.render('alert', {mensaje: "No existe Playlist !!!"}); 
  } else {
    const id = req.body.cancionId;
    const id_pl = id_pl;


    */
     //Agrego la cancion por id ingresado  
    const dev = await MySQL.realizarQuery(`INSERT INTO Temas_Playlist ( ID_Playlist, ID_Tema  ) VALUES ( "${plid}",  "${id}")`)
    if (dev == null ) {
      res.render('alert', {mensaje: "No se pudo agregar cancion a la Playlist!!!"}); 
    } else {


    //Listo Pido la lista de preguntas para actualizar la vista 
    let paqueteDeCanciones = await MySQL.realizarQuery(`SELECT * FROM Canciones`)
    if (paqueteDeCanciones.length > 0) {
      const vector = [] 
      for (var i = 0; i < paqueteDeCanciones.length; i++) {      
        cadena= `${paqueteDeCanciones[i].ID_Tema} / ${paqueteDeCanciones[i].Nombre}`
        vector.push(cadena); 
      }
      res.render('cancionAPlaylist', { vector: vector  });
    }else{
       alert("No se pudo cargar la cancion");
    } 
  }
  
});
//--------------------------------------
