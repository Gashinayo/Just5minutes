// [Resource Configuration] 가챠 시스템에서 활용될 전체 리소스 목록
// 디렉토리에 존재하는 모든 파일을 매핑하여 수집의 재미를 극대화함
const VALID = {
    char: [
        's_m_base.png', 's_f_base.png',
        'skin_m_001.png', 'skin_m_002.png', 'skin_m_003.png', //'skin_m_004.png', 'skin_m_005.png', 'skin_m_006.png', 'skin_m_007.png', 'skin_m_008.png',
        'skin_f_001.png', 'skin_f_002.png', 'skin_f_003.png', //'skin_f_004.png', 'skin_f_005.png', 'skin_f_006.png', 'skin_f_007.png', 'skin_f_008.png'
    ],
    bg: [
        'bg_000.png', 'bg_001.png', 'bg_002.png', 'bg_003.png', //'bg_004.png', 'bg_005.png',
        // 'bg_006.png', 'bg_007.png', 'bg_008.png', 'bg_009.png', 'bg_010.png',
        // 'bg_011.png', 'bg_012.png', 'bg_013.png', 'bg_014.png', 'bg_015.png', 'bg_016.png', 'bg_017.png',
        // 'bg_018.png', 'bg_019.png', 'bg_020.png',
        // 'bg_021.png', 'bg_022.png', 'bg_023.png', 'bg_024.png'
    ]
};
// [Achievement System] 40 Custom Titles based on User Request
const achDefs = {
    1: { t: '[집중의 첫걸음]', d: '첫 예열 5분 성공' },
    2: { t: '[3분의 지배자]', d: '3분 몰입 3회 달성' },
    3: { t: '[뽀모도로 달인]', d: '25분 연속 집중 성공' },
    4: { t: '[시공간 술사]', d: '1시간 연속 집중 성공' },
    5: { t: '[부동의 석상]', d: '2시간 연속 집중 성공' },
    6: { t: '[강철 엉덩이]', d: '누적 집중 10시간 달성' },
    7: { t: '[몰입의 마라토너]', d: '42분 19초 세션 달성 (마라톤 거리)' },
    8: { t: '[0초 오차의 신]', d: '정각(00초)에 중단' },
    9: { t: '[기록 파괴자]', d: '최고 집중 기록 경신' },
    10: { t: '[자린고비]', d: '10,000P 보유 달성' },
    11: { t: '[반가운 뉴비]', d: '첫 접속' },
    12: { t: '[습관의 시작]', d: '3일 연속 접속' },
    13: { t: '[성실한 모험가]', d: '7일 연속 접속' },
    14: { t: '[출석 만렙]', d: '30일 누적 접속' },
    15: { t: '[새벽을 여는 자]', d: '오전 5~8시 사이 시작' },
    16: { t: '[밤의 파수꾼]', d: '밤 11시 이후 시작' },
    17: { t: '[휴일의 전사]', d: '토/일 연속 접속' },
    18: { t: '[돌아온 탕아]', d: '7일 만에 재접속' },
    19: { t: '[출근 도장 쾅]', d: '하루 5회 앱 실행' },
    20: { t: '[시간의 지배자]', d: '누적 100시간 집중' },
    21: { t: '[멋쟁이 신사]', d: '첫 스킨 장착' },
    22: { t: '[옷장 주인]', d: '캐릭터 10종 보유' },
    23: { t: '[공간 디자이너]', d: '배경 5종 보유' },
    24: { t: '[황금 손]', d: '가챠에서 새로운 스킨 획득' },
    25: { t: '[플렉스 마스터]', d: '누적 5,000P 소모' },
    26: { t: '[복제 인간]', d: '중복 스킨 3회 연속 획득' },
    27: { t: '[풀소유]', d: '모든 아이템(24종) 수집' },
    28: { t: '[깔맞춤의 정석]', d: '배경과 캐릭터 동시 변경' },
    29: { t: '[무소유]', d: '포인트 0원 만들기' },
    30: { t: '[가챠 중독자]', d: '연속 5번 뽑기 시도' },
    31: { t: '[간발의 차이]', d: '4분 59초에 중단' },
    32: { t: '[초광속 포기]', d: '시작 1초 만에 중단' },
    33: { t: '[한국인입니다]', d: '예열 중 버튼 5회 연타' },
    34: { t: '[미루기 끝판왕]', d: '23:59에 중단' },
    35: { t: '[캐릭터 조련사]', d: '드래그 100회 돌파' },
    36: { t: '[마우스 학대범]', d: '누적 클릭 1,000회' },
    37: { t: '[자유로운 영혼]', d: '화면 구석에 캐릭터 배치' },
    38: { t: '[침묵의 수행자]', d: '10분간 화면 조작 없음' },
    39: { t: '[오뚝이]', d: '중단 후 1분 내 재시작' },
    40: { t: '[몰입의 성인]', d: '칭호 35개 이상 수집' }
};

// [v10.4] Safe Parsing Helper
function safeParse(key, defaultVal) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultVal;
    } catch (e) {
        console.error(`Error parsing ${key}:`, e);
        return defaultVal;
    }
}

// [v11.2] Date Helper (Local Time YYYY-MM-DD)
function getLocalISODate(d = new Date()) {
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().split('T')[0];
}

// [v10.2] Helper for Consecutive Days
function isConsecutive(lastDateStr) {
    if (!lastDateStr) return false;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    return lastDateStr === yesterday;
}


// Global Variables Declaration
// [v15.0] Quest & Event System Data
let quests;
let feverEndTime = 0; // Timestamp when fever ends
let stats, ownedAchs, current, owned, pts;
let run = false, isDeepWork = false, sec = 300, deepWorkSec = 0, interval, idleTimer, subTab = 'char';
let gachaTimer = null;
let toastTimer = null; // [v16.2] Toast Timer Conflict Fix
let startupTime = Date.now(), lastStopTime = 0, clickSession = 0;
// [v10.3] Session Earnings
let sessionEarned = 0;

