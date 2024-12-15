const currentConnection = localStorage.getItem("connection");

const config = {
  connection: currentConnection ?? "indexedDB",
};

export default config;
