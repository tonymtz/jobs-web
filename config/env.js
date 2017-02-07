var env = {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  YOUTUBE_LIST_ID: process.env.YOUTUBE_LIST_ID,
  CALENDAR_API: {
    CLIENT_ID:      process.env.C_CLIENT_ID,
    CLIENT_SECRET:  process.env.C_CLIENT_SECRET,
    REDIRECT_URL:   process.env.C_REDIRECT_URIS,
    CODE:           process.env.C_CODE,
    CALENDARID:     process.env.CALENDARID
  }
};

module.exports = env;
