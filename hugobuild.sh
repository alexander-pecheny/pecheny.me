set -e
rm -r public
hugo
cp -r ~/peczony.github.io/.git .tmpgit
rm -rf ~/peczony.github.io/
mkdir ~/peczony.github.io
cp -r public/* ~/peczony.github.io/
cp -r .tmpgit ~/peczony.github.io/.git
