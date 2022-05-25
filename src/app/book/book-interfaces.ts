export interface ImageLinks {
    smallThumbnail?: string;
    thumbnail?: string;
  }
  
  export interface VolumeInfo {
    title: string;
    publishedDate?: string;
    description?: string;
    authors: string[];
    imageLinks?: ImageLinks;
  }
  
  export interface Book {
    id: string;
    volumeInfo: VolumeInfo;
  }
  
  export interface BookResponse {
    items: Book[];
    totalItems: number;
  }
  