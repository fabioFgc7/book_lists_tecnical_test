import { Book } from "../types";

export const onReadListChange = (
  callback: (listaBooks: Book[]) => void,
  callback1: (readListBook: Book[]) => void,
  genreCallback: (genre: string) => void,
) => {
  const getListaBooks = () => {
    const listaBooks = JSON.parse(localStorage.getItem("readListBook") || "[]");
    callback(listaBooks);
  };
  const getBooks = () => {
    const readBook = JSON.parse(localStorage.getItem("books") || "[]");
    callback1(readBook);
  };
  const getGenre = () => {
    const genre = localStorage.getItem("genre");
    if (genre !== null) {
      genreCallback(JSON.parse(genre));
    } else {
      genreCallback(''); 
    }
  };
  getListaBooks();
  getBooks();
  getGenre();
  window.addEventListener("storage", (e) => {
    if (e.key === "readListBook") {
      getListaBooks();
    }
    if (e.key === "books") {
      getBooks();
    }
    if (e.key === "genre") {
      getGenre();
    }
  });
  return () =>
    window.removeEventListener("storage", () => {
      getListaBooks();
      getBooks();
      getGenre();
    });
};