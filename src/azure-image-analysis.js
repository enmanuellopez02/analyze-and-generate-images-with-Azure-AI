export async function analyzeImage(url) {
    const visionEndPoint = import.meta.env.VITE_COMPUTER_VISION_END_POINT
    const visionKey = import.meta.env.VITE_COMPUTER_VISION_SUBSCRIPTION_KEY

    if(visionEndPoint === undefined || visionEndPoint === "") {
        alert("Please set your Computer Vision end point in the .env file")
        return
    }

    if(visionKey === undefined || visionKey === "") {
        alert("Please set your Computer Vision subscription key in the .env file")
        return
    }

    const response = await fetch(`${visionEndPoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=caption`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': visionKey
        },
        body: JSON.stringify({ url })
    })

    const data = await response.json()
    return data
}

export function isConfigured() {
    const visionEndPoint = import.meta.env.VITE_COMPUTER_VISION_END_POINT
    const visionKey = import.meta.env.VITE_COMPUTER_VISION_SUBSCRIPTION_KEY

    return visionEndPoint !== undefined && visionEndPoint !== "" && visionKey !== undefined && visionKey !== ""
}