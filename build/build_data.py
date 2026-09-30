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
    ("American Oxford 3000","https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/American_Oxford_3000.pdf"),
    ("American Oxford 5000","https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/American_Oxford_5000.pdf"),
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
    p=p.rstrip(".").strip()
    if "modal v" in p or "auxiliary" in p or p in ("v","verb"):
        return "V"
    if "adj" in p or p=="adjective":
        return "A"
    if "adv" in p or p=="adverb":
        return "ADV"
    if p in ("n","noun"):
        return "N"
    if "prep" in p or p=="preposition":
        return "PREP"
    if "conj" in p or p=="conjunction":
        return "CONJ"
    if "pron" in p or p=="pronoun":
        return "PRON"
    if "det" in p or p=="determiner" or "article" in p:
        return "DET"
    if "exclam" in p or p=="exclamation":
        return "EXCL"
    if "number" in p:
        return "NUM"
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
    pos_pat=r"(?:adj\.?|adv\.?|n\.?|v\.?|prep\.?|conj\.?|pron\.?|det\.?|exclam\.?|number|ordinal number|modal v\.?|modal verb|auxiliary v\.?|auxiliary verb)"
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
    fallback_level=(
        "A1" if r and r<=600 else
        "B1" if r and r<=1300 else
        "B2" if r and r<=2000 else
        "C1" if r and r<=2500 else
        "C2"
    )
    x["frequency_level"]=fallback_level
    x["sets"].append(preferred_oxford_level.get(x["word"].lower(),fallback_level))

oxford_pos={}
for list_name,url in OXFORD_URLS:
    parsed=parse_oxford_pdf(download(url),list_name)
    for key,recs in parsed.items():
        oxford_pos.setdefault(key,[]).extend(recs)

# For a word with several Oxford parts of speech, prefer the POS introduced at
# the lowest CEFR level. This mirrors a learner-first priority without copying
# Oxford definitions into the app.
preferred_oxford_pos={}
preferred_oxford_level={}
for key,recs in oxford_pos.items():
    recs=sorted(recs,key=lambda r:(r[0],0 if "3000" in r[1] else 1,r[2]))
    preferred_oxford_pos[key]=recs[0][2]
    preferred_oxford_level[key]=recs[0][3]

db=os.path.join(DATA,"dictionary_en_vi.db")
open(db,"wb").write(download(DB_URL))
c=sqlite3.connect(db)
q=c.cursor()

