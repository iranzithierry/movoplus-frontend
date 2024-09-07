'use client';

import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatMoney } from '@/lib/utils';
import { formatDate } from 'date-fns';
import { ProductStatusEnum } from '@/lib/enum';

export default function ProductsTable({ products }: { products: ProductList[] }) {
  const statusEnum = (value: any) => {
    const enumClass = new ProductStatusEnum(value)
    return enumClass
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="hidden md:table-cell">Total Sales</TableHead>
          <TableHead className="hidden md:table-cell">Added at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="hidden sm:table-cell">
              <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src={product.image?.medium ?? '/images/placeholder.svg'} width="64" />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>
              <Badge variant={statusEnum(product.status.toString()).getColor()}>{statusEnum(product.status.toString()).getLabel()}</Badge>
            </TableCell>
            <TableCell>{formatMoney(product.price)}</TableCell>
            <TableCell className="hidden md:table-cell">{product.totalSales}</TableCell>
            <TableCell className="hidden md:table-cell">{formatDate(product.addedAt, 'yyyy-MM-dd hh:mm a')}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  );
}
