# Usage

This document assumes you have followed the [setup](setup.md) procedures and
have a running Jenkins instance using Docker.

## Feature development

1.  Create a feature branch called `feature/1` from `master` branch

    ```bash
    (master): git checkout -b feature/1
    ```

2.  Open any file, e.g. README.md, and make a change.

3.  Let's simulate the steps a proxy developer would take to test their changes before they want a merge request or code review.  Ideally the proxy developer can deploy multiple times until all tests pass and they are ready for merge request or code review.  For this reason, we don't commit directly to the feature branch-- we don't want to clutter the Git log history, and we also don't want to rely on Jenkins just yet.  Deploy and test your changes below, just as a proxy developer would from their local machine:

    ```bash
    cd currency-v1
    mvn install -Ptest -Denv.APIGEE_ORG={ORG} -Denv.APIGEE_USERNAME={username} -Denv.APIGEE_PASSWORD={password} -Denv.API_DOMAIN_TEST={apigee_proxy_domain}
    ```

    Note that -Denv.API_DOMAIN_TEST is the same API_DOMAIN_TEST you've defined in your .run-image.sh file.  If you don't want to pass that many arguments to maven, you can add those properties to your settings file `~/.m2/settings.xml`:

    ```xml
    <profile>
        <id>test</id>
        <properties>
            <!-- these settings are for accelerator-ci-maven -->
            <env.APIGEE_ORG>...</env.APIGEE_ORG>
            <env.APIGEE_USERNAME>...</env.APIGEE_USERNAME>
            <env.APIGEE_PASSWORD>...</env.APIGEE_PASSWORD>
            <env.API_DOMAIN_TEST>...</env.API_DOMAIN_TEST>
        </properties>
    </profile>
    ```

    If you decide to go with the settings file approach, you can just execute
    this command instead of the above long maven command:

    ```bash
    mvn install -Ptest
    ```

    This command will deploy the bundle to `test` environment as
    `currency-<yourname>v1`. Description of the proxy will be set to `commit
    from a local branch by <your-name>`.

4.  Now that we see all tests were successful, commit your changes to the feature branch:

    ```bash
    git commit -am "changed README.md"
    ```

5.  Push feature branch to remote.

    ```bash
    git push origin feature/1
    ```

    You will see at this point that Jenkins will
    automatically start `currency-v1-features` job which will deploy the bundle
    as `currency-jenkinsv1` to `test` environment. Description of the proxy will
    be set to `commit <commit_hash> from feature/1 branch by jenkins`.

6.  Create a pull request from feature branch to master - note that even thought this is not a must-have but
    it is good to demonstrate a best-practice team development scenario where
    merge/pull requests are used for review/discussion of features before they
    are merged to master branch.  If there are no conflicts, Github makes it particularly easy to merge from a pull request.

## Merge to master (alternative to UI pull request and merge)

If you'd like to manually do a merge, you can do so locally from shell:

```bash
git checkout master
git merge --no-ff feature/1
git push
```

and 2 last steps to cleanup the feature branch both locally and on your remote:

```
git branch -d feature/1
git push origin :feature/1
```

You will see at this point that Jenkins will automatically start
`currency-v1-master` job which will deploy the bundle as `currency-v1` to `test`
environment.

Description of the proxy will be set to `commit <commit_hash> from
master branch by jenkins`.

## Continuous Delivery

Continuous Delivery may or may not work for you and your company-- often other internal teams want to test at various stages of the API
proxy SDLC.  In those situations, automatic promotion on succesful tests may not be the best option.
But if CD works for you and your company, this is 1 way it could work.

Once `currency-v1-master` job is completed successfully, it will automatically
merge `master` to `prod` branch which will trigger `currency-v1-prod` Jenkins
job.

Production job will deploy the bundle as `currency-v1` on `prod`
environment.

Description of the proxy will be set to `commit <commit_hash> from
master branch by jenkins`.
