export const formatPhoneNumber = (value: number) => {
  let parsedInput = value.toString().replace(/[^0-9]+/g, "");

  const parts: string[] = [];

  if (parsedInput.length > 0) {
    parts.push("(");
    parts.push(parsedInput.slice(0, 3));
  }

  if (parsedInput.length > 3) {
    parts.push(") ");
    parts.push(parsedInput.slice(3, 6));
  }

  if (parsedInput.length > 6) {
    parts.push("-");
    parts.push(parsedInput.slice(6, 10));
  }

  return parts.join("");
};
