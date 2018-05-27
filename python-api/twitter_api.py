# -*- coding: utf-8 -*-

from flask import Flask
app = Flask(__name__)

from requests_oauthlib import OAuth1Session
import json
import os
from flask_cors import CORS
from flask import request

CORS(app)

DEFAULT_PAGE_LIMIT = 10

def oath_session():
    oath = OAuth1Session(
        os.getenv("CONSUMER_KEY"),
        os.getenv("CONSUMER_SECRET"),
        os.getenv("ACCESS_TOKEN"),
        os.getenv("ACCESS_TOKEN_SECRET")
    )
    return oath

def tweet_search_by_word(word, limit, max_id, since_id):
    limit = DEFAULT_PAGE_LIMIT if limit is None else limit
    url = "https://api.twitter.com/1.1/search/tweets.json?"
    params = {
        "q": unicode(word),
        "lang": "en",
        "result_type": "recent",
        "count": limit
    }
    if max_id is not None:
        params['max_id'] = max_id
    elif since_id is not None:
        params['since_id'] = since_id
    return tweet_search(url, params)

def tweet_search_by_screen_name(screen_name, limit, max_id, since_id):
    limit = DEFAULT_PAGE_LIMIT if limit is None else limit
    url = "https://api.twitter.com/1.1/statuses/user_timeline.json"
    params = {
        "screen_name": unicode(screen_name),
        "lang": "en", 
        "result_type": "recent",
        "count": limit
    }
    if max_id is not None:
        params['max_id'] = max_id
    elif since_id is not None:
        params['since_id'] = since_id
    return tweet_search(url, params)

def tweet_search(url, params):
    responce = oath_session().get(url, params = params)
    if responce.status_code != 200:
        print "Error code: %d" %(responce.status_code)
        return None
    tweets = json.loads(responce.text)
    return tweets

def tweet_detail(tweet):
        hashtag_entities = tweet[u'entities'][u'hashtags']
        hashtags = map(lambda x: x[u'text'], hashtag_entities)
        detail = {
            'account': {
                'fullname': tweet[u'user'][u'name'],
                'href': '/' + tweet[u'user'][u'screen_name'],
                'id': tweet[u'user'][u'id']
            },
            'date': tweet[u'created_at'],
            'hashtags': hashtags,
            'likes': tweet[u'favorite_count'],
            'retweets': tweet[u'retweet_count'],
            'text': tweet[u'text'],
            'id': tweet[u'id'] # Altough this isn't used for displaying, it needs for pagination.
        }
        return detail

@app.route('/')
def hello():
    name = "Hello World"
    return os.getenv("CONSUMER_KEY", "http://qiita.com")

@app.route('/hashtags/<string:word>', methods=['GET'])
def hashtags(word):
    page_limit = request.args.get('page_limit')
    max_id = request.args.get('max_id')
    since_id = request.args.get('since_id')

    search_hashtag = '#' + word
    tweets = tweet_search_by_word(search_hashtag, page_limit, max_id, since_id)
    result = [tweet_detail(tweet) for tweet in tweets[u"statuses"]]

    return json.dumps(result, ensure_ascii=False)

@app.route('/users/<string:screen_name>', methods=['GET'])
def users(screen_name):
    page_limit = request.args.get('page_limit')
    max_id = request.args.get('max_id')
    since_id = request.args.get('since_id')

    tweets = tweet_search_by_screen_name(screen_name, page_limit, max_id, since_id)
    result = [tweet_detail(tweet) for tweet in tweets]
    return json.dumps(result, ensure_ascii=False)

if __name__ == "__main__":
    app.run(debug=True)
