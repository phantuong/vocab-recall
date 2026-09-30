#!/usr/bin/env python3
import csv,io,json,os,re,sqlite3,urllib.request

ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA=os.path.join(ROOT,"data")
os.makedirs(DATA,exist_ok=True)

URLS={
    "NGSL":"https://www.newgeneralservicelist.com/s/NGSL_12_stats.csv",
    "TOEIC":"https://charliebrownecompany.squarespace.com/s/TSL_12_stats.csv",
    "Business":"https://charliebrownecompany.squarespace.com/s/BSL_120_stats.csv",
}
DB_URL="https://raw.githubusercontent.com/skypediacode/english-vietnamese-dictionary/main/dictionary_en_vi.db"

# Oxford is used only as a build-time reference for part-of-speech/sense
# prioritisation. We do not copy Oxford definitions, examples, audio or the
# Oxford word-list itself into the public app data.
OXFORD_URLS=[
    ("Oxford 3000","https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/The_Oxford_3000.pdf"),
    ("Oxford 5000","https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/The_Oxford_5000.pdf"),
]

def download(url):
    req=urllib.request.Request(url,headers={"User-Agent":"VocabRecall/1.0"})
    with urllib.request.urlopen(req,timeout=120) as r:
        return r.read()

def rows(raw):
    rd=csv.DictReader(io.StringIO(raw.decode("utf-8-sig","replace")))
    out=[]
    for row in rd:
        v={str(k).strip():(str(x).strip() if x is not None else "") for k,x in row.items()}
        w=v.get("Lemma") or v.get("Word") or ""
        if not w or not re.match(r"^[A-Za-z][A-Za-z' -]*$",w):
            continue
        rk=next((v[k] for k in ("SFI Rank","TSL Rank","BSL Rank","Rank") if v.get(k)),"999999")
        try:
            rk=int(float(rk))
        except:
            rk=999999
        out.append((w.lower(),w,rk))
    return out

def norm_oxford_pos(pos):
    p=(pos or "").lower().strip()
    if "modal v" in p or "auxiliary" in p or p in ("v","verb"):
        return "V"
    if "adj" in p or p=="adjective":
        return "A"
    if "adv" in p or p=="adverb":
        return "ADV"
    if p in ("n","n.","noun"):
        return "N"
    if "prep" in p or p=="preposition":
        return "PREP"
    if "conj" in p or p=="conjunction":
        return "CONJ"
    if "pron" in p or p=="pronoun":
        return "PRON"
    if "det" in p or p=="determiner":
        return "DET"
    if "exclam" in p or p=="exclamation":
        return "EXCL"
    return ""

def parse_oxford_pdf(raw, list_name):
    # pypdf is installed by the GitHub Actions workflow.
    from pypdf import PdfReader
    reader=PdfReader(io.BytesIO(raw))
    text="\n".join(page.extract_text() or "" for page in reader.pages)
    text=text.replace("\u00a0"," ")
    out={}
    levels={"A1":1,"A2":2,"B1":3,"B2":4,"C1":5}
    # The official PDFs put each entry on one line, ending with one or more
    # POS/CEFR pairs, e.g. "good adj. A1" or "academic adj.B1, n. B2".
    pos_pat=r"(?:adj\.?|adv\.?|n\.?|v\.?|prep\.?|conj\.?|pron\.?|det\.?|exclam\.?|number|modal v\.?|auxiliary v\.?)"
    pair_re=re.compile(r"("+pos_pat+r")\s*([ABC][12])")
    for raw_line in text.splitlines():
        line=re.sub(r"\s+"," ",raw_line).strip()
        line=re.sub(r"© Oxford University Press.*$","",line).strip()
        if not line or line.startswith("The Oxford") or line.startswith("©"):
            continue
        matches=list(pair_re.finditer(line))
        if not matches:
            continue
        first=matches[0]
        word=line[:first.start()].strip(" -–—")
        if not word:
            continue
        # Remove Oxford's homonym markers such as close1/content1/can1.
        word=re.sub(r"(?<=[A-Za-z])\d+$","",word).strip()
        # Ignore explanatory parenthetical qualifiers for the lookup key.
        key=re.sub(r"\s*\([^)]*\)","",word).strip().lower()
        if not re.match(r"^[a-z][a-z' -]*$",key):
            continue
        for m in matches:
            pos=norm_oxford_pos(m.group(1))
            level=m.group(2).upper()
            if not pos:
                continue
            rec=(levels[level], list_name, pos, level)
            out.setdefault(key,[]).append(rec)
    return out

lists={k:rows(download(u)) for k,u in URLS.items()}
print({k:len(v) for k,v in lists.items()})

