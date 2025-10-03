'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type {
  ManagedModelCapabilities,
  ModelFormat,
} from '@/lib/ai/model-capabilities';
import { cn } from '@/lib/utils';

type ModelCapabilitiesManagerProps = {
  initialModels: ManagedModelCapabilities[];
};

type StatusMessage = {
  type: 'success' | 'error';
  message: string;
};

const ALL_FORMATS: ModelFormat[] = ['text', 'image', 'file', 'audio', 'video'];

export function ModelCapabilitiesManager({
  initialModels,
}: ModelCapabilitiesManagerProps) {
  const [models, setModels] =
    useState<ManagedModelCapabilities[]>(initialModels);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [expandedProvider, setExpandedProvider] = useState<string | null>(
    () => initialModels[0]?.provider ?? null
  );
  const [syncingProvider, setSyncingProvider] = useState<string | null>(null);
  const [cleaning, setCleaning] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    supportsTools: boolean;
    supportedFormats: ModelFormat[];
  }>({ name: '', supportsTools: false, supportedFormats: [] });
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const statusTimeoutRef = useRef<number | null>(null);

  const modelsByProvider = useMemo(() => {
    return models.reduce(
      (acc, model) => {
        if (!acc[model.provider]) {
          acc[model.provider] = [];
        }
        acc[model.provider].push(model);
        return acc;
      },
      {} as Record<string, ManagedModelCapabilities[]>
    );
  }, [models]);

  // Count persisted models that are not referenced by any tier
  const unusedPersistedCount = useMemo(() => {
    return models.filter((m) => m.isPersisted && !m.inUse).length;
  }, [models]);
  const hasUnused = unusedPersistedCount > 0;

  const activeModel = activeModelId
    ? (models.find((model) => model.id === activeModelId) ?? null)
    : null;

  const setStatusMessage = useCallback((message: StatusMessage | null) => {
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = null;
    }
    setStatus(message);
    if (message) {
      statusTimeoutRef.current = window.setTimeout(() => {
        setStatus(null);
        statusTimeoutRef.current = null;
      }, 5000);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  const refreshModels = useCallback(async () => {
    const response = await fetch('/api/admin/model-capabilities');
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    const data = (await response.json()) as {
      models: ManagedModelCapabilities[];
    };
    setModels(data.models);
    return data.models;
  }, []);

  useEffect(() => {
    const handleTierUpdate = () => {
      refreshModels()
        .then(() => {
          setStatusMessage({
            type: 'success',
            message: 'Model capabilities refreshed after tier changes.',
          });
        })
        .catch((error) => {
          console.error('Failed to refresh models after tier update:', error);
          setStatusMessage({
            type: 'error',
            message: 'Could not refresh models after tier changes.',
          });
        });
    };

    window.addEventListener('settings:tiers-updated', handleTierUpdate);
    return () => {
      window.removeEventListener('settings:tiers-updated', handleTierUpdate);
    };
  }, [refreshModels, setStatusMessage]);

  const openEditDialog = (model: ManagedModelCapabilities) => {
    setActiveModelId(model.id);
    setEditForm({
      name: model.name,
      supportsTools: model.supportsTools,
      supportedFormats: [...model.supportedFormats],
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setActiveModelId(null);
    setEditForm({ name: '', supportsTools: false, supportedFormats: [] });
    setSaving(false);
    setResetting(false);
  };

  const toggleFormat = (format: ModelFormat) => {
    setEditForm((prev) => {
      const includes = prev.supportedFormats.includes(format);
      return {
        ...prev,
        supportedFormats: includes
          ? prev.supportedFormats.filter((f) => f !== format)
          : [...prev.supportedFormats, format],
      };
    });
  };

  const handleSyncOpenRouter = async () => {
    setSyncingProvider('openrouter');
    setStatusMessage(null);

    try {
      const response = await fetch('/api/admin/model-capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync-openrouter' }),
      });

      const data = await response.json();

      if (response.ok) {
        await refreshModels();
        setStatusMessage({
          type: 'success',
          message: `Synced ${data.synced ?? 0} OpenRouter models${data.errors?.length ? ` (${data.errors.length} warnings)` : ''}`,
        });
      } else {
        setStatusMessage({
          type: 'error',
          message: data.error || 'Failed to sync OpenRouter models',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Network error while syncing',
      });
    } finally {
      setSyncingProvider(null);
    }
  };

  const handleRemoveUnused = async () => {
    setCleaning(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/admin/model-capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove-unused' }),
      });

      const data = await response.json();

      if (response.ok) {
        await refreshModels();
        setStatusMessage({
          type: 'success',
          message:
            data.removed > 0
              ? `Removed ${data.removed} unused model${data.removed === 1 ? '' : 's'}`
              : 'No unused models to remove',
        });
      } else {
        setStatusMessage({
          type: 'error',
          message: data.error || 'Failed to remove unused models',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Network error while removing models',
      });
    } finally {
      setCleaning(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!activeModel) return;

    setSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/admin/model-capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          capabilities: {
            id: activeModel.id,
            name: editForm.name.trim() || activeModel.name,
            provider: activeModel.provider,
            supportsTools: editForm.supportsTools,
            supportedFormats: editForm.supportedFormats,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await refreshModels();
        setStatusMessage({
          type: 'success',
          message: `Updated capabilities for ${data.model?.name ?? activeModel.name}`,
        });
        closeDialog();
      } else {
        setStatusMessage({
          type: 'error',
          message: data.error || 'Failed to update model capabilities',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Network error while saving model',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetOpenRouter = async () => {
    if (!activeModel || activeModel.provider !== 'openrouter') return;

    setResetting(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/admin/model-capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset-openrouter',
          modelId: activeModel.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedModels = await refreshModels();
        const refreshed = updatedModels.find((m) => m.id === activeModel.id);
        if (refreshed) {
          setEditForm({
            name: refreshed.name,
            supportsTools: refreshed.supportsTools,
            supportedFormats: [...refreshed.supportedFormats],
          });
        }
        const hadWarnings =
          Array.isArray(data.errors) && data.errors.length > 0;
        setStatusMessage({
          type: hadWarnings ? 'error' : 'success',
          message: hadWarnings
            ? `Reset ${activeModel.name} with warnings: ${data.errors.join(', ')}`
            : `Reset ${activeModel.name} from OpenRouter defaults`,
        });
      } else {
        setStatusMessage({
          type: 'error',
          message: data.error || 'Failed to reset from OpenRouter',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Network error while resetting model',
      });
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold">Model Capabilities</h3>
          <p className="text-xs text-muted-foreground">
            Models from all tiers are listed. Edit capabilities, sync provider
            data, or remove unused entries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleRemoveUnused}
            disabled={cleaning || !hasUnused}
            size="sm"
            variant="outline"
            className="gap-2"
            title={
              hasUnused
                ? `Remove ${unusedPersistedCount} unused model${unusedPersistedCount === 1 ? '' : 's'}`
                : 'No unused persisted models to remove'
            }
          >
            {cleaning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Remove unused models
          </Button>
        </div>
      </div>

      {/* Status banner */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm',
              status.type === 'success'
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                : 'border-destructive/20 bg-destructive/10 text-destructive'
            )}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Models by Provider */}
      <div className="space-y-3">
        {Object.entries(modelsByProvider).map(([provider, providerModels]) => {
          const isOpenRouter = provider === 'openrouter';
          const persistedCount = providerModels.filter(
            (m) => m.isPersisted
          ).length;

          return (
            <div
              key={provider}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/60 bg-muted/20">
                <button
                  onClick={() =>
                    setExpandedProvider((prev) =>
                      prev === provider ? null : provider
                    )
                  }
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <p className="font-medium capitalize">{provider}</p>
                    <p className="text-xs text-muted-foreground">
                      {providerModels.length} models
                      {persistedCount !== providerModels.length
                        ? ` • ${providerModels.length - persistedCount} fallback`
                        : ''}
                    </p>
                  </div>
                </button>
                <div className="flex items-center gap-2">
                  {isOpenRouter && (
                    <Button
                      onClick={handleSyncOpenRouter}
                      disabled={syncingProvider === provider}
                      variant="secondary"
                      size="sm"
                      className="gap-2"
                    >
                      {syncingProvider === provider ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      Sync OpenRouter
                    </Button>
                  )}
                  {expandedProvider === provider ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {expandedProvider === provider && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border/60"
                  >
                    <div className="max-h-96 space-y-3 overflow-y-auto p-4">
                      {providerModels.map((model) => (
                        <div
                          key={model.id}
                          className={cn(
                            'space-y-3 rounded-xl border border-border/40 bg-muted/20 p-3',
                            !model.inUse && 'border-dashed border-amber-500/40',
                            !model.isPersisted && 'bg-amber-500/10'
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-1">
                              <p className="truncate text-sm font-medium">
                                {model.name}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {model.id}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-2">
                              <Badge
                                variant={model.inUse ? 'default' : 'outline'}
                                className="text-xs"
                              >
                                {model.inUse ? 'In tier' : 'Unused'}
                              </Badge>
                              {!model.isPersisted && (
                                <Badge variant="secondary" className="text-xs">
                                  Not saved
                                </Badge>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditDialog(model)}
                                className="gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant={
                                model.supportsTools ? 'default' : 'outline'
                              }
                              className="text-xs"
                            >
                              {model.supportsTools
                                ? '🔧 Tools enabled'
                                : 'Tools disabled'}
                            </Badge>
                            {model.supportedFormats.map((format) => (
                              <Badge
                                key={format}
                                variant="secondary"
                                className="text-xs capitalize"
                              >
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit capabilities</DialogTitle>
            {activeModel && (
              <DialogDescription>
                Update capability metadata for{' '}
                <span className="font-medium">{activeModel.name}</span>.
              </DialogDescription>
            )}
          </DialogHeader>

          {activeModel && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Model name
                </Label>
                <Input
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id={`tools-${activeModel.id}`}
                  checked={editForm.supportsTools}
                  onCheckedChange={(checked) =>
                    setEditForm((prev) => ({
                      ...prev,
                      supportsTools: checked === true,
                    }))
                  }
                />
                <Label htmlFor={`tools-${activeModel.id}`} className="text-sm">
                  Supports tools
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Supported formats
                </Label>
                <div className="flex flex-wrap gap-2">
                  {ALL_FORMATS.map((format) => (
                    <Badge
                      key={format}
                      variant={
                        editForm.supportedFormats.includes(format)
                          ? 'default'
                          : 'outline'
                      }
                      className="cursor-pointer capitalize"
                      onClick={() => toggleFormat(format)}
                    >
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>

              {activeModel.provider === 'openrouter' && (
                <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
                  <p className="mb-2 flex items-center gap-2 font-medium text-foreground">
                    <Wand2 className="h-4 w-4" />
                    Reset from OpenRouter
                  </p>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Refresh this model from the latest OpenRouter catalog. This
                    will overwrite the current name, tool support, and formats.
                  </p>
                  <Button
                    onClick={handleResetOpenRouter}
                    disabled={resetting}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    {resetting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Reset from OpenRouter
                  </Button>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeDialog}
              disabled={saving || resetting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={saving}
              className="gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
