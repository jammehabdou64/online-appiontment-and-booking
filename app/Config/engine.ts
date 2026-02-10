import { jsBladeEngine } from "jcc-express-mvc/lib/Templating-engine";
export const engine = {
  templateEngine: "jcc-blade",
  engine: null,
  view: "resources/views",
  viewEngine: jsBladeEngine.render.bind(jsBladeEngine),
  viewEngineExtension: "blade.html",
};
