import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/classnames';
export const Alert = React.forwardRef(({ className, type = 'info', title, onClose, children, ...props }, ref) => {
    const types = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800',
    };
    return (_jsxs("div", { ref: ref, className: cn('border rounded-lg p-4', types[type], className), ...props, children: [title && _jsx("h4", { className: "font-semibold mb-1", children: title }), _jsx("p", { children: children }), onClose && (_jsx("button", { onClick: onClose, className: "absolute top-2 right-2 text-xl", children: "\u2715" }))] }));
});
Alert.displayName = 'Alert';
//# sourceMappingURL=Alert.js.map