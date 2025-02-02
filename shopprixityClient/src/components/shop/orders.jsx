import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdErrorOutline } from "react-icons/md";
import ShopOrderDetails from "./orderDetails";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import fetchAllOrdersByUserService from "@/services/shop/order/fetchAllOrdersByUserService";
import fetchOrderDetailsService from "@/services/shop/order/fetchOrderDetailsService";
import { resetOrderDetails } from "@/store/shop/orderSlice";

const ShopOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { ordersList, orderDetails } = useSelector(
    (state) => state.orderReducer
  );

  const handleOrderDetails = (orderId) => {
    dispatch(fetchOrderDetailsService(orderId));
    setOpenDetailsDialog(true);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersByUserService(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>Order History</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersList && ordersList.length > 0
              ? ordersList.map((orderItem) => (
                  <TableRow key={orderItem.id}>
                    <TableCell>{orderItem?.id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Label>
                        <Badge
                          className={`${
                            orderItem?.orderStatus === "confirmed" ||
                            orderItem?.orderStatus === "delivered"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          } px-3 py-1`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </Label>
                    </TableCell>
                    <TableCell>₹{orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleOrderDetails(orderItem?.id)}
                        >
                          <span>Details</span>
                          <MdErrorOutline />
                        </Button>
                        <ShopOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShopOrders;
