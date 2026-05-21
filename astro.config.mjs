import { defineConfig } from "astro/config";

const [owner = "JianyuanZhong", repository = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isUserSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  output: "static",
  site: `https://${owner}.github.io`,
  base: process.env.BASE_PATH ?? (repository && !isUserSite ? `/${repository}` : "/"),
});
