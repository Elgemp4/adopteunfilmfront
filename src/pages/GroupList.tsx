import { useState } from 'react';
import GroupCard from '../components/GroupCard';
import { useNavigate } from 'react-router-dom';

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

    const handleCreateGroupClick = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/group/create');
    };

    const handleJoinGroupClick= (e: React.FormEvent) => {
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
            <div className="button-group-container">
                <button type="button" className="button" onClick={handleCreateGroupClick}>
                    Créer un groupe
                </button>
                <button type="button" className="button" onClick={handleJoinGroupClick}>
                    Rejoindre un groupe
                </button>
            </div>
        </div>
    );
}