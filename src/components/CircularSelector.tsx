import { useState } from 'react';

interface CircularSelectorProps {
    name: string;
    logo: string;
}

export default function CircularSelector({ name, logo }: CircularSelectorProps) {
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