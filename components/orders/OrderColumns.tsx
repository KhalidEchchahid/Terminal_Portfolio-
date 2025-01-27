"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import OrderStatus from "../OrderStatus";
import { EidtOrder } from "../EditOrder";
import Link from "next/link";

export const columns: ColumnDef<OrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phoneNumber = row.original.phone;
      const formattedNumber = formatPhoneForWhatsApp(phoneNumber);
      return (
        <Link
          href={`https://wa.me/${formattedNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {phoneNumber}
        </Link>
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <div>{row.original.color}</div>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <p className="text-sm text-gray-700 font-medium">{row.original.size}</p>
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => (
      <p className="text-sm text-gray-700 font-medium">{row.original.city}</p>
    ),
  },
  {
    accessorKey: "Adress",
    header: "Adress",
    cell: ({ row }) => (
      <p className="text-sm text-gray-700 font-medium">
        {row.original.shippingAdress}
      </p>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <p className="text-sm text-gray-700 font-medium">
        {row.original.quantity}
      </p>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "TotalAmount",
    cell: ({ row }) => (
      <p className="text-sm text-gray-700 font-medium">
        {row.original.totalAmount}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return (
        <p className="text-sm text-gray-600 italic">
          {createdAt
            ? new Intl.DateTimeFormat("fr", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(createdAt))
            : "تاريخ غير متوفر"}
        </p>
      )
    },
  },
  {
    accessorKey: "status",
    header: () => <div>status</div>,
    cell: ({ row }) => {
      return (
        <OrderStatus
          orderId={row.original._id}
          initialStatus={row.original.status}
        />
      );
    },
  },
  {
    accessorKey: "edit",
    header: () => <div>Edit</div>,
    cell: ({ row }) => {
      return <EidtOrder initialData={row.original} />;
    },
  },
];


// Helper function to format the phone number for WhatsApp
function formatPhoneForWhatsApp(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Check if the number starts with '0'
  if (digits.startsWith('0')) {
    // Replace the leading '0' with '212'
    return '212' + digits.slice(1);
  }
  
  // If it doesn't start with '0', assume it's already in the correct format
  return digits;
}

