import React, { useEffect, useState } from 'react'
import { analyzeImage, isConfigured as analyzeImageIsConfigured } from './azure-image-analysis'
import { generateImage, isConfigured as generateImageIsConfigured } from './azure-image-generation'
import './App.css'

function App() {
  // 'https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png'
  // a puppy sitting in the grass
  const [prompt, setPrompt] = useState("")
  const [executing, setExecuting] = useState(false)
  const [visionResult, setVisionResult] = useState("")
  const [selection, setSelection] = useState("Analyze")

  useEffect(() => {
    if (!analyzeImageIsConfigured()) {
      setVisionResult("Azure Cognitive Services not configured")
    }
    if (!generateImageIsConfigured()) {
      setVisionResult("Azure Open AI not configured")
    }
  }, [])

  const displayResults = async (flag) => {
    setExecuting(true)

    if(flag === "Analyze") {
      const result = await analyzeImage(prompt)
      setVisionResult(JSON.stringify(result, null, 2))
      setSelection("Analyze")
    }

    if (flag === "Generate") {
      const result = await generateImage(prompt)
      setVisionResult(JSON.stringify(result, null, 2))
      setSelection("Generate")
    }

    setExecuting(false)
  }

  return (
    <>
      {visionResult.includes("not configured") 
        ?
          <div className="error">{visionResult}</div>
        :
          <div>
            <h1>Computer vision</h1>
            <p>Insert URL or type prompt:</p>
            <input type="text" placeholder="Enter URL to analyze or textual prompt to generate an image" value={prompt} onChange={e => setPrompt(e.target.value)} /><br/><br/>
            <button onClick={() => displayResults("Analyze")}>{executing ? "Analysing" : "Analyze"}</button>&nbsp;
            <button onClick={() => displayResults("Generate")}>{executing ? "Generating" : "Generate"}</button>
            <hr />
            {visionResult &&
              <div>
                <h2>{selection === "Analyze" ? "Computer Vision Analysis" : "Image Generation"}</h2>
                <img src={selection === "Analyze" ? prompt : JSON.parse(visionResult).url} alt="no image to display" width="300px" height="300px" />
                <pre>{visionResult}</pre>
              </div>
            }
        </div>
      }
    </>
  )
}

export default App