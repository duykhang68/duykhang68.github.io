---
layout: post
title:  Increase EBS volume of AWS on linux
category: technical 
description: Increase AWS EBS volume
---

## Problem

- A disk volume 32GB `/dev/xvdf1` is mounted into `/var/lib/mysql`
- This volume is out of space, need to be extend size to 64GB
- Extended to 64GB on aws console, but from ec2 point of view, it's just 32GB

**`Rootcause`**: didn't merge partition after extending and resize fs

![](/assets/img/ebs-aws.webp)

<!--description-->

## Solution

Resize file system to larger size of this volume

### Step1: Collect information

Check disk ID
```
root@webapp-unstable:~# blkid
/dev/xvda1: LABEL="cloudimg-rootfs" UUID="4573eb39-57f3-439b-9a73-8aef508afd3f" TYPE="ext4" PARTUUID="965243d6-01"
/dev/xvdf1: UUID="d56d3b3e-4385-48a7-ba95-6d3884d5dca8" TYPE="ext4" PARTUUID="cc52698e-01"
```

Check size disk and mount point of `/dev/xvdf1`
```
root@webapp-unstable:~# lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  16G  0 disk
└─xvda1 202:1    0  16G  0 part /
xvdf    202:80   0  64G  0 disk
└─xvdf1 202:81   0  32G  0 part /var/lib/mysql
```

### Step 2: Unmount this volume out of system 

Unmount
```
root@webapp-unstable:~# umount /dev/xvdf1
```

Check after unmount
```
root@webapp-unstable:~# lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  16G  0 disk
└─xvda1 202:1    0  16G  0 part /
xvdf    202:80   0  64G  0 disk
└─xvdf1 202:81   0  32G  0 part
```

### Step 3: Delete and recreate new partition

Why? Because old partition is using 32GB only, should delete and re-create new one. After that, the new one will use all of space 64GB

Using `fdisk` or `parted/gparted`
```
root@webapp-unstable:~# fdisk /dev/xvdf

Welcome to fdisk (util-linux 2.27.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p
Disk /dev/xvdf: 64 GiB, 68719476736 bytes, 134217728 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xcc52698e

Device     Boot Start      End  Sectors Size Id Type
/dev/xvdf1       2048 67108863 67106816  32G 83 Linux

Command (m for help): d
Selected partition 1
Partition 1 has been deleted.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-134217727, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-134217727, default 134217727):

Created a new partition 1 of type 'Linux' and of size 64 GiB.

Command (m for help): p
Disk /dev/xvdf: 64 GiB, 68719476736 bytes, 134217728 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xcc52698e

Device     Boot Start       End   Sectors Size Id Type
/dev/xvdf1       2048 134217727 134215680  64G 83 Linux

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

### Step 4: Resize file system of this volume

Using `resize2fs` because this volume is `ext4` format
```
root@webapp-unstable:~# resize2fs /dev/xvdf1
resize2fs 1.42.13 (17-May-2015)
Filesystem at /dev/xvdf1 is mounted on /var/lib/mysql; on-line resizing required
old_desc_blocks = 2, new_desc_blocks = 4
The filesystem on /dev/xvdf1 is now 16776960 (4k) blocks long.
```

Check after resizing
```
root@webapp-unstable:~# lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  16G  0 disk
└─xvda1 202:1    0  16G  0 part /
xvdf    202:80   0  64G  0 disk
└─xvdf1 202:81   0  64G  0 part /var/lib/mysql
root@webapp-unstable:~# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            2.0G     0  2.0G   0% /dev
tmpfs           396M   41M  355M  11% /run
/dev/xvda1       16G  6.9G  8.6G  45% /
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           2.0G     0  2.0G   0% /sys/fs/cgroup
tmpfs           396M     0  396M   0% /run/user/1000
/dev/xvdf1       63G   30G   31G  50% /var/lib/mysql

root@webapp-unstable:~# mount -fav
/                        : ignored
/var/lib/mysql           : already mounted
```

DONE.

## Reference

[http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html)
