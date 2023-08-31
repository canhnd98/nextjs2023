import React, { ReactNode, useEffect, useRef } from "react";

interface IProps {
  children: any;
  loader: ReactNode;
  fetchMore: () => void;
  hasMore: boolean;
  endMessage: ReactNode;
  className: string;
}

const InfiniteScroll: React.FC<IProps> = ({
  children,
  loader,
  fetchMore,
  hasMore,
  endMessage,
  className,
}) => {
  const pageEndRef = useRef(null);
  const pageStartRef = useRef(null);

  useEffect(() => {
    // Thiết lập IntersectionObserver để phát hiện khi phần tử cuối cùng hiển thị
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        const firstEntry = entries[0];
        const lastEntry = entries[entries.length - 1];

        if (lastEntry.isIntersecting) {
          // Thực hiện fetchData khi phần tử đầu hoặc cuối hiển thị
          fetchMore();
        }
      });

      // Bắt đầu quan sát phần tử cuối cùng
      if (pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }

      // Bắt đầu quan sát phần tử đầu tiên
      if (pageStartRef.current) {
        observer.observe(pageStartRef.current);
      }

      // Ngừng quan sát khi komponent bị xóa hoặc khi hasMore thay đổi
      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }

        if (pageStartRef.current) {
          observer.unobserve(pageStartRef.current);
        }
      };
    }
  }, [hasMore]);

  return (
    <div className={className}>
      {hasMore ? <div ref={pageStartRef}>{loader}</div> : null}
      {children}
      {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
    </div>
  );
};

export default InfiniteScroll;
