---
layout: page
title: What The Fuck
permalink: /WhatTheFuck/
---

**Table of Contents**
* TOC
{:toc}

## 1. Mountfuck

![img](/assets/img/wrong-mount-in-es.webp "Entire fucking dir in fuckin /var/lib/elasticsearch")

### Root cause

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

### Solution

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

## 2. Jenkinsfuck

![img](/assets/img/jenkins-oops.webp "EatWhatYouKill")
```
Mar 01, 2019 11:19:14 AM org.eclipse.jetty.server.handler.ContextHandler$Context log
WARNING: Error while serving https://ci.tools.xxxxxx.io/job/live-xxxxxx/27/logText/progressiveHtml
java.lang.reflect.InvocationTargetException
    at org.kohsuke.stapler.Function$MethodFunction.invoke(Function.java:347)
    ...
    ...
    at org.eclipse.jetty.io.ChannelEndPoint$2.run(ChannelEndPoint.java:118)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.runTask(EatWhatYouKill.java:333)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.doProduce(EatWhatYouKill.java:310)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.tryProduce(EatWhatYouKill.java:168)
    at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.run(EatWhatYouKill.java:126)
    at org.eclipse.jetty.util.thread.ReservedThreadExecutor$ReservedThread.run(ReservedThreadExecutor.java:366)
    ...
    ...
Caused by: java.lang.NegativeArraySizeException
    at hudson.console.ConsoleNote.readFrom(ConsoleNote.java:241)
    at hudson.console.ConsoleAnnotationOutputStream.eol(ConsoleAnnotationOutputStream.java:109)
    at hudson.console.LineTransformationOutputStream.eol(LineTransformationOutputStream.java:60)
```

### Root cause

Details of log: [jenkins-NegativeArraySizeException-error.log](/assets/raw/jenkins-NegativeArraySizeException-error.log) 
```java
public class NegativeArraySizeException
extends RuntimeException
```

Thrown if an application tries to create an array with negative size.

Output of this running job is: too big and spawn too fast **`rarely`** that reach `NegativeArraySize` during entire log workflow from
- ConsoleNote > ConsoleAnnotationOutputStream > FileLogStorage > ProxyOutputStream
- to doProgressText and until doProgressiveHtml

### Solution

EatWhatYouKill 

Don't panic, just wait, let them come then let them go. Wait until this fucking job DONE. Then issuse will....gone


## 3. Wildcardfuck

![img](/assets/img/asterisk-de.jpg "Wildcardfuck")

### Root cause

- There is no fucking rootcause in these cases. 
- It's lack of knowledge of the guy who did these configurations.
- **You're assuming that you do it right and you know it clearly**, **but you never check** or **learn and understand** it in the right way. 


### Knowledge base

- Character **\***  is **Asterisk**. A wildcard DNS record is a record in a DNS zone that will match requests for non-existent domain names. A wildcard DNS record is specified by using a **\*** as the leftmost label (part) of a domain name, e.g. `*.example.com`.


- Wildcards in the DNS are **much more limited** than other wildcard characters used in other computer systems. **Asterisks at other places in the domain will not work as a wildcard**, so neither `*abc.example.com` nor `abc.*.example.com` work as wildcard DNS records

- **Using an Asterisk (*) in AWS Route53 Hosted Zones and Records**

    You can create hosted zones and records that include **\*** in the name. 

    **1. Hosted Zones**
    + You can't include an **\*** in the leftmost label in a domain name. For example, `*.example.com` is not allowed.
    + If you include **\*** in other positions, DNS treats it as an **\*** character (`ASCII 42`), not as a wildcard.

    **2. Records**

    DNS treats the **\*** character either as a wildcard or as the **\*** character (`ASCII 42`), depending on where it appears in the name. Note the following restrictions on using **\*** as a wildcard in the name of a record:
    + The **\*** must replace the leftmost label in a domain name, for example, `*.example.com` or `*.acme.example.com`. If you include **\*** in any other position, such as `prod.*.example.com`, DNS treats it as an **\*** character (`ASCII 42`), not as a wildcard.
    + The **\*** must replace the entire label. For example, you can't specify `*prod.example.com` or `prod*.example.com`.
    + Specific domain names take precedence. For example, if you create records for `*.example.com` and `acme.example.com`, Route 53 always responds to DNS queries for `acme.example.com` with the values in the `acme.example.com` record.
    + The **\*** applies to DNS queries for the subdomain level that includes the asterisk, and all the subdomains of that subdomain. For example, if you create a record named `*.example.com`, Route 53 uses the values in that record to respond to DNS queries for `zenith.example.com`, `acme.zenith.example.com`, and `pinnacle.acme.zenith.example.com` (if there are no records that have those names). 


### References

1. [https://en.wikipedia.org/wiki/Wildcard_DNS_record](https://en.wikipedia.org/wiki/Wildcard_DNS_record)
2. [https://tools.ietf.org/html/rfc4592#page-6](https://tools.ietf.org/html/rfc4592#page-6)
3. [https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DomainNameFormat.html#domain-name-format-asterisk](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DomainNameFormat.html#domain-name-format-asterisk)

