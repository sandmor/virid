// hooks/utils/index.ts

// Branch planning
export {
  planBranchSwitch,
  computeBranchFromSelection,
  type BranchSwitchPlan,
  type BranchSelectionOperation,
} from './branch-planning';

// Selection snapshots
export {
  buildSelectionSnapshot,
  cloneSelectionSnapshot,
  areSelectionSnapshotsEqual,
  ensureSelectionMap,
} from './selection-snapshot';
