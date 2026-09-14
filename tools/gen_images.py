"""이미지 일괄 생성 (한 번 뽑아 저장소에 넣는다. 방문자 요청 시 생성하지 않음).
사용: XAI_API_KEY=... python3 tools/gen_images.py [--only wall|covers] [--force]
입력 img/prompts.json, 출력 img/<file> (WebP). 이미 있는 파일은 --force 없으면 건너뜀."""
import json, os, sys, base64, urllib.request, io
from PIL import Image
key = os.environ.get("XAI_API_KEY") or (open(os.path.expanduser("~/.xai_key")).read().strip() if os.path.exists(os.path.expanduser("~/.xai_key")) else None)
if not key: sys.exit("XAI_API_KEY 환경변수 또는 ~/.xai_key 가 필요합니다")
cfg = json.load(open("img/prompts.json"))
only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
force = "--force" in sys.argv
for it in cfg["images"]:
    out = os.path.join("img", it["file"])
    if only and not it["file"].startswith(only): continue
    if os.path.exists(out) and not force: print("skip", out); continue
    body = json.dumps({"model": cfg["model"], "prompt": f'{it["prompt"]}. Style: {cfg["style"]}', "n": 1, "response_format": "b64_json"}).encode()
    req = urllib.request.Request("https://api.x.ai/v1/images/generations", data=body, headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r: data = json.load(r)
    im = Image.open(io.BytesIO(base64.b64decode(data["data"][0]["b64_json"]))).convert("RGB")
    w = 1920 if it["file"].startswith("wall") else 800
    im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    im.save(out, "WEBP", quality=78, method=5)
    print("ok", out, os.path.getsize(out) // 1024, "KB")
