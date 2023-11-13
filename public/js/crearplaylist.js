var listMusic = ["hs.mp3", "gs.mp3"];
var listVideos = ["2", "1"]; // Reemplaza con los IDs de tus videos de YouTube
var mediaType = ["audio"]; // Para identificar si es audio o video
var mediaIndex = 0;

var index = 0;

function playMedia(media, type) {
    if (type === "audio") {
        document.getElementById("span_alerta").innerHTML = "<audio src='" + media + "' controls autoplay></audio>";
    } else if (type === "video") {
        // Aquí puedes usar la API de YouTube para reproducir el video, dado su ID.
        // Puedes utilizar la API de YouTube para incrustar y controlar los videos.
    }
}

function playNext() {
    if (index < listMusic.length) {
        var media = listMusic[index];
        var mediaType = mediaType[index];
        playMedia(media, mediaType);
        setTimeout(playNext, musicDuration[index] * 1000);
        index++;
    } else {
        index = 0; // Volver al inicio de la lista de reproducción.
    }
}