"use client";
import { Button } from '@/components/global/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DashboardPagination({pagination}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleNext = () => {
    const page = +searchParams.get("page") || 1;
    router.push(`${pathname}?page=${page + 1}`);
  };

  const handlePrev = () => {
    const page = +searchParams.get("page") || 1;
    router.push(`${pathname}?page=${page - 1}`);
  };

  return (
    <div className="flex justify-end gap-3">
    <Button
      variant="secondary"
      disabled={pagination.page <= 1}
      onClick={handlePrev}
    >
      Prev
    </Button>
    <Button
      variant="secondary"
      disabled={pagination.page === pagination.total_pages}
      onClick={handleNext}
    >
      Next
    </Button>
  </div>
  )
}
