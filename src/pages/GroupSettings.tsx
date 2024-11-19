import UserCardContainer from "../components/UserCardContainer.tsx";

export default function GroupSettings() {
    const handleSelectionChange = (selectedIds: number[]) => {
        console.log(`Selected user IDs: ${selectedIds.join(', ')}`);
    };

    return (
        <div className="users">
            <UserCardContainer onSelectionChange={handleSelectionChange} />
        </div>
    );
}
