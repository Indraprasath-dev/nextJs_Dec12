'use client';
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./searchBar.module.css";
import { useState } from "react";

const SearchBar = ({ params }: any) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState(params.searchBy || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchTerm = inputValue.trim();

        const queryParams = new URLSearchParams(searchParams.toString());

        if (searchTerm) {
            queryParams.set("searchBy", searchTerm);
        } else {
            queryParams.delete("searchBy");
        }

        router.push(`/members?${queryParams.toString()}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const clearSearch = () => {
        setInputValue("");

        const queryParams = new URLSearchParams(searchParams.toString());

        queryParams.delete("searchBy");

        router.replace(`/members?${queryParams.toString()}`);
    };


    return (
        <div className={styles.filter__content__header__search}>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by Mentor Name, Team or Project"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                {inputValue && (
                    <span onClick={clearSearch}>
                        <img src="./close.svg" alt="Clear" />
                    </span>
                )}
                <button type="submit">
                    <img src="./search.svg" alt="Search Icon" />
                </button>
            </form>
        </div>

    );
};

export default SearchBar;


//dont used used useState, but problem in X mark
// 'use client';
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "./searchBar.module.css";
// import { useRef } from "react";

// const SearchBar = ({ params }: any) => {
//     const router = useRouter();
//     const inputRef = useRef<HTMLInputElement>(null);

//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         const searchTerm = inputRef.current?.value.trim();
//         if (searchTerm) {
//             router.push(`?searchBy=${encodeURIComponent(searchTerm)}`);
//         } else {
//             router.push("?");
//         }
//     };

//     return (
//         <div className={styles.filter__content__header__search}>
//             <form onSubmit={handleSearch}>
//                 <input
//                     ref={inputRef}
//                     type="text"
//                     placeholder="Search by Mentor Name, Team or Project"
//                     defaultValue={params.searchBy || ""} />
//                 {params.searchBy && (
//                     <span className={styles.clearIcon} onClick={() => router.push("?")}>
//                         X
//                     </span>
//                 )}
//                 <button type="submit">
//                     <img src="./search.svg" alt="Search Icon" />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SearchBar;
