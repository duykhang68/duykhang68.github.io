---
layout: post
title: Idempotence when extending secgroup rules with aws_security_group_rule in Terraform
category: mindset
description: responsibility for angthing we did, how to solve and improve after incidents
---

Terraform acts so weird when mixing up between `aws_security_group` and `aws_security_group_rule` in extending AWS security group rules.

**Context:** that leads to not idempotent for each apply (without changing anything in IaC)
* Create one security group using `aws_security_group` with some predefined inlines
* Extending more rules (rows) in that secgroup by using `aws_security_group_rule` to add more discrete rules
* At each time executing `terraform plan/apply`, terraform re-creates rules lead to fcked up idempotent of result.

Sample code at: 
* DO NOT USE - [aws-secgroup-not-idempotence.tf](/assets/raw/aws-secgroup-not-idempotence.tf)
* BEST PRACTICE - [aws-secgroup-best-practice-idempotence.tf](/assets/raw/aws-secgroup-best-practice-idempotence.tf)

<!--description-->

**Table of Contents**
* TOC
{:toc}

## A. Knowledge base

For defining AWS secgroup in terraform, we have 2 main ways: 
* `inline` with `aws_security_group`
```
# Predefined all rules using inline
resource "aws_security_group" "default" {
  name        = "default"
  vpc_id      = "xxxxx"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    description = "Predefined Whitelist "
    cidr_blocks = "${var.whitelist_ips}"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

* or `discrete` with `aws_security_group_rule`. 
```
# Discrete rules
resource "aws_security_group_rule" "extending_default" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["1.1.1.1/32"]
  security_group_id = "${aws_security_group.default.id}"
  description       = "VPN"
}
```

If we streamline one method when configuring, everything is fine:
* One method using `aws_security_group` and all rules are defined as `inline` ==>  **PERFECT** but hard to extended whenever you wanna fetch that security group ID from another place.
* One method using `aws_security_group` without any inline, and use each `aws_security_group_rule` for defining rules ==> **PERFECT**

If we mixed up by predefined inline in `aws_security_group` then continue extending by discrete more rules in `aws_security_group_rule` ==> **FCKED UP**

---
**NOTE on Security Groups and Security Group Rules:** Terraform currently provides both a standalone Security Group Rule resource (a single `ingress` or `egress` rule), and a Security Group resource with `ingress` and `egress` rules **defined in-line**. At this time you **cannot use** a Security Group with in-line rules in conjunction with any Security Group Rule resources. Doing so will cause a conflict of rule settings and will overwrite rules.

**Source:** [terraform](https://www.terraform.io/docs/providers/aws/r/security_group.html)

---

## B. Best practices

* ### Confident, clear & well configured:

  If we're confident to say that our secgroup is well defined from the first place in mind, init one time, then use in many place and **no need to changes/extend anymore** in the future, so go head with configuring entire segroup & rule in `aws_security_group` by inline

* ### Extendable, plugable anywhere later:

  If we're working on one secgroup which is not well-defined in the first time, need extended and plug in/out rules in another place, go head with configuring core skeletion of secgroup using `aws_security_group` without any rules, then plug in rule by rule with `aws_security_group_rule`

  ```
  # Create secgroup skeleton without any inline
  resource "aws_security_group" "default_http" {
    name        = "default-http"
    vpc_id      = "xxxxx"
  }

  # Then define rules for this above secgroup
  resource "aws_security_group_rule" "default_http_ingress" {
    type             = "ingress"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    description      = "Worldwide"
    cidr_blocks      = ["0.0.0.0/0"]
    security_group_id = aws_security_group.default_http.id
  }

  resource "aws_security_group_rule" "default_https_ingress" {
    type             = "ingress"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    description      = "Worldwide"
    cidr_blocks      = ["0.0.0.0/0"]
    security_group_id = aws_security_group.default_http.id
  }
  ```



## C. Issue links & References

* [http://cavaliercoder.com/blog/inline-vs-discrete-security-groups-in-terraform.html](http://cavaliercoder.com/blog/inline-vs-discrete-security-groups-in-terraform.html)
* [https://github.com/hashicorp/terraform/issues/11011](https://github.com/hashicorp/terraform/issues/11011)
* [https://github.com/terraform-providers/terraform-provider-aws/issues/742](https://github.com/terraform-providers/terraform-provider-aws/issues/742)
* [https://github.com/hashicorp/terraform/issues/14124](https://github.com/hashicorp/terraform/issues/14124)

