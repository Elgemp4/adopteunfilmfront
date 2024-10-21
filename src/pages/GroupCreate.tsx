import Input from "../components/forms/Input.tsx";
import ButtonContainer from "../components/forms/ButtonContainer.tsx";

export default function GroupCreate() {
    return (
        <form className="form-container">
            <Input
                title="Nom du groupe:"
                type="text"
                name="groupName"
                value=""
            />
            <ButtonContainer
                buttons={[
                    { text: "Créer", type: "submit", name: "createGroup" }
                ]}
            />
        </form>
    );
}