import GroupCard from "../components/GroupCard.tsx";
import { useGroupContext } from "../contexts/GroupContext.tsx";
import ButtonContainer from "../components/forms/ButtonContainer.tsx";
import { useNavigate } from "react-router-dom";

export default function GroupList() {
    const groupContext = useGroupContext();
    const navigate = useNavigate();

    if (!groupContext) {
        return <div>Loading...</div>;
    }

    const handleCreateGroupClick = () => {
        navigate('/groups/create');
    };

    const handleJoinGroupClick = () => {
        navigate('/groups/join');
    };

    const handleGroupClick = (groupId: number) => {
        navigate(`/groups/${groupId}`);
    };

    return (
        <div className="groups">
            <div className="group-list">
                {groupContext.groupList.map(group => (
                    <GroupCard
                        key={group.group_id}
                        group={group}
                        onClick={() => handleGroupClick(group.group_id)}
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