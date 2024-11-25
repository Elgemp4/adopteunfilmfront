import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import api from "./api";

interface GroupContextType {
    groups: GroupApiResponseType[];
    createGroup: (groupName: string) => Promise<void>;
    joinGroup: (groupCode: string) => Promise<void>;
    deleteGroup: (groupId: number) => Promise<void>;
    getUsersByGroupId: (groupId: number) => Promise<User[]>;
    getGroupCodeById: (groupId: number) => Promise<string>;
}

export interface GroupApiResponseType {
    group_id: number;
    code: string;
    name: string;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export default function GroupDistributor({ children }: { children: ReactNode }) {
    const [groupList, setGroupList] = useState<GroupApiResponseType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadGroups() {
            try {
                setLoading(true);
                const response = await api.get("/groups");
                setGroupList(response.data.groups);
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

    const getUsersByGroupId = async (groupId: number) => {
        try {
            const response = await api.get(`/groups/${groupId}/users`);
            return response.data.users;
        } catch (err: any) {
            console.log("Error fetching users:", err.response);
            alert("Erreur lors du chargement des utilisateurs");
            return [];
        }
    };

    const getGroupCodeById = async (groupId: number): Promise<string> => {
        try {
            const response = await api.get(`/groups/${groupId}/code`);
            console.log("Group code:", response.data.code);
            return response.data.code;
        } catch (err: any) {
            console.log("Error fetching group code:", err.response);
            alert("Erreur lors du chargement du code du groupe");
            return '';
        }
    };

    return loading ? <h1>Loading...</h1> : (
        <GroupContext.Provider value={{ groups: groupList, createGroup, joinGroup, deleteGroup, getUsersByGroupId, getGroupCodeById }}>
            {children}
        </GroupContext.Provider>
    );
}

export const useGroupContext = () => {
    return useContext(GroupContext);
}