function initApp() {
    console.log("Initializing App...");
    // [v10.4 Safe Load] Use safeParse
    stats = safeParse('stats_v2', {
        totalMin: 0, maxSec: 0, totalClicks: 0, totalSpent: 0,
        consecutiveDays: 0, lastLogin: '', totalLogins: 0, dailyStarts: 0, dailyEarned: 0,
        threeMinCount: 0, dupStreak: 0, gachaStreak: 0,
        history: {} // [v11.2] Date: Minutes map
    });
    if (!stats.history) stats.history = {};

    // [v15.0] Quest Data Initialization
    const defaultQuests = {
        daily: { checkIn: false, focus25: false, lucky: false, lastReset: '' },
        weekly: { progressMin: 0, claimedSteps: [], lastReset: '' },
        inventory: { feverItem: 0 },
        feverEndTime: 0
    };
    quests = safeParse('quests', defaultQuests);

    // [Fix] Validation: Ensure structure exists (prevent crash if incomplete data in LS)
    if (!quests || !quests.daily || !quests.weekly || !quests.inventory) {
        console.warn("Invalid Quests Data detected. Resetting.");
        quests = defaultQuests;
    }

    checkQuests(); // Initialize/Reset Quests based on Date
    feverEndTime = quests.feverEndTime || 0; // Sync global var



    // Migration Logic
    if (stats.dailyEarned === undefined) stats.dailyEarned = 0;
    if (!stats.totalMin && localStorage.getItem('stats')) {
        const old = safeParse('stats', {});
        stats.totalMin = old.weeklyTime || 0;
        stats.maxSec = old.maxFocus || 0;
        stats.consecutiveDays = old.consecutive || 0;
    }

    ownedAchs = safeParse('ownedAchs', []);
    current = safeParse('current', { char: 's_m_base.png', bg: 'bg_000.png', title: '', titlePos: 'top', titleColor: '#FFD700' });

    // [v17.2] Restore UI Color (Moved to after current is defined)
    setUiBoxColor(current.uiColor, current.uiOpacity);

    // [CRITICAL FIX] Restore 'owned' to Object structure
    const defaultOwned = { char: ['s_m_base.png', 's_f_base.png'], bg: ['bg_000.png', 'bg_001.png', 'bg_002.png', 'bg_003.png'] };
    owned = safeParse('owned', defaultOwned);

    // [Migration] Fix if owned became an Array by mistake
    if (Array.isArray(owned)) {
        console.warn("Corrupted 'owned' detected. Migrating...");
        // Split items into char and bg based on prefix
        const recovered = { char: [], bg: [] };
        owned.forEach(item => {
            if (item.startsWith('bg_')) recovered.bg.push(item);
            else recovered.char.push(item);
        });
        // Merge with defaults to ensure basics exist
        defaultOwned.char.forEach(i => { if (!recovered.char.includes(i)) recovered.char.push(i); });
        defaultOwned.bg.forEach(i => { if (!recovered.bg.includes(i)) recovered.bg.push(i); });
        owned = recovered;
        localStorage.setItem('owned', JSON.stringify(owned));
    }

    pts = parseInt(localStorage.getItem('pts') || 0);

    // [v11.1] Audio Engine Init
    SFX.init();

    // Reset daily logic
    const today = new Date().toDateString();
    if (stats.lastLogin !== today) {
        if (isConsecutive(stats.lastLogin)) {
            stats.consecutiveDays++;
            if (stats.consecutiveDays === 3) unlockDirect(12);
            if (stats.consecutiveDays === 7) { unlockDirect(13); earnPoints(1000); alert("7일 연속 출석! 1000P 획득!"); }
            if (stats.consecutiveDays === 30) unlockDirect(14);
            // [v15.0] Weekend Warrior Logic could go here
        } else {
            if (stats.lastLogin && (new Date() - new Date(stats.lastLogin)) > 7 * 86400000) unlockDirect(18);
            stats.consecutiveDays = 1;
        }
        stats.dailyStarts = 0;
        stats.dailyEarned = 0;
        stats.lastLogin = today;
    }
    stats.totalLogins++;
    if (stats.totalLogins === 1) unlockDirect(11);

    // [v15.0] Daily Quest: Check-in
    if (!quests.daily.checkIn) {
        quests.daily.checkIn = true;
        earnPoints(100, true); // Silent earn, show updated UI later
        saveQuests();
    }

    saveStats();
    updateDisp();
    renderSkins(); // [Fix] Correct function name
    renderAchs(); // [Fix] Correct function name (was loadAchUI)
    document.getElementById('pos-' + current.titlePos).classList.add('active');
    document.getElementById('title-color-picker').value = current.titleColor;

    // [v14.0] Setup Drag Events
    const cc = document.getElementById('char-container');
    if (cc) {
        cc.addEventListener('mousedown', startDrag);
        cc.addEventListener('touchstart', startDrag, { passive: false });
    }

    // [v15.0] Render Quest UI
    renderQuestUI();
    setInterval(updateFeverUI, 1000); // Ticking logic for UI

    // [Initialization UI]
    updateAestheticUI();
    updateStatsUI();
    updateDisp();
    checkAchievements();
    resetIdleTimer();
    updateSFXUI(); // [v11.1] Init SFX UI

    // [v10.3] Restore Point Status UI if applicable (initial hidden)
    const dps = document.getElementById('daily-point-status');
    if (dps) dps.style.display = 'none';
}

function checkDailyAchs() {
    if (stats.consecutiveDays >= 3) unlockDirect(12);
    if (stats.consecutiveDays === 7) {
        unlockDirect(13);
        addPts(1000);
        // [v10.2 Fix] Alert 대신 Toast 사용 (Non-blocking)
        showToast("🎉 7일 연속 출석! 1000P 지급!", "꾸준함의 보상입니다.");
    }
    else if (stats.consecutiveDays > 7) unlockDirect(13);
    if (stats.totalLogins >= 30) unlockDirect(14);
    const day = new Date().getDay();
    if ((day === 0 || day === 6) && stats.consecutiveDays >= 2) unlockDirect(17);
}

function checkAchievements() {
    // 시간/기록
    if ((stats.totalMin / 60) >= 10) unlockDirect(6);
    if ((stats.totalMin / 60) >= 100) unlockDirect(20);
    if (deepWorkSec >= 3600) unlockDirect(4); // 현 세션 기준
    if (deepWorkSec >= 7200) unlockDirect(5);

    // 자산
    if (pts >= 10000) unlockDirect(10);
    if (stats.totalSpent >= 5000) unlockDirect(25);
    if (pts === 0) unlockDirect(29);

    // 수집
    if (owned.char.length >= 10) unlockDirect(22);
    if (owned.bg.length >= 5) unlockDirect(23);
    if ((owned.char.length + owned.bg.length) >= 44) unlockDirect(27); // 전체(24+20) 달성 근사치

    // 기타
    if (stats.totalClicks >= 1000) unlockDirect(36);
    if (ownedAchs.length >= 35) unlockDirect(40);
}

// Idle Checker
// [v10.2 Fix] Event Listener Pattern (No Conflicts)
// [v10.2 Fix] Event Listener Pattern (No Conflicts)
// idleTimer is declared in Global Scope now
function resetIdleTimer() { clearTimeout(idleTimer); idleTimer = setTimeout(() => unlockDirect(38), 600000); }
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('click', () => {
    SFX.init(); // [v11.1] Ensure AudioContext is ready (Autoplay Policy)
    stats.totalClicks++;
    if (!run && !isDeepWork) { clickSession++; if (clickSession >= 5) unlockDirect(33); }
    SFX.play('click'); // [v11.1] Click SFX
    saveStats(); checkAchievements();
    resetIdleTimer();
});

