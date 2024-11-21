import React from 'react';

interface GroupInviteCodeProps {
    inviteCode: string;
}

const GroupInviteCode: React.FC<GroupInviteCodeProps> = ({ inviteCode }) => {
    return (
        <div className="invite-code-container">
            <p>Code d'invitation du groupe :</p>
            <div className="invite-code">
                {inviteCode}
            </div>
        </div>
    );
};

export default GroupInviteCode;