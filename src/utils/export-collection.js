/**
 *
 * @param {import('@/composables/useCollection').Collection} collection
 * @returns
 */
const exportCollection = (collection) => {
  const json = JSON.stringify(collection);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `collection-${collection.id}`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);

  return;
};

export default exportCollection;
