import axios from "axios";

export interface TwitchMetadata {
  id: string;
  username: string;
  photo: string;
}

export const authenticateWithTwitch = async (
  twitchAccessToken: string | undefined
): Promise<TwitchMetadata | undefined> => {
  if (!twitchAccessToken) return undefined;

  const response = await axios({
    method: "GET",
    url: "https://api.twitch.tv/helix/users",
    headers: {
      Authorization: "Bearer " + twitchAccessToken,
      "Client-Id": "qlfz8nlzzkq20jhl1xuawhza5xa3fm",
    },
  });

  if (response.status === 200) {
    const userData = response.data.data[0];

    return {
      id: userData.id,
      username: userData.display_name,
      photo: userData.profile_image_url,
    };
  } else {
    return undefined;
  }
};
