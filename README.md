# 마음치유 심리상담센터 웹사이트

따뜻하고 전문적인 심리상담 서비스를 위한 반응형 웹사이트입니다.

## 프로젝트 개요

이 프로젝트는 순수 HTML, CSS, JavaScript만을 사용하여 제작된 심리상담센터 웹사이트입니다.
외부 라이브러리 의존성을 최소화하여 가볍고 빠르게 동작하며, 모든 주요 브라우저에서 호환됩니다.

## 주요 기능

### 1. 홈페이지 (index.html)
- 서비스 소개 및 주요 상담 프로그램 안내
- 상담 과정 단계별 설명
- 센터 선택 이유 및 장점 소개
- CTA(Call To Action) 섹션으로 예약 유도

### 2. 서비스 소개 (service.html)
- 6가지 상담 서비스 상세 설명
  - 개인 상담
  - 가족 상담
  - 부부/커플 상담
  - 청소년 상담
  - 직장인 상담
  - 온라인 상담
- **심리 자가진단 체크리스트** (인터랙티브 기능)
  - 15개 문항으로 구성
  - 실시간 체크 카운트 표시
  - 자동 결과 분석 및 피드백
  - 초기화 기능
- 상담료 안내

### 3. 예약/문의 (contact.html)
- **예약 폼** (클라이언트 측 유효성 검사 포함)
  - 이름: 2글자 이상 필수
  - 연락처: 자동 하이픈 포맷팅 (010-1234-5678)
  - 이메일: 올바른 형식 검증
  - 상담 유형: 6가지 선택 옵션
  - 상담 희망 일시: 과거 날짜 선택 방지
  - 문의 내용: 10글자 이상 필수
  - 개인정보 수집 동의
- 연락처 정보 (전화, 이메일, 카카오톡)
- 오시는 길 안내
- FAQ (자주 묻는 질문)

## 파일 구조

```
/Users/yujaeseong/workspace/260207/
├── index.html           # 홈페이지
├── service.html         # 서비스 소개
├── contact.html         # 예약/문의
├── css/
│   └── style.css       # 메인 스타일시트
├── js/
│   └── main.js         # JavaScript 기능
└── README.md           # 프로젝트 문서
```

## 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, CSS Variables, 애니메이션
- **JavaScript (ES6+)**: 바닐라 JavaScript
- **폰트**: Google Fonts - Noto Sans KR

## 주요 기능 상세

### 1. 반응형 디자인
- 데스크톱 (1200px+)
- 태블릿 (768px ~ 1199px)
- 모바일 (~ 767px)
- 모바일 메뉴 토글 기능

### 2. 폼 유효성 검사
```javascript
// 실시간 유효성 검사
- 이름: 2글자 이상
- 연락처: 010-XXXX-XXXX 형식
- 이메일: example@domain.com 형식
- 날짜: 오늘 이후만 선택 가능
- 문의내용: 10글자 이상
```

### 3. 자가진단 체크리스트
```javascript
// 결과 분석 기준
- 0-20%: 양호
- 21-40%: 주의
- 41-60%: 관심 필요
- 61-100%: 즉시 상담 권장
```

### 4. 사용자 경험(UX) 개선
- 부드러운 스크롤 애니메이션
- 호버 효과 및 트랜지션
- 로딩 및 에러 상태 처리
- 성공/실패 알림 메시지
- 접근성 고려 (키보드 네비게이션)

## 사용 방법

### 1. 로컬에서 실행
```bash
# 방법 1: 파일 탐색기에서 index.html 더블클릭

# 방법 2: VS Code Live Server 사용
# - VS Code에서 프로젝트 열기
# - index.html 우클릭 > "Open with Live Server"

# 방법 3: Python 간이 서버
cd /Users/yujaeseong/workspace/260207
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

### 2. 웹 서버 배포
1. 모든 파일을 웹 서버 루트 디렉토리에 업로드
2. index.html이 루트에 위치하도록 설정
3. 서버 설정에서 404 에러 페이지 설정 (선택사항)

## 브라우저 호환성

✅ **완벽 지원**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

⚠️ **부분 지원**
- Internet Explorer 11 (일부 CSS 기능 제한)

## 커스터마이징 가이드

### 색상 변경
`css/style.css` 파일 상단의 CSS 변수를 수정하세요:

```css
:root {
    --primary-color: #7B9E89;      /* 메인 컬러 */
    --secondary-color: #F4E8D8;    /* 보조 컬러 */
    --accent-color: #D4A574;       /* 강조 컬러 */
}
```

### 연락처 정보 변경
각 HTML 파일의 푸터 섹션에서 수정:

```html
<p>
    전화: 02-1234-5678<br>
    이메일: info@mindhealing.com<br>
    ...
