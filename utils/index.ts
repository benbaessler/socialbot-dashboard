export const getOwnedGuilds = async (token: string) => {
  const res = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const guilds = await res.json();

  return guilds.filter((guild: any) => guild.owner);
};