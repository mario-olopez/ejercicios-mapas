//Ejercicio 1

const map = L.map('map-miPosicion').setView([40.4246324, -3.6928924], 13);

L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let miPosicion = document.getElementById("map-miPosicion")

function getLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion);
    } else {
        alert("La geolocalización no está disponible");
    }
}

getLocation()

function mostrarPosicion(position){
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
    
    L.marker([latitud, longitud]).addTo(map).bindPopup(`<b>Mario está aquí</b><br> latitud: ${latitud}<br> longitud: ${longitud}`)
}

//Ejercicio 2

const cajaTexto2 = document.createElement("div")
document.body.appendChild(cajaTexto2)
const elementoTexto = document.createElement("h2")
elementoTexto.innerText = "Ejercicio 2"
cajaTexto2.appendChild(elementoTexto)


async function getEarthquake(){
    const urlTerremotos = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson"
    
    try{     
        const response = await fetch(urlTerremotos); //Llamada a la API
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
          }
          const data = await response.json()
          data.features.forEach(terremotos => { //Tratamiento de datos con los que obtener la longitud, latitud y magnitud
            const longitud = terremotos.geometry.coordinates[0];
            const latitud = terremotos.geometry.coordinates[1];
            const magnitud = terremotos.properties.mag;

            L.circleMarker([longitud, latitud], { //Pintar la magnitud del terremoto basándonos en las coordenadas
                radius: magnitud,
                color: "red",
                fillOpacity: 0.5
            }).bindPopup(`Magnitud: ${magnitud}`).addTo(mapaMundo)

          });

    } catch (error) {
        console.log(`ERROR: ${error.stack}`)
    }
}


const cajaMapa = document.createElement("div")
cajaMapa.setAttribute("id", "mapaMundo")
document.body.appendChild(cajaMapa);

const mapaMundo = L.map("mapaMundo").setView([0, 0], 2); //Coordenadas del mapa del mundo

L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapaMundo);

getEarthquake()
