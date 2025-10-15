import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { ProductPrice } from "@/types/product";

const BulkInquiryTable = ({
  productPrice,
}: {
  productPrice: ProductPrice[];
}) => {
  return (
    <>
      <Table className="mt-6 border-2">
        <TableHeader>
          <TableRow>
            <TableHead className="border">Quantity</TableHead>
            <TableHead className="border">Price</TableHead>

            {productPrice[0].color === "" ? null : (
              <TableHead className="border">Color</TableHead>
            )}
            {productPrice[0].size === "" ? null : (
              <TableHead className="border">Size</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {productPrice.map((el) => (
            <TableRow key={el.id}>
              <TableCell className="border">
                {el.min_quantity} To {el.max_quantity}
              </TableCell>
              <TableCell className="border">
                ₹{el.p_price || el.p_mrp || ""}
              </TableCell>
              {el.color === "" ? null : (
                <TableCell className="border">{el.color}</TableCell>
              )}
              {el.size === "" ? null : (
                <TableCell className="border">{el.size}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BulkInquiryTable;
