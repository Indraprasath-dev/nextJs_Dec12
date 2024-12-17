import { API_BASE_URL, DEFAULT_LIMIT } from "@/constants/constants";


export const fetchData = async (pageNumber: number, params: { [key: string]: any }) => {
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

    const response = await fetch(`${API_BASE_URL}?pagination=true&page=${pageNumber}&limit=${DEFAULT_LIMIT}&select=uid,name,location,skills,officeHours,openToWork,plnFriend,isVerified,isFeatured&${searchParams}`)
    
    const data = await response.json();

    return data;
}

export const fetchDataByLocation = async (params: any) => {
    const searchParams = new URLSearchParams();

    if (params.region) searchParams.append("location.continent__with", params.region);

    const response = await fetch(`${API_BASE_URL}/filters?${searchParams}`)

    const data = await response.json();
    
    return data;
}

