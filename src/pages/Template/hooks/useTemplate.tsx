import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import type { Template } from "../../../types/template";
import { getTemplate } from "../../../services/templateService";

export const useTemplate = () => {
    const { token } = useAuth();
    const [template, setTemplate] = useState<Template[]>([]);
    const [filteredTemplate, setFilteredTemplate] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        let isCurrent = true;
        setLoading(true);
        const fetch = async () => {
            try {
                const templateData = await getTemplate(token);
                if (!isCurrent) return;
                setTemplate(templateData);
                setFilteredTemplate(templateData);
            } finally {
                if (isCurrent) setLoading(false);
            }
        }
        void fetch();
        return () => {
            isCurrent = false;
        };
    }, [token]);
    const handleSearchTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = template.filter((r) => r.name.toLowerCase().includes(searchTerm));
        setFilteredTemplate(filtered);
    };
    return{
        filteredTemplate,
        handleSearchTemplate,
        loading
    }
}