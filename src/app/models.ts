export interface Game {
  background_image: string;
  name: string;
  id: string;
  released: string;
  metacritic_url: string;
  description: string;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publisher>;
  ratings: Array<Rating>;
  metacritic: number;
  website: string;
  screenshots: Array<ScreenShot>;
  trailers: Array<Trailer>
}

export interface ApiResponse<T> {
  results: Array<T>;
}

interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    name: string;
    slug: string;
  }
}

interface Publisher {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface ScreenShot {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  }
}
