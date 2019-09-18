---
layout: post
title: Mountfuck
category: whatthefuck
description: Entire fucking dir in fuckin /var/lib/elasticsearch
---

![img](/assets/img/wrong-mount-in-es.webp "Entire fucking dir in fuckin /var/lib/elasticsearch")

<!--description-->

## Root cause

[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nvme-ebs-volumes.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nvme-ebs-volumes.html)

```
EBS uses single-root I/O virtualization (SR-IOV) to provide volume attachments on Nitro-based instances using the NVMe specification. 
These devices rely on standard NVMe drivers on the operating system. 
These drivers typically discover attached devices by scanning the PCI bus during instance boot, and create device nodes based on the order in which the devices respond, not on how the devices are specified in the block device mapping. 
In Linux, NVMe device names follow the pattern /dev/nvme<x>n<y>, where <x> is the enumeration order, and, for EBS, <y> is 1. 
Occasionally, devices can respond to discovery in a different order in subsequent instance starts, which causes the device name to change.
```

So, if we use NVMe disk for some new types of AWS EC2, please note that the device name is nearly randomize after each reboot.
It means if we have 2 NVMe disks on one EC2 vm, so we cannot know which device name delegate to which real disk.
```
/dev/nvme1n1p1
/dev/nvme0n1p1
```

## Solution

We must config fstab (permanent mount) based on UUID / label like this
```
LABEL=cloudimg-rootfs  /   ext4  defaults,discard  0 0
UUID="c46cf311-d31b-41ce-bce5-5d8ad0a6b109" /var/lib/elasticsearch ext4 defaults,nofail  0 2
```

DON'T config based on device name like this fuck
```
LABEL=cloudimg-rootfs	/	 ext4	defaults,discard	0 0
/dev/nvme1n1p1 /var/lib/elasticsearch ext4 defaults,nofail  0 2
```
