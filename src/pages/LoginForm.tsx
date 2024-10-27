import {useAuth} from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import Input from '../components/forms/Input';
import Checkbox from '../components/forms/Checkbox';
import ButtonContainer from "../components/forms/ButtonContainer.tsx";

export default function LoginForm() {
    const {email, setEmail, password, setPassword, stayLoggedIn, setStayLoggedIn, tryLogin} = useAuth();
    const navigate = useNavigate();


    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nativeEvent: SubmitEvent = e.nativeEvent as SubmitEvent;
        const source = nativeEvent.submitter as HTMLButtonElement;

        if (source == null) {
            return;
        }

        const name = source.name;

        if (name == "login") {
            onLogin();
        } else if (name == "register") {
            onRegister();
        }
    };

    const onLogin = async () => {
        try{
            await tryLogin();
            alert('Connexion réussie!');
            navigate('/providers');
        }
        catch(_){
            alert('Erreur de connexion. Vérifiez votre email et votre mot de passe.');
        }
    }

    const onRegister = () => {
        navigate('/register');
    };

    return (
        <form className="form-container" onSubmit={handleLoginSubmit}>
            <Input
                title="Adresse email:"
                name="email"
                type="email"
                value={email}
                onValueChange={setEmail}/>
            <Input
                title="Mot de passe:"
                name="password"
                type="password"
                value={password}
                onValueChange={setPassword}/>
            <Checkbox
                title='Rester connecté'
                value={stayLoggedIn}
                onChange={setStayLoggedIn}/>
            <ButtonContainer
                buttons={[
                    {text: "Se connecter", type: "submit", name: "login"},
                    {text: "S'enregistrer", type: "submit", name: "register"}
                ]}
            />
        </form>
    );
}