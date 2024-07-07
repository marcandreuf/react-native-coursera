#!/bin/bash

# Find and delete all "node_modules" folders
find . -maxdepth 3 -type d -name "node_modules" -exec rm -rf {} +
find . -maxdepth 3 -type d -name ".git" -exec rm -rf {} +
find . -maxdepth 3 -type d -name ".expo" -exec rm -rf {} +

echo "All the projects have been cleaned up."

