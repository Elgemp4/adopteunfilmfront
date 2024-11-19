interface UserCardProps {
    user: {
        user_id: number;
        first_name: string;
    };
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export default function UserCard({ user, isSelected, onSelect }: UserCardProps) {
    const firstLetter = user.first_name.charAt(0).toUpperCase();

    return (
        <div
            className={`user-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(user.user_id)}
        >
            <div className="user-logo-container">
                <div className="user-logo">T</div>
            </div>
        </div>
    );
}
