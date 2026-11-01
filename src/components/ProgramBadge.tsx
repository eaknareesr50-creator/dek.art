import type { CSSProperties } from 'react';
import type { Program } from '../types';

export function programStyle(program: Program): CSSProperties {
  return { '--c1': program.color1, '--c2': program.color2 } as CSSProperties;
}

interface Props {
  program: Program;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgramBadge({ program, size = 'md' }: Props) {
  return (
    <span className={`pbadge pbadge-${size}`} style={programStyle(program)} aria-hidden="true">
      {program.abbr}
    </span>
  );
}
