// src/components/UserCardContainer.tsx
import { useState, useEffect } from 'react';
import UserCard from './UserCard';

import { User } from '../contexts/GroupContext';

interface UserCardContainerProps {
    users: User[];
    onSelectionChange: (selectedIds: number[]) => void;
}

export default function UserCardContainer({ users, onSelectionChange }: UserCardContainerProps) {
    const [selected, _setSelected] = useState<number[]>([]);

    const setSelected = (selectedIds: number[]) => {
        _setSelected(selectedIds);
        onSelectionChange(selectedIds);
    }

    const handleSelect = (id: number) => {
       if(selected.includes(id)){
            setSelected(selected.filter(i => i !== id)); //If user is already selected, remove it
       }
       else{
            setSelected([...selected, id]); //If user is not selected, add it
       }
    };

    return (
        <div className="users-grid">
            {users.map(user => (
                <UserCard
                    key={user.id} // Ensure each UserCard has a unique key
                    user={user}
                    isSelected={selected.includes(user.id)}
                    onSelect={handleSelect}
                />
            ))}
        </div>
    );
}