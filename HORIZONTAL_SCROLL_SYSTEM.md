# Horizontal Scroll System with Perfect Centering

## Overview
This system implements a sophisticated horizontal scrolling experience for service sections with precise centering and conditional section visibility.

## Core Features

### 1. Perfect Section Centering
Every service section MUST be perfectly centered before any transition occurs. The system ensures:
- No transitions at 2/3 position or off-center positions
- Smooth snap-to-center behavior when approaching the section
- Locked centering during horizontal scroll
- Perfect alignment in ALL cases (forward and backward)

### 2. Section-by-Section Navigation
Users navigate through sections one at a time:
- **Forward scroll**: Website → Applications → Design
- **Backward scroll**: Design → Applications → Website
- Each section is perfectly centered before moving to the next

### 3. Conditional Section Visibility

#### Forward Scroll (Top to Bottom)
- **Initial State**: Header is visible
- **During Horizontal Scroll**: Only service sections are visible
- **After Last Section**: Call-to-Action and Footer become visible
- Header hides when entering horizontal scroll mode

#### Reverse Scroll (Bottom to Top)
- **Initial State**: Call-to-Action and Footer are visible
- **During Horizontal Scroll**: Only service sections are visible
- **After First Section**: Header becomes visible
- Call-to-Action and Footer hide when entering horizontal scroll mode

## Implementation

### Hook: `useSnappingHorizontalScroll`
**Location**: `src/hooks/useSnappingHorizontalScroll.ts`

This hook manages the horizontal scrolling behavior with perfect centering.

#### Key Functions:

**`isContainerCentered()`**
```typescript
// Checks if container is within 80px of viewport center
// Returns true only when perfectly centered
const distanceFromCenter = Math.abs(containerMiddle - viewportMiddle);
return distanceFromCenter < 80;
```

**`getContainerPosition()`**
```typescript
// Returns precise position: 'above' | 'centered' | 'below' | 'outside'
// Used to determine scroll behavior and entry direction
```

**`snapToCenter()`**
```typescript
// Automatically centers the container when within 10-300px of center
// Prevents activation until perfect centering is achieved
```

**`snapToSection(targetSection: number)`**
```typescript
// Snaps to exact section position with smooth transition
// Uses cubic-bezier(0.4, 0, 0.2, 1) for natural feel
// 600ms transition ensures smooth, predictable movement
```

#### State Management:

**`scrollState`**
```typescript
interface ScrollState {
  currentSection: number;    // 0, 1, or 2 (Website, Applications, Design)
  progress: number;          // Pixel position for transform
  isAtStart: boolean;        // True when at first section
  isAtEnd: boolean;          // True when at last section
}
```

**Reference Tracking**
- `isHorizontalActive`: Tracks if horizontal scroll mode is active
- `isSnapping`: Prevents multiple snap operations
- `isTransitioning`: Locks input during section transitions
- `currentSectionIndex`: Current section (0-2)
- `entryDirection`: Remembers how user entered ('from-top' | 'from-bottom')

### Hook: `useSectionVisibility`
**Location**: `src/hooks/useSectionVisibility.ts`

This hook manages conditional visibility of sections based on scroll state.

#### Logic:

```typescript
// Header: Only visible when at first service section (Website)
showHeader: scrollState.currentSection === 0

// Call-to-Action & Footer: Only visible when at last section (Design)
showCallToAction: scrollState.isAtEnd
showFooter: scrollState.isAtEnd
```

## User Experience Flow

### Entering from Top (Scrolling Down)
1. User scrolls down from page top
2. System detects approach to service section
3. Container auto-centers when within range
4. **Header fades out** (opacity: 0, transform: translateY(-50px))
5. On next scroll, horizontal mode activates
6. User is positioned at **Website section** (first)
7. Continue scrolling moves through sections one by one
8. After reaching **Design section** (last):
   - **Call-to-Action fades in** (opacity: 1, transform: translateY(0))
   - **Footer fades in** (opacity: 1, transform: translateY(0))
9. Next scroll exits horizontal mode to CTA/Footer

