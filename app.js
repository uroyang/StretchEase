/**
 * StretchEase - 메인 애플리케이션 스크립트
 * 스트레칭 & 홈트레이닝 통합 웹 앱
 */

// --- Lottie 애니메이션 URL 맵 (animationClass → dotLottie CDN URL) ---
const lottieMap = {
  // === 홈트레이닝 ===
  "anim-jumping-jacks": "https://assets-v2.lottiefiles.com/a/88feceb0-1189-11ee-8b16-9355b79deb0c/37fmQsXiWY.lottie",
  "anim-squats":        "https://assets-v2.lottiefiles.com/a/245574e8-73f2-11ee-ae3c-ef13287bcf8e/P7S3i4DdBB.lottie",
  "anim-pushups":       "https://assets-v2.lottiefiles.com/a/6c1a4598-1177-11ee-9e88-bf9e8c56d70c/YDxF9XmjyX.lottie",
  "anim-plank":         "https://assets-v2.lottiefiles.com/a/dc68e41e-1189-11ee-a704-a3ee683b17ee/ygxWZwnPnw.lottie",
  "anim-crunches":      "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  // === 스트레칭 ===
  "anim-full-stretch":  "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-neck-stretch":  "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-side-stretch":  "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-shoulder-roll": "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-forward-fold":  "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-chin-tuck":     "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-chest-opener":  "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-w-stretch":     "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-neck-down":     "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-shoulder-back": "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-cat-cow":       "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-child-pose":    "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-knee-to-chest": "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-cobra":         "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-hip-stretch":   "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-deep-breathing":"https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-seated-twist":  "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-butterfly":     "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-legs-up":       "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  "anim-savasana":      "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie",
  // 기본값
  "default":            "https://assets-v2.lottiefiles.com/a/d0df6d42-1171-11ee-bc69-63c7a3561bef/GJXc6tYHL3.lottie"
};


// --- 글로벌 상태 관리 객체 ---
const appState = {
  currentView: "dashboard-view",
  selectedRoutine: null,
  currentExerciseIndex: 0,
  timerSeconds: 30,
  timerIntervalId: null,
  isPaused: false,
  isPrepTime: false,
  selectedCategory: "stretch",
  userStats: {
    completedDates: [],
    totalMinutes: 0,
    totalRoutinesCompleted: 0,
    streak: 0,
    lastCompletedDate: ""
  },
  settings: {
    ttsEnabled: true,
    soundEnabled: true,
    prepTime: 5
  }
};

// --- DOM 엘리먼트 캐싱 ---
const elements = {
  views: {
    dashboard: document.getElementById("dashboard-view"),
    detail: document.getElementById("routine-detail-view"),
    timer: document.getElementById("timer-view"),
    history: document.getElementById("history-view"),
    settings: document.getElementById("settings-view")
  },
  appHeader: document.getElementById("app-header"),
  bottomNav: document.getElementById("bottom-nav"),
  streakBadge: document.getElementById("streak-badge"),
  greetingText: document.getElementById("greeting-text"),
  weekDaysContainer: document.getElementById("week-days-container"),
  todayTime: document.getElementById("today-time"),
  todayCount: document.getElementById("today-count"),
  routineListContainer: document.getElementById("routine-list-container"),
  categoryFilterPill: document.querySelector(".category-filter-pill"),
  btnFilterStretch: document.getElementById("btn-filter-stretch"),
  btnFilterWorkout: document.getElementById("btn-filter-workout"),
  routineSectionTitle: document.getElementById("routine-section-title"),
  btnDetailBack: document.getElementById("btn-detail-back"),
  detailHeaderTitle: document.getElementById("detail-header-title"),
  detailHeroCard: document.getElementById("detail-hero-card"),
  detailExListContainer: document.getElementById("detail-exercise-list-container"),
  btnStartRoutine: document.getElementById("btn-start-routine"),
  btnTimerExit: document.getElementById("btn-timer-exit"),
  currentExIndex: document.getElementById("current-ex-index"),
  totalExCount: document.getElementById("total-ex-count"),
  btnToggleSound: document.getElementById("btn-toggle-sound"),
  btnToggleTts: document.getElementById("btn-toggle-tts"),
  activeExName: document.getElementById("active-ex-name"),
  activeExDesc: document.getElementById("active-ex-desc"),
  avatarSvg: document.getElementById("avatar-svg"),
  progressRingBar: document.getElementById("progress-ring-bar"),
  timerCountdown: document.getElementById("timer-countdown"),
  btnTimerPrev: document.getElementById("btn-timer-prev"),
  btnTimerToggle: document.getElementById("btn-timer-toggle"),
  btnTimerNext: document.getElementById("btn-timer-next"),
  timerToggleIcon: document.getElementById("timer-toggle-icon"),
  statsTotalDays: document.getElementById("stats-total-days"),
  statsTotalTime: document.getElementById("stats-total-time"),
  statsTotalCount: document.getElementById("stats-total-count"),
  historyListContainer: document.getElementById("history-list-container"),
  settingTts: document.getElementById("setting-tts"),
  settingSound: document.getElementById("setting-sound"),
  settingPrepTime: document.getElementById("setting-prep-time"),
  btnResetData: document.getElementById("btn-reset-data")
};

