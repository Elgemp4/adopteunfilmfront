import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginInput from '../components/forms/Input';
import Checkbox from '../components/forms/Checkbox';
import Button from '../components/forms/Button';

export default function LoginForm() {
    const { email, setEmail, password, setPassword, stayLoggedIn, setStayLoggedIn, tryLogin } = useAuth();
    const navigate = useNavigate();


    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nativeEvent : SubmitEvent = e.nativeEvent as SubmitEvent;
        const source = nativeEvent.submitter as HTMLButtonElement;
        
        if(source == null){
            return;
        }

        const name = source.name;

        if(name == "login"){
            onLogin();
        }
        else if(name == "register"){
            onRegister();
        }
    };

    const onLogin = async () => {
        const isLoggedIn = await tryLogin();

        if(isLoggedIn){
            alert('Connexion réussie!');
            navigate('/film/1');
        }
        else{
            alert('Erreur de connexion. Vérifiez votre email et votre mot de passe.');
        }
    } 

    const onRegister = () => {
        navigate('/register');
    };

    return (
            <form className="form-container" onSubmit={handleLoginSubmit}>
                <LoginInput 
                    title="Adresse email:"
                    name="email"
                    type="email"
                    value={email}
                    onValueChange={setEmail} />
                <LoginInput 
                    title="Mot de passe:"
                    name="password"
                    type="password"
                    value={password}
                    onValueChange={setPassword} />
                <Checkbox
                    title='Rester connecté'
                    value={stayLoggedIn}
                    onChange={setStayLoggedIn}/>
                <div className="button-container">
                    <Button
                        text='Se connecter'
                        type='submit'
                        name='login'
                    />
                    <Button
                        text="S'enregistrer"
                        type='submit'
                        name='register'
                    />
                </div>
            </form>
    );
}