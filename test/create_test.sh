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
        <script src="test.js"></script>
        <script src="$SRC_DIR/$NAME.js"></script>
        <script src="${NAME}Test.js"></script>
    </body>
</html>
EOF

echo "Created $TEST_DIR/$NAME.html"

if [ ! -f "$TEST_DIR/${NAME}Test.js" ]; then
  cat > "$TEST_DIR/${NAME}Test.js" <<EOF
//requires $SRC_DIR/$NAME.js
//requires test.js
const ok = [];

// Example test
ok.push(eq(1)(1));

printReport(ok);
EOF
  echo "Created $TEST_DIR/${NAME}Test.js"
else
  echo "$TEST_DIR/${NAME}Test.js already exists, skipping."
fi
