import React from 'react';
import { env } from '../env/server.mjs';

interface LocalMapEmbedProps {
    address: string | false | undefined,
    origin: any
}

const LocalMapEmbed: React.FC<LocalMapEmbedProps> = ({address, origin}) => {
    const lon = origin?.longitude;
    const lat = origin?.latitude

    let src;

    if (origin !== undefined && origin !== null) {
        src = `https://www.google.com/maps/embed/v1/directions?key=${env.GOOGLEMAPS_API_KEY}&origin=${lat},${lon}&destination=${address}&avoid=tolls|highways` 
    } else {
        src = `https://maps.google.com/maps?&q="+${address}"&output=embed`;
    }

    return (
        <div>
            <iframe 
                width="100%" 
                height="450" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                src={src}
            >
            </iframe>
    </div>
    )
};

export default LocalMapEmbed;
