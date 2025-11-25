import type React from 'react';

export interface IInputWrapperProps {
    label: string;
    placeholder: string;
    buttonClassname: string;
    layoutClassName?: string;
    inputClassName: string;
    buttonContent: React.ReactElement;
}

