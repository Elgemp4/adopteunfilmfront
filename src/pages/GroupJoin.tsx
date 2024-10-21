import Input from "../components/forms/Input.tsx";
import ButtonContainer from "../components/forms/ButtonContainer.tsx";

export default function GroupJoin() {
    return (
        <form className="form-container">
            <Input
                title="Code du groupe:"
                type="text"
                name="groupCode"
                value=""
            />
            <ButtonContainer
                buttons={[
                    { text: "Rejoindre", type: "submit", name: "joinGroup" }
                ]}
            />
        </form>
    );
}