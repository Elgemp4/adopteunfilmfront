interface UserCardProps {
    user: {
        id: number;
        firstname: string;
        lastname: string;
    };
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export default function UserCard({ user, isSelected, onSelect }: UserCardProps) {
    const initials = `${user.firstname.charAt(0).toUpperCase()}${user.lastname.charAt(0).toUpperCase()}`;

    return (
        <div
            className={`user-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(user.id)}
        >
            <div className="user-logo-container">
                <div className="user-logo">{initials}</div>
            </div>
        </div>
    );
}