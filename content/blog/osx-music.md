+++
categories = ["music"]
date = "2016-05-20T20:02:00+03:00"
slug = "osx-music"
title = "The (Mis)adventures of a Music Geek on OS X"
type = "blog"
toc = "1"
+++

While OS X surely has its great qualities, a music geek hopping off Windows will find themself in a wasteland without Foobar and Mp3tag. I’ve tried practically all music players out there and decided to summarize my findings in case it would be useful for somebody.

Let me note from the start that we’re talking real _geekery_: hundreds of gigabytes of music on an external HDD, thoroughly tagged and organized by folder. For a casual user sticking with iTunes and/or cloud services would probably be the sanest choice.

So, here ya go——

# Requirements

My requirements/wishes for a music playing system are, in descending order, the following:

- plays any format
- scrobbles
- has gapless playback (including mp3)
- has folder-based music library
- has music library
- edits tags
- converts files
- foobar-like playing queue
- playing queue
- multiple playlists
- waveform seekbar
- spectrum analyzer
- now playing notifications

So, yes, I consider foobar2000 an ideal player—in fact, _the_ player. If you think otherwise this post is probably not for you.

# Players

Tl;dr: I settled on mpd+ncmpcpp+puddletag+xACT+ffmpeg+sox. But for the curious:

## Vox

