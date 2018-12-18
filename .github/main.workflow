workflow "Dev branch" {
  on = "push"
  resolves = ["new-action"]
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@15fbbf2"
}

action "new-action" {
  uses = "owner/repo/path@ref"
  needs = ["GitHub Action for Zeit"]
}