words={}
for src,rs in lists.items():
    for key,w,r in rs:
        x=words.setdefault(key,{"word":w,"sets":[],"ngsl_rank":None})
        x["sets"].append(src)
        if src=="NGSL":
            x["ngsl_rank"]=r

for x in words.values():
    r=x["ngsl_rank"]
    # Keep the existing frequency bands as a fallback classification.
    x["sets"].append(
        "A1" if r and r<=600 else
        "B1" if r and r<=1300 else
        "B2" if r and r<=2000 else
        "C1" if r and r<=2500 else
        "C2"
    )

oxford_pos={}
for list_name,url in OXFORD_URLS:
    parsed=parse_oxford_pdf(download(url),list_name)
    for key,recs in parsed.items():
        oxford_pos.setdefault(key,[]).extend(recs)

# For a word with several Oxford parts of speech, prefer the POS introduced at
# the lowest CEFR level. This mirrors a learner-first priority without copying
# Oxford definitions into the app.
preferred_oxford_pos={}
for key,recs in oxford_pos.items():
    recs=sorted(recs,key=lambda r:(r[0],0 if r[1]=="Oxford 3000" else 1,r[2]))
    preferred_oxford_pos[key]=recs[0][2]

db=os.path.join(DATA,"dictionary_en_vi.db")
open(db,"wb").write(download(DB_URL))
c=sqlite3.connect(db)
q=c.cursor()

def clean_meaning(text):
    text=(text or "").strip()

    def repl(m):
        inner=m.group(1).strip()
        low=inner.lower()
        english_usage={"up","together","with","to","in","on","off","out","back","over","under","from","into","for"}
        tokens=re.findall(r"[a-z]+",low)
        if "+" in inner or (tokens and not re.search(r"[à-ỹ]",inner) and any(t in english_usage for t in tokens)):
            return ""
        return m.group(0)

    text=re.sub(r"\(([^()]*)\)",repl,text)
    text=re.sub(r"\s{2,}"," ",text).strip()
    text=re.sub(r"^[,;:\-]\s*","",text)
    return text

def pos_key(pos):
    p=(pos or "").strip().upper()
    return {
        "ADJ":"A","ADJECTIVE":"A",
        "ADV":"ADV","ADVERB":"ADV",
        "VERB":"V","V":"V",
        "NOUN":"N","N":"N",
        "PREP":"PREP","PREPOSITION":"PREP",
        "CONJ":"CONJ","CONJUNCTION":"CONJ",
        "PRON":"PRON","PRONOUN":"PRON",
        "DET":"DET","DETERMINER":"DET",
        "EXCL":"EXCL","EXCLAMATION":"EXCL",
    }.get(p,p)

def lookup(w):
    q.execute("SELECT id FROM words WHERE lower(word)=lower(?) LIMIT 1",(w,))
    a=q.fetchone()
    if not a:
        return {}
    wid=a[0]
    q.execute("""SELECT d.definition,d.pos,wd.example,d.id
                 FROM word_definitions wd
                 JOIN definitions d ON d.id=wd.definition_id
                 WHERE wd.word_id=? AND d.definition_lang='vi'
                 ORDER BY d.id""",(wid,))
    senses=q.fetchall()
    candidates=[s for s in senses if clean_meaning(s[0])]
    if not candidates:
        candidates=senses

    selected=None
    ox_pos=preferred_oxford_pos.get(w.lower())
    if ox_pos:
        selected=next((s for s in candidates if pos_key(s[1])==ox_pos),None)

    if selected is None and candidates:
        selected=candidates[0]

    if selected:
        meaning=clean_meaning(selected[0] or "")
        pos=selected[1] or ""
        example=selected[2] or ""
    else:
        meaning=pos=example=""

    q.execute(
        "SELECT ipa FROM pronunciations WHERE word_id=? "
        "ORDER BY CASE WHEN upper(region) IN "
        "('US','GENERAL-AMERICAN','GA','AMERICAN') THEN 0 ELSE 1 END,id LIMIT 1",
        (wid,)
    )
    p=q.fetchone()
    return {
        "meaning":meaning,
        "pos":pos,
        "example":example,
        "ipa":p[0] if p else "",
    }

out=[]
for x in words.values():
    x.update(lookup(x["word"]))
    x["hint"]=(
        x["word"][:1]+"…"+x["word"][-1:] if len(x["word"])<=4 else
        x["word"][:2]+"…"+x["word"][-1:] if len(x["word"])<=7 else
        x["word"][:3]+"…"+x["word"][-1:]
    )
    out.append(x)

json.dump(out,open(os.path.join(DATA,"words.json"),"w",encoding="utf-8"),ensure_ascii=False,separators=(",",":"))
c.close()
os.remove(db)

print("Oxford POS references:",len(preferred_oxford_pos))
print("Generated",len(out),"words")