function setTitlePos(pos) { current.titlePos = pos; saveCurrent(); updateAestheticUI(); renderAchs(); }
function setTitleColor(color) { current.titleColor = color; saveCurrent(); updateAestheticUI(); }
function handleAchClick(id) {
    if (ownedAchs.includes(Number(id))) equipTitle(id);
    else alert(`🔒 [해금 힌트]

${achDefs[id].d}`);
}
function equipTitle(id) { current.title = achDefs[id].t; saveCurrent(); updateAestheticUI(); renderAchs(); }
function saveCurrent() { localStorage.setItem('current', JSON.stringify(current)); }
function updateAestheticUI() {
    document.getElementById('app').style.backgroundImage = `url('${current.bg}')`;
    document.getElementById('main-char').src = current.char;
    const tag = document.getElementById('char-title-tag');
    document.documentElement.style.setProperty('--title-color', current.titleColor);
    document.getElementById('title-color-picker').value = current.titleColor;
    if (current.title && current.titlePos !== 'none') {
        tag.innerText = current.title; tag.style.display = 'block';
        if (current.titlePos === 'top') { tag.style.top = '7px'; tag.style.bottom = 'auto'; }
        else { tag.style.top = 'auto'; tag.style.bottom = '12px'; }
    } else { tag.style.display = 'none'; }
    document.querySelectorAll('.pos-btn').forEach(b => b.classList.toggle('active', b.id === 'pos-' + current.titlePos));
}

function skinSub(s) { subTab = s; document.getElementById('sm-char').classList.toggle('active', s === 'char'); document.getElementById('sm-bg').classList.toggle('active', s === 'bg'); renderSkins(); }
function renderSkins() {
    const list = document.getElementById('skin-list');
    list.innerHTML = owned[subTab].map(item => `
        <div class="skin-item ${current[subTab] === item ? 'selected' : ''}" onclick="applySkin('${item}')">
            <img src="${item}">
        </div>`).join('');
}
function applySkin(i) {
    current[subTab] = i; unlockDirect(21);
    // 깔맞춤 (동시 변경을 감지하긴 어려우므로 최근 변경 시간 등으로... 혹은 단순히 둘 다 변경 이력이 있으면 인정? 여기선 단순 트리거로)
    if (stats.totalClicks > 10) unlockDirect(28); // 대략적인 조건으로 완화
    saveCurrent(); updateAestheticUI(); renderSkins();
}

function start() {
    const now = new Date();
    const h = now.getHours();
    if (h >= 5 && h < 8) unlockDirect(15);
    if (h >= 23) unlockDirect(16);

    // 재시작 체크
    if (Date.now() - lastStopTime < 60000) unlockDirect(39); // 오뚝이

    if (run) {
        clearInterval(interval); run = false; lastStopTime = Date.now();
        // [v10.3] Session Summary in Modal
        const resEarn = document.getElementById('res-earn');
        const encEarn = document.getElementById('enc-earn');
        if (resEarn) resEarn.innerText = `이번 획득: ${sessionEarned} P`;
        if (encEarn) encEarn.innerText = `이번 획득: ${sessionEarned} P`;

        // 중단 로직
        if (!isDeepWork) {
            if (sec === 299) unlockDirect(32); // 초광속
            if (sec === 1) unlockDirect(31); // 4:59 (남은시간 1초)
        } else {
            // 몰입 중 중단
            const s = now.getSeconds();
            if (s === 0) unlockDirect(8); // 정각 중단
            const m = now.getMinutes();
            if (h === 23 && m === 59) unlockDirect(34); // 미루기 끝판왕

            if (deepWorkSec >= 1500) { if (++stats.threeMinCount >= 3) unlockDirect(2); }
            stats.threeMinCount++; if (stats.threeMinCount >= 3) unlockDirect(2);

            // 기록 경신
            if (deepWorkSec > stats.maxSec) { stats.maxSec = deepWorkSec; unlockDirect(9); }

            // 마라토너
            if (deepWorkSec === 2539) unlockDirect(7); // 42분 19초
            if (deepWorkSec >= 1500) {
                unlockDirect(3); // 25분 (Achievement)
                triggerFever();  // [v15.0] Daily Quest & Fever Item
            }
        }
        // [v10.4 Fix] Use showResult for proper time display
        if (isDeepWork) showResult();
        else showModal('encourage-modal');

        if (!isDeepWork) clickSession = 0;
    } else {
        run = true; sessionEarned = 0; // [v10.3] Reset Session
        const dps = document.getElementById('daily-point-status');
        if (dps) dps.style.display = 'none';

        document.getElementById('p-timer').classList.add('is-running'); runEngine();
        SFX.play('start'); // [v11.1] Start SFX
    }
    saveStats();
}

function runEngine() {
    clearInterval(interval);
    interval = setInterval(() => {
        if (!isDeepWork) {
            if (sec > 0) {
                sec--;
            } else {
                isDeepWork = true;
                document.getElementById('time').setAttribute('data-burning', 'true');
                document.body.classList.add('deep-work-mode'); // [v12.0] Visual Polish

                // [v10.3] Show Point Status
                const dps = document.getElementById('daily-point-status');
                if (dps) dps.style.display = 'block';
                updateDailyPointUI();

                unlockDirect(1);
                SFX.play('beep'); // [v11.1] Deep Work Entry SFX
            }
        } else {
            deepWorkSec++;
            // [v10.4 Fix] 10초당 1P 지급 (즉각적 보상)
            if (deepWorkSec % 10 === 0) earnPoints(1);

            if (deepWorkSec % 60 === 0) {
                stats.totalMin++;
                // [v11.2] Update History
                const todayKey = getLocalISODate();
                stats.history[todayKey] = (stats.history[todayKey] || 0) + 1;

                // [v15.0] Weekly Quest Progress
                quests.weekly.progressMin++;
                saveQuests();
                renderQuestUI(); // Update Progress Bar

                // earnPoints(10); // Removed (replaced by 10s rule)
                saveStats(); checkAchievements();
            }
        }
        updateDisp();
    }, 1000);
}

