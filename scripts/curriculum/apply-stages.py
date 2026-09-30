#!/usr/bin/env python3
"""Nối 37 chặng mới (30-66) từ scripts/curriculum/stage-NN.json vào:
   lib/track-stages.ts (TRACK_PERSONAL) và bản Việt/Anh của
   lib/i18n/dictionaries/sections/track-stages.ts.
Chạy một lần; từ chối chạy lại nếu "Chặng 30" đã có."""
import json, glob, sys, re
root = __file__.rsplit('/scripts/', 1)[0]
ms = sorted((json.load(open(f)) for f in glob.glob(f'{root}/scripts/curriculum/stage-*.json')), key=lambda m: m['stage'])
assert [m['stage'] for m in ms] == list(range(30, 67)), [m['stage'] for m in ms]
ts = open(f'{root}/lib/track-stages.ts').read()
if 'days: [2000, 2019]' in ts: sys.exit('đã nối các chặng mới - dừng')
q = lambda s: json.dumps(s, ensure_ascii=False)

stages = ''
for m in ms:
    a = m['idStart']
    parts = ',\n'.join(f'        {{ name: {q(p["vi"])}, days: [{a+5*i}, {a+5*i+4}] as [number, number] }}' for i, p in enumerate(m['parts']))
    stages += f'''    {{
      label: "Chặng {m['stage']}",
      name: {q(m['name']['vi'])},
      days: [{a}, {a+19}] as [number, number],
      available: true,
      isNew: true,
      parts: [
{parts},
      ],
    }},
'''
marker = '  ] satisfies Stage[],\n};'
i = ts.index(marker)
ts = ts[:i] + stages + ts[i:]
open(f'{root}/lib/track-stages.ts', 'w').write(ts)

dp = f'{root}/lib/i18n/dictionaries/sections/track-stages.ts'
d = open(dp).read()
def block(lang, prefix):
    out = ''
    for m in ms:
        parts = ', '.join(q(p[lang]) for p in m['parts'])
        out += f'''        {{
          label: "{prefix} {m['stage']}",
          name: {q(m['name'][lang])},
          parts: [{parts}],
        }},
'''
    return out
mk = '      ],\n    },\n    professional: {'
i1 = d.index(mk)
d = d[:i1] + block('vi', 'Chặng') + d[i1:]
i2 = d.index(mk, i1 + len(block('vi', 'Chặng')) + len(mk))
d = d[:i2] + block('en', 'Stage') + d[i2:]
open(dp, 'w').write(d)
print('đã nối', len(ms), 'chặng')
