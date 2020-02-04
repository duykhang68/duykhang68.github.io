❯❯ aws s3api head-object --bucket=gks-dev-admin-frontend-uploads --key=test.jpg
{
    "AcceptRanges": "bytes",
    "LastModified": "Thu, 16 Jan 2020 10:52:24 GMT",
    "ContentLength": 73758,
    "ETag": "\"2692f2d7b000ac75527f273ab138f485\"",
    "ContentType": "binary/octet-stream",
    "Metadata": {}
}

❯❯ aws s3api get-object-acl --bucket=gks-dev-admin-frontend-uploads --key=test.jpg
{
    "Owner": {
        "ID": "f353872075604078de6b4679baee51b4cb478036e16d066581636995aa8e41fe"
    },
    "Grants": [
        {
            "Grantee": {
                "Type": "Group",
                "URI": "http://acs.amazonaws.com/groups/global/AllUsers"
            },
            "Permission": "READ"
        }
    ]
}


aws s3 cp s3://gks-dev-admin-frontend-uploads/test.jpg \
          s3://gks-dev-admin-frontend-uploads/test.jpg \
          --no-guess-mime-type \
          --content-type="image/jpeg" \
          --metadata-directive="REPLACE"

copy: s3://gks-dev-admin-frontend-uploads/test.jpg to s3://gks-dev-admin-frontend-uploads/test.jpg

❯❯ aws s3api head-object --bucket=gks-dev-admin-frontend-uploads --key=test.jpg
{
    "AcceptRanges": "bytes",
    "LastModified": "Thu, 16 Jan 2020 10:55:17 GMT",
    "ContentLength": 73758,
    "ETag": "\"2692f2d7b000ac75527f273ab138f485\"",
    "ContentType": "image/jpeg",
    "Metadata": {}
}

❯❯ aws s3api get-object-acl --bucket=gks-dev-admin-frontend-uploads --key=test.jpg
{
    "Owner": {
        "ID": "f353872075604078de6b4679baee51b4cb478036e16d066581636995aa8e41fe"
    },
    "Grants": [
        {
            "Grantee": {
                "ID": "f353872075604078de6b4679baee51b4cb478036e16d066581636995aa8e41fe",
                "Type": "CanonicalUser"
            },
            "Permission": "FULL_CONTROL"
        }
    ]
}



aws s3 cp s3://gks-dev-admin-frontend-uploads/test.jpg \
          s3://gks-dev-admin-frontend-uploads/test.jpg \
          --no-guess-mime-type \
          --content-type="application/pdf" \
          --metadata-directive="REPLACE" \
          --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

❯❯ aws s3api get-object-acl --bucket=gks-dev-admin-frontend-uploads --key=test.jpg
{
    "Owner": {
        "ID": "f353872075604078de6b4679baee51b4cb478036e16d066581636995aa8e41fe"
    },
    "Grants": [
        {
            "Grantee": {
                "Type": "Group",
                "URI": "http://acs.amazonaws.com/groups/global/AllUsers"
            },
            "Permission": "READ"
        }
    ]
}
