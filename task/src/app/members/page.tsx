import { fetchData, fetchDataByLocation, fetchDataByRoles, Filters } from "@/apiService/memberApi";
import FilterPanel from "@/components/filterPanel";
import MemberList from "@/components/memberList";
import styles from './page.module.css';
import SearchBar from "@/components/searchBar";
import DropDown from "@/components/dropDown";
import ViewType from "@/components/viewType";

interface MemberProps {
    searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: MemberProps) => {

    const params = {
        officeHours: searchParams.OfficeHours === "true",
        openToCollaborate: searchParams.OpenToCollaborate === "true",
        friends: searchParams.Friends === "true",
        newMember: searchParams.NewMember === "true",
        skill: searchParams.skill,
        region: searchParams.region,
        country: searchParams.country,
        metroArea: searchParams.metroArea,
        searchBy: searchParams.searchBy,
        sort: searchParams.sort,
        viewType: searchParams.viewType
    };

    const { initialData, locationData, specificLocationData, roles } = await getData(params)

    return (
        <div className={styles.filter}>
            <div className={styles.filter__panel}>
                <div className={styles.filter__panel__container}>
                    <FilterPanel locationData={locationData} specificLocationData={specificLocationData} roles={roles} />
                </div>
            </div>
            <div className={styles.filter__content}>
                <div className={styles.filter__content__header}>
                    <div className={styles.filter__content__header__title}>
                        <h1> Members <span className={styles.filter__content__header__title__span}>({initialData.count})</span></h1>
                    </div>
                    <SearchBar params={params} />
                    <span className={styles.filter__content__header__span}></span>
                    <div>
                        Sort by:
                    </div>
                    <DropDown params={params}/>

                    <ViewType />
                </div>
                <MemberList initialData={initialData} params={params} />
            </div>
        </div>
    )
}

export default Page;

const getData = async (params: Filters) => {

    const [initialData, locationData, specificLocationData, roles] = await Promise.all([
        fetchData(1, params),
        fetchDataByLocation({}),
        fetchDataByLocation(params),
        fetchDataByRoles()
    ]);
    return { initialData, locationData, specificLocationData, roles };
}


