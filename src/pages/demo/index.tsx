import React, { useEffect, useRef, useState } from "react";

interface Item {
  id: number;
  sendTime: string;
  title: string;
}

const YourComponent: React.FC = () => {
  let array: Item[] = [...Array(20)].map((_, i) => ({
    id: i,
    sendTime: `SendTime ${i}`,
    title: `title${i}`,
  }));

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [firstItemSendTime, setFirstItemSendTime] = useState<string | null>(
    null
  );
  const [lastItemSendTime, setLastItemSendTime] = useState<string | null>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const containerTop = container.getBoundingClientRect().top;
      const containerBottom = container.getBoundingClientRect().bottom;

      const visibleItems = array.filter((item) => {
        const itemElement = document.getElementById(`item-${item.id}`);
        if (itemElement) {
          const itemTop = itemElement.getBoundingClientRect().top;
          const itemBottom = itemElement.getBoundingClientRect().bottom;

          return itemTop >= containerTop && itemBottom <= containerBottom;
        }
        return false;
      });

      if (visibleItems.length > 0) {
        setFirstItemSendTime(visibleItems[0].sendTime);
        setLastItemSendTime(visibleItems[visibleItems.length - 1].sendTime);
      } else {
        setFirstItemSendTime(null);
        setLastItemSendTime(null);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const getData = () => {
    if (firstItemSendTime === array[0].sendTime) {
      console.log("------trên");
    }
    if (lastItemSendTime === array[array.length - 1]?.sendTime) {
      console.log("------dưới");
    }
  };

  useEffect(() => {
    getData();
  }, [firstItemSendTime]);

  return (
    <div
      ref={scrollContainerRef}
      className="h-[400px] overflow-y-auto relative"
    >
      <div className="sticky top-0">{firstItemSendTime}</div>
      {array.map((item) => (
        <div key={item.id} id={`item-${item.id}`}>
          {item.title}
        </div>
      ))}

      <div className="sticky bottom-0">{lastItemSendTime}</div>
    </div>
  );
};

export default YourComponent;
