export interface ActiveRoutine {
    templateId: number;
    templateName: string;
    startedAt: number;
}

const ACTIVE_ROUTINE_KEY = "gymTracker.activeRoutine";
const ACTIVE_ROUTINE_EVENT = "gymtracker:active-routine-change";

export function getActiveRoutine(): ActiveRoutine | null {
    const value = localStorage.getItem(ACTIVE_ROUTINE_KEY);
    if (!value) return null;

    try {
        const routine: unknown = JSON.parse(value);
        if (
            typeof routine === "object" && routine !== null &&
            "templateId" in routine && typeof routine.templateId === "number" &&
            "templateName" in routine && typeof routine.templateName === "string" &&
            "startedAt" in routine && typeof routine.startedAt === "number" &&
            Number.isFinite(routine.startedAt) &&
            Number.isInteger(routine.templateId) && routine.templateId > 0
        ) {
            return routine as ActiveRoutine;
        }
    } catch {
        localStorage.removeItem(ACTIVE_ROUTINE_KEY);
        return null;
    }

    localStorage.removeItem(ACTIVE_ROUTINE_KEY);
    return null;
}

export function setActiveRoutine(routine: ActiveRoutine): void {
    localStorage.setItem(ACTIVE_ROUTINE_KEY, JSON.stringify(routine));
    window.dispatchEvent(new Event(ACTIVE_ROUTINE_EVENT));
}

export function clearActiveRoutine(): void {
    localStorage.removeItem(ACTIVE_ROUTINE_KEY);
    window.dispatchEvent(new Event(ACTIVE_ROUTINE_EVENT));
}

export function getActiveRoutineEventName(): string {
    return ACTIVE_ROUTINE_EVENT;
}

export function formatElapsedTime(startedAt: number, now = Date.now()): string {
    const elapsedSeconds = Math.max(0, Math.floor((now - startedAt) / 1000));
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}