CROSS='✖'
TICK='✔'
if tput setaf 1 &>/dev/null; then
  tput sgr0
  RED=$(tput setaf 1)
  GREEN=$(tput setaf 2)
  ORANGE=$(tput setaf 3)
  BLUE=$(tput setaf 4)
  MAGENTA=$(tput setaf 5)
  WHITE=$(tput setaf 7)
  BOLD=$(tput bold)
  RESET=$(tput sgr0)
else
  RED="\033[1;31m"
  GREEN="\033[1;32m"
  ORANGE="\033[1;33m"
  BLUE="\033[1;34m"
  MAGENTA="\033[1;35m"
  WHITE="\033[1;37m"
  BOLD=""
  RESET="\033[m"
fi

# List all modified files in the commit
git_precommit_changed_files() {
  git diff --cached --name-only --diff-filter=d
}

# List all modified files from main branch
git_prepush_changed_files_from_main() {
  git diff --cached --name-only --diff-filter=d "$(git merge-base develop HEAD)"
}

# Filter out only *.js files
js_filter() {
  CHANGED_FILES=${CHANGED_FILES//$'\n'/}
  CHANGED_FILES=${CHANGED_FILES//$'\r'/}

  local file
  while read -r file; do
    case "$file" in *.js)
      FILE=${file//$'\n'/}
      FILE=${file//$'\r'/}
      echo -e "$FILE "
      ;;
    esac
  done
}

# Get a list of all changed *.js files only for this commit
get_js_changed_files_for_commit() {
  echo -n "$(git_precommit_changed_files | js_filter)"
}

# Get a list of all changed *.js for this branch from develop
git_js_changed_files_from_main() {
  echo -n "$(git_prepush_changed_files_from_main | js_filter)"
}

# Filter out only *.mdx files
mdx_filter() {
  CHANGED_FILES=${CHANGED_FILES//$'\n'/}
  CHANGED_FILES=${CHANGED_FILES//$'\r'/}

  local file
  while read -r file; do
    case "$file" in *.mdx)
      FILE=${file//$'\n'/}
      FILE=${file//$'\r'/}
      echo -e "$FILE "
      ;;
    esac
  done
}

# Get a list of all changed *.mdx files only for this commit
get_mdx_changed_files_for_commit() {
  echo -n "$(git_precommit_changed_files | mdx_filter)"
}

# Get a list of all changed *.mdx for this branch from develop
git_mdx_changed_files_from_main() {
  echo -n "$(git_prepush_changed_files_from_main | mdx_filter)"
}

# Filter out only *.md files
md_filter() {
  CHANGED_FILES=${CHANGED_FILES//$'\n'/}
  CHANGED_FILES=${CHANGED_FILES//$'\r'/}

  local file
  while read -r file; do
    case "$file" in *.md)
      FILE=${file//$'\n'/}
      FILE=${file//$'\r'/}
      echo -e "$FILE "
      ;;
    esac
  done
}

# Get a list of all changed *.md files only for this commit
get_md_changed_files_for_commit() {
  echo -n "$(git_precommit_changed_files | md_filter)"
}

# Get a list of all changed *.md for this branch from develop
git_md_changed_files_from_main() {
  echo -n "$(git_prepush_changed_files_from_main | md_filter)"
}

# Filter out only *.json files
json_filter() {
  CHANGED_FILES=${CHANGED_FILES//$'\n'/}
  CHANGED_FILES=${CHANGED_FILES//$'\r'/}

  local file
  while read -r file; do
    case "$file" in *.json)
      FILE=${file//$'\n'/}
      FILE=${file//$'\r'/}
      echo -e "$FILE "
      ;;
    esac
  done
}

# Get a list of all changed *.json files only for this commit
get_json_changed_files_for_commit() {
  echo -n "$(git_precommit_changed_files | json_filter)"
}

# Get a list of all changed *.json for this branch from develop
git_json_changed_files_from_main() {
  echo -n "$(git_prepush_changed_files_from_main | json_filter)"
}
