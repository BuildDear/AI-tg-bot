import * as dotenv from "dotenv";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {OpenAI} from "langchain/llms/openai";
import {loadQAStuffChain} from "langchain/chains";
import {Document} from "langchain/document";

dotenv.config();


export const queryPineconeVectorStoreAndQueryLLM = async (
    client,
    indexName,
    userText
) => {

    const question = userText;

    console.log("Querying Pinecone vector store...");

    const index = client.Index(indexName);
    console.log("Querying 1.");

    const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);

    let queryResponse = await index.query({
        queryRequest: {
            topK: 10,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true,
        },
    });

    console.log(`Found ${queryResponse.matches.length} matches...`);
    console.log(`Asking question: ${question}...`);

    if (queryResponse.matches.length)
    {
        const llm = new OpenAI({});

        console.log("1");

        const chain = loadQAStuffChain(llm);

        console.log("2");

        const concatenatedPageContent = queryResponse.matches
            .map((match) => match.metadata.pageContent)
            .join(" ");

        console.log("3");

        return await chain.call({
            input_documents: [new Document({pageContent: concatenatedPageContent})],
            question: question,
        });

    }
    else
    {
        console.log("Since there are no matches, GPT-3 will not be queried.");
        return null;
    }
};
