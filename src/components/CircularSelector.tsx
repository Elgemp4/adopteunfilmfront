import { useState, useEffect } from 'react';
import { useProviderContext } from '../contexts/ProviderContext';

interface CircularSelectorProps {
    onSelectionChange: (selectedIds: number[]) => void;
}

export default function CircularSelector({ onSelectionChange }: CircularSelectorProps) {
    const [selected, setSelected] = useState<number[]>([]);
    const providerContext = useProviderContext();

    const handleSelect = (id: number) => {
        setSelected(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    useEffect(() => {
        onSelectionChange(selected);
    }, [selected, onSelectionChange]);

    if (!providerContext) {
        return <div>Loading...</div>;
    }

    return (
        <div className="providers-grid">
            {providerContext.providers.map(provider => (
                <div
                    key={provider.provider_id}
                    className={`provider-card ${selected.includes(provider.provider_id) ? 'selected' : ''}`}
                    onClick={() => handleSelect(provider.provider_id)}
                >
                    <div className="provider-logo-container">
                        <img src={provider.logo_path} alt={`${provider.name} logo`} className="provider-logo" />
                    </div>
                </div>
            ))}
        </div>
    );
}