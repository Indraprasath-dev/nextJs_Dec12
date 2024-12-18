//only intersection observer logic
// 'use client';
// import { useEffect, useRef } from "react";

// const usePagination = (onIntersect: () => void) => {
//     const observer = useRef<IntersectionObserver | null>(null);
//     const triggerRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         const observerCallback = (entries: IntersectionObserverEntry[]) => {
//             const target = entries[0];
//             if (target.isIntersecting) {
//                 onIntersect();
//             }
//         };

//         observer.current = new IntersectionObserver(observerCallback, { threshold: 1.0 });

//         if (triggerRef.current) {
//             observer.current.observe(triggerRef.current);
//         }

//         return () => {
//             if (observer.current && triggerRef.current) {
//                 observer.current.unobserve(triggerRef.current);
//             }
//         };
//     }, [onIntersect]);

//     const observeTrigger = (element: HTMLDivElement | null) => {
//         if (observer.current && element) {
//             observer.current.observe(element);
//         }
//     };

//     return { triggerRef, observeTrigger };
// };

// export default usePagination;



//normal old logic
// 'use client'
// import { fetchData } from "@/apiService/memberApi";
// import { useState, useRef, useEffect } from "react";


// export interface MemberProps {
//     count: number;
//     members: any;
// }

// const usePagination = (initialData: MemberProps, filters: any) => {
//     const [state, setState] = useState({
//         users: initialData.members,
//         loading: false,
//         page: 1,
//         hasMore: true,
//     });

//     const observer = useRef<IntersectionObserver | null>(null);
//     const isInitialRender = useRef(true);

//     const fetchUsers = async (page: number) => {
//         try {
//             const data = await fetchData(page, filters);
//             return data.members;
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             return [];
//         }
//     };

//     useEffect(() => {
//         const loadFilteredUsers = async () => {
//             setState((prevState) => ({ ...prevState, loading: true, page: 1, users: [], hasMore: true }));
//             const data = await fetchUsers(1);
//             setState({
//                 users: data,
//                 loading: false,
//                 page: 2,
//                 hasMore: data.length > 0,
//             });
//         };
//         loadFilteredUsers();
//     }, [JSON.stringify(filters)]);

//     useEffect(() => {
//         const observerCallback = (entries: IntersectionObserverEntry[]) => {
//             const target = entries[0];
//             if (target.isIntersecting && !state.loading && state.hasMore) {
//                 setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
//             }
//         };

//         if (!observer.current) {
//             observer.current = new IntersectionObserver(observerCallback, { threshold: 1.0 });
//         }

//         const loadTrigger = document.getElementById("scroll-trigger");
//         if (loadTrigger) {
//             observer.current.observe(loadTrigger);
//         }

//         return () => {
//             if (observer.current && loadTrigger) {
//                 observer.current.unobserve(loadTrigger);
//             }
//         };
//     }, [state.hasMore]);

//     useEffect(() => {
//         if (state.page > 1) {
//             const loadMoreUsers = async () => {
//                 setState((prevState) => ({ ...prevState, loading: true }));
//                 const newUsers = await fetchUsers(state.page);
//                 setState((prevState) => ({
//                     ...prevState,
//                     users: [...prevState.users, ...newUsers],
//                     hasMore: newUsers.length > 0,
//                     loading: false,
//                 }));
//             };

//             loadMoreUsers();
//         }
//     }, [state.page]);

//     return { users: state.users, loading: state.loading };
// };

// export default usePagination;


//reduced useEffect, but change filters, not changed initital data
// 'use client';

// import { fetchData } from '@/apiService/memberApi';
// import { useState, useEffect, useCallback } from 'react';

// interface Params {
//   region?: string;
//   country?: string;
//   officeHours?: boolean;
//   openToCollaborate?: boolean;
//   friends?: boolean;
//   newMember?: boolean;
// }

// interface PaginationResult<T> {
//   users: any;
//   loading: boolean;
//   error?: Error;
//   hasMore: boolean;
// }

// export function usePagination<T>(
//   initialData: any, 
//   params: Params
// ): PaginationResult<T> {
//   const [users, setUsers] = useState<any>(initialData || { members: [] });
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(2);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState<Error | undefined>(undefined);

//   const fetchMoreUsers = useCallback(async () => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);

//       const newData = await fetchData(page, params);
//       const newUsers = newData.members || [];

//       if (newUsers.length === 0) {
//         setHasMore(false);
//         return;
//       }

//       setUsers((prevUsers: any) => {
//         const prevMembers = prevUsers.members || [];
//         const uniqueNewUsers = newUsers.filter(
//           (newUser: T) => 
//             !prevMembers.some(
//               (existingUser: any) => existingUser.uid === (newUser as any).uid
//             )
//         );
//         return {
//           ...newData,
//           members: [...prevMembers, ...uniqueNewUsers]
//         };
//       });

//       setPage(prevPage => prevPage + 1);
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error('An unknown error occurred'));
//     } finally {
//       setLoading(false);
//     }
//   }, [page, params, loading, hasMore, fetchData]);

//   // Intersection Observer for infinite scroll
//   useEffect(() => {
//     const triggerElement = document.getElementById('scroll-trigger');

//     if (!triggerElement) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const first = entries[0];
//         if (first.isIntersecting && !loading && hasMore) {
//           fetchMoreUsers();
//         }
//       },
//       { 
//         threshold: 0.1,
//         rootMargin: '50px' 
//       }
//     );

//     observer.observe(triggerElement);

//     return () => {
//       observer.disconnect();
//     };
//   }, [fetchMoreUsers, loading, hasMore]);

//   return {
//     users,
//     loading,
//     error,
//     hasMore
//   };
// }



// import { useState, useEffect } from 'react';

// interface UsePaginationParams {
//   observerElement: HTMLElement | null;
// }

// const usePagination = ({ observerElement }: any) => {
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (!observerElement) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     observer.observe(observerElement);

//     return () => {
//       observer.disconnect();
//     };
//   }, [observerElement]);

//   return page;
// };

// export default usePagination;




//working code
import { fetchData, Filters } from '@/apiService/memberApi';
import { Members } from '@/components/memberList';
import { useState, useEffect, useCallback } from 'react';


const usePagination = (initialData: Members, params: Filters) => {
    const [users, setUsers] = useState<any>(initialData);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setUsers(initialData);
        setPage(2);
        setHasMore(true);
    
    }, [initialData, params]);

    const fetchMoreUsers = useCallback(async () => {
        if (loading || !hasMore ) return;

        try {
            setLoading(true);

            const newData = await fetchData(page, params);
            const newUsers = newData.members || [];

            if (newUsers.length < 30) {
                setHasMore(false);
            }

            if (newUsers.length === 0) {
                setHasMore(false);
                return;
            }

            setUsers((prevUsers: any) => {
                const prevMembers = prevUsers.members;
                return {
                    ...newData,
                    members: [...prevMembers, ...newUsers],
                }
            });

            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.log("Error occured " + error)
        } finally {
            setLoading(false);
        }
    }, [page, params, loading, hasMore]);

    useEffect(() => {
        const triggerElement = document.getElementById('scroll-trigger');
        console.log('element',triggerElement)

        if (!triggerElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    fetchMoreUsers();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        observer.observe(triggerElement);

        return () => {
            observer.disconnect();
        };
    }, [fetchMoreUsers, loading, hasMore]);

    return {users, loading, hasMore};
}


export default usePagination;