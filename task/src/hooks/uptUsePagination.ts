import { useEffect, useState } from "react";

interface UsePaginationProps {
    scrollTriggerRef: any;
    totalItems: number;
    totalCurrentItems: number;
}

const usePagination = ({ scrollTriggerRef, totalItems, totalCurrentItems }: UsePaginationProps) => {
    const [pagination, setPagination] = useState(1);
    
    useEffect(() => {
        if (!scrollTriggerRef.current) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && totalItems !== totalCurrentItems) {  
                    setPagination((prev) => prev + 1);
                }
            },
            {
                threshold: 0.1,
            }
        );

        const target = scrollTriggerRef.current;
        observer.observe(target);

        return () => observer.unobserve(target); 
    }, [scrollTriggerRef, totalCurrentItems, totalItems]);
    return { currentPage: pagination, setCurrentPage: setPagination };
};

export default usePagination;

