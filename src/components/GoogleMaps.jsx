import { useEffect, useRef } from 'react';
const GoogleMaps = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Cargar el script de Google Maps
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // 👇 La API Key se carga desde las variables de entorno (.env)
      const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!API_KEY) {
        console.error('❌ Google Maps API Key no encontrada. Verifica tu archivo .env');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    // Inicializar el mapa
    const initMap = () => {
      if (!mapRef.current) return;

      //COORDENADAS DE LA CLÍNICA 
      const clinicaLocation = { 
        lat: -0.1807,   
        lng: -78.4678   
      };

      // Crear el mapa
      const map = new window.google.maps.Map(mapRef.current, {
        center: clinicaLocation,
        zoom: 16,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Marcador en la ubicación de la clínica
      const marker = new window.google.maps.Marker({
        position: clinicaLocation,
        map: map,
        title: "Dental Bosch",
        animation: window.google.maps.Animation.DROP,
      });

      // Ventana de información con los datos de la clínica
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: Arial; max-width: 250px;">
            <h3 style="margin: 0 0 10px 0; color: #f47cc6; font-size: 18px; font-weight: bold;">
              🦷 Dental Bosch
            </h3>
            <p style="margin: 8px 0; color: #555; line-height: 1.5;">
              <strong>📍 Dirección:</strong><br/>
              Av. Principal 123 y Calle Secundaria<br/>
              Quito, Pichincha
            </p>
            <p style="margin: 8px 0; color: #555;">
              <strong>📞 Teléfono:</strong><br/>
              0987654321
            </p>
            <p style="margin: 8px 0; color: #555;">
              <strong>🕐 Horario:</strong><br/>
              Lunes a Sábado<br/>
              8:00 AM - 6:00 PM
            </p>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=${clinicaLocation.lat},${clinicaLocation.lng}" 
              target="_blank"
              rel="noopener noreferrer"
              style="display: inline-block; margin-top: 12px; padding: 10px 20px; background: #63e1e3; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
            >
              🚗 Cómo llegar
            </a>
          </div>
        `,
      });

      // Abrir la ventana de información automáticamente
      infoWindow.open(map, marker);

      // Abrir la ventana al hacer clic en el marcador
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    };

    loadGoogleMaps();
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-xl"
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMaps;