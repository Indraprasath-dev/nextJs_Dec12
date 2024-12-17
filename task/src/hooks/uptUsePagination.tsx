'use client'
import { fetchData } from "@/apiService/memberApi";
import { useState, useRef, useEffect } from "react";

const usePagination = (initialData: any, filters: any) => {
    const [state, setState] = useState({
        users: initialData.members, 
        loading: false,
        page: 1,
        hasMore: true,
    });

    const observer = useRef<IntersectionObserver | null>(null);

    const fetchUsers = async (page: number) => {
        try {
            const data = await fetchData(page, filters);
            console.log("page number : "+page) 
            return data.members;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadFilteredUsers = async () => {
            setState((prevState) => ({ ...prevState, loading: true, page: 1, users: [], hasMore: true }));
            const data = await fetchUsers(1);
            setState({
                users: data,
                loading: false,
                page: 2,
                hasMore: data.length > 0,
            });
        };
        loadFilteredUsers();
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !state.loading && state.hasMore) {
                setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
            }
        };

        if (!observer.current) {
            observer.current = new IntersectionObserver(observerCallback, { threshold: 1.0 });
        }

        const loadTrigger = document.getElementById("scroll-trigger");
        if (loadTrigger) {
            observer.current.observe(loadTrigger);
        }

        return () => {
            if (observer.current && loadTrigger) {
                observer.current.unobserve(loadTrigger);
            }
        };
    }, [state.hasMore]);

    useEffect(() => {
        if (state.page > 1) {
            const loadMoreUsers = async () => {
                setState((prevState) => ({ ...prevState, loading: true }));
                const newUsers = await fetchUsers(state.page);
                setState((prevState) => ({
                    ...prevState,
                    users: [...prevState.users, ...newUsers],
                    hasMore: newUsers.length > 0,
                    loading: false,
                }));
            };

            loadMoreUsers();
        }
    }, [state.page]);

    return { users: state.users, loading: state.loading };
};

export default usePagination;


// import { fetchData } from '@/apiService/memberApi';
// import { useState, useEffect, useRef, useCallback } from 'react';

// interface Params {
//     region?: string;
//     country?: string;
//     officeHours?: boolean;
//     openToCollaborate?: boolean;
//     friends?: boolean;
//     newMember?: boolean;
// }

// const usePagination = (initialData: any, params: Params) => {
//     const [users, setUsers] = useState<any[]>(initialData.members || []);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(initialData.members.length > 0);
//     const observerRef = useRef<IntersectionObserver | null>(null);
//     const triggerRef = useRef<HTMLDivElement | null>(null);

//     // Fetch more users
//     const loadMoreUsers = useCallback(async () => {
//         if (loading || !hasMore) return;

//         setLoading(true);
//         try {
//             const nextPage = page + 1;
//             const newData = await fetchData(nextPage, params);

//             if (newData.members.length === 0) {
//                 setHasMore(false);
//             } else {
//                 setUsers((prevUsers) => [...prevUsers, ...newData.members]);
//                 setPage(nextPage);
//             }
//         } catch (error) {
//             console.error('Error loading more users:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, [page, params, loading, hasMore]);

//     // Reset pagination and start from page 1 with new data
//     const resetPagination = useCallback(() => {
//         setUsers(initialData.members || []); // Reset users to initial data
//         setPage(1); // Reset page to 1
//         setHasMore(initialData.members.length > 0); // Reset hasMore
//     }, [initialData]);

//     // Observe the trigger for infinite scrolling
//     useEffect(() => {
//         if (!triggerRef.current || !hasMore) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting && !loading) {
//                     loadMoreUsers();
//                 }
//             },
//             { threshold: 1.0 }
//         );

//         observer.observe(triggerRef.current);

//         return () => {
//             if (triggerRef.current) {
//                 observer.unobserve(triggerRef.current);
//             }
//         };
//     }, [loadMoreUsers, hasMore, loading]);

//     // Trigger reset on initialData or params change
//     useEffect(() => {
//         resetPagination();
//     }, [initialData, params, resetPagination]);

//     const scrollTriggerRef = useCallback((node: HTMLDivElement | null) => {
//         triggerRef.current = node;
//     }, []);

//     return {
//         users,
//         loading,
//         hasMore,
//         scrollTriggerRef,
//     };
// };

// export default usePagination;
