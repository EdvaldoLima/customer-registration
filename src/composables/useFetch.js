export default function useFetch() {
  const post = (options) => {
    const { body } = options;
    // TODO: configurando dessa forma para facilidade
    return fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body: JSON.stringify(body),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      return data;
    });
  };
  return { post };
}
