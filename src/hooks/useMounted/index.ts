import { useEffect, useState } from "react"

const useMounted: () => boolean = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
        return () => {
            setMounted(false);
        }
    }, [])

    return mounted;
}

export default useMounted;