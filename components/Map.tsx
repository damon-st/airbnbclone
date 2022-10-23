import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";

interface Props {
  searchResult: any[];
}

export default function Map({ searchResult }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<any>({});

  const coordiantes = searchResult.map((e) => ({
    latitude: e.lat,
    longitude: e.long,
  }));
  console.log(coordiantes);

  const center = getCenter(coordiantes);
  const [viewPort, setViewPort] = useState({
    longitude: center != false ? center.latitude : 0,
    latitude: center != false ? center.longitude : 37.7577,
    zoom: 11,
    width: "100%",
    height: "100%",
  });
  console.log(center);

  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/brayancevallos18/cl9lgot8g002716nyl1ezbxaq"}
      mapboxAccessToken={process.env.mapbox_key}
      {...viewPort}
      onMove={(e) =>
        setViewPort({
          height: "100%",
          width: "100%",
          latitude: e.viewState.latitude,
          longitude: e.viewState.longitude,
          zoom: e.viewState.zoom,
        })
      }
    >
      {searchResult.map((e) => (
        <div key={e.long}>
          <Marker latitude={e.lat} longitude={e.long}>
            <p
              role={"img"}
              aria-label="push-pin"
              onClick={() => setSelectedLocation(e)}
              className="cursor-pointer text-2xl 
            animate-bounce"
            >
              📌
            </p>
          </Marker>
          {selectedLocation.long === e.long ? (
            <Popup
              latitude={e.lat}
              longitude={e.long}
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
            >
              {e.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}
