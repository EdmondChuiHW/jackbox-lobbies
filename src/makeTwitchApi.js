function makeTwitchApi(clientId) {
  let authToken = "";

  const makeAuthHeaders = () => ({
    "Client-ID": clientId,
    "Authorization": `Bearer ${authToken}`,
  });

  return {
    async getStreams(gameIds, afterCursor) {
      const params = new URLSearchParams();
      gameIds.forEach(gameId => params.append("game_id", gameId));
      params.append("first", "100");
      afterCursor && params.append("after", afterCursor);

      const resp = await fetch("https://api.twitch.tv/helix/streams?" + params, {
        headers: makeAuthHeaders(),
      })
      const { data, pagination } = await resp.json();

      return {
        streams: data,
        fetchNext: async () => {
          return this.getStreams(gameIds, pagination.cursor);
        },
      };
    },
    async getGames(names) {
      const params = new URLSearchParams();
      names.forEach(name => params.append("name", name));
      const resp = await fetch("https://api.twitch.tv/helix/games?" + params, {
        headers: makeAuthHeaders(),
      });
      const { data } = await resp.json();

      return data || [];
    },
    getAuthUrl() {
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("redirect_uri", window.location.origin + window.location.pathname);
      params.append("response_type", "token");
      params.append("scope", "");

      return "https://id.twitch.tv/oauth2/authorize?" + params;
    },
    handleAuthResponse() {
      const params = new URLSearchParams(window.location.hash.slice(1))
      const token = params.get("access_token");
      if (!token) return;

      authToken = token;
    },
    hasAuth() {
      return !!authToken;
    }
  };
};

export default makeTwitchApi;
