import React from "react";
import accountImage from "@/assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/shop/orders";
import Address from "@/components/shop/address";

const ShopAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          src={accountImage}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="gap-8 grid grid-cols-1 mx-auto py-8 container">
        <div className="flex flex-col bg-background shadow-sm p-6 border rounded-lg">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopAccount;
