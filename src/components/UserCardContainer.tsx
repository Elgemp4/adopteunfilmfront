// src/components/UserCardContainer.tsx
import { useState, useEffect } from 'react';
import UserCard from './UserCard';

interface User {
    id: number;
    firstname: string;
    lastname: string;
}

interface UserCardContainerProps {
    users: User[];
    onSelectionChange: (selectedIds: number[]) => void;
}

export default function UserCardContainer({ users, onSelectionChange }: UserCardContainerProps) {
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        onSelectionChange(selected);
    }, [selected, onSelectionChange, users]);

    const handleSelect = (id: number) => {
        setSelected(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id)
                : [...prevSelected, id]
        );
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