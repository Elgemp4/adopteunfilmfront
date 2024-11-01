import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext.tsx';
import Input from '../components/forms/Input';
import ButtonContainer from "../components/forms/ButtonContainer.tsx";

export default function RegisterForm() {
    const {
        firstname, lastname, birthDate,
        setFirstname, setLastname, setBirthDate, register: tryRegister
    } = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            await tryRegister();

            alert('Inscription réussie!');
            navigate('/providers');
        }
        catch(_){
            alert('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="form-container" onSubmit={handleSubmit}>
                <Input
                    title='Prénom :'
                    name='firstname'
                    value={firstname}
                    onValueChange={setFirstname}

                />
                <Input
                    title='Nom: '
                    name="lastname"
                    value={lastname}
                    onValueChange={setLastname}
                />
                <Input
                    title="Date de naissance : "
                    type="date"
                    name="birthdate"
                    value={birthDate}
                    onValueChange={setBirthDate}
                />
                <ButtonContainer
                    buttons={[
                        { text: "Suivant", type: "submit", name: "next" }
                    ]}
                />
            </form>
        </div>
    );
}