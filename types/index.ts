export interface Guild {
  features: [];
  icon: string;
  id: string;
  name: string;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  channels?: any[];
}

export interface IStats extends Document {
  guildId: string;
  joinedAt: Date | null;
  postsPosted: number;
  commentsPosted: number;
  mirrorsPosted: number;
  collectsPosted: number;
  commandsUsed: number;
}

export interface IInstance extends Document {
  guildId: string;
  channelId: string;
  handle: string;
  profileId: string;
  ownedBy: string;
  includeMirrors: boolean;
  includeInteractions: boolean;
  mention: boolean;
  webhookUrl: string;
}

export interface IFeed {
  name: string;
  handle: string;
  channelName: string;
  channelId: string;
  mirrors: boolean;
  collects: boolean;
  mentions: boolean;
  imageUrl: string;
}

export interface IVersion {
  version: string;
  description: string;
}