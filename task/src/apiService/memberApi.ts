import { API_BASE_URL, DEFAULT_LIMIT } from "@/constants/constants";

export interface Filters {
    officeHours?: boolean;
    openToCollaborate?: boolean;
    friends?: boolean;
    newMember?: boolean;
    skill?: string;
    region?: string;
    country?: string;
    metroArea?: string;
    searchBy?: string;
    sort?: string;
    viewType?: string;
}

export const fetchData = async (pageNumber: number, params: Filters) => {
    const searchParams = new URLSearchParams();


    if (params.officeHours) searchParams.append("officeHours__not", "null");
    if (params.openToCollaborate) searchParams.append("openToWork", "true");
    if (params.friends) {
        searchParams.append("isPlnfriend", "true");
        searchParams.append("isVerified", "false");
    }
    if (params.newMember) searchParams.append("isRecent", "true");
    if (params.region) searchParams.append("location.continent__with", params.region);
    if (params.country) searchParams.append("location.country__with", params.country);
    if (params.metroArea) searchParams.append("location.city__with", params.metroArea);
    if (params.skill) searchParams.append("skills.title__with", params.skill);
    if (params.searchBy) searchParams.append("name__icontains", params.searchBy.trim());
    if (params.sort) {
        const orderBy = params.sort === 'desc' ? '-name' : 'name'; 
        searchParams.append("orderBy", orderBy);
    }

    const url = `${API_BASE_URL}?pagination=true&page=${pageNumber}&limit=${DEFAULT_LIMIT}&select=uid,name,location,skills,officeHours,openToWork,plnFriend,isVerified,isFeatured&${searchParams}`
    console.log(url);

    const response = await fetch(url)

    const data = await response.json();

    return data;
}

export const fetchDataByLocation = async (params: Filters) => {
    const searchParams = new URLSearchParams();

    if (params.region) searchParams.append("location.continent__with", params.region);
    if (params.country) searchParams.append("location.country__with", params.country);
    if (params.metroArea) searchParams.append("location.city__with", params.metroArea);
    if (params.skill) searchParams.append("skills.title__with", params.skill);

    const response = await fetch(`${API_BASE_URL}/filters?${searchParams}`)

    const data = await response.json();

    return data;
}


export const fetchDataByRoles = async () => {
   
    const response = await fetch(`${API_BASE_URL}/roles`)

    const data = await response.json();

    return data;
}

