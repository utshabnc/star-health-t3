import React from 'react';

interface LocationButtonProps {
    address: string | false | undefined,
    text: string
}

const LocationButton: React.FC<LocationButtonProps> = ({address, text}) => {
    const src  = `https://maps.google.com/maps?&q="+${address}"`;

    return (
        <a
          className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
          href={src}
          target="_blank" 
          rel="noreferrer"
        >
            {text}
        </a>
    );
};

export default LocationButton;
