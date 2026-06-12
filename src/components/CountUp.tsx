import { useCountUp } from "../motion";

/** A number that animates from 0 (or its previous value) to `value`. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  duration,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}) {
  const v = useCountUp(value, duration);
  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {v.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
