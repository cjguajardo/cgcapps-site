import { useEffect, useState } from "react";
import axios from "axios";

// Get API URL from environment variable
const API_URL =
  import.meta.env.PUBLIC_API_URL || "https://cgcapps-api.vercel.app";

/**
 * Represents the geographic information of a location.
 */
type GeoType = {
  /** The full address of the location with time elapsed. */
  full: string | null;
  /** The city of the location. */
  city: string | null;
  /** The country of the location. */
  country: string | null;
  /** The date when the location was last recorded. */
  since: Date | null;
};

/**
 * Custom hook for fetching and managing geographic location data
 *
 * Fetches the user's geographic information from the API and calculates
 * the time elapsed since the location was recorded. The time is formatted
 * as days, hours, and minutes.
 *
 * @returns {GeoType} Geographic data object containing location and time information
 *
 * @example
 * ```tsx
 * const geo = useGeo();
 * if (geo.full) {
 *   console.log(geo.full); // "Santiago, Chile, 2 d 3 h 15 m"
 * }
 * ```
 */
function useGeo() {
  const [geo, setGeo] = useState<GeoType>({
    full: null,
    city: null,
    country: null,
    since: null,
  });

  useEffect(() => {
    /**
     * Fetches geographic data from the API
     * Calculates time elapsed since last location update
     * Formats time as days, hours, and minutes
     */
    const fetchGeoData = async () => {
      const url = `${API_URL}/api/geo`;

      try {
        const response = await axios.get(url);

        if (!response.data) return;

        const from = `${response.data.city}, ${response.data.country}`;

        // Calculate time difference in seconds
        const diff = Math.round(
          Math.abs(
            new Date().getTime() - new Date(response.data.date).getTime(),
          ) / 1000,
        );

        // Convert seconds to minutes, hours, and days
        let minutes = Math.floor(diff / 60);
        let hours = 0;
        let days = 0;

        if (minutes > 60) {
          hours = Math.floor(minutes / 60);
          minutes = minutes - hours * 60;
        }

        if (hours > 24) {
          days = Math.floor(hours / 24);
          hours = hours - days * 24;
        }

        // Build time elapsed string
        const since = [];
        if (days > 0) {
          since.push(`${days} d`);
        }
        if (hours > 0) {
          since.push(`${hours} h`);
        }
        if (minutes > 0) {
          since.push(`${minutes} m`);
        }

        setGeo({
          full: `${from}, ${since.join(" ")}`,
          city: response.data.city,
          country: response.data.country,
          since: new Date(response.data.date),
        });
      } catch (error) {
        // Silently fail - geo data is not critical for UX
        // Error is expected if API is unavailable
        if (import.meta.env.DEV) {
          console.error("Failed to fetch geo data:", error);
        }
      }
    };

    fetchGeoData();
  }, []);

  return geo;
}

export default useGeo;
