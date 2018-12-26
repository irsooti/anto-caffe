workflow "Dev branch" {
  on = "push"
  resolves = ["GitHub Action for Zeit-1"]
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@15fbbf2"
}

action "GitHub Action for Zeit-1" {
  uses = "actions/zeit-now@15fbbf2"
  secrets = ["GITHUB_TOKEN"]
}
