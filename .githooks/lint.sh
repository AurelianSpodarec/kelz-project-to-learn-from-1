#!/bin/bash

# Include helper functions
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$DIR/helpers.sh"

function lint() {
  if [ "$1" == "push" ]; then
    jsFileList=$(git_js_changed_files_from_main)
    jsMessage="Please fix the above linting issues before pushing."
    mdxFileList=$(git_mdx_changed_files_from_main)
    mdxMessage="Please fix the above formatting issues before pushing."
    mdFileList=$(git_md_changed_files_from_main)
    mdMessage="Please fix the above formatting issues before pushing."
    jsonFileList=$(git_json_changed_files_from_main)
    jsonMessage="Please fix the above formatting issues before pushing."
  else
    jsFileList=$(get_js_changed_files_for_commit)
    jsMessage="Please fix the above linting issues before committing."
    mdxFileList=$(get_mdx_changed_files_for_commit)
    mdxMessage="Please fix the above formatting issues before committing."
    mdFileList=$(get_md_changed_files_for_commit)
    mdMessage="Please fix the above formatting issues before committing."
    jsonFileList=$(get_json_changed_files_for_commit)
    jsonMessage="Please fix the above formatting issues before committing."
  fi

  # JS
  if [ ${#jsFileList} -lt 1 ]; then
    echo -e "\nYou have no staged '.js' files to lint.\n"
  fi

  if [ ${#jsFileList} -gt 1 ]; then
    npx eslint --no-ignore ${jsFileList[*]}

    if [ $? -ne 0 ]; then
      echo -e "$RED$BOLD$CROSS JS Linting failed!\n  $jsMessage$RESET"
      exit 1
    fi
  fi

  # MDX
  if [ ${#mdxFileList} -lt 1 ]; then
    echo -e "\nYou have no staged '.mdx' files to format.\n"
  fi

  if [ ${#mdxFileList} -gt 1 ]; then
    npx prettier --check ${mdxFileList[*]}

    if [ $? -ne 0 ]; then
      echo -e "$RED$BOLD$CROSS MDX formatting failed!\n  $mdxMessage$RESET"
      exit 1
    fi
  fi

  # MD
  if [ ${#mdFileList} -lt 1 ]; then
    echo -e "\nYou have no staged '.md' files to format.\n"
  fi

  if [ ${#mdFileList} -gt 1 ]; then
    npx prettier --check ${mdFileList[*]}

    if [ $? -ne 0 ]; then
      echo -e "$RED$BOLD$CROSS MD formatting failed!\n  $mdMessage$RESET"
      exit 1
    fi
  fi

  # JSON
  if [ ${#jsonFileList} -lt 1 ]; then
    echo -e "\nYou have no staged '.json' files to format.\n"
  fi

  if [ ${#jsonFileList} -gt 1 ]; then
    npx prettier --check ${jsonFileList[*]}

    if [ $? -ne 0 ]; then
      echo -e "$RED$BOLD$CROSS JSON formatting failed!\n  $jsonMessage$RESET"
      exit 1
    fi
  fi

  echo -e "\n$GREEN$BOLD$TICK JS Linting && MDX formatting passed!$RESET\n"
}
