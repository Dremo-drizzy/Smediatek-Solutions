import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SmediaTek Solutions API",
      version: "1.0.0",
      description:
        "REST API for the SmediaTek Solutions MERN app: lead capture (contact/brand/livestream/training), a portfolio CMS, admin auth, analytics, and audit logging.",
    },
    servers: [{ url: "/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Admin JWT obtained from POST /auth/login.",
        },
      },
      parameters: {
        PageParam: {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
          description: "Page number, 1-indexed.",
        },
        LimitParam: {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 20, maximum: 100 },
          description: "Items per page, capped at 100.",
        },
        StatusParam: {
          name: "status",
          in: "query",
          schema: { type: "string" },
          description: "Filter to one status value from this resource's enum; ignored if invalid.",
        },
        SortParam: {
          name: "sort",
          in: "query",
          schema: { type: "string", default: "-createdAt" },
          description: "One of createdAt/email/status, prefix with - for descending.",
        },
        SearchParam: {
          name: "search",
          in: "query",
          schema: { type: "string" },
          description: "Full-text search across this resource's string fields.",
        },
        IncludeDeletedParam: {
          name: "includeDeleted",
          in: "query",
          schema: { type: "boolean", default: false },
          description: "Include soft-deleted records.",
        },
      },
      responses: {
        Unauthorized: { description: "Missing, invalid, or expired JWT" },
        Forbidden: { description: "Authenticated, but role isn't allowed (admin-only route)" },
        NotFound: { description: "No document with that id" },
      },
    },
    security: [],
  },
  apis: ["./routes/*.js"],
});

export default swaggerSpec;
