+++
categories = ["coding"]
date = "2016-03-22"
slug = "osxfuse-sshfs"
title = "Solution for ‘disappearing folder’ problem in OSXFUSE+SSHFS"
draft = false
+++

So as you may know, [OSXFUSE](https://osxfuse.github.io/)+[SSHFS](https://github.com/osxfuse/osxfuse/wiki/SSHFS) is a wonderful option for accessing remote servers via sftp in a convenient fashion. I’ve been using it with great pleasure to remotely edit Python scripts in Sublime Text, until the Disappearing Folder Problem came haunting over me.

I’ve found traces of it mentioned [here](http://superuser.com/questions/772405/why-does-directory-vanish-when-i-do-sshfs-how-to-setup-sshfs-share-on-max-osx-1) and [there](https://github.com/osxfuse/osxfuse/issues/174), but there were either no solutions or incorrect ones. So I decided to post the one which worked for me.

Essence of the problem: you mount a remote server onto a folder, you can access it perfectly from terminal or e.g. [Double Commander](http://doublecmd.sourceforge.net/)[^1], but the mountpoint folder disappears from Finder or any apps reliant on native file handling capabilities, including the aforementioned Sublime Text.

{{% cntr %}}![](https://cloud.githubusercontent.com/assets/2985831/5575697/aa6efe5e-8faa-11e4-9214-f7259d30b531.png){{% /cntr %}}

@synec proposes `-o local`, but for me it was `-o volname=folder` which did the trick: `sshfs x.y.z.net: folder` didn’t work, while `sshfs -o volname=folder x.y.z.net: folder` did. Finder now sees the folder, and the icon is changed: instead of the regular folder it now shows the same icon as of an external hard disk.

[^1]: By the way, this is the best orthodox file manager for OS X I’ve found so far (though I didn’t test paid ones who don’t provide a free trial). Even if its interface is neither beautiful nor native, it does the job. The feature set of Commander One is too small, and muCommander didn’t even run.