import ProductsTable from './_components/products-table';
import EmptyProducts from './_components/empty-products';
import { LinkButton } from '@/components/ui/link-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

export const revalidate = 10;
export default async function Page() {
  const products = await api.products.productsList('dashboard');
  console.log(products);
  return (
    <section className='flex flex-1'>
      {products.length > 0 ? (
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <div className='flex justify-between items-end'>
              <CardDescription>Manage your products and view their sales performance.</CardDescription>
              <div className='flex items-center space-x-2'>
                <Button size={'sm'} variant={'secondary'} className='font-display font-light'>Export</Button>
                <Button size={'sm'} variant={'secondary'} className='font-display font-light'>Import</Button>
                <LinkButton linkTo='/dashboard/products/add' size={'sm'} className='font-display'>Add Product</LinkButton>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ProductsTable products={products} />
          </CardContent>
        </Card>
      ) : (
        <EmptyProducts />
      )}
    </section>
  );
}
