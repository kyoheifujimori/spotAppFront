import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// add icons
import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
// import icon from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// marker setting
let DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;


const SimpleLeaflet = () => {
    const [lat] = useState(36.575);
    const [lng] = useState(135.984);
    const [zoom] = useState(4.7);
    const [position] = useState({
        lat: lat,
        lng: lng,
    });

    return (
        <div>
            <form onSubmit={serchhandle}>
                <input type="text" id="address" />
                <button id="serch">検索</button>
            </form>
            <MapContainer center={position} zoom={zoom} style={{ height: "70vh" }}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors Tiles: <a href="http://map.hotosm.org/"'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};


export default SimpleLeaflet;