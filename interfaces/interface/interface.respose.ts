export interface MainResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface DataSource {
  imageUrl: string;
  tags: string;
  title: string;
  description: string;
  id: number
}

export interface ResponseGetNowPlaying extends MainResponse {
  results: ResultsResponseGetNowPlaying[];
  dates: DatesResultsResponseGetNowPlaying;
}

export interface ResultsResponseGetNowPlaying {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface DatesResultsResponseGetNowPlaying {
  maximum: string;
  minimum: string;
}

export interface RequestQueryParamsModel {
  limit?: number;
  page?: number;
  [props: string]: any;
}

export interface ResultsResponseDetailMovieSimiliar {
  adult:             boolean;
  backdrop_path:     null;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  release_date:      Date;
  poster_path:       null;
  popularity:        number;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}

export interface ResponseDetailMovieSimiliar extends MainResponse {
  results: ResultsResponseDetailMovieSimiliar[];
}

export interface ResponseDetailMovie {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: null;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           null;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      null | string;
  name:           string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name:       string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name:      string;
}

export interface ListMoviesHome {
  list1: boolean,
  list2: boolean,
  list3: boolean,
}
