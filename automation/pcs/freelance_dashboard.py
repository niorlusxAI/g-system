#!/usr/bin/env python3
"""Local freelance opportunity dashboard with manual import and simple metrics."""

import argparse
import csv
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

DEFAULT_DATA_PATH = Path(__file__).resolve().parent / "data" / "freelance_dashboard.json"


def ensure_data_file(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text("[]", encoding="utf-8")


def load_entries(path: Path) -> List[Dict[str, Any]]:
    ensure_data_file(path)
    with path.open("r", encoding="utf-8") as handle:
        try:
            return json.load(handle)
        except json.JSONDecodeError:
            return []


def save_entries(path: Path, entries: List[Dict[str, Any]]) -> None:
    ensure_data_file(path)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(entries, handle, indent=2)
        handle.write("\n")


def prompt_text(label: str, default: str = "") -> str:
    value = input(f"{label} [{default}]: ").strip()
    return value or default


def prompt_list(label: str) -> List[str]:
    raw = prompt_text(label, "")
    if not raw:
        return []
    return [item.strip() for item in raw.split(",") if item.strip()]


def add_entry(path: Path) -> None:
    entries = load_entries(path)
    entry = {
        "id": f"entry-{len(entries) + 1}",
        "title": prompt_text("Opportunity title"),
        "platform": prompt_text("Platform"),
        "status": prompt_text("Status (new/applied/interview/closed)", "new"),
        "budget": prompt_text("Budget", "0"),
        "notes": prompt_text("Notes", ""),
        "added_at": datetime.utcnow().isoformat() + "Z",
    }
    entries.append(entry)
    save_entries(path, entries)
    print(f"Added {entry['title']} to {path}")


def import_csv(path: Path, csv_path: Path) -> None:
    entries = load_entries(path)
    imported_count = 0
    with csv_path.open("r", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            imported_count += 1
            entries.append(
                {
                    "id": f"entry-{len(entries) + imported_count}",
                    "title": row.get("title", "Imported opportunity"),
                    "platform": row.get("platform", "manual"),
                    "status": row.get("status", "new"),
                    "budget": row.get("budget", "0"),
                    "notes": row.get("notes", ""),
                    "added_at": datetime.utcnow().isoformat() + "Z",
                }
            )
    save_entries(path, entries)
    print(f"Imported {imported_count} entries from {csv_path}")


def show_dashboard(path: Path) -> None:
    entries = load_entries(path)
    if not entries:
        print("No entries yet. Add one with --add.")
        return

    status_counts: Dict[str, int] = {}
    total_earned = 0.0
    applied_count = 0
    interview_count = 0
    for entry in entries:
        status = entry.get("status", "new")
        status_counts[status] = status_counts.get(status, 0) + 1
        if status == "applied":
            applied_count += 1
        elif status == "interview":
            interview_count += 1
        try:
            total_earned += float(entry.get("budget", 0))
        except (TypeError, ValueError):
            continue

    print("=== Freelance Dashboard ===")
    print(f"Entries tracked: {len(entries)}")
    print("Status counts:")
    for status, count in sorted(status_counts.items()):
        print(f"  - {status}: {count}")
    print(f"Applied: {applied_count}")
    print(f"Interviews: {interview_count}")
    print(f"Estimated total value: ${total_earned:.2f}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Local freelance opportunity dashboard")
    parser.add_argument("--data-file", default=str(DEFAULT_DATA_PATH), help="Path to the JSON log file")
    parser.add_argument("--add", action="store_true", help="Interactively add a new opportunity")
    parser.add_argument("--import-csv", help="Import opportunities from a CSV file")
    parser.add_argument("--dashboard", action="store_true", help="Display the current dashboard")
    args = parser.parse_args()

    data_path = Path(args.data_file).expanduser().resolve()

    if args.add:
        add_entry(data_path)
    if args.import_csv:
        import_csv(data_path, Path(args.import_csv).expanduser().resolve())
    if args.dashboard or not any([args.add, args.import_csv]):
        show_dashboard(data_path)


if __name__ == "__main__":
    main()
