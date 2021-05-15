import { useCallback, useEffect, useRef } from "react";

interface ITitleProps {
    title?: string;
    setOldTitleOnUnmount?: boolean;
}

interface ITitleResponse {
    title: string
    setTitle: (newTitle: string) => void;
}


const useTitle: (props?: ITitleProps) => ITitleResponse = (props = { title: undefined, setOldTitleOnUnmount: false }) => {
    const { title, setOldTitleOnUnmount } = props;
    const initialTitle = useRef<string>();

    const setTitle = useCallback((title) => {
        document.title = title;
    }, [])

    useEffect(() => {
        initialTitle.current = document.title;
    }, [])

    useEffect(() => {
        if (title) setTitle(title)
        return () => {
            if (setOldTitleOnUnmount)
                setTitle(initialTitle.current)
        }
    }, [setTitle, title, initialTitle.current, setOldTitleOnUnmount])

    return {
        title,
        setTitle
    }
}

export default useTitle;