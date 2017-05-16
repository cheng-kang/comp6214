#!/usr/bin/env
import json
from pprint import pprint
from pyquery import PyQuery as pq

with open('dataset.json') as data_file:    
    data = json.load(data_file)
nameset = set()
for baby in data:
	nameset.add(baby["name"])

meaning = {}
urlbase = 'https://www.behindthename.com/name/'

for name in nameset:

	try:
		html = pq(url=urlbase+name)
		info = html('.info_message').siblings().eq(1).text()
	
		if(info[0] == 'T') :
			html = pq(url=urlbase+name+"-1")
		#checking whether there are multiple entries for the name 

		div = html('.namemain').eq(1).siblings().eq(5).text()
		if (div == 'Related Names' or div == 'Popularity' ) : 
			meaning[name] = html('.namemain').eq(1).siblings().eq(4).text()
		else:
			meaning[name] = div
	except:
		meaning[name] = ""

pprint(meaning)
with open('Meanings.json', 'w') as f:
     json.dump(meaning, f)
