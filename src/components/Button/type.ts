import React from 'react';

type ButtonVariant = 'primary' | 'outline' | 'social' | 'arrow';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export default ButtonProps;
