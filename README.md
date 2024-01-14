# Hexhotel Frontend 2024 第九組

## 關於專案
- 使用 Vite 建置 React 搭配 Typescript 開發
- NodeJS 版本 `20.10.0`（建議 `18.16.0` 以上）
- 本機運行
```
npm run build
```

## 使用套件
- react
- react-router
- bootstrap
- axios
- sass

## 專案架構
- assets：靜態檔案，如 JPG、SVG
- components：自定義元件，如 Button、Header、Footer
- hooks：自定義 Hook，可以將常用流程抽出來共用
- pages：頁面，如 Index、Login
- styles：
  - CSS 樣式，支援 SCSS，
  - `_variables.scss`、`index.scss` 參考 `bootstrap`，可自行調整
- services：呼叫 API 功能，使用 `axios` 
- store：全局狀態管理，看是要用 `Redux` 或 `Zustand` 或 `Context`
- utils：常用功能，目前還沒想到（Ｘ
- main.tsx：React 的進入點，`React.StrictMode` 是否要拿掉？ 
- routers.tsx：
  - router 表
  - 目前使用 `HashRouter` ex：XXXXXX/#/index
  - 若部署環境可以設定的話再改成 `BrowserRouter` ex：XXXXX/index
  - 有實做 `PrivateRoute` 功能，看看好不好用（？
    - AuthRoute：登入後才可進入，若未登入則會導回登入頁
    - NonAuthRoute：登入前才可進入，若已登入會導向首頁

## Styles 
- index.scss：引入所有 Bootstrap 樣式，再針對客製化樣式進行調整
- _variables.scss：針對 Figma 重新定義樣式的變數
- _button.scss：簡化 Bootstrap button 樣式，只保留有需要的狀態，目前還有點 bug
- _forms.scss：與原版相同，多新增提示訊息粗體的樣式
- _hero-buttons.scss：自定義元件，所有自定義元件皆需加入 index.scss 中
- 顏色：以下是有定義的顏色變數，可以直接使用
  - <font color=#7B6651>primary-120 #7B6651</font>
  - <font color=#BF9D7D>primary-100 #BF9D7D</font>
  - <font color=#D0B79F>primary-80  #D0B79F</font>
  - <font color=#E1D1C2>primary-60  #E1D1C2</font>
  - <font color=#F1EAE4>primary-40  #F1EAE4</font>
  - <font color=#FAF7F5>primary-20  #FAF7F5</font>
  - <font color=#299F65>success-120 #299F65</font>
  - <font color=#52DD7E>success-100 #52DD7E</font>
  - <font color=#BCFBBD>success-20  #BCFBBD</font>
  - <font color=#E8FEE7>success-10  #E8FEE7</font>
  - <font color=#1D66AC>info-120    #1D66AC</font>
  - <font color=#3BADEF>info-100    #3BADEF</font>
  - <font color=#B1EFFD>info-20     #B1EFFD</font>
  - <font color=#E6FBFE>info-10     #E6FBFE</font>
  - <font color=#C22538>danger-120  #C22538</font>
  - <font color=#DA3E51>danger-100  #DA3E51</font>
  - <font color=#F5CCD1>danger-20   #F5CCD1</font>
  - <font color=#FDECEF>danger-10   #FDECEF</font>
  - <font color=#000000>neutral-100 #000000</font>
  - <font color=#4B4B4B>neutral-80  #4B4B4B</font>
  - <font color=#909090>neutral-60  #909090</font>
  - <font color=#ECECEC>neutral-40  #ECECEC</font>
  - <font color=#F9F9F9>neutral-10  #F9F9F9</font>
  - <font color=#FFFFFF>neutral-0   #FFFFFF</font>
  - <font color=#140F0A>background   #140F0A</font>
  - <font color=#000000>balck   neutral-100</font>
  - <font color=#FFFFFF>white   neutral-0</font>
  - <font color=#BF9D7D>primary   primary-100</font>
  - <font color=#52DD7E>success   success-100</font>
  - <font color=#3BADEF>info   info-100</font>
  - <font color=#DA3E51>danger   danger-100</font>

## 參考連結
[resolve.alias](https://dev.to/avxkim/setup-path-aliases-w-react-vite-ts-poa)