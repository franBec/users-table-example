import { UserSortProperty, SortDirection } from "@/api/users/model";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getPageNumberForFrontendPagination = (pageNumber: string | null) => {
    if (!pageNumber) return 1;
    const parsedPageNumber = parseInt(pageNumber);
    return isNaN(parsedPageNumber) ? 1 : parsedPageNumber;
};

const getPageNumberForBackendPagination = (pageNumber: string | null) => {
    if (!pageNumber) return undefined;
    const parsedPageNumber = parseInt(pageNumber) - 1;
    return isNaN(parsedPageNumber) ? undefined : parsedPageNumber;
};

const getPageSize = () => {
    const pageSize = process.env.NEXT_PUBLIC_API_USERS_PAGE_SIZE;
    return pageSize ? parseInt(pageSize, 10) : undefined;
};

const getSortProperty = (sortProperty: string | null) => {
    if (
        !sortProperty ||
        !Object.values(UserSortProperty).includes(sortProperty as UserSortProperty)
    ) {
        return undefined;
    }
    return sortProperty as UserSortProperty;
};

const getSortDirection = (sortDirection: string | null) => {
    if (
        !sortDirection ||
        !Object.values(SortDirection).includes(sortDirection as SortDirection)
    ) {
        return undefined;
    }
    return sortDirection as SortDirection;
};

const getQ = (q: string | null): string | undefined => {
    return q ?? undefined;
};

export const buildGetUsersParams = (searchParams: ReadonlyURLSearchParams) => ({
    pageNumber: getPageNumberForBackendPagination(searchParams.get("pageNumber")),
    pageSize: getPageSize(),
    sortProperty: getSortProperty(searchParams.get("sortProperty")),
    sortDirection: getSortDirection(searchParams.get("sortDirection")),
    q: getQ(searchParams.get("q")),
});