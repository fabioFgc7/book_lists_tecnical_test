export interface JSONResult {
    library: Library[];
}

export interface Library {
    book: Book;
}

export interface Book {
    title:    string;
    pages:    number;
    genre:    string;
    cover:    string;
    synopsis: string;
    year:     number;
    ISBN:    string;
    author:{
    name:       string;
    otherBooks: string[];
}   ;
    "8ISBN"?: string;
}