</p>
```

### 자가진단 질문 추가/수정
`service.html`의 체크리스트 섹션과 `js/main.js`의 결과 계산 로직을 수정하세요.

## 실제 서비스 적용시 추가 작업

### 1. 백엔드 연동
```javascript
// js/main.js의 submitForm 함수 수정
function submitForm(form) {
    const formData = new FormData(form);

    // 실제 API 엔드포인트로 전송
    fetch('/api/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showAlert('success', '예약이 완료되었습니다.');
    })
    .catch(error => {
        showAlert('error', '오류가 발생했습니다. 다시 시도해주세요.');
    });
}
```

### 2. 지도 API 연동
`contact.html`의 지도 영역에 네이버 지도 또는 카카오맵 API를 추가하세요.

```html
<!-- 네이버 지도 예시 -->
<div id="map" style="width:100%;height:400px;"></div>
<script type="text/javascript"
    src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID">
</script>
```

### 3. 보안 강화
- HTTPS 적용 (필수)
- CSRF 토큰 추가
- 서버 측 유효성 검사 강화
- SQL Injection 방지
- XSS 공격 방어

### 4. SEO 최적화
- sitemap.xml 생성
- robots.txt 설정
- Open Graph 태그 추가
- 구조화된 데이터 마크업 (Schema.org)

### 5. 분석 도구 연동
- Google Analytics
- 네이버 애널리틱스
- 페이스북 픽셀

## 코드 구조 설명

### CSS 구조 (style.css)
1. 전역 설정 및 CSS 변수
2. 기본 스타일
3. 헤더 및 네비게이션
4. 히어로 섹션
5. 버튼 및 폼
6. 카드 레이아웃
7. 체크리스트
8. 푸터
9. 애니메이션
10. 반응형 미디어 쿼리

### JavaScript 구조 (main.js)
1. 초기화 함수
2. 모바일 메뉴 토글
3. 폼 유효성 검사
4. 자가진단 체크리스트
5. 유틸리티 함수
6. 이벤트 리스너

## 접근성(Accessibility)

- 시맨틱 HTML 사용
- 키보드 네비게이션 지원
- 적절한 색상 대비율
- 폼 레이블 명확화
- 에러 메시지 명확성

## 성능 최적화

- 최소한의 외부 의존성
- CSS/JS 파일 최소화 가능
- 이미지 최적화 (실제 이미지 사용시)
- 지연 로딩 구현 가능

## 문제 해결

### 폼이 제출되지 않아요
1. 브라우저 콘솔(F12)에서 에러 확인
2. 모든 필수 항목 입력 확인
3. JavaScript 파일 로딩 확인

### 모바일에서 레이아웃이 깨져요
1. viewport 메타 태그 확인
2. CSS 미디어 쿼리 동작 확인
3. 브라우저 캐시 삭제 후 재시도

### 자가진단 결과가 나오지 않아요
1. JavaScript 콘솔 에러 확인
2. 체크박스 선택 후 "결과 확인하기" 버튼 클릭
3. 브라우저의 JavaScript 활성화 확인

## 라이선스

이 프로젝트는 교육 및 참고 목적으로 제작되었습니다.
실제 상업적 사용시 적절한 수정과 법적 검토가 필요합니다.

## 제작 정보

- **제작일**: 2024
- **기술**: HTML5, CSS3, JavaScript (ES6+)
- **특징**: 순수 웹 기술, 외부 라이브러리 최소화, 초보자 친화적 코드

## 추가 개선 사항

향후 추가할 수 있는 기능들:

- [ ] 다국어 지원 (영어, 중국어 등)
- [ ] 다크모드 지원
- [ ] 온라인 결제 시스템
- [ ] 실시간 채팅 상담
- [ ] 예약 캘린더 시각화
- [ ] 상담사 프로필 페이지
- [ ] 후기/리뷰 시스템
- [ ] 블로그/칼럼 섹션
- [ ] 회원가입/로그인
- [ ] 마이페이지

---

**문의사항이나 개선 제안이 있으시면 언제든 연락주세요!**
