#!/usr/bin/env
import json
from pprint import pprint
from pyquery import PyQuery as pq

with open('dataset.json') as data_file:    
    data = json.load(data_file)
nameset = set()
for baby in data:
	nameset.add(baby["name"])

relatedNames = {}
urlbase = 'https://www.behindthename.com/name/'

for name in nameset:

	try:
		html = pq(url=urlbase+name)
		info = html('.info_message').siblings().eq(1).text()

		if(info[0] == 'T') :
			html = pq(url=urlbase+name+"-1")
		#checking whether there are multiple entries for the name 

		cat = html('.namemain').eq(1).siblings().eq(6).text()
		if (cat == 'See All Relations Show Family Tree' ) : 
			relatedNames[name] = html('.namemain').eq(1).siblings().eq(7).text()
		elif (cat == 'Related Names' ) : 
			relatedNames[name] = html('.namemain').eq(1).siblings().eq(8).text()
		else :
			relatedNames[name] = ""
	except:
		relatedNames[name] = ""

pprint(relatedNames)
with open('RelatedNames.json', 'w') as f:
     json.dump(relatedNames, f)
