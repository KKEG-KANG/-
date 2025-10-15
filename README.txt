# JSON 기반 간편 관리 + 위젯 포함 스타터

## 바꾸는 법 (코드 손대기 싫다면 이 방법)
1) 브라우저에서 `/admin/` 페이지로 가서 값을 수정
2) **JSON 다운로드** 버튼 클릭 → `data/site.json` 파일로 저장
3) GitHub 저장소에서 `data/site.json` 파일을 교체 업로드(Commit)
4) 1분 내 배포 반영

※ 보안상 브라우저에서 직접 커밋은 막아둠(토큰 노출 방지). 필요하면 Cloudflare Worker/Netlify Functions로 프록시를 추가해 드릴 수 있음.

## 기능
- `data/site.json`으로 텍스트/링크/임베드 관리
- FAQ 아코디언, 옵션 견적 계산기(프런트만, 서버 불필요)
- 구글폼/지도 임베드
- .nojekyll 포함

## 폴더
- `/data/site.json` : 콘텐츠 설정
- `/admin/` : 브라우저 관리 페이지 (오프라인 저장/다운로드)
- `index.html` / `styles.css` / `script.js` : 본문/스타일/동작

## 한계와 확장
- **정적 호스팅(GitHub Pages)**에서는 DB/로그인/알림톡 등 백엔드가 필요하면 제한됨
  - 가능: UI 상호작용, 계산/필터, 외부 서비스 임베드(구글폼/캘린들리/채널톡 등)
  - 확장: Netlify/Vercel/Cloudflare Pages로 옮겨 Functions + 폼핸들러 사용
