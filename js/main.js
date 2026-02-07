/* ==============================================
   심리상담 서비스 웹사이트 - 메인 JavaScript
   ============================================== */

/* 페이지 로드 완료 후 실행 */
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 초기화
    initMobileMenu();

    // 현재 페이지 네비게이션 활성화
    setActiveNavigation();

    // 폼이 있다면 유효성 검사 초기화
    initFormValidation();

    // 자가진단 체크리스트가 있다면 초기화
    initSelfCheckList();
});

/* ==============================================
   모바일 메뉴 토글 기능
   ============================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');

            // 아이콘 변경 (햄버거 <-> X)
            const icon = this.textContent;
            this.textContent = icon === '☰' ? '✕' : '☰';
        });

        // 메뉴 항목 클릭시 모바일 메뉴 닫기
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('show');
                    menuToggle.textContent = '☰';
                }
            });
        });
    }
}

/* ==============================================
   현재 페이지 네비게이션 활성화
   ============================================== */
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

/* ==============================================
   폼 유효성 검사
   ============================================== */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 모든 에러 초기화
            clearFormErrors();

            // 유효성 검사 수행
            let isValid = true;

            // 이름 검사
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                showError(name, '이름을 입력해주세요.');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError(name, '이름은 2글자 이상 입력해주세요.');
                isValid = false;
            }

            // 연락처 검사
            const phone = document.getElementById('phone');
            const phonePattern = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
            if (!phone.value.trim()) {
                showError(phone, '연락처를 입력해주세요.');
                isValid = false;
            } else if (!phonePattern.test(phone.value.replace(/\s/g, ''))) {
                showError(phone, '올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)');
                isValid = false;
            }

            // 이메일 검사 (선택사항이지만 입력시 형식 검사)
            const email = document.getElementById('email');
            if (email && email.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    showError(email, '올바른 이메일 형식을 입력해주세요.');
                    isValid = false;
                }
            }

            // 상담 희망일시 검사
            const consultDate = document.getElementById('consultDate');
            if (consultDate && !consultDate.value) {
                showError(consultDate, '상담 희망일시를 선택해주세요.');
                isValid = false;
            } else if (consultDate && consultDate.value) {
                // 과거 날짜 검사
                const selectedDate = new Date(consultDate.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                    showError(consultDate, '오늘 이후의 날짜를 선택해주세요.');
                    isValid = false;
                }
            }

            // 문의내용 검사
            const message = document.getElementById('message');
            if (message && !message.value.trim()) {
                showError(message, '문의내용을 입력해주세요.');
                isValid = false;
            } else if (message && message.value.trim().length < 10) {
                showError(message, '문의내용은 10글자 이상 입력해주세요.');
                isValid = false;
            }

            // 모든 유효성 검사 통과시 폼 제출
            if (isValid) {
                submitForm(contactForm);
            } else {
                // 첫 번째 에러 필드로 스크롤
                const firstError = document.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // 실시간 유효성 검사 (입력시 에러 제거)
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup.classList.contains('error')) {
                    formGroup.classList.remove('error');
                }
            });
        });
    }
}

/* 에러 메시지 표시 함수 */
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');

    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

/* 모든 에러 메시지 제거 함수 */
function clearFormErrors() {
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
}

/* 폼 제출 함수 */
function submitForm(form) {
    // 실제 서버 연동시 이 부분을 수정하세요
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('제출된 데이터:', data);

    // 성공 메시지 표시
    showAlert('success', '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');

    // 폼 초기화
    form.reset();

    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==============================================
   자가진단 체크리스트 기능
   ============================================== */
function initSelfCheckList() {
    const checklistForm = document.getElementById('checklistForm');
    const submitBtn = document.getElementById('submitChecklist');
    const resetBtn = document.getElementById('resetChecklist');

    if (checklistForm) {
        // 제출 버튼 클릭 이벤트
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                calculateChecklistResult();
            });
        }

        // 초기화 버튼 클릭 이벤트
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetChecklist();
            });
        }

        // 체크박스 변경시 체크된 항목 수 업데이트
        const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateCheckCount);
        });
    }
}