function startGacha() {
    // 1. Point Check
    if (pts < 500) return alert('포인트가 부족합니다! (500P 필요)');

    // [2024-01-29] Base items excluded from pool
    const baseItems = ['s_m_base.png', 's_f_base.png', 'bg_000.png', 'bg_001.png'];
    let pool = VALID[subTab].filter(i => !baseItems.includes(i));

    // [v10.2 Pity System] 중복 4회 이상 시 확정 해금
    if (stats.dupStreak >= 4) {
        const newItems = pool.filter(i => !owned[subTab].includes(i));
        if (newItems.length > 0) {
            pool = newItems;
            showToast("✨ 천장 발동!", "이번엔 무조건 새로운 아이템이 나옵니다!");
        }
    }

    stats.gachaStreak++; if (stats.gachaStreak >= 5) unlockDirect(30);

    pts -= 500; stats.totalSpent += 500; saveStats(); updateStatsUI(); checkAchievements();

    showModal('gacha-modal');
    document.getElementById('gacha-waiting').style.display = 'block';
    document.getElementById('gacha-result-view').style.display = 'none';

    setTimeout(() => {
        document.getElementById('gacha-waiting').style.display = 'none';

        const res = pool[Math.floor(Math.random() * pool.length)];
        const isDup = owned[subTab].includes(res);

        if (isDup) {
            // Duplicate: Refund 100P
            pts += 100;
            stats.dupStreak++; if (stats.dupStreak >= 3) unlockDirect(26);
            document.getElementById('res-name').innerText = `${res.replace('.png', '')} (중복! 100P 반환)`;
            document.getElementById('res-img').src = res;
            saveStats(); updateStatsUI();
        } else {
            // New Item
            stats.dupStreak = 0;
            owned[subTab].push(res);
            localStorage.setItem('owned', JSON.stringify(owned));
            unlockDirect(24);
            document.getElementById('res-name').innerText = `${res.replace('.png', '')} (NEW!)`;
            document.getElementById('res-img').src = res;
        }

        document.getElementById('gacha-result-view').style.display = 'block';
        checkAchievements(); renderSkins();
    }, 2500);
}

// [v10.2] Non-blocking Toast (Updated v16.2 for Custom Icons)
function showToast(title, desc, icon = '🏆') {
    const el = document.getElementById('ach-toast');
    if (!el) return;

    // [v16.2] Clear existing timer to prevent flashing
    if (toastTimer) {
        clearTimeout(toastTimer);
        toastTimer = null;
    }

    const iconEl = document.getElementById('toast-icon');
    if (iconEl) iconEl.innerText = icon;

    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-desc').innerText = desc;
    el.style.top = '20px'; // Show

    // [v16.2] Click to dismiss handled by HTML onclick, but auto-hide here
    toastTimer = setTimeout(() => {
        el.style.top = '-180px'; // Hide
    }, 3000); // 3 seconds
}

// [v16.2] Manual Dismiss
function hideToast() {
    const el = document.getElementById('ach-toast');
    if (el) el.style.top = '-180px';
    if (toastTimer) clearTimeout(toastTimer);
}

// [New] Verification Cheats
function cheat(type) {
    if (!confirm('검증용 치트를 실행하시겠습니까? (로직 테스트용)')) return;
    switch (type) {
        case 'clicks': stats.totalClicks += 1000; break;
        case 'time': stats.totalMin += 600; deepWorkSec += 36000; break; // +10 hours
        case 'offline': stats.lastLogin = new Date(Date.now() - 86400000 * 8).toDateString(); break;
        case 'points': pts += 50000; break;
        case 'chart':
            for (let i = 0; i < 7; i++) {
                const d = new Date(); d.setDate(d.getDate() - i);
                const k = getLocalISODate(d);
                stats.history[k] = Math.floor(Math.random() * 60) + 10;
            }
            break;
    }
    saveStats(); updateStatsUI(); checkAchievements(); alert('치트 적용 완료!');
}
function tab(t) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); document.querySelectorAll('.nav div').forEach(d => d.classList.remove('active'));
    document.getElementById('p-' + t).classList.add('active'); document.getElementById('t-' + t).classList.add('active');
    document.getElementById('char-container').style.display = (t === 'timer' || t === 'skin' ? 'flex' : 'none');
    if (t === 'skin') renderSkins(); if (t === 'achs') renderAchs();
    if (t === 'stats') renderDashboard(); // [v17.0] Render Dashboard
    updateStatsUI();
}
function renderAchs() {
    document.getElementById('ach-container').innerHTML = Object.keys(achDefs).map(i => {
        const isUnlocked = ownedAchs.includes(Number(i));
        const isEquipped = current.title === achDefs[i]?.t;
        return `
        <div class="ach-item ${isUnlocked ? 'unlocked' : ''} ${isEquipped ? 'equipped' : ''}" onclick="handleAchClick(${i})">
            ${isUnlocked ? `
                <b>${achDefs[i]?.t}</b>
                <span style="font-size:9px; color:#aaa;">${achDefs[i]?.d}</span>
            ` : `
                <div style="font-size:20px; opacity:0.5;">🔒</div>
                <span style="font-size:9px; color:#555;">잠긴 칭호</span>
            `}
        </div>`;
    }).join('');
}
function updateDisp() { const d = isDeepWork ? deepWorkSec : sec; document.getElementById('time').innerText = `${Math.floor(d / 60).toString().padStart(2, '0')}:${(d % 60).toString().padStart(2, '0')}`; }
function showModal(id) { document.getElementById(id).classList.add('active'); }
function hideModal(id) { document.getElementById(id).classList.remove('active'); }
// [v10.4 Fix] Resume Logic
function handleResult(type) { hideModal('result-modal'); if (type === 'reset') resetTimerUI(); else resumeTimer(); }
function handleEncourage(type) { hideModal('encourage-modal'); if (type === 'continue') resumeTimer(); else resetTimerUI(); }

function resumeTimer() {
    if (run) return;
    run = true;
    document.getElementById('p-timer').classList.add('is-running');
    runEngine();
}

function resetTimerUI() {
    clearInterval(interval); run = false; isDeepWork = false; sec = 300; deepWorkSec = 0;
    document.getElementById('time').setAttribute('data-burning', 'false');
    document.body.classList.remove('deep-work-mode'); // [v12.0] Visual Polish
    document.getElementById('p-timer').classList.remove('is-running');
    const dps = document.getElementById('daily-point-status');
    if (dps) dps.style.display = 'none';
    updateDisp();
}
function showResult() { const total = (300 - sec) + deepWorkSec; document.getElementById('final-time').innerText = `${Math.floor(total / 60).toString().padStart(2, '0')}:${(total % 60).toString().padStart(2, '0')}`; showModal('result-modal'); }
function warpTime(amt) {
    if (!run) return;
    if (!isDeepWork) {
        sec = Math.max(0, sec - amt);
        if (sec === 0) {
            isDeepWork = true;
            document.getElementById('time').setAttribute('data-burning', 'true');
            document.body.classList.add('deep-work-mode'); // [v12.0] Visual Polish
            unlockDirect(1);
        }
    } else {
        deepWorkSec += amt;
    }
    updateDisp();
}
function addPts(amt) { pts += amt; saveStats(); updateStatsUI(); checkAchievements(); }
// [v10.2 Economy]
// [v10.3] Earn Points with Session Tracking
// [v15.0] Fever Multiplier
function earnPoints(amt, force = false) {
    if (!force && stats.dailyEarned >= 3000) return;

    // Fever Logic
    if (Date.now() < feverEndTime) {
        amt *= 2;
    }

    let realAmt = amt;
    if (!force && stats.dailyEarned + amt > 3000) realAmt = 3000 - stats.dailyEarned;

    stats.dailyEarned += realAmt;
    sessionEarned += realAmt;
    addPts(realAmt);
    updateDailyPointUI();
}
function updateDailyPointUI() {
    const el = document.getElementById('daily-point-status');
    if (el) {
        el.innerText = `Today: ${stats.dailyEarned} / 3000 P`;
        el.style.display = 'block';
    }
}
function watchAd(type) { alert("광고 시스템 준비 중..."); }