# Learner-first primary meanings for the most frequent NGSL words.
# These are original short Vietnamese glosses, not copied dictionary text.
# They intentionally replace misleading/rare first senses from legacy source data.
PRIMARY_OVERRIDES={
    "the":("Mạo từ xác định; dùng trước người/vật đã xác định.","DET"),
    "be":("Là; thì; ở.","V"),
    "and":("Và.","CONJ"),
    "of":("Của; về.","PREP"),
    "to":("Đến; tới; để.","PREP"),
    "a":("Một; một cái/người nào đó.","DET"),
    "in":("Trong; ở trong; vào.","PREP"),
    "have":("Có.","V"),
    "it":("Nó; điều đó.","PRON"),
    "you":("Bạn; anh/chị; các bạn.","PRON"),
    "he":("Anh ấy; ông ấy; nó (giống đực).","PRON"),
    "for":("Cho; dành cho; đối với.","PREP"),
    "they":("Họ; chúng.","PRON"),
    "not":("Không.","ADV"),
    "that":("Đó; kia; rằng.","DET"),
    "we":("Chúng tôi; chúng ta.","PRON"),
    "on":("Trên; ở trên; vào (ngày/thời điểm).","PREP"),
    "with":("Với; cùng với; bằng.","PREP"),
    "this":("Này; cái này; điều này.","DET"),
    "i":("Tôi.","PRON"),
    "do":("Làm; thực hiện.","V"),
    "as":("Như; khi; vì.","PREP"),
    "at":("Ở; tại; vào (thời gian).","PREP"),
    "she":("Cô ấy; bà ấy; nó (giống cái).","PRON"),
    "but":("Nhưng.","CONJ"),
    "from":("Từ; xuất phát từ.","PREP"),
    "by":("Bởi; bằng; gần.","PREP"),
    "will":("Sẽ.","V"),
    "or":("Hoặc; hay.","CONJ"),
    "say":("Nói; bảo; cho biết.","V"),
    "go":("Đi; đi đến.","V"),
    "so":("Rất; như vậy; vì thế.","ADV"),
    "all":("Tất cả; mọi.","DET"),
    "if":("Nếu.","CONJ"),
    "one":("Một; một người/vật.","NUM"),
    "would":("Sẽ (trong câu điều kiện hoặc lời nói gián tiếp).","V"),
    "about":("Về; khoảng; xung quanh.","PREP"),
    "can":("Có thể.","V"),
    "which":("Nào; cái nào; điều nào.","PRON"),
    "there":("Ở đó; có.","ADV"),
    "know":("Biết; hiểu.","V"),
    "more":("Nhiều hơn; thêm.","DET"),
    "get":("Có được; nhận được; trở nên.","V"),
    "who":("Ai; người nào.","PRON"),
    "like":("Thích; muốn.","V"),
    "when":("Khi nào; khi.","ADV"),
    "think":("Nghĩ; suy nghĩ.","V"),
    "make":("Làm; tạo ra.","V"),
    "time":("Thời gian; lần.","N"),
    "see":("Thấy; nhìn thấy; xem.","V"),
    "what":("Gì; cái gì; điều gì.","PRON"),
    "up":("Lên; ở trên; dậy.","ADV"),
    "some":("Một vài; một ít; một số.","DET"),
    "other":("Khác.","A"),
    "out":("Ra ngoài; ở ngoài.","ADV"),
    "good":("Tốt; hay; tuyệt.","A"),
    "people":("Người; mọi người.","N"),
    "year":("Năm.","N"),
    "take":("Lấy; cầm; mang.","V"),
    "no":("Không; không có.","DET"),
    "well":("Tốt; khỏe; tốt đẹp.","ADV"),
    "because":("Bởi vì; vì.","CONJ"),
    "very":("Rất.","ADV"),
    "just":("Chỉ; vừa mới; đúng.","ADV"),
    "come":("Đến; tới.","V"),
    "could":("Có thể (quá khứ của can).","V"),
    "work":("Làm việc; công việc.","N"),
    "use":("Dùng; sử dụng.","V"),
    "than":("Hơn; so với.","CONJ"),
    "now":("Bây giờ; hiện tại.","ADV"),
    "then":("Sau đó; lúc đó; khi ấy.","ADV"),
    "also":("Cũng.","ADV"),
    "into":("Vào; vào trong.","PREP"),
    "only":("Chỉ; duy nhất; mới.","ADV"),
    "look":("Nhìn; xem.","V"),
    "want":("Muốn.","V"),
    "give":("Cho; đưa; tặng.","V"),
    "first":("Đầu tiên; thứ nhất.","ADV"),
    "new":("Mới.","A"),
    "way":("Cách; phương pháp; con đường.","N"),
    "find":("Tìm; tìm thấy.","V"),
    "over":("Trên; hơn; qua.","PREP"),
    "any":("Bất kỳ; nào.","DET"),
    "after":("Sau; sau khi.","PREP"),
    "day":("Ngày.","N"),
    "where":("Ở đâu; nơi nào.","ADV"),
    "thing":("Cái; vật; điều; việc.","N"),
    "most":("Nhất; phần lớn.","ADV"),
    "should":("Nên; cần phải.","V"),
    "need":("Cần; nhu cầu.","V"),
    "much":("Nhiều; rất nhiều.","DET"),
    "right":("Đúng; phải; bên phải.","A"),
    "how":("Như thế nào; làm sao.","ADV"),
    "back":("Lưng; phía sau; trở lại.","N"),
    "mean":("Có nghĩa là; có ý muốn nói.","V"),
    "even":("Thậm chí; ngay cả; đều.","ADV"),
    "may":("Có thể; có lẽ; được phép.","V"),
    "here":("Ở đây; đây.","ADV"),
    "many":("Nhiều; nhiều người/vật.","DET"),
    "such":("Như vậy; như thế; loại như vậy.","DET"),
    "add":("Thêm; thêm vào; cộng.","V"),
    "which":("Nào; cái nào; điều nào.","PRON"),
    "off":("Tắt; rời khỏi; nghỉ.","ADV"),
    "why":("Tại sao; vì sao.","ADV"),
    "account":("Tài khoản; sự tường thuật; bản kê khai.","N"),
    "office":("Văn phòng; phòng làm việc.","N"),
    "leave":("Rời đi; bỏ đi; để lại.","V"),
    "business":("Kinh doanh; công việc; doanh nghiệp.","N"),
    "service":("Dịch vụ; sự phục vụ.","N"),
    "support":("Sự hỗ trợ; sự ủng hộ.","N"),
    "issue":("Vấn đề; số báo; phát hành.","N"),
    "action":("Hành động; hoạt động.","N"),
    "control":("Kiểm soát; sự kiểm soát.","N"),
    "concern":("Sự quan tâm; lo lắng; mối quan tâm.","N"),
    "view":("Cảnh; quan điểm; cách nhìn.","N"),
    "reach":("Đến; đạt tới; với tới.","V"),
    "pass":("Đi qua; vượt qua; đỗ.","V"),
    "save":("Cứu; tiết kiệm; lưu.","V"),
    "heart":("Tim; trái tim.","N"),
    "culture":("Văn hóa.","N"),
    "mention":("Đề cập; nhắc đến.","V"),
    "security":("An ninh; an toàn; bảo mật.","N"),
    "front":("Phía trước; mặt trước.","N"),
    "black":("Đen; màu đen.","A"),
    "sell":("Bán.","V"),
    "party":("Bữa tiệc; nhóm; đảng.","N"),
    "breakfast":("Bữa sáng.","N"),
    "lunch":("Bữa trưa.","N"),
    "dinner":("Bữa tối; bữa ăn chính trong ngày.","N"),
    "supper":("Bữa tối; bữa ăn tối không trang trọng.","N"),
    "meal":("Bữa ăn.","N")
}

