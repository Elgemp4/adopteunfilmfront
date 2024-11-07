import GroupCard from "../components/GroupCard.tsx";
import { useGroupContext } from "../contexts/GroupContext.tsx";
import ButtonContainer from "../components/forms/ButtonContainer.tsx";
import {useNavigate} from "react-router-dom";

export default function GroupList() {
    const groupContext = useGroupContext();
    const navigate = useNavigate();

    if (!groupContext) {
        return <div>Loading...</div>;
    }

    const handleCreateGroupClick = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/groups/create');
    };

    const handleJoinGroupClick = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/groups/join');
    };

    return (
        <div className="groups">
            <div className="group-list">
                {groupContext.groups.map(group => (
                    <GroupCard
                        key={group.group_id}
                        group={group}
                        onDelete={() => (group.group_id)}
                    />
                ))}
            </div>
            <ButtonContainer
                buttons={[
                    { text: "Créer un groupe", type: "button", name: "createGroup", onClick: handleCreateGroupClick },
                    { text: "Rejoindre un groupe", type: "button", name: "joinGroup", onClick: handleJoinGroupClick },
                ]}
            />
        </div>
    );
}