interface ProviderCardProps {
    provider: {
        provider_id: number;
        logo_path: string;
        name: string;
    };
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export default function ProviderCard({ provider, isSelected, onSelect }: ProviderCardProps) {
    return (
        <div
            key={provider.provider_id}
            className={`provider-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(provider.provider_id)}
        >
            <div className="provider-logo-container">
                <img src={provider.logo_path} alt={`${provider.name} logo`} className="provider-logo" />
            </div>
        </div>
    );
}