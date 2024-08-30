import { useState, Suspense, lazy, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../../hooks";
import { ESelectedPage, GanjaType } from "../../types";
import { useGetAllGanjas } from "../../features/ganjas";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import GanjaCard from "../../components/GanjaCard";
const GanjasPageElements = lazy(() => import("./GanjasPageElements"));

export default function GanjasPage({
  itemsPerPage = 4,
  pagesPerPagination = 3,
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { setSelectedPage } = useAppContext();
  const { data, status, error } = useGetAllGanjas(); // query has pulled state from API and hashed it in the RAM
  // console.log(data);

  function setPageItems(): GanjaType[] | undefined {
    const startIdx = currentPage * itemsPerPage - itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleItems: GanjaType[] | undefined = data
      ? data.slice(startIdx, endIdx)
      : [];
    return visibleItems;
  }

  const prevPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  let totalPages = 0;
  if (data) {
    totalPages = Math.round(data.length / itemsPerPage);
  }

  const nextPage = useCallback(() => {
    if (currentPage !== totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const setPaginationPages = useMemo(() => {
    const startIdx =
      Math.floor((currentPage - 1) / pagesPerPagination) * pagesPerPagination;
    return [...Array(pagesPerPagination).keys()].map((_, index) => {
      return startIdx + index + 1;
    });
  }, [currentPage, pagesPerPagination]);

  function changeCurrentPage(e: React.MouseEvent<HTMLButtonElement>) {
    const pageNum = Number((e.target as HTMLButtonElement).textContent);
    setCurrentPage(pageNum);
  }

  return (
    <motion.section
      className="ganjas"
      id="ganjas"
      onViewportEnter={() => setSelectedPage(ESelectedPage.ganjas)}
    >
      <h2 className="section__title">
        <span>our products</span>
      </h2>
      <Suspense>
        <GanjasPageElements />
      </Suspense>

      {status === "pending" ? (
        <Loader />
      ) : error instanceof AxiosError ? (
        toast.error(error.message)
      ) : (
        <>
          <ul className="ganjas__container">
            {data &&
              data.length > 0 &&
              setPageItems()?.map((ganja) => {
                return (
                  <Suspense key={ganja._id} fallback={<Loader />}>
                    <GanjaCard ganja={ganja} />
                  </Suspense>
                );
              })}
          </ul>
          <div className="ganjas__pagination">
            <button
              onClick={prevPage}
              className={`page__nav-btn ${currentPage === 1 && "disabled"}`}
            >
              prev
            </button>
            {setPaginationPages.map((pageNum: number, index: number) => {
              return (
                <button
                  onClick={changeCurrentPage}
                  key={index}
                  className={`page__num-btn ${
                    currentPage === pageNum
                      ? "page__num-active"
                      : currentPage >= totalPages && "page__num-disabled"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={nextPage}
              className={`page__nav-btn ${
                currentPage === totalPages && "disabled"
              }`}
            >
              next
            </button>
          </div>
        </>
      )}
    </motion.section>
  );
}
