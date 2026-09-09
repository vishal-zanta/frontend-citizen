import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const ratingVariants = cva("flex items-center flex-wrap gap-2.5", {
  variants: {
    size: {
      sm: "gap-2",
      default: "gap-2.5",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const starVariants = cva("transition-transform duration-150", {
  variants: {
    size: {
      sm: "w-4 h-4",
      default: "w-5 h-5",
      lg: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const valueVariants = cva("text-muted-foreground font-semibold tabular-nums", {
  variants: {
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface RatingLevel {
  label: string;
  color: string;
  bg: string;
  border: string;
}

export const DEFAULT_RATING_LEVELS: Record<number, RatingLevel> = {
  1: {
    label: "Poor",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-900",
  },
  2: {
    label: "Fair",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-900",
  },
  3: {
    label: "Good",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-900",
  },
  4: {
    label: "Very Good",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-900",
  },
  5: {
    label: "Excellent",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-900",
  },
};

function Rating({
  rating,
  maxRating = 5,
  size,
  className,
  starClassName,
  labelClassName,
  showValue = false,
  showLabel = true,
  ratingLabels,
  editable = false,
  onRatingChange,
  onHoverChange,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof ratingVariants> & {
    /**
     * Current rating value (supports decimal values for partial stars)
     */
    rating: number;
    /**
     * Maximum rating value (number of stars to show)
     */
    maxRating?: number;
    /**
     * Whether to show the numeric rating value
     */
    showValue?: boolean;
    /**
     * Whether to show the descriptive rating label (e.g. Poor, Good, Excellent)
     */
    showLabel?: boolean;
    /**
     * Custom labels for star rating (record mapping 1-5 or custom function)
     */
    ratingLabels?: Record<number, string> | ((rating: number) => string);
    /**
     * Class name for the value span
     */
    starClassName?: string;
    /**
     * Class name for the label badge
     */
    labelClassName?: string;
    /**
     * Whether the rating is editable (clickable)
     */
    editable?: boolean;
    /**
     * Callback function called when rating changes
     */
    onRatingChange?: (rating: number) => void;
    /**
     * Callback function called when hovered rating changes
     */
    onHoverChange?: (rating: number | null) => void;
  }) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const displayRating =
    editable && hoveredRating !== null ? hoveredRating : rating;

  const handleStarClick = (starRating: number) => {
    if (editable && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarMouseEnter = (starRating: number) => {
    if (editable) {
      setHoveredRating(starRating);
      onHoverChange?.(starRating);
    }
  };

  const handleStarMouseLeave = () => {
    if (editable) {
      setHoveredRating(null);
      onHoverChange?.(null);
    }
  };

  const roundedScore = Math.round(displayRating);
  const activeLevel = roundedScore >= 1 && roundedScore <= 5 ? DEFAULT_RATING_LEVELS[roundedScore] : null;

  const labelText =
    displayRating > 0 && activeLevel
      ? ratingLabels
        ? typeof ratingLabels === "function"
          ? ratingLabels(displayRating)
          : ratingLabels[roundedScore] || activeLevel.label
        : activeLevel.label
      : null;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const filled = displayRating >= i;
      const partiallyFilled = displayRating > i - 1 && displayRating < i;
      const fillPercentage = partiallyFilled
        ? (displayRating - (i - 1)) * 100
        : 0;

      stars.push(
        <div
          key={i}
          className={cn(
            "relative select-none",
            editable && "cursor-pointer hover:scale-110 active:scale-95 transition-transform",
          )}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarMouseEnter(i)}
          onMouseLeave={handleStarMouseLeave}
        >
          {/* Background star (empty) */}
          <StarIcon
            data-slot="rating-star-empty"
            className={cn(starVariants({ size }), "text-muted-foreground/30")}
          />

          {/* Filled star */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              width: filled ? "100%" : `${fillPercentage}%`,
            }}
          >
            <StarIcon
              data-slot="rating-star-filled"
              className={cn(
                starVariants({ size }),
                "fill-amber-400 text-amber-400",
              )}
            />
          </div>
        </div>,
      );
    }

    return stars;
  };

  return (
    <div
      data-slot="rating"
      className={cn(ratingVariants({ size }), className)}
      {...props}
    >
      <div className="flex items-center gap-1.5">{renderStars()}</div>
      {showValue && (
        <div className="flex items-center gap-2">
          <span
            data-slot="rating-value"
            className={cn(valueVariants({ size }), starClassName)}
          >
            {displayRating > 0 ? displayRating.toFixed(1) : "0.0"}
          </span>
          {showLabel && labelText && activeLevel && (
            <span
              data-slot="rating-label"
              className={cn(
                "inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border transition-all duration-200 animate-in fade-in-50",
                activeLevel.color,
                activeLevel.bg,
                activeLevel.border,
                labelClassName,
              )}
            >
              {labelText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { Rating };

