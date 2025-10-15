export const truncateText = (text: string, wordCount: number): string => {
    const words = text.split(" ");
    if (words.length > wordCount) {
        return words.slice(0, wordCount).join(" ") + "...";
    }
    return text;
};