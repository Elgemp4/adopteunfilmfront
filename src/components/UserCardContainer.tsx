import { useState, useEffect } from 'react';
import UserCard from './UserCard';

interface UserCardContainerProps {
    onSelectionChange: (selectedIds: number[]) => void;
}

const staticUsers = [
    { user_id: 1, first_name: 'John', last_name: 'Doe' },
    { user_id: 2, first_name: 'Jane', last_name: 'Smith' },
    { user_id: 3, first_name: 'Alice', last_name: 'Johnson' },
    { user_id: 4, first_name: 'Alice', last_name: 'Johnson' },
    { user_id: 5, first_name: 'Alice', last_name: 'Johnson' },
    { user_id: 6, first_name: 'Alice', last_name: 'Johnson' },
    { user_id: 7, first_name: 'Alice', last_name: 'Johnson' },
    { user_id: 8, first_name: 'Alice', last_name: 'Johnson' },
    { user_id: 9, first_name: 'Alice', last_name: 'Johnson' },
    { user_id: 10, first_name: 'Alice', last_name: 'Johnson' }
];

export default function UserCardContainer({ onSelectionChange }: UserCardContainerProps) {
    const [selected, setSelected] = useState<number[]>([]);

    // Met à jour la liste des IDs sélectionnés
    useEffect(() => {
        onSelectionChange(selected);
    }, [selected, onSelectionChange]);

    const handleSelect = (id: number) => {
        setSelected(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(selectedId => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <div className="users-grid">
            {staticUsers.map(user => (
                <UserCard
                    key={user.user_id}
                    user={user}
                    isSelected={selected.includes(user.user_id)}
                    onSelect={handleSelect}
                />
            ))}
        </div>
    );
}
