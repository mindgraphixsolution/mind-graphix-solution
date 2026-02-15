import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/classnames';
export const Badge = React.forwardRef(({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-cyan-100 text-cyan-800',
    };
    return (_jsx("span", { ref: ref, className: cn('inline-block px-2 py-1 text-xs font-semibold rounded-full', variants[variant], className), ...props }));
});
Badge.displayName = 'Badge';
//# sourceMappingURL=Badge.js.map