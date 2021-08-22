export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatLabel = (str: string): string => {
    return str.split("-").map(temp => capitalize(temp)).join(" ");
}