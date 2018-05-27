# Angular Twitter Test API

## Setup

Install following packages.

```
$ pip install Flask
$ pip install requests requests_oauthlib
```

Define following environmental variables of twitter api

* CONSUMER_KEY
* CONSUMER_SECRET
* ACCESS_TOKEN
* ACCESS_TOKEN_SECRET

You can get them by https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens.html


## Run server

```
$ cd {application_root}/python-api
$ python twitter_api.py
$ cd {application_root}/angular-app
$ ng serve --open

```


## Additional Information

* CSS almost isn't defined, yet.
* As reply count cannot get as ordinal way by official api, implementaion related to reply coun was skipped.
