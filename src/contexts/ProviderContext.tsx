import {ReactNode, createContext, useContext, useEffect, useState} from "react";
import api from "./api"

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

export default function ProviderProvider({children}: { children: ReactNode }) {
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
            } finally {
                setLoading(false);
            }
        }

        loadProviders();
    }, []);

    return loading ? <h1>Loading...</h1> : <ProviderContext.Provider value={{
        provider_id: providerList[0].provider_id,
        provider_name: providerList[0].provider_name,
        provider_logo: providerList[0].provider_logo,
    }}>
        {children}
    </ProviderContext.Provider>;

}

export const useProviderContext = () => {
    return useContext(ProviderContext);
}