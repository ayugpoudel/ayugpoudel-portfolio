import { ArrowDown, ArrowRight, Database, FileText, Layers, Sparkles } from 'lucide-react';
import { architectureDiagrams } from '@/data/diagrams';
import type { DiagramKind } from '@/data/case-studies';
export function ArchitectureDiagram({ kind }: { kind: Exclude<DiagramKind, 'tab'> }) {
  if (kind === 'database')
    return (
      <figure className="engineering-diagram database-diagram">
        <figcaption>
          <Database size={16} />
          <span>Grading context, linked by records</span>
          <small>DOMAIN RELATIONSHIPS / ILLUSTRATION</small>
        </figcaption>
        <div className="entity-root">
          <span>Course + user identity</span>
          <ArrowDown size={16} />
          <strong>Exam</strong>
          <small>Course · creator · title</small>
        </div>
        <div className="entity-grid">
          <div>
            <span className="entity-relation">Exam → many questions</span>
            <strong className="diagram-node-title">Exam question</strong>
            <p>
              Question number
              <br />
              Maximum score
              <br />
              Rubric
            </p>
          </div>
          <div>
            <span className="entity-relation">Exam → student submissions</span>
            <strong className="diagram-node-title">Submission</strong>
            <p>Student · PDF path</p>
            <ArrowDown size={15} />
            <strong className="diagram-node-title">Question score</strong>
            <p>
              Submission · question number
              <br />
              Recorded score
            </p>
          </div>
          <div>
            <span className="entity-relation">Exam + student → requests</span>
            <strong className="diagram-node-title">Regrade request</strong>
            <p>
              Question number · reasoning
              <br />
              Original + requested scores
              <br />
              State · feedback · final score
            </p>
          </div>
        </div>
        <p className="diagram-caption">
          Conceptual relationships summarized from the reviewed schema. PDF files live outside the
          relational records; submissions store their paths.
        </p>
      </figure>
    );
  if (kind === 'ai')
    return (
      <figure className="engineering-diagram ai-diagram">
        <figcaption>
          <Sparkles size={16} />
          <span>Assistance before the final decision</span>
          <small>TWO PATHS / HUMAN REVIEW</small>
        </figcaption>
        <div className="ai-lanes">
          <div>
            <span className="diagram-tag">Preview path</span>
            <strong className="diagram-node-title">Reasoning + question context</strong>
            <ArrowDown size={16} />
            <strong className="diagram-node-title">Azure OpenAI completion</strong>
            <ArrowDown size={16} />
            <strong className="diagram-node-title">Summary response → student dialog</strong>
            <p>
              Text assessment inside a typed HTTP response. Preview failure still permits
              submission.
            </p>
          </div>
          <div>
            <span className="diagram-tag">Submission path</span>
            <strong className="diagram-node-title">Reasoning + stored rubric context</strong>
            <ArrowDown size={16} />
            <strong className="diagram-node-title">Recommendation or staff-review fallback</strong>
            <ArrowDown size={16} />
            <strong className="diagram-node-title">Instructor / TA decision</strong>
            <p>
              Acceptance or rejection is a staff operation. Recommendation labels do not
              independently change the grade.
            </p>
          </div>
        </div>
        <p className="diagram-caption">
          Original illustration of the inspected application. Optional AI fields in the schema do
          not guarantee every field is populated.
        </p>
      </figure>
    );
  const d = architectureDiagrams[kind];
  return (
    <figure className={`engineering-diagram diagram-${kind}`}>
      <figcaption>
        <Layers size={16} />
        <span>{d.title}</span>
        <small>ARCHITECTURE / ILLUSTRATION</small>
      </figcaption>
      <ol
        className="architecture-chain"
        style={{ '--node-count': d.nodes.length } as React.CSSProperties}
      >
        {d.nodes.map((n, i) => (
          <li key={n.title}>
            <span className="diagram-tag">{n.tag}</span>
            <strong className="diagram-node-title">{n.title}</strong>
            <p>{n.detail}</p>
            {i < d.nodes.length - 1 && (
              <ArrowRight className="chain-arrow" size={15} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      {d.branches && (
        <div className="architecture-branches">
          {d.branches.map((b) => (
            <p key={b}>
              <span aria-hidden="true">↳</span>
              {b}
            </p>
          ))}
        </div>
      )}
      <p className="diagram-caption">{d.caption}</p>
    </figure>
  );
}
export function StudyFigureLabel() {
  return (
    <span className="study-figure-label">
      <FileText size={12} />
      Original explanatory diagram · not a product screenshot
    </span>
  );
}
