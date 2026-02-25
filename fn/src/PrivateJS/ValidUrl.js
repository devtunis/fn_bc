const isValidUrl = (text) => {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
 
  } catch {
    return false;
  }
};
export default  isValidUrl