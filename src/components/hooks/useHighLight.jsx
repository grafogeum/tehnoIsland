import { useState, useEffect, useCallback } from 'react'

export function useHighLight(highLightStart = 2.5, highLightPower = 3) {
    const [highLight, setHighLight] = useState(highLightStart)

    const increaseHighLight = () => {
        setHighLight(highLight + highLightPower)
    }
    const resetHighLight = () => {
        setHighLight(highLightStart)
    }

    return { highLight, increaseHighLight, resetHighLight }
}