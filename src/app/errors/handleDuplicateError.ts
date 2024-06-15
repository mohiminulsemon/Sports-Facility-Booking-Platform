import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regular expression
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Duplicate Error",
    errorSources,
  };
};

export default handleDuplicateError;
