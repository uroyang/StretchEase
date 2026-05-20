/**
 * 스트레칭 및 홈 트레이닝 프로그램 통합 데이터베이스
 * 
 * - type: "stretch" (스트레칭) / "workout" (근력 운동)
 * - 각 루틴은 5개의 동작으로 이루어져 있으며 동작당 30초입니다.
 */
const stretchingRoutines = [
  // === [1] 스트레칭 루틴 데이터 (type: "stretch") ===
  {
    id: "morning",
    title: "아침을 깨우는 전신 스트레칭",
    description: "잠자는 동안 굳어있던 온몸의 근육을 깨우고 신진대사를 활성화합니다.",
    duration: 150,
    difficulty: "쉬움",
    category: "morning",
    type: "stretch",
    icon: "🌅",
    exercises: [
      {
        name: "전신 기지개 켜기",
        duration: 30,
        description: "양손을 깍지 끼고 머리 위로 쭉 뻗으며 발끝까지 전신을 늘려줍니다.",
        tts: "첫 번째 동작은 전신 기지개 켜기입니다. 양손을 깍지 끼고 머리 위로 쭉 뻗으며 기지개를 켜세요. 발끝도 아래로 쭉 뻗어 줍니다. 숨을 편안히 들이마시고 내쉬세요.",
        animationClass: "anim-full-stretch"
      },
      {
        name: "목 좌우 늘리기",
        duration: 30,
        description: "오른손으로 왼쪽 머리를 잡고 오른쪽으로 지긋이 당깁니다. 반대쪽도 동일하게 진행합니다.",
        tts: "목 좌우 늘리기입니다. 먼저 오른손으로 머리 왼쪽을 감싸고 오른쪽으로 지긋이 당겨 어깨와 목 옆선을 늘려줍니다. 반대쪽도 똑같이 진행하며 목 주변의 긴장을 풀어줍니다.",
        animationClass: "anim-neck-stretch"
      },
      {
        name: "옆구리 늘리기",
        duration: 30,
        description: "오른팔을 하늘로 뻗은 뒤 몸통을 왼쪽으로 기울여 옆구리를 늘립니다. 반대쪽도 진행합니다.",
        tts: "옆구리 늘리기입니다. 한쪽 팔을 위로 높이 뻗고 몸통을 옆으로 기울여 갈비뼈 사이사이를 늘려주세요. 반대쪽도 부드럽게 들이쉬는 숨에 세우고 내쉬는 숨에 기울입니다.",
        animationClass: "anim-side-stretch"
      },
      {
        name: "어깨 천천히 돌리기",
        duration: 30,
        description: "어깨 끝에 손을 대거나 편하게 내린 상태에서 앞에서 뒤로 큰 원을 그리며 돌려줍니다.",
        tts: "어깨 천천히 돌리기입니다. 양어깨를 귀 가까이 올렸다가 뒤로 넘기면서 아래로 툭 떨어뜨립니다. 등 뒤의 날개뼈가 서로 가까워지는 것을 느껴보세요.",
        animationClass: "anim-shoulder-roll"
      },
      {
        name: "서서 상체 숙이기",
        duration: 30,
        description: "무릎을 살짝 굽히고 상체를 아래로 늘어뜨려 척추와 다리 뒷면을 이완합니다.",
        tts: "마지막 동작은 서서 상체 숙이기입니다. 무릎을 살짝 굽혀도 좋습니다. 상체의 힘을 완전히 빼고 바닥으로 툭 떨어뜨리세요. 등과 허리가 시원해집니다.",
        animationClass: "anim-forward-fold"
      }
    ]
  },
  {
    id: "neck",
    title: "거북목 & 어깨 통증 완화",
    description: "컴퓨터와 스마트폰 사용으로 지친 목과 뭉친 승모근을 시원하게 풀어줍니다.",
    duration: 150,
    difficulty: "보통",
    category: "neck",
    type: "stretch",
    icon: "💻",
    exercises: [
      {
        name: "거북목 방지 턱 당기기",
        duration: 30,
        description: "검지 손가락으로 턱을 뒤로 꾹 누르며 뒤통수를 뒤로 밀어줍니다. (투턱 만들기)",
        tts: "턱 당기기입니다. 손가락으로 턱을 몸 쪽으로 밀어 넣는 느낌으로 지긋이 눌러줍니다. 정수리가 하늘로 길어지며 목 뒷근육이 늘어나는 것을 느껴보세요.",
        animationClass: "anim-chin-tuck"
      },
      {
        name: "가슴 활짝 열기",
        duration: 30,
        description: "양팔을 옆으로 벌려 가슴을 앞 쪽으로 펴고 날개뼈를 뒤에서 맞닿게 모아줍니다.",
        tts: "가슴 활짝 열기입니다. 양손을 머리 뒤에 대거나 양옆으로 벌려 가슴을 앞 방향으로 시원하게 펴줍니다. 굽어 있던 가슴 앞쪽 근육이 이완됩니다.",
        animationClass: "anim-chest-opener"
      },
      {
        name: "W 자 어깨 스트레칭",
        duration: 30,
        description: "양팔을 위로 뻗었다가 등 근육의 자극을 느끼며 팔꿈치를 아래로 내려 W 모양을 만듭니다.",
        tts: "더블유 자 어깨 스트레칭입니다. 양손을 하늘로 올렸다가, 등 뒤 날개뼈를 꽉 조이면서 팔꿈치를 옆구리 쪽으로 내립니다. 팔 모양이 더블유 자가 되도록 하세요.",
        animationClass: "anim-w-stretch"
      },
      {
        name: "머리 지긋이 눌러 뒷목 늘리기",
        duration: 30,
        description: "두 손으로 뒤통수를 감싸고 턱이 가슴에 닿는 느낌으로 머리를 아래로 지긋이 눌러줍니다.",
        tts: "뒷목 늘리기입니다. 뒤통수에서 손깍지를 끼고, 턱을 가슴 쪽으로 끌어당기며 머리를 아래로 지긋이 누릅니다. 손의 무게감만 이용해서 부드럽게 눌러주세요.",
        animationClass: "anim-neck-down"
      },
      {
        name: "등 뒤로 손 깍지 껴서 올리기",
        duration: 30,
        description: "등 뒤에서 양손을 깍지 끼고 가슴을 펴며 깍지 낀 손을 몸 뒤로 멀리 보냅니다.",
        tts: "마지막 동작은 등 뒤 깍지 끼고 올리기입니다. 등 뒤에서 손깍지를 끼고, 손을 아래와 뒤로 뻗으며 가슴을 활짝 엽니다. 어깨 앞쪽이 매우 시원해집니다.",
        animationClass: "anim-shoulder-back"
      }
    ]
  },
  {
    id: "back",
    title: "허리 통증 예방 스트레칭",
    description: "굳어 있는 척추 마디마디를 움직이고 골반 주변 근육을 풀어 요통을 예방합니다.",
    duration: 150,
    difficulty: "보통",
    category: "back",
    type: "stretch",
    icon: "🧘",
    exercises: [
      {
        name: "척추를 움직이는 고양이 자세",
        duration: 30,
        description: "네발기기 자세에서 숨을 내쉬며 등을 둥글게 말고, 들이쉬며 허리를 아래로 낮춥니다.",
        tts: "고양이 자세입니다. 엎드린 자세에서 숨을 내쉬며 등을 하늘 쪽으로 동그랗게 맙니다. 시선은 배꼽을 보세요. 다시 숨을 들이마시며 가슴을 들어 올려 허리를 아래로 내립니다.",
        animationClass: "anim-cat-cow"
      },
      {
        name: "척추를 이완하는 아기 자세",
        duration: 30,
        description: "무릎을 꿇고 앉아 엉덩이를 발뒤꿈치에 붙인 뒤 양팔을 앞으로 뻗으며 이마를 바닥에 댑니다.",
        tts: "아기 자세입니다. 엉덩이를 뒤꿈치에 붙이고 앉아 상체를 허벅지 위로 엎드립니다. 두 손은 앞으로 길게 뻗고 이마를 바닥에 대어 허리 전체의 긴장을 풀어줍니다.",
        animationClass: "anim-child-pose"
      },
      {
        name: "누워서 무릎 가슴으로 당기기",
        duration: 30,
        description: "바닥에 누워 양손으로 무릎을 감싸 쥐고 가슴 쪽으로 지긋이 당겨줍니다.",
        tts: "누워서 무릎 당기기입니다. 편안하게 등을 대고 누워 무릎을 가슴 가까이 당겨 안아줍니다. 허리 아래쪽 꼬리뼈 부위가 시원하게 이완되는 것을 느낍니다.",
        animationClass: "anim-knee-to-chest"
      },
      {
        name: "엎드려 상체 세우는 코브라 자세",
        duration: 30,
        description: "엎드린 상태에서 양손으로 바닥을 밀며 상체를 세워 척추 앞면을 늘려줍니다.",
        tts: "코브라 자세입니다. 배를 바닥에 대고 엎드려 손으로 바닥을 밀며 가슴과 상체를 부드럽게 들어 올립니다. 허리에 과한 통증이 없는 선까지만 올라오세요.",
        animationClass: "anim-cobra"
      },
      {
        name: "골반 주변 이상근 스트레칭",
        duration: 30,
        description: "누워서 오른쪽 발목을 왼쪽 무릎 위에 얹고(숫자 4 모양), 왼쪽 허벅지를 몸 쪽으로 당깁니다.",
        tts: "마지막 동작은 이상근 스트레칭입니다. 누워서 한쪽 다리를 접어 반대쪽 무릎 위에 얹어 숫자 사자 모양을 만듭니다. 세워진 다리 허벅지 뒤를 잡고 몸 쪽으로 지긋이 당겨 골반을 풉니다.",
        animationClass: "anim-hip-stretch"
      }
    ]
  },
  {
    id: "sleep",
    title: "꿀잠을 부르는 저녁 스트레칭",
    description: "하루 종일 쌓인 몸과 마음의 피로를 비우고 편안한 수면을 준비합니다.",
    duration: 150,
    difficulty: "쉬움",
    category: "sleep",
    type: "stretch",
    icon: "🌙",
    exercises: [
      {
        name: "마음을 차분하게 하는 심호흡",
        duration: 30,
        description: "편안하게 가부좌로 앉아 어깨 힘을 빼고 코로 깊게 들이마시고 입으로 천천히 내쉽니다.",
        tts: "첫 동작은 차분한 호흡입니다. 편안하게 앉거나 누워 몸의 힘을 뺍니다. 코로 숨을 깊게 들이쉬어 배를 부풀렸다가, 입으로 천천히 내쉬며 온몸의 긴장을 놓아줍니다.",
        animationClass: "anim-deep-breathing"
      },
      {
        name: "앉아서 척추 비틀기",
        duration: 30,
        description: "오른손으로 왼쪽 무릎을 잡고 상체를 왼쪽 뒤로 돌려 비틀어 줍니다. 반대쪽도 진행합니다.",
        tts: "앉아서 척추 비틀기입니다. 한 손으로 반대쪽 무릎을 잡고 척추를 위로 세운 상태에서 상체를 뒤쪽으로 지긋이 돌려 비틀어 줍니다. 척추에 쌓인 피로가 정화됩니다. 반대쪽도 동일하게 해주세요.",
        animationClass: "anim-seated-twist"
      },
      {
        name: "나비 자세로 골반 이완하기",
        duration: 30,
        description: "양 발바닥을 서로 맞대고 발뒤꿈치를 몸쪽으로 당긴 뒤 상체를 앞으로 천천히 숙여줍니다.",
        tts: "나비 자세입니다. 양 발바닥을 붙이고 앉아 무릎을 바닥 쪽으로 내립니다. 숨을 내쉬며 상체를 앞으로 편안하게 숙여 골반 안쪽과 허벅지 안쪽 근육을 이완합니다.",
        animationClass: "anim-butterfly"
      },
      {
        name: "다리 벽에 기대어 올리기",
        duration: 30,
        description: "누운 상태에서 엉덩이를 벽에 대고 다리를 위로 곧게 뻗어 하체 부종을 풀어줍니다.",
        tts: "다리 올리기입니다. 누워서 다리를 위로 곧게 뻗어 줍니다. 벽에 기대어도 좋습니다. 다리에 머물던 피와 림프 순환을 도와 하체의 피로를 싹 없애줍니다.",
        animationClass: "anim-legs-up"
      },
      {
        name: "온몸 릴랙스 사바사나",
        duration: 30,
        description: "두 다리를 넓게 벌려 바닥에 누워 양손은 하늘을 향하게 한 후 온몸의 힘을 완전히 뺍니다.",
        tts: "마지막 동작은 사바사나 휴식입니다. 온몸을 바닥에 넓게 눕히고 손바닥은 하늘을 봅니다. 눈을 감고 머리부터 발끝까지 모든 힘을 툭 내려놓으세요. 오늘 하루도 수고하셨습니다.",
        animationClass: "anim-savasana"
      }
    ]
  },

  // === [2] 홈 트레이닝 루틴 데이터 (type: "workout") ===
  {
    id: "fullbody",
    title: "지방 연소 전신 홈트",
    description: "맨몸 다이어트의 핵심 코스! 전신의 체지방을 태우고 기초 체력을 끌어올립니다.",
    duration: 150,
    difficulty: "보통",
    category: "fullbody",
    type: "workout",
    icon: "⚡",
    exercises: [
      {
        name: "전신 유산소 점핑잭",
        duration: 30,
        description: "가볍게 뛰면서 팔과 다리를 양옆으로 동시에 벌렸다 오므립니다. (팔벌려뛰기)",
        tts: "첫 번째 동작은 전신 칼로리 소모를 위한 점핑잭입니다. 가볍게 점프하며 발을 벌리고 양손은 머리 위로 올려 줍니다. 리듬감 있게 숨을 내쉬며 동작을 계속 진행하세요.",
        animationClass: "anim-jumping-jacks"
      },
      {
        name: "기초 하체 스쿼트",
        duration: 30,
        description: "발을 어깨너비로 벌리고, 엉덩이를 무릎 높이까지 앉혔다가 밀어 올립니다.",
        tts: "기초 스쿼트입니다. 발바닥 전체로 지면을 꽉 누르고, 무릎이 흔들리지 않게 주의하며 앉았다가 일어납니다. 허벅지와 엉덩이 근육의 힘에 집중해 보세요.",
        animationClass: "anim-squats"
      },
      {
        name: "상체 강화 팔굽혀펴기",
        duration: 30,
        description: "엎드려 몸을 일직선으로 단단히 잡고, 팔꿈치를 구부려 가슴을 바닥 가까이 내립니다.",
        tts: "팔굽혀펴기입니다. 힘이 많이 든다면 무릎을 바닥에 대고 하셔도 매우 좋습니다. 가슴과 팔 뒤쪽의 근육을 사용해 몸을 곧게 뻗으며 밀어 올리세요.",
        animationClass: "anim-pushups"
      },
      {
        name: "상복부 크런치",
        duration: 30,
        description: "누워서 다리를 굽히고, 명치를 쥐어짜듯 상체 윗부분을 둥글게 말아 올립니다.",
        tts: "상복부 크런치입니다. 뒤통수를 가볍게 받치고, 복부의 수축 힘만으로 상체를 살짝 들어 올려 골반 방향으로 당깁니다. 내려갈 때도 복부 긴장을 유지합니다.",
        animationClass: "anim-crunches"
      },
      {
        name: "코어 강화 버티기 플랭크",
        duration: 30,
        description: "양 팔꿈치를 바닥에 대고 엎드려 머리부터 발뒤꿈치까지 일직선으로 수평을 유지합니다.",
        tts: "마지막 동작은 코어 플랭크입니다. 전신에 힘을 꽉 주세요. 특히 배꼽을 등 쪽으로 바짝 잡아당기고 엉덩이가 들리거나 쳐지지 않게 곧게 버텨줍니다.",
        animationClass: "anim-plank"
      }
    ]
  },
  {
    id: "abs",
    title: "초콜릿 복근 만들기",
    description: "탄탄하고 납작한 배를 원하신다면! 코어와 복직근 전체를 정밀 타격하는 운동입니다.",
    duration: 150,
    difficulty: "어려움",
    category: "abs",
    type: "workout",
    icon: "🍫",
    exercises: [
      {
        name: "복직근 타격 크런치",
        duration: 30,
        description: "누워서 머리와 어깨를 바닥에서 떼어 복부 윗부분을 지긋이 조여줍니다.",
        tts: "첫 동작은 상복부 크런치입니다. 시선은 무릎 위를 보며, 갈비뼈를 아래로 눌러주는 느낌으로 복부를 둥글게 말아 줍니다. 숨을 뱉을 때 머리를 들어 올리세요.",
        animationClass: "anim-crunches"
      },
      {
        name: "하복부 레그레이즈",
        duration: 30,
        description: "누워 다리를 곧게 펴고 아래 허리가 바닥에서 뜨지 않게 유지하며 다리를 올리고 내립니다.",
        tts: "하복부 레그레이즈입니다. 양손을 골반 옆에 대거나 엉덩이 아래에 받칩니다. 허리가 뜨지 않는 깊이까지만 다리를 내렸다가 아랫배 힘으로 끌어 올립니다.",
        animationClass: "anim-legs-up" // 누워 다리 뻗기
      },
      {
        name: "복부 크런치 홀드",
        duration: 30,
        description: "크런치 기본 올라온 자세에서 30초 동안 복부의 긴장감을 유지한 채 멈춰 서 버팁니다.",
        tts: "복부 크런치 홀드입니다. 상체를 둥글게 말아 띄운 후, 그 상태로 호흡을 얕게 쉬며 지긋이 30초 동안 버텨냅니다. 복부가 단단해지는 것을 강하게 느껴보세요.",
        animationClass: "anim-crunches"
      },
      {
        name: "복부 코어 완성 플랭크",
        duration: 30,
        description: "팔꿈치 플랭크 자세에서 흔들림 없이 고정하고 복강 안의 압력을 유지하며 버팁니다.",
        tts: "코어 플랭크입니다. 전신의 잔근육까지 꽉 쥐어 짜낸다는 느낌으로 곧게 기둥을 만듭니다. 복부 전체에 단단한 힘을 유지하고 편안히 호흡을 반복합니다.",
        animationClass: "anim-plank"
      },
      {
        name: "지친 복부 이완 코브라 스트레칭",
        duration: 30,
        description: "엎드려 손바닥으로 바닥을 밀며 상체를 세우고, 복부 앞면을 길게 늘려 이완해 줍니다.",
        tts: "마지막은 복부 스트레칭입니다. 엎드려 상체를 세우며 당겼던 복부 근육을 앞쪽으로 길게 이완시킵니다. 굳었던 허리와 복부가 기분 좋게 펴집니다.",
        animationClass: "anim-cobra"
      }
    ]
  },
  {
    id: "chest",
    title: "탄탄한 가슴 & 어깨",
    description: "굽어 있던 상체를 펴고 가슴 근육과 어깨 라인을 역동적으로 강화하는 상체 루틴입니다.",
    duration: 150,
    difficulty: "어려움",
    category: "chest",
    type: "workout",
    icon: "💪",
    exercises: [
      {
        name: "어깨 웜업 점핑잭",
        duration: 30,
        description: "가볍게 뛰며 팔을 크고 넓게 움직여 어깨와 상체 주변 관절의 체온을 올립니다.",
        tts: "상체 운동에 앞서 웜업을 위한 점핑잭입니다. 팔을 머리 위까지 크고 시원하게 휘두르며 상체와 어깨 관절의 긴장을 부드럽게 활성화하세요.",
        animationClass: "anim-jumping-jacks"
      },
      {
        name: "말린 어깨 가슴 활짝 열기",
        duration: 30,
        description: "양팔을 옆으로 열며 어깨 뒤쪽 견갑골을 꽉 조이고 가슴 대흉근을 늘려 준비합니다.",
        tts: "가슴 활짝 열기입니다. 양팔을 크게 벌려 등 뒤 날개뼈를 조이고 굽어 있는 가슴 앞부분의 이완을 유도합니다. 호흡을 길게 들이마셔 가슴을 부풀립니다.",
        animationClass: "anim-chest-opener"
      },
      {
        name: "표준 팔굽혀펴기",
        duration: 30,
        description: "어깨너비보다 넓게 손을 짚고 엎드려 몸을 수평으로 맞춘 뒤 가슴으로 바닥을 밀어냅니다.",
        tts: "표준 팔굽혀펴기입니다. 팔을 구부릴 때 팔꿈치가 옆으로 너무 벌어지지 않게 주의하고, 바닥을 손바닥 전체로 밀치며 올라옵니다. 가슴 근육의 뻐근함을 느끼세요.",
        animationClass: "anim-pushups"
      },
      {
        name: "무릎 대고 팔굽혀펴기",
        duration: 30,
        description: "무릎을 대고 강도를 낮춘 상태에서 올바른 자세에 집중하여 푸쉬업을 반복합니다.",
        tts: "무릎 대고 팔굽혀펴기입니다. 무릎을 매트에 대어 무게를 덜고, 가슴을 양손 사이 중앙으로 정확히 내렸다가 가슴 근육의 수축력을 느끼며 밀고 밀어냅니다.",
        animationClass: "anim-pushups"
      },
      {
        name: "상체 조율 W 스트레칭",
        duration: 30,
        description: "양팔을 들어 올렸다가 날개뼈 주변 등 근육을 강하게 쥐어짜며 W자를 만듭니다.",
        tts: "마지막 조율 동작 W 스트레칭입니다. 가슴 운동 후 뭉친 가슴을 펴고 어깨 뒷면과 등의 자극을 정돈하여 올바른 상체 라인을 완성합니다.",
        animationClass: "anim-w-stretch"
      }
    ]
  },
  {
    id: "legs",
    title: "하체 튼튼 기초 스쿼트",
    description: "우리 몸에서 가장 큰 근육인 허벅지와 엉덩이를 자극해 칼로리 소모를 극대화합니다.",
    duration: 150,
    difficulty: "보통",
    category: "legs",
    type: "workout",
    icon: "🦵",
    exercises: [
      {
        name: "허벅지 강화 기초 스쿼트",
        duration: 30,
        description: "발을 어깨너비로 벌리고 엉덩이를 의자에 앉듯 낮췄다가 뒤꿈치로 바닥을 짚고 일어섭니다.",
        tts: "첫 동작은 기초 스쿼트입니다. 가슴을 펴고 시선은 정면을 봅니다. 뒤꿈치에 실리는 몸무게를 지탱하며 천천히 깊게 앉았다가, 허벅지 힘으로 지면을 차며 일어섭니다.",
        animationClass: "anim-squats"
      },
      {
        name: "스쿼트 홀드 (버티기)",
        duration: 30,
        description: "스쿼트 자세로 앉은 상태에서 골반과 엉덩이를 무릎 높이에 고정하고 버팁니다.",
        tts: "스쿼트 홀드입니다. 스쿼트 아래 구간에서 정지하세요. 허벅지가 팽팽하게 터지는 자극이 느껴집니다. 호흡을 참지 말고 일정하게 쉬면서 단단히 고정해 줍니다.",
        animationClass: "anim-squats"
      },
      {
        name: "골반 주변 이완 이상근 스트레칭",
        duration: 30,
        description: "누워서 다리 하나를 접어 올리고 가슴 쪽으로 당겨 굳어 있는 하체와 둔근을 이완합니다.",
        tts: "이상근 스트레칭입니다. 누워서 한쪽 다리를 접어 반대쪽 무릎 위에 가로로 얹어 당깁니다. 뻐근했던 엉덩이 심층 근육과 골반 주위가 기분 좋게 풀어집니다.",
        animationClass: "anim-hip-stretch"
      },
      {
        name: "하체 피로 완화 다리 올리기",
        duration: 30,
        description: "등을 대고 편하게 누워 하체 혈액 순환을 위해 양다리를 하늘 위로 수직으로 뻗어줍니다.",
        tts: "다리 올리기입니다. 누운 자세에서 양다리를 모아 하늘 높이 들어 올립니다. 하체에 차올랐던 피로 물질과 젖산이 순환되어 풀리게 됩니다.",
        animationClass: "anim-legs-up"
      },
      {
        name: "마무리 전신 이완 서서 숙이기",
        duration: 30,
        description: "서서 양다리를 모으고 천천히 상체를 늘어뜨려 허벅지 뒤쪽 햄스트링을 이완하며 마칩니다.",
        tts: "마지막 동작은 서서 상체 숙이기입니다. 다리 뒤쪽과 등 전체를 축 늘어뜨려 다리 뒷면 햄스트링을 시원하게 스트레칭하며 30초 동안 마지막 숨을 고릅니다.",
        animationClass: "anim-forward-fold"
      }
    ]
  }
];

// 모듈 환경 호환성 바인딩
if (typeof module !== 'undefined' && module.exports) {
  module.exports = stretchingRoutines;
} else {
  window.stretchingRoutines = stretchingRoutines;
}
