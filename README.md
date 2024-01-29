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

## 呼叫 API 
此專案使用 `axios` 呼叫 API，並封裝 `get`、`post`、`put`、`delete` 方法，範例如下
```typescript
const get = async <TResponse>(url: string, token: string | undefined = undefined): Promise<TResponse> => {
    const response = await axios.get<TResponse>(url, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        }
    })
    return response.data
}

const post = async <TResponse>(url: string, request: any, token: string | undefined = undefined): Promise<TResponse> => {
    const response = await axios.post<TResponse>(url, request, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        }
    })
    return response.data
}
```
get function 有兩個參數
- API Url
- token (若 API 需要 token 驗證時才需此參數)

post function 有三個參數
- API Url
- request data
- token (若 API 需要 token 驗證時才需此參數)

皆定義 `Content-Type` 為 `application/json`，回傳型態為 `TResponse`，泛型可依據不同 API 定義各自回傳型態。

若 API 失敗（StatusCode = `4XX` or `5XX`)，統一拋出例外，格式如下：
```typescript
interface ApiError {
    status: string;
    message: string;
}
```

將呼叫 API 方法寫在 `./src/services` 中，檔案名稱習慣上以 `Service` 結尾如：
`UserService.ts`。
function 傳入傳出型態可定義 interface 或 type，回傳型態為 `Promise<Ｔ>`
```typescript 
interface LoginRequest {}
interface LoginResponse {}

const login = async (request: LoginRequest): Promise<LoginResponse> => {
    const repsonse = await post<LoginResponse>(`${config.baseURL}/api/v1/user/login`, request)
    return repsonse
}
```

在 React 使用時，若使用 async await 需加上 `try catch`，catch 觸發條件為 StatusCode 4XX 或 5XX，ex 型態為 `ApiError`

```typescript
try {
    const data = {
        "email": "aaaaaa@gmail.com",
        "password": "aaaaaaaa"
    }
    await login(data)            
}
catch(ex) {
    console.error(ex)
}
```

## Zustand 用法
### 定義 State 結構
Typescript 中需要先定義 state 的結構，包含了 `狀態` 以及 `更新狀態的 function`
```typescript
interface CountState {
    count: number;
    addCount: () => void;
    setCount: (count: number) => void;
}
```

### 建立 Store
建立全域 state，習慣上稱呼為 store。所產生的 store 是個 hook，因此習慣上以 `useXXXStore` 形式命名。
```typescript
const useCountStore = create<CountState>((set, get) => ({
    count: 0,
    addCount: () => set(state => ({ count: state.count + 1 })),
    setCount: (count) => set(() => ({count}))
}))
```
建立時需要給 state 初始（預設）值，因此 count 為 0。

addCount、setCount 為更新狀態的 function，使用 `set` 更新 state，上面範例是 arrow function 寫法，傳統 function 寫法如下：
```typescript
addCount: function () {
    set(function (state) {
        return { 
            count: state.count + 1 
        }
    })
},

setCount: (newCount) => {
    return set(() => ({ 
        count: newCount 
    })
)},
```
`addCount` 執行時將 state 中 count + 1，set function 裡面的 `state` 是目前 store 的值，回傳物件裡頭有 count，值為 `state.count + 1`。

`setCount` 執行時將 state 中 count 改為 `newCount`。由於不需要目前的 count，因此不用 set function 裡面的 `state`。回傳物件裡頭有 count，值為 `newCount`。

### 使用 Store
使用時呼叫 useCountStore 並回傳所需要的欄位 `s => s.count` 後即可使用
```typescript
const Sample = () => {
    const count = useCountStore(s => s.count)
    const addCount = useCountStore(s => s.addCount)

    const handleAddCount = () => {
        addCount()
    }

    return (
        <button type='button' onClick={handleAddCount}>{count}</button>
    )
}
```

### 補充
範例程式可以參考 `./src/store/sample.tsx`

## 參考連結
[resolve.alias](https://dev.to/avxkim/setup-path-aliases-w-react-vite-ts-poa)