# Operations Runbook

## 1. Creative layer and execution boundary

The system now keeps a dedicated brainstorm layer that can explore wild ideas without directly triggering actions. The orchestrator exposes a `brainstorm.generate` job and a `approval.require` gate so that any concept must pass review before it becomes operational guidance.

Workflow:

1. Generate a hypothesis or brainstorm idea.
2. Critique the idea for clarity, evidence, and safety.
3. Require approval before execution.
4. Only then invoke the operational skill.

This makes the system imaginative without permitting unreviewed automation.

## 2. Agent inventory

| Role | Responsibility | Exit criteria |
| --- | --- | --- |
| Planner | Break a high-level request into actionable tasks and acceptance criteria. | A numbered plan with owners, dependencies, and success checks. |
| Executor | Run approved tasks against the intended environment. | Task completed, logs captured, and output validated. |
| Verifier | Check results for correctness and completeness. | A verification report with evidence and any follow-up actions. |
| Security reviewer | Confirm secrets, permissions, and network boundaries are handled safely. | No unresolved high-risk issues remain. |
| Compliance reviewer | Check the work against required policies, legal constraints, and customer commitments. | Approval recorded in the audit log. |

## 3. Permissions and secrets handling

- Store secrets in environment variables or a managed secret store.
- Never hard-code credentials in source files or example output.
- Keep least-privilege permissions for each agent.
- Log the secret source and rotation schedule for every production deployment.

## 4. Observability

- Emit structured JSON logs for each job.
- Record timestamps, agent name, task ID, attempt count, and result state.
- Track health checks, retries, failure reasons, and approvals.
- Surface metrics for pending tasks, retries, and successful completions.

## 5. Reliability and rollout strategy

- Use event-driven scheduling rather than fixed aggressive polling.
- Apply backoff and retry policies for transient failures.
- Keep a dead-letter queue for jobs that exceed the retry budget.
- Roll out changes in stages: local test, staging, then production.
- Keep rollback steps ready before any production deployment.

### Staging rollout checklist

1. Run the change in a staging environment with synthetic traffic.
2. Validate approval gates, logs, and health checks.
3. Promote only after verification completes successfully.
4. Keep a rollback script or prior build artifact available until the next stable window.

## 6. Incident response

1. Pause nonessential automation.
2. Identify the failing agent, task ID, and last successful checkpoint.
3. Disable the affected workflow if the issue poses risk.
4. Restore from the last known good state.
5. Document the failure and add prevention steps.

## 7. Approval workflow

Use the simple `generate -> critique -> approve -> execute` flow:

- Generate: produce the idea or plan.
- Critique: review evidence, quality, and safety concerns.
- Approve: record explicit approval in the workflow.
- Execute: run only after approval is present.

## 8. Entry and exit criteria

### Entry criteria

- A clear objective exists.
- Success metrics are defined.
- Required approvals and secrets are available.
- The task is scoped to a single deployment window.

### Exit criteria

- The task completed without unresolved blockers.
- Logs and evidence are attached to the audit trail.
- Any rollback, follow-up, or next-step work is recorded.
