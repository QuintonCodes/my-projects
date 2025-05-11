import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { generatePagination } from "@/lib/utils";
import { Suspense } from "react";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string"
      ? Number.parseInt(searchParams.page)
      : 1;
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const color =
    typeof searchParams.color === "string" ? searchParams.color : undefined;
  const size =
    typeof searchParams.size === "string" ? searchParams.size : undefined;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-16">
        <div className="container px-4 py-8 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row">
            <aside className="w-full md:w-64 shrink-0">
              <ProductFilters />
            </aside>

            <div className="flex-1">
              <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold font-mochiy">All Products</h1>

                <div className="flex items-center gap-4">
                  <select
                    className="border rounded-md px-3 py-1.5 text-sm bg-background"
                    defaultValue={sort || "newest"}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              <Suspense fallback={<ProductsGridSkeleton />}>
                <ProductsGrid
                  category={category}
                  color={color}
                  size={size}
                  sort={sort}
                  page={page}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

async function ProductsGrid({
  category,
  color,
  size,
  sort,
  page,
}: {
  category?: string;
  color?: string;
  size?: string;
  sort?: string;
  page: number;
}) {
  const limit = 8;
  const skip = (page - 1) * limit;

  const where = { inStock: true };

  if (category) {
    where.category = {
      name: category,
    };
  }

  if (color) {
    where.colors = {
      some: {
        name: color,
      },
    };
  }

  if (size) {
    where.sizes = {
      some: {
        name: size.toUpperCase(),
      },
    };
  }

  let orderBy = { createdAt: "desc" };
  if (sort === "price-low") {
    orderBy = { price: "asc" };
  } else if (sort === "price-high") {
    orderBy = { price: "desc" };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        colors: true,
        sizes: true,
      },
      skip,
      take: limit,
      orderBy,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const pagination = generatePagination(page, totalPages);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            colors={product.colors.map((c) => c.hexCode)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              href={`/products?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(color ? { color } : {}),
                ...(size ? { size } : {}),
                ...(sort ? { sort } : {}),
                page: String(page - 1),
              })}`}
            >
              &lt;
            </Button>

            {pagination.map((p, i) =>
              typeof p === "string" ? (
                <span key={i} className="px-2">
                  ...
                </span>
              ) : (
                <Button
                  key={i}
                  variant={page === p ? "default" : "outline"}
                  href={`/products?${new URLSearchParams({
                    ...(category ? { category } : {}),
                    ...(color ? { color } : {}),
                    ...(size ? { size } : {}),
                    ...(sort ? { sort } : {}),
                    page: String(p),
                  })}`}
                >
                  {p}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              href={`/products?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(color ? { color } : {}),
                ...(size ? { size } : {}),
                ...(sort ? { sort } : {}),
                page: String(page + 1),
              })}`}
            >
              &gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <Skeleton className="w-2/3 h-5" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      ))}
    </div>
  );
}
