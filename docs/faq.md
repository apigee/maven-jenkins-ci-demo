# FAQ

## Why SSH for Git Authentication

There are three main ways for Jenkins to get authenticated to a remote git repo:

1.  username/password for HTTPS - this option is not chosen to prevent people's
    github credentials appearing in setup scripts and configuration files.

2.  OAuth - this option is not chosen to prevent access tokens displayed in
    Jenkins/Maven build outputs.

3.  Deploy keys - this option is chosen as it appears to be most secure option
    for this demonstration and also the one that is well-known in community.

## Why not Git Web Hooks

This project configures Jenkins to poll the git server every minute. The best
practice is to configure web hooks in git server so git can notify Jenkins when
a change is pushed to any branch. However in order for this to work, Git needs
to be able to access your Jenkins server, i.e. Jenkins instance needs have a
public IP or a domain name so git server can post the change message. As we are
running our Jenkins instances using docker in our local machines (for
demonstration purposes), GitHub or GitLab will not have access to those Jenkins
instances therefore can't use web hooks.
