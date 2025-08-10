#!/bin/bash
# Commit user-specific personalization changes

USER_ID=$1
if [ -z "$USER_ID" ]; then
    echo "Usage: ./commit_user_personalization.sh <user_id>"
    exit 1
fi

BRANCH_NAME="user-${USER_ID}-personalized"

echo "🔄 Committing personalization for user: $USER_ID"

# Create/switch to user branch
git checkout -b "$BRANCH_NAME" 2>/dev/null || git checkout "$BRANCH_NAME"

# Add changes
git add services/personalization_service.py
git add src/ 2>/dev/null || true

# Commit with timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "Personalization for $USER_ID - $TIMESTAMP"

echo "✅ Committed to branch: $BRANCH_NAME"

# Switch back to main
git checkout main

echo "🎉 User personalization versioned!"
