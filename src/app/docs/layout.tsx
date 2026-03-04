import { DocsSidebar } from "@/components/DocsSidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DocsNavigation } from "@/components/DocsNavigation";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DocsSidebar />
      <div className="flex-1 min-w-0 flex">
        <article className="flex-1 min-w-0 max-w-4xl mx-auto px-4 md:px-8 py-8">
          <Breadcrumbs />
          <div className="prose">{children}</div>
          <DocsNavigation />
        </article>
        <TableOfContents />
      </div>
    </div>
  );
}
