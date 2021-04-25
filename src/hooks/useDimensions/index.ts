import { useCallback, useEffect, useState } from 'react';
import useUtils from '../useUtils';
import { Breakpoint, useDimensionsContext } from './context'


interface DimensionProps {
    breakpoints: [Breakpoint]
}

interface Dimensions {
    width: number,
    height: number,
    size: Breakpoint
}

interface DimensionResponse extends Dimensions {
    isSizeEqualOrLargerThan: (size: Breakpoint) => boolean,
    isSizeLargerThan: (size: Breakpoint) => boolean,
    isSizeEqualTo: (size: Breakpoint) => boolean,
    isSizeSmallerThan: (size: Breakpoint) => boolean,
    isSizeEqualOrSmallerThan: (size: Breakpoint) => boolean
}

const useDimensions: (payload: DimensionProps) => DimensionResponse = ({ breakpoints }) => {
    const { sizes, widths } = useDimensionsContext()
    const { findLastIndex, takeIf } = useUtils();

    const getSizeOfWindowWidth = useCallback((width) => {
        const indexOfWidth = findLastIndex(widths, c => width >= c);
        return sizes[takeIf(indexOfWidth > -1, indexOfWidth, 0)]
    }, [findLastIndex, widths, sizes, takeIf])

    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 0,
        height: 0,
        size: "xs"
    });
    const { size } = dimensions;


    const updateDimensions = useCallback((width, height) => {
        const newSize = getSizeOfWindowWidth(width)
        if (breakpoints.indexOf(newSize)) {
            setDimensions(oldDimensions => {
                const newDimensions = { ...oldDimensions };
                newDimensions.width = width
                newDimensions.height = height
                newDimensions.size = newSize;
                return newDimensions;
            })
        }
    }, [breakpoints, getSizeOfWindowWidth])

    const getCurrentAndRequestedSizeIndex = useCallback((_size: Breakpoint) => {
        const indexOfCurrentSize = sizes.indexOf(size);
        const indexOfSize = sizes.indexOf(_size);
        return [indexOfCurrentSize, indexOfSize];
    }, [sizes, size])

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
        const { innerWidth, innerHeight } = _window
        updateDimensions(innerWidth, innerHeight)
    }, [updateDimensions])

    useEffect(() => {
        onResize(window)
        const oldOnResize = window.onresize;
        window.onresize = e => {
            onResize(e.target);
            //@ts-ignore
            if (oldOnResize) oldOnResize(e)
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
