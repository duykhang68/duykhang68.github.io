---
layout: post
title:  Understanding top command
category: technical 
description: help discovering and diagnosing problems in CPU and memory usage
---

**[`top`](#understanding-top-command)** is a monitoring program which is used frequently for tracking process's resource usage and its activity in **real-time**, show current tasks being serviced by the kernel, help **discovering** and **diagnosing** overload or capacity of system by seeing **CPU & Mem usage**. It's available under many Unix/Linux operating systems.

Keyword: [top]({% post_url 2017-07-16-Understanding-top-command %}#understanding-top-command), 
         [uptime]({% post_url 2017-07-16-Understanding-top-command %}#1-date-and-uptime), 
         [users]({% post_url 2017-07-16-Understanding-top-command %}#2-number-of-logged-users), 
         [load average]({% post_url 2017-07-16-Understanding-top-command %}#3-load-average),
         [process/thread state]({% post_url 2017-07-16-Understanding-top-command %}#4-processthread-state)

![](/assets/img/top-command-optimized.gif)

<!--description-->

## Description from man page:
The top program provides a dynamic real-time view of a running system. It can display system summary information as well as a list of processes or threads currently being managed by the Linux kernel. The types of system summary information shown and the types order and size of information displayed for processes are all user configurable and that configuration can be  made persistent across restarts.

The program provides a limited interactive interface for process manipulation as well as a much more extensive interface for personal configuration - encompassing every aspect of its operation. And while top is referred to throughout this document, you are free to name the program anything you wish. That new name, possibly an alias, will then be reflected on top's display and used when reading and writing a configuration file. ... 

**❯❯ Need more?** See <http://man7.org/linux/man-pages/man1/top.1.html>

But it's too fucking long 💢 and want to see the whole picture? 🌟 Sure, I have a picture below

## Understanding top command

![large-img](/assets/img/top-command.png "Top command explaination")

### 1. Date and uptime
Current time is **13:41**, and system has been running for over **5 weeks**, from last boot on **May 17**
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

### 2. Number of logged users
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

### 3. Load average
The **`load average`** is a number corresponding to the average number of **runnable processes** on the system. The load average is often listed as three sets of numbers, which represent the load average for the past 1, 5, and 15 minutes. - from [RedHat](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/4/html/Introduction_To_System_Administration/s2-bandwidth-rhlspec-cpu.html)

On Linux systems, these numbers include **processes wanting to run on CPU**, as well as processes blocked in uninterruptible I/O (usually disk I/O). This gives a high level idea of **resource load** (or demand). The three numbers give us some idea of **how load is changing over time**. For example, if you’ve been asked to check a problem server, and the 1 minute value is much lower than the 15 minute value, then you might have logged in too late and missed the issue - from [Netfilx Techblog](https://medium.com/netflix-techblog/linux-performance-analysis-in-60-000-milliseconds-accc10403c55)

**`Runable processes`** means: running and blocked processes (usually by I/O). That's really important because it means that you can have `0% CPU usage` and still have `high load`. The processes blocked on I/O show up in the "**D**" state in `ps`, header "STAT" or "S"

Lower numbers are better than higher numbers. If the third number is **too high** (15 minutes ago), I think we got a problem about the performance to deal with. But what's the **`Threshold`**, what's too high. We need a reasonable and **acceptable value** for comparison.

### 3.1 Single logical CPU
**In general**, with `one logical CPU` - 1 vCPU, **`Threshold = 0.7`** is a best practice, many sysadmins will draw a line at 0.70.

For example in case of 1 vCPU: 
```
load average: 1.25, 0.60, 4.20
```
- over the last 1 minute: System was overloaded by `25% on average`. 0.25 processes were waiting for the CPU
- over the last 5 minutes: CPU `idled for 40%` of the time. **It's acceptable**
- over the last 15 minutes: System was `overloaded by 320%` on average. 3.20 processes were waiting for the CPU.

### 3.2  Multi-logical CPUs
With 4 logical CPUs system? It's still healthy with a load of 2.80 - 3.00. On multi-logical CPUs system, the load is relative to the number of vCPUs available. 

The "100% utilization" mark is 1.00 on a single-logical CPU system, 2.00, on a dual vCPUs, 4.00 on a quad-vCPUs, etc.

In `top` command, press `1` for each vCPU is displayed seperately, also to know number of vCPU.
I have 4 vCPUs in this case, using EC2 AWS C4 type, low load average
```
top - 09:10:00 up 32 days, 6 min,  2 users,  load average: 0.01, 0.04, 0.05
Tasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie
%Cpu0  :  0.7 us,  0.0 sy,  0.0 ni, 99.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu1  :  0.0 us,  0.3 sy,  0.0 ni, 99.7 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu2  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu3  :  5.0 us,  0.3 sy,  0.0 ni, 94.6 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```

Something more:
- 💢 **Confusing** about vCPUs/cores/threads - See [CPU Architecture fundamental](https://github.com/hieuhtr/Blog/issues/55)
- 🌟 For **deep understanding** about load average - See [this post](http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages)
- 🌟 For another example - See [wiki](https://en.wikipedia.org/wiki/Load_%28computing%29#Unix-style_load_calculation) 

### 4. Process/Thread state
