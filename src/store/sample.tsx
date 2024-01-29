import { create } from 'zustand'

// 1 定義 State 結構，包含：
// (1) 狀態 (count)
// (2) 更新狀態的 function (addCount、setCount)
interface CountState {
    count: number;
    addCount: () => void;
    setCount: (count: number) => void;
}

// 2 建立全域 state，習慣上稱呼為 store
// 所產生的 store 是個 hook，因此習慣上以 useXXXStore 形式命名
// 參數 (set, get) 分別代表設定 state、取得 state
const useCountStore = create<CountState>((set, get) => ({
    // 建立時會給每個 state 初始(預設）值
    count: 0,

    // addCount 是個 function 用於更新 count 的值
    // 更新時將 count 的值 +1
    // 使用 set 更新 store 的值
    // 參數 state 為 sotre 目前的值
    // 回傳要更新的欄位 { count }，值為目前 state 裡 count + 1
    addCount: function () {
        set(function (state) {
            return { 
                count: state.count + 1 
            }
        })
    },
    // 可以簡寫成下方
    // addCount: () => set(state => ({ count: state.count + 1 })),

    // addCount 是個 function 用於更新 count 的值
    // 更新時將 count 的值改為 newCount 的值
    // 使用 set 更新 store 的值
    // 回傳要更新的欄位 { count }，值為 newCount
    setCount: (newCount) => {
        return set(() => ({ 
            count: newCount 
        })
    )},
    // 可以簡寫成下方
    // setCount: (count) => set(() => ({count}))
}))

const Sample = () => {
    // 使用時呼叫該 hook，並回傳所需的狀態或 function 即可使用
    const count = useCountStore(s => s.count)
    const addCount = useCountStore(s => s.addCount)

    const handleAddCount = () => {
        addCount()
    }

    return (
        <button type='button' onClick={handleAddCount}>{count}</button>
    )
}