set -e
rm -r public
hugo
mv .tmpgit .tmpgit-prev
cp -r ~/peczony.github.io/.git .tmpgit
rm -rf ~/peczony.github.io/
mkdir ~/peczony.github.io
cp -r public/* ~/peczony.github.io/
cp -r .tmpgit ~/peczony.github.io/.git
rm -rf .tmpgit-prev