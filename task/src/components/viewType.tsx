'use client';
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./viewType.module.css";

const ViewType = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewType = searchParams.get('viewType') || 'grid View'; 

    const handleViewChange = (newViewType: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("viewType", newViewType);
        router.push(`/members?${params.toString()}`);
    };

    return (
        <div className={styles.filter__content__header__view}>
            <div className={`${styles.filter__content__header__view__grid} ${
                    viewType === 'grid View' ? styles.active : ''
                }`}
                onClick={() => handleViewChange('grid View')}>
                <img src="./grid.svg" alt="Grid View" />
            </div>

            <div className={`${styles.filter__content__header__view__list} ${
                    viewType === 'list view' ? styles.active : ''
                }`}
                onClick={() => handleViewChange('list view')}>
                <img src="./list.svg" alt="List View" />
            </div>
        </div>
    );
};

export default ViewType;
