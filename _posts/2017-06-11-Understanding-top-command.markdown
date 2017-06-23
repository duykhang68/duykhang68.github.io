---
layout: post
title:  Understanding top command
category: technical 
description: help discovering and diagnosing problems in CPU and memory usage
---

**`top`** command is a performance monitoring program which is used frequently to monitor processor activity in **real-time**, current tasks being serviced by the kernel, help **discovering** and **diagnosing** problems in **CPU** and **memory usage**. It's available under many Unix/Linux operating systems.

![](/assets/img/top-command-optimized.gif)

<!--description-->

## Description from man page:

The top program provides a dynamic real-time view of a running system. It can display system summary information as well as a list of processes or threads currently being managed by the Linux kernel. The types of system summary information shown and the types order and size of information displayed for processes are all user configurable and that configuration can be  made persistent across restarts.

The program provides a limited interactive interface for process manipulation as well as a much more extensive interface for personal configuration - encompassing every aspect of its operation. And while top is referred to throughout this document, you are free to name the program anything you wish. That new name, possibly an alias, will then be reflected on top's display and used when reading and writing a configuration file.

```python
❯❯ top
top - 14:43:23 up 18 days, 22:05,  1 user,  load average: 0.21, 0.18, 0.12
Tasks: 119 total,   1 running, 118 sleeping,   0 stopped,   0 zombie
%Cpu0  :  2.0 us,  0.0 sy,  0.0 ni, 98.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu1  :  1.3 us,  0.0 sy,  0.0 ni, 98.3 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem:  7983.977 total, 7748.160 used,  235.816 free,  170.492 buffers
MiB Swap:    0.000 total,    0.000 used,    0.000 free. 2608.723 cached Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 1153 elastic+  20   0 20.771g 4.308g 147.2m S   3.3 55.3   1219:42 java
    8 root      20   0    0.0m   0.0m   0.0m S   0.3  0.0   5:02.90 rcuos/0
    1 root      20   0   32.7m   2.4m   1.0m S   0.0  0.0   0:01.45 init
    2 root      20   0    0.0m   0.0m   0.0m S   0.0  0.0   0:00.00 kthreadd
    3 root      20   0    0.0m   0.0m   0.0m S   0.0  0.0   0:00.78 ksoftirqd/0
    5 root       0 -20    0.0m   0.0m   0.0m S   0.0  0.0   0:00.00 kworker/0:0H
    7 root      20   0    0.0m   0.0m   0.0m S   0.0  0.0   2:55.95 rcu_sched
```
