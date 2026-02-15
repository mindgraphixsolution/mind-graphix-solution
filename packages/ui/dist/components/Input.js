import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/classnames';
export const Input = React.forwardRef(({ className, label, error, helperText, ...props }, ref) => (_jsxs("div", { className: "flex flex-col gap-1", children: [label && _jsx("label", { className: "text-sm font-medium text-gray-700", children: label }), _jsx("input", { ref: ref, className: cn('px-3 py-2 border rounded-md text-base transition-colors', error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500', className), ...props }), error && _jsx("span", { className: "text-sm text-red-500", children: error }), helperText && _jsx("span", { className: "text-sm text-gray-500", children: helperText })] })));
Input.displayName = 'Input';
//# sourceMappingURL=Input.js.map