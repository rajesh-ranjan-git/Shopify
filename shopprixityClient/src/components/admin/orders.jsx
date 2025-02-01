import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminOrderDetails from "./orderDetails";
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
import fetchAdminOrderDetailsService from "@/services/admin/order/fetchAdminOrderDetailsService";
import fetchAllOrdersService from "@/services/admin/order/fetchAllOrdersService";
import { resetOrderDetails } from "@/store/admin/adminOrderSlice";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { ordersList, orderDetails } = useSelector(
    (state) => state.adminOrderReducer
  );

  const handleOrderDetails = (orderId) => {
    dispatch(fetchAdminOrderDetailsService(orderId));
    setOpenDetailsDialog(true);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersService());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>All Orders</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Order Id</TableHead>
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
                          Details
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
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

export default AdminOrders;