PRIMARY_EXAMPLE_OVERRIDES={
    "the":"The book is on the table.",
    "be":"I want to be a project manager.",
    "have":"I have two children.",
    "do":"I do my work every morning.",
    "go":"We go to work at eight.",
    "get":"I need to get some coffee.",
    "make":"Let's make a plan.",
    "see":"I can see the problem now.",
    "good":"That was a very good movie.",
    "take":"Please take this document to the meeting.",
    "come":"Please come to my office.",
    "work":"I work from Monday to Friday.",
    "use":"Can I use your laptop?",
    "look":"Look at this example.",
    "want":"I want to improve my English.",
    "give":"Please give me a minute.",
    "find":"I need to find the right answer.",
    "need":"We need more time.",
    "back":"Please come back tomorrow.",
    "mean":"What does this word mean?",
    "may":"May I ask a question?",
    "add":"Please add your name to the list.",
    "account":"I opened a new bank account.",
    "office":"I am working in the office today.",
    "leave":"I have to leave the office at six.",
    "business":"She works for a small business.",
    "service":"The hotel provides excellent service.",
    "support":"Thank you for your support.",
    "issue":"We need to discuss this issue.",
    "action":"We need to take action now.",
    "control":"The manager has control of the project.",
    "concern":"Customer safety is our main concern.",
    "view":"The hotel has a beautiful view.",
    "reach":"We need to reach our target.",
    "pass":"I hope I can pass the exam.",
    "save":"Please save the file before you close it.",
    "heart":"My heart is beating fast.",
    "culture":"I enjoy learning about Vietnamese culture.",
    "mention":"She did not mention the problem.",
    "security":"Data security is very important.",
    "front":"Please wait in front of the building.",
    "black":"He is wearing a black shirt.",
    "sell":"They sell cars in Hanoi.",
    "party":"We had a small party last night.",
    "breakfast":"I have breakfast at seven.",
    "lunch":"I usually have lunch at noon.",
    "dinner":"We are having dinner at a nice restaurant.",
    "supper":"We had an early supper tonight.",
    "meal":"We had a good meal at the restaurant."
}

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
    text=re.sub(r"^\s*\([^)]*\)\s*","",text)
    text=re.sub(r"^\s*\+[^)]*\)\s*","",text)
    text=re.sub(r"\s{2,}"," ",text).strip()
    text=re.sub(r"^[,;:\-\+]\s*","",text)
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
    override=PRIMARY_OVERRIDES.get(w.lower())
    q.execute("SELECT id FROM words WHERE lower(word)=lower(?) LIMIT 1",(w,))
    a=q.fetchone()

    # Some frequent function words may be missing from the source dictionary.
    # Keep curated learner meanings even when the local DB has no exact entry.
    if not a:
        if override:
            return {
                "meaning":override[0],
                "pos":override[1],
                "example":PRIMARY_EXAMPLE_OVERRIDES.get(w.lower(),""),
                "ipa":"",
                "oxford_level":preferred_oxford_level.get(w.lower(),""),
                "oxford_pos":preferred_oxford_pos.get(w.lower(),""),
            }
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

    ox_pos=preferred_oxford_pos.get(w.lower())
    selected=None

    if override:
        meaning,pos=override
        example=PRIMARY_EXAMPLE_OVERRIDES.get(w.lower(),"")
    else:
        if ox_pos:
            selected=next((s for s in candidates if pos_key(s[1])==ox_pos),None)

        if selected is None and candidates:
            selected=candidates[0]

        if selected:
            meaning=clean_meaning(selected[0] or "")
            pos=ox_pos or (selected[1] or "")
            example=selected[2] or ""
        else:
            meaning=pos=example=""

        if ox_pos:
            pos=ox_pos

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
        "oxford_level":preferred_oxford_level.get(w.lower(),""),
        "oxford_pos":preferred_oxford_pos.get(w.lower(),""),
    }
out=[]
for x in words.values():
    x.update(lookup(x["word"]))
    x["cefr_level"]=x.get("oxford_level") or x.get("frequency_level","")
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
