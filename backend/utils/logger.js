function format(level, message, meta) {
  const timestamp = new Date().toISOString();
  const details = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${details}`;
}

const logger = {
  info(message, meta) {
    console.log(format('INFO', message, meta));
  },
  warn(message, meta) {
    console.warn(format('WARN', message, meta));
  },
  error(message, meta) {
    console.error(format('ERROR', message, meta));
  }
};

module.exports = logger;