/* 체크된 항목 수 업데이트 */
function updateCheckCount() {
    const checklistForm = document.getElementById('checklistForm');
    const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]:checked');
    const countDisplay = document.getElementById('checkCount');

    if (countDisplay) {
        countDisplay.textContent = checkboxes.length;
    }
}

/* 자가진단 결과 계산 및 표시 */
function calculateChecklistResult() {
    const checklistForm = document.getElementById('checklistForm');
    const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]');
    const checkedCount = checklistForm.querySelectorAll('input[type="checkbox"]:checked').length;
    const totalCount = checkboxes.length;

    // 결과 표시 영역
    const resultBox = document.getElementById('checklistResult');
    const resultScore = document.getElementById('resultScore');
    const resultText = document.getElementById('resultText');
    const resultDescription = document.getElementById('resultDescription');

    if (!resultBox || !resultScore || !resultText || !resultDescription) {
        return;
    }

    // 결과 분석
    let level = '';
    let description = '';
    let recommendation = '';

    const percentage = (checkedCount / totalCount) * 100;

    if (percentage <= 20) {
        level = '양호';
        description = '현재 심리적 상태가 비교적 안정적입니다.';
        recommendation = '현재의 긍정적인 상태를 유지하시면 좋겠습니다. 일상에서 스트레스 관리를 꾸준히 하시고, 자기 돌봄을 지속해주세요.';
    } else if (percentage <= 40) {
        level = '주의';
        description = '약간의 심리적 어려움이 감지됩니다.';
        recommendation = '현재 겪고 있는 스트레스나 감정적 어려움에 주의를 기울이시면 좋겠습니다. 필요하시다면 전문가와의 상담을 고려해보세요.';
    } else if (percentage <= 60) {
        level = '관심';
        description = '심리적 지원이 필요한 상태입니다.';
        recommendation = '전문가와의 상담을 권장드립니다. 혼자 감당하기 어려운 감정들이 있을 수 있으니, 전문적인 도움을 받으시면 도움이 될 것입니다.';
    } else {
        level = '즉시 상담 권장';
        description = '전문적인 심리 상담이 필요합니다.';
        recommendation = '가능한 빠른 시일 내에 전문가와 상담하시길 강력히 권장합니다. 혼자 고민하지 마시고, 전문가의 도움을 받으시면 많은 도움이 될 것입니다.';
    }

    // 결과 표시
    resultScore.textContent = `${checkedCount} / ${totalCount}`;
    resultText.textContent = `심리 상태: ${level}`;
    resultDescription.innerHTML = `
        <p style="margin-bottom: 1rem;"><strong>${description}</strong></p>
        <p>${recommendation}</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #7B9E89;">
            ※ 이 결과는 참고용이며, 정확한 진단은 전문가와의 상담이 필요합니다.
        </p>
    `;

    // 결과 박스 표시
    resultBox.classList.add('show');

    // 결과로 스크롤
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* 체크리스트 초기화 */
function resetChecklist() {
    const checklistForm = document.getElementById('checklistForm');
    const resultBox = document.getElementById('checklistResult');

    if (checklistForm) {
        // 모든 체크박스 해제
        const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // 체크 카운트 업데이트
        updateCheckCount();
    }

    // 결과 박스 숨기기
    if (resultBox) {
        resultBox.classList.remove('show');
    }

    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==============================================
   알림 메시지 표시 함수
   ============================================== */
function showAlert(type, message) {
    // 기존 알림 제거
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // 새 알림 생성
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // 폼 상단에 삽입
    const form = document.querySelector('form');
    if (form) {
        form.parentElement.insertBefore(alert, form);
        alert.classList.add('show');

        // 5초 후 자동 제거
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    }
}

/* ==============================================
   부드러운 스크롤 효과 (앵커 링크)
   ============================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ==============================================
   연락처 자동 포맷팅 (010-1234-5678)
   ============================================== */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length > 3 && value.length <= 7) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        } else if (value.length > 7) {
            value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
        }

        e.target.value = value;
    });
}

/* ==============================================
   날짜 입력 최소값 설정 (오늘 날짜)
   ============================================== */
const dateInput = document.getElementById('consultDate');
if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    dateInput.setAttribute('min', minDate);
}
