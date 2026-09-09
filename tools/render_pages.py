"""논문 PDF를 페이지 이미지(WebP)로 렌더링. macOS Quartz 만 사용, 외부 패키지 없음.
사용: python3 tools/render_pages.py [폭px=1100] [webp|jpg] [품질=0.6] → pages/<파일명>/p001.jpg ... + pages/index.json"""
import sys, os, glob, json
import Quartz, CoreFoundation
from Quartz import CGPDFDocumentCreateWithURL, CGPDFDocumentGetNumberOfPages, CGPDFDocumentGetPage, CGPDFPageGetBoxRect, kCGPDFMediaBox
from Quartz import CGBitmapContextCreate, CGColorSpaceCreateDeviceRGB, kCGImageAlphaNoneSkipLast, CGContextSetRGBFillColor, CGContextFillRect, CGContextDrawPDFPage, CGBitmapContextCreateImage, CGContextScaleCTM, CGContextSetInterpolationQuality, kCGInterpolationHigh, CGRectMake
from Quartz import CGBitmapContextGetData, CGBitmapContextGetBytesPerRow
from PIL import Image
W = int(sys.argv[1]) if len(sys.argv) > 1 else 1100
FMT = sys.argv[2] if len(sys.argv) > 2 else "webp"  # webp | jpg
Q = float(sys.argv[3]) if len(sys.argv) > 3 else 0.6
index = {}
for pdf in sorted(glob.glob("papers/*.pdf")):
    name = os.path.splitext(os.path.basename(pdf))[0]
    out = os.path.join("pages", name); os.makedirs(out, exist_ok=True)
    doc = CGPDFDocumentCreateWithURL(CoreFoundation.CFURLCreateFromFileSystemRepresentation(None, pdf.encode(), len(pdf.encode()), False))
    n = CGPDFDocumentGetNumberOfPages(doc); sizes = []
    for i in range(1, n + 1):
        page = CGPDFDocumentGetPage(doc, i); box = CGPDFPageGetBoxRect(page, kCGPDFMediaBox)
        s = W / box.size.width; H = int(round(box.size.height * s))
        ctx = CGBitmapContextCreate(None, W, H, 8, W * 4, CGColorSpaceCreateDeviceRGB(), kCGImageAlphaNoneSkipLast)
        CGContextSetRGBFillColor(ctx, 1, 1, 1, 1); CGContextFillRect(ctx, CGRectMake(0, 0, W, H))
        CGContextSetInterpolationQuality(ctx, kCGInterpolationHigh); CGContextScaleCTM(ctx, s, s); CGContextDrawPDFPage(ctx, page)
        path = os.path.join(out, f"p{i:03d}.{FMT}")
        buf = bytes(CGBitmapContextGetData(ctx).as_buffer(CGBitmapContextGetBytesPerRow(ctx) * H))
        im = Image.frombuffer("RGBX", (W, H), buf, "raw", "RGBX", CGBitmapContextGetBytesPerRow(ctx), 1).convert("L")
        im.save(path, quality=int(Q * 100), method=4) if FMT == "webp" else im.save(path, quality=int(Q * 100), optimize=True)
        sizes.append(os.path.getsize(path))
    index[name] = {"pages": n, "w": W, "h": H, "fmt": FMT, "bytes": sum(sizes)}
    print(name, n, "pages", sum(sizes) // 1024, "KB", "avg", sum(sizes) // n // 1024, "KB")
json.dump(index, open("pages/index.json", "w"), separators=(",", ":"))
