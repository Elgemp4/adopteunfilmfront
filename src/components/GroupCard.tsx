interface GroupCardProps {
    groupName: string;
    onDelete: () => void;
}

export default function GroupCard ({groupName, onDelete}: GroupCardProps) {
    return (
        <div className="group-card">
            <div className="group-container">
                <div className="group-name">Nom du groupe</div>
                <button className="delete-group-button material-symbols-outlined">delete</button>
            </div>
        </div>
    );
}