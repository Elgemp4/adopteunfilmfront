import { useState } from 'react';
import { useProviderContext } from '../contexts/ProviderContext';

export default function CircularSelector() {
    const [selected, setSelected] = useState<number | null>(null);
    const providerContext = useProviderContext();

    const handleSelect = (id: number) => {
        setSelected(id);
    };

    if (!providerContext) {
        return <div>Loading...</div>;
    }

    return (
        <div className="providers-grid">
            {providerContext.providers.map(provider => (
                <div
                    key={provider.provider_id}
                    className={`provider-card ${selected === provider.provider_id ? 'selected' : ''}`}
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