function unlockDirect(id) { id = Number(id); if (!ownedAchs.includes(id)) { ownedAchs.push(id); localStorage.setItem('ownedAchs', JSON.stringify(ownedAchs)); showAchNotify(id); saveStats(); updateAestheticUI(); updateStatsUI(); SFX.play('success'); } }
function showAchNotify(id) {
    const ach = achDefs[id] || { t: '새로운 업적!', d: '도감을 확인하세요.' };
    showToast(ach.t, ach.d);
}
function saveStats() { localStorage.setItem('stats_v2', JSON.stringify(stats)); localStorage.setItem('pts', pts); }
// [v17.0] Fixed: Removed obsolete stats-display
function updateStatsUI() {
    // document.getElementById('stats-display').innerHTML = ... (Removed)

    // Update Global Points (Visible in Skin Tab)
    const uiPts = document.getElementById('ui-pts');
    if (uiPts) uiPts.innerText = pts;

    const sdp = document.getElementById('skin-daily-pts');
    if (sdp) sdp.innerText = stats.dailyEarned;
}
function resetAll() { if (confirm("초기화?")) { localStorage.clear(); location.reload(); } }
function cheatPoints() {
    stats.dailyEarned = 2999;
    showToast("🧪 치트 활성화", "일일 포인트가 2999P로 설정되었습니다. 1P만 더 얻으면 한도!");
    saveStats(); updateDailyPointUI(); updateStatsUI();
}
// [v11.1] SFX UI Helper
function toggleSFX() {
    const isMuted = SFX.toggle();
    updateSFXUI();
}
function updateSFXUI() {
    const btn = document.getElementById('btn-sfx-toggle');
    if (!btn) return;
    btn.innerText = SFX.muted ? "OFF" : "ON";
    btn.style.background = SFX.muted ? "#444" : "var(--blue)";
    // Don't play click sound here to avoid annoyance when muting
    if (!SFX.muted) SFX.play('click');
}

// [v11.3] Data Backup & Restore
function exportData() {
    const data = {
        version: 'v11.3',
        date: new Date().toISOString(),
        stats: JSON.parse(localStorage.getItem('stats_v2') || '{}'),
        pts: Number(localStorage.getItem('pts') || 0),
        owned: JSON.parse(localStorage.getItem('owned') || '{}'),
        ownedAchs: JSON.parse(localStorage.getItem('ownedAchs') || '[]'),
        current: JSON.parse(localStorage.getItem('current') || '{}'),
        sfx_muted: localStorage.getItem('sfx_muted')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixellab_backup_${getLocalISODate()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("💾 백업 완료", "데이터가 안전하게 저장되었습니다.");
    SFX.play('success');
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            // Validation (Check essential keys)
            if (!data.stats || !data.owned || !data.ownedAchs) {
                throw new Error("Invalid Backup File");
            }

            if (!confirm(`[데이터 복구]\n백업 일자: ${data.date}\n\n현재 데이터를 덮어쓰시겠습니까?`)) {
                input.value = ''; // Reset input
                return;
            }

            // Restore
            localStorage.setItem('stats_v2', JSON.stringify(data.stats));
            localStorage.setItem('pts', data.pts);
            localStorage.setItem('owned', JSON.stringify(data.owned));
            localStorage.setItem('ownedAchs', JSON.stringify(data.ownedAchs));
            localStorage.setItem('current', JSON.stringify(data.current));
            if (data.sfx_muted !== null) localStorage.setItem('sfx_muted', data.sfx_muted);

            alert("복구가 완료되었습니다. 앱을 재시작합니다.");
            location.reload();
        } catch (err) {
            console.error(err);
            alert("파일을 읽을 수 없습니다.\n올바른 백업 파일인지 확인해주세요.");
        }
    };
    reader.readAsText(file);
}

// [v11.1] Audio Engine

// [v11.2] Activity Chart Engine
// [v17.0] Analytics Engine
let chartRange = '7d';

function switchChart(range) {
    chartRange = range;

    // Update Buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-${range}`);
    });

    renderDashboard();
}

function getAnalyticsData(days) {
    const today = new Date();
    const data = [];
    const labels = [];
    let max = 10;
    let total = 0;
    let activeDays = 0;

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dayKey = getLocalISODate(d);
        const val = stats.history[dayKey] || 0;

        data.push(val);
        // Label strategy based on range
        if (days === 7) {
            labels.push(i === 0 ? 'Today' : (d.getMonth() + 1) + '/' + d.getDate());
        } else {
            // For 30 days, show every 5th day
            labels.push(i % 5 === 0 ? (d.getMonth() + 1) + '/' + d.getDate() : '');
        }

        if (val > 0) activeDays++;
        if (val > max) max = val;
        total += val;
    }

    return { data, labels, max, total, activeDays };
}

function generateInsights(analytics) {
    const { data, total, activeDays } = analytics;
    const todayVal = data[data.length - 1];
    const avg = activeDays > 0 ? (total / activeDays) : 0;

    // Simple Heuristics
    // 1. Consistency
    let streak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i] > 0) streak++;
        else break;
    }

    if (streak >= 3) return { icon: "🔥", text: `${streak}일 연속 집중 중! 이 기세를 몰아보세요.` };
    if (todayVal > avg * 1.2 && avg > 10) return { icon: "🚀", text: "오늘 페이스가 아주 좋습니다! 평균을 훌쩍 넘겼어요." };
    if (todayVal > 0 && todayVal < avg * 0.5) return { icon: "📉", text: `평소(${Math.round(avg)}분)보다 조금 부족해요. 10분만 더?` };
    if (activeDays === 0) return { icon: "🌱", text: "집중을 시작해보세요. 첫 기록을 기다리고 있습니다." };

    // Weekend vs Weekday check could be added here

    return { icon: "💡", text: "꾸준한 기록이 성장의 밑거름이 됩니다." };
}

function renderDashboard() {
    const days = chartRange === '7d' ? 7 : 30;
    const analytics = getAnalyticsData(days);

    drawChart(analytics);
    updateKPIs(analytics, days);
    updateInsight(getAnalyticsData(7)); // Insight always based on recent 7 days trends
}

