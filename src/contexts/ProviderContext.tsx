import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import api from "./api";

interface ProviderContextType {
    providers: ProviderApiResponseType[];
}

interface ProviderApiResponseType {
    provider_id: number;
    name: string;
    logo_path: string;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export default function ProviderProvider({ children }: { children: ReactNode }) {
    const [providerList, setProviderList] = useState<ProviderApiResponseType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProviders() {
            try {
                setLoading(true);
                const response = await api.get("/providers");
                console.log("Response data:", response.data); // Log the response data
                setProviderList(response.data.providers); // Access the providers array
            } catch (err: any) {
                console.log("Error:", err.response);
            } finally {
                setLoading(false);
            }
        }

        loadProviders();
    }, []);

    return loading ? <h1>Loading...</h1> : (
        <ProviderContext.Provider value={{ providers: providerList }}>
            {children}
        </ProviderContext.Provider>
    );
}

export const useProviderContext = () => {
    return useContext(ProviderContext);
}