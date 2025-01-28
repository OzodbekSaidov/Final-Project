export const cookieData = (key) => {
  const oneDay = 1000 * 60 * 60 * 24 * 7; // Milliseconds in a day

  return {
    setValue: (value) => {
      const expires = new Date(Date.now() + oneDay);
      document.cookie = `${key}=${encodeURIComponent(
        JSON.stringify(value)
      )}; expires=${expires.toUTCString()}; path=/`;
    },
    getValue: () => {
      const allCookies = decodeURIComponent(document.cookie);
      const cookiePairs = allCookies.split(";");

      for (const cookiePair of cookiePairs) {
        const [cookieKey, encodedValue] = cookiePair.trim().split("=");
        if (decodeURIComponent(cookieKey) === key) {
          try {
            return JSON.parse(encodedValue);
          } catch (error) {
            console.warn(`Error parsing cookie value for key "${key}":`, error);
            return null; // Handle potential parsing errors gracefully
          }
        }
      }

      return null;
    },
  };
};
