import React, { useEffect, useState } from "react";
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
import ShopOrderDetails from "./orderDetails";
import { useDispatch, useSelector } from "react-redux";
import fetchAllOrdersByUserService from "@/services/shop/order/fetchAllOrdersByUserService";
import { Badge } from "@/components/ui/badge";
import fetchOrderDetailsService from "@/services/shop/order/fetchOrderDetailsService";
import { resetOrderDetails } from "@/store/shop/orderSlice";

const ShopOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { orderList, orderDetails } = useSelector(
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
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?.orderNumber}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : "bg-black"
                        } px-3 py-1`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
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
                          Details
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
