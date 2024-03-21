import * as traceloop from "@traceloop/node-server-sdk";
import * as LlamaIndex from "@llamaindex/edge";

export const initObservability = () => {
  traceloop.initialize({
    appName: "llama-app",
    disableBatch: true,
    instrumentModules: {
      llamaIndex: LlamaIndex,
    },
  });
};
