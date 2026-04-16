const username = "coalition";
const password = "skills-test";

export function getAuthHeader() {
  const encoded = btoa(`${username}:${password}`);

  return {
    Authorization: `Basic ${encoded}`,
  };
}