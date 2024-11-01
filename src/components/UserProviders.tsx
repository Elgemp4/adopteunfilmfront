import {useState} from 'react';
import ProviderCardContainer from './ProviderCardContainer.tsx';
import {useProviderContext} from "../contexts/ProviderContext";
import {useNavigate} from 'react-router-dom';
import ButtonContainer from "./forms/ButtonContainer.tsx";
import { useUserContext } from '../contexts/UserContext.tsx';

export default function UserProviders() {
    const navigate = useNavigate();
    const providerContext = useProviderContext();
    const [selectedProviderIds, setSelectedProviderIds] = useState<number[]>([]);

    if (providerContext == undefined) {
        throw new Error("Context undefined");
    }

    const {sendSelectedProviders} = providerContext;

    const {setIsFullyRegistered} = useUserContext();

    const handleValidate = async () => {
        try{
            await sendSelectedProviders(selectedProviderIds);
            setIsFullyRegistered(true);
            navigate('/movies');
        }
        catch(error){
            alert("Erreur de communication avec le serveur")
        }
        
    };

    return (
        <div className="user-providers">
            <ProviderCardContainer onSelectionChange={setSelectedProviderIds}/>
            <ButtonContainer
                buttons={[
                    { text: "Valider", type: "button", name: "validate", onClick: handleValidate },
                ]}
            />
        </div>
    );
}