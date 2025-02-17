# 🎯 Unwritten_bot - 숨겨진 도전과제의 발견자

디스코드의 숨겨진 도전과제들을 찾아내고 달성을 도와주는 봇입니다. 
예상치 못한 곳에서 특별한 미션을 발견하고, 달성했을 때의 짜릿한 성취감을 함께 경험해보세요!

## 주요 기능
- 🔍 숨겨진 도전과제 발견
- ⭐ 도전과제 진행 상황 추적
- 🏆 달성 보상 시스템
- 📊 사용자별 달성 현황 확인

함께 숨겨진 도전과제의 세계를 탐험해보세요!

## 작업자를 위한 가이드

### 1. Commit Template 적용하기

프로젝트 루트 디렉토리에서 다음 명령어를 실행한다. (루트에 `.gitmessage.txt` 파일이 있다고 가정)  
이후 git commit 명령어를 실행하면, 템플릿으로부터 시작할 수 있다.

```sh
git config commit.template .github/.gitmessage.txt
```

### 2. VSCode를 commit message editor로 설정하기

같은 위치에서 다음 명령어를 실행한다.  
VSCode를 default commit message editor로 설정하는 명령어이다.

```sh
git config --global core.editor "code --wait"
```

### 3. 작업 과정 이해하기

로컬에서 Discord 봇을 실행하기 위해서는 봇 토큰과 APP ID (슬래시 커맨드 등록)가 필요하다.  
(참고로 이들은 Discord Developer Portal 및 02/17 회의록에서 확인 가능하다.)  
또한, 로컬에서의 백엔드 테스트를 위해 백엔드 api 서버 주소도 저장해두자.  

```
# .env 파일에 아래 내용 작성
# Discord Bot
DISCORD_BOT_TOKEN=your_bot_token_here
APPLICATION_ID=your_app_id_here

# Backend API
BACKEND_API_URL=http://000.000.000.00:3000/api
```

이 값들은 `.env` 파일에 저장하고 `.gitignore`에 추가하여 관리한다.
