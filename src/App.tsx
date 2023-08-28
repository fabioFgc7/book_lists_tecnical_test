import { useEffect, useState } from "react";
import "./index.css";
import { Book, Library } from "./types";
import { ReadingList } from "./components/ReadingList";
import { BookList } from "./components/BookList";
import NavBar from "./components/NavBar";
import data from "../src/data/books.json";
import "animate.css";
import { onReadListChange } from "./components/onReadListChange";
const books: Book[] = data.library.map((data) => data.book);
const newGenre = [...new Set(books.map((book) => book.genre))];
const uniqueGenre = ["Todos", ...newGenre];

const App = () => {
  const [genre, setGenre] = useState<string>("");
  const [listaBooks, setListaBooks] = useState<Book[]>(books);
  const [range, setRange] = useState<number>(0);
  const [items, setItems] = useState<number | null>(null);
  const [readListBook, setReadListBook] = useState<Book[]>([]);
  const [animations, setAnimations] = useState<boolean>(false);
  useEffect(() => {
    const unsuscribe = onReadListChange(
      setReadListBook,
      setListaBooks,
      setGenre
    );
    return () => unsuscribe();
  }, []);

  useEffect(() => {
    if (readListBook.length > 0) {
      localStorage.setItem("readListBook", JSON.stringify(readListBook));
    }
    if (listaBooks.length > 0 && listaBooks !== books) {
      localStorage.setItem("books", JSON.stringify(listaBooks));
    }
    if (genre) {
      localStorage.setItem("genre", JSON.stringify(genre));
    }
  }, [readListBook, listaBooks, genre]);

  const valor = listaBooks.filter(
    (book) =>
      (genre === "Todos" || book.genre === genre) &&
      (!range || book.pages >= range)
  );

  const handleAddList = (book: Library["book"], i: number) => {
    setItems(i);
    setAnimations(true);
    const findId = listaBooks.find((element) => element.ISBN === book.ISBN);
    if (findId) {
      setListaBooks((el) => el.filter((el) => el.ISBN !== findId.ISBN));
      setReadListBook((prev) => [...prev, book]);
      localStorage.removeItem("books");
    }
  };
  const removeLecturas = (lista: Library["book"]) => {
    setAnimations(false);
    setReadListBook((el) =>
      el.filter((element) => element.ISBN !== lista.ISBN)
    );
    const findId = listaBooks.find((element) => element.ISBN === lista.ISBN);
    if (!findId) {
      setListaBooks((el) => [...el, lista]);
    }
    localStorage.removeItem("readListBook");
  };

  return (
    <main className='w-full md:p-5'>
      <NavBar
        genre={genre}
        setGenre={setGenre}
        uniqueGenre={uniqueGenre}
        range={range}
        setRange={setRange}
      />
      <div className='w-full flex md:flex-row flex-col  md:space-x-10 space-x-0 md:space-y-0  md:justify-between '>
        <BookList
          valor={valor}
          handleAddList={handleAddList}
          items={items}
          animations={animations}
          genre={genre}
        />
        <ReadingList
          readListBook={readListBook}
          removeLecturas={removeLecturas}
          animations={animations}
        />
      </div>
    </main>
  );
};

export default App;
