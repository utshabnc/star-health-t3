import React from 'react';

interface LocalMapEmbedProps {
    address: string | false | undefined
}

const LocalMapEmbed: React.FC<LocalMapEmbedProps> = ({address}) => {
    const src     = `https://maps.google.com/maps?&q="+${address}"&output=embed`;

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
