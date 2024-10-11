import CircularSelector from './CircularSelector';
import { useNavigate } from 'react-router-dom';

const providers = [
    { name: 'Netflix', logo: 'https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo-black-bg.png' },
    { name: 'Amazon Prime', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Amazon_Prime_Video_blue_logo_1.svg/720px-Amazon_Prime_Video_blue_logo_1.svg.png' },
    // Ajoutez d'autres providers ici
];

export default function UserProviders() {

    const navigate = useNavigate();

    const handleValidate = () => {
        navigate('/film/1');
    };

    return (
        <div className="user-providers">
            <div className="providers-grid">
                {providers.map((provider) => (
                    <CircularSelector
                        key={provider.name}
                        name={provider.name}
                        logo={provider.logo}
                    />
                ))}
            </div>
            <div className="button-container">
                <button type="button" className="validate-button" onClick={handleValidate}>
                    Valider
                </button>
            </div>
        </div>
    );
}