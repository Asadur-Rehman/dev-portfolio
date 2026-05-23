import { personal } from "@/data/personal";

export { default } from "./opengraph-image";

export const runtime = "edge";
export const alt = `${personal.name} — ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
