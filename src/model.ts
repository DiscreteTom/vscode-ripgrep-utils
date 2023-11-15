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

export type RgJsonResultLineBeginData = {
  path: RgJsonResultPathData;
};

export type RgJsonResultLineBegin = {
  type: "begin";
  data: RgJsonResultLineBeginData;
};

export type RgJsonResultLineMatchData = {
  path: RgJsonResultPathData;
  lines: {
    text: string;
  };
  line_number: number;
  absolute_offset: number;
  submatches: {
    match: {
      text: string;
    };
    start: number;
    end: number;
  }[];
};

export type RgJsonResultLineMatch = {
  type: "match";
  data: RgJsonResultLineMatchData;
};

export type RgJsonResultLineEndData = {
  path: RgJsonResultPathData;
  binary_offset: null;
  stats: RgJsonResultStats;
};

export type RgJsonResultLineEnd = {
  type: "end";
  data: RgJsonResultLineEndData;
};

export type RgJsonResultLineSummaryData = {
  elapsed_total: RgJsonResultTimeElapsed;
  stats: RgJsonResultStats;
};

export type RgJsonResultLineSummary = {
  type: "summary";
  data: RgJsonResultLineSummaryData;
};

export type RgJsonResultLine =
  | RgJsonResultLineBegin
  | RgJsonResultLineMatch
  | RgJsonResultLineEnd
  | RgJsonResultLineSummary;
