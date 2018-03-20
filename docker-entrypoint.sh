#!/bin/sh
# wait script

set -e

if [ -n "$(ls -A /data/dist 2>/dev/null)" ]
then
  echo "contains files (or is a file)"
  # lambda stuff
  # aws s3 sync /data/dist s3://vigo-ov-deploy/vigo --delete
  # aws s3 sync /data/dist s3://vigo-ov-deploy --delete
  exit 0
else
  echo "empty (or does not exist)"
  exit 1
fi
