

## Plan: Sticky Filter Bar with Nav-Aware Positioning + Product Count Format

### Changes to `src/pages/Drops.tsx`

1. **Filter bar `top` position adapts to nav visibility**: The nav is ~64px tall (`top-16`). Currently the filter bar is `sticky top-16`. When the nav hides (scroll down), the filter bar should stick to `top-0`. When the nav reappears (scroll up), it should shift to `top-16` to avoid overlap. This requires tracking scroll direction in the Drops component (same logic as EditorialNav).

2. **Product count format**: Change from `"{count} products"` to `"{filtered} of {total} Products"` when a filter is active, otherwise show `"{total} Products"`.

### Changes to `src/components/EditorialNav.tsx`

No changes needed -- but we need the Drops page to independently track whether the nav is visible to adjust the filter bar's `top` offset.

### Implementation Details

**In `src/pages/Drops.tsx`:**

- Import `useScroll, useMotionValueEvent` from framer-motion
- Add state `navVisible` (default `true`), track scroll direction identical to EditorialNav logic
- Change filter bar from `sticky top-16` to dynamically use `top-0` or `top-16` based on `navVisible`, with a CSS transition for smoothness
- Determine if any filter is active (`hasActiveFilter`). Update the product count display:
  - No filter: `130 Products`
  - With filter: `42 of 130 Products`
- Use `products.length` for total count and `filteredProducts.length` for filtered count
- Apply same logic to mobile product count display

