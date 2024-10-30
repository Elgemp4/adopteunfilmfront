import Button from "../components/forms/Button";
import Input from "../components/forms/Input"
import { useAuth } from "../contexts/AuthContext";

export default function UserSettings() {
    const { birthDate, firstname, lastname, setBirthDate, setFirstname, setLastname } = useAuth();

    return <form className="form-container">
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
                    name="provider"
                    text="Modifier fournisseurs"
                    key="provider"
                    type="button"/>
                <Button
                    name="submit"
                    text="Enregistrer"
                    key="save"
                type="submit"/>
            </div>
        </form>

}