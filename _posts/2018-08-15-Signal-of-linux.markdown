---
layout: post
title:  Signal of linux
category: technical 
description: About system calls, SIGINT, SIGTERM, SIGKILL
---

### Definition:

- System calls: communication chanel between user space program and kernel
- Signals: a different channel, used for inter-process communication
- Signals don't carry any agrgument, they are self explanatory by their name
- Some signals identified by a number, ie `SIGKILL` (9)
- That's why we use `kill -9 <PID>` to kill a process, because the kill command will send a defined signal to a process with a given identity `<PID>`
- when we run `kill -9 <PID>` command, that process is not terminate itself, instead we're telling that OS to stop running the program, no matter what the program is doing

<!--description-->

### Some useful signals

- `SIGINT`: is the program interrupt signal. When user presses `CTRL+C`, the terminal emulator sends this signal to the foreground process, it will terminate process, but it can be caught or ignored, it a graceful shutdown
- `SIGTERM`: is the termination signal. It used to cause process termination, this signal can be blocked, handled and ignored. It is the normal way to ask a process to terminate. The `kill` command generates SIGTERM by default
- `SIGKILL`: is an immediate termination signal. It cannot be caught or ignored by the process, because when we send a `SIGKILL` to a proces, we remove any chance for that process to do a tidy cleanup and shutdown. 

For example, when a process does not die by using `Ctrl+C` (SIGINT), we should use the command `kill -9` on that process PID

- `SIGSTOP`: is a process suspend signal, which tells the OS to stop/suspend a process. This signal cannot be caught or ignored. To resume the process, use SIGCONT signal to continue 

- `Ctrl+C`: The interrupt signal, sends `SIGINT` to the job running in the foreground.

When a process is in a limbo state it is reasonable to send the process the `SIGKILL` signal, which can be invoked by running the kill command with the -9 flag. Unlike `SIGTERM` the `SIGKILL` signal cannot be captured by the process and thus it cannot be ignored. The `SIGKILL` signal is handled outside of the process completely, and is used to stop the process immediately. The problem with using `SIGKILL` is that it does not allow an application to close its open files or database connections cleanly and over time could cause other issues; therefor it is generally better to reserve the `SIGKILL` signal as a last resort.

### Reference & Read more
1. http://bencane.com/2014/04/01/understanding-the-kill-command-and-how-to-terminate-processes-in-linux/
2. https://en.wikipedia.org/wiki/Unix_signal
3. http://unix.stackexchange.com/questions/149741/why-is-sigint-not-propagated-to-child-process-when-sent-to-its-parent-process
4. http://askubuntu.com/questions/890591/why-doesnt-ctrl-c-kill-the-terminal-itself/890597
5. https://www.shellscript.sh/
6. https://www.win.tue.nl/~aeb/linux/lk/lk-5.html
7. https://lasr.cs.ucla.edu/vahab/resources/signals.html
8. http://www.linuxprogrammingblog.com/all-about-linux-signals?page=show
9. ftp://ftp.gnu.org/old-gnu/Manuals/glibc-2.2.3/html_chapter/libc_24.html
10. http://askubuntu.com/questions/184071/what-is-the-purpose-of-the-9-option-in-the-kill-command
11. https://www.digitalocean.com/community/tutorials/how-to-use-ps-kill-and-nice-to-manage-processes-in-linux
12. https://s905060.gitbooks.io/site-reliability-engineer-handbook/content/signals.html
13. http://bencane.com/2014/04/01/understanding-the-kill-command-and-how-to-terminate-processes-in-linux/
14. https://major.io/2010/03/18/sigterm-vs-sigkill/

