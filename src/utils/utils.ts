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

const errorHandler = (
  error: any,
  isError: boolean,
  errorType: string,
  errorText: string,
  setIsError: (isError: boolean) => void,
  setErrorType: (errorType: string) => void,
  setErrorText: (errorText: string) => void
) => {
  console.log(error);
  if (!isError) setIsError(true);
  if (errorType !== 'error') setErrorType('error');
  if (!error.response && errorText !== error.message) {
    setErrorText(error.message);
  }
  if (error.response && errorText !== error.response.data.message) {
    setErrorText(error.response.data.message);
  }
};

export { stringCapitalize, updateRequestedData, errorHandler };
