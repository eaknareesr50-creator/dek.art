import { Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import type { Program } from '../types';
import Icon from './Icon';
import ProgramBadge, { programStyle } from './ProgramBadge';

export default function ProgramCard({ program }: { program: Program }) {
  const count = tutorials.filter((t) => t.program === program.slug).length;
  return (
    <Link to={`/programs/${program.slug}`} className="program-card" style={programStyle(program)}>
      <ProgramBadge program={program} size="lg" />
      <span className="pc-category">{program.category}</span>
      <h3>{program.name}</h3>
      <p>{program.tagline}</p>
      <span className="pc-foot">
        {count} บทเรียน <Icon name="arrow" size={16} />
      </span>
    </Link>
  );
}