Widely advertised as the most popular alternative player for OS X, [Vox](http://coppertino.com/vox/mac) sports a great look, but I could hardly find anything worthy beyond that. It plays music, which is cool. I, however, couldn’t find a way to actually point it to a music library; I suspect that it feeds off iTunes’ library, but I don’t have one. And it keeps nagging the user with notifications prompting to try their paid streaming service.

Bottom line: still useful for click’n’play type of situation where I won’t bother firing up mpd+ncmpcpp.

## Sonora

I opened [the app](https://github.com/sonoramac/Sonora), it crashed saying something something last.fm something. Didn’t bother to dig further.

## DeaDBeeF

[A very promising project](http://deadbeef.sourceforge.net/), not in the least because it is closely modeled after foobar. The developer works on it in his spare time though, and progress is slow, if appealing. The latest and greatest features (e.g. folder browser, layout designer, waveform seekbar) are only in the Linux version, so Mac users should probably just wait patiently till the sun shines on their street. (Or [encourage the developer financially](http://deadbeef.sourceforge.net/support.html).)

## Foobar through Wine

[Scanning of folders on external NTFS HDDs fails miserably](https://hydrogenaud.io/index.php/topic,77261.125.html). Other than that, perfect. Still unusable if you don’t want to clutter the precious space on your Mac’s SSD with music.

## Clementine

[The project](https://www.clementine-player.org/) hasn’t been updated in a long time and has an ugly look and feel; its moodboard is a meek parody of a waveform seekbar. If you’re not into ncurses though, it could very well be your player of choice — it plays music, scrobbles, and has a library. It isn’t very low on resources as well, so you could consider using something more lightweight when not plugged in.

## Cog

[Cog](http://cogx.org/) is probably the best choice for the not-so-geeky geeks who, like me, are fond of folder-based music organization. (I used it until i switched to cmus and then to mpd+ncmpcpp.) Be sure to select the beta channel in the settings to use the 2013 fork instead of the abandoned 2009 version. Cog’s looks are minimalistic, yet pretty. It plays music, scrobbles, has notifications. What’s else to be desired? Gapless playback is promised but not working. And given that the 2013 fork is abandoned as well, it is unlikely to get better in the near future.

## Martin

[Martin](http://tgrbin.github.io/Martin/) is a small, but great and very promising project. It is also inspired by foobar, and has practically all the greatest features in my list: plays everything, scrobbles, has _blazingly fast_ folder-based library, dynamic playlist and sane queue management. Unfortunately, no gapless playback (although it [may happen in the future](https://github.com/tgrbin/Martin/issues/11)), so I don’t use it on a daily basis. Also, nobody knows what obscure bugs you can run into, because it is probably used by a dozen people on Earth.

## cmus

[Minimalism is good](https://cmus.github.io/), the library is tolerable, live-filter is awesome (albeit slow). Not everything is so great though: gapless playback has frequent hiccups which makes listening not always a pleasant experience; you need to build it yourself to enable coreaudio and ffmpeg output which may be difficult for casual users; the documentation is sparse.

## mpd+ncmpcpp (+mpdas)

This is what at the moment ended up as my player of choice. It requires a good amount of sadomasochism to deal with, though. While the installation is as simple as `brew install mpd && brew install ncmpcpp`, you have to _create config files by hand_ to make this even run. `brew install mpdas` and _another config file_ to make scrobbling work. A couple of hours for it to scan your massive library (scanning is much slower that e.g. Martin’s). What you get in exchange for the pain:

- a cute ncurses-based UI
- a library with fast search
- gapless playback working perfectly
- no queue :(
- scrobbling
- a search engine
- a tag editor (though the library doesn’t update after every edit; sometimes you have to restart the update process manually)
- an ascii visualizer! (though enabling it makes everything laggy)
- practically _no documentation_ (yay! the joys of exploring!)

Not very much, in fact (for me it was gapless which nailed it). For those who are eager to try but reluctant to deal with the hassle I’ll post my config files.

~/.mpd/mpd.conf
```
music_directory         "/Volumes/My Passport/music"
playlist_directory      "~/.mpd/playlists"
db_file                 "~/.mpd/mpd.db"
log_file                "~/.mpd/mpd.log"
pid_file                "~/.mpd/mpd.pid"
state_file              "~/.mpd/mpdstate"
auto_update             "yes"
auto_update_depth       "5"
follow_outside_symlinks "yes"
follow_inside_symlinks  "yes"
bind_to_address         "/users/pecheny/.mpd/socket"

audio_output {
  type                  "osx"
  name                  "CoreAudio"
  mixer_type            "software"
}

decoder {
  plugin                "mp4ff"
  enabled               "no"
}

bind_to_address         "127.0.0.1"
port                    "6600"

user                    "pecheny"
```

~/.ncmpcpp/config
```
mpd_music_dir = "/Volumes/My Passport/music"
playlist_display_mode = "columns"
user_interface = "alternative"
allow_for_physical_item_deletion = "no"
display_bitrate = "yes"
show_hidden_files_in_local_browser = "yes"
playlist_separate_albums = "yes"
```

[This post](https://timothy.sh/article/install-mpd-ncmpcpp-on-osx-yosemite) has more in-depth description of the installation and running process. Also, [this cheat sheet](http://pkgbuild.com/~jelle/ncmpcpp/) is indispensable. 

# Taggers

## Mp3tag through Wine

The author of (the awesome) Mp3tag was kind enough to provide [Wine builds](http://www.mp3tag.de/en/mac-osx.html) on his page. It works just like on Windows, except it doesn’t have native OS integration, and that’s why I use it only for something complex which puddletag won’t handle

## puddletag

[puddletag](http://docs.puddletag.net/) is my go-to tagger now; you are one `brew install puddletag && puddletag` away from tagging your files. The UI is a bit confusing though; for example, it took me long to figure out how to fetch tags from Musicbrainz (it’s _Window → Tag sources_, by the way.) The table layout is awesome, and, even if a bit laggy and unstable, it is enjoyable to work with.

# Converters

Things are sad in this realm of OS X; nothing remotely as comfortable as Foobar is to be seen. I mostly use [sox](http://sox.sourceforge.net/) or [ffmpeg](https://ffmpeg.org/download.html) in the terminal, which isn’t exactly user-friendly or convenient. [Max](http://sbooth.org/Max/) is tolerable. [xACT](http://xact.scottcbrown.org/) is useful for splitting large files by cuesheet. Alas, nothing more to be said here.