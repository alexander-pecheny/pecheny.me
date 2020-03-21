#!/usr/bin/env python
# -*- coding: utf-8 -*-
import argparse
import subprocess
import pyperclip


"""
What I’m dreaming of you’ll never know
When I’m in dream I’m always there alone
You can’t come with me dreamliner

Wild Beasts, “Dreamliner”
"""


front_matter_stub = """\
+++
date = "{date}T{hour}:00:00+03:00"
title = ""
slug = "{slug}"
+++

"""


def get_front_matter(filename):
    sp = filename.split("-")
    date = "-".join(sp[:3])
    slug = "-".join(sp[3:])
    hour_offset = {
        "": 0,
        "a": 1,
        "b": 2,
        "c": 3,
        "d": 4
    }[date[10:]]
    date = date[:10]
    front_matter = front_matter_stub.format(
        slug=slug,
        date=date,
        hour=10 + hour_offset
    )
    return front_matter


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("filename")
    args = parser.parse_args()

    text = pyperclip.paste()
    front_matter = get_front_matter(args.filename)

    filepath = "content/dreams/{}.md".format(args.filename)
    with open(filepath, "w") as f:
        f.write(front_matter + (text or ""))

    subprocess.call(["git", "add", filepath])
    subprocess.call(["subl", filepath])


if __name__ == "__main__":
    main()
