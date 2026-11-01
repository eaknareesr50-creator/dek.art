import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import ProgramBadge, { programStyle } from '../components/ProgramBadge';
import TutorialCard from '../components/TutorialCard';
import { useLibrary } from '../context/LibraryContext';
import { useToast } from '../context/ToastContext';
import { LEVEL_LABEL } from '../data/meta';
import { getProgram } from '../data/programs';
import { getTutorial, tutorials } from '../data/tutorials';
import { usePageTitle } from '../lib/usePageTitle';
import NotFound from './NotFound';

export default function TutorialDetail() {
  const { id } = useParams<{ id: string }>();
  const tutorial = getTutorial(id);
  const { isSaved, toggleSaved, doneSteps, toggleStep } = useLibrary();
  const toast = useToast();
  usePageTitle(tutorial ? tutorial.title : 'ไม่พบบทเรียน');

  if (!tutorial) return <NotFound message="ไม่พบบทเรียนที่คุณต้องการ" />;

  const program = getProgram(tutorial.program);
  const saved = isSaved(tutorial.id);
  const done = doneSteps(tutorial.id);
  const percent = Math.round((done.length / tutorial.steps.length) * 100);
  const completed = done.length === tutorial.steps.length;

  const siblings = tutorials.filter((t) => t.program === tutorial.program);
  const index = siblings.findIndex((t) => t.id === tutorial.id);
  const next = siblings[index + 1];
  const prev = siblings[index - 1];
  const related = siblings.filter((t) => t.id !== tutorial.id).slice(0, 2);

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast('success', 'คัดลอกลิงก์บทเรียนแล้ว');
    } catch {
      toast('error', 'คัดลอกลิงก์ไม่สำเร็จ กรุณาคัดลอกจากแถบที่อยู่เอง');
    }
  };

  const onSave = () => {
    const nowSaved = toggleSaved(tutorial.id);
    toast('success', nowSaved ? 'บันทึกบทเรียนแล้ว' : 'นำออกจากรายการที่บันทึกแล้ว');
  };

  const consultLink = `/consult?program=${program.slug}&topic=${encodeURIComponent(
    `ติดปัญหาในบทเรียน: ${tutorial.title}`,
  )}`;

  return (
    <div className="container page" style={programStyle(program)}>
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/tutorials">บทเรียน</Link> / <Link to={`/programs/${program.slug}`}>{program.name}</Link>
      </nav>

      <header className="tutorial-head">
        <ProgramBadge program={program} size="lg" />
        <div>
          <h1>{tutorial.title}</h1>
          <p className="lead">{tutorial.summary}</p>
          <div className="tc-meta">
            <span className={`level level-${tutorial.level}`}>{LEVEL_LABEL[tutorial.level]}</span>
            <span className="meta-item">
              <Icon name="clock" size={15} /> {tutorial.minutes} นาที
            </span>
            <span className="meta-item">{tutorial.steps.length} ขั้นตอน</span>
          </div>
          <div className="hero-actions">
            <button type="button" className={`btn ${saved ? 'btn-primary' : 'btn-ghost'}`} onClick={onSave} aria-pressed={saved}>
              <Icon name="bookmark" size={18} filled={saved} /> {saved ? 'บันทึกแล้ว' : 'บันทึกบทเรียน'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onShare}>
              <Icon name="share" size={18} /> คัดลอกลิงก์
            </button>
          </div>
        </div>
      </header>

      <div className="detail-layout">
        <section aria-label="ขั้นตอน">
          <div className="progress-wrap">
            <div className="progress-label">
              <span>ความคืบหน้า</span>
              <strong>
                {done.length}/{tutorial.steps.length} ({percent}%)
              </strong>
            </div>
            <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${percent}%` }} />
            </div>
          </div>

          <ol className="steps">
            {tutorial.steps.map((step, i) => {
              const isDone = done.includes(i);
              return (
                <li key={step.title} className={`step${isDone ? ' done' : ''}`}>
                  <button
                    type="button"
                    className="step-check"
                    aria-pressed={isDone}
                    aria-label={`${isDone ? 'ยกเลิกการทำเครื่องหมาย' : 'ทำเครื่องหมายว่าเสร็จ'} ขั้นตอนที่ ${i + 1}`}
                    onClick={() => toggleStep(tutorial.id, i)}
                  >
                    {isDone ? <Icon name="check" size={18} /> : i + 1}
                  </button>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {completed && (
            <div className="alert alert-success" role="status">
              <strong>เยี่ยมมาก! คุณเรียนบทนี้จบแล้ว</strong>
              {next ? (
                <span>
                  {' '}
                  ไปต่อที่ <Link to={`/tutorials/${next.id}`}>{next.title}</Link>
                </span>
              ) : (
                <span>
                  {' '}
                  ลองดูบทเรียนอื่น ๆ ได้ที่ <Link to="/tutorials">หน้าบทเรียน</Link>
                </span>
              )}
            </div>
          )}

          <div className="pager">
            {prev ? (
              <Link to={`/tutorials/${prev.id}`} className="btn btn-ghost">
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/tutorials/${next.id}`} className="btn btn-ghost">
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>

        <aside className="sidebar">
          <div className="info-card">
            <h3>เคล็ดลับ</h3>
            <ul>
              {tutorial.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="info-card">
            <h3>แท็ก</h3>
            <div className="tags">
              {tutorial.tags.map((tag) => (
                <Link key={tag} to={`/tutorials?q=${encodeURIComponent(tag)}`} className="tag">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="info-card accent">
            <h3>ติดตรงไหนอยู่?</h3>
            <p>ส่งปัญหาของคุณมาให้เราช่วยดู</p>
            <Link to={consultLink} className="btn btn-primary btn-block">
              ขอคำปรึกษา
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="block">
          <div className="section-head">
            <h2>บทเรียนที่เกี่ยวข้อง</h2>
          </div>
          <div className="grid grid-3">
            {related.map((t) => (
              <TutorialCard key={t.id} tutorial={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
