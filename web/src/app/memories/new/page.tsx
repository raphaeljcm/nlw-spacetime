import { NewMemoryForm } from '@/components/NewMemoryForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewMemory() {
  return (
    <article className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft />
        voltar a timeline
      </Link>

      <NewMemoryForm />
    </article>
  );
}
