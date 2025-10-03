'use client';

import { useEffect, useRef } from 'react';
import { initialArtifactData, useArtifact } from '@/hooks/use-artifact';
import { artifactDefinitions } from './artifact';
import { useDataStream } from './data-stream-provider';

export function DataStreamHandler() {
  const { dataStream } = useDataStream();

  const { artifact, setArtifact, setMetadata } = useArtifact();
  const lastProcessedIndex = useRef(-1);

  useEffect(() => {
    if (!dataStream?.length) {
      if (lastProcessedIndex.current !== -1) {
        lastProcessedIndex.current = -1;
        setArtifact({
          ...initialArtifactData,
          boundingBox: { ...initialArtifactData.boundingBox },
          status: 'idle',
        });
        setMetadata(null, false);
      }
      return;
    }

    if (lastProcessedIndex.current >= dataStream.length) {
      lastProcessedIndex.current = -1;
    }

    const startIndex = Math.max(lastProcessedIndex.current + 1, 0);
    const newDeltas = dataStream.slice(startIndex);
    lastProcessedIndex.current = dataStream.length - 1;

    for (const delta of newDeltas) {
      const artifactDefinition = artifactDefinitions.find(
        (currentArtifactDefinition) =>
          currentArtifactDefinition.kind === artifact.kind
      );

      if (artifactDefinition?.onStreamPart) {
        artifactDefinition.onStreamPart({
          streamPart: delta,
          setArtifact,
          setMetadata,
        });
      }

      setArtifact((draftArtifact) => {
        if (!draftArtifact) {
          return {
            ...initialArtifactData,
            boundingBox: { ...initialArtifactData.boundingBox },
            status: 'streaming',
          };
        }

        switch (delta.type) {
          case 'data-id':
            return {
              ...draftArtifact,
              documentId: delta.data,
              status: 'streaming',
            };

          case 'data-title':
            return {
              ...draftArtifact,
              title: delta.data,
              status: 'streaming',
            };

          case 'data-kind':
            return {
              ...draftArtifact,
              kind: delta.data,
              status: 'streaming',
            };

          case 'data-clear':
            return {
              ...draftArtifact,
              content: '',
              status: 'streaming',
            };

          case 'data-finish':
            return {
              ...draftArtifact,
              status: 'idle',
            };

          default:
            return draftArtifact;
        }
      });
    }
  }, [dataStream, setArtifact, setMetadata, artifact]);

  return null;
}
