#!/bin/bash
# Rollback to previous version

USER_ID=$1
if [ -z "$USER_ID" ]; then
    echo "Usage: ./rollback_personalization.sh <user_id>"
    exit 1
fi

BRANCH_NAME="user-${USER_ID}-personalized"

echo "🔄 Rolling back personalization for user: $USER_ID"

# Switch to user branch
git checkout "$BRANCH_NAME"

# Show recent commits
echo "Recent commits:"
git log --oneline -5

echo ""
read -p "Enter commit hash to rollback to: " COMMIT_HASH

# Rollback
git reset --hard "$COMMIT_HASH"

echo "✅ Rolled back to commit: $COMMIT_HASH"

# Switch back to main
git checkout main

echo "🎉 Rollback complete!"