// --- 초기화 ---
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  renderDashboard();
  setupNavigation();
  setupActionListeners();
  updateGreetingMessage();
  switchView("dashboard-view");
});

// --- 1. 데이터 저장/불러오기 ---
function loadUserData() {
  try {
    const savedStats = localStorage.getItem("stretch_user_stats");
    if (savedStats) appState.userStats = JSON.parse(savedStats);
    else saveUserData();
    const savedSettings = localStorage.getItem("stretch_settings");
    if (savedSettings) appState.settings = JSON.parse(savedSettings);
    elements.settingTts.checked = appState.settings.ttsEnabled;
    elements.settingSound.checked = appState.settings.soundEnabled;
    elements.settingPrepTime.value = appState.settings.prepTime;
    updateTimerSoundToggleUI();
    validateStreak();
  } catch (e) {
    console.error("데이터 로드 오류:", e);
  }
}

function saveUserData() {
  try { localStorage.setItem("stretch_user_stats", JSON.stringify(appState.userStats)); }
  catch (e) { console.error("저장 오류:", e); }
}

function saveSettingsData() {
  try { localStorage.setItem("stretch_settings", JSON.stringify(appState.settings)); }
  catch (e) { console.error("설정 저장 오류:", e); }
}

// --- 2. 화면 전환 ---
function setupNavigation() {
  document.querySelectorAll(".bottom-nav .nav-item").forEach(button => {
    button.addEventListener("click", () => {
      const targetViewId = button.getAttribute("data-view");
      document.querySelectorAll(".bottom-nav .nav-item").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      switchView(targetViewId);
    });
  });
}

function switchView(viewId) {
  if (appState.currentView === "timer-view" && viewId !== "timer-view") {
    stopTimerInterval();
  }
  Object.keys(elements.views).forEach(key => elements.views[key].classList.remove("active"));
  const target = document.getElementById(viewId);
  if (target) target.classList.add("active");
  appState.currentView = viewId;
  if (viewId === "timer-view") {
    elements.appHeader.classList.add("hidden");
    elements.bottomNav.classList.add("hidden");
  } else {
    elements.appHeader.classList.remove("hidden");
    elements.bottomNav.classList.remove("hidden");
    if (viewId === "dashboard-view") renderDashboard();
    else if (viewId === "history-view") renderHistory();
  }
  window.scrollTo(0, 0);
}

