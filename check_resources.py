import requests
import sys

# Pixel Lab v9.5 Resource Validator
# 이 스크립트는 app.py에 정의된 리소스들이 실제로 서버에 존재하는지 검사합니다.

# app.py의 VALID 상수와 동일하게 정의 (실제 app.py 파싱 대신 하드코딩으로 확실성 확보)
VALID = { 
    'char': [
        's_m_base.png', 's_f_base.png', 
        'skin_m_001.png', 'skin_m_002.png', 'skin_m_003.png', 'skin_m_004.png', 'skin_m_005.png', 'skin_m_006.png', 'skin_m_007.png', 'skin_m_008.png',
        'skin_f_001.png', 'skin_f_002.png', 'skin_f_003.png', 'skin_f_004.png', 'skin_f_005.png', 'skin_f_006.png', 'skin_f_007.png', 'skin_f_008.png'
    ], 
    'bg': [
        'bg_001.png', 'bg_002.png', 'bg_003.png', 'bg_004.png', 'bg_005.png',
        'bg_006.png', 'bg_007.png', 'bg_008.png', 'bg_009.png', 'bg_010.png',
        'bg_011.png', 'bg_012.png', 'bg_013.png', 'bg_014.png', 'bg_015.png', 'bg_016.png', 'bg_017.png',
        'bg_018.png', 'bg_019.png', 'bg_020.png',
        'bg_021.png', 'bg_022.png', 'bg_023.png', 'bg_024.png'
    ] 
}

BASE_URL = "http://localhost:8080"

def check_resources():
    print(f"🔍 Pixel Lab Resource Verification Started...")
    print(f"📡 Target Server: {BASE_URL}")
    
    missing_files = []
    total_files = 0
    
    # 1. 서버 생존 확인
    try:
        r = requests.get(BASE_URL)
        if r.status_code == 200:
            print("✅ Server is RUNNING.")
        else:
            print(f"❌ Server responsed with {r.status_code}")
            return
    except Exception as e:
        print(f"❌ Cannot connect to server: {e}")
        return

    # 2. 리소스 전수 검사
    for category, files in VALID.items():
        print(f"\n📂 Checking {category} ({len(files)} files)...")
        for f in files:
            total_files += 1
            url = f"{BASE_URL}/{f}"
            try:
                res = requests.head(url) # HEAD 요청으로 헤더만 확인 (효율성)
                if res.status_code == 200:
                    print(f"  [OK] {f}")
                else:
                    print(f"  [FAIL] {f} (Status: {res.status_code})")
                    missing_files.append(f)
            except Exception as e:
                print(f"  [ERR] {f} : {e}")
                missing_files.append(f)

    print("\n" + "="*30)
    if not missing_files:
        print(f"🎉 ALL PASSED! Total {total_files} resources verified.")
        sys.exit(0)
    else:
        print(f"⚠️ FOUND {len(missing_files)} MISSING FILES:")
        for mf in missing_files:
            print(f" - {mf}")
        sys.exit(1)

if __name__ == "__main__":
    check_resources()
