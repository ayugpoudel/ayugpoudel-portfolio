'use client';
import { useState } from 'react';
import { ArrowRight, ArrowDown, MessageSquare, Workflow } from 'lucide-react';
import { tabStages, studentWorkflow, instructorWorkflow } from '@/data/diagrams';
export function MessagePipeline() {
  const [active, setActive] = useState(0);
  const stage = tabStages[active];
  return (
    <figure className="engineering-diagram message-pipeline">
      <figcaption>
        <MessageSquare size={16} />
        <span>Follow a message through TAB</span>
        <small>INTERACTIVE ARCHITECTURE</small>
      </figcaption>
      <div className="pipeline-selector" aria-label="Explore TAB processing stages">
        {tabStages.map((s, i) => (
          <button key={s.label} aria-pressed={active === i} onClick={() => setActive(i)}>
            <span>0{i + 1}</span>
            {s.label}
            {i < tabStages.length - 1 && <ArrowRight size={13} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div className="pipeline-detail" aria-live="polite" aria-atomic="true">
        <span className="diagram-tag">{stage.boundary}</span>
        <strong className="diagram-node-title">{stage.title}</strong>
        <p>{stage.detail}</p>
        <div className="pipeline-sample">{stage.sample}</div>
      </div>
      <p className="diagram-caption">
        Original illustration based on the implementation. Controls reveal architecture details;
        they never send a message, process a real receipt, or move tokens.
      </p>
    </figure>
  );
}
export function GradingWorkflow() {
  const [role, setRole] = useState<'student' | 'staff'>('student');
  const steps = role === 'student' ? studentWorkflow : instructorWorkflow;
  return (
    <figure className="engineering-diagram grading-explorer">
      <figcaption>
        <Workflow size={16} />
        <span>Two perspectives. One complete workflow.</span>
        <small>PRODUCT FLOW / ILLUSTRATION</small>
      </figcaption>
      <div className="role-selector" aria-label="Choose a GradeSense workflow">
        <button onClick={() => setRole('student')} aria-pressed={role === 'student'}>
          Student experience<span>06 steps</span>
        </button>
        <button onClick={() => setRole('staff')} aria-pressed={role === 'staff'}>
          Instructor & TA<span>05 steps</span>
        </button>
      </div>
      <ol className="workflow-steps" aria-live="polite">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="workflow-index">0{i + 1}</span>
            <div>
              <strong className="diagram-node-title">{s.title}</strong>
              <p>{s.text}</p>
            </div>
            {i < steps.length - 1 && <ArrowDown size={13} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="diagram-caption">
        Representative illustration of documented functionality. It contains no private application
        screenshot, student identifier, or exam content.
      </p>
    </figure>
  );
}
