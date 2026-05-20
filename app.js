/**
 * StretchEase - 메인 애플리케이션 스크립트
 * 
 * 1. SPA 화면 전환 및 내비게이션 바 제어
 * 2. 로컬스토리지(LocalStorage) 기반 기록 보존 및 주간 달성도(스트릭) 계산
 * 3. Web Audio API를 활용한 자체 알림음 연주
 * 4. Web Speech API(TTS) 기반 음성 비서 코칭
 * 5. 타이머 제어 및 캐릭터 동작 애니메이션 동적 매핑
 */

// --- 글로벌 상태 관리 객체 ---
const appState = {
  currentView: "dashboard-view",          // 현재 보고 있는 화면 ID
  selectedRoutine: null,                  // 사용자가 선택한 스트레칭/홈트 루틴 데이터
  currentExerciseIndex: 0,                // 현재 진행 중인 동작 번호 (0~4)
  timerSeconds: 30,                       // 현재 동작의 남은 시간 (초)
  timerIntervalId: null,                  // setInterval 제어용 ID
  isPaused: false,                        // 타이머 일시정지 상태 여부
  isPrepTime: false,                      // 동작 시작 전 '준비 대기' 상태 여부
  selectedCategory: "stretch",            // 현재 선택된 운동 카테고리 (stretch / workout)
  
  // 로컬저장소에 보관할 유저 통계 정보 (기본값)
  userStats: {
    completedDates: [],                   // 운동 완료한 날짜 리스트 ['YYYY-MM-DD', ...]
    totalMinutes: 0,                      // 총 스트레칭 시간 (분)
    totalRoutinesCompleted: 0,            // 총 완료한 루틴 수
    streak: 0,                            // 연속 스트레칭 날짜 수
    lastCompletedDate: ""                 // 마지막 완료 날짜 'YYYY-MM-DD'
  },
  
  // 사용자 환경 설정
  settings: {
    ttsEnabled: true,                     // 음성 안내 켜기/끄기
    soundEnabled: true,                   // 효과음 켜기/끄기
    prepTime: 5                           // 다음 동작 준비 시간 (초)
  }
};

// --- DOM 엘리먼트 캐싱 ---
const elements = {
  // 뷰 화면들
  views: {
    dashboard: document.getElementById("dashboard-view"),
    detail: document.getElementById("routine-detail-view"),
    timer: document.getElementById("timer-view"),
    history: document.getElementById("history-view"),
    settings: document.getElementById("settings-view")
  },
  // 공통 레이아웃
  appHeader: document.getElementById("app-header"),
  bottomNav: document.getElementById("bottom-nav"),
  streakBadge: document.getElementById("streak-badge"),
  
  // 대시보드 뷰 관련
  greetingText: document.getElementById("greeting-text"),
  weekDaysContainer: document.getElementById("week-days-container"),
  todayTime: document.getElementById("today-time"),
  todayCount: document.getElementById("today-count"),
  routineListContainer: document.getElementById("routine-list-container"),
  categoryFilterPill: document.querySelector(".category-filter-pill"),
  btnFilterStretch: document.getElementById("btn-filter-stretch"),
  btnFilterWorkout: document.getElementById("btn-filter-workout"),
  routineSectionTitle: document.getElementById("routine-section-title"),
  
  // 루틴 상세 뷰 관련
  btnDetailBack: document.getElementById("btn-detail-back"),
  detailHeaderTitle: document.getElementById("detail-header-title"),
  detailHeroCard: document.getElementById("detail-hero-card"),
  detailExListContainer: document.getElementById("detail-exercise-list-container"),
  btnStartRoutine: document.getElementById("btn-start-routine"),
  
  // 타이머 뷰 관련
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
  
  // 기록 통계 뷰 관련
  statsTotalDays: document.getElementById("stats-total-days"),
  statsTotalTime: document.getElementById("stats-total-time"),
  statsTotalCount: document.getElementById("stats-total-count"),
  historyListContainer: document.getElementById("history-list-container"),
  
  // 환경 설정 뷰 관련
  settingTts: document.getElementById("setting-tts"),
  settingSound: document.getElementById("setting-sound"),
  settingPrepTime: document.getElementById("setting-prep-time"),
  btnResetData: document.getElementById("btn-reset-data")
};

