import { useState } from "react";
import { useGroupContext } from "../contexts/GroupContext.tsx";
import Input from "../components/forms/Input.tsx";
import ButtonContainer from "../components/forms/ButtonContainer.tsx";

export default function GroupCreate() {
    const groupContext = useGroupContext();

    if (groupContext == undefined) {
        throw new Error("Context undefined");
    }
    const { createGroup } = groupContext;

    const [groupName, setGroupName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createGroup(groupName);
        setGroupName("");
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <Input
                title="Nom du groupe:"
                type="text"
                name="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
            <ButtonContainer
                buttons={[
                    { text: "Créer", type: "submit", name: "createGroup" }
                ]}
            />
        </form>
    );
}