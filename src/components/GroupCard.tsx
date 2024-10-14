export default function GroupCard () {
    return (
        <div className="group-card">
            <div className="group-container">
                <div className="group-name">Nom du groupe</div>
                <div className="group-members">Membres: 3</div>
                <button className="delete-group-button material-symbols-outlined">delete</button>
            </div>
        </div>
    );
}