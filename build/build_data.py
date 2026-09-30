#!/usr/bin/env python3
import csv,io,json,os,re,sqlite3,urllib.request,urllib.parse,time
from concurrent.futures import ThreadPoolExecutor,as_completed
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); DATA=os.path.join(ROOT,"data"); os.makedirs(DATA,exist_ok=True)
URLS={"NGSL":"https://www.newgeneralservicelist.com/s/NGSL_12_stats.csv","TOEIC":"https://charliebrownecompany.squarespace.com/s/TSL_12_stats.csv","Business":"https://charliebrownecompany.squarespace.com/s/BSL_120_stats.csv"}
DB_URL="https://raw.githubusercontent.com/skypediacode/english-vietnamese-dictionary/main/dictionary_en_vi.db"
API_URL="https://dict.minhqnd.com/api/v1/lookup"
API_WORKERS=12
def download(url):
 req=urllib.request.Request(url,headers={"User-Agent":"VocabRecall/1.0"})
 with urllib.request.urlopen(req,timeout=120) as r:return r.read()
def rows(raw):
 rd=csv.DictReader(io.StringIO(raw.decode("utf-8-sig","replace"))); out=[]
items=list(words.values())
local_results={}
for x in items:
 x.update(local_lookup(x["word"]))
 local_results[x["word"].lower()]=dict(x)

def enrich_one(x):
 api=api_lookup(x["word"])
 return x,api

completed=0
with ThreadPoolExecutor(max_workers=API_WORKERS) as ex:
 futures=[ex.submit(enrich_one,x) for x in items]
 for fut in as_completed(futures):
  x,api=fut.result()
  if api.get("meaning"):
   x.update(api)
  completed+=1
  if completed%250==0:
   print("Meaning quality enrichment:",completed,"/",len(items))

for x in items:
 override=PRIMARY_OVERRIDES.get(x["word"].lower())
 if override:
  x["meaning"],x["pos"],x["example"]=override
 x["hint"]=x["word"][0]+"…"+x["word"][-1] if len(x["word"])>2 else x["word"]
 out.append(x)

json.dump(out,open(os.path.join(DATA,"words.json"),"w",encoding="utf-8"),ensure_ascii=False,separators=(",",":"));c.close();os.remove(db)
print("Generated",len(out),"words with API-backed Vietnamese primary meanings")