// --- 초기화 및 앱 시작 ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. 유저 데이터 및 세팅 불러오기
  loadUserData();
  
  // 2. 화면 초기 바인딩 및 대시보드 렌더링
  renderDashboard();
  setupNavigation();
  setupActionListeners();
  
  // 3. 현재 시간 기준으로 환영인사 메시지 커스텀
  updateGreetingMessage();
  
  // 4. 최초 진입 화면 홈으로 세팅
  switchView("dashboard-view");
});

// --- 1. 유저 데이터 로드 및 저장 (LocalStorage) ---
function loadUserData() {
  try {
    // 저장된 통계 데이터 불러오기
    const savedStats = localStorage.getItem("stretch_user_stats");
    if (savedStats) {
      appState.userStats = JSON.parse(savedStats);
    } else {
      // 로컬스토리지가 처음이라면 데이터 생성
      saveUserData();
    }
    
    // 저장된 환경설정 데이터 불러오기
    const savedSettings = localStorage.getItem("stretch_settings");
    if (savedSettings) {
      appState.settings = JSON.parse(savedSettings);
    }
    
    // 환경설정 UI 값을 상태 데이터와 동기화
    elements.settingTts.checked = appState.settings.ttsEnabled;
    elements.settingSound.checked = appState.settings.soundEnabled;
    elements.settingPrepTime.value = appState.settings.prepTime;
    
    // 타이머 화면 내 퀵 토글 버튼 상태 동기화
    updateTimerSoundToggleUI();
    
    // 연속 출석 일수(스트릭) 검증
    validateStreak();
  } catch (error) {
    console.error("데이터 로드 중 에러가 발생하여 초기 데이터로 재설정합니다.", error);
  }
}

function saveUserData() {
  try {
    localStorage.setItem("stretch_user_stats", JSON.stringify(appState.userStats));
  } catch (error) {
    console.error("로컬 스토리지에 유저 통계를 저장하는 데 실패했습니다.", error);
  }
}

function saveSettingsData() {
  try {
    localStorage.setItem("stretch_settings", JSON.stringify(appState.settings));
  } catch (error) {
    console.error("로컬 스토리지에 설정을 저장하는 데 실패했습니다.", error);
  }
}

// --- 2. 화면 내비게이션 및 화면 전환 (SPA) ---
function setupNavigation() {
  // 하단 메뉴 탭 클릭 시 뷰 전환 이벤트 연결
  document.querySelectorAll(".bottom-nav .nav-item").forEach(button => {
    button.addEventListener("click", (e) => {
      // 클릭한 버튼의 대상 뷰 확보
      const targetViewId = button.getAttribute("data-view") || button.closest(".nav-item").getAttribute("data-view");
      
      // 내비게이션 바 액티브 스타일 교체
      document.querySelectorAll(".bottom-nav .nav-item").forEach(btn => btn.classList.remove("active"));
      button.closest(".nav-item").classList.add("active");
      
      // 화면 이동
      switchView(targetViewId);
    });
  });
}

function switchView(viewId) {
  // 타이머 실행 중 화면 이탈 시 타이머 자동 중지
  if (appState.currentView === "timer-view" && viewId !== "timer-view") {
    stopTimerInterval();
  }

  // 모든 뷰 화면 숨김 처리
  Object.keys(elements.views).forEach(key => {
    elements.views[key].classList.remove("active");
  });
  
  // 대상 뷰 활성화
  const targetElement = document.getElementById(viewId);
  if (targetElement) {
    targetElement.classList.add("active");
  }
  
  // 상태 업데이트
  appState.currentView = viewId;

  // 헤더 및 네비게이션바 노출 조건 제어 (타이머 모드 시 풀스크린 확보용으로 숨김)
  if (viewId === "timer-view") {
    elements.appHeader.classList.add("hidden");
    elements.bottomNav.classList.add("hidden");
  } else {
    elements.appHeader.classList.remove("hidden");
    elements.bottomNav.classList.remove("hidden");
    
    // 화면별 재렌더링
    if (viewId === "dashboard-view") {
      renderDashboard();
    } else if (viewId === "history-view") {
      renderHistory();
    }
  }
  
  // 뷰 이동 후 맨 위로 스크롤 리셋
  elements.views.dashboard.parentElement.scrollTop = 0;
}

