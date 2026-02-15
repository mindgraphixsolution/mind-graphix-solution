import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/classnames';
export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', loading = false, icon, children, ...props }, ref) => {
    const baseStyles = 'font-medium transition-colors duration-200 flex items-center gap-2';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
        ghost: 'text-gray-900 hover:bg-gray-100',
    };
    const sizes = {
        sm: 'px-3 py-1 text-sm rounded',
        md: 'px-4 py-2 text-base rounded-md',
        lg: 'px-6 py-3 text-lg rounded-lg',
    };
    return (_jsxs("button", { ref: ref, className: cn(baseStyles, variants[variant], sizes[size], className), disabled: loading || props.disabled, ...props, children: [loading && _jsx("span", { className: "animate-spin", children: "\u23F3" }), icon && !loading && icon, children] }));
});
Button.displayName = 'Button';
//# sourceMappingURL=Button.js.map