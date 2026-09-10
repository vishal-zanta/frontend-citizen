export const getEntityLabel = (item: any, t?: any) => {
  if (!item) return "";
  if (typeof item === "object") {
    if (t) {
      return (
        t(item.name || item.title, item.nameHindi || item.titleHindi) ||
        item.name ||
        item.title ||
        item.nameHindi ||
        item.titleHindi ||
        ""
      );
    }
    return item.name || item.title || item.nameHindi || item.titleHindi || "";
  }
  return String(item);
};
