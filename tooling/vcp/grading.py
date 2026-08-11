from __future__ import annotations

def grade_assertions(assertions:list[str], observed:dict[str,bool]) -> dict:
    rows=[]
    for a in assertions:
        ok=bool(observed.get(a,False)); rows.append({'assertion':a,'pass':ok})
    passed=sum(r['pass'] for r in rows)
    status='PASS' if passed==len(rows) else ('PARTIAL' if passed else 'FAIL')
    return {'status':status,'passed':passed,'total':len(rows),'assertions':rows}
