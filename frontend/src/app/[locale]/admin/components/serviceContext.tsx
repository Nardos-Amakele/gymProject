'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";
import { services as initialServices, Service, Tab } from "@/assets/data/servicesData";

interface ServiceContextType {
    services: Record<Tab, Service[]>;
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    addService: (tab: Tab, service: Service) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [services, setServices] = useState(initialServices);
    const [activeTab, setActiveTab] = useState<Tab>("Body Building");

    const addService = (tab: Tab, service: Service) => {
        setServices((prev) => ({
            ...prev,
            [tab]: [...prev[tab], service],
        }));
    };

    return (
        <ServiceContext.Provider value={{ services, activeTab, setActiveTab, addService }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServiceContext = () => {
    const context = useContext(ServiceContext);
    if (!context) throw new Error("useServiceContext must be used within a ServiceProvider");
    return context;
};
