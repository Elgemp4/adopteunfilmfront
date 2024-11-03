import {ReactNode, createContext, useContext, useState, useEffect} from "react";
import api from "./api";

interface GroupContextType {
    groups: GroupApiResponseType[];
    createGroup: (groupName: string) => Promise<void>;
    joinGroup: (groupCode: number) => Promise<void>;
    deleteGroup: (groupId: number) => Promise<void>;
}

interface GroupApiResponseType {
    group_id: number;
    group_code: string;
    name: string;
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

    const joinGroup = async (groupCode: number) => {
        try {
            const response = await api.post("/groups/join", { code: groupCode });
            console.log("Joined group:", response.data);
            alert("Groupe rejoint avec succès");
        } catch (err: any) {
            console.log("Error joining group:", err.response);
            alert("Erreur lors de la jointure du groupe");
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
        <GroupContext.Provider value={{ groups: groupList, createGroup, joinGroup, deleteGroup }}>
            {children}
        </GroupContext.Provider>
    );
}

export const useGroupContext = () => {
    return useContext(GroupContext);
}