// --- 3. 오디오 합성 피드백 (Web Audio API) ---
// 외부 사운드 리소스 장애 가능성을 원천 차단하기 위해 브라우저에서 직접 소리를 주파수로 생성합니다.
function playSound(type) {
  if (!appState.settings.soundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    if (type === "prep") {
      // 틱 신호음 (준비 카운트다운)
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, now);
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      oscillator.start(now);
      oscillator.stop(now + 0.12);
    } 
    else if (type === "start") {
      // 동작 개시음 (차임벨 벨소리)
      oscillator.type = "sine";
      // 도(C5) - 솔(G5) 멜로디
      oscillator.frequency.setValueAtTime(523.25, now);
      oscillator.frequency.setValueAtTime(783.99, now + 0.15);
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      oscillator.start(now);
      oscillator.stop(now + 0.45);
    } 
    else if (type === "complete") {
      // 축하 / 완료 팡파르 (도-미-솔-도)
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(523.25, now); // C5
      oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
      oscillator.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      oscillator.start(now);
      oscillator.stop(now + 0.6);
    }
  } catch (err) {
    console.warn("오디오 플레이 장치가 준비되지 않았거나 브라우저에서 차단되었습니다.", err);
  }
}

// --- 4. 인공지능 음성 가이드 (Web Speech API TTS) ---
function speakText(message) {
  if (!appState.settings.ttsEnabled) return;
  
  try {
    // 진행 중인 모든 음성을 취소하고 대기열을 초기화합니다.
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "ko-KR"; // 한국어 강제
    utterance.rate = 1.0;     // 보통 빠르기
    utterance.pitch = 1.0;    // 보통 높이
    
    // 한국어 기본 보이스 강제 배정 시도
    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(voice => voice.lang.includes("KR") || voice.lang.includes("ko"));
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn("음성 합성 엔진(TTS)을 사용할 수 없는 브라우저입니다.", error);
  }
}

// --- 5. 날짜 처리 유틸리티 ---
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 연속 출석 일수(Streak) 유효성 검사
function validateStreak() {
  const today = getTodayString();
  const yesterday = getYesterdayString();
  
  const dates = appState.userStats.completedDates;
  if (dates.length === 0) {
    appState.userStats.streak = 0;
    saveUserData();
    return;
  }
  
  // 만약 마지막 운동 날짜가 오늘이나 어제가 아니라면 연속 기록이 끊어진 것이므로 0으로 리셋
  const lastDate = appState.userStats.lastCompletedDate;
  if (lastDate !== today && lastDate !== yesterday) {
    appState.userStats.streak = 0;
    saveUserData();
  }
}

// 환영인사 시간대별 다이내믹 변경
function updateGreetingMessage() {
  const hour = new Date().getHours();
  let greeting = "안녕하세요! 👋";
  if (hour >= 5 && hour < 9) {
    greeting = "상쾌한 아침이에요! 🌅";
  } else if (hour >= 9 && hour < 17) {
    greeting = "오늘도 활기찬 하루 되세요! 💻";
  } else if (hour >= 17 && hour < 22) {
    greeting = "하루를 부드럽게 마무리해봐요! 🧘";
  } else {
    greeting = "숙면을 취할 준비를 해볼까요? 🌙";
  }
  elements.greetingText.innerText = greeting;
}

// --- 6. 대시보드 화면 렌더링 ---
function renderDashboard() {
  // 1. 스트릭 상태 뱃지 업데이트
  const streak = appState.userStats.streak;
  elements.streakBadge.innerHTML = `🔥 ${streak}일 연속`;
  
  // 2. 오늘의 통계 갱신
  const today = getTodayString();
  
  // 오늘 완료한 스트레칭 수량 계산
  const todayCompletedCount = appState.userStats.completedDates.filter(d => d === today).length;
  elements.todayCount.innerText = `${todayCompletedCount}개`;
  
  // 오늘 완료한 시간 추적
  const totalTodayMinutes = todayCompletedCount * 2.5; // 한 판당 2.5분 고정
  elements.todayTime.innerText = `${totalTodayMinutes}분`;
  
  // 3. 이번 주 출석 현황판 렌더링 (월~일 기준)
  renderWeeklyTracker();

  // 4. 루틴 리스트 렌더링
  renderRoutineList();
}

