interface GroupCardProps {
    group: {
        group_id: number;
        name: string;
    };

    onClick: (id: number) => void;
    //onDelete: (id: number) => void;
}

export default function GroupCard({ group, onClick }: GroupCardProps) {
    const handleGroupClick = () => {
        onClick(group.group_id);
    };

    return (
        <div className="group-card" onClick={handleGroupClick}>
            <div className="group-container">
                <div className="group-name">{group.name}</div>
                {/*<button className="delete-group-button material-symbols-outlined"*/}
                {/*        onClick={(e) => {*/}
                {/*            e.stopPropagation();*/}
                {/*            onDelete(group.group_id);*/}
                {/*        }}>delete*/}
                {/*</button>*/}
            </div>
        </div>
    );
}