import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/classnames';
export const Card = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-white',
        outlined: 'bg-white border border-gray-200',
        elevated: 'bg-white shadow-lg',
    };
    return (_jsx("div", { ref: ref, className: cn('rounded-lg p-6', variants[variant], className), ...props }));
});
Card.displayName = 'Card';
//# sourceMappingURL=Card.js.map