function updateKPIs(analytics, days) {
    if (!document.getElementById('stat-total')) return;

    // Total Focus (All time)
    // We need to calc all time total from stats.history keys
    let allTimeTotal = 0;
    let bestDay = 0;
    Object.values(stats.history).forEach(val => {
        allTimeTotal += val;
        if (val > bestDay) bestDay = val;
    });

    // Formatting
    const formatTime = (min) => {
        if (min < 60) return `${min}m`;
        return `${(min / 60).toFixed(1)}h`;
    };

    document.getElementById('stat-total').innerText = formatTime(allTimeTotal);
    document.getElementById('stat-avg').innerText = formatTime(Math.round(analytics.total / (analytics.activeDays || 1)));
    document.getElementById('stat-best').innerText = formatTime(bestDay);
}

function updateInsight(analytics) {
    const insight = generateInsights(analytics);
    document.querySelector('#insight-banner div:first-child').innerText = insight.icon;
    document.getElementById('insight-text').innerText = insight.text;
}

function drawChart(analytics) {
    const canvas = document.getElementById('activity-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const { data, labels, max } = analytics;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Draw Config
    const is7d = data.length === 7;
    const barW = is7d ? 20 : 6;
    const gap = (w - (barW * data.length)) / (data.length + 1);
    const scale = (h - 30) / max;

    // Draw Bars
    data.forEach((val, i) => {
        const x = gap + (i * (barW + gap));
        const barH = val * scale;
        const y = h - 20 - barH;

        // Bar
        ctx.fillStyle = val > 0 ? (i === data.length - 1 ? '#FFD700' : '#3B82F6') : '#333';
        ctx.fillRect(x, y, barW, barH);

        // Value Label (Only for 7d view)
        if (is7d && val > 0) {
            ctx.fillStyle = '#fff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(val, x + barW / 2, y - 5);
        }

        // Date Label
        if (labels[i]) {
            ctx.fillStyle = '#888';
            ctx.font = '9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(labels[i], x + barW / 2, h - 5);
        }
    });
}

function timerClick() { SFX.play('click'); start(); }
function closeGacha() { hideModal('gacha-modal'); }
const cc = document.getElementById('char-container');
let dOff = { x: 0, y: 0 };

// [v10.2 Fix] Safe Event Listeners for Drag (No conflict with Idle Timer)
// [v10.2 Fix] Safe Event Listeners for Drag (No conflict with Idle Timer)
// [v14.0] Mobile Touch Support
const startDrag = (e) => {
    // Prevent default touch actions (scrolling) if it's a touch event
    if (e.type === 'touchstart') e.preventDefault();

    stats.totalClicks++; unlockDirect(35); checkAchievements();
    let r = cc.getBoundingClientRect();

    // Unify Mouse/Touch coordinates
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

    dOff.x = clientX - r.left;
    dOff.y = clientY - r.top;

    const onMove = (e) => {
        const cx = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const cy = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

        cc.style.left = (cx - dOff.x) + 'px';
        cc.style.top = (cy - dOff.y) + 'px';
        cc.style.bottom = 'auto';
        cc.style.transform = 'none';

        // Check Corner (37)
        if (cx < 50 || cx > window.innerWidth - 50) unlockDirect(37);
        resetIdleTimer();
    };

    const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
        saveStats();
    };

    if (e.type === 'mousedown') {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    } else {
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
    }
};

cc.addEventListener('mousedown', startDrag);
cc.addEventListener('touchstart', startDrag, { passive: false });

// [v10.2 Fix] Ensure DOM is ready before init
// [v11.1] Sound Engine (Web Audio API)
const SFX = {
    ctx: null,
    muted: localStorage.getItem('sfx_muted') === 'true',

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
    },

    toggle() {
        this.muted = !this.muted;
        localStorage.setItem('sfx_muted', this.muted);
        return this.muted;
    },

    play(type) {
        if (this.muted || !this.ctx) return;

        // [Constraint] Quiet during Deep Work
        // Deep Work 중에는 'beep'(집중 알림) 외에는 소리 재생 안 함
        if (isDeepWork && type !== 'beep') return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;

        switch (type) {
            case 'click': // Short Tick
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'start': // Ascending
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.3);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'success': // Simple Major Chord Arpeggio
                this._playNote(523.25, 0, 0.1); // C5
                this._playNote(659.25, 0.1, 0.1); // E5
                this._playNote(783.99, 0.2, 0.2); // G5
                break;

            case 'beep': // Soft notification for Deep Work
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.05, now); // Very quiet
                gain.gain.linearRampToValueAtTime(0, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
        }
    },

    _playNote(freq, delay, duration) {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.connect(g);
        g.connect(this.ctx.destination);
        o.type = 'sine';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.1, this.ctx.currentTime + delay);
        g.gain.linearRampToValueAtTime(0, this.ctx.currentTime + delay + duration);
        o.start(this.ctx.currentTime + delay);
        o.stop(this.ctx.currentTime + delay + duration);
    }
};

