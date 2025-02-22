const maskPhone = (value) => {
    if (!value) return "";
    return value
        .replace(/\D/g, "") 
        .replace(/(\d{2})(\d)/, "($1) $2") 
        .replace(/(\d{5})(\d)/, "$1-$2") 
        .slice(0, 19);
};

const maskCpf = (value) => {
    if (!value) return "";
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
};

const maskCep = (value) => {
    if (!value) return "";
    return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);
};

export { maskPhone, maskCpf, maskCep };
