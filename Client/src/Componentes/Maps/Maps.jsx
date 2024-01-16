import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Maps = ({ latitud, longitud }) => {
  const isValidLocation = latitud !== undefined && longitud !== undefined;

  const googleMapsUrl = `https://www.google.com/maps?q=${latitud},${longitud}`;

  return (
    <>
      {isValidLocation && (
        <MapContainer
          center={[latitud, longitud]}
          zoom={4}
          style={{
            height: "38rem",
            width: "38rem",
            borderRadius: "50%",
            overflow: "hidden",
            position: "sticky",  // Asegúrate de tener un posicionamiento relativo o absoluto
         
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          <Marker position={[latitud, longitud]}>
            <Popup>
              <div>
                
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Abrir en Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    
    </>
  );
};

export default Maps;
