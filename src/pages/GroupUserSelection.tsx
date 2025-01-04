import { useNavigate, useParams } from 'react-router-dom';
import { useEffect} from 'react';
import { useGroupContext } from '../contexts/GroupContext';
import GroupInviteCode from '../components/GroupInviteCode';
import UserCardContainer from '../components/UserCardContainer';
import ButtonContainer from '../components/forms/ButtonContainer';

export default function GroupUserSelection() {
    const { idGroup } = useParams<{ idGroup: string }>();

    const groupContext = useGroupContext();
    const navigate = useNavigate();

    //Set the id of the selected group
    useEffect(() => {
        if(!idGroup){
            return;
        }

        chooseGroup(parseInt(idGroup));

    }, [idGroup]);

    if(!groupContext){
        return <div>Loading...</div>
    }

    const {chooseGroup, selectedGroup, chooseUsers} = groupContext;

    if (!selectedGroup) {
        return <div>Loading...</div>;
    }

    return (
        <div className="group-settings">
            <GroupInviteCode inviteCode={selectedGroup.code} />
            <UserCardContainer users={selectedGroup.users} onSelectionChange={(selectedIds) => chooseUsers(selectedIds)} />
            <ButtonContainer buttons={[{ text: "Valider", type: "button", name: "validate", onClick: () => {
                navigate(`/groups/${idGroup}/suggestions`);
            }}]} />
        </div>
    );
}