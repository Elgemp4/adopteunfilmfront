interface GroupCardProps {
    group: {
        group_id: number;
        name: string;
    };

    onDelete: (id: number) => void;
}

export default function GroupCard({ group, onDelete }: GroupCardProps) {
    return (
        <div className="group-card">
            <div className="group-container">
                <div className="group-name">{group.name}</div>
                <button className="delete-group-button material-symbols-outlined"
                        onClick={() => onDelete(group.group_id)}>delete
                </button>
            </div>
        </div>
    );
}