import clsx from 'clsx';

export default function Button({ buttonClassName, buttonText }) {
    return <button className={clsx('', buttonClassName)}>{buttonText}</button>;
}

