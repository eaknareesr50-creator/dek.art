import { Link } from 'react-router-dom';
import { LEVEL_LABEL } from '../data/meta';
import { getProgram } from '../data/programs';
import { useLibrary } from '../context/LibraryContext';
import { useToast } from '../context/ToastContext';
import type { Tutorial } from '../types';
import Icon from './Icon';
import ProgramBadge, { programStyle } from './ProgramBadge';

export default function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const program = getProgram(tutorial.program);
  const { isSaved, toggleSaved, doneSteps } = useLibrary();
  const toast = useToast();
  const saved = isSaved(tutorial.id);
  const doneCount = doneSteps(tutorial.id).length;
  const percent = Math.round((doneCount / tutorial.steps.length) * 100);

  const onSave = () => {
    const nowSaved = toggleSaved(tutorial.id);
    toast('success', nowSaved ? 'บันทึกบทเรียนแล้ว' : 'นำออกจากรายการที่บันทึกแล้ว');
  };

  return (
    <article className="tutorial-card" style={programStyle(program)}>
      <button
        type="button"
        className={`save-btn${saved ? ' is-saved' : ''}`}
        onClick={onSave}
        aria-pressed={saved}
        aria-label={saved ? 'นำออกจากรายการที่บันทึก' : 'บันทึกบทเรียนนี้'}
      >
        <Icon name="bookmark" size={18} filled={saved} />
      </button>
      <div className="tc-top">
        <ProgramBadge program={program} size="sm" />
        <span className="tc-program">{program.name}</span>
      </div>
      <h3>
        <Link to={`/tutorials/${tutorial.id}`} className="stretched">
          {tutorial.title}
        </Link>
      </h3>
      <p>{tutorial.summary}</p>
      <div className="tc-meta">
        <span className={`level level-${tutorial.level}`}>{LEVEL_LABEL[tutorial.level]}</span>
        <span className="meta-item">
          <Icon name="clock" size={15} /> {tutorial.minutes} นาที
        </span>
        {doneCount > 0 && <span className="meta-item meta-progress">เรียนแล้ว {percent}%</span>}
      </div>
    </article>
  );
}
