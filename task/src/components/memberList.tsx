// "use client";
// import "../styles/member.css";
// import "../styles/loader.css";
// import Card from "./memberCard";
// import Loader from "./loader";
// import usePagination from "@/hooks/usePagination";
// import { fetchData } from "@/apiService/memberApi";
// import { useState, useEffect } from "react";

// interface Params {
//     region?: string;
//     country?: string;
//     officeHours?: boolean;
//     openToCollaborate?: boolean;
//     friends?: boolean;
//     newMember?: boolean;
// }

// interface MemberProps {
//     initialData: any;
//     params: Params;
// }

// const Member = ({ initialData, params }: MemberProps) => {
//     const [users, setUsers] = useState(initialData.members);
//     const [loading, setLoading] = useState(false);
//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);

//     const { triggerRef } = usePagination(() => {
//         if (!loading && hasMore) {
//             setPage((prev) => prev + 1);
//         }
//     });

//     const fetchUsers = async (page: number) => {
//         try {
//             setLoading(true);
//             const data = await fetchData(page, params);
//             setUsers((prev: any) => [...prev, ...data.members]);
//             setHasMore(data.members.length > 0);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (page > 1) {
//             fetchUsers(page);
//         }
//     }, [page]);

//     useEffect(() => {
//         const loadFilteredUsers = async () => {
//             setLoading(true);
//             setPage(1);
//             const data = await fetchData(1, params);
//             setUsers(data.members);
//             setHasMore(data.members.length > 0);
//             setLoading(false);
//         };
//         loadFilteredUsers();
//     }, [JSON.stringify(params)]);

//     return (
//         <div className="member">
//             {loading && <Loader />}
//             <div className="member__list">
//                 {users.map((item: any) => (
//                     <Card key={item.uid} member={item} />
//                 ))}
//                 <div id="scroll-trigger" ref={triggerRef} className="infinite__scroll-trigger"></div>
//             </div>
//             <style jsx>{`
//                 .member {
//                     overflow-y: auto;
//                     height: 27.5rem;
//                     scrollbar-width: thin;
//                 }
//                 .member__list {
//                     display: flex;
//                     flex-wrap: wrap;
//                     margin-left: 57px;
//                     gap: 20px;
//                     cursor: pointer;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Member;

//here latest updated code,
// 'use client';

// import styles from './memberList.module.css';
// import { usePagination } from '@/hooks/usePagination';
// import Card from './memberCard';
// import Loader from './loader';

// interface Params {
//   region?: string;
//   country?: string;
//   officeHours?: boolean;
//   openToCollaborate?: boolean;
//   friends?: boolean;
//   newMember?: boolean;
// }

// interface MemberClientComponentProps {
//   initialData: any;
//   params: Params;
// }

// export default function MemberClientComponent({initialData, params }: MemberClientComponentProps) {
//   const {
//     users,
//     loading,
//     hasMore
//   } = usePagination(
//     initialData,
//     params
//   );

//   // Safely handle users
//   const memberUsers = users?.members || [];

//   return (
//     <div className={styles.member}>
//       {loading && <Loader />}
//       <div className={styles.member__list}>
//         {memberUsers.map((item: any) => (
//           <Card key={`${item.uid}`} member={item} />
//         ))}
//         {hasMore && (
//           <div
//             id="scroll-trigger"
//             className="infinite-scroll-trigger"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import styles from "./memberList.module.css";
import Card from "./memberCard";
import Loader from "./loader";
import usePagination from "@/hooks/usePagination";

interface Params {
    region?: string;
    country?: string;
    officeHours?: boolean;
    openToCollaborate?: boolean;
    friends?: boolean;
    newMember?: boolean;
}

interface MemberClientComponentProps {
    initialData: any;
    params: Params;
}

export default function MemberClientComponent({initialData,params}: MemberClientComponentProps) {
    const { users, loading, hasMore } = usePagination(initialData, params);

    const memberUsers = users?.members || []
    const isEmpty = !loading && memberUsers.length === 0

    return (
        <div className={styles.member}>
            {loading && <Loader />}
            <div className={styles.member__list}>
                {isEmpty ? (
                    <div>No Data Found</div>
                ) : (
                    memberUsers.map((item: any) => (
                        <Card key={`${item.uid}`} member={item} />
                    ))
                )}
                {hasMore && (
                    <div id="scroll-trigger" className="infinite-scroll-trigger" />
                )}
            </div>
        </div>
    )
}