// [v16.0] Soundscape Engine (Procedural Audio)
const Ambiance = {
    ctx: null,
    activeNodes: [],
    masterGain: null,
    volume: 0.5,
    currentTrack: 'none',

    init() {
        if (!this.ctx) {
            this.ctx = SFX.ctx || new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = this.volume;
            this.masterGain.connect(this.ctx.destination);
        }
    },

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.masterGain) this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    },

    stop() {
        this.activeNodes.forEach(n => {
            try { n.stop(); n.disconnect(); } catch (e) { }
        });
        this.activeNodes = [];
        this.currentTrack = 'none';
        updateAmbianceUI(); // Update UI if exists
    },

    play(track) {
        this.init();
        if (this.currentTrack === track && this.activeNodes.length > 0) return; // Already playing
        this.stop(); // Stop previous

        this.currentTrack = track;
        if (track === 'none') return;

        // Resume context if suspended
        if (this.ctx.state === 'suspended') this.ctx.resume();

        switch (track) {
            case 'rain': this._playRain(); break;
            case 'fire': this._playFire(); break;
            case 'forest': this._playForest(); break;
            case 'ocean': this._playOcean(); break;
            case 'stream': this._playStream(); break;
            case 'fan': this._playFan(); break;
            case 'space': this._playSpace(); break;
            case 'white': this._playWhite(); break;
        }
        updateAmbianceUI();
        showToast("분위기 전환", `${track.toUpperCase()} 사운드가 재생됩니다.`, "🎵");
    },

    // --- Generators ---
    _createNoise(type) {
        const bufferSize = 2 * this.ctx.sampleRate;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            if (type === 'white') {
                output[i] = white;
            } else if (type === 'pink') {
                // Paul Kellet's refined method
                let b0, b1, b2, b3, b4, b5, b6;
                b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.075076;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // compensate for gain
                b6 = white * 0.115926;
            } else if (type === 'brown') {
                let lastOut = 0;
                lastOut = (lastOut + (0.02 * white)) / 1.02;
                output[i] = lastOut * 3.5;
                output[i] *= 0.11;
            }
        }
        return buffer;
    },

    _playRain() {
        // Pink Noise + LowPass Filter
        const noise = this.ctx.createBufferSource();
        noise.buffer = this._createNoise('pink');
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        // [v17.3] Volume Reduction
        const gain = this.ctx.createGain();
        gain.gain.value = 0.4; // Reduced from 1.0 implementation

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
        this.activeNodes.push(noise);
    },

    _playFire() {
        // Brown Noise (Rumble) + Crackle (Random Clicks)
        const noise = this.ctx.createBufferSource();
        noise.buffer = this._createNoise('brown');
        noise.loop = true;

        // Low rumble
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 500;

        // [Fix] Boost Fire Volume
        const gain = this.ctx.createGain();
        gain.gain.value = 3.0; // Significant boost for Brown noise

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
        this.activeNodes.push(noise);

        // TODO: Add Crackle logic (needs ScriptProcessor or random clock, simpler for now just rumble)
    },

    _playForest() {
        // Wind (Pink Noise with Bandpass LFO)
        const noise = this.ctx.createBufferSource();
        noise.buffer = this._createNoise('pink');
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;

        // LFO for Wind Swells
        const osc = this.ctx.createOscillator();
        osc.frequency.value = 0.1; // Slow swell

        const gain = this.ctx.createGain();
        gain.gain.value = 0.3; // Base wind volume

        // Modulate Gain not implemented simply, just steady wind for now to keep it safe

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
        this.activeNodes.push(noise);
    },

    _playOcean() {
        // Pink Noise + Modulated LowPass (Waves)
        const noise = this.ctx.createBufferSource();
        noise.buffer = this._createNoise('pink');
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 500;

        // Peak filter for "froth" sound
        const filter2 = this.ctx.createBiquadFilter();
        filter2.type = 'peaking';
        filter2.frequency.value = 1000;
        filter2.gain.value = 5;

        // Wave LFO
        const osc = this.ctx.createOscillator();
        osc.frequency.value = 0.1; // 10s wave cycle

        const oscGain = this.ctx.createGain();
        oscGain.gain.value = 400; // Modulate frequency by +/- 400Hz

        osc.connect(oscGain);
        oscGain.connect(filter.frequency);

        noise.connect(filter);
        filter.connect(filter2);
        filter2.connect(this.masterGain);

        noise.start();
        osc.start();
        this.activeNodes.push(noise, osc);
    },

    _playStream() {
        // Brown Noise + HighPass (Rushing Water)
        const noise = this.ctx.createBufferSource();
        noise.buffer = this._createNoise('brown');
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 400;

        // Reduce volume slightly as brown noise is loud
        const gain = this.ctx.createGain();
        gain.gain.value = 0.8;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
        this.activeNodes.push(noise);
    },

    _playFan() {
        // Brown Noise + LowPass + Slight Drone
        const noise = this.ctx.createBufferSource();
        noise.buffer = this._createNoise('brown');
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;

        // Drone
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 60; // 60Hz hum
        const oscGain = this.ctx.createGain();
        oscGain.gain.value = 0.05;

        noise.connect(filter);
        filter.connect(this.masterGain);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain);

        noise.start();
        osc.start();
        this.activeNodes.push(noise, osc);
    },

    _playWhite() {
        // Pure White Noise
        const noise = this.ctx.createBufferSource();
        noise.buffer = this._createNoise('white');
        noise.loop = true;

        const gain = this.ctx.createGain();
        gain.gain.value = 0.03; // Very quiet background (was 0.1)

        noise.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
        this.activeNodes.push(noise);
    },

    _playSpace() {
        // Deep Drone (Low Sine) + Reverb-ish effect via multiple oscillators
        const freqs = [55, 110, 220]; // A1, A2, A3
        freqs.forEach(f => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = f;

            const gain = this.ctx.createGain();
            gain.gain.value = 0.05 / (freqs.indexOf(f) + 1); // Higher pitch quieter

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
            this.activeNodes.push(osc);
        });
    }
};

// [v10.4] Safe Initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        initApp();
    } catch (e) {
        console.error("Critical Init Error:", e);
        const emerg = document.getElementById('emergency-reset');
        if (emerg) {
            emerg.style.display = 'block';
            emerg.style.zIndex = '99999';
            // [Debug] Show error to user
            const msg = document.createElement('p');
            msg.style.color = 'red'; msg.innerText = e.message;
            emerg.appendChild(msg);
        }
    }
});

// [v15.0] Quest System Helper Functions
function checkQuests() {
    const today = getLocalISODate();

    // Daily Reset
    if (quests.daily.lastReset !== today) {
        quests.daily = {
            checkIn: false,
            focus25: false,
            lucky: false,
            lastReset: today
        };
    }

    // Weekly Reset (Monday)
    // Calculate start of week (Monday)
    const d = new Date();
    const day = d.getDay(); // 0:Sun, 1:Mon...
    const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(d.setDate(diff)).toISOString().split('T')[0];

    if (quests.weekly.lastReset !== monday) {
        quests.weekly = {
            progressMin: 0,
            claimedSteps: [],
            lastReset: monday
        };
    }
    saveQuests();
}

function saveQuests() {
    localStorage.setItem('quests', JSON.stringify(quests));
}

function useFeverItem() {
    if (quests.inventory.feverItem > 0) {
        quests.inventory.feverItem--;
        feverEndTime = Date.now() + (30 * 60 * 1000); // 30 mins
        quests.feverEndTime = feverEndTime; // [Fix] Save
        alert("🔥 피버 타임 시작! (30분간 포인트 2배)");
        saveQuests();
        updateFeverUI();
    } else {
        alert("피버 물약이 없습니다.");
    }
}

// [v10.3] Earn Points Helper (Modified for v16.2)
// [v10.3] Earn Points Helper (Modified for v16.2)
function earnPoints(amount, force, ignoreLimit = false) {
    if (amount <= 0) return;

    // [v16.2] Ignore Limit Logic
    if (!ignoreLimit && stats.dailyEarned >= 3000 && !force) {
        return;
    }

    // Limit Check
    if (!ignoreLimit) {
        const remaining = 3000 - stats.dailyEarned;
        if (remaining <= 0) return;
        if (amount > remaining) amount = remaining;
    }

    pts += amount;
    if (!ignoreLimit) stats.dailyEarned += amount;

    updateDisp();
    saveStats();
}

