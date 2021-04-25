import {useCallback, useEffect, useState} from 'react';
import {findLastIndex, takeIf} from "../utils/functions";

// eslint-disable-next-line no-extend-native
const widths = [576, 768, 992, 1200, 1600];
const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];


const getSizeOfWindowWidth = width => {
    const indexOfWidth = findLastIndex(widths, c => width >= c);
    return sizes[takeIf(indexOfWidth > -1, indexOfWidth, 0)]
}

const useDimensions = (payload) => {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        size: "xs"
    });

    const updateDimensions = useCallback((width, height) => {
        setDimensions(oldDimensions => {
            const newDimensions = {...oldDimensions};
            newDimensions.width = width
            newDimensions.height = height
            newDimensions.size = getSizeOfWindowWidth(width);
            return newDimensions;
        })
    }, [])

    const getCurrentAndRequestedSizeIndex = useCallback((_size) => {
        const {size} = dimensions;

        const indexOfCurrentSize = sizes.indexOf(size);
        const indexOfSize = sizes.indexOf(_size);
        return [indexOfCurrentSize, indexOfSize];
    }, [dimensions])

    const isSizeEqualOrLargerThan = useCallback((_size) => {
        const [indexOfCurrentSize, indexOfSize] = getCurrentAndRequestedSizeIndex(_size);
        return indexOfCurrentSize >= indexOfSize;
    }, [getCurrentAndRequestedSizeIndex])

    const isSizeLargerThan = useCallback((_size) => {
        const [indexOfCurrentSize, indexOfSize] = getCurrentAndRequestedSizeIndex(_size);
        return indexOfCurrentSize > indexOfSize;
    }, [getCurrentAndRequestedSizeIndex])

    const isSizeEqualTo = useCallback((_size) => {
        const [indexOfCurrentSize, indexOfSize] = getCurrentAndRequestedSizeIndex(_size);
        return indexOfCurrentSize === indexOfSize;
    }, [getCurrentAndRequestedSizeIndex])

    const isSizeSmallerThan = useCallback((_size) => {
        const [indexOfCurrentSize, indexOfSize] = getCurrentAndRequestedSizeIndex(_size);
        return indexOfCurrentSize < indexOfSize;
    }, [getCurrentAndRequestedSizeIndex])

    const isSizeEqualOrSmallerThan = useCallback((_size) => {
        const [indexOfCurrentSize, indexOfSize] = getCurrentAndRequestedSizeIndex(_size);
        return indexOfCurrentSize <= indexOfSize;
    }, [getCurrentAndRequestedSizeIndex])

    const onResize = useCallback(_window => {
        const {innerWidth, innerHeight} = _window
        updateDimensions(innerWidth, innerHeight)
    }, [updateDimensions])

    useEffect(() => {
        onResize(window)
        const oldOnResize = window.onresize;
        window.onresize = e => {
            onResize(e.target);
            if (oldOnResize)
                oldOnResize(e)
        }
    }, [onResize])

    return {
        ...dimensions,
        isSizeEqualOrLargerThan,
        isSizeLargerThan,
        isSizeEqualTo,
        isSizeSmallerThan,
        isSizeEqualOrSmallerThan
    };
}

export default useDimensions
