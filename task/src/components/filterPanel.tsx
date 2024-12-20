"use client";
import { useState } from "react";
import styles from "./filterPanel.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_VISIBLE_COUNT } from "@/constants/constants";
import { fetchDataByRoles } from "@/apiService/memberApi";

export interface FilterData {
    skills: string[];
    cities: string[];
    countries: string[];
    regions: string[];
    metroAreas: string[];
}

interface LocationProps {
    locationData: FilterData;
    specificLocationData: FilterData;
}

const FilterPanel = ({ locationData, specificLocationData, roles, specificRoles }: any) => {
    const [visibleRegions, setVisibleRegions] = useState(DEFAULT_VISIBLE_COUNT);
    const [visibleCountries, setVisibleCountries] = useState(DEFAULT_VISIBLE_COUNT);
    const [visibleMetroAreas, setVisibleMetroAreas] = useState(DEFAULT_VISIBLE_COUNT);
    const [visibleSkills, setVisibleSkills] = useState(DEFAULT_VISIBLE_COUNT);

    const router = useRouter();
    const searchParams = useSearchParams();

    const hasFilters = searchParams.toString().length > 0;

    const activeFiltersCount = Array.from(searchParams.entries()).filter(([key]) => {
        return key !== "searchBy" && key !== "sort" && key !== "viewType";
    }
    ).length;

    const handleRegion = (region: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get("region") === region) {
            params.delete("region");
            params.delete("country");
        } else {
            params.set("region", region);
            params.delete("country");
        }

        router.push(`/members?${params.toString()}`);
    };

    const handleCountry = (country: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get("country") === country) {
            params.delete("country");
        } else {
            params.set("country", country);
        }

        router.push(`/members?${params.toString()}`);
    };

    const handleSkill = (skill: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get("skill") === skill) {
            params.delete("skill");
        } else {
            params.set("skill", skill);
        }

        router.push(`/members?${params.toString()}`);
    };

    const handleMetroArea = (metroArea: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get("metroArea") === metroArea) {
            params.delete("metroArea");
        } else {
            params.set("metroArea", metroArea);
        }

        router.push(`/members?${params.toString()}`);
    };

    const handleClearFilters = () => {
        router.push("/members");
    };

    const handleToggle = (toggleKey: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const isActive = params.get(toggleKey) === "true";

        if (isActive) {
            params.delete(toggleKey);
        } else {
            params.set(toggleKey, "true");
        }

        router.push(`/members?${params.toString()}`);
    };

    const handleShowMore = (type: "region" | "country" | "metroArea" | "skills") => {
        if (type === "region") {
            setVisibleRegions(locationData.regions.length);
        } else if (type === "country") {
            setVisibleCountries(locationData.countries.length);
        } else if (type === "metroArea") {
            setVisibleMetroAreas(locationData.metroAreas.length);
        } else if (type === "skills") {
            setVisibleSkills(locationData.skills.length);
        }
    };

    const handleShowLess = (type: "region" | "country" | "metroArea" | "skills") => {
        if (type === "region") {
            setVisibleRegions(DEFAULT_VISIBLE_COUNT);
        } else if (type === "country") {
            setVisibleCountries(DEFAULT_VISIBLE_COUNT);
        } else if (type === "metroArea") {
            setVisibleMetroAreas(DEFAULT_VISIBLE_COUNT);
        } else if (type === "skills") {
            setVisibleSkills(DEFAULT_VISIBLE_COUNT);
        }
    };

    const handleRole = (role: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentRoles = params.get("memberRoles") || "";
        const rolesArray = currentRoles ? currentRoles.split("|") : [];

        if (rolesArray.includes(role)) {
            const updatedRoles = rolesArray.filter((item) => item !== role);
            if (updatedRoles.length === 0) {
                params.delete("memberRoles");
            } else {
                params.set("memberRoles", updatedRoles.join("|"));
            }
        } else {
            rolesArray.push(role);
            params.set("memberRoles", rolesArray.join("|"));
        }

        router.push(`/members?${params.toString()}`);
    };


    // const handleSearchText = (searchText: string) => {
    //     const params = new URLSearchParams(searchParams.toString());

    //     if (searchText.trim() === "") {
    //         params.delete("searchText");
    //     } else {
    //         params.set("searchText", searchText);
    //     }

    //     router.push(`/members?${params.toString()}`);
    // };

    const [searchText, setSearchText] = useState("");
    const [filteredRoles, setFilteredRoles] = useState([]);
    const handleSearchText = async (text: string) => {
        setSearchText(text);
        const params = { searchText: text.trim() };

        const data = await fetchDataByRoles(params);
        setFilteredRoles(data);
    };


    return (
        <>
            <div className={styles.filter}>
                <div className={styles.filter__control}>
                    Filters{" "}
                    {activeFiltersCount > 0 ? (
                        <span className={styles.filter__control__count}>
                            {activeFiltersCount}
                        </span>
                    ) : " " }
                </div>
                <div className={styles.filter__control__clear}>
                    <button onClick={handleClearFilters} disabled={!hasFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>

            <div className={styles.filter__divider}></div>

            <div className={styles.scroll}>
                <div className={styles.filter__list}>
                    <div className={styles.filter__list__item}>
                        <h3 className={styles.filter__list__item__title}>
                            Only Show Members with Office Hours
                        </h3>
                        <label className={styles.filter__list__item__title__toggle}>
                            <input
                                type="checkbox"
                                checked={searchParams.get("OfficeHours") === "true"}
                                onChange={() => handleToggle("OfficeHours")}
                            />
                            <span
                                className={styles.filter__list__item__title__toggle__slider}
                            ></span>
                        </label>
                    </div>

                    <div className={styles.filter__list__item}>
                        <div className={styles.filter__list__item__title}>
                            Open to Collaborate
                            <div className={styles.tooltip}>
                                <img src="./note.svg" alt="Collaborate Icon" />
                                {/* <span className={styles.tooltip__text}>
                                People with this icon are open to collaborate on shared ideas & projects with other people.
                            </span> */}
                            </div>
                        </div>

                        <label className={styles.filter__list__item__title__toggle}>
                            <input
                                type="checkbox"
                                checked={searchParams.get("OpenToCollaborate") === "true"}
                                onChange={() => handleToggle("OpenToCollaborate")}
                            />
                            <span
                                className={styles.filter__list__item__title__toggle__slider}
                            ></span>
                        </label>
                    </div>

                    <div className={styles.filter__list__item}>
                        <h3 className={styles.filter__list__item__title}>
                            Include Friends of Protocol Labs
                        </h3>
                        <label className={styles.filter__list__item__title__toggle}>
                            <input
                                type="checkbox"
                                checked={searchParams.get("Friends") === "true"}
                                onChange={() => handleToggle("Friends")}
                            />
                            <span
                                className={styles.filter__list__item__title__toggle__slider}
                            ></span>
                        </label>
                    </div>

                    <div className={styles.filter__list__item}>
                        <h3 className={styles.filter__list__item__title}>New Members</h3>
                        <label className={styles.filter__list__item__title__toggle}>
                            <input
                                type="checkbox"
                                checked={searchParams.get("NewMember") === "true"}
                                onChange={() => handleToggle("NewMember")}
                            />
                            <span
                                className={styles.filter__list__item__title__toggle__slider}
                            ></span>
                        </label>
                    </div>
                </div>

                {/* Roles */}
                <div className={styles.filter__region}>
                    <span className={styles.filter__region__divider}></span>
                    <h2>Roles</h2>
                    <div className={styles.filter__region__search}>
                        <img src="./search-gray.svg"></img>
                        <input
                            type="text"
                            placeholder="Search Role [eg. Engineer]"
                            value={searchText}
                            onChange={(e) => handleSearchText(e.target.value)}
                        />
                    </div>

                    {/* Render filtered roles */}

                    {filteredRoles.length > 4 ? (
                        filteredRoles.slice(4).map((item: any) => (
                            <div key={item.role} className={styles.specificRoles}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={item.role}
                                        onChange={() => handleRole(item.role)}
                                        className={styles.role__inputBox}
                                    />
                                </label>
                                <span className={styles.role__name}>{item.alias || item.role}</span>
                                <span className={styles.role__count}>{item.count}</span>
                            </div>
                        ))
                    ) : (
                        ( searchText.length != 0 && filteredRoles.length == 4 ) ? <p>No roles found</p> : " "
                    )}

                    {roles.map((item: any) => (
                        <div key={item.role} className={styles.role}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={item.role}
                                    checked={searchParams.get("memberRoles")
                                        ?.split("|")
                                        .includes(item.role) || false}
                                    onChange={() => handleRole(item.role)}
                                    className={styles.role__inputBox} />

                            </label>
                            <span className={styles.role__name}>{item.alias ? item.alias : item.role}</span>
                            <span className={styles.role__count}>{item.count}</span>
                        </div>
                    ))}
                </div>

                {/* skills */}
                <div className={styles.filter__region}>
                    <span className={styles.filter__region__divider}></span>
                    <h2>Skills</h2>
                    <div className={styles.filter__region__divider__list}>
                        {locationData.skills.slice(0, visibleSkills).map((skill: any) => {
                            const isCountryEnabled = specificLocationData?.skills?.includes(skill);

                            const isDisabled = !isCountryEnabled;
                            const isActive = searchParams.get("skill") === skill;
                            return (
                                <button
                                    key={skill}
                                    disabled={isDisabled}
                                    onClick={() => handleSkill(skill)}
                                    className={`${styles.filter__country__divider__list__button
                                        } ${isActive
                                            ? styles.filter__country__divider__list__button__active
                                            : ""
                                        } ${isDisabled
                                            ? styles.filter__country__divider__list__button__active__disabled
                                            : ""
                                        }`}>
                                    {skill}
                                </button>
                            );
                        })}
                    </div>
                    {visibleSkills < locationData.skills.length ? (
                        <div className={styles.filter__region__showMoreContainer}>
                            <button
                                className={styles.filter__region__showMore}
                                onClick={() => handleShowMore("skills")}
                            >
                                Show More
                                <img src="./showmore.svg" alt="Show More Icon" />
                            </button>
                            <div className={styles.filter__region__showMore__Count}>
                                {locationData.skills.length - visibleSkills}
                            </div>
                        </div>
                    ) : (
                        locationData.skills.length > DEFAULT_VISIBLE_COUNT && (
                            <button
                                className={styles.filter__region__showLess}
                                onClick={() => handleShowLess("skills")}
                            >
                                Show Less
                                <img src="./showmore.svg" alt="Show Less Icon" />
                            </button>
                        )
                    )}
                </div>

                {/* Region */}
                <div className={styles.filter__region}>
                    <span className={styles.filter__region__divider}></span>
                    <h2>Region</h2>
                    <div className={styles.filter__region__divider__list}>
                        {locationData?.regions?.slice(0, visibleRegions).map((region: any) => {
                            const isCountryEnabled = specificLocationData?.regions?.includes(region);

                            const isDisabled = !isCountryEnabled;

                            const isActive = searchParams.get("region") === region;
                            return (
                                <button
                                    key={region}
                                    disabled={isDisabled}
                                    onClick={() => handleRegion(region)}
                                    className={`${styles.filter__country__divider__list__button
                                        } ${isActive
                                            ? styles.filter__country__divider__list__button__active
                                            : ""
                                        } ${isDisabled
                                            ? styles.filter__country__divider__list__button__active__disabled
                                            : ""
                                        }`}>
                                    {region}
                                </button>
                            );
                        })}
                    </div>
                    {visibleRegions < locationData?.regions?.length ? (
                        <button
                            className={styles.filter__region__showMore}
                            onClick={() => handleShowMore("region")}
                        >
                            Show More ({locationData.regions.length - visibleRegions})
                        </button>
                    ) : (
                        locationData?.regions?.length > DEFAULT_VISIBLE_COUNT && (
                            <button
                                className={styles.filter__region__showLess}
                                onClick={() => handleShowLess("region")}
                            >
                                Show Less
                                <img src="./showmore.svg" alt="Show Less Icon" />
                            </button>
                        )
                    )}
                </div>

                {/* Country */}
                <div className={styles.filter__country}>
                    <span className={styles.filter__country__divider}></span>
                    <h2>Country</h2>
                    <div className={styles.filter__country__divider__list}>
                        {locationData?.countries?.slice(0, visibleCountries).map((country: any) => {
                            const isCountryEnabled = specificLocationData?.countries?.includes(country);

                            const isDisabled = !isCountryEnabled;

                            const isActive = searchParams.get("country") === country;

                            return (
                                <button
                                    key={country}
                                    disabled={isDisabled}
                                    onClick={() => handleCountry(country)}
                                    className={`${styles.filter__country__divider__list__button
                                        } ${isActive
                                            ? styles.filter__country__divider__list__button__active
                                            : ""
                                        } ${isDisabled
                                            ? styles.filter__country__divider__list__button__active__disabled
                                            : ""
                                        }`}>
                                    {country}
                                </button>
                            );
                        })}
                    </div>
                    {visibleCountries < locationData?.countries?.length ? (

                        <div className={styles.filter__region__showMoreContainer}>
                            <button
                                className={styles.filter__region__showMore}
                                onClick={() => handleShowMore("country")}>
                                Show More
                                <img src="./showmore.svg" alt="Show More Icon" />
                            </button>
                            <div className={styles.filter__region__showMore__Count}>
                                {locationData.countries.length - visibleCountries}
                            </div>
                        </div>
                    ) : (
                        locationData?.countries?.length > DEFAULT_VISIBLE_COUNT && (
                            <button
                                className={styles.filter__region__showLess}
                                onClick={() => handleShowLess("country")}
                            >
                                Show Less
                                <img src="./showmore.svg" alt="Show Less Icon" />
                            </button>
                        )
                    )}
                </div>


                {/* Metro areas */}
                <div className="pb-10">
                    <div className={styles.filter__region}>
                        <span className={styles.filter__region__divider}></span>
                        <h2>Metro Area</h2>
                        <div className={styles.filter__region__divider__list}>
                            {locationData.metroAreas.slice(0, visibleMetroAreas).map((metroArea: any) => {
                                const isCountryEnabled = specificLocationData?.metroAreas?.includes(metroArea);

                                const isDisabled = !isCountryEnabled;

                                const isActive = searchParams.get("metroArea") === metroArea;
                                return (
                                    <button
                                        key={metroArea}
                                        disabled={isDisabled}
                                        onClick={() => handleMetroArea(metroArea)}
                                        className={`${styles.filter__country__divider__list__button
                                            } ${isActive
                                                ? styles.filter__country__divider__list__button__active
                                                : ""
                                            } ${isDisabled
                                                ? styles.filter__country__divider__list__button__active__disabled
                                                : ""
                                            }`}>
                                        {metroArea}
                                    </button>
                                );
                            })}
                        </div>
                        {visibleMetroAreas < locationData?.metroAreas?.length ? (
                            <div className={styles.filter__region__showMoreContainer}>
                                <button
                                    className={styles.filter__region__showMore}
                                    onClick={() => handleShowMore("metroArea")}
                                >
                                    Show More
                                    <img src="./showmore.svg" alt="Show More Icon" />
                                </button>
                                <div className={styles.filter__region__showMore__Count}>
                                    {locationData.metroAreas.length - visibleMetroAreas}
                                </div>
                            </div>
                        ) : (
                            locationData?.metroAreas?.length > DEFAULT_VISIBLE_COUNT && (
                                <button
                                    className={styles.filter__region__showLess}
                                    onClick={() => handleShowLess("metroArea")}
                                >
                                    Show Less
                                    <img src="./showmore.svg" alt="Show Less Icon" />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterPanel;
