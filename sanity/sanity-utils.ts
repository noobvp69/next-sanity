import { Project } from "@/types/Project";
import { createClient,groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Page } from "@/types/Page";

export async function getProjects(): Promise<Project[]>{

 
    return createClient(clientConfig).fetch(
        groq`*[_type == "project"]{
        
        _id,
        _createAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
        
        }`
    );

}

export async function getProject(slug : string): Promise<Project>{
        
console.log("Looking up project with slug:", slug);



    return createClient(clientConfig).fetch(
        groq`*[_type == "project" && slug.current == $slug][0]{
        
        _id,
        _createAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
        
        }`,
        { slug },
     {
      next: { tags: [`project-${slug}`] }  // ✅ This must match your revalidation tag
    }
    );
}

export async function getPages(): Promise<Page[]>{
    return createClient(clientConfig).fetch(
        groq`*[_type == "page"]{
        _id,
        _createAt,
        title,
        "slug": slug.current
        }`
    )
}


export async function getPage(slug: string): Promise<Page>{
    return createClient(clientConfig).fetch(
        groq`*[_type == "page" && slug.current == $slug][0]{
        _id,
        _createAt,
        title,
        "slug": slug.current,
        content
        }`,
        { slug }
    )
}
