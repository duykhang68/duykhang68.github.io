---
layout: post
title: Learning logs from 6Aug to 12Aug
category: today-i-learned 
description: today I learned TIL, devops practice, weekly personal logs
---

1. Export large tables in MySQL
2. 

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


## References
1. [https://stackoverflow.com/a/21091197/5402121](https://stackoverflow.com/a/21091197/5402121)
2. 
