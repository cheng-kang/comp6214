#!/usr/bin/env
from pyquery import PyQuery as pq

html = pq(url=u'https://www.behindthename.com/name/john')
div = html('.namemain').eq(1).siblings().eq(5).text()

print div