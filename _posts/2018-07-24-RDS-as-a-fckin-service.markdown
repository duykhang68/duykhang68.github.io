---
layout: post
title: RDS as-a-fckin-service
category: technical 
description: RDS database, high availability, scalable database cluster
---

**AWS RDS document**: 
Depending on the DB instance class and the amount of storage, it can take up to 20 minutes before the new instance is available.

**Reality**: 
- RDB instance status: creating
- RDS stuck in this fucking step nearly 2 hours and couting
- db-fuck-as-a-service

![](/assets/img/rds.webp)

<!--description-->

### I guest aka initiation step-by-step 

- Somehow the init RDB button will trigger a form with all specs, then send sms directly to a fucking devops guy of AWS ;)))
- Then that guy will goto AWS console, init new EC2 manually by his hand, use `rds-fucking-root.pem` keypairs
- YEAH, then then then pick `ansible-playbook` from somewhere in the internet then run this fuck

AND NOW: we have super-HA-scalable-db-as-a-service behind RDS term

Fact (trustme): nslookup of RDS domain, it will result EC2 domains

## Reference

[https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html)
