const validateCollection = (collection) => {
  if (
    collection.hasOwnProperty("id") &&
    collection.hasOwnProperty("name") &&
    collection.hasOwnProperty("description") &&
    collection.hasOwnProperty("todos") &&
    Array.isArray(collection.todos)
  ) {
    return true;
  }
  return false;
};

export default validateCollection;
