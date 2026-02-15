import React from 'react';
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    onClose?: () => void;
}
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Alert.d.ts.map