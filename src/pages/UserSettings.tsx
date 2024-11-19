import { useNavigate } from "react-router-dom";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input"
import { useUserContext } from "../contexts/UserContext";
import { FormEvent } from "react";
import { useDarkMode } from '../contexts/DarkModeContextProvider';

export default function UserSettings() {
    const { birthDate, firstname, lastname, setBirthDate, setFirstname, setLastname, changeSettings, logout  } = useUserContext();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const navigate = useNavigate();

    const onSave = async (e : FormEvent) => {
        e.preventDefault();
        try{
            await changeSettings();
            navigate(-1);
        }
        catch(error){
            alert("Une erreur est servenu, veuillez réassayer")
        }
    }


    return <form onSubmit={(e) => onSave(e)} className="form-container">
            <Input
                name="lastname"
                title="Nom  : "
                key="lastname"
                value={lastname}
                onValueChange={setLastname}
            />
            <Input
                name="firstname"
                title="Prénom  : "
                key="firstname"
                value={firstname}
                onValueChange={setFirstname}
            />
            <Input
                name="birthdate"
                title="Date de naissance : "
                key="birthdate"
                type="date"
                value={birthDate}
                onValueChange={setBirthDate}
            />
            <div className="button-container button-container__vertical">
                <Button
                    name={"theme"}
                    text={darkMode ? 'Thème clair' : 'Thème sombre'}
                    key="theme"
                    type="button"
                    onClick={toggleDarkMode}
                />
                <Button
                    name="provider"
                    text="Modifier fournisseurs"
                    key="provider"
                    type="button"
                    onClick={() => navigate("/providers")}/>
                <Button
                    name="disconnect"
                    text="Se déconnecter"
                    key="disconnect"
                    type="button"
                    onClick={ async () => {
                        await logout();
                        navigate("/login");
                    }}
                />
                <Button
                    name="submit"
                    text="Enregistrer"
                    key="save"
                    type="submit"/>

            </div>
        </form>

}