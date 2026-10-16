import { useEffect } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { useCheckIn } from "../context/CheckInContext";
import "leaflet/dist/leaflet.css";

const defaultCenter = [28.589813, 77.4349908];

function FitMapToLocations({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 1) {
      map.setView(locations[0].position, 14);
    } else if (locations.length > 1) {
      map.fitBounds(locations.map(({ position }) => position), {
        padding: [24, 24],
        maxZoom: 14,
      });
    }
  }, [locations, map]);

  return null;
}

export default function LocationMap() {
  const { attendanceData } = useCheckIn();
  const locations = attendanceData.flatMap((record) => {
    const location = record.location;
    if (
      !location ||
      location.latitude == null ||
      location.longitude == null
    ) {
      return [];
    }

    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180
    ) {
      return [];
    }

    return [{ record, location, position: [latitude, longitude] }];
  });

  return (
    <section className="card map-card">
      <h3>Check-in Locations</h3>
      <p className="muted">Live location view of employee check-ins today.</p>

      <div className="map">
        <MapContainer
          className="map-leaflet"
          center={locations[0]?.position || defaultCenter}
          zoom={locations.length ? 14 : 10}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitMapToLocations locations={locations} />
          {locations.map(({ record, location, position }) => (
            <CircleMarker
              key={record._id}
              center={position}
              radius={9}
              pathOptions={{ color: "#ffffff", weight: 2, fillColor: "#0f766e", fillOpacity: 1 }}
            >
              <Popup>
                <strong>{location.name || "Check-in location"}</strong>
                {location.address && <p>{location.address}</p>}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        {locations.length === 0 && (
          <div className="map-empty">No check-in locations for this date.</div>
        )}
      </div>
    </section>
  );
}
