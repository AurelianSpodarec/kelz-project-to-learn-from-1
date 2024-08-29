#!/bin/bash

# Include helper functions
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. "$DIR/helpers.sh"

function jest {
  npx react-scripts "test" --env=jsdom --watchAll=false --coverage

  if [ $? -ne 0 ]; then
    echo -e "\n$RED$BOLD$CROSS Test suites failed!\n  Please fix the above testing issues before pushing.$RESET\n"
    exit 1
  fi

  echo -e "\n$GREEN$BOLD$TICK Test suites passed!$RESET\n"
}
