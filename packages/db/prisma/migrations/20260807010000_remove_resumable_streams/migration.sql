-- The Stream table only stored resumable-stream replay identifiers.
-- Stream resumption has been removed, so these identifiers are no longer useful.
DROP TABLE "Stream";
