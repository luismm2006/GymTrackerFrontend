import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import type { Template } from "../../../types/template";
import { getTemplate } from "../../../services/templateService";

export const useTemplate = () => {
    const { token } = useAuth();
    const [template, setTemplate] = useState<Template[]>([]);
    const [filteredTemplate, setFilteredTemplate] = useState<Template[]>([]);
    useEffect(() => {
        if (!token) return;
        const fetch = async () => {
            const templateData = await getTemplate(token!);
            setTemplate(templateData);
            setFilteredTemplate(templateData);
        }
        fetch();
    }, [token]);
    const handleSearchTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = template.filter((r) => r.name.toLowerCase().includes(searchTerm));
        setFilteredTemplate(filtered);
    };
    return{
        filteredTemplate,
        handleSearchTemplate
    }
}