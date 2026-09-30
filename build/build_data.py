#!/usr/bin/env python3
import csv,io,json,os,re,sqlite3,urllib.request
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); DATA=os.path.join(ROOT,"data"); os.makedirs(DATA,exist_ok=True)
URLS={"NGSL":"https://www.newgeneralservicelist.com/s/NGSL_12_stats.csv","TOEIC":"https://charliebrownecompany.squarespace.com/s/TSL_12_stats.csv","Business":"https://charliebrownecompany.squarespace.com/s/BSL_120_stats.csv"}
DB_URL="https://raw.githubusercontent.com/skypediacode/english-vietnamese-dictionary/main/dictionary_en_vi.db"
def download(url):
 req=urllib.request.Request(url,headers={"User-Agent":"VocabRecall/1.0"})
 with urllib.request.urlopen(req,timeout=120) as r:return r.read()
def rows(raw):
 rd=csv.DictReader(io.StringIO(raw.decode("utf-8-sig","replace"))); out=[]
 for row in rd:
  v={str(k).strip():(str(x).strip() if x is not None else "") for k,x in row.items()}
  w=v.get("Lemma") or v.get("Word") or ""
  if not w or not re.match(r"^[A-Za-z][A-Za-z' -]*$",w):continue
  rk=next((v[k] for k in ("SFI Rank","TSL Rank","BSL Rank","Rank") if v.get(k)),"999999")
  try:rk=int(float(rk))
  except:rk=999999
  out.append((w.lower(),w,rk))
 return out
lists={k:rows(download(u)) for k,u in URLS.items()}; print({k:len(v) for k,v in lists.items()})
words={}
for src,rs in lists.items():
 for key,w,r in rs:
  x=words.setdefault(key,{"word":w,"sets":[],"ngsl_rank":None});x["sets"].append(src)
  if src=="NGSL":x["ngsl_rank"]=r
for x in words.values():
 r=x["ngsl_rank"]; x["sets"].append("A1" if r and r<=600 else "B1" if r and r<=1300 else "B2" if r and r<=2000 else "C1" if r and r<=2500 else "C2")
db=os.path.join(DATA,"dictionary_en_vi.db");open(db,"wb").write(download(DB_URL));c=sqlite3.connect(db);q=c.cursor()
def lookup(w):
 q.execute("SELECT id FROM words WHERE lower(word)=lower(?) LIMIT 1",(w,));a=q.fetchone()
 if not a:return {}
 wid=a[0]
 q.execute("SELECT d.definition,d.pos,wd.example FROM word_definitions wd JOIN definitions d ON d.id=wd.definition_id WHERE wd.word_id=? AND d.definition_lang='vi' ORDER BY d.id LIMIT 1",(wid,));d=q.fetchone()
 q.execute("SELECT ipa FROM pronunciations WHERE word_id=? ORDER BY CASE WHEN upper(region) IN ('US','GENERAL-AMERICAN','GA','AMERICAN') THEN 0 ELSE 1 END,id LIMIT 1",(wid,));p=q.fetchone()
 return {"meaning":d[0] if d else "","pos":d[1] if d else "","example":d[2] if d else "","ipa":p[0] if p else ""}
out=[]
for x in words.values():
 x.update(lookup(x["word"]));x["hint"]=x["word"][0]+"…"+x["word"][-1] if len(x["word"])>2 else x["word"];out.append(x)
json.dump(out,open(os.path.join(DATA,"words.json"),"w",encoding="utf-8"),ensure_ascii=False,separators=(",",":"));c.close();os.remove(db)
print("Generated",len(out),"words")
