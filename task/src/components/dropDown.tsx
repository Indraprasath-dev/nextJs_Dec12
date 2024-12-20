"use client";
import { useState } from "react";
import styles from "./dropDown.module.css";
import { useRouter } from "next/navigation";

const DropDown = ({ params }: any) => {
    const router = useRouter();
    const [selected, setSelected] = useState(params.sort === "desc" ? "descending" : "ascending");
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (value: string) => {
        setSelected(value);
        setIsOpen(false);

        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set("sort", value === "ascending" ? "asc" : "desc");
        router.push(`/members?${currentParams.toString()}`);
    };

    return (
        <div className={styles.dropdown}>
            <div
                className={styles.dropdown__selected}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected === "ascending" ? (
                    <>
                        <img src="./asc.svg" alt="Ascending" />
                        Ascending
                    </>
                ) : (
                    <>
                        <img src="./desc.svg" alt="Descending" />
                        Descending
                    </>
                )}
                <span className={styles.dropdown__arrow}>▼</span>
            </div>
            {isOpen && (
                <div className={styles.dropdown__menu}>
                    <div
                        className={styles.dropdown__option}
                        onClick={() => handleOptionClick("ascending")}
                    >
                        <img src="./asc.svg" alt="Ascending" />
                        Ascending
                    </div>
                    <div
                        className={styles.dropdown__option}
                        onClick={() => handleOptionClick("descending")}
                    >
                        <img src="./desc.svg" alt="Descending" />
                        Descending
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;




// "use client";
// import styles from "./dropDown.module.css";
// import { useRouter } from "next/navigation";

// const DropDown = ({ params }: any) => {
//     const router = useRouter();

//     const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedOrder = e.target.value === "ascending" ? "asc" : "desc";

//         const currentParams = new URLSearchParams(window.location.search);

//         if (selectedOrder) {
//             currentParams.set("sort", selectedOrder);
//         }

//         router.push(`/members?${currentParams.toString()}`);
//     };

//     return (
//         <div className={styles.filter__content__header__sort}>
            
//             <div className={styles.filter__content__header__sort__text}>
//                 <select
//                     value={params.sort === "desc" ? "descending" : "ascending"}
//                     onChange={handleSortChange}>
//                     <option value="ascending">
//                         <img src="./asc.svg"></img> Ascending</option>
//                     <option value="descending"> <img src="./desc.svg"></img>Descending</option>
//                 </select>
//             </div>
//         </div>
//     );
// };

// export default DropDown;
