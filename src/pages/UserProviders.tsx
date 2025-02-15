import { useState, useEffect } from 'react';
import ProviderCardContainer from '../components/ProviderCardContainer.tsx';
import { useProviderContext } from "../contexts/ProviderContext.tsx";
import { useNavigate } from 'react-router-dom';
import ButtonContainer from "../components/forms/ButtonContainer.tsx";
import { useUserContext } from '../contexts/UserContext.tsx';

export default function UserProviders() {
    const navigate = useNavigate();
    const providerContext = useProviderContext();
    const [selectedProviderIds, setSelectedProviderIds] = useState<number[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    if (providerContext == undefined) {
        throw new Error("Context undefined");
    }

    const { sendSelectedProviders, loadUserProviders } = providerContext;
    const { setIsFullyRegistered } = useUserContext();

    useEffect(() => {
        if (!isLoaded) {
            loadUserProviders().then(() => {
                setSelectedProviderIds(providerContext.userProviders.map(provider => provider.provider_id));
                setIsLoaded(true);
            });
        }
    }, [providerContext, loadUserProviders, isLoaded]);

    const handleValidate = async () => {
        try {
            await sendSelectedProviders(selectedProviderIds);
            setIsFullyRegistered(true);
            navigate('/movies');
        } catch (error) {
            console.log(error);
            alert("Erreur de communication avec le serveur");
        }
    };

    return (
        <div className="user-providers">
            <ProviderCardContainer onSelectionChange={setSelectedProviderIds} />
            <ButtonContainer
                buttons={[
                    { text: "Valider", type: "button", name: "validate", onClick: handleValidate },
                ]}
            />
        </div>
    );
}