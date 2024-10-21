import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import api from "./api";

interface ProviderContextType {
    providers: ProviderApiResponseType[];
    sendSelectedProviders: (providerIds: number[]) => Promise<void>;
}

interface ProviderApiResponseType {
    provider_id: number;
    name: string;
    logo_path: string;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export default function ProviderDistributor({ children }: { children: ReactNode }) {
    const [providerList, setProviderList] = useState<ProviderApiResponseType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProviders() {
            try {
                setLoading(true);
                const response = await api.get("/providers");
                setProviderList(response.data.providers);
            } catch (err: any) {
                console.log("Error:", err.response);
            } finally {
                setLoading(false);
            }
        }

        loadProviders();
    }, []);

    const sendSelectedProviders = async (providerIds: number[]) => {
        try {
            const response = await api.post("/providers/personal", {providers: providerIds });
            console.log("Selected providers sent successfully:", response.data);
        } catch (err: any) {
            console.log("Error sending selected providers:", err.response);
        }
    };

    return loading ? <h1>Loading...</h1> : (
        <ProviderContext.Provider value={{ providers: providerList, sendSelectedProviders }}>
            {children}
        </ProviderContext.Provider>
    );
}

export const useProviderContext = () => {
    return useContext(ProviderContext);
}