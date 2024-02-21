#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import argparse

REL_STUB = """<!DOCTYPE html><html><head><title>{url}</title><link rel="canonical" href="https://daletskaya.taplink.ws/"/><meta name="robots" content="noindex"><meta charset="utf-8" /><meta http-equiv="refresh" content="0; url={url}" /></head></html>"""

FILE_LIST = [
    "index.html",
    "results/2001/index.html",
    "results/2002/index.html",
    "results/2003/index.html",
    "results/2004/index.html",
    "results/2005/index.html",
    "results/2006/index.html",
    "results/2007/index.html",
    "results/2008/index.html",
    "results/2009/index.html",
    "results/2010/index.html",
    "results/2011/index.html",
    "results/2012/index.html",
    "results/2013/index.html",
    "results/2014/index.html",
    "results/2015/index.html",
    "results/2016/index.html",
    "results/2017/index.html",
    "results/2018/index.html",
    "results/2019/index.html",
    "results/2020/index.html",
    "results/2021/index.html",
    "results/2022/index.html",
    "results/2023/index.html",
    "results/halloffame/index.html",
    "results/index.html",
]


def main():
    for fn in FILE_LIST:
        target_link = "https://orgkomitet.org/studchr/" + fn.replace("index.html", "")
        with open(fn, "w") as f:
            f.write(REL_STUB.format(url=target_link))
        print(f"{fn} -> {target_link}")


if __name__ == "__main__":
    main()
