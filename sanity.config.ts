import { defineConfig } from 'sanity'; 
import { structureTool } from 'sanity/structure';
import schemas from './sanity/schemas';
const config = defineConfig({
    projectId: "atxeul2f",
    dataset: "production",
    title: "My Personal Website",
    apiVersion: "2025-05-29",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: { types: schemas},
});
export default config;