function triggerFever() {
    // Called when 25 min focus complete
    // [v16.2] Only Give Item ONCE (First time completion)
    if (!quests.daily.focus25) {
        quests.daily.focus25 = true;
        earnPoints(300, true);

        // Give Item
        if (stats.dailyEarned < 3000) {
            quests.inventory.feverItem++;
            alert("일일 퀘스트 완료: 25분 집중 (300P)\n🔥 보상: 피버 물약 1개 획득!");
        } else {
            alert("일일 퀘스트 완료: 25분 집중 (300P)\n(일일 포인트 한도 초과로 물약 미지급)");
        }
        saveQuests();
        renderQuestUI();
    }
}

function claimWeeklyReward(step) {
    if (quests.weekly.claimedSteps.includes(step)) return;
    if (quests.weekly.progressMin >= step * 60) {
        quests.weekly.claimedSteps.push(step);
        earnPoints(500, true, true); // [v16.2] Ignore Limit for Weekly
        saveQuests();
        renderQuestUI();
        alert(`주간 퀘스트 완료: ${step}시간 달성 (500P)`);
    } else {
        alert("아직 달성하지 못했습니다.");
    }
}

function tryLuckyBox() {
    if (quests.daily.lucky) {
        alert("오늘은 이미 열었습니다.");
        return;
    }
    quests.daily.lucky = true;

    // [Balanced Probabilities]
    const rand = Math.random() * 100;
    let reward = 10;
    if (rand < 2) reward = 500; // 2%
    else if (rand < 10) reward = 200; // 8%
    else if (rand < 30) reward = 100; // 20%
    else if (rand < 60) reward = 50; // 30%

    earnPoints(reward, true, true); // [v16.2] Ignore Limit for Lucky Box
    saveQuests();
    renderQuestUI();
    alert(`🎁 행운의 상자 결과: ${reward}P 획득!`);
}

function updateFeverUI() {
    const now = Date.now();
    const isFever = now < feverEndTime;
    const btn = document.getElementById('btn-use-fever');
    const timeEl = document.getElementById('time');

    if (btn) {
        if (isFever) {
            const remain = Math.ceil((feverEndTime - now) / 1000);
            const m = Math.floor(remain / 60);
            const s = remain % 60;
            btn.innerText = `🔥 활성화 중 (${m}:${s < 10 ? '0' + s : s})`;
            btn.disabled = true;
            btn.style.background = '#ff4500';
            if (timeEl) {
                timeEl.style.color = '#ff4500';
                timeEl.style.textShadow = '0 0 15px #ff0000';
            }
        } else {
            btn.innerText = `사용하기 (보유: ${quests.inventory.feverItem})`;
            btn.disabled = quests.inventory.feverItem === 0;
            btn.style.background = quests.inventory.feverItem > 0 ? 'var(--gold)' : '#555';

            // Revert Style if not in deep work (Deep work has its own style, but fever overrides color)
            // Ideally we check isDeepWork to know if we should revert to white or something else.
            // But main loop updates display constantly.
            if (timeEl) {
                // [Fix] Don't force white color, let CSS handle it (Blue when idle, White when running)
                timeEl.style.color = '';
                timeEl.style.textShadow = 'none';
            }
        }
    }
}

function renderQuestUI() {
    const container = document.getElementById('quest-container');
    if (!container) return;

    // Daily UI
    const q1 = quests.daily.checkIn ? '✅' : '⬜';
    const q2 = quests.daily.focus25 ? '✅' : '⬜';
    const q3 = quests.daily.lucky ? '✅' : '🎁'; // Clickable

    // Weekly UI
    const weekMin = quests.weekly.progressMin;
    const weekHours = (weekMin / 60).toFixed(1);

    let wHtml = '';
    [5, 10, 15, 20, 25].forEach(step => {
        const done = quests.weekly.claimedSteps.includes(step);
        const canClaim = !done && (weekMin >= step * 60);
        const style = done ? 'color:#888; text-decoration:line-through' : (canClaim ? 'color:var(--gold); font-weight:bold; cursor:pointer' : 'color:#555');
        const click = canClaim ? `onclick="claimWeeklyReward(${step})"` : '';
        wHtml += `<span style="${style}; margin-right:8px;" ${click}>[${step}h]</span>`;
    });

    container.innerHTML = `
        <div style="margin-bottom:15px; background:rgba(255,255,255,0.05); padding:10px; border-radius:10px;">
            <div style="font-weight:bold; margin-bottom:5px;">📅 일일 퀘스트</div>
            <div style="display:flex; justify-content:space-between; font-size:13px;">
                <span>${q1} 출석</span>
                <span>${q2} 25분 집중</span>
                <span onclick="tryLuckyBox()" style="cursor:${quests.daily.lucky ? 'default' : 'pointer'}">${q3} 랜덤박스</span>
            </div>
        </div>
        <div style="margin-bottom:15px; background:rgba(255,255,255,0.05); padding:10px; border-radius:10px;">
            <div style="font-weight:bold; margin-bottom:5px;">📅 주간 도전 (${weekHours} / 25.0 h)</div>
            <div style="font-size:12px;">${wHtml}</div>
        </div>
        <div>
            <div style="font-weight:bold; margin-bottom:5px;">🎒 인벤토리</div>
            <div style="display:flex; align-items:center; justify-content:space-between;">
                <span>🔥 피버 물약</span>
                <button id="btn-use-fever" class="btn" style="width:auto; padding:5px 10px; font-size:11px; margin-top:0;" onclick="useFeverItem()">Loading...</button>
            </div>
        </div>
    `;
    updateFeverUI();
}

// [v16.0] Ambiance UI Helper
function updateAmbianceUI() {
    const status = document.getElementById('ambiance-status');
    const container = document.getElementById('ambiance-controls');

    if (status) {
        let text = "OFF";
        let color = "#555";
        if (Ambiance.currentTrack !== 'none') {
            text = Ambiance.currentTrack.toUpperCase();
            color = "var(--blue)"; // Active color
        }
        status.innerText = text;
        status.style.color = color;
    }

    // Update buttons state
    if (container) {
        container.querySelectorAll('.amb-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.track === Ambiance.currentTrack);
        });
    }
}

// [v17.2] UI Customization Logic
function setUiBoxColor(hex, opacity) {
    const root = document.documentElement;

    // Get current values if null passed
    if (!hex) hex = current.uiColor || '#0f0f0f';
    if (opacity === null) opacity = current.uiOpacity || 0.95;

    // Save to State
    current.uiColor = hex;
    current.uiOpacity = opacity;
    localStorage.setItem('current', JSON.stringify(current));

    // Convert Hex to RGBA
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    // Apply Variable
    root.style.setProperty('--ui-bg-color', rgba);

    // Update Inputs (Sync UI)
    const picker = document.getElementById('ui-color-picker');
    const slider = document.getElementById('ui-opacity-slider');
    if (picker && picker.value !== hex) picker.value = hex;
    if (slider && slider.value != opacity) slider.value = opacity;
}

// [v16.0] Toggle Atmosphere Panel (Deprecated)
// ...
