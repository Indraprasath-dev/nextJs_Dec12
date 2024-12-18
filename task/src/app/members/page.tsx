import { fetchData, fetchDataByLocation, Filters } from "@/apiService/memberApi";
import FilterPanel from "@/components/filterPanel";
import MemberList from "@/components/memberList";
import styles from './page.module.css';

interface MemberProps {
    searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: MemberProps) => {

    const params = {
        region: searchParams.region,
        country: searchParams.country,
        officeHours: searchParams.OfficeHours === "true",
        openToCollaborate: searchParams.OpenToCollaborate === "true",
        friends: searchParams.Friends === "true",
        newMember: searchParams.NewMember === "true",
    };

    const { initialData, locationData, specificLocationData } = await getData(params)

    return (
        <div className={styles.filter}>
            <div className={styles.filter__panel}>
                <div className={styles.filter__panel__container}>
                    <FilterPanel locationData={locationData} specificLocationData={specificLocationData} />
                </div>
            </div>
            <div className={styles.filter__content}>
                <div className={styles.filter__content__header}>
                    <div className={styles.filter__content__header__title}>
                        <h1> Members <span className={styles.filter__content__header__title__span}>({initialData.count})</span></h1>
                    </div>
                    <div className={styles.filter__content__header__search}>
                        <input type="text" placeholder="Search by Mentor Name, Team or Project" />
                        <img src="./search.svg" alt="Search Icon" />
                    </div>
                    <span className={styles.filter__content__header__span}></span>
                    <div>
                        Sort by:
                    </div>
                    <div className={styles.filter__content__header__sort}>
                        <div className={styles.filter__content__header__sort__wrapper}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="pointer-events-none relative top-px mr-1 h-4 mb-[2px]">
                                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"></path>
                            </svg>
                        </div>
                        <div className={styles.filter__content__header__sort__text}>
                            Ascending
                        </div>
                    </div>

                    <div className={styles.filter__content__header__view}>
                        <div className={styles.filter__content__header__view__grid}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="stroke-1.5 h-6 w-6 stroke-blue-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm12 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2V6zM4 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm12 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2z"></path>
                            </svg>
                        </div>
                        <div className={styles.filter__content__header__view__list}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="stroke-1.5 h-6 w-6 stroke-blue-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <MemberList initialData={initialData} params={params} />
            </div>
        </div>
    )
}

export default Page;

const getData = async (params: Filters) => {

    const [initialData, locationData, specificLocationData] = await Promise.all([
        fetchData(1, params),
        fetchDataByLocation({}),
        fetchDataByLocation(params)
    ]);
    return { initialData, locationData, specificLocationData };
}


