import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));
    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);
    return (_jsx("input", { ...props, type: type, className: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
            className, ref: localRef }));
});
