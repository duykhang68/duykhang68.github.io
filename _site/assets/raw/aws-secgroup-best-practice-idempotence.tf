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
