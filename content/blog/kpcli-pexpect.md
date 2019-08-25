+++
categories = ["coding"]
date = "2016-08-25T13:00:00+03:00"
slug = "kpcli-pexpect"
title = "My First Alfred Workflow"
type = "blog"
+++

# Introduction

Some days ago I laid my hands on [Alfred](//www.alfredapp.com). It is a beautiful piece of software, albeit I find its features (especially those related to workflows) rather limited. Maybe it is due to lack of knowledge. Anyway, I decided to play around with workflows and come up with something useful. It didn’t take long to find a goal.

# The Problem

Alfred is known for its [1Password](//1password.com) integration. Unfortunately, that is the only password management solution supported, while I, since my Windows and Linux days, have used [KeePass](//http://keepass.info/) and, having transitioned to {{< sc "OS X" >}}, continue to use it in the form of [MacPass](//github.com/mstarke/MacPass) and have no reason to abandon it for a proprietary solution.

Naturally I decided that it would be great to create a workflow implementing **KeePass integration**.

# The Details

MacPass doesn’t provide any {{< sc "CLI API" >}}, so I turned to external libraries. The situation was further complicated by the fact that I use KeePass v4 format (kdbx) that is supported way less widely. At the moment of writing there is [only one Python library](https://github.com/phpwutz/libkeepass) claiming to support kdbx; it hasn’t been updated in two years and looks rather unpolished, so I continued my search and finally found [kpcli](//sourceforge.net/projects/kpcli/), an active project written in Perl.

The obvious downside of it is being written in Perl, which I’m unfamiliar with. [This article](//www.australsounds.com/2014/10/installingkpcli.html) was somewhat helpful, but didn’t list all of the required packages, so for your convenience I list them all here:

```
sudo cpan Capture::Tiny
sudo cpan Clipboard
sudo cpan Clone
sudo cpan Crypt::Rijndael
sudo cpan File::KeePass
sudo cpan Sort::Naturally
sudo cpan Term::ReadLine::Gnu
sudo cpan Term::ShellUI
sudo cpan XML::Parser
```

I tried to test kpcli manually, but encountered a problem that is more fully described in [a bug](https://sourceforge.net/p/kpcli/bugs/16/) filed against kpcli. The gist of it is that `File::KeePass` does not deal well with {{< sc "XML" >}}-based KeePass keyfiles. The solution was to create a temporary file containing decoded binary data from the {{< sc "XML" >}} keyfile.

Yet another problem was that kpcli is fully interactive and does not expose any {{< sc "API" >}}, so I had to emulate user input. That’s where [pexpect](//pexpect.readthedocs.io/en/stable/) came in handy.

# The Solution

Long story short, I was able to compile a workflow.

![](//i.imgur.com/hL8wqwW.png)

See it in action:

![](//i.imgur.com/PQdTXe4.gif)

_(The screencast is from an earlier version, that’s why it is mp/macpass instead of kp/keepass. Also here the password is pasted — this behaviour was later ditched for autotype to achieve better security. I was too lazy to shoot another take.)_

The workflow accepts a keyword with the desired KeePass entry as argument. The argument is then passed to the python script, which interacts with kpcli and prints out the password. The password is then passed to an applescript which autotypes it into the foremost app.

I’ll present the script here in full in order to expose all my Python greatness (lul). Also you will need to make adjustments in order for it to actually work, so you better read the source. Voilà!

{{< highlight python >}}
#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from __future__ import division
from __future__ import print_function
import os
import argparse
import pexpect
import base64
from bs4 import BeautifulSoup


def get_pass(before):
    """Kpcli `show` function outputs all fields, not only password.
    We need to extract the password from its output.
    The password is printed in red letters over red background
    so as only to be seen when selected -- we must remove coloring
    commands surrounding the password."""
    spl = before.decode('utf8').split('\r\n')
    c = [x.split() for x in spl]
    i = 0
    while i < len(c):
        if c[i] and c[i][0] == 'Pass:':
            break
        else:
            i += 1
    return c[i][1][8:][:-4]  # remove coloring commands surrounding


def get_real_key(keyfile):
    """Kdbx key is an xml file. The key itself is base64-encoded binary
    data stored inside an aptly named <data> tag."""
    soup = BeautifulSoup(open(keyfile, 'rb').read(), 'html.parser')
    return base64.b64decode(soup.find_all('data')[0].get_text())


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('passname')
    args = parser.parse_args()
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    master_password = base64.b64decode(b'cGFzc3dvcmQ=')
    """Password is base64-obfuscated just in case someone accidentally
    looks at the screen and memorizes it. Of course it is highly insecure
    and you should only store it if you really have to. You can have the script
    ask user for password every time even though in that case
    the whole purpose of automating password management kinda defies itself."""

    key = '/path/to/your/key'
    with open('realkey', 'wb') as f:  # disable binary data extraction if
        f.write(get_real_key(key))    # not needed

    child = pexpect.spawn(
        'perl path/to/kpcli-3.1.pl '
        '-kdb path/to/your/kdb(x) '
        '-key realkey',  # omit if not needed
        timeout=3
    )
    child.expect('Please provide the master password: ')
    child.sendline(master_password)
    child.expect('kpcli-3.1:/> ')
    child.sendline('show kp/{}'.format(args.passname))
    child.expect('kpcli-3.1:/> ')
    print(get_pass(child.before), end="")
    child.close()
    os.remove('realkey')

if __name__ == "__main__":
    main()
{{< /highlight >}}

You can get the workflow [here](https://dl.dropboxusercontent.com/u/24653887/keepass.alfredworkflow). It doesn’t have an icon because fuck it. Enjoy!