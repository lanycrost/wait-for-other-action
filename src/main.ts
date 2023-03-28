import * as core from '@actions/core'
import * as github from '@actions/github'
import { Octokit } from '@octokit/rest'

async function run(): Promise<void> {
  try {
    const workflow: string = core.getInput('workflow')

    let workflowIsRunning = await checkIfWorkflowIsRunning(workflow)

    while (workflowIsRunning) {
      await new Promise(resolve => setTimeout(resolve, 3000))
      workflowIsRunning = await checkIfWorkflowIsRunning(workflow)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

async function checkIfWorkflowIsRunning(workflow: string): Promise<boolean> {
  const token: string = core.getInput('token')

  const { context } = github

  const octokit = new Octokit({
    auth: token
  })

  const {
    data: { total_count }
  } = await octokit.actions.listWorkflowRuns({
    owner: context.repo.owner,
    repo: context.repo.repo,
    workflow_id: workflow,
    per_page: 1,
    status: 'in_progress'
  })

  return total_count !== 0
}