function renderWeeklyTracker() {
  elements.weekDaysContainer.innerHTML = "";
  
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ...
  
  // 월요일을 시작 요일로 정렬 (일요일은 마지막 6으로 변경)
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  
  const dayNames = ["월", "화", "수", "목", "금", "토", "일"];
  
  for (let i = 0; i < 7; i++) {
    // 월요일 기준으로 각 요일 날짜 구하기
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + mondayOffset + i);
    
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const isCompleted = appState.userStats.completedDates.includes(dateStr);
    const isToday = dateStr === getTodayString();
    
    // 요일 도트 HTML 생성
    const dayDot = document.createElement("div");
    dayDot.className = "day-circle";
    
    let dotClass = "day-dot";
    if (isCompleted) dotClass += " completed";
    if (isToday) dotClass += " today";
    
    dayDot.innerHTML = `
      <div class="${dotClass}">${isCompleted ? "" : targetDate.getDate()}</div>
      <span class="day-label">${dayNames[i]}</span>
    `;
    
    elements.weekDaysContainer.appendChild(dayDot);
  }
}

function renderRoutineList() {
  elements.routineListContainer.innerHTML = "";
  
  // 현재 카테고리(stretch 또는 workout)에 해당되는 루틴만 필터링
  const filteredRoutines = stretchingRoutines.filter(routine => {
    const routineType = routine.type || "stretch";
    return routineType === appState.selectedCategory;
  });
  
  filteredRoutines.forEach(routine => {
    const card = document.createElement("div");
    card.className = "routine-card";
    card.setAttribute("data-id", routine.id);
    
    // 시간 표시 텍스트 계산
    const minutes = Math.floor(routine.duration / 60);
    const seconds = routine.duration % 60;
    const timeText = seconds > 0 ? `${minutes}분 ${seconds}초` : `${minutes}분`;
    
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
      <div class="routine-card-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    `;
    
    // 카드 클릭 시 루틴 상세 정보로 이동
    card.addEventListener("click", () => {
      openRoutineDetails(routine);
    });
    
    elements.routineListContainer.appendChild(card);
  });
}

// --- 7. 루틴 상세 화면 열기 ---
function openRoutineDetails(routine) {
  appState.selectedRoutine = routine;
  
  // 홈트레이닝과 스트레칭 텍스트 구분
  const exTypeLabel = routine.type === "workout" ? "맨몸 운동" : "스트레칭";
  const startBtnLabel = routine.type === "workout" ? "트레이닝 시작하기 ⚡" : "스트레칭 시작하기 ⚡";
  
  // 히어로 헤더 꾸미기
  elements.detailHeroCard.innerHTML = `
    <div class="hero-header">
      <div class="hero-icon">${routine.icon}</div>
      <div class="hero-title-box">
        <h2 class="hero-title">${routine.title}</h2>
        <div class="routine-card-meta">
          <span class="meta-item">⏱️ 총 5개 동작 (2분 30초)</span>
          <span class="meta-item">난이도: ${routine.difficulty}</span>
        </div>
      </div>
    </div>
    <p class="hero-desc">${routine.description}</p>
  `;
  
  // 수록된 5개 동작 리스트 드로잉
  elements.detailExListContainer.innerHTML = "";
  routine.exercises.forEach((ex, idx) => {
    const item = document.createElement("div");
    item.className = "ex-detail-item";
    
    item.innerHTML = `
      <div class="ex-number">${idx + 1}</div>
      <div class="ex-text-box">
        <span class="ex-name">${ex.name}</span>
        <span class="ex-desc">${ex.description}</span>
      </div>
      <div class="ex-dur">${ex.duration}초</div>
    `;
    
    elements.detailExListContainer.appendChild(item);
  });
  
  // 섹션 제목 동적 변경
  const listTitle = document.querySelector(".exercise-list-section h3");
  if (listTitle) {
    listTitle.innerText = `포함된 ${exTypeLabel} 동작`;
  }
  
  // 하단 메인 시작 버튼 텍스트 연동
  elements.btnStartRoutine.innerText = startBtnLabel;
  
  switchView("routine-detail-view");
}

// --- 8. 타이머 작동 핵심 엔진 (Timer Section) ---
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
  
  // 모든 인덱스 초과 시 루틴 완료 처리
  if (index >= routine.exercises.length) {
    completeRoutine();
    return;
  }
  
  appState.currentExerciseIndex = index;
  const currentEx = routine.exercises[index];
  
  // 1. UI 텍스트 동기화
  elements.currentExIndex.innerText = index + 1;
  elements.totalExCount.innerText = function stopTimerInterval() {
  if (appState.timerIntervalId) {
    clearInterval(appState.timerIntervalId);
    appState.timerIntervalId = null;
  }
}

