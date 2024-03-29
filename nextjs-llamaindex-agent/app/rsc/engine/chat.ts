// import config from "@/config/tools.json";
import { OpenAI, OpenAIAgent, QueryEngineTool } from "llamaindex";
import { STORAGE_CACHE_DIR } from "./constants.mjs";
import { getDataSource } from "./index";

export async function createChatEngine(llm: OpenAI) {
  const index = await getDataSource(llm);
  const queryEngine = index.asQueryEngine();
  const queryEngineTool = new QueryEngineTool({
    queryEngine: queryEngine,
    metadata: {
      name: "data_query_engine",
      description: `A query engine for documents in storage folder: ${STORAGE_CACHE_DIR}`,
    },
  });

  // TODO: Use ToolFactory when it's available in LlamaIndex release
  // const externalTools = await ToolFactory.createTools(config);

  const agent = new OpenAIAgent({
    tools: [queryEngineTool],
    verbose: true,
    llm,
  });

  return agent;
}