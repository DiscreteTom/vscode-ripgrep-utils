export const config = {
  /**
   * If true, print debug messages with the logger.
   * @default false
   */
  debug: false,
  logger: (o: { cmd?: string }) => {
    if ((o.cmd ?? "").length !== 0) {
      console.log(`[vscode-ripgrep-utils] cmd: ${o.cmd}`);
    }
  },
};
