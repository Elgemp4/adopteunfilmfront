import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import api from "./api";

interface GroupContextType {
    groupList: GroupApiResponseType[];

    selectedGroup: GroupApiResponseType | undefined;
    chooseGroup: (groupId: number) => void;
    selectedUsersId: number[];
    chooseUsers: (userId: number[]) => void;

    suggestedMovies: any[];
    
    createGroup: (groupName: string) => Promise<void>;
    joinGroup: (groupCode: string) => Promise<void>;
    deleteGroup: (groupId: number) => Promise<void>;
    loadGroupSuggestedMovies: (start: number) => Promise<void>;
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

    const [selectedGroup, setSelectedGroup] = useState<GroupApiResponseType>();
    const [selectedUsersId, setSelectedUsersId] = useState<number[]>([]);
    const [suggestedMovies, setSuggestedMovies] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGroupSuggestedMovies(0);
    }, [selectedGroup, selectedUsersId]);


    useEffect(() => {
        async function loadGroups() {
            try {
                setLoading(true);
                const response = await api.get("/groups");
                setGroupList(response.data.groups);
            } catch (err: any) {
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

    const chooseGroup = (groupId: number) => {
        const group = groupList.find(group => group.group_id === groupId);
        if(group !== undefined) {
            setSelectedGroup(group);
        }
    };

    const chooseUsers = (usersId: number[]) => {
        setSelectedUsersId(usersId);
    };

    const loadGroupSuggestedMovies = async (start: number) => {
        if (!selectedGroup) {
            return;
        }
        if (!selectedUsersId || selectedUsersId.length === 0) {
            return;
        }

        console.log("Loading group suggested movies:", selectedGroup, selectedUsersId);

        try {
            const response = await api.get(`/groups/${selectedGroup?.group_id}/suggestions?${selectedUsersId.map(id => `u=${id}`).join("&")}&start=${start}`);

            setSuggestedMovies((prevMovies) => {
                if(start === 0) {
                    return response.data;
                }

                const newMovies = response.data.filter((movie: any) => prevMovies.find((prevMovie: any) => prevMovie.movie.id === movie.movie.id) == null);
                return [...prevMovies, ...newMovies];
            });
        } catch (err: any) {
            console.log("Error loading group suggested movies:", err.response);
            alert("Erreur lors du chargement des films suggérés pour le groupe");
        }
    };

    return loading ? <h1>Loading...</h1> : (
        <GroupContext.Provider value={{ suggestedMovies, selectedUsersId, chooseUsers, loadGroupSuggestedMovies,
                                        groupList, selectedGroup, chooseGroup,
                                        createGroup, joinGroup, deleteGroup }}>
            {children}
        </GroupContext.Provider>
    );
}

export const useGroupContext = () => {
    return useContext(GroupContext);
}