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

### API KEY

하위 폴더 및 파일 생성

```markdown
src
 - api
   - key.js
   - address.js
```

##### key.js

```javascript
export const googleApiKey = "~";
export const kakaoApiKey = "~";
export const facebookApiKey = "~";
```

##### Address.js

```javascript
export const server = "http://localhost:8080";
```

##### 
