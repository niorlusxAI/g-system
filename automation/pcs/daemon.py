"""
PCS - Perplexity Computer System Daemon
G-System Automation Engine
Built by Ashley Garner | niorlusxAI
"""
import json
import logging
import os
import time
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Dict, List

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("pcs-daemon")


@dataclass
class Task:
    id: str
    kind: str
    payload: Dict[str, Any]
    attempts: int = 0
    max_attempts: int = 3
    next_run_at: float = 0.0
    status: str = "pending"

    def mark_retry(self, backoff_seconds: float) -> None:
        self.attempts += 1
        self.next_run_at = time.time() + backoff_seconds
        self.status = "retrying"


class PCSDaemon:
    def __init__(self):
        self.running = False
        self.tasks: List[Task] = []
        self.config = self.load_config()
        self.tasks = self.seed_tasks()
        logger.info("PCS Daemon initialized")

    def load_config(self) -> Dict[str, Any]:
        return {
            "poll_interval": int(os.getenv("PCS_POLL_INTERVAL", "30")),
            "max_tasks": int(os.getenv("PCS_MAX_TASKS", "10")),
            "api_key": os.getenv("PERPLEXITY_API_KEY", ""),
            "supabase_url": os.getenv("SUPABASE_URL", ""),
            "backoff_seconds": int(os.getenv("PCS_BACKOFF_SECONDS", "10")),
            "max_attempts": int(os.getenv("PCS_MAX_ATTEMPTS", "3")),
        }

    def seed_tasks(self) -> List[Task]:
        config = self.config or self.load_config()
        tasks = [
            Task(
                id="brainstorm-01",
                kind="brainstorm",
                payload={"topic": "hypothesis innovation", "domain": "research"},
                max_attempts=1,
            ),
            Task(
                id="approval-01",
                kind="approval_gate",
                payload={"approved": False, "goal": "launch safe rollout"},
                max_attempts=config["max_attempts"],
            ),
        ]
        return tasks[: config["max_tasks"]]

    def start(self) -> None:
        self.running = True
        logger.info("PCS Daemon started")
        while self.running:
            self.poll_tasks()
            self.execute_tasks()
            time.sleep(self.config["poll_interval"])

    def stop(self) -> None:
        self.running = False
        logger.info("PCS Daemon stopped")

    def poll_tasks(self) -> None:
        logger.info(f"Polling tasks at {datetime.now()}")
        pending = [task for task in self.tasks if task.status in {"pending", "retrying"}]
        if not pending:
            logger.info("No pending tasks in queue")

    def execute_tasks(self) -> None:
        now = time.time()
        for task in self.tasks:
            if task.status not in {"pending", "retrying"}:
                continue
            if task.next_run_at and task.next_run_at > now:
                continue

            logger.info("Executing task %s (%s)", task.id, task.kind)
            if task.kind == "brainstorm":
                result = {
                    "idea": task.payload.get("topic", "operational innovation"),
                    "critique": "Keep the concept imaginative but route it through an approval gate before execution.",
                    "requires_approval": True,
                    "domain": task.payload.get("domain", "general"),
                }
                logger.info("Brainstorm output: %s", json.dumps(result, sort_keys=True))
                task.status = "done"
            elif task.kind == "approval_gate":
                approved = bool(task.payload.get("approved", False))
                if approved:
                    logger.info("Approval gate passed for task %s", task.id)
                    task.status = "done"
                else:
                    current_attempts = task.attempts
                    backoff_seconds = self.config["backoff_seconds"] * (2 ** current_attempts)
                    task.mark_retry(backoff_seconds)
                    if task.attempts >= task.max_attempts:
                        task.status = "failed"
                        logger.warning("Approval gate failed after %s attempts", task.attempts)
                    else:
                        logger.info(
                            "Approval gate pending; retrying in %s seconds",
                            backoff_seconds,
                        )
            elif task.kind == "execute":
                logger.info("Execution task payload: %s", json.dumps(task.payload, sort_keys=True))
                task.status = "done"
            else:
                logger.warning("Unsupported task kind: %s", task.kind)
                task.status = "failed"


if __name__ == "__main__":
    daemon = PCSDaemon()
    try:
        daemon.start()
    except KeyboardInterrupt:
        daemon.stop()
