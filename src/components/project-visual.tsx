import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  Mic,
  Sparkles,
  Users,
  CalendarDays,
  BookOpen,
  GitBranch,
} from 'lucide-react';
export function ProjectVisual({ slug, large = false }: { slug: string; large?: boolean }) {
  return (
    <div
      className={`project-visual visual-${slug} ${large ? 'visual-large' : ''}`}
      role="img"
      aria-label={
        slug === 'tab'
          ? 'Illustrative TAB architecture: shared purchases connect participants to AI-assisted entry and balance records.'
          : slug === 'gradesense'
            ? 'Illustrative GradeSense workflow: a submitted appeal moves through AI-assisted classification, role-based review, and resolution.'
            : 'Illustrative EmpowHER toolkit: interview practice, resume analysis, learning resources, and event discovery.'
      }
    >
      <div className="visual-top">
        <span>
          <span className="tiny-dot" />
          {slug === 'tab'
            ? 'TAB / SYSTEM OVERVIEW'
            : slug === 'gradesense'
              ? 'GRADESENSE / REQUEST FLOW'
              : 'EMPOWHER / CONNECTED TOOLS'}
        </span>
        <span>CONCEPT DIAGRAM</span>
      </div>
      {slug === 'tab' ? (
        <div className="tab-diagram">
          <div className="participant participant-one">
            <span>AP</span>
            <small>Participant 01</small>
          </div>
          <div className="participant participant-two">
            <span>02</span>
            <small>Participant 02</small>
          </div>
          <div className="participant participant-three">
            <span>03</span>
            <small>Participant 03</small>
          </div>
          <svg viewBox="0 0 500 280" aria-hidden="true">
            <path
              d="M100 62Q250 30 250 140M400 62Q250 30 250 140M250 236V140"
              fill="none"
              stroke="currentColor"
              strokeDasharray="4 5"
            />
          </svg>
          <div className="transaction-core">
            <GitBranch size={20} />
            <strong>
              One shared TAB<span>.</span>
            </strong>
            <small>Purchases → balances → history</small>
          </div>
          <div className="ai-input">
            <Sparkles size={13} />
            AI-assisted receipt entry
            <ArrowRight size={13} />
          </div>
        </div>
      ) : slug === 'gradesense' ? (
        <div className="grade-diagram">
          <div className="flow-step">
            <span className="flow-icon">
              <FileText size={19} />
            </span>
            <div>
              <small>01 / REQUEST</small>
              <strong>Appeal submitted</strong>
            </div>
            <Check size={15} />
          </div>
          <div className="flow-connector">
            <ArrowDown size={14} />
            <span>FastAPI + SQLModel</span>
          </div>
          <div className="flow-step flow-highlight">
            <span className="flow-icon">
              <Sparkles size={19} />
            </span>
            <div>
              <small>02 / INTELLIGENCE</small>
              <strong>AI-assisted classification</strong>
            </div>
            <span className="processing-dot" />
          </div>
          <div className="flow-connector">
            <ArrowDown size={14} />
            <span>Role-based access</span>
          </div>
          <div className="flow-step">
            <span className="flow-icon">
              <Users size={19} />
            </span>
            <div>
              <small>03 / REVIEW</small>
              <strong>Review → resolution</strong>
            </div>
            <ArrowRight size={15} />
          </div>
        </div>
      ) : (
        <div className="empowher-diagram">
          <div className="career-orbit" />
          <div className="career-center">
            e<span>h</span>
            <small>EmpowHER</small>
          </div>
          <div className="career-tool tool-one">
            <Mic size={18} />
            <span>Interview practice</span>
          </div>
          <div className="career-tool tool-two">
            <FileText size={18} />
            <span>Resume analysis</span>
          </div>
          <div className="career-tool tool-three">
            <BookOpen size={18} />
            <span>Learning resources</span>
          </div>
          <div className="career-tool tool-four">
            <CalendarDays size={18} />
            <span>Event discovery</span>
          </div>
        </div>
      )}
      <div className="visual-bottom">
        <span>
          {slug === 'tab'
            ? 'REACT ↔ BUN ↔ AI AGENTS'
            : slug === 'gradesense'
              ? 'STRUCTURED DATA. CLEAR RESPONSIBILITIES.'
              : 'FOUR ENTRY POINTS. ONE PLATFORM.'}
        </span>
        <span>FIG. {slug === 'tab' ? '01' : slug === 'gradesense' ? '02' : '03'}</span>
      </div>
    </div>
  );
}
