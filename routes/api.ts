import { Route } from "jcc-express-mvc/Core";

Route.get("/", async function (req, res) {
  return res.json({ msg: [] });
});
