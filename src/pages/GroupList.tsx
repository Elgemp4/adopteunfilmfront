import GroupCard from "../components/GroupCard.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ButtonContainer from "../components/forms/ButtonContainer.tsx";

export default function GroupList() {
    const [groups, setGroups] = useState([
        { id: 1, name: 'Groupe 1' },
        { id: 2, name: 'Groupe 2' },
        { id: 3, name: 'Groupe 3' },
    ]);

    const navigate = useNavigate();

    const deleteGroup = (id: number) => {
        setGroups(groups.filter(group => group.id !== id));
    };

    const handleCreateGroupClick = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/group/create');
    };

    const handleJoinGroupClick = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/group/join');
    };

    return (
        <div className="groups">
            <div className="group-list">
                {groups.map(group => (
                    <GroupCard
                        key={group.id}
                        groupName={group.name}
                        onDelete={() => deleteGroup(group.id)}
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