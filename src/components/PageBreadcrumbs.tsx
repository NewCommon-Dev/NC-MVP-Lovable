import { Link } from "react-router-dom";
import { Home, ChevronRight, MoreHorizontal } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumbs = ({ items }: PageBreadcrumbsProps) => {
  // Always show: Home / ... (if >2 middle items) / prev / current
  const allItems: BreadcrumbItem[] = [
    { label: "Home", to: "/" },
    ...items,
  ];

  let displayItems: BreadcrumbItem[];

  if (allItems.length <= 3) {
    // Home + up to 2 items — show all
    displayItems = allItems;
  } else {
    // Truncate: Home / ... / prev / current
    displayItems = [
      allItems[0],
      { label: "..." },
      allItems[allItems.length - 2],
      allItems[allItems.length - 1],
    ];
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="px-6 md:px-12 pt-20 pb-2"
    >
      <ol className="flex items-center gap-1.5 font-body text-[11px] text-muted-foreground">
        {displayItems.map((item, i) => {
          const isLast = i === displayItems.length - 1;
          const isEllipsis = item.label === "...";
          const isHome = i === 0;

          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight size={10} className="text-muted-foreground/50" />
              )}
              {isEllipsis ? (
                <MoreHorizontal size={12} className="text-muted-foreground/50" />
              ) : isLast ? (
                <span className="text-foreground">{item.label}</span>
              ) : (
                <Link
                  to={item.to || "/"}
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {isHome ? <Home size={12} /> : item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default PageBreadcrumbs;
