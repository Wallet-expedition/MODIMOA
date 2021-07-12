# Frontend

## Stacks

- React

- Redux

- Material-ui

## Design Pattern

- Container & Presenter

## Route

```markdown
"/" : 시작 페이지
"/main" : 메인 페이지
"/login" : 로그인 페이지
"/list" : 상품 목록 페이지
"/:id" : 상품 상세 페이지
```

## Lint

### Quotation

- Double Quotation

### SCSS

- base : mixin, variable 등 다른 scss에서 활용할 수 있는 기능을 작성

- components : 각 컴포넌트별 scss 작성

- css 폴더에 페이지 이름과 같은 scss 파일 생성 후, base와 components에서 import해서 사용

  - 이 scss 파일은 각 컴포넌트가 아닌 페이지에서 한꺼번에 import해서 사용

### Prettier Setting

### .env 파일 생성 경로

```markdown
frontend
.node_modules
public
src
.env
```

### ".env" 내부

```tex
REACT_APP_SERVER = "~"
REACT_APP_GOOGLE_API_KEY = "~"
REACT_APP_KAKAO_API_KEY = "~"
REACT_APP_FACEBOOK_API_KEY = "~"
```
