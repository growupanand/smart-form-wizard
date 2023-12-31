import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
} from "openai-edge";
import { FormWithFields } from "../types/form";
import { SystemPromptService } from "./systemPrompt";
import { OPENAI_API_KEY, OPEN_AI_MODEL } from "../constants";

const openAI = new OpenAIApi(
  new Configuration({
    apiKey: OPENAI_API_KEY,
  })
);

export class OpenAIService extends SystemPromptService {
  form: FormWithFields;
  apiKey: string = OPENAI_API_KEY;
  openai: OpenAIApi = openAI;
  openAIModel: string = OPEN_AI_MODEL;

  constructor(form: FormWithFields) {
    super(form);
    this.form = form;
  }

  getOpenAIResponse(
    messages: ChatCompletionRequestMessage[],
    stream: boolean = false,
    functions?: ChatCompletionFunctions[]
  ) {
    const createChatCompletionRequest = {
      model: this.openAIModel,
      stream,
      messages,
    } as CreateChatCompletionRequest;
    const openAIFunctions = functions ?? this.getOpenAIFunctions();
    if (openAIFunctions.length > 0) {
      createChatCompletionRequest.functions = openAIFunctions;
      createChatCompletionRequest.function_call = "auto";
    }
    return this.openai.createChatCompletion(createChatCompletionRequest);
  }

  getOpenAIResponseStream(
    messages: ChatCompletionRequestMessage[],
    functions?: ChatCompletionFunctions[]
  ) {
    return this.getOpenAIResponse(messages, true, functions);
  }

  /**
   * Used to define OpenAI functions for calling in the chat.
   * [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
   *
   * @returns Array of OpenAI functions
   */
  getOpenAIFunctions(): ChatCompletionFunctions[] {
    return [];
  }
}
