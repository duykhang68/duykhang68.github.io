# -------------------------------------------------------
# IT IS NOT IDEMPOTENCE BECAUSE OF EXTENDING RULES
# DO NOT USE - LEAD TO FUCKED UP
# -------------------------------------------------------

resource "aws_security_group" "default" {
  name        = "default"
  description = "Default security group"
  vpc_id      = "xxxxx"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    description = "Predefined Whitelist "
    cidr_blocks = "${var.whitelist_ips}"
    ipv6_cidr_blocks = null
    prefix_list_ids  = null
    security_groups  = null
    self             = null
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "extending_default" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  prefix_list_ids   = null
  cidr_blocks       = ["1.1.1.1/32"]
  security_group_id = "${aws_security_group.default.id}"
  description       = "VPN"
}
