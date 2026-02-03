#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <project_name>"
  exit 1
fi

NAME=$1
SRC_DIR="../src"
TEST_DIR="."

if [ ! -f "$SRC_DIR/$NAME.js" ]; then
  echo "Warning: $SRC_DIR/$NAME.js does not exist yet."
fi

cat > "$TEST_DIR/$NAME.html" <<EOF
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>${NAME} Tests</title>
    </head>
    <body>
        <script type="module" src="${NAME}Test.js"></script>
        <div id="test-results"></div>
    </body>
</html>
EOF

echo "Created $TEST_DIR/$NAME.html"

if [ ! -f "$TEST_DIR/${NAME}Test.js" ]; then
  cat > "$TEST_DIR/${NAME}Test.js" <<EOF
import * as $NAME from '$SRC_DIR/$NAME.js';
import { assertEq, printReport } from './test.js';
const ok = [];

// Example test
ok.push(assertEq(1)(1));

printReport(ok);
EOF
  echo "Created $TEST_DIR/${NAME}Test.js"
else
  echo "$TEST_DIR/${NAME}Test.js already exists, skipping."
fi

TEST_ALL="$TEST_DIR/testAll.html"
if [ -f "$TEST_ALL" ]; then
  ENTRY="        { name: '$NAME', file: '$NAME.html' },"
  if grep -Fq "$ENTRY" "$TEST_ALL"; then
    echo "$TEST_ALL already lists $NAME."
  else
    TMP_FILE=$(mktemp)
    awk -v entry="$ENTRY" '
      BEGIN { inserted = 0 }
      { print $0 }
      !inserted && /const suites = \[/ {
        print entry
        inserted = 1
      }
    ' "$TEST_ALL" > "$TMP_FILE" && mv "$TMP_FILE" "$TEST_ALL"
    echo "Added $NAME to $TEST_ALL"
  fi
else
  echo "$TEST_ALL not found; skipping auto-insert."
fi
