interface ITitleProps {
    title?: string;
    setOldTitleOnUnmount?: boolean;
}
interface ITitleResponse {
    title: string;
    setTitle: (newTitle: string) => void;
}
declare const useTitle: (props?: ITitleProps) => ITitleResponse;
export default useTitle;
