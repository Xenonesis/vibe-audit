# SEO & Discoverability Audit (Optional)

Load only for public/indexable websites or when the user requests SEO/discoverability work.

## Technical checks
Review:
- page titles and descriptions
- canonical URLs
- robots directives
- sitemap generation
- HTTP status behavior and redirects
- crawlable links
- duplicate/parameterized page handling
- public pages accidentally requiring client-only rendering when indexing matters
- Open Graph/social metadata where relevant
- structured data only when it accurately represents visible content

## Content/architecture boundaries
Do not generate keyword-stuffed or misleading content. Do not expose private/authenticated routes to search engines merely to increase crawlability.

## Performance relationship
Use actual performance evidence; do not claim SEO gains from a performance change without appropriate measurement or search-console evidence.

## Verification
When possible verify rendered HTML, canonical/robots output, sitemap URLs, status codes, and structured-data syntax. Treat ranking outcomes as external and uncertain rather than guaranteed.
