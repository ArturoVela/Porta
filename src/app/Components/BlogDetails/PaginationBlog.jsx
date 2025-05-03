"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allPosts } from "@/app/Components/Blog/allPosts"; // Adjust the import path as necessary

export default function PaginationBlog() {
  const pathname = usePathname();
  const sortedPosts = [...allPosts].sort((a, b) => b.id - a.id);
  const currentIndex = sortedPosts.findIndex((p) => pathname.includes(p.slug));
  const totalPages = sortedPosts.length;
  const currentPage = currentIndex + 1;

  const getVisiblePages = () => {
    if (totalPages <= 5) return sortedPosts.map((_, idx) => idx + 1);

    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const visiblePages = getVisiblePages();

  const getSlugByPage = (pageNumber) => sortedPosts[pageNumber - 1]?.slug || "#";
  const goToPage = (pageNumber) => `/blog/${getSlugByPage(pageNumber)}`;

  return (
    <div className="pagination-nav text-center mt-60">
      <style jsx>{`
        .pagination-numbers {
            display: inline-flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            font-family: var(--body-font);
        }

        .page-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: #ffffff;
            color: #111111;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
            font-family: var(--title-font);
            border: 2px solid transparent;
            cursor: pointer;
        }

        .page-number:hover {
            background-color: #8000ff;
            color: #ffffff;
            border-color: #8000ff;
        }

        .active-page {
            background-color: #8000ff;
            color: white;
            font-weight: 700;
            border-color: #8000ff;
        }

        .dots {
            line-height: 44px;
            color: #999;
            font-size: 18px;
            padding: 0 6px;
            font-family: var(--title-font2);
        }
        `}</style>



      <ul className="pagination-numbers list-unstyled">
        {currentPage > 1 && (
          <>
            <li>
              <Link href={goToPage(1)}>
                <span className="page-number">{"<<"}</span>
              </Link>
            </li>
            <li>
              <Link href={goToPage(currentPage - 1)}>
                <span className="page-number">{"<"}</span>
              </Link>
            </li>
          </>
        )}

        {visiblePages.map((page, idx) =>
          page === "..." ? (
            <li key={`dots-${idx}`}>
              <span className="dots">...</span>
            </li>
          ) : (
            <li key={page}>
              <Link href={goToPage(page)}>
                <span className={`page-number ${currentPage === page ? "active-page" : ""}`}>
                  {page}
                </span>
              </Link>
            </li>
          )
        )}

        {currentPage < totalPages && (
          <>
            <li>
              <Link href={goToPage(currentPage + 1)}>
                <span className="page-number">{">"}</span>
              </Link>
            </li>
            <li>
              <Link href={goToPage(totalPages)}>
                <span className="page-number">{">>"}</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
