"""Housekeeping tasks (Celery beat): orphan assets, expired presigned URLs.

Phase 2: sweep objects in R2 that have no matching `assets` row; clear tmp/
lifecycle leftovers; reconcile usage_meter totals.
"""
