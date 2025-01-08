import Input from "../components/forms/Input.tsx";
import {useGroupContext} from "../contexts/GroupContext.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Button from "../components/forms/Button.tsx";

export default function GroupJoin() {
    const groupContext = useGroupContext();
    const navigate = useNavigate();

    if (groupContext == undefined) {
        throw new Error("Context undefined");
    }

    const {joinGroup} = groupContext;

    const [groupCode, setGroupCode] = useState("");

    const handleJoinGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        await joinGroup(groupCode);
        navigate("/groups");
    };


    return (
        <form className="form-container" onSubmit={handleJoinGroup}>
            <Input
                title="Code du groupe:"
                type="text"
                name="groupCode"
                value={groupCode}
                onValueChange={setGroupCode}
            />
            <Button
                name="joinGroup"
                text="Rejoindre le groupe"
                type="submit"
            />
        </form>
    );
}