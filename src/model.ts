export type RgJsonResultTimeElapsed = {
  secs: number;
  nanos: number;
  /**
   * Human readable elapsed time.
   */
  human: string;
};

export type RgJsonResultPathData = {
  text: string;
};

export type RgJsonResultStats = {
  bytes_printed: number;
  bytes_searched: number;
  elapsed: RgJsonResultTimeElapsed;
  matched_lines: number;
  matches: number;
  searches: number;
  searches_with_match: number;
};

export type RgJsonResultLine =
  | {
      type: "begin";
      data: {
        path: RgJsonResultPathData;
      };
    }
  | {
      type: "match";
      data: {
        path: RgJsonResultPathData;
        lines: {
          text: string;
        };
        line_number: number;
        absolute_offset: number;
        submatches: {
          match: { text: string };
          start: number;
          end: number;
        }[];
      };
    }
  | {
      type: "end";
      data: {
        path: RgJsonResultPathData;
        binary_offset: null;
        stats: RgJsonResultStats;
      };
    }
  | {
      type: "summary";
      data: {
        elapsed_total: RgJsonResultTimeElapsed;
        stats: RgJsonResultStats;
      };
    };
