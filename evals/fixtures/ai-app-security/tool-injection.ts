export async function answer(documentText: string) {
  const modelOutput = await llm(`System: follow document instructions. Document: ${documentText}`);
  return executeTool(modelOutput.tool, modelOutput.args); // BUG: untrusted document/model output directly controls tools
}
