import {initPinecone, pinecone} from "../pinecone/pinecone.js";
import {createPineconeIndex} from "../pinecone/createPineconeIndex.js";
import {updatePinecone} from "../pinecone/updatePinecone.js";
import {queryPineconeVectorStoreAndQueryLLM} from "../pinecone/queryPineconeAndQueryGPT.js";
import {DirectoryLoader} from "langchain/document_loaders/fs/directory";
import {TextLoader} from "langchain/document_loaders/fs/text";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";

export async function initAI(userText)
 {
     const pineconeIndexName = process.env.PINECONE_INDEX_NAME;
     const pineconeVectorDimension = process.env.PINECONE_VEC_DIMENSION;

     const loader = new DirectoryLoader("./documents", {
         ".txt": (path) => new TextLoader(path),
         ".pdf": (path) => new PDFLoader(path),
     });

     const docs = await loader.load();

     await initPinecone();

     await createPineconeIndex(pinecone, pineconeIndexName, pineconeVectorDimension);

     await updatePinecone(pinecone, pineconeIndexName, docs);

     return await queryPineconeVectorStoreAndQueryLLM(pinecone, pineconeIndexName, userText);
 }