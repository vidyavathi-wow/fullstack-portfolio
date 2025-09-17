Git Merge

Merge is when you take changes from one branch and combine them into another branch.

It keeps all the history intact, so you can see exactly when branches diverged and came together.

When you merge, Git usually creates a merge commit to record that two histories have been joined.

It’s safe to use on branches that other people are also working on because it doesn’t change past commits.

The downside is that the commit history can get messy if there are lots of branches or merges.

Git Rebase

Rebase is when you take the commits from your branch and “replay” them on top of another branch.

This makes the commit history linear, as if you developed all your work after the latest changes on the other branch.

Rebase does not create a merge commit; it rewrites the history of your branch.

It’s great for cleaning up your branch and making history easier to read.

The downside is that it rewrites commits, so you should not rebase branches that other people are using, because it can cause conflicts for them.