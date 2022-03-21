/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Container } from './style';

interface TooltipProps {
  text: string;
  className?: string;
  children: JSX.Element;
}

export default function Tooltip({
  text,
  children,
  className,
}: TooltipProps): JSX.Element {
  return (
    <Container className={className}>
      {children}
      <span className="tooltiptext">{text}</span>
    </Container>
  );
}
