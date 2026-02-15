---
name: slide-lecture-workflow
version: 1.0.0
description: |
  Turn slide images (PNG/JPG) into a continuous long-form bilingual (ZH lecture + EN follow-up) teaching script.
  Pipeline: open image -> verbatim transcription -> (optional OCR) -> knowledge-point grouping -> long lecture generation -> global stitching -> embed source images.
triggers:
  - "把PPT逐页生成讲稿"
  - "逐页生成中英双语讲义"
  - "slide to lecture"
  - "OCR课件生成笔记"
---

# Slide -> Long Lecture Script Workflow

## Scope

Use when the user has:

- Slide images per page (e.g. exported from PPT/PDF)
- Wants long-form teaching script: professor + patient TA
- Wants Chinese main lecture + English follow-up (mirrored, shorter)

## Non-Negotiable Guardrails (Anti-Hallucination)

For **every** slide:

1) **Must open the exact image** via IDE tool `read_file` on the absolute image path.
2) **Must output a raw transcription** (“原文抄录”) from what is visible on the slide.
   - Include title line(s)
   - Include all bullet lines / sentence lines
   - If the slide is mostly an illustration, transcribe all visible text and then state: `No more readable text on this slide.`
3) **Verification gate**: if any text is not readable with confidence, output `UNSURE` and ask for a clearer image.
   - Do not generate the lecture script for that slide until readable input is available.
4) OCR (e.g., PaddleOCR) is **optional**. If OCR is used, it must be explicitly stated in the output for that slide.

## Prerequisites (Windows)

- Python available:

```powershell
python --version
```

- Ollama available:

```powershell
ollama --version
ollama list
```

- A text model installed in Ollama (default: `deepseek-r1:latest`).

- Install Python deps (first time only):

```powershell
python -m pip install -U pip
python -m pip install paddleocr==2.7.3 pillow==10.4.0 requests==2.32.3 tqdm==4.66.5
```

Notes:

- PaddleOCR on Windows will pull additional dependencies. If it fails, switch to the fallback OCR option in the runner script.

## Inputs

- A root folder containing lecture folders. Each lecture folder contains images:

Examples:

- `D:\A\1Senior\DDA4210\DDA4210 Lecture 01 Introduction(1)\*.png`

## Outputs

Under `<root>\_output\<lecture_name>\`:

- `slides.jsonl` (OCR text per page)
- `01_lecture_script_bilingual.md` (single markdown per lecture; grouped by knowledge points; includes embedded source slide images)
- `01_lecture_script_bilingual.polished.md` (optional global stitching)
- `03_glossary_bilingual.csv`
- `02_exam-pack.md`

## Image Embedding (Required)

After a lecture markdown is finished, embed **all** source slide images into the markdown in appropriate positions (grouped by knowledge point). This is a non-negotiable audit trail:

- For every slide used, the markdown must include a `![Slide XX](relative/path/to/slide.png)` image link.
- Prefer placing images under a `#### 原图` subsection right after `#### 原文抄录`.

If embedding is not possible (paths unknown), stop and ask for the correct relative path; do not silently skip.

## Per-slide Output Format (Required)

Each slide section must include the verbatim transcription before the lecture:

```md
## Slide {n}: {title}

### 原文抄录 (Verbatim)
- ...

### 讲解 (中文长讲)
...

### English follow-up
...

### 你可能卡住的点（TA提醒）
...

### 即时补课（只补够用的前置）
...

### 考试怎么考（得分点）
...

### 本页术语（CN / EN / 1句解释）
- ...
```

## Knowledge-Point Grouping (Recommended)

Instead of one markdown per slide, group consecutive slides into coherent knowledge points:

- Each knowledge point typically spans 2-6 slides.
- Group boundaries usually occur when:
  - The slide title changes to a new topic
  - The slide shifts from “overview/logistics” to “technical content”
  - A summary/transition slide appears

## Sample (copy/paste)

```md
### Knowledge Point N: <一句话概括>（Slides a–b）

#### 原文抄录 (Verbatim)

**Slide a — <title>**
- ...

**Slide b — <title>**
- ...

#### 原图 (Slides a–b)

![Slide a](../../<lecture_folder>/<lecture>_a.png)
![Slide b](../../<lecture_folder>/<lecture>_b.png)

#### 讲解 (中文长讲)
...

#### English follow-up
...

#### 你可能卡住的点（TA提醒）
...

#### 即时补课（只补够用的前置）
...

#### 考试怎么考（得分点）
...

#### 本页术语（CN / EN / 1句解释）
- ...
```

## How to run (recommended)

1) Validate toolchain:

```powershell
python --version
ollama list
```

2) Run a small sample first:

```powershell
python D:\A\1Senior\DDA4210\slide_lecture_workflow.py --root "D:\A\1Senior\DDA4210" --lecture "DDA4210 Lecture 01 Introduction(1)" --start 1 --end 2
```

3) Then run the whole lecture:

```powershell
python D:\A\1Senior\DDA4210\slide_lecture_workflow.py --root "D:\A\1Senior\DDA4210" --lecture "DDA4210 Lecture 01 Introduction(1)"
```

4) Then run all lectures:

```powershell
python D:\A\1Senior\DDA4210\slide_lecture_workflow.py --root "D:\A\1Senior\DDA4210"
```

## Generation rules

- Chinese main lecture: 800-1500 chars per slide.
- English follow-up: 200-500 words per slide.
- Every slide must include:
  - Bridge from previous slide (ZH + EN)
  - TA warnings: likely confusion points
  - Just-enough prerequisite补课
  - Exam-oriented Q&A angles + scoring points
  - Bridge to next slide

## Safety / privacy

- Do not upload files externally by default.
- All processing is local (OCR + Ollama).
