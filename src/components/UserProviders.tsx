import { useState } from 'react';
import ProviderCardContainer from './ProviderCardContainer.tsx';
import { useProviderContext } from "../contexts/ProviderContext";
import { useNavigate } from 'react-router-dom';

export default function UserProviders() {
    const navigate = useNavigate();
    const providerContext = useProviderContext();
    const [selectedProviderIds, setSelectedProviderIds] = useState<number[]>([]);

    if (providerContext == undefined) {
        throw new Error("Context undefined");
    }

    const { sendSelectedProviders } = providerContext;

    const handleValidate = async () => {
        await sendSelectedProviders(selectedProviderIds);
        navigate('/film/1');
    };

    return (
        <div className="user-providers">
            <ProviderCardContainer onSelectionChange={setSelectedProviderIds} />
            <div className="button-container">
                <button type="button" className="validate-button" onClick={handleValidate}>
                    Valider
                </button>
            </div>
        </div>
    );
}