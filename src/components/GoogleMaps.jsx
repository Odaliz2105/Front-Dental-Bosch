import { useEffect, useRef } from 'react';

const GoogleMaps = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Función para cargar el script de Google Maps
    const loadGoogleMaps = () => {
      // Si ya está cargada la librería de Google Maps, inicializamos el mapa
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Obtenemos la API Key desde las variables de entorno (.env)
      const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!API_KEY) {
        console.error(
          '❌ Google Maps API Key no encontrada. Verifica tu archivo .env'
        );
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      // Asignamos la función initMap al scope global para que Google la invoque
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    // Función que inicializa el mapa
    const initMap = () => {
      if (!mapRef.current) return;

      // Coordenadas aproximadas de la dirección:
      // Avenida 10 de Agosto N21, 2do piso 182, Quito
      const clinicaLocation = {
        lat: -0.1974,
        lng: -78.4958,
      };

      // Mapa dentro del div referenciado
      const map = new window.google.maps.Map(mapRef.current, {
        center: clinicaLocation,
        zoom: 16,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
        disableDefaultUI: false, // Mostrar controles básicos
        zoomControl: true,       // Control de zoom
        mapTypeControl: false, 
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Agregamos el marcador en la clínica
      const marker = new window.google.maps.Marker({
        position: clinicaLocation,
        map: map,
        title: '🦷 Dental Bosch - Avenida 10 de Agosto, Quito',
        animation: window.google.maps.Animation.DROP,
      });

      // Contenido HTML de la InfoWindow (tarjeta de info que se muestra)
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: Arial; max-width: 250px;">
            <h3 style="margin: 0 0 10px 0; color: #f47cc6; font-size: 18px; font-weight: bold;">
              🦷 Dental Bosch
            </h3>
            <p style="margin: 8px 0; color: #555; line-height: 1.5;">
              <strong>📍 Dirección:</strong><br/>
              Avenida 10 de Agosto N21, 2do piso 182<br/>
              Quito
            </p>
            <p style="margin: 8px 0; color: #555;">
              <strong>📞 Teléfono:</strong><br/>
              0987654321
            </p>
            <p style="margin: 8px 0; color: #555;">
              <strong>🕐 Horario:</strong><br/>
              Lunes a Sábado<br/>
              9:00 AM - 6:00 PM
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

      // Abrimos automáticamente la InfoWindow
      infoWindow.open(map, marker);

      // Cada vez que se da clic en el marcador, se vuelve a abrir
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    // Cargar Google Maps cuando el componente se monta
    loadGoogleMaps();
  }, []);

  return (
    // Contenedor donde se renderiza el mapa
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl"
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMaps;
