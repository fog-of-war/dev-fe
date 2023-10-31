export const getDataFromLocalStorage = (storageKey: string) => {
  const serializedData = localStorage.getItem(storageKey);
  const data = serializedData && JSON.parse(serializedData);
  return data || null;
};

export const setDataToLocalStorage = (storageKey: string, data: any) => {
  const serializedData = JSON.stringify(data);
  localStorage.setItem(storageKey, serializedData);
};

export const removeDataFromLocalStorage = (storageKey: string) => {
  localStorage.removeItem(storageKey);
};

export const clearAllLocalStorage = () => {
  localStorage.clear();
};
