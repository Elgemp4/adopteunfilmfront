import GroupCard from '../components/GroupCard';

export default function GroupList() {
    return (
        <div className="groups">
            <div className="group-list">
            <GroupCard/>
            </div>
            <div className="button-container">
                <button type="button" className="button">
                    Créer un groupe
                </button>
                <button type="button" className="button">
                    Rejoindre un groupe
                </button>
            </div>
        </div>
    );
}