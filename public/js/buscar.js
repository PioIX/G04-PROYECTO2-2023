function pulseBuscar() {
    let data ={
        buscador: document.getElementById("buscador1").value
    }
    buscarCanciones(data)
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

	  } catch (error) {
		console.error("Error:", error);
	  }
}
