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
          ? 'Illustrative TAB architecture: iMessage enters an AI interpreter, then deterministic ledger operations and devnet settlement.'
          : slug === 'gradesense'
            ? 'Illustrative GradeSense workflow: a submitted appeal moves through AI preview + recommendation, role-based review, and resolution.'
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
        <div className="tab-system-preview">
          <div className="preview-message">
            <span>iMessage / illustrative input</span>
            <strong>“I paid for gas. Split with everyone.”</strong>
          </div>
          <div className="preview-process">
            <span>Photon</span>
            <ArrowRight size={13} />
            <span>Gemini intent</span>
            <ArrowRight size={13} />
            <span>Typed action</span>
          </div>
          <div className="preview-ledger">
            <GitBranch size={18} />
            <div>
              <strong>Deterministic ledger</strong>
              <small>Integer cents · SQLite · disputes</small>
            </div>
          </div>
          <div className="preview-settlement">
            Solana devnet
            <ArrowRight size={13} />
            <span>Test-token settlement</span>
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
              <strong>AI preview + recommendation</strong>
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
              <strong>Staff decision → final score</strong>
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
            ? 'IMESSAGE → AI INTENT → LEDGER → DEVNET'
            : slug === 'gradesense'
              ? 'STRUCTURED DATA. CLEAR RESPONSIBILITIES.'
              : 'FOUR ENTRY POINTS. ONE PLATFORM.'}
        </span>
        <span>FIG. {slug === 'tab' ? '01' : slug === 'gradesense' ? '02' : '03'}</span>
      </div>
    </div>
  );
}
