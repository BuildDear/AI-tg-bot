import { PineconeClient } from "@pinecone-database/pinecone";

export const pinecone = new PineconeClient();
export async function initPinecone() {

    try{
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT,
            apiKey: process.env.PINECONE_API_KEY
        });
    }catch(e)
    {
        console.log("Error: " + e.message);
    }
}


