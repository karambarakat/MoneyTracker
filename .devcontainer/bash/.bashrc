# custom bash settings

parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
PS1='\w$(parse_git_branch) \$ '

alias ws="pnpm --filter"
