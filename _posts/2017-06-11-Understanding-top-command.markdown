---
layout: post
title:  Understanding top command
category: technical 
description: help discovering and diagnosing problems in CPU and memory usage
---

**[`top`](#understanding-top-command)** is a monitoring program which is used frequently for tracking process's resource usage and its activity in **real-time**, show current tasks being serviced by the kernel, help **discovering** and **diagnosing** overload or capacity of system by seeing **CPU & Mem usage**. It's available under many Unix/Linux operating systems.

Keyword: [top](#understanding-top-command), [uptime](#date-and-uptime), [users](#number-of-logged-users), [load average](#load-average)

![](/assets/img/top-command-optimized.gif)

<!--description-->

## Description from man page:
The top program provides a dynamic real-time view of a running system. It can display system summary information as well as a list of processes or threads currently being managed by the Linux kernel. The types of system summary information shown and the types order and size of information displayed for processes are all user configurable and that configuration can be  made persistent across restarts.

The program provides a limited interactive interface for process manipulation as well as a much more extensive interface for personal configuration - encompassing every aspect of its operation. And while top is referred to throughout this document, you are free to name the program anything you wish. That new name, possibly an alias, will then be reflected on top's display and used when reading and writing a configuration file. ... 

**❯❯ Need more?** See <http://man7.org/linux/man-pages/man1/top.1.html>

But it's too fucking long 💢 and want to see the whole picture? 🌟 Sure, I have a picture below

## Understanding top command

![large-img](/assets/img/top-command.png "Top command explaination")

### Date and uptime
Current time is **13:41:31**, and system has been running for over **5 weeks**, from last boot on **May 17**
```
top - 13:41:31 up 38 days, 21:04,  3 users,  load average: 0.01, 0.09, 0.13
❯❯ date
Sun Jun 25 13:41:31 UTC 2017
❯❯ uptime
13:41:31 up 38 days, 21:04,  3 users,  load average: 0.01, 0.09, 0.13
❯❯ uptime -p
up 5 weeks, 3 days, 21 hours, 6 minutes
❯❯ uptime -s
2017-05-17 16:37:26
```

### Number of logged users
I have 3 logged users and what they are doing:
- one is running ssh to other
- one is on bash shell
- and ... me with `w` command

```
3 users
❯❯ w
 13:41:31 up 38 days, 21:04,  3 users,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
ubuntu   pts/0    x.205.x.xxx      13:09    1:34   0.07s  0.03s ssh abc.xyz
ubuntu   pts/3    x.64.xx.xxx      05:11    8:36m  0.05s  0.01s -bash
ubuntu   pts/6    x.161.x.xxx      13:47    3.00s  0.04s  0.00s w
```
### Load average


