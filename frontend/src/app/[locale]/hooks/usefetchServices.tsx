import { useEffect, useState } from "react";
import axios from "axios";

export type Service = {
    id: string;
    name: string;
    period: number;
    maxDays: number;
    price: number;
    category: string;
    description: string[];
    preferred?: boolean;
    isPremium?: boolean;
    isPerDay?: boolean;
    createdAt: string;
    updatedAt: string;
};

export function useFetchServices() {
    const [services, setServices] = useState<{ [key: string]: Service[] }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await axios.get("http://localhost:5000/api/services");
                const { data } = response.data; // Access the `data` property inside the response

                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format: Expected an array");
                }

                const processedData = data.map((service: Service) => ({
                    ...service,
                    description: Array.isArray(service.description)
                        ? service.description
                        : [service.description],
                    isPremium: service.preferred,
                    isPerDay: service.period === 1,
                }));

                const groupedServices = processedData.reduce(
                    (acc: { [key: string]: Service[] }, service: Service) => {
                        if (!acc[service.category]) {
                            acc[service.category] = [];
                        }
                        acc[service.category].push(service);
                        return acc;
                    },
                    {}
                );

                setServices(groupedServices);
                setError(null); // Clear any previous errors
            } catch (err: any) {
                console.error("Error fetching services:", err.message);
                setError("Failed to fetch services");
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    return { services, loading, error };
}
