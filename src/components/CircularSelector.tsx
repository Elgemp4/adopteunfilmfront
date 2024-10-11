import { useState } from 'react';

interface ProviderCardProps {
    name: string;
    logo: string;
}

export default function CircularSelector({ name, logo }: ProviderCardProps) {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        setSelected(!selected);
    };

    return (
        <div
            className={`provider-card ${selected ? 'selected' : ''}`}
            onClick={handleSelect}
        >
            <div className="provider-logo-container">
                <img src={logo} alt={`${name} logo`} className="provider-logo" />
            </div>
        </div>
    );
}