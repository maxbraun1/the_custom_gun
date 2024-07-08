import React, { forwardRef } from "react";

interface ItemProps {
  id: string;
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, ...props }: { id: string }, ref) => {
    return <div {...props} ref={ref}></div>;
  }
);

Item.displayName = "Item";

export default Item;
