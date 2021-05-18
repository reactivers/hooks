import { useEffect, useState } from "react"

const useMounted = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(false)
        return () => {
            setMounted(true);
        }
    }, [])

    return mounted;
}

export default useMounted;