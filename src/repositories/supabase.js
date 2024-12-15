import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const client = createClient(supabaseUrl, supabaseKey);

/**
 * @typedef {import('@/types').Collection} Collection
 */

const supabase = {
  async index() {
    // const { data } = await client.from("collections").select(`*, todos(count)`);
    const { data } = await client
      .from("collections")
      .select(`name, description, id:uid, created_at, todos(*)`);

    console.log(data);
    return data;
  },

  /** @param {Collection} collection */
  async create(collection) {
    const { data } = await client
      .from("collections")
      .insert({
        uid: collection.id,
        name: collection.name,
        description: collection.description,
      })
      .select(`name, description, id:uid, created_at, todos(*)`);

    return data;
  },

  async find(id) {
    // return (await dbPromise).get("collections", id);
    const { data } = await client
      .from("collections")
      .select(`name, description, id:uid, created_at, todos(*)`)
      .eq("uid", id)
      .limit(1);

    return data.at(0);
  },

  async update(id, values) {
    const { data, error } = await client
      .from("collections")
      .update({ ...values })
      .eq("uid", id)
      .select();

    if (error) {
      console.error(error);
    }
    return data;
  },
  async delete(key) {
    const { data, error } = await client
      .from("collections")
      .delete()
      .eq("uid", key);

    if (error) {
      console.error(error);
    }
    return data;
  },
};
export default supabase;
