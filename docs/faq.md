# FAQ

## Why SSH for Git Authentication

There are three main ways for Jenkins to get authenticated to a remote git repo:

1.  username/password for HTTPS - this option is not chosen to prevent people's
    github credentials appearing in setup scripts and configuration files.

2.  OAuth - this option is not chosen to prevent access tokens displayed in
    Jenkins/Maven build outputs.

3.  Deploy keys - this option is chosen as it appears to be most secure option
    for this demonstration and also the one that is well-known in community.