// 8-4. 스트레칭 및 홈트 1세트 완료 축하 및 저장
function completeRoutine() {
  stopTimerInterval();
  playSound("complete");
  
  const completedRoutine = appState.selectedRoutine;
  const todayStr = getTodayString();
  const yesterdayStr = getYesterdayString();
  
  // 1. 유저 통계 데이터 갱신
  appState.userStats.completedDates.push(todayStr);
  appState.userStats.totalRoutinesCompleted += 1;
  appState.userStats.totalMinutes += 2.5; // 한 루틴당 2분 30초 고정 누적
  
  // 2. 연속 스트릭 일수 정밀 계산
  const lastDate = appState.userStats.lastCompletedDate;
  if (lastDate === yesterdayStr) {
    // 어제 운동을 했고 오늘 마쳤으니 스트릭을 1 증가시킴
    appState.userStats.streak += 1;
  } else if (lastDate === todayStr) {
    // 오늘 이미 운동을 한 번 이상 완료했으면 스트릭은 그대로 유지
  } else {
    // 그 외의 경우(어제 운동을 안 함) 스트릭을 1로 초기화
    appState.userStats.streak = 1;
  }
  
  appState.userStats.lastCompletedDate = todayStr;
  
  // 로컬스토리지 백업
  saveUserData();
  
  // 3. 축하 알림 팝업 및 홈으로 가기
  const ttsMessage = completedRoutine.type === "workout"
    ? "트레이닝 완료! 근력이 한층 더 강화되었습니다. 수고하셨습니다."
    : "스트레칭 완료! 오늘도 몸과 마음을 건강하게 채우셨습니다. 수고하셨어요.";
    
  speakText(ttsMessage);
  
  alert(`축하합니다! 🎉\n[${completedRoutine.title}]을 완료하셨습니다!\n오늘 연속 출석은 ${appState.userStats.streak}일째입니다.`);
  
  switchView("dashboard-view");
}

// 타이머 일시정지 / 재생 토글
function toggleTimerPlayState() {
  if (!appState.timerIntervalId) return;
  
  appState.isPaused = !appState.isPaused;
  
  if (appState.isPaused) {
    // 일시정지 아이콘(재생 삼각형으로 교체)
    elements.timerToggleIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
    speakText("일시정지");
  } else {
    // 재생 중 아이콘(일시정지 두줄로 교체)
    elements.timerToggleIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
    speakText("재생");
  }
}

// --- 9. 통계 기록 뷰 렌더링 ---
function renderHistory() {
  const stats = appState.userStats;
  
  // 상단 종합 수치 바인딩
  const uniqueDays = [...new Set(stats.completedDates)].length;
  elements.statsTotalDays.innerText = `${uniqueDays}일`;
  elements.statsTotalTime.innerText = `${Math.round(stats.totalMinutes)}분`;
  elements.statsTotalCount.innerText = `${stats.totalRoutinesCompleted}회`;
  
  // 활동 로그 리스트 출력
  elements.historyListContainer.innerHTML = "";
  
  if (stats.completedDates.length === 0) {
    elements.historyListContainer.innerHTML = `
      <div class="no-history">아직 완료한 기록이 없습니다. 스트레칭을 시작해보세요!</div>
    `;
    return;
  }
  
  // 역순(최신순) 정렬하여 목록 생성
  const historyLog = [...stats.completedDates].reverse();
  
  historyLog.forEach((dateStr) => {
    const item = document.createElement("div");
    item.className = "history-item";
    
    item.innerHTML = `
      <div class="history-info">
        <span class="history-title">⚡ 일일 트레이닝 완수</span>
        <span class="history-date">${dateStr}</span>
      </div>
      <div class="history-meta">
        <span class="history-dur">2.5분 완료</span>
        <span class="history-xp">🔥 10 XP</span>
      </div>
    `;
    
    elements.historyListContainer.appendChild(item);
  });
}

// 카테고리 필터 변경 함수
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

