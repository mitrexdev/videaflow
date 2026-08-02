"""Generation job orchestration tasks — Phase 2.

The `generations` row is the source of truth for job state/progress. These
tasks own the state machine (queued → running → awaiting_input → completed/
failed) and fan out to per-stage tasks.
"""
