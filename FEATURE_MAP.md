# FEATURE_MAP

The agent reads this file before driving the UI. One entry per feature.
Without it the agent guesses where things are and diagnoses the wrong component.

Format:

    ## <Feature name>
    Path: <click sequence from the app root, one action per arrow>
    Selector: <stable role/label/data-* marker of the final element>
    Expected: <what you see when it worked>

Rules:
- Paths start from the app root (`[data-app-root]`).
- Selectors are roles, labels or `data-*` attributes. Never coordinates.
- Keep it current. A stale map is worse than none.

---

## Task list
Path: root
Selector: `[data-view="list"]`
Expected: every task with status `open`, each with a "Mark done" button.

## Mark a task done
Path: root → click "Mark done" on the task row
Selector: `button[data-action="done"]`
Expected: the task disappears from the list and appears in the Done view with a strikethrough.

## Done view
Path: root → click tab "Done"
Selector: `[data-view="done"]`
Expected: only tasks with status `done`.

## Settings
Path: root → click tab "Settings"
Selector: `[data-view="settings"]`
Expected: a "Clear all tasks" button.

## Add a task
Path: root → type in the input → press Enter
Selector: `input[data-field="new-task"]`
Expected: the new task appears at the bottom of the Task list, status `open`.
