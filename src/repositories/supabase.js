import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

/**
 * @typedef {import('@/types').Collection} Collection
 */

const supabase = (table) => {
  const client = createClient(supabaseUrl, supabaseKey);

  return {
    async index() {
      const { data } = await client
        .from(table)
        .select(`name, description, id:uid, created_at`);

      return data;
    },

    /** @param {Collection} collection */
    async create(collection) {
      const { data } = await client
        .from(table)
        .insert({
          uid: collection.id,
          name: collection.name,
          description: collection.description,
        })
        .select(`name, description, id:uid, created_at, todos(*)`);

      return data;
    },

    async find(id) {
      // return (await dbPromise).get(table, id);
      const { data } = await client
        .from(table)
        .select(`name, description, id:uid, created_at, todos(*)`)
        .eq("uid", id)
        .limit(1);

      return data.at(0);
    },

    async update(id, values) {
      const { data, error } = await client
        .from(table)
        .update({ ...values })
        .eq("uid", id)
        .select();

      if (error) {
        console.error(error);
      }
      return data;
    },
    async delete(key) {
      const { error } = await client.from(table).delete().eq("uid", key);

      if (error) {
        console.error(error);
      }
    },
  };
};
export default supabase;
