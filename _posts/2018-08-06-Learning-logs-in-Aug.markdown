---
layout: post
title: Learning logs in Aug
category: today-i-learned
description: today I learned TIL, devops practice, weekly personal logs
---

1. Export large tables in MySQL
2. Bash completion on debian 9

<!--description-->

### 1. Export large tables in MySQL

- Large tables
- Progress
- Compression

```
tmux new -s exporting
mysqldump -udevops -pxxxxxx -hhost.xxxx \
           dbname table1 table2 table3 | pv | gzip -9 > 3tables.sql.gz
```

### 2. Bash completion on debian 9

- Autocomplete / hint when pressing tab
- Apply for all user/profile

```
apt install bash-completion

# In file /etc/profile
if [ -f /etc/bash_completion ]; then
 . /etc/bash_completion
fi
```


## References
1. [https://stackoverflow.com/a/21091197/5402121](https://stackoverflow.com/a/21091197/5402121)
2. [https://packages.debian.org/stretch/bash-completion](https://packages.debian.org/stretch/bash-completion)
