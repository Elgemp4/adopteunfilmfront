import { useNavigate } from 'react-router-dom';

interface GroupCardProps {
    group: {
        group_id: number;
        name: string;
    };

    onDelete: (id: number) => void;
}

export default function GroupCard({ group, onDelete }: GroupCardProps) {
    const navigate = useNavigate();

    const handleGroupClick = () => {
        navigate(`/groups/${group.group_id}`);
    };

    return (
        <div className="group-card" onClick={handleGroupClick}>
            <div className="group-container">
                <div className="group-name">{group.name}</div>
                <button className="delete-group-button material-symbols-outlined"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(group.group_id);
                        }}>delete
                </button>
            </div>
        </div>
    );
}