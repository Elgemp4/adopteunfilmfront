// src/pages/GroupSettings.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGroupContext, User } from '../contexts/GroupContext';
import GroupInviteCode from '../components/GroupInviteCode';
import UserCardContainer from '../components/UserCardContainer';
import ButtonContainer from '../components/forms/ButtonContainer';

export default function GroupSettings() {
    const { idGroup } = useParams<{ idGroup: string }>();
    const groupContext = useGroupContext();
    const [groupCode, setGroupCode] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGroupDetails() {
            if (groupContext && idGroup) {
                const groupCode = await groupContext.getGroupCodeById(parseInt(idGroup));
                const users = await groupContext.getUsersByGroupId(parseInt(idGroup));

                if (groupCode) {
                    console.log(`Group code received: ${groupCode}`);
                    setGroupCode(groupCode);
                } else {
                    console.error("Failed to receive group code");
                }

                setUsers(users);
                setLoading(false);
            }
        }

        fetchGroupDetails();
    }, [idGroup, groupContext]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="group-settings">
            <GroupInviteCode inviteCode={groupCode} />
            <UserCardContainer users={users} onSelectionChange={(selectedIds) => console.log(`Selected user IDs: ${selectedIds.join(', ')}`)} />
            <ButtonContainer buttons={[{ text: "Valider", type: "button", name: "validate" }]} />
        </div>
    );
}