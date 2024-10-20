import CircularSelector from './CircularSelector';
import ProviderProvider from "../contexts/ProviderContext";
import {useNavigate} from 'react-router-dom';

export default function UserProviders() {

    const navigate = useNavigate();

    const handleValidate = () => {
        navigate('/film/1');
    };

    return (
        <div className="user-providers">
                <ProviderProvider>
                    <CircularSelector/>
                </ProviderProvider>
            <div className="button-container">
                <button type="button" className="validate-button" onClick={handleValidate}>
                    Valider
                </button>
            </div>
        </div>
    );
}