// --- 3. 오디오 ---
function playSound(type) {
  if (!appState.settings.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === "prep") {
      osc.type = "sine"; osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now); osc.stop(now + 0.12);
    } else if (type === "start") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); osc.frequency.setValueAtTime(783.99, now + 0.15);
      gain.gain.setValueAtTime(0.12, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now); osc.stop(now + 0.45);
    } else if (type === "complete") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2); osc.frequency.setValueAtTime(1046.50, now + 0.3);
      gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now); osc.stop(now + 0.6);
    }
  } catch (e) { console.warn("오디오 오류:", e); }
}

// --- 4. TTS ---
function speakText(message) {
  if (!appState.settings.ttsEnabled) return;
  try {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(message);
    utt.lang = "ko-KR"; utt.rate = 1.0; utt.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const kr = voices.find(v => v.lang.includes("KR") || v.lang.includes("ko"));
    if (kr) utt.voice = kr;
    window.speechSynthesis.speak(utt);
  } catch (e) { console.warn("TTS 오류:", e); }
}

// --- 5. 날짜 유틸 ---
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getYesterdayString() {
  const d = new Date(); d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function validateStreak() {
  const today = getTodayString();
  const yesterday = getYesterdayString();
  if (appState.userStats.completedDates.length === 0) { appState.userStats.streak = 0; saveUserData(); return; }
  const last = appState.userStats.lastCompletedDate;
  if (last !== today && last !== yesterday) { appState.userStats.streak = 0; saveUserData(); }
}

function updateGreetingMessage() {
  const hour = new Date().getHours();
  let msg = "안녕하세요! 👋";
  if (hour >= 5 && hour < 9) msg = "상쾌한 아침이에요! 🌅";
  else if (hour >= 9 && hour < 17) msg = "오늘도 활기찬 하루 되세요! 💻";
  else if (hour >= 17 && hour < 22) msg = "하루를 부드럽게 마무리해봐요! 🧘";
  else msg = "숙면을 취할 준비를 해볼까요? 🌙";
  elements.greetingText.innerText = msg;
}

// --- 6. 대시보드 렌더링 ---
function renderDashboard() {
  elements.streakBadge.innerHTML = `🔥 ${appState.userStats.streak}일 연속`;
  const today = getTodayString();
  const cnt = appState.userStats.completedDates.filter(d => d === today).length;
  elements.todayCount.innerText = `${cnt}개`;
  elements.todayTime.innerText = `${cnt * 2.5}분`;
  renderWeeklyTracker();
  renderRoutineList();
}

function renderWeeklyTracker() {
  elements.weekDaysContainer.innerHTML = "";
  const today = new Date();
  const dow = today.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const dayNames = ["월","화","수","목","금","토","일"];
  for (let i = 0; i < 7; i++) {
    const t = new Date(); t.setDate(today.getDate() + mondayOffset + i);
    const ds = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
    const done = appState.userStats.completedDates.includes(ds);
    const isToday = ds === getTodayString();
    const dot = document.createElement("div");
    dot.className = "day-circle";
    let cls = "day-dot"; if (done) cls += " completed"; if (isToday) cls += " today";
    dot.innerHTML = `<div class="${cls}">${done ? "" : t.getDate()}</div><span class="day-label">${dayNames[i]}</span>`;
    elements.weekDaysContainer.appendChild(dot);
  }
}

function renderRoutineList() {
  elements.routineListContainer.innerHTML = "";
  const filtered = stretchingRoutines.filter(r => (r.type || "stretch") === appState.selectedCategory);
  filtered.forEach(routine => {
    const card = document.createElement("div");
    card.className = "routine-card";
    card.setAttribute("data-id", routine.id);
    const mins = Math.floor((routine.duration||150) / 60);
    const secs = (routine.duration||150) % 60;
    const timeText = secs > 0 ? `${mins}분 ${secs}초` : `${mins}분`;
    card.innerHTML = `
      <div class="routine-card-icon">${routine.icon}</div>
      <div class="routine-card-info">
        <span class="routine-card-title">${routine.title}</span>
        <span class="routine-card-desc">${routine.description}</span>
        <div class="routine-card-meta">
          <span class="meta-item">⏱️ ${timeText}</span>
          <span class="meta-item">💪 난이도: ${routine.difficulty}</span>
        </div>
      </div>
      <div class="routine-card-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></div>`;
    card.addEventListener("click", () => openRoutineDetails(routine));
    elements.routineListContainer.appendChild(card);
  });
}

// --- 7. 루틴 상세 화면 ---
function openRoutineDetails(routine) {
  appState.selectedRoutine = routine;
  const isWorkout = routine.type === "workout";
  const typeLabel = isWorkout ? "맨몸 운동" : "스트레칭";
  elements.detailHeroCard.innerHTML = `
    <div class="hero-header">
      <div class="hero-icon">${routine.icon}</div>
      <div class="hero-title-box">
        <h2 class="hero-title">${routine.title}</h2>
        <div class="routine-card-meta">
          <span class="meta-item">⏱️ 총 ${routine.exercises.length}개 동작</span>
          <span class="meta-item">난이도: ${routine.difficulty}</span>
        </div>
      </div>
    </div>
    <p class="hero-desc">${routine.description}</p>`;
  elements.detailExListContainer.innerHTML = "";
  routine.exercises.forEach((ex, idx) => {
    const item = document.createElement("div");
    item.className = "ex-detail-item";
    item.innerHTML = `
      <div class="ex-number">${idx + 1}</div>
      <div class="ex-text-box"><span class="ex-name">${ex.name}</span><span class="ex-desc">${ex.description}</span></div>
      <div class="ex-dur">${ex.duration}초</div>`;
    elements.detailExListContainer.appendChild(item);
  });
  const listTitle = document.querySelector(".exercise-list-section h3");
  if (listTitle) listTitle.innerText = `포함된 ${typeLabel} 동작`;
  elements.btnStartRoutine.innerText = isWorkout ? "트레이닝 시작하기 ⚡" : "스트레칭 시작하기 ⚡";
  switchView("routine-detail-view");
}

// --- 8. 타이머 엔진 ---
function startRoutineTimer() {
  if (!appState.selectedRoutine) return;
  appState.currentExerciseIndex = 0;
  appState.isPaused = false;
  switchView("timer-view");
  loadExercise(0);
}

function loadExercise(index) {
  stopTimerInterval();
  const routine = appState.selectedRoutine;
  if (index >= routine.exercises.length) { completeRoutine(); return; }
  appState.currentExerciseIndex = index;
  const ex = routine.exercises[index];
  elements.currentExIndex.innerText = index + 1;
  elements.totalExCount.innerText = routine.exercises.length;
  elements.activeExName.innerText = ex.name;
  elements.activeExDesc.innerText = ex.description;
  
  // Lottie 애니메이션 전환
  const lottiePlayer = document.getElementById("lottie-player");
  const lottieUrl = lottieMap[ex.animationClass] || lottieMap["default"];
  if (lottiePlayer) {
    lottiePlayer.load(lottieUrl);
  }
  const prepTime = parseInt(appState.settings.prepTime, 10);
  if (prepTime > 0) runPrepPhase(prepTime, ex);
  else runExercisePhase(ex);
}

function stopTimerInterval() {
  if (appState.timerIntervalId) { clearInterval(appState.timerIntervalId); appState.timerIntervalId = null; }
}

function runPrepPhase(seconds, exercise) {
  appState.isPrepTime = true;
  appState.timerSeconds = seconds;
  elements.activeExName.innerText = "준비 동작 (대기)";
  elements.activeExDesc.innerText = `다음 동작: ${exercise.name}`;
  updateTimerDisplay(seconds, seconds);
  speakText(`준비하세요. 다음 동작은, ${exercise.name} 입니다.`);
  appState.timerIntervalId = setInterval(() => {
    if (appState.isPaused) return;
    appState.timerSeconds--;
    playSound("prep");
    updateTimerDisplay(appState.timerSeconds, seconds);
    if (appState.timerSeconds <= 0) { clearInterval(appState.timerIntervalId); runExercisePhase(exercise); }
  }, 1000);
}

function runExercisePhase(exercise) {
  appState.isPrepTime = false;
  appState.timerSeconds = exercise.duration;
  elements.activeExName.innerText = exercise.name;
  elements.activeExDesc.innerText = exercise.description;
  updateTimerDisplay(appState.timerSeconds, exercise.duration);
  playSound("start");
  speakText(exercise.tts);
  appState.timerIntervalId = setInterval(() => {
    if (appState.isPaused) return;
    appState.timerSeconds--;
    updateTimerDisplay(appState.timerSeconds, exercise.duration);
    if (appState.timerSeconds > 0 && appState.timerSeconds <= 3) { playSound("prep"); speakText(`${appState.timerSeconds}`); }
    if (appState.timerSeconds <= 0) { clearInterval(appState.timerIntervalId); loadExercise(appState.currentExerciseIndex + 1); }
  }, 1000);
}

function updateTimerDisplay(remaining, total) {
  elements.timerCountdown.innerText = remaining;
  const offset = 440 - (440 * (remaining / total));
  elements.progressRingBar.style.strokeDashoffset = offset;
}

function completeRoutine() {
  stopTimerInterval();
  playSound("complete");
  const done = appState.selectedRoutine;
  const today = getTodayString();
  const yesterday = getYesterdayString();
  appState.userStats.completedDates.push(today);
  appState.userStats.totalRoutinesCompleted += 1;
  appState.userStats.totalMinutes += 2.5;
  const last = appState.userStats.lastCompletedDate;
  if (last === yesterday) appState.userStats.streak += 1;
  else if (last !== today) appState.userStats.streak = 1;
  appState.userStats.lastCompletedDate = today;
  saveUserData();
  const msg = done.type === "workout"
    ? "트레이닝 완료! 근력이 한층 더 강화되었습니다. 수고하셨습니다."
    : "스트레칭 완료! 오늘도 몸과 마음을 건강하게 채우셨습니다. 수고하셨어요.";
  speakText(msg);
  alert(`축하합니다! 🎉\n[${done.title}]을 완료하셨습니다!\n오늘 연속 출석은 ${appState.userStats.streak}일째입니다.`);
  switchView("dashboard-view");
}

function toggleTimerPlayState() {
  if (!appState.timerIntervalId) return;
  appState.isPaused = !appState.isPaused;
  if (appState.isPaused) {
    elements.timerToggleIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
    speakText("일시정지");
  } else {
    elements.timerToggleIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
    speakText("재생");
  }
}

// --- 9. 기록 뷰 ---
function renderHistory() {
  const s = appState.userStats;
  const unique = [...new Set(s.completedDates)].length;
  elements.statsTotalDays.innerText = `${unique}일`;
  elements.statsTotalTime.innerText = `${Math.round(s.totalMinutes)}분`;
  elements.statsTotalCount.innerText = `${s.totalRoutinesCompleted}회`;
  elements.historyListContainer.innerHTML = "";
  if (s.completedDates.length === 0) {
    elements.historyListContainer.innerHTML = `<div class="no-history">아직 완료한 기록이 없습니다. 운동을 시작해보세요!</div>`;
    return;
  }
  [...s.completedDates].reverse().forEach(dateStr => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-info"><span class="history-title">⚡ 일일 트레이닝 완수</span><span class="history-date">${dateStr}</span></div>
      <div class="history-meta"><span class="history-dur">2.5분 완료</span><span class="history-xp">🔥 10 XP</span></div>`;
    elements.historyListContainer.appendChild(item);
  });
}

// --- 10. 카테고리 필터 ---
function setCategoryFilter(category) {
  appState.selectedCategory = category;
  if (category === "stretch") {
    elements.categoryFilterPill.classList.remove("active-workout");
    elements.btnFilterStretch.classList.add("active");
    elements.btnFilterWorkout.classList.remove("active");
    elements.routineSectionTitle.innerText = "스트레칭 루틴 선택";
  } else {
    elements.categoryFilterPill.classList.add("active-workout");
    elements.btnFilterStretch.classList.remove("active");
    elements.btnFilterWorkout.classList.add("active");
    elements.routineSectionTitle.innerText = "홈 트레이닝 루틴 선택";
  }
  renderRoutineList();
}

// --- 11. 이벤트 리스너 ---
function setupActionListeners() {
  elements.btnFilterStretch.addEventListener("click", () => setCategoryFilter("stretch"));
  elements.btnFilterWorkout.addEventListener("click", () => setCategoryFilter("workout"));
  elements.btnDetailBack.addEventListener("click", () => switchView("dashboard-view"));
  elements.btnStartRoutine.addEventListener("click", () => startRoutineTimer());
  elements.btnTimerExit.addEventListener("click", () => {
    stopTimerInterval();
    switchView("dashboard-view");
  });
  elements.btnTimerPrev.addEventListener("click", () => { if (appState.currentExerciseIndex > 0) loadExercise(appState.currentExerciseIndex - 1); });
  elements.btnTimerToggle.addEventListener("click", () => toggleTimerPlayState());
  elements.btnTimerNext.addEventListener("click", () => loadExercise(appState.currentExerciseIndex + 1));
  elements.btnToggleSound.addEventListener("click", () => {
    appState.settings.soundEnabled = !appState.settings.soundEnabled;
    saveSettingsData(); updateTimerSoundToggleUI();
    elements.settingSound.checked = appState.settings.soundEnabled;
  });
  elements.btnToggleTts.addEventListener("click", () => {
    appState.settings.ttsEnabled = !appState.settings.ttsEnabled;
    saveSettingsData(); updateTimerSoundToggleUI();
    elements.settingTts.checked = appState.settings.ttsEnabled;
  });
  elements.settingTts.addEventListener("change", e => { appState.settings.ttsEnabled = e.target.checked; saveSettingsData(); updateTimerSoundToggleUI(); });
  elements.settingSound.addEventListener("change", e => { appState.settings.soundEnabled = e.target.checked; saveSettingsData(); updateTimerSoundToggleUI(); });
  elements.settingPrepTime.addEventListener("change", e => { appState.settings.prepTime = parseInt(e.target.value, 10); saveSettingsData(); });
  elements.btnResetData.addEventListener("click", () => {
    if (confirm("경고! 모든 기록이 삭제됩니다. 계속하시겠습니까?")) {
      const ans = prompt("초기화하려면 '초기화'라고 입력해주세요.");
      if (ans === "초기화") {
        appState.userStats = { completedDates: [], totalMinutes: 0, totalRoutinesCompleted: 0, streak: 0, lastCompletedDate: "" };
        saveUserData(); loadUserData();
        alert("기록이 초기화되었습니다.");
        document.getElementById("nav-btn-home").click();
      } else { alert("취소되었습니다."); }
    }
  });
}

function updateTimerSoundToggleUI() {
  if (appState.settings.ttsEnabled) { elements.btnToggleTts.classList.remove("muted"); elements.btnToggleTts.innerText = "🗣️"; }
  else { elements.btnToggleTts.classList.add("muted"); elements.btnToggleTts.innerText = "🔇"; }
  if (appState.settings.soundEnabled) { elements.btnToggleSound.classList.remove("muted"); elements.btnToggleSound.innerText = "🔊"; }
  else { elements.btnToggleSound.classList.add("muted"); elements.btnToggleSound.innerText = "🔇"; }
}
