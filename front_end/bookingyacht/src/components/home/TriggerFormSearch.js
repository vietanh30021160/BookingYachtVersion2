import React, { createContext, useContext, useCallback, useState } from 'react';

const SearchTriggerContext = createContext();
//This line creates a new context named SearchTriggerContext. Contexts are used to share data across components without passing props manually at every level.


export const useSearchTrigger = () => useContext(SearchTriggerContext);
//This is a custom hook named useSearchTrigger that uses the useContext hook to access the SearchTriggerContext.
//This allows any component to easily use the context by calling useSearchTrigger().
export default function TriggerFormSearch({ children }) {
    const [trigger, setTrigger] = useState(false);

    const triggerSearch = useCallback(() => {
        setTrigger(prev => !prev);
    }, []);

    //triggerSearch is a function that toggles the value of trigger between true and false.
    //useCallback is used to memoize the function, meaning it will only be recreated if its dependencies change. Here, it has no dependencies, so it will only be created once.
    return (
        //SearchTriggerContext.Provider là thành phần cung cấp context. 
        //Nó bao quanh {children} để tất cả các thành phần con trong TriggerFormSearch có thể truy cập và sử dụng context này.

        //Context được truyền xuống từ SearchTriggerContext.Provider sẽ có thể được sử dụng bởi bất kỳ thành phần con nào bên trong TriggerFormSearch,
        // và thông qua hook useSearchTrigger.
        <SearchTriggerContext.Provider value={{ trigger, triggerSearch }}>
            {children}
        </SearchTriggerContext.Provider>
    );
}

//Provider trong Context API của React có nghĩa là một thành phần React đặc biệt được sử dụng để cung cấp giá trị context cho các thành phần con trong cây component của nó.

//Khi bạn sử dụng một context, bạn sẽ tạo một Provider để bao bọc các thành phần con của bạn. Provider này sẽ cung cấp giá trị context cho tất cả các thành phần con bên trong nó mà đã sử dụng hook useContext để truy cập vào context đó.

{/* <SearchTriggerContext.Provider> là Provider của context SearchTriggerContext.
value={{ trigger, triggerSearch }} là giá trị context được cung cấp bởi Provider này. Trong trường hợp này, nó bao gồm trigger và triggerSearch.
{children} là các thành phần con bên trong TriggerFormSearch mà Provider này bao quanh. 
Những thành phần con này sẽ có thể truy cập vào giá trị trigger và triggerSearch thông qua hook useContext(SearchTriggerContext).
Về cơ bản, Provider là cách để bạn cung cấp dữ liệu (trong trường hợp này là context) cho các thành phần con trong React
 mà không cần phải truyền dữ liệu qua lại bằng props từng cấp một. Điều này giúp cho việc quản lý trạng thái và chia sẻ dữ liệu trở nên dễ dàng hơn trong các ứng dụng lớn và phức tạp. */}