// --- 10. 세팅 관리 및 이벤트 핸들러 모음 ---
function setupActionListeners() {
  // 카테고리 필터 스위치 이벤트 연결
  elements.btnFilterStretch.addEventListener("click", () => {
    setCategoryFilter("stretch");
  });
  
  elements.btnFilterWorkout.addEventListener("click", () => {
    setCategoryFilter("workout");
  });

  // 루틴 정보 뒤로가기 버튼
  elements.btnDetailBack.addEventListener("click", () => {
    switchView("dashboard-view");
  });
  
  // 루틴 운동 시작 버튼
  elements.btnStartRoutine.addEventListener("click", () => {
    startRoutineTimer();
  });
  
  // 타이머 중단/나가기 버튼
  elements.btnTimerExit.addEventListener("click", () => {
    if (confirm("현재 운동이 진행 중입니다. 정말로 중단하고 대시보드로 나가시겠습니까?")) {
      stopTimerInterval();
      switchView("dashboard-view");
    }
  });
  
  // 타이머 이전 버튼 (첫 번째 단계면 클릭 무시)
  elements.btnTimerPrev.addEventListener("click", () => {
    if (appState.currentExerciseIndex > 0) {
      loadExercise(appState.currentExerciseIndex - 1);
    }
  });
  
  // 타이머 재생/일시정지 버튼
  elements.btnTimerToggle.addEventListener("click", () => {
    toggleTimerPlayState();
  });
  
  // 타이머 다음 버튼 (마지막 단계면 완료 화면으로 연결)
  elements.btnTimerNext.addEventListener("click", () => {
    loadExercise(appState.currentExerciseIndex + 1);
  });
  
  // 타이머 화면 내 퀵 오디오 토글
  elements.btnToggleSound.addEventListener("click", () => {
    appState.settings.soundEnabled = !appState.settings.soundEnabled;
    saveSettingsData();
    updateTimerSoundToggleUI();
    // 환경설정 탭 스위치와 동기화
    elements.settingSound.checked = appState.settings.soundEnabled;
  });
  
  // 타이머 화면 내 퀵 TTS 토글
  elements.btnToggleTts.addEventListener("click", () => {
    appState.settings.ttsEnabled = !appState.settings.ttsEnabled;
    saveSettingsData();
    updateTimerSoundToggleUI();
    // 환경설정 탭 스위치와 동기화
    elements.settingTts.checked = appState.settings.ttsEnabled;
  });
 
  // 환경설정 변경 이벤트
  elements.settingTts.addEventListener("change", (e) => {
    appState.settings.ttsEnabled = e.target.checked;
    saveSettingsData();
    updateTimerSoundToggleUI();
  });
  
  elements.settingSound.addEventListener("change", (e) => {
    appState.settings.soundEnabled = e.target.checked;
    saveSettingsData();
    updateTimerSoundToggleUI();
  });
  
  elements.settingPrepTime.addEventListener("change", (e) => {
    appState.settings.prepTime = parseInt(e.target.value, 10);
    saveSettingsData();
  });
  
  // 전체 데이터 리셋 버튼
  elements.btnResetData.addEventListener("click", () => {
    const check1 = confirm("경고! 지금까지의 모든 출석 체크, 스트릭, 누적 시간 기록이 삭제됩니다. 계속하시겠습니까?");
    if (check1) {
      const check2 = prompt("정말로 초기화하려면 '초기화'라고 입력창에 입력해주세요.");
      if (check2 === "초기화") {
        // 데이터 전면 리셋
        appState.userStats = {
          completedDates: [],
          totalMinutes: 0,
          totalRoutinesCompleted: 0,
          streak: 0,
          lastCompletedDate: ""
        };
        saveUserData();
        loadUserData();
        alert("기록 데이터가 완벽하게 복구 및 청소되었습니다.");
        // 내비게이션 바 홈으로 리다이렉트
        document.getElementById("nav-btn-home").click();
      } else {
        alert("입력값이 올바르지 않아 초기화가 취소되었습니다.");
      }
    }
  });
}

function updateTimerSoundToggleUI() {
  // TTS 가이드 오토 토글 디자인
  if (appState.settings.ttsEnabled) {
    elements.btnToggleTts.classList.remove("muted");
    elements.btnToggleTts.innerText = "🗣️";
  } else {
    elements.btnToggleTts.classList.add("muted");
    elements.btnToggleTts.innerText = "🔇";
  }
  
  // 알림 효과음 오토 토글 디자인
  if (appState.settings.soundEnabled) {
    elements.btnToggleSound.classList.remove("muted");
    elements.btnToggleSound.innerText = "🔊";
  } else {
    elements.btnToggleSound.classList.add("muted");
    elements.btnToggleSound.innerText = "🔇";
  }
}
