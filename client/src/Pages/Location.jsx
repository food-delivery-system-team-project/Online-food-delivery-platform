import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  FaLocationCrosshairs,
  FaLocationDot,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

// ==========================================
// FIX LEAFLET DEFAULT MARKER
// ==========================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ==========================================
// DEFAULT LOCATION
// ==========================================

const DEFAULT_LOCATION = [21.2514, 81.6296];

// ==========================================
// MOVE MAP TO LOCATION
// ==========================================

const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, {
        duration: 1,
      });
    }
  }, [position, map]);

  return null;
};

// ==========================================
// MAP CLICK HANDLER
// ==========================================

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        <div className="font-medium">
          Delivery location
        </div>
      </Popup>
    </Marker>
  ) : null;
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const Location = () => {
  const navigate = useNavigate();

  const [position, setPosition] = useState(DEFAULT_LOCATION);

  const [loading, setLoading] = useState(false);

  const [locationName, setLocationName] =
    useState("Select your delivery location");

  const [error, setError] = useState("");

  // ==========================================
  // GET CURRENT LOCATION
  // ==========================================

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (location) => {
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        const newPosition = [lat, lng];

        setPosition(newPosition);

        // Try to get readable address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          const data = await response.json();

          setLocationName(
            data.display_name || "Current location"
          );
        } catch (err) {
          console.log("Address lookup failed:", err);

          setLocationName("Current location");
        }

        setLoading(false);
      },

      (err) => {
        console.log(err);

        setLoading(false);

        if (err.code === 1) {
          setError(
            "Location permission was denied. Please allow location access."
          );
        } else if (err.code === 2) {
          setError(
            "Your location could not be detected."
          );
        } else {
          setError(
            "Unable to get your current location."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ==========================================
  // CONFIRM LOCATION
  // ==========================================

  const handleConfirm = () => {
    const locationData = {
      latitude: position[0],
      longitude: position[1],
      address: locationName,
    };

    console.log("Selected location:", locationData);

    // Save locally
    localStorage.setItem(
      "deliveryLocation",
      JSON.stringify(locationData)
    );

    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full bg-[#faf1ee]">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="sticky top-0 z-50 bg-[#faf1ee]/95 backdrop-blur border-b border-[#eadbd6]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#28282B] hover:text-[#ff6e4a] transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#28282B]">
              Delivery Location
            </h1>

            <p className="text-xs sm:text-sm text-gray-500">
              Choose where you want your food delivered
            </p>
          </div>

        </div>

      </header>

      {/* =====================================
          MAIN
      ====================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">

          {/* =====================================
              MAP
          ====================================== */}

          <section className="bg-white rounded-3xl shadow-lg overflow-hidden">

            <div className="relative h-[55vh] min-h-[400px] max-h-[650px]">

              <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full"
              >

                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController position={position} />

                <LocationMarker
                  position={position}
                  setPosition={setPosition}
                />

              </MapContainer>

              {/* MAP OVERLAY */}

              <div className="absolute top-4 left-4 right-4 z-[500]">

                <div className="bg-white/95 backdrop-blur rounded-2xl shadow-md px-4 py-3 flex items-center gap-3">

                  <div className="h-10 w-10 rounded-full bg-[#ff6e4a]/10 text-[#ff6e4a] flex items-center justify-center shrink-0">
                    <FaLocationDot />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-500">
                      Selected location
                    </p>

                    <p className="text-sm font-semibold text-[#28282B] truncate">
                      {locationName}
                    </p>

                  </div>

                </div>

              </div>

              {/* CURRENT LOCATION BUTTON */}

              <button
                onClick={getCurrentLocation}
                disabled={loading}
                className="absolute bottom-5 right-5 z-[500] h-12 w-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#ff6e4a] hover:bg-[#fff5f1] transition"
              >

                {loading ? (
                  <span className="h-5 w-5 border-2 border-[#ff6e4a]/30 border-t-[#ff6e4a] rounded-full animate-spin" />
                ) : (
                  <FaLocationCrosshairs className="text-xl" />
                )}

              </button>

            </div>

          </section>

          {/* =====================================
              LOCATION DETAILS
          ====================================== */}

          <section className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 flex flex-col">

            {/* TITLE */}

            <div className="flex items-center gap-3 mb-6">

              <div className="h-12 w-12 rounded-2xl bg-[#ff6e4a]/10 text-[#ff6e4a] flex items-center justify-center">
                <FaLocationDot className="text-xl" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#28282B]">
                  Your location
                </h2>

                <p className="text-sm text-gray-500">
                  Set your delivery address
                </p>
              </div>

            </div>

            {/* ADDRESS */}

            <div className="rounded-2xl bg-[#faf1ee] p-4">

              <p className="text-xs font-medium text-gray-500 mb-2">
                DELIVERY LOCATION
              </p>

              <p className="text-sm sm:text-base font-semibold text-[#28282B] leading-relaxed">
                {locationName}
              </p>

            </div>

            {/* COORDINATES */}

            <div className="grid grid-cols-2 gap-3 mt-4">

              <div className="bg-gray-50 rounded-2xl p-3">

                <p className="text-xs text-gray-400">
                  Latitude
                </p>

                <p className="text-sm font-semibold mt-1">
                  {position[0].toFixed(6)}
                </p>

              </div>

              <div className="bg-gray-50 rounded-2xl p-3">

                <p className="text-xs text-gray-400">
                  Longitude
                </p>

                <p className="text-sm font-semibold mt-1">
                  {position[1].toFixed(6)}
                </p>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-4 bg-red-50 text-red-600 rounded-2xl p-4 text-sm">
                {error}
              </div>
            )}

            {/* INFO */}

            <div className="mt-5 p-4 rounded-2xl border border-gray-100">

              <p className="text-sm font-semibold text-[#28282B]">
                📍 How to select a location
              </p>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Tap anywhere on the map to choose a delivery location,
                or use the location button to automatically find where
                you are.
              </p>

            </div>

            {/* SPACER */}

            <div className="flex-1 min-h-6" />

            {/* CURRENT LOCATION */}

            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="w-full py-3 rounded-2xl border-2 border-[#ff6e4a] text-[#ff6e4a] font-semibold flex items-center justify-center gap-2 hover:bg-[#fff5f1] transition"
            >

              <FaLocationCrosshairs />

              {loading
                ? "Finding you..."
                : "Use My Current Location"}

            </button>

            {/* CONFIRM */}

            <button
              onClick={handleConfirm}
              className="w-full mt-3 py-3.5 rounded-2xl bg-[#ff6e4a] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#f45d3a] transition shadow-lg shadow-[#ff6e4a]/20"
            >

              <FaCheck />

              Confirm Location

            </button>

          </section>

        </div>

      </main>

    </div>
  );
};

export default Location;