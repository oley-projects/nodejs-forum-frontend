const stringCapitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const updateRequestedData = (
  requestFunction: Function,
  id: number,
  currentPage?: number,
  pages?: number,
  limit?: number
) => {
  requestFunction(id, currentPage, limit);
};
export { stringCapitalize, updateRequestedData };
