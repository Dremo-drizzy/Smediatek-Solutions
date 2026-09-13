import { buildFilter, parsePagination, parseSort, buildListResponse } from "../../utils/pagination.js";

describe("buildFilter", () => {
  const STATUSES = ["new", "read", "archived"];

  it("excludes soft-deleted records by default", () => {
    const filter = buildFilter({ query: {} }, STATUSES);
    expect(filter).toEqual({ deletedAt: null });
  });

  it("includes soft-deleted records when includeDeleted=true", () => {
    const filter = buildFilter({ query: { includeDeleted: "true" } }, STATUSES);
    expect(filter.deletedAt).toBeUndefined();
  });

  it("applies a valid status filter", () => {
    const filter = buildFilter({ query: { status: "read" } }, STATUSES);
    expect(filter.status).toBe("read");
  });

  it("silently ignores a status value outside the allowed enum", () => {
    const filter = buildFilter({ query: { status: "not-a-real-status" } }, STATUSES);
    expect(filter.status).toBeUndefined();
  });

  it("builds a $text filter from search", () => {
    const filter = buildFilter({ query: { search: "hello" } }, STATUSES);
    expect(filter.$text).toEqual({ $search: "hello" });
  });
});

describe("parsePagination", () => {
  it("defaults to page 1, limit 20", () => {
    expect(parsePagination({ query: {} })).toEqual({ page: 1, limit: 20, skip: 0 });
  });

  it("computes skip from page and limit", () => {
    expect(parsePagination({ query: { page: "3", limit: "10" } })).toEqual({ page: 3, limit: 10, skip: 20 });
  });

  it("floors page at 1 for zero/negative input", () => {
    expect(parsePagination({ query: { page: "-5" } }).page).toBe(1);
  });

  it("caps limit at 100", () => {
    expect(parsePagination({ query: { limit: "500" } }).limit).toBe(100);
  });

  it("floors limit at 1 for a negative value", () => {
    expect(parsePagination({ query: { limit: "-5" } }).limit).toBe(1);
  });

  it("falls back to the default limit for a zero/non-numeric value", () => {
    expect(parsePagination({ query: { limit: "0" } }).limit).toBe(20);
    expect(parsePagination({ query: { limit: "abc" } }).limit).toBe(20);
  });
});

describe("parseSort", () => {
  const FIELDS = ["createdAt", "email", "status"];

  it("defaults to -createdAt when no sort param is given", () => {
    expect(parseSort({ query: {} }, FIELDS)).toEqual({ createdAt: -1 });
  });

  it("sorts ascending on a bare field name", () => {
    expect(parseSort({ query: { sort: "email" } }, FIELDS)).toEqual({ email: 1 });
  });

  it("sorts descending with a - prefix", () => {
    expect(parseSort({ query: { sort: "-status" } }, FIELDS)).toEqual({ status: -1 });
  });

  it("falls back to the default field for a disallowed sort field", () => {
    expect(parseSort({ query: { sort: "password" } }, FIELDS)).toEqual({ createdAt: -1 });
  });
});

describe("buildListResponse", () => {
  it("computes total pages, minimum 1", () => {
    expect(buildListResponse([], 0, 1, 20)).toEqual({ data: [], total: 0, page: 1, pages: 1 });
    expect(buildListResponse([], 45, 1, 20)).toEqual({ data: [], total: 45, page: 1, pages: 3 });
  });
});
