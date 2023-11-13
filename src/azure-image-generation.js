import OpenAI from "openai"

export async function generateImage(description) {
  const openAIKey = import.meta.env.VITE_OPENAI_API_KEY

  if(openAIKey === undefined || openAIKey === "") {
    alert("Please set your OpenAI API key in the .env file")
    return
  }

  const openai = new OpenAI({ apiKey: openAIKey, dangerouslyAllowBrowser: true })
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: description,
    n: 1,
    size: "1024x1024",
  })

  return response.data[0]
}

export function isConfigured() {
  const openAIKey = import.meta.env.VITE_OPENAI_API_KEY

  return openAIKey !== undefined && openAIKey !== ""
}