### Entering from Bottom (Scrolling Up)
1. User scrolls up from CTA/Footer section
2. System detects approach to service section
3. Container auto-centers when within range
4. **Call-to-Action & Footer fade out** (opacity: 0, transform: translateY(50px))
5. On next scroll, horizontal mode activates
6. User is positioned at **Design section** (last)
7. Continue scrolling moves backwards through sections
8. After reaching **Website section** (first):
   - **Header fades in** (opacity: 1, transform: translateY(0))
9. Next scroll exits horizontal mode to Header

## Technical Details

### Centering Mechanism
```typescript
// Centering threshold: 80px from viewport center
const isCentered = distanceFromCenter < 80;

// Snap range: 10-300px
if (Math.abs(distanceFromCenter) > 10 && Math.abs(distanceFromCenter) < 300) {
  snapToCenter(); // Smooth scroll to perfect center
}
```

### Section Transitions
```typescript
// Smooth cubic-bezier curve
transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'

// Transition lock prevents input spam
isTransitioning.current = true;
setTimeout(() => {
  isTransitioning.current = false;
}, 600);
```

### Visibility Transitions
```typescript
// 700ms fade transition for sections
transition-all duration-700 ease-in-out

// Combination of opacity, transform, and height
opacity: show ? 1 : 0
transform: show ? 'translateY(0)' : 'translateY(±50px)'
height: show ? 'auto' : '0'
overflow: show ? 'visible' : 'hidden'
```

## Edge Cases Handled

1. **Multiple rapid scroll inputs**: Locked during transitions
2. **Leaving centered area mid-scroll**: Immediately deactivates horizontal mode
3. **Browser resize**: Recalculates section positions
4. **Mobile detection**: Entire system disabled on mobile
5. **Snap interference**: Prevents snapping during active horizontal scroll

## Performance Optimizations

1. **Ref-based state**: Critical flags use refs to avoid re-renders
2. **Passive scroll listener**: Read-only scroll tracking
3. **Active wheel listener**: Only prevents default when needed
4. **Transition debouncing**: 600ms lock prevents excessive calculations
5. **Center detection threshold**: 80px range reduces snap calculations

## Usage Example

```tsx
import { useSnappingHorizontalScroll } from "../../hooks/useSnappingHorizontalScroll";
import { useSectionVisibility } from "../../hooks/useSectionVisibility";

const MyServicePage = () => {
  const { containerRef, scrollState } = useSnappingHorizontalScroll({
    enabled: !isMobile,
    sections: 3,
    gap: 30,
  });

  const { showHeader, showCallToAction, showFooter } = useSectionVisibility(scrollState);

  return (
    <div>
      {/* Header - Hidden during horizontal scroll */}
      <section style={{
        opacity: showHeader ? 1 : 0,
        transform: showHeader ? 'translateY(0)' : 'translateY(-50px)',
      }}>
        Header Content
      </section>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef}>
        <div style={{
          transform: `translateX(-${scrollState.progress}px)`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <section>Website Services</section>
          <section>Application Services</section>
          <section>Design Services</section>
        </div>
      </div>

      {/* Call to Action - Only visible after last section */}
      <section style={{
        opacity: showCallToAction ? 1 : 0,
        transform: showCallToAction ? 'translateY(0)' : 'translateY(50px)',
      }}>
        CTA Content
      </section>

      {/* Footer - Only visible after last section */}
      <section style={{
        opacity: showFooter ? 1 : 0,
        transform: showFooter ? 'translateY(0)' : 'translateY(50px)',
      }}>
        Footer Content
      </section>
    </div>
  );
};
```

## Benefits

1. **Predictable Behavior**: Always centers before transitioning
2. **Smooth Experience**: Natural timing and easing curves
3. **Clear Navigation**: One section at a time, no confusion
4. **Contextual UI**: Shows relevant sections at the right time
5. **No Jank**: Locked transitions prevent visual glitches
6. **Accessible**: Clear entry/exit points for users

## Future Enhancements

- Add keyboard navigation (arrow keys)
- Add progress indicators
- Add section labels/breadcrumbs
- Add swipe gestures for touch devices
- Add URL hash navigation
