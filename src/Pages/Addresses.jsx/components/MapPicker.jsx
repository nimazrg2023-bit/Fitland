import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({ onConfirm, onClose, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || { lat: 37.4747, lng: 57.329 });

  const handleConfirm = () => { onConfirm(position); };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-4xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full border hover:bg-gray-100">✕</button>
          <p className="font-semibold text-lg">موقعیت مکانی مورد نظر خود را روی نقشه انتخاب کنید.</p>
        </div>

        <div className="h-[450px] w-full">
          <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        <div className="p-4 flex justify-start">
          <button onClick={handleConfirm} className="bg-[#032340] text-white size-12 rounded-lg flex items-center justify-center hover:bg-[#194165] transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}