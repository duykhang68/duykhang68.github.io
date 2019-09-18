---
layout: post
title: Wildcardfuck
category: whatthefuck
description: Asterisks at other places in the domain will not work as a wildcard
---

![img](/assets/img/asterisk-de.jpg "Wildcardfuck")

<!--description-->

## Root cause

- There is no fucking rootcause in these cases. 
- It's lack of knowledge of the guy who did these configurations.
- **You're assuming that you do it right and you know it clearly**, **but you never check** or **learn and understand** it in the right way. 


## Knowledge base

- Character **\***  is **Asterisk**. A wildcard DNS record is a record in a DNS zone that will match requests for non-existent domain names. A wildcard DNS record is specified by using a **\*** as the leftmost label (part) of a domain name, e.g. `*.example.com`.


- Wildcards in the DNS are **much more limited** than other wildcard characters used in other computer systems. **Asterisks at other places in the domain will not work as a wildcard**, so neither `*abc.example.com` nor `abc.*.example.com` work as wildcard DNS records

- ### Using an Asterisk (*) in AWS Route53 Hosted Zones and Records

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


## References

1. [https://en.wikipedia.org/wiki/Wildcard_DNS_record](https://en.wikipedia.org/wiki/Wildcard_DNS_record)
2. [https://tools.ietf.org/html/rfc4592#page-6](https://tools.ietf.org/html/rfc4592#page-6)
3. [https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DomainNameFormat.html#domain-name-format-asterisk](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DomainNameFormat.html#domain-name-format-asterisk)

