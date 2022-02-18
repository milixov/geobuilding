import { useEffect, useRef, useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetCountiryById } from "ws/countries";

import L, { Point } from "leaflet";
import {
  MapContainer,
  Marker,
  Tooltip,
  TileLayer,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import styles from "./style.module.scss";

let DefaultIcon = L.icon({
  iconUrl: "/marker.png",
  iconSize: new Point(20, 32),
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  selectedCountry: string;
}

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.flyTo(coords, map.getZoom(), { animate: true });

  return null;
}

const MapViewerContainer = (props: Props): JSX.Element => {
  const { selectedCountry } = props;
  const mapRef = useRef(null);

  const [position, setPosition] = useState(null);
  const { data, refetch, isFetching } = useGetCountiryById(selectedCountry);

  useEffect(() => {
    refetch();
  }, [selectedCountry]);

  useEffect(() => {
    if (data?.length > 0) {
      const coord = data[0].position;
      setPosition([coord[0], coord[1]]);
    }
  }, [data]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Map View"></CardHeader>
      <div className={styles.container}>
        {isFetching && (
          <div className={styles.loadingContainer}>
            <div className={styles.bg} />
            <div className={styles.loading}>
              <CircularProgress sx={{color: 'white'}}/>
            </div>
          </div>
        )}
        <div className={styles.map}>
          {position && (
            <MapContainer
              zoom={5}
              ref={mapRef}
              center={position}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
              />
              <Marker position={position}>
                <Tooltip>{data?.length > 0 && data[0]?.name}</Tooltip>
              </Marker>
              <SetViewOnClick coords={position} />
            </MapContainer>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MapViewerContainer;
