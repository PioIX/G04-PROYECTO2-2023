async function pulseBuscar() {
    let data ={
        buscador: document.getElementById("buscador1").value
    }
    tema =await  buscarCanciones(data)
	console.log("Tema: ", tema)
	let url = "https://www.youtube.com/embed/" + await llamarATema1(tema)
	console.log("URL",url)
	const video = document.getElementById("Video");
	video.setAttribute("src", url);

}




async function buscarCanciones(data) {
	try {
		const response = await fetch("/buscadorDeCanciones", {
		  method: "POST", 
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(data),
		});
		
		//En result obtengo la respuesta
		const result = await response.json();
		console.log("Success:", result);
        document.getElementById("canciones").innerHTML = ""

        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            document.getElementById("canciones").innerHTML = `<h1>${element.Artista} - ${element.Nombre} </h1>`
        }
		return result[0].ID_Tema
	  } catch (error) {
		console.error("Error:", error);
	  }
}



