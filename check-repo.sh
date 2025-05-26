#!/bin/bash

# GitHub username and repository name
REPO="noorwalia/product-app"

# Check if the repository exists
if curl -fsS "https://api.github.com/repos/$REPO" >/dev/null; then
  echo "The GitHub repository $REPO exists."
  
  # Check if it's public
  VISIBILITY=$(curl -s "https://api.github.com/repos/$REPO" | grep '"private":' | head -1 | cut -d' ' -f4 | tr -d ',')
  if [ "$VISIBILITY" = "false" ]; then
    echo "The repository is public."
  else
    echo "The repository is private."
  fi
else
  echo "The GitHub repository $REPO does not exist."
  exit 1
fi