import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface ProviderContextType {
    provider_id: number,
    provider_name: string,
    provider_logo: string,
}

interface ProviderApiResponseType {
    provider_id: number,
    provider_name: string,
    provider_logo: string,
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export default function ProviderProvider({ children }: { children: ReactNode }) {
    const { api } = useAuth();

    const [providerList, setProviderList] = useState<ProviderApiResponseType[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProviders() {
            try {
                setLoading(true);
                const providers = await api.get("/providers/global");
                setProviderList(providers.data);
            } catch (err: any) {
                console.log(err.response);
                //TODO
            } finally {
                setLoading(false);
            }
        }

        loadProviders();
    }, [api]);

    return (
        <ProviderContext.Provider value={providerList}>
            {children}
        </ProviderContext.Provider>
    );
}