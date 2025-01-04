import { User } from "../contexts/GroupContext";

interface UserCardProps {
    user: User;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export default function UserCard({ user, isSelected = false, onSelect = () => {} }: UserCardProps) {
    const initials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`;

    return (
        <div
            className={`user-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(user.id)}>
            <div className="user-logo-container">
                <div className="user-logo">{initials}</div>
            </div>
        </div>
    );
}