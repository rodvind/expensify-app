# Git Commands

git init - Create a new git repo (repository), it must be in the root folder of our project

git status - View the changes to your projects, untracked files, unstagged or stagged changes, 

git add - Add files to the staging area

git commit - Create a new commit with files from the staging area

git log - view recent commits

ls -a ~/.ssh
ssh-keygen -t rsa -b 4096 -C "rod.danaei@gmail.com"

to check if SSH Agent is running: eval "$(ssh-agent -s)"
To add the new key: ssh add and the path to the private key
simple SSH connectio to the Github to see if the SSH connects correctly: ssh -T git@github.com

let git know that we want our code to live on the github, after copying respective SSH link for our repo: git remote add origin git@github.com:rodvind/expensify-app.git

Now that we have association set up, we have to push the code up into our github repo: git push -u origin master
-u flag: creates the association between our local code and the upstream github repository. We have to use the -u flag one time 
origin: is the name of the remote we created
master: this is the default branch we're gonna work with
