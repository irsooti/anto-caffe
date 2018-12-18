workflow "Dev branch" {
  on = "push"
  resolves = ["new-action"]
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@15fbbf2"
}
