import { useState, useEffect } from 'react';
import { useProviderContext } from '../contexts/ProviderContext';
import ProviderCard from './ProviderCard';

interface CircularSelectorProps {
    onSelectionChange: (selectedIds: number[]) => void;
}

export default function ProviderCardContainer({ onSelectionChange }: CircularSelectorProps) {
    const [selected, setSelected] = useState<number[]>([]);
    const providerContext = useProviderContext();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (providerContext && !isLoaded) {
            providerContext.loadUserProviders().then(() => {
                setSelected(providerContext.userProviders.map(provider => provider.provider_id));
                setIsLoaded(true);
            });
        }
    }, [providerContext, isLoaded]);

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
                <ProviderCard
                    key={provider.provider_id}
                    provider={provider}
                    isSelected={selected.includes(provider.provider_id)}
                    onSelect={handleSelect}
                />
            ))}
        </div>
    );
}