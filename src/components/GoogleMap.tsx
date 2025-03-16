
import React from 'react';

interface GoogleMapProps {
  address: string;
  venueName: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address, venueName }) => {
  // Create a URL-encoded address for Google Maps
  const encodedAddress = encodeURIComponent(`${venueName}, ${address}`);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBgCSVxo-SB9YhD4xZQgw7Z3R1MHi4F8YA&q=${encodedAddress}&zoom=15`;

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md fancy-border">
      <iframe
        title="Event Location"
        width="100%"
        height="100%"
        frameBorder="0"
        src={mapSrc}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleMap;
