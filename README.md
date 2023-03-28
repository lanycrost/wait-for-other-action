# Wait for other action

This action provides a simple way to wait for a specific workflow to complete. 

## Usage

~~~yml
name: Wait 
uses: NathanFirmo/wait-for-other-action@v1
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  workflow: 'workflow-filename.yml'
~~~


### Required Inputs
The following inputs are required to use this action:

| Input | Description |
| --- | --- |
| `token` | Your GitHub token. See more in [GitHub Docs](https://docs.github.com/en/actions/security-guides/automatic-token-authentication). |
| `workflow` | File name of the workflow you wanna wait for. |
