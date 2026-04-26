import React from 'react';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface AuthFooterProps {
  type: 'login' | 'signup';
}
