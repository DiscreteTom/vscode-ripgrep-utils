export const config = {
  /**
   * If true, print debug messages with the logger.
   * @default false
   */
  debug: false,
  logger: (o: { cmd?: string }) => {
    o.cmd ?? console.log(`[vscode-ripgrep-utils] cmd: ${o.cmd}`);
  },
};
