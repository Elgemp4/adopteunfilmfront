// src/pages/GroupSettings.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGroupContext, GroupApiResponseType, User } from '../contexts/GroupContext';
import GroupInviteCode from '../components/GroupInviteCode';
import UserCardContainer from '../components/UserCardContainer';
import ButtonContainer from '../components/forms/ButtonContainer';


export default function GroupSettings() {
    const { idGroup } = useParams<{ idGroup: string }>();
    const groupContext = useGroupContext();
    const [group, setGroup] = useState<GroupApiResponseType | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (groupContext) {
            const foundGroup = groupContext.groups.find(g => g.group_id === parseInt(idGroup || ''));
            setGroup(foundGroup || null);
        }
    }, [idGroup, groupContext]);

    useEffect(() => {
        async function fetchUsers() {
            if (groupContext && idGroup) {
                const users = await groupContext.getUsersByGroupId(parseInt(idGroup));
                setUsers(users);
                setLoading(false);
            }
        }

        fetchUsers();
    }, [idGroup, groupContext]);

    if (!group) {
        return <div>Groupe non trouvé</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSelectionChange = (selectedIds: number[]) => {
        console.log(`Selected user IDs: ${selectedIds.join(', ')}`);
    };

    return (
        <div className="group-settings">
            <GroupInviteCode inviteCode={group.group_code} />
            <UserCardContainer users={users} onSelectionChange={handleSelectionChange} />
            <ButtonContainer buttons={[{ text: "Valider", type: "button", name: "validate" }]} />
        </div>
    );
}