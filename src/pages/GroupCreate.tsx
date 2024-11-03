import { useState } from "react";
import { useGroupContext } from "../contexts/GroupContext.tsx";
import Input from "../components/forms/Input.tsx";
import ButtonContainer from "../components/forms/ButtonContainer.tsx";
import {useNavigate} from "react-router-dom";

export default function GroupCreate() {
    const groupContext = useGroupContext();
    const navigate = useNavigate();

    if (groupContext == undefined) {
        throw new Error("Context undefined");
    }
    const { createGroup } = groupContext;

    const [groupName, setGroupName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createGroup(groupName);
        setGroupName("");
        navigate("/groups");
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <Input
                title="Nom du groupe:"
                type="text"
                name="groupName"
                value={groupName}
                onValueChange={setGroupName}
            />
            <ButtonContainer
                buttons={[
                    { text: "Créer", type: "submit", name: "createGroup" }
                ]}
            />
        </form>
    );
}