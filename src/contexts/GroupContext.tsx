import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import api from "./api";

interface GroupContextType {
    groupList: GroupApiResponseType[];

    selectedGroupId: number;
    setSelectedGroupId: (groupId: number) => void;

    selectedGroupName: string | undefined;
    selectedGroupUsers: User[] | undefined;
    selectedGroupCode: string | undefined
    
    createGroup: (groupName: string) => Promise<void>;
    joinGroup: (groupCode: string) => Promise<void>;
    deleteGroup: (groupId: number) => Promise<void>;
}

export interface GroupApiResponseType {
    group_id: number;
    code: string;
    name: string;
    owner: User;
    users: User[];
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export default function GroupDistributor({ children }: { children: ReactNode }) {
    const [groupList, setGroupList] = useState<GroupApiResponseType[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(-1);

    const [selectedGroupName, _setGroupName] = useState<string | undefined>(undefined);
    const [selectedGroupUsers, _setUsers] = useState<User[] | undefined>(undefined);
    const [selectedGroupCode, _setGroupCode] = useState<string | undefined>(undefined);

    const [loading, setLoading] = useState(true);

    // Update selected group data when selectedGroupId changes
    useEffect(() => {
        const group = groupList.find(group => group.group_id === selectedGroupId);

        if(group === undefined){
            _setUsers(undefined);
            _setGroupCode(undefined);
            return
        }

        _setUsers(group.users);
        _setGroupCode(group.code);
        _setGroupName(group.name);
    }, [selectedGroupId, groupList]);

    //Load groups from the API on page load
    useEffect(() => {
        async function loadGroups() {
            try {
                setLoading(true);
                const response = await api.get("/groups");
                console.log("Response:", response.data.groups);
                setGroupList(response.data.groups);
                console.log("Groups loaded:", response.data.groups);
            } catch (err: any) {
                console.log("Error:", err.response);
                alert("Erreur lors du chargement des groupes");
            } finally {
                setLoading(false);
            }
        }

        loadGroups();
    }, []);

    const createGroup = async (groupName: string) => {
        try {
            const response = await api.post("/groups/create", { name: groupName });
            setGroupList([...groupList, response.data.group]);
            console.log("Created group:", response.data);
            alert("Groupe créé avec succès");
        } catch (err: any) {
            console.log("Error creating group:", err.response);
            alert("Erreur lors de la création du groupe");
        }
    };

    const joinGroup = async (groupCode: string) => {
        try {
            const response = await api.post("/groups/join", { code: groupCode });
            setGroupList([...groupList, response.data.group]);
            console.log("Joined group:", response.data);
            alert("Groupe rejoint avec succès");
        } catch (err: any) {
            console.log("Error joining group:", err.response);
            if (err.response && err.response.data && err.response.data.message) {
                alert(`Erreur: ${err.response.data.message}`);
            } else {
                alert("Erreur lors de la jointure du groupe");
            }
        }
    };

    const deleteGroup = async (groupId: number) => {
        try {
            console.log("Deleting group:", groupId);
            setGroupList(groupList.filter(group => group.group_id !== groupId));
            alert("Groupe supprimé avec succès");
        } catch (err: any) {
            console.log("Error deleting group:", err.response);
            alert("Erreur lors de la suppression du groupe");
        }
    };

    return loading ? <h1>Loading...</h1> : (
        <GroupContext.Provider value={{ selectedGroupId, setSelectedGroupId,  
                                        groupList, selectedGroupName, selectedGroupCode, selectedGroupUsers,
                                        createGroup, joinGroup, deleteGroup }}>
            {children}
        </GroupContext.Provider>
    );
}

export const useGroupContext = () => {
    return useContext(GroupContext);
}