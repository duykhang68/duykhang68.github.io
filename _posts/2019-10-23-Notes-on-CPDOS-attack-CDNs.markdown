---
layout: post
title: Notes on CPDOS attack CDN
category: 
- technical
- security
description: single crafted request is sufficient to restrain all subsequent requests from accessing the targeted content
---

```
Sending malicious HTTP requests (including overside header, meta char, method override header) to CDNs endpoint 
--> these kind of requests are not detected by caching system, are processed by intermediate CDN caching system 
--> then forward to the origin server 
--> origin return server-generated error page 
--> CDN stored error page on edge 
--> CDN serves the same error for normal requests from end-user
```

Main impact: AWS Cloudfront (**FIXED**)

<!--description-->

![img](/assets/img/CPDoS.png "CPDOS attack CDN")

## References

* Site: [https://cpdos.org](https://cpdos.org)
* Paper: [PDF](https://cpdos.org/paper/Your_Cache_Has_Fallen__Cache_Poisoned_Denial_of_Service_Attack__Preprint_.pdf)
* Reported to HTTP implementation vendors and cache providers on February 19, 2019
