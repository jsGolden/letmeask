import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({ isOutlined = false, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? 'outlined' : ''} ${className}`}
      {...rest}
    />
  );
}
