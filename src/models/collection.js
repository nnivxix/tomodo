import model from "@/repositories/model";
import config from "@/configs/database";

const collection = model({
  connection: config.connection,
  table: "collections",
